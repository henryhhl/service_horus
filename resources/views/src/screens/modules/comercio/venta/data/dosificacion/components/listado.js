
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { Col, Row } from 'antd';

import webservices from '../../../../../../../utils/webservices';
import { C_Checkbox, C_Input, C_Message } from '../../../../../../../components';
import { httpRequest } from '../../../../../../../utils/httpRequest';
import { Functions } from '../../../../../../../utils/functions';

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

function C_ListadoDosificacion( props ) {
    const { create, onCreate, value } = props;

    const [ array_data, setArrayData ]        = useState( [] );
    const [ search, setSearch ]               = useState( "" );
    const [ timeoutSearch, setTimeoutSearch ] = useState( null );

    useEffect( () => {
        get_data();
        // return () => { }
    }, [] );

    function get_data( search = "" ) {
        httpRequest( 'get', webservices.wscomercioventadosificacion_index, {
            search: search, orderBy: 'asc', esPaginado: 0,
        } ) . then( (result) => {
            resultData( result );
            if ( result.response == 1 ) {
                C_Message( "success", "Servicio realizado exitosamente." );
                setArrayData( result.arrayDosificacion );
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
        if (item.iddosificacion == value) {
            item.checked = true;
        }
        return item.checked;
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
            <Row gutter={ [12, 6] }>
                <Col sm={{ span: 4, }}></Col>
                <Col xs={{ span: 24, }} sm={{ span: 16, }}>
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
                { onComponentCreate() }
                <div className="card-body">
                    <div className="table-responsive"
                        style={{ position: 'relative', overflowX: 'hidden', overflowY: 'auto', maxHeight: 300, width: '100%', }}
                    >
                        <table className="align-middle text-truncate mb-0 table table-bordered table-striped table-hover table-fixed">
                            <thead>
                                <tr>
                                    <th className="text-left" style={{ width: 15, }}>Sel.</th>
                                    <th className="text-left" >#</th>
                                    <th className="text-left">
                                        Sucursal
                                    </th>
                                    <th className="text-left">
                                        Actividad Económica
                                    </th>
                                    <th className="text-left">
                                        Descripción
                                    </th>
                                    <th className="text-left">
                                        Tipo Sucursal
                                    </th>
                                    <th className="text-left">
                                        Tipo Dosificación
                                    </th>
                                    <th className="text-left">
                                        Tipo Empresa
                                    </th>
                                    <th className="text-left">
                                        Nit
                                    </th>
                                    <th className="text-left">
                                        Nro. Autorización
                                    </th>
                                    <th className="text-left">
                                        Fecha Activación
                                    </th>
                                    <th className="text-left">
                                        Fecha Límite Emisión
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                { array_data.map( ( item, key ) => {
                                    let style = (item.checked || value == item.iddosificacion) ? {background: '#e0f3ff'} : {};
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
                                                { item.iddosificacion }
                                            </td>
                                            <td className="text-left">
                                                { item.sucursal }
                                            </td>
                                            <td className="text-left">
                                                { item.actividadeconomica }
                                            </td>
                                            <td className="text-left">
                                                { item.descripcion }
                                            </td>
                                            <td className="text-left">
                                                { item.tiposucursal === "S" ? "Sucursal" : "Casa Matriz" }
                                            </td>
                                            <td className="text-left">
                                                { item.tipodosificacion === "A" ? "Automático" : "Manual" }
                                            </td>
                                            <td className="text-left">
                                                { item.tipoempresa === "N" ? "Natural" : "Jurídico" }
                                            </td>
                                            <td className="text-left">
                                                { item.nit }
                                            </td>
                                            <td className="text-left">
                                                { item.nroautorizacion }
                                            </td>
                                            <td className="text-left">
                                                { Functions.convertYMDToDMY( item.fechaactivacion ) }
                                            </td>
                                            <td className="text-left">
                                                { Functions.convertYMDToDMY( item.fechalimiteemision ) }
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

C_ListadoDosificacion.propTypes = {
    value:  PropTypes.any,
    create: PropTypes.bool,

    onCreate:  PropTypes.func,
    onChecked: PropTypes.func,
}

C_ListadoDosificacion.defaultProps = {
    value: null,
    create: false,
}

export default C_ListadoDosificacion;
