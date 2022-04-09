
import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Col, Row } from 'antd';
import { C_Date, C_Input, C_Message, C_Select } from '../../../../../../../components';
import M_ListadoActividadEconomica from '../../actividadeconomica/modal/listado';

import { Functions } from '../../../../../../../utils/functions';
import M_ListadoSucursal from '../../sucursal/modal/listado';

function C_Form( props ) {
    const { dosificacion, disabled, onChange } = props;
    const { descripcion, iddosificacion } = dosificacion;
    const { focusInput, error, message } = dosificacion;

    const [ visible_actividadeconomica, setVisibleActividadEconomica ] = useState(false);
    const [ visible_sucursal, setVisibleSucursal ] = useState(false);

    function onChangeID( value ) {
        dosificacion.iddosificacion = value;
        onChange( dosificacion );
    };

    function onChangeFechaActivacion( value ) {
        if ( dosificacion.fechalimiteemision === "" ) {
            dosificacion.fechaactivacion        = value;
            dosificacion.error.fechaactivacion  = false;
            dosificacion.message.fechaactivacion = "";
            onChange( dosificacion );
        } else {
            if ( Functions.convertDMYToYMD( value ) <= Functions.convertDMYToYMD( dosificacion.fechalimiteemision ) ) {
                dosificacion.fechaactivacion        = value;
                dosificacion.error.fechaactivacion  = false;
                dosificacion.message.fechaactivacion = "";
                onChange( dosificacion );
            } else {
                C_Message( "warning", "Fecha activación debe ser menor o igual a la fecha límite." );
            }
        }
    };

    function onChangeFechaLimiteEmision( value ) {
        if ( value === "" ) {
            dosificacion.fechalimiteemision        = "";
            dosificacion.error.fechalimiteemision  = false;
            dosificacion.message.fechalimiteemision = "";
            onChange( dosificacion );
        } else {
            if ( Functions.convertDMYToYMD( value ) >= Functions.convertDMYToYMD( dosificacion.fechaactivacion ) ) {
                dosificacion.fechalimiteemision        = value;
                dosificacion.error.fechalimiteemision  = false;
                dosificacion.message.fechalimiteemision = "";
                onChange( dosificacion );
            } else {
                C_Message( "warning", "Fecha limite debe ser mayor o igual a la fecha activación." );
            }
        }
    };

    function onChangeEstado( value ) {
        dosificacion.estado = value;
        onChange( dosificacion );
    };

    function onChangeDescripcion( value ) {
        dosificacion.descripcion        = value;
        dosificacion.error.descripcion  = false;
        dosificacion.message.descripcion = "";
        onChange( dosificacion );
    };

    function onChangeNit( value ) {
        dosificacion.nit        = value;
        dosificacion.error.nit  = false;
        dosificacion.message.nit = "";
        onChange( dosificacion );
    };

    function onChangeNroAutorizacion( value ) {
        dosificacion.nroautorizacion        = value;
        dosificacion.error.nroautorizacion  = false;
        dosificacion.message.nroautorizacion = "";
        onChange( dosificacion );
    };

    function onChangeNumFacturaInicial( value ) {
        if ( value === "" ) value = 0;
        if ( !isNaN( value ) ) {
            dosificacion.numfacturainicial        = value;
            dosificacion.error.numfacturainicial  = false;
            dosificacion.message.numfacturainicial = "";
            onChange( dosificacion );
        }
    };

    function onChangeNumFacturaSiguiente( value ) {
        if ( value === "" ) value = 0;
        if ( !isNaN( value ) ) {
            dosificacion.numfacturasiguiente        = value;
            dosificacion.error.numfacturasiguiente  = false;
            dosificacion.message.numfacturasiguiente = "";
            onChange( dosificacion );
        }
    };

    function onChangeRangoFacturaInicial( value ) {
        if ( value === "" ) value = 0;
        if ( !isNaN( value ) ) {
            dosificacion.rangofacturainicial        = value;
            dosificacion.error.rangofacturainicial  = false;
            dosificacion.message.rangofacturainicial = "";
            onChange( dosificacion );
        }
    };

    function onChangeRangoFacturaFinal( value ) {
        if ( value === "" ) value = 0;
        if ( !isNaN( value ) ) {
            dosificacion.rangofacturafinal        = value;
            dosificacion.error.rangofacturafinal  = false;
            dosificacion.message.rangofacturafinal = "";
            onChange( dosificacion );
        }
    };

    function onChangeTipoSucursal( value ) {
        dosificacion.tiposucursal        = value;
        dosificacion.error.tiposucursal  = false;
        dosificacion.message.tiposucursal = "";
        onChange( dosificacion );
    };

    function onChangeTipoDosificacion( value ) {
        dosificacion.tipodosificacion        = value;
        dosificacion.error.tipodosificacion  = false;
        dosificacion.message.tipodosificacion = "";
        onChange( dosificacion );
    };

    function onChangeTipoEmpresa( value ) {
        dosificacion.tipoempresa        = value;
        dosificacion.error.tipoempresa  = false;
        dosificacion.message.tipoempresa = "";
        onChange( dosificacion );
    };

    function onChangeLugarEmision( value ) {
        dosificacion.lugaremision        = value;
        dosificacion.error.lugaremision  = false;
        dosificacion.message.lugaremision = "";
        onChange( dosificacion );
    };

    function onChangeDireccionFiscal( value ) {
        dosificacion.direccionfiscal        = value;
        dosificacion.error.direccionfiscal  = false;
        dosificacion.message.direccionfiscal = "";
        onChange( dosificacion );
    };

    function onChangeTelefonoFiscal( value ) {
        dosificacion.telefonofiscal        = value;
        dosificacion.error.telefonofiscal  = false;
        dosificacion.message.telefonofiscal = "";
        onChange( dosificacion );
    };

    function onChangeLlave( value ) {
        dosificacion.llave        = value;
        dosificacion.error.llave  = false;
        dosificacion.message.llave = "";
        onChange( dosificacion );
    };

    function onShowActividadEconomica() {
        if ( !disabled.data ) setVisibleActividadEconomica(true);
    };

    function componentActividadEconomica() {
        if ( !visible_actividadeconomica ) return null;
        return (
            <M_ListadoActividadEconomica
                visible={visible_actividadeconomica}
                onClose={ () => setVisibleActividadEconomica(false) }
                value={dosificacion.fkidactividadeconomica}
                onChange={ ( data ) => {
                    dosificacion.fkidactividadeconomica  = data.idactividadeconomica;
                    dosificacion.actividadeconomica      = data.descripcion;
                    dosificacion.error.fkidactividadeconomica   = false;
                    dosificacion.message.fkidactividadeconomica = "";
                    onChange( dosificacion );
                    setVisibleActividadEconomica(false);
                } }
            />
        );
    }

    function onShowSucursal() {
        if ( !disabled.data ) setVisibleSucursal(true);
    };

    function onChangeFKIDSucursal( data ) {
        dosificacion.fkidsucursal  = data.idsucursal;
        dosificacion.sucursal      = data.descripcion;
        dosificacion.error.fkidsucursal   = false;
        dosificacion.message.fkidsucursal = "";
        onChange( dosificacion );
        setVisibleSucursal(false);
    };

    function componentSucursal() {
        if ( !visible_sucursal ) return null;
        return (
            <M_ListadoSucursal
                visible={visible_sucursal}
                onClose={ () => setVisibleSucursal(false) }
                value={dosificacion.fkidsucursal}
                onChange={onChangeFKIDSucursal}
            />
        );
    };

    return (
        <>
            { componentActividadEconomica() }
            { componentSucursal() }
            <Row gutter={ [12, 8] }>
                <Col xs={{ span: 24, }} sm={{ span: 4, }}>
                    <C_Input
                        label={ "Nro."}
                        placeholder={ "INGRESAR NRO..." }
                        value={ iddosificacion }
                        onChange={ onChangeID }
                        disabled={ disabled.iddata }
                        onPressEnter={ props.onPressEnter }
                        autoFocus={true}
                        focus={ focusInput }
                    />
                </Col>
                <Col sm={{ span: 8, }}></Col>
                <Col xs={{ span: 24, }} sm={{ span: 4, }}>
                    <C_Date
                        label={"Fecha activación*"}
                        value={ dosificacion.fechaactivacion }
                        onChange={ onChangeFechaActivacion }
                        disabled={ disabled.data }
                        error={error.fechaactivacion}
                        message={message.fechaactivacion}
                        allowClear={false}
                    />
                </Col>
                <Col xs={{ span: 24, }} sm={{ span: 4, }}>
                    <C_Date
                        label={"Fecha limite*"}
                        value={ dosificacion.fechalimiteemision }
                        onChange={ onChangeFechaLimiteEmision }
                        disabled={ disabled.data }
                        error={error.fechalimiteemision}
                        message={message.fechalimiteemision}
                        allowClear={false}
                    />
                </Col>
                <Col xs={{ span: 24, }} sm={{ span: 4, }}>
                    <C_Select
                        label={ "Estado"}
                        placeholder={ "SELECCIONAR ESTADO" }
                        value={ dosificacion.estado }
                        onChange={ onChangeEstado }
                        disabled={ disabled.data }
                        data={ [
                            { title: "Activo", value: "A" },
                            { title: "Cerrado", value: "N" },
                        ] }
                    />
                </Col>
            </Row>
            <Row gutter={ [12, 8] }>
                <Col xs={{ span: 24, }} sm={{ span: 16, }}>
                    <C_Input
                        label={ "Descripción*"}
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
                        label={"Sucursal"}
                        placeholder={ "SELECCIONAR SUCURSAL..." }
                        value={ dosificacion.sucursal }
                        onClick={onShowSucursal}
                        disabled={ disabled.data }
                        error={error.fkidsucursal}
                        message={message.fkidsucursal}
                        select={true}
                    />
                </Col>
            </Row>
            <Row gutter={ [12, 8] }>
                <Col xs={{ span: 24, }} sm={{ span: 12, }}>
                    <C_Input
                        label={ "Nro. autorización*"}
                        placeholder={ "INGRESAR NRO AUTORIZACIÓN..." }
                        value={ dosificacion.nroautorizacion }
                        onChange={ onChangeNroAutorizacion }
                        disabled={ disabled.data }
                        error={error.nroautorizacion}
                        message={message.nroautorizacion}
                    />
                </Col>
                <Col xs={{ span: 24, }} sm={{ span: 8, }}>
                    <C_Input
                        label={ "Nit*"}
                        placeholder={ "INGRESAR NIT..." }
                        value={ dosificacion.nit }
                        onChange={ onChangeNit }
                        disabled={ disabled.data }
                        error={error.nit}
                        message={message.nit}
                    />
                </Col>
            </Row>
            <Row gutter={ [12, 8] }>
                <Col sm={{ span: 4, }}></Col>
                <Col xs={{ span: 24, }} sm={{ span: 4, }}>
                    <C_Input
                        label={ "Nro. SFC*"}
                        placeholder={ "INGRESAR NRO SFC..." }
                        value={ dosificacion.numfacturainicial }
                        onChange={ onChangeNumFacturaInicial }
                        disabled={ disabled.data }
                        error={error.numfacturainicial}
                        message={message.numfacturainicial}
                    />
                </Col>
                <Col xs={{ span: 24, }} sm={{ span: 4, }}>
                    <C_Input
                        label={ "Último nro. SFC*"}
                        placeholder={ "INGRESAR ÚLTIMO NRO SFC..." }
                        value={ dosificacion.numfacturasiguiente }
                        onChange={ onChangeNumFacturaSiguiente }
                        disabled={ disabled.data }
                        error={error.numfacturasiguiente}
                        message={message.numfacturasiguiente}
                    />
                </Col>
                <Col xs={{ span: 24, }} sm={{ span: 4, }}>
                    <C_Input
                        label={ "Rango Inicial*"}
                        placeholder={ "INGRESAR RANGO INICIAL..." }
                        value={ dosificacion.rangofacturainicial }
                        onChange={ onChangeRangoFacturaInicial }
                        disabled={ disabled.data }
                        error={error.rangofacturainicial}
                        message={message.rangofacturainicial}
                    />
                </Col>
                <Col xs={{ span: 24, }} sm={{ span: 4, }}>
                    <C_Input
                        label={ "Rango Final*"}
                        placeholder={ "INGRESAR RANGO FINCAL..." }
                        value={ dosificacion.rangofacturafinal }
                        onChange={ onChangeRangoFacturaFinal }
                        disabled={ disabled.data }
                        error={error.rangofacturafinal}
                        message={message.rangofacturafinal}
                    />
                </Col>
            </Row>
            <Row gutter={ [12, 8] }>
                <Col xs={{ span: 24, }} sm={{ span: 8, }}>
                    <C_Select
                        label={ "T. Sucursal"}
                        placeholder={ "SELECCIONAR TIPO SUCURSAL" }
                        value={ dosificacion.tiposucursal }
                        onChange={ onChangeTipoSucursal }
                        disabled={ disabled.data }
                        error={error.tiposucursal}
                        message={message.tiposucursal}
                        data={ [
                            { title: "Sucursal", value: "S" },
                            { title: "Casa Matriz", value: "M" },
                        ] }
                    />
                </Col>
                <Col xs={{ span: 24, }} sm={{ span: 8, }}>
                    <C_Select
                        label={ "T. Dosificación"}
                        placeholder={ "SELECCIONAR TIPO DOSIFICACIÓN" }
                        value={ dosificacion.tipodosificacion }
                        onChange={ onChangeTipoDosificacion }
                        disabled={ disabled.data }
                        error={error.tipodosificacion}
                        message={message.tipodosificacion}
                        data={ [
                            { title: "Automático", value: "A" },
                            { title: "Manual", value: "M" },
                        ] }
                    />
                </Col>
                <Col xs={{ span: 24, }} sm={{ span: 8, }}>
                    <C_Select
                        label={ "T. Empresa"}
                        placeholder={ "SELECCIONAR TIPO EMPRESA" }
                        value={ dosificacion.tipoempresa }
                        onChange={ onChangeTipoEmpresa }
                        disabled={ disabled.data }
                        error={error.tipoempresa}
                        message={message.tipoempresa}
                        data={ [
                            { title: "Natural", value: "N" },
                            { title: "Jurídico", value: "M" },
                        ] }
                    />
                </Col>
            </Row>
            <Row gutter={ [12, 8] }>
                <Col xs={{ span: 24, }} sm={{ span: 18, }}>
                    <C_Input
                        label={ "Lugar emisión*"}
                        placeholder={ "INGRESAR LUGAR EMISIÓN..." }
                        value={ dosificacion.lugaremision }
                        onChange={ onChangeLugarEmision }
                        disabled={ disabled.data }
                        error={error.lugaremision}
                        message={message.lugaremision}
                    />
                </Col>
                <Col xs={{ span: 24, }} sm={{ span: 6, }}>
                    <C_Input
                        label={ "Teléfono fiscal*"}
                        placeholder={ "INGRESAR TELÉFONO FISCAL*..." }
                        value={ dosificacion.telefonofiscal }
                        onChange={ onChangeTelefonoFiscal }
                        disabled={ disabled.data }
                        error={error.telefonofiscal}
                        message={message.telefonofiscal}
                    />
                </Col>
            </Row>
            <Row gutter={ [12, 8] }>
                <Col xs={{ span: 24, }} sm={{ span: 24, }}>
                    <C_Input
                        label={ "Dirección fiscal*"}
                        placeholder={ "INGRESAR DIRECCIÓN FISCAL*..." }
                        value={ dosificacion.direccionfiscal }
                        onChange={ onChangeDireccionFiscal }
                        disabled={ disabled.data }
                        error={error.direccionfiscal}
                        message={message.direccionfiscal}
                    />
                </Col>
            </Row>
            <Row gutter={ [12, 8] }>
                <Col xs={{ span: 24, }} sm={{ span: 12, }}>
                    <C_Input
                        label={ "Llave*"}
                        placeholder={ "INGRESAR LLAVE..." }
                        value={ dosificacion.llave }
                        onChange={ onChangeLlave }
                        disabled={ disabled.data }
                        error={error.llave}
                        message={message.llave}
                        multiline={true} maxRows={3} minRows={3}
                    />
                </Col>
                <Col xs={{ span: 24, }} sm={{ span: 12, }} onClick={onShowActividadEconomica}>
                    <C_Input
                        label={ "Actividad económica*"}
                        placeholder={ "SELECCIONAR ACTIVIDAD ECONÓMICA..." }
                        value={ dosificacion.actividadeconomica }
                        disabled={ disabled.data }
                        readOnly
                        style={{ cursor: 'pointer', }}
                        error={error.fkidactividadeconomica}
                        message={message.fkidactividadeconomica}
                        multiline={true} maxRows={3} minRows={3}
                    />
                </Col>
            </Row>
        </>
    );
};

C_Form.propTypes = {
    dosificacion: PropTypes.object,
    disabled:     PropTypes.object,

    onChange:     PropTypes.func.isRequired,
    onPressEnter: PropTypes.func,
};

C_Form.defaultProps = {
    onChange: ( evt ) => {},
};

export default C_Form;
