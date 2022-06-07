
import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Col, Row } from 'antd';
import { C_Input } from '../../../../../../../components';

import M_ListadoSucursal from '../../../../venta/data/sucursal/modal/listado';

function C_Form( props ) {
    const { almacen, disabled, onChange } = props;
    const { abreviatura, descripcion, idalmacen, direccion, fkidsucursal, sucursal } = almacen;
    const { focusInput, error, message } = almacen;

    const [ visible_sucursal, setVisibleSucursal ] = useState( false );

    function onChangeID( value ) {
        almacen.idalmacen = value;
        onChange( almacen );
    };

    function onChangeAbreviatura( value ) {
        almacen.abreviatura        = value;
        almacen.error.abreviatura  = false;
        almacen.message.abreviatura = "";
        onChange( almacen );
    };

    function onChangeDescripcion( value ) {
        almacen.descripcion        = value;
        almacen.error.descripcion  = false;
        almacen.message.descripcion = "";
        onChange( almacen );
    };

    function onChangeDireccion( value ) {
        almacen.direccion        = value;
        almacen.error.direccion  = false;
        almacen.message.direccion = "";
        onChange( almacen );
    };

    function onShowSucursal() {
        if ( !disabled.data ) setVisibleSucursal(true);
    };

    function componentSucursal() {
        if ( !visible_sucursal ) return null;
        return (
            <M_ListadoSucursal
                visible={visible_sucursal}
                onClose={ () => setVisibleSucursal(false) }
                value={almacen.fkidsucursal}
                onChange={ ( data ) => {
                    almacen.fkidsucursal  = data.idsucursal;
                    almacen.sucursal      = data.descripcion;
                    almacen.error.fkidsucursal   = false;
                    almacen.message.fkidsucursal = "";
                    onChange( almacen );
                    setVisibleSucursal(false);
                } }
            />
        );
    };

    return (
        <>
            { componentSucursal() }
            <Row gutter={ [12, 8] }>
                <Col sm={{ span: 8, }}></Col>
                <Col xs={{ span: 24, }} sm={{ span: 8, }}>
                    <C_Input
                        label={ "Código"}
                        placeholder={ "INGRESAR CÓDIGO..." }
                        value={ idalmacen }
                        onChange={ onChangeID }
                        disabled={ disabled.iddata }
                        onPressEnter={ props.onPressEnter }
                        autoFocus={true}
                        focus={ focusInput }
                    />
                </Col>
            </Row>
            <Row gutter={ [12, 8] }>
                <Col xs={{ span: 24, }} sm={{ span: 2, }}></Col>
                <Col xs={{ span: 24, }} sm={{ span: 4, }}>
                    <C_Input
                        label={ "Breve"}
                        placeholder={ "INGRESAR BREVE..." }
                        value={ abreviatura }
                        onChange={ onChangeAbreviatura }
                        disabled={ disabled.data }
                        error={error.abreviatura}
                        message={message.abreviatura}
                    />
                </Col>
                <Col xs={{ span: 24, }} sm={{ span: 16, }}>
                    <C_Input
                        label={ "Descripción"}
                        placeholder={ "INGRESAR DESCRIPCIÓN..." }
                        value={ descripcion }
                        onChange={ onChangeDescripcion }
                        disabled={ disabled.data }
                        error={error.descripcion}
                        message={message.descripcion}
                    />
                </Col>
            </Row>
            <Row gutter={ [12, 8] }>
                <Col xs={{ span: 24, }} sm={{ span: 2, }}></Col>
                <Col xs={{ span: 24, }} sm={{ span: 12, }}>
                    <C_Input
                        label={ "Dirección"}
                        placeholder={ "INGRESAR DIRECCIÓN..." }
                        value={ direccion }
                        onChange={ onChangeDireccion }
                        disabled={ disabled.data }
                        error={error.direccion}
                        message={message.direccion}
                    />
                </Col>
                <Col xs={{ span: 24, }} sm={{ span: 8, }}>
                    <C_Input
                        label={ "Sucursal"}
                        placeholder={ "SELECCIONAR SUCURSAL..." }
                        value={ sucursal }
                        onClick={onShowSucursal}
                        disabled={ disabled.data }
                        error={error.fkidsucursal}
                        message={message.fkidsucursal}
                        select={true}
                    />
                </Col>
            </Row>
        </>
    );
};

C_Form.propTypes = {
    almacen: PropTypes.object,
    disabled:     PropTypes.object,

    onChange:     PropTypes.func.isRequired,
    onPressEnter: PropTypes.func,
};

C_Form.defaultProps = {
    onChange: ( evt ) => {},
};

export default C_Form;
