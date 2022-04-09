
import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Col, Row } from 'antd';
import { C_Date, C_Input, C_Select } from '../../../../../../../components';

import M_TreeCiudad from '../../../../inventario/data/ciudad/modal/listado';
import M_ListadoComisionVenta from '../../comisionventa/modal/listado';

function C_Form( props ) {
    const { vendedor, disabled, onChange } = props;
    const { descripcion, idvendedor } = vendedor;
    const { focusInput, error, message } = vendedor;

    const [ visible_ciudadpais, setVisibleCiudadPais ] = useState( false );
    const [ visible_ciudad, setVisibleCiudad ] = useState( false );
    const [ visible_comisionventa, setVisibleComisionVenta ] = useState( false );

    function onChangeID( value ) {
        vendedor.idvendedor = value;
        onChange( vendedor );
    };

    function onChangeCI( value ) {
        vendedor.ci        = value;
        vendedor.error.ci  = false;
        vendedor.message.ci = "";
        onChange( vendedor );
    };

    function onChangeCodigo( value ) {
        vendedor.codigo = value;
        onChange( vendedor );
    };

    function onChangeEstado( value ) {
        vendedor.estado = value;
        onChange( vendedor );
    };

    function onChangeNombre( value ) {
        vendedor.nombre        = value;
        vendedor.error.nombre  = false;
        vendedor.message.nombre = "";
        onChange( vendedor );
    };

    function onChangeApellido( value ) {
        vendedor.apellido        = value;
        vendedor.error.apellido  = false;
        vendedor.message.apellido = "";
        onChange( vendedor );
    };

    function onChangeDireccion( value ) {
        vendedor.direccion = value;
        onChange( vendedor );
    };

    function onChangeFechaNacimiento( value ) {
        vendedor.fechanacimiento = value;
        onChange( vendedor );
    };

    function onChangeGenero( value ) {
        vendedor.genero = value;
        onChange( vendedor );
    };

    function onChangeEstadoCivil( value ) {
        vendedor.estadocivil = value;
        onChange( vendedor );
    };

    function onChangeTelefono( value ) {
        vendedor.telefono = value;
        onChange( vendedor );
    };

    function onChangeCelular( value ) {
        vendedor.celular = value;
        onChange( vendedor );
    };

    function onChangeFax( value ) {
        vendedor.fax = value;
        onChange( vendedor );
    };

    function onChangeEmail( value ) {
        vendedor.email = value;
        vendedor.error.email  = false;
        vendedor.message.email = "";
        onChange( vendedor );
    };

    function onShowCiudadPais() {
        if ( !disabled.data ) setVisibleCiudadPais(true);
    };

    function onShowCiudad() {
        if ( ( !disabled.data ) && ( typeof vendedor.fkidciudadpais === "number"  ) ) setVisibleCiudad(true);
    };

    function onShowComisionVenta() {
        if ( !disabled.data ) setVisibleComisionVenta(true);
    };

    function componentCiudadPais() {
        if ( !visible_ciudadpais ) return null;
        return (
            <M_TreeCiudad
                showChildren={false}
                visible={visible_ciudadpais}
                onClose={ () => setVisibleCiudadPais(false) }
                onSelect={ ( data ) => {
                    vendedor.fkidciudadpais  = data.idciudad;
                    vendedor.ciudadpais      = data.descripcion;
                    vendedor.error.fkidciudadpais   = false;
                    vendedor.message.fkidciudadpais = "";
                    onChange( vendedor );
                    setVisibleCiudadPais(false);
                } }
                title="Pais"
            />
        );
    };

    function componentCiudad() {
        if ( !visible_ciudad ) return null;
        return (
            <M_TreeCiudad
                visible={visible_ciudad}
                onClose={ () => setVisibleCiudad(false) }
                onSelect={ ( data ) => {
                    vendedor.fkidciudad  = data.idciudad;
                    vendedor.ciudad      = data.descripcion;
                    vendedor.error.fkidciudad   = false;
                    vendedor.message.fkidciudad = "";
                    onChange( vendedor );
                    setVisibleCiudad(false);
                } }
                selectedPadre={false}
                fkiddata={vendedor.fkidciudadpais}
                expanded={true}
            />
        );
    };

    function componentComisionVenta() {
        if ( !visible_comisionventa ) return null;
        return (
            <M_ListadoComisionVenta
                visible={visible_comisionventa}
                onClose={ () => setVisibleComisionVenta(false) }
                fkiddata={vendedor.fkidcomisionventa}
                onChange={ ( data ) => {
                    vendedor.fkidcomisionventa  = data.idcomisionventa;
                    vendedor.comisionventa      = `${data.valor}% ${data.descripcion}`;
                    vendedor.error.fkidcomisionventa   = false;
                    vendedor.message.fkidcomisionventa = "";
                    onChange( vendedor );
                    setVisibleComisionVenta(false);
                } }
            />
        );
    };

    return (
        <>
            { componentCiudadPais() }
            { componentCiudad() }
            { componentComisionVenta() }
            <Row gutter={ [12, 8] }>
                <Col xs={{ span: 24, }} sm={{ span: 4, }}>
                    <C_Input
                        label={ "Nro"}
                        placeholder={ "INGRESAR NRO..." }
                        value={ idvendedor }
                        onChange={ onChangeID }
                        disabled={ disabled.iddata }
                        onPressEnter={ props.onPressEnter }
                        autoFocus={true}
                        focus={ focusInput }
                    />
                </Col>
                <Col xs={{ span: 24, }} sm={{ span: 4, }}></Col>
                <Col xs={{ span: 24, }} sm={{ span: 4, }}>
                    <C_Input
                        label={ "CI*"}
                        placeholder={ "INGRESAR C.I. ..." }
                        value={ vendedor.ci }
                        onChange={ onChangeCI }
                        disabled={ disabled.data }
                        error={error.ci}
                        message={message.ci}
                    />
                </Col>
                <Col xs={{ span: 24, }} sm={{ span: 4, }}>
                    <C_Input
                        label={ "Código"}
                        placeholder={ "INGRESAR CÓDIGO..." }
                        value={ vendedor.codigo }
                        onChange={ onChangeCodigo }
                        disabled={ disabled.data }
                    />
                </Col>
                <Col xs={{ span: 24, }} sm={{ span: 4, }}>
                    <C_Input
                        label={ "Comisión*"}
                        placeholder={ "SELECCIONAR COMISIÓN..." }
                        value={ vendedor.comisionventa }
                        onClick={onShowComisionVenta}
                        disabled={ disabled.data }
                        error={error.fkidcomisionventa}
                        message={message.fkidcomisionventa}
                        select={true}
                    />
                </Col>
                <Col xs={{ span: 24, }} sm={{ span: 4, }}>
                    <C_Select
                        label={ "Estado"}
                        placeholder={ "SELECCIONAR ESTADO" }
                        value={ vendedor.estado }
                        onChange={ onChangeEstado }
                        disabled={ disabled.data }
                        data={ [
                            { title: "Activo", value: "A" },
                            { title: "Inactivo", value: "N" },
                        ] }
                    />
                </Col>
            </Row>
            <Row gutter={ [12, 8] }>
                <Col xs={{ span: 24, }} sm={{ span: 4, }}>
                    <C_Input
                        label={ "Nombre*"}
                        placeholder={ "INGRESAR NOMBRE..." }
                        value={ vendedor.nombre }
                        onChange={ onChangeNombre }
                        disabled={ disabled.data }
                        error={error.nombre}
                        message={message.nombre}
                    />
                </Col>
                <Col xs={{ span: 24, }} sm={{ span: 8, }}>
                    <C_Input
                        label={ "Apellido*"}
                        placeholder={ "INGRESAR APELLIDO..." }
                        value={ vendedor.apellido }
                        onChange={ onChangeApellido }
                        disabled={ disabled.data }
                        error={error.apellido}
                        message={message.apellido}
                    />
                </Col>
                <Col xs={{ span: 24, }} sm={{ span: 6, }}>
                    <C_Input
                        label={ "Pais*"}
                        placeholder={ "SELECCIONAR PAIS..." }
                        value={ vendedor.ciudadpais }
                        onClick={onShowCiudadPais}
                        disabled={ disabled.data }
                        error={error.fkidciudadpais}
                        message={message.fkidciudadpais}
                        select={true}
                    />
                </Col>
                <Col xs={{ span: 24, }} sm={{ span: 6, }}>
                    <C_Input
                        label={ "Ciudad*"}
                        placeholder={ "SELECCIONAR CIUDAD..." }
                        value={ vendedor.ciudad }
                        onClick={onShowCiudad}
                        disabled={ ( disabled.data || ( typeof vendedor.fkidciudadpais !== "number" ) ) ? true : false }
                        error={error.fkidciudad}
                        message={message.fkidciudad}
                        select={true}
                    />
                </Col>
            </Row>
            <Row gutter={ [12, 8] }>
                <Col xs={{ span: 24, }} sm={{ span: 12, }}>
                    <C_Input
                        label={ "Dirección"}
                        placeholder={ "INGRESAR DIRECCCIÓN..." }
                        value={ vendedor.direccion }
                        onChange={onChangeDireccion}
                        disabled={ disabled.data }
                    />
                </Col>
                <Col xs={{ span: 24, }} sm={{ span: 4, }}>
                    <C_Date
                        label={"Fecha Nacimiento"}
                        value={ vendedor.fechanacimiento }
                        onChange={ onChangeFechaNacimiento }
                        disabled={ disabled.data }
                    />
                </Col>
                <Col xs={{ span: 24, }} sm={{ span: 4, }}>
                    <C_Select
                        label={ "Género"}
                        placeholder={ "SELECCIONAR  GÉNERO" }
                        value={ vendedor.genero }
                        onChange={ onChangeGenero }
                        disabled={ disabled.data }
                        data={ [
                            { title: "Ninguno", value: "N" },
                            { title: "Masculino", value: "M" },
                            { title: "Femenino", value: "F" },
                        ] }
                    />
                </Col>
                <Col xs={{ span: 24, }} sm={{ span: 4, }}>
                    <C_Select
                        label={ "Estado civil"}
                        placeholder={ "SELECCIONAR ESTADO CIVIL" }
                        value={ vendedor.estadocivil }
                        onChange={ onChangeEstadoCivil }
                        disabled={ disabled.data }
                        data={ [
                            { title: "Ninguno", value: "N" },
                            { title: "Soltero", value: "S" },
                            { title: "Casado", value: "C" },
                            { title: "Divorciado", value: "D" },
                            { title: "Viudo", value: "V" },
                        ] }
                    />
                </Col>
            </Row>
            <div className="card mb-1 mt-2">
                <div className="card-header card-header-title font-size-lg text-capitalize">
                    Referencia Contacto
                </div>
                <div className="card-body pb-2 pt-0">
                    <Row gutter={ [12, 8] }>
                        <Col xs={{ span: 24, }} sm={{ span: 4, }}>
                            <C_Input
                                label={ "Teléfono"}
                                placeholder={ "INGRESAR TELÉFONO..." }
                                value={ vendedor.telefono }
                                onChange={ onChangeTelefono }
                                disabled={ disabled.data }
                            />
                        </Col>
                        <Col xs={{ span: 24, }} sm={{ span: 4, }}>
                            <C_Input
                                label={ "Celular"}
                                placeholder={ "INGRESAR CELULAR..." }
                                value={ vendedor.celular }
                                onChange={ onChangeCelular }
                                disabled={ disabled.data }
                            />
                        </Col>
                        <Col xs={{ span: 24, }} sm={{ span: 4, }}>
                            <C_Input
                                label={ "Fax"}
                                placeholder={ "INGRESAR FAX..." }
                                value={ vendedor.fax }
                                onChange={ onChangeFax }
                                disabled={ disabled.data }
                            />
                        </Col>
                        <Col xs={{ span: 24, }} sm={{ span: 12, }}>
                            <C_Input
                                label={ "Email"}
                                placeholder={ "INGRESAR EMAIL..." }
                                value={ vendedor.email }
                                onChange={ onChangeEmail }
                                disabled={ disabled.data }
                                error={error.email}
                                message={message.email}
                            />
                        </Col>
                    </Row>
                </div>
            </div>
        </>
    );
};

C_Form.propTypes = {
    vendedor: PropTypes.object,
    disabled:     PropTypes.object,

    onChange:     PropTypes.func.isRequired,
    onPressEnter: PropTypes.func,
};

C_Form.defaultProps = {
    onChange: ( evt ) => {},
};

export default C_Form;
