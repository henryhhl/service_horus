
import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Col, Row } from 'antd';
import { C_Input } from '../../../../../../../components';

import M_ListadoUnionSucursal from '../../unionsucursal/modal/listado';
import M_TreeCiudad from '../../../../inventario/data/ciudad/modal/listado';

function C_Form( props ) {
    const { sucursal, disabled, onChange } = props;
    const { idsucursal, descripcion, direccion, fkidciudad, ciudad, fkidunionsucursal, unionsucursal } = sucursal;
    const { focusInput, error, message } = sucursal;

    const [ visible_unionsucursal, setVisibleUnionSucursal ] = useState( false );
    const [ visible_ciudad, setVisibleCiudad ] = useState( false );

    function onChangeID( value ) {
        sucursal.idsucursal = value;
        onChange( sucursal );
    };

    function onChangeDescripcion( value ) {
        sucursal.descripcion         = value;
        sucursal.error.descripcion   = false;
        sucursal.message.descripcion = "";
        onChange( sucursal );
    };

    function onChangeDireccion( value ) {
        sucursal.direccion         = value;
        sucursal.error.direccion   = false;
        sucursal.message.direccion = "";
        onChange( sucursal );
    };

    function onShowUnionSucursal() {
        if ( !disabled.data ) setVisibleUnionSucursal(true);
    };

    function componentUnionSucursal() {
        if ( !visible_unionsucursal ) return null;
        return (
            <M_ListadoUnionSucursal
                visible={visible_unionsucursal}
                onClose={ () => setVisibleUnionSucursal(false) }
                value={sucursal.fkidunionsucursal}
                onChange={ ( data ) => {
                    sucursal.fkidunionsucursal  = data.idunionsucursal;
                    sucursal.unionsucursal      = data.descripcion;
                    sucursal.error.fkidunionsucursal   = false;
                    sucursal.message.fkidunionsucursal = "";
                    onChange( sucursal );
                    setVisibleUnionSucursal(false);
                } }
            />
        );
    };

    function onShowCiudad() {
        if ( !disabled.data ) setVisibleCiudad(true);
    };

    function componentCiudad() {
        if ( !visible_ciudad ) return null;
        return (
            <M_TreeCiudad
                visible={visible_ciudad}
                onClose={ () => setVisibleCiudad(false) }
                onSelect={ ( data ) => {
                    sucursal.fkidciudad  = data.idciudad;
                    sucursal.ciudad      = data.descripcion;
                    sucursal.error.fkidciudad   = false;
                    sucursal.message.fkidciudad = "";
                    onChange( sucursal );
                    setVisibleCiudad(false);
                } }
            />
        );
    };

    return (
        <>
            { componentUnionSucursal() }
            { componentCiudad() }
            <Row gutter={ [12, 8] }>
                <Col sm={{ span: 8, }}></Col>
                <Col xs={{ span: 24, }} sm={{ span: 8, }}>
                    <C_Input
                        label={ "Código"}
                        placeholder={ "INGRESAR CÓDIGO..." }
                        value={ idsucursal }
                        onChange={ onChangeID }
                        disabled={ disabled.iddata }
                        onPressEnter={ props.onPressEnter }
                        autoFocus={true}
                        focus={ focusInput }
                    />
                </Col>
            </Row>
            <Row gutter={ [12, 8] }>
                <Col sm={{ span: 2, }}></Col>
                <Col xs={{ span: 24, }} sm={{ span: 12, }}>
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
                <Col xs={{ span: 24, }} sm={{ span: 8, }}>
                    <C_Input
                        label={ "Unión Sucursal"}
                        placeholder={ "SELECCIONAR UNIÓN SUCURSAL..." }
                        value={ unionsucursal }
                        onClick={onShowUnionSucursal}
                        disabled={ disabled.data }
                        error={error.fkidunionsucursal}
                        message={message.fkidunionsucursal}
                        select={true}
                    />
                </Col>
            </Row>
            <Row gutter={ [12, 8] }>
                <Col sm={{ span: 2, }}></Col>
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
                        label={ "Ciudad"}
                        placeholder={ "SELECCIONAR CIUDAD..." }
                        value={ ciudad }
                        onClick={onShowCiudad}
                        disabled={ disabled.data }
                        error={error.fkidciudad}
                        message={message.fkidciudad}
                        select={true}
                    />
                </Col>
            </Row>
        </>
    );
};

C_Form.propTypes = {
    sucursal: PropTypes.object,
    disabled:     PropTypes.object,

    onChange:     PropTypes.func.isRequired,
    onPressEnter: PropTypes.func,
};

C_Form.defaultProps = {
    onChange: ( evt ) => {},
};

export default C_Form;
