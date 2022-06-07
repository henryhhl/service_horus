
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'antd';

import { C_Checkbox, C_Input, C_Message } from '../../../../../../../components';
import { httpRequest } from '../../../../../../../utils/httpRequest';
import webservices from '../../../../../../../utils/webservices';

function resultData( result ) {
    if ( result.response == -5 ) {
        C_Message( "error", "Problemas con la url no encontrado." );
    }
    if ( result.response == -4 ) {
        C_Message( "error", "Hubo problemas de conexión de servidor." );
    }
    if ( result.response == -1 ) {
        C_Message( "warning", result.message );
    }
};

function C_ListadoAlmacenProducto( props ) {
    const { value } = props;

    const [ array_data, setArrayData ]        = useState( [] );
    const [ search, setSearch ]               = useState( "" );
    const [ timeoutSearch, setTimeoutSearch ] = useState( null );

    useEffect( () => {
        get_data();
        // return () => { }
    }, [] );

    function get_data( search = "" ) {
        httpRequest( 'get', webservices.wscomercioinventarioalmacenproductodetalle_index, {
            search: search, orderBy: 'asc', esPaginado: 0,
            isventa: props.isventa,
            fkidalmacen: props.fkidalmacen,
            fkidlistaprecio: props.fkidlistaprecio,
            estado: props.estado,
        } ) . then( (result) => {
            resultData( result );
            console.log(result)
            if ( result.response == 1 ) {
                C_Message( "success", "Servicio realizado exitosamente." );
                setArrayData( result.arrayAlmacenProductoDetalle );
            }
        } );
    };

    function checkedData(item) {
        item.checked = false;
        if (item.fkidproducto == value) {
            item.checked = true;
        }
        return item.checked;
    };

    function onCheckedData(item) {
        if ( props.onChecked ) {
            props.onChecked(item);
        }
    };

    function onchangeSearch(search) {
        setSearch( search )
        if ( timeoutSearch ) {
            clearTimeout( timeoutSearch );
            setTimeoutSearch(null);
        }
        let timeoutSearchValue = setTimeout( () => {
            get_data( search )
        }, 1000);
        setTimeoutSearch( timeoutSearchValue );
    };

    return (
        <div className="form-group mt-2">
            <Row gutter={ [12, 8] }>
                <Col sm={{ span: 8, }}></Col>
                <Col xs={{ span: 24, }} sm={{ span: 8, }}>
                    <C_Input
                        titleText={"Buscar Criterio de búsqueda"}
                        placeholder={"Buscar..."}
                        value={search}
                        onChange={onchangeSearch}
                        onPressEnter={ () => get_data( search ) }
                        autoFocus={true}
                        suffix={ <i className="fa fa-search" /> }
                    />
                </Col>
            </Row>
            <div className="main-card mt-2 mb-2 card">
                <div className="card-body">
                    <div className="table-responsive"
                        style={{ position: 'relative', overflowX: 'hidden', overflowY: 'auto', maxHeight: 300, width: '100%', }}
                    >
                        <table className="align-middle text-truncate mb-0 table table-bordered table-striped table-hover table-fixed">
                            <thead>
                                <tr>
                                    <th className="text-left" style={{ width: 15, }}>Sel.</th>
                                    <th className="text-left">
                                        #
                                    </th>
                                    <th className="text-left">
                                        Código
                                    </th>
                                    <th className="text-left">
                                        Producto
                                    </th>
                                    <th className="text-left">
                                        Stock
                                    </th>
                                    <th className="text-left">
                                        Costo
                                    </th>
                                    <th className="text-left">
                                        Precio
                                    </th>
                                    <th className="text-left">
                                        Tipo
                                    </th>
                                    <th className="text-left">
                                        Categoría
                                    </th>
                                    <th className="text-left">
                                        Marca
                                    </th>
                                    <th className="text-left">
                                        Origen
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                { array_data.map( ( item, key ) => {
                                    let style = ( value == item.fkidproducto) ? {background: '#e0f3ff'} : {};
                                    return (
                                        <tr key={key} 
                                            style={ Object.assign( style, { cursor: 'pointer', } ) }
                                            onClick={ () => onCheckedData(item) }
                                        >
                                            <td className="text-left text-muted"
                                                onKeyPress={ ( event ) => {
                                                    if (event.key == 'Enter') {
                                                        onCheckedData(item);
                                                    }
                                                }}
                                            >
                                                <C_Checkbox readOnly
                                                    checked={ checkedData(item) }
                                                />
                                            </td>
                                            <td className="text-left">
                                                { key + 1 }
                                            </td>
                                            <td className="text-left">
                                                { item.codigo ? item.codigo : "" }
                                            </td>
                                            <td className="text-left">
                                                <label style={{ color: "rgb(56, 125, 255)", }}> {parseFloat(item.valorequivalente).toFixed(2)}{item.abreviatura} </label>
                                                {` ${item.producto}` }
                                            </td>
                                            <td className="text-left">
                                                { parseInt(item.stockactual) }
                                            </td>
                                            <td className="text-left">
                                                { parseFloat(item.costounitario).toFixed(2) }
                                            </td>
                                            <td className="text-left">
                                                { parseFloat(item.precioventa).toFixed(2) }
                                            </td>
                                            <td className="text-left">
                                                { item.tipo }
                                            </td>
                                            <td className="text-left">
                                                { item.categoria }
                                            </td>
                                            <td className="text-left">
                                                { item.marca }
                                            </td>
                                            <td className="text-left">
                                                { item.origen }
                                            </td>
                                        </tr>
                                    );
                                } ) }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );

};

C_ListadoAlmacenProducto.propTypes = {
    value:       PropTypes.any,
    onChecked:   PropTypes.func,
    isventa:     PropTypes.string,
    estado:      PropTypes.string,
    fkidalmacen: PropTypes.number,
    fkidlistaprecio: PropTypes.number,
}

C_ListadoAlmacenProducto.defaultProps = {
    value: null,
    isventa: null,
    estado: null,
    fkidalmacen: null,
    fkidlistaprecio: null,
}

export default C_ListadoAlmacenProducto;
