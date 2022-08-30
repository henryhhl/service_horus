
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { Col, Row } from 'antd';

import webservices from '../../../../../../../utils/webservices';
import { C_Checkbox, C_Input, C_Message } from '../../../../../../../components';
import { httpRequest } from '../../../../../../../utils/httpRequest';

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

function C_ListadoProducto( props ) {
    const { create, onCreate, value } = props;

    const [ array_data, setArrayData ]        = useState( [] );
    const [ search, setSearch ]               = useState( "" );
    const [ timeoutSearch, setTimeoutSearch ] = useState( null );

    useEffect( () => {
        get_data();
        // return () => { }
    }, [] );

    function get_data( search = "" ) {
        httpRequest( 'get', webservices.wscomercioinventarioproducto_index, {
            search: search, orderBy: 'asc', esPaginado: 0,
            fkidalmacen: props.fkidalmacen,
        } ) . then( (result) => {
            console.log(result)
            resultData( result );
            if ( result.response == 1 ) {
                C_Message( "success", "Servicio realizado exitosamente." );
                setArrayData( result.producto );
            }
        } );
    };

    function onchangeSearch(value) {
        setSearch( value )
        if ( timeoutSearch ) {
            clearTimeout( timeoutSearch );
            setTimeoutSearch(null);
        }
        let timeoutSearchValue = setTimeout( () => {
            get_data( value )
        }, 1000);
        setTimeoutSearch( timeoutSearchValue );
    };

    function checkedData(item) {
        if (typeof item.checked == 'undefined') {
            item.checked = false;
        };
        if (item.idproducto == value) {
            item.checked = true;
            return item.checked;
        }
        if ( props.arrayFKIDProducto.length > 0 ) {
            for (let index = 0; index < props.arrayFKIDProducto.length; index++) {
                const element = props.arrayFKIDProducto[index];
                if ( element.fkidproducto == item.idproducto ) {
                    item.checked = true;
                    return item.checked;
                }
            }
        }
        return item.checked;
    };

    function checkedStyle(item) {
        if (item.idproducto == value) {
            return true;
        }
        if ( props.arrayFKIDProducto.length > 0 ) {
            for (let index = 0; index < props.arrayFKIDProducto.length; index++) {
                const element = props.arrayFKIDProducto[index];
                if ( element.fkidproducto == item.idproducto ) {
                    return true;
                }
            }
        }
        return false;
    };

    function onCheckedData(item) {
        if ( props.onChecked ) {
            props.onChecked(item);
        }
    };

    function onComponentCreate() {
        if ( !create ) return null;
        return (
            <div className="card-header">
                {/* <div className="card-header-title font-size-lg text-capitalize font-weight-normal">
                    
                </div> */}
                <div className="btn-actions-pane-right">
                    <button type="button" className="btn-icon btn-wide btn-shadow btn-outline-2x btn btn-outline-primary btn-sm d-flex"
                        // onClick={this.props.onCreate}
                    >
                        Nuevo
                        <span className="pl-2 align-middle opacity-7">
                            <i className="fa fa-angle-right"></i>
                        </span>
                    </button>
                </div>
            </div>
        );
    };

    return (
        <div className="form-group mt-2">
            
            <div className="main-card mt-2 mb-2 card">
                { onComponentCreate() }
                <div className="card-body">
                    <Row gutter={ [12, 6] } className="mb-2">
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
                    <div className="table-responsive"
                        style={{ position: 'relative', overflowX: 'hidden', overflowY: 'auto', maxHeight: 300, width: '100%', }}
                    >
                        <table className="align-middle text-truncate mb-0 table table-bordered table-striped table-hover table-fixed">
                            <thead>
                                <tr>
                                    <th className="text-left" style={{ width: 15, }}>Sel.</th>
                                    <th className="text-left" style={{ width: 40, }}>#</th>
                                    <th className="text-left">
                                        Código
                                    </th>
                                    <th className="text-left">
                                        Nombre
                                    </th>
                                    <th className="text-left">
                                        Nivel
                                    </th>
                                    <th className="text-left">
                                        Tipo
                                    </th>
                                    <th className="text-left">
                                        Origen
                                    </th>
                                    <th className="text-left">
                                        Categoría
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                { array_data.map( ( item, key ) => {
                                    let style = (checkedStyle(item)) ? {background: '#e0f3ff'} : {};
                                    return (
                                        <tr key={key} style={ Object.assign( style, { cursor: 'pointer', } ) }
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
                                                { item.idproducto }
                                            </td>
                                            <td className="text-left">
                                                { item.codigo && item.codigo }
                                            </td>
                                            <td className="text-left">
                                                { item.nombre }
                                            </td>
                                            <td className="text-left">
                                                { item.nivel }
                                            </td>
                                            <td className="text-left">
                                                { item.productotipo }
                                            </td>
                                            <td className="text-left">
                                                { item.ciudadorigen }
                                            </td>
                                            <td className="text-left">
                                                { item.categoria }
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

C_ListadoProducto.propTypes = {
    value:  PropTypes.any,
    create: PropTypes.bool,
    fkidalmacen: PropTypes.any,
    arrayFKIDProducto: PropTypes.array,
    
    onCreate:  PropTypes.func,
    onChecked: PropTypes.func,
}

C_ListadoProducto.defaultProps = {
    value: null,
    arrayFKIDProducto: [],
    fkidalmacen: null,
    create: false,
}

export default C_ListadoProducto;
