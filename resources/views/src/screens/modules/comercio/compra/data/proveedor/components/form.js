
import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Col, Row, Tooltip } from 'antd';
import { CloseOutlined, DeleteOutlined } from '@ant-design/icons';
import { C_Button, C_Date, C_Input, C_Message, C_Select } from '../../../../../../../components';

import M_ListadoProveedorGrupo from '../../proveedorgrupo/modal/listado';
import M_ListadoProveedorTipo from '../../proveedortipo/modal/listado';
import M_TreeCiudad from '../../../../inventario/data/ciudad/modal/listado';

import M_ListadoProductoTipo from '../../../../inventario/data/productotipo/modal/listado';
import M_ListadoProveedorCargo from '../../proveedorcargo/modal/listado';

function C_Form( props ) {

    const { proveedor, disabled, onChange } = props;
    const { nombre, idproveedor } = proveedor;
    const { focusInput, error, message } = proveedor;

    const [ visible_proveedortipo, setVisibleProveedorTipo ] = useState( false );
    const [ visible_proveedorgrupo, setVisibleProveedorGrupo ] = useState( false );
    const [ visible_ciudadpais, setVisibleCiudadPais ] = useState( false );
    const [ visible_ciudad, setVisibleCiudad ] = useState( false );

    const [ visible_productotipo, setVisibleProductoTipo ] = useState( false );
    const [ productotipodetalle, setProductoTipoDetalle ] = useState( null );

    const [ visible_proveedorcargo, setVisibleProveedorCargo ] = useState( false );
    const [ proveedorcargodetalle, setProveedorCargoDetalle ] = useState( null );

    function onChangeID( value ) {
        proveedor.idproveedor = value;
        onChange( proveedor );
    };

    function onChangeNombre( value ) {
        proveedor.nombre        = value;
        proveedor.error.nombre  = false;
        proveedor.message.nombre = "";
        onChange( proveedor );
    };

    function onChangeNroOrden( value ) {
        proveedor.nroorden = value;
        onChange( proveedor );
    };

    function onChangeFechaAlta( value ) {
        proveedor.fechaalta = value;
        onChange( proveedor );
    };

    function onChangeFechaBaja( value ) {
        proveedor.fechabaja = value;
        onChange( proveedor );
    };

    function onChangeNit( value ) {
        proveedor.nit        = value;
        proveedor.error.nit  = false;
        proveedor.message.nit = "";
        onChange( proveedor );
    };

    function onChangeTipoPersoneria( value ) {
        proveedor.tipopersoneria = value;
        onChange( proveedor );
    };

    function onChangeDireccion( value ) {
        proveedor.direccion        = value;
        proveedor.error.direccion  = false;
        proveedor.message.direccion = "";
        onChange( proveedor );
    };

    function onChangeTelefono( value ) {
        proveedor.telefono        = value;
        proveedor.error.telefono  = false;
        proveedor.message.telefono = "";
        onChange( proveedor );
    };

    function onChangeCelular( value ) {
        proveedor.celular        = value;
        proveedor.error.celular  = false;
        proveedor.message.celular = "";
        onChange( proveedor );
    };

    function onChangeFax( value ) {
        proveedor.fax        = value;
        proveedor.error.fax  = false;
        proveedor.message.fax = "";
        onChange( proveedor );
    };

    function onChangeContacto( value ) {
        proveedor.contacto = value;
        onChange( proveedor );
    };

    function onChangeEmail( value ) {
        proveedor.email        = value;
        proveedor.error.email  = false;
        proveedor.message.email = "";
        onChange( proveedor );
    };

    function onChangeSitioWeb( value ) {
        proveedor.sitioweb = value;
        onChange( proveedor );
    };

    function onChangeDiasCredito( value ) {
        proveedor.diascredito = value;
        onChange( proveedor );
    };
    
    function onChangeFormaPago( value ) {
        proveedor.formadepago = value;
        onChange( proveedor );
    };

    function onShowProveedorTipo() {
        if ( !disabled.data ) setVisibleProveedorTipo(true);
    };

    function onShowProveedorGrupo() {
        if ( !disabled.data ) setVisibleProveedorGrupo(true);
    };

    function onShowCiudadPais() {
        if ( !disabled.data ) setVisibleCiudadPais(true);
    };

    function onShowCiudad() {
        if ( ( !disabled.data ) && ( typeof proveedor.fkidciudadpais === "number"  ) ) setVisibleCiudad(true);
    };

    function componentProveedorTipo() {
        if ( !visible_proveedortipo ) return null;
        return (
            <M_ListadoProveedorTipo
                visible={visible_proveedortipo}
                onClose={ () => setVisibleProveedorTipo(false) }
                value={proveedor.fkidproveedortipo}
                onChange={ ( data ) => {
                    proveedor.fkidproveedortipo  = data.idproveedortipo;
                    proveedor.proveedortipo      = data.descripcion;
                    proveedor.error.fkidproveedortipo   = false;
                    proveedor.message.fkidproveedortipo = "";
                    onChange( proveedor );
                    setVisibleProveedorTipo(false);
                } }
            />
        );
    };

    function componentProveedorGrupo() {
        if ( !visible_proveedorgrupo ) return null;
        return (
            <M_ListadoProveedorGrupo
                visible={visible_proveedorgrupo}
                onClose={ () => setVisibleProveedorGrupo(false) }
                value={proveedor.fkidproveedorgrupo}
                onChange={ ( data ) => {
                    proveedor.fkidproveedorgrupo  = data.idproveedorgrupo;
                    proveedor.proveedorgrupo      = data.descripcion;
                    proveedor.error.fkidproveedorgrupo   = false;
                    proveedor.message.fkidproveedorgrupo = "";
                    onChange( proveedor );
                    setVisibleProveedorGrupo(false);
                } }
            />
        );
    };

    function componentCiudadPais() {
        if ( !visible_ciudadpais ) return null;
        return (
            <M_TreeCiudad
                showChildren={false}
                visible={visible_ciudadpais}
                onClose={ () => setVisibleCiudadPais(false) }
                onSelect={ ( data ) => {
                    proveedor.fkidciudadpais  = data.idciudad;
                    proveedor.ciudadpais      = data.descripcion;
                    proveedor.error.fkidciudadpais   = false;
                    proveedor.message.fkidciudadpais = "";
                    onChange( proveedor );
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
                    proveedor.fkidciudad  = data.idciudad;
                    proveedor.ciudad      = data.descripcion;
                    proveedor.error.fkidciudad   = false;
                    proveedor.message.fkidciudad = "";
                    onChange( proveedor );
                    setVisibleCiudad(false);
                } }
                selectedPadre={false}
                fkiddata={proveedor.fkidciudadpais}
                expanded={true}
            />
        );
    };

    function AddRowProductoTipo() {
        const element = {
            idproveedorproductotipo: null,
            fkidproveedor: null,
            fkidproductotipo: null,
            productotipo: "",
        };
        proveedor.arrayProductoTipo = [ ...proveedor.arrayProductoTipo, element];
        onChange( proveedor );
    };

    function DeleteRowProductoTipo( pos ) {
        if ( proveedor.arrayProductoTipo.length > 1 ) {
            let arrayProductoTipo = proveedor.arrayProductoTipo;
            let idproveedorproductotipo = arrayProductoTipo[pos].idproveedorproductotipo;
            if ( idproveedorproductotipo !== null ) {
                proveedor.arrayDeleteProductoTipo = [ ...proveedor.arrayDeleteProductoTipo, idproveedorproductotipo];
            }
            proveedor.arrayProductoTipo = arrayProductoTipo.filter( ( item, index ) => index !== pos );
            onChange( proveedor );
        } else {
            C_Message( "warning", "Acción no permitida" );
        }
    };

    function existProductoTipo( value ) {
        for (let index = 0; index < proveedor.arrayProductoTipo.length; index++) {
            const element = proveedor.arrayProductoTipo[index];
            if ( element.fkidproductotipo === value ) return true;
        }
        return false;
    };

    function onShowProductoTipo( productotipo ) {
        if ( !disabled.data ) {
            setProductoTipoDetalle( productotipo );
            setVisibleProductoTipo(true);
        };
    };

    function onChangeFKIDProductoTipo( data ) {
        if ( !existProductoTipo( data.idproductotipo ) ) {
            proveedor.arrayProductoTipo[productotipodetalle.index].fkidproductotipo = data.idproductotipo;
            proveedor.arrayProductoTipo[productotipodetalle.index].productotipo = data.descripcion;
            onChange( proveedor );
            setProductoTipoDetalle(null);
            setVisibleProductoTipo(false);
        } else {
            C_Message( "warning", "Producto Tipo ya existe" );
        }
    };

    function componentProductoTipo() {
        if ( !visible_productotipo ) return null;
        return (
            <M_ListadoProductoTipo
                visible={visible_productotipo}
                onClose={ () => {
                    setProductoTipoDetalle(null);
                    setVisibleProductoTipo(false);
                } }
                value={productotipodetalle.fkidproductotipo}
                onChange={onChangeFKIDProductoTipo}
            />
        );
    };

    function AddRowProveedorPersonal() {
        const element = {
            idproveedorpersonal: null,
            fkidproveedor: null,

            fkidproveedorcargo: null,
            proveedorcargo: "",

            codigo: "",
            nombre: "",
            apellido: "",
            telefono: "",
            celular: "",
            email: "",

            imagen: "",
            extension: "",

            error: {
                nombre: false,
                apellido: false,
                fkidproveedorcargo: false,
            },
            message: {
                nombre: "",
                apellido: "",
                fkidproveedorcargo: "",
            },

        };
        proveedor.arrayProveedorPersonal = [ ...proveedor.arrayProveedorPersonal, element];
        onChange( proveedor );
    };

    function DeleteRowProveedorPersonal( pos ) {
        if ( proveedor.arrayProveedorPersonal.length > 1 ) {
            let arrayProveedorPersonal = proveedor.arrayProveedorPersonal;
            let idproveedorpersonal = arrayProveedorPersonal[pos].idproveedorpersonal;
            if ( idproveedorpersonal !== null ) {
                proveedor.arrayDeleteProveedorPersonal = [ ...proveedor.arrayDeleteProveedorPersonal, idproveedorpersonal];
            }
            proveedor.arrayProveedorPersonal = arrayProveedorPersonal.filter( ( item, index ) => index !== pos );
            onChange( proveedor );
        } else {
            C_Message( "warning", "Acción no permitida" );
        }
    };

    function onShowProveedorCargo( proveedorcargo ) {
        if ( !disabled.data ) {
            setProveedorCargoDetalle( proveedorcargo );
            setVisibleProveedorCargo(true);
        };
    };

    function componentProveedorCargo() {
        if ( !visible_proveedorcargo ) return null;
        return (
            <M_ListadoProveedorCargo
                visible={visible_proveedorcargo}
                onClose={ () => {
                    setProveedorCargoDetalle(null);
                    setVisibleProveedorCargo(false);
                } }
                value={proveedorcargodetalle.fkidproveedorcargo}
                onChange={ (data) => {
                    let detalle = proveedor.arrayProveedorPersonal[proveedorcargodetalle.index];
                    detalle.fkidproveedorcargo = data.idproveedorcargo;
                    detalle.proveedorcargo = data.descripcion;
                    detalle.error.fkidproveedorcargo = false;
                    detalle.message.fkidproveedorcargo = "";
                    onChange( proveedor );
                    setProveedorCargoDetalle(null);
                    setVisibleProveedorCargo(false);
                } }
            />
        );
    };

    return (
        <>

            { componentProveedorTipo() }
            { componentProveedorGrupo() }
            { componentCiudad() }
            { componentCiudadPais() }

            { componentProductoTipo() }
            { componentProveedorCargo() }

            <Row gutter={ [12, 8] }>
                <Col xs={{ span: 24, }} sm={{ span: 4, }}>
                    <C_Input
                        label={ "Código"}
                        placeholder={ "INGRESAR CÓDIGO..." }
                        value={ idproveedor }
                        onChange={ onChangeID }
                        disabled={ disabled.iddata }
                        onPressEnter={ props.onPressEnter }
                        autoFocus={true}
                        focus={ focusInput }
                    />
                </Col>
                <Col xs={{ span: 0, }} sm={{ span: 0, }} md={{ span: 0, }} lg={{ span: 4, }}></Col>
                <Col xs={{ span: 24, }} sm={{ span: 4, }} md={{ span: 4, }} lg={{ span: 3, }}>
                    <C_Input 
                        label={"Nro Orden"}
                        value={ proveedor.nroorden }
                        onChange={ onChangeNroOrden }
                        disabled={ disabled.data }
                    />
                </Col>
                <Col xs={{ span: 24, }} sm={{ span: 4, }} md={{ span: 4, }} lg={{ span: 3, }}>
                    <C_Date 
                        label={"Alta"}
                        value={ proveedor.fechaalta }
                        onChange={ onChangeFechaAlta }
                        disabled={ disabled.data }
                    />
                </Col>
                <Col xs={{ span: 24, }} sm={{ span: 4, }} md={{ span: 4, }} lg={{ span: 3, }}>
                    <C_Date 
                        label={"Baja"}
                        value={ proveedor.fechabaja }
                        onChange={ onChangeFechaBaja }
                        disabled={ disabled.data }
                    />
                </Col>
                <Col xs={{ span: 24, }} sm={{ span: 4, }} md={{ span: 4, }} lg={{ span: 3, }}>
                    <C_Input
                        label={ "Dia Cred"}
                        placeholder={ "INGRESAR DIAS CREDITO..." }
                        value={ proveedor.diascredito }
                        onChange={ onChangeDiasCredito }
                        disabled={ disabled.data }
                    />
                </Col>
                <Col xs={{ span: 24, }} sm={{ span: 4, }}>
                    <C_Input
                        label={ "Forma pago"}
                        placeholder={ "INGRESAR FORMA DE PAGO..." }
                        value={ proveedor.formadepago }
                        onChange={ onChangeFormaPago }
                        disabled={ disabled.data }
                    />
                </Col>
            </Row>
            <Row gutter={ [12, 8] }>
                <Col xs={{ span: 24, }} sm={{ span: 16, }}>
                    <C_Input
                        label={ "Nombre"}
                        placeholder={ "INGRESAR NOMBRE..." }
                        value={ nombre }
                        onChange={ onChangeNombre }
                        disabled={ disabled.data }
                        error={error.nombre}
                        message={message.nombre}
                    />
                </Col>
                <Col xs={{ span: 24, }} sm={{ span: 4, }}>
                    <C_Input
                        label={ "Nit"}
                        placeholder={ "INGRESAR NIT..." }
                        value={ proveedor.nit }
                        onChange={ onChangeNit }
                        disabled={ disabled.data }
                        error={error.nit}
                        message={message.nit}
                    />
                </Col>
                <Col xs={{ span: 24, }} sm={{ span: 4, }}>
                    <C_Select
                        label={ "Personeria"}
                        placeholder={ "SELECCIONAR PERSONERIA" }
                        value={ proveedor.tipopersoneria }
                        onChange={ onChangeTipoPersoneria }
                        disabled={ disabled.data }
                        data={ [
                            { title: "Juridico", value: "J" },
                            { title: "Natural", value: "N" },
                        ] }
                    />
                </Col>
            </Row>
            <Row gutter={ [12, 8] }>
                <Col xs={{ span: 24, }} sm={{ span: 6, }}>
                    <C_Input
                        label={ "Tipo"}
                        placeholder={ "SELECCIONAR TIPO..." }
                        value={ proveedor.proveedortipo }
                        onClick={onShowProveedorTipo}
                        disabled={ disabled.data }
                        error={error.fkidproveedortipo}
                        message={message.fkidproveedortipo}
                        select={true}
                    />
                </Col>
                <Col xs={{ span: 24, }} sm={{ span: 6, }}>
                    <C_Input
                        label={ "Grupo"}
                        placeholder={ "SELECCIONAR GRUPO..." }
                        value={ proveedor.proveedorgrupo }
                        onClick={onShowProveedorGrupo}
                        disabled={ disabled.data }
                        error={error.fkidproveedorgrupo}
                        message={message.fkidproveedorgrupo}
                        select={true}
                    />
                </Col>
                <Col xs={{ span: 24, }} sm={{ span: 6, }}>
                    <C_Input
                        label={ "Pais"}
                        placeholder={ "SELECCIONAR PAIS..." }
                        value={ proveedor.ciudadpais }
                        onClick={onShowCiudadPais}
                        disabled={ disabled.data }
                        error={error.fkidciudadpais}
                        message={message.fkidciudadpais}
                        select={true}
                    />
                </Col>
                <Col xs={{ span: 24, }} sm={{ span: 6, }}>
                    <C_Input
                        label={ "Ciudad"}
                        placeholder={ "SELECCIONAR CIUDAD..." }
                        value={ proveedor.ciudad }
                        onClick={onShowCiudad}
                        disabled={ ( disabled.data || ( typeof proveedor.fkidciudadpais !== "number" ) ) ? true : false }
                        error={error.fkidciudad}
                        message={message.fkidciudad}
                        select={true}
                    />
                </Col>
            </Row>
            <Row gutter={ [12, 8] }>
                <Col xs={{ span: 24, }} sm={{ span: 24, }}>
                    <C_Input
                        label={ "Dirección"}
                        placeholder={ "INGRESAR DIRECCCIÓN..." }
                        value={ proveedor.direccion }
                        onChange={onChangeDireccion}
                        disabled={ disabled.data }
                        error={error.direcccion}
                        message={message.direcccion}
                    />
                </Col>
            </Row>
            <div className="card mb-1 mt-2">
                {/* <div className="card-header card-header-title font-size-lg text-capitalize">
                    Referencia Contacto
                </div> */}
                <div className="card-body pb-2 pt-0">
                    <Row gutter={ [12, 8] }>
                        <Col xs={{ span: 24, }} sm={{ span: 4, }}>
                            <C_Input
                                label={ "Teléfono"}
                                placeholder={ "INGRESAR TELÉFONO..." }
                                value={ proveedor.telefono }
                                onChange={ onChangeTelefono }
                                disabled={ disabled.data }
                                error={error.telefono}
                                message={message.telefono}
                            />
                        </Col>
                        <Col xs={{ span: 24, }} sm={{ span: 4, }}>
                            <C_Input
                                label={ "Celular"}
                                placeholder={ "INGRESAR CELULAR..." }
                                value={ proveedor.celular }
                                onChange={ onChangeCelular }
                                disabled={ disabled.data }
                                error={error.celular}
                                message={message.celular}
                            />
                        </Col>
                        <Col xs={{ span: 24, }} sm={{ span: 4, }}>
                            <C_Input
                                label={ "Fax"}
                                placeholder={ "INGRESAR FAX..." }
                                value={ proveedor.fax }
                                onChange={ onChangeFax }
                                disabled={ disabled.data }
                                error={error.fax}
                                message={message.fax}
                            />
                        </Col>
                        <Col xs={{ span: 24, }} sm={{ span: 12, }}>
                            <C_Input
                                label={ "Contacto"}
                                placeholder={ "INGRESAR CONTACTO..." }
                                value={ proveedor.contacto }
                                onChange={ onChangeContacto }
                                disabled={ disabled.data }
                            />
                        </Col>
                    </Row>
                    <Row gutter={ [12, 8] }>
                        <Col xs={{ span: 24, }} sm={{ span: 8, }}>
                            <C_Input
                                label={ "Email"}
                                placeholder={ "INGRESAR EMAIL..." }
                                value={ proveedor.email }
                                onChange={ onChangeEmail }
                                disabled={ disabled.data }
                                error={error.email}
                                message={message.email}
                            />
                        </Col>
                        <Col xs={{ span: 24, }} sm={{ span: 16, }}>
                            <C_Input
                                label={ "Sitio web"}
                                placeholder={ "INGRESAR SITIO WEB..." }
                                value={ proveedor.sitioweb }
                                onChange={ onChangeSitioWeb }
                                disabled={ disabled.data }
                            />
                        </Col>
                    </Row>
                </div>
            </div>
            <Row gutter={ [12, 8] } className="mb-1">
                <Col xs={{ span: 24, }} sm={{ span: 8, }}>
                    <div className="main-card mt-2 card pl-2 pr-2 pb-2 pt-0"
                        style={{ maxHeight: 160, overflowX: 'hidden', overflowY: 'auto', }}
                    >
                        { proveedor.arrayProductoTipo.map( (item, key) => {
                            return (
                                <Col xs={{ span: 24, }} sm={{ span: 24, }} key={key}>
                                    <C_Input
                                        label={ "Tipo Producto" }
                                        placeholder={ "SELECCIONAR TIPO PRODUCTO..." }
                                        value={ item.productotipo }
                                        onClick={ () => {
                                            item.index = key;
                                            onShowProductoTipo(item);
                                        } }
                                        disabled={ disabled.data }
                                        select={true}
                                        suffix={ ( !disabled.data ) && ( key !== 0 ) &&
                                            <Tooltip title="ELIMINAR" placement="top" color={'#2db7f5'}>
                                                <DeleteOutlined 
                                                    className="icon-table-horus"
                                                    onClick={ () => DeleteRowProductoTipo(key) }
                                                />
                                            </Tooltip>
                                        }
                                    />
                                </Col>
                            );
                        } ) }
                    </div>
                    { ( !disabled.data ) &&
                        <Row gutter={ [12, 8] } justify={"end"} className={"mt-1"}>
                            <C_Button color={"link"} onClick={AddRowProductoTipo}>
                                Agregar Tipo Producto
                            </C_Button>
                        </Row>
                    }
                </Col>
                <Col xs={{ span: 24, }} sm={{ span: 16, }}>
                    <div className="card-header card-subtitle" style={{ height: "2.2rem" }}>
                        Personal de la Empresa
                    </div>
                    <div className="main-card mt-2 card pl-2 pr-2 pb-2 pt-0"
                        style={{ maxHeight: 130, overflowX: 'hidden', overflowY: 'auto', }}
                    >
                        { proveedor.arrayProveedorPersonal.map( (item, key) => {
                            return (
                                <div key={key} className="main-card card pl-1 pr-1 pb-1 pt-0 mb-1">
                                    <Row gutter={ [12, 8] }>
                                        <Col xs={{ span: 24, }} sm={{ span: 8, }}>
                                            <C_Input
                                                label={"Nombre"}
                                                placeholder={ "INGRESAR NOMBRE..." }
                                                value={ item.nombre }
                                                onChange={ (value) => {
                                                    item.index = key;
                                                    item.nombre = value;
                                                    item.error.nombre = false;
                                                    item.message.nombre = "";
                                                    onChange(proveedor);
                                                } }
                                                disabled={ disabled.data }
                                                message={ item.message.nombre }
                                                error={ item.error.nombre }
                                            />
                                        </Col>
                                        <Col xs={{ span: 24, }} sm={{ span: 16, }}>
                                            <C_Input
                                                label={"Apellido"}
                                                placeholder={ "INGRESAR APELLIDO..." }
                                                value={ item.apellido }
                                                onChange={ (value) => {
                                                    item.index = key;
                                                    item.apellido = value;
                                                    item.error.apellido = false;
                                                    item.message.apellido = "";
                                                    onChange(proveedor);
                                                } }
                                                disabled={ disabled.data }
                                                message={ item.message.apellido }
                                                error={ item.error.apellido }
                                            />
                                        </Col>
                                    </Row>
                                    <Row gutter={ [12, 8] }>
                                        <Col xs={{ span: 24, }} sm={{ span: 12, }}>
                                            <C_Input
                                                label={"Cargo"}
                                                placeholder={ "SELECCIONAR CARGO..." }
                                                value={ item.proveedorcargo }
                                                onClick={ () => {
                                                    item.index = key;
                                                    onShowProveedorCargo(item);
                                                } }
                                                disabled={ disabled.data }
                                                select={true}
                                                message={ item.message.fkidproveedorcargo }
                                                error={ item.error.fkidproveedorcargo }
                                                suffix={ ( !disabled.data ) && ( item.fkidproveedorcargo !== null ) &&
                                                    <Tooltip title="QUITAR" placement="top" color={'#2db7f5'}>
                                                        <CloseOutlined 
                                                            className="icon-table-horus"
                                                            style={{ marginLeft: -20, }}
                                                            onClick={ () => {
                                                                item.fkidproveedorcargo = null;
                                                                item.proveedorcargo = "";
                                                                onChange(proveedor);
                                                            } }
                                                        />
                                                    </Tooltip>
                                                }
                                            />
                                        </Col>
                                        <Col xs={{ span: 24, }} sm={{ span: 6, }}>
                                            <C_Input
                                                label={"Teléfono"}
                                                placeholder={ "INGRESAR TELÉFONO..." }
                                                value={ item.telefono }
                                                onChange={ (value) => {
                                                    item.index = key;
                                                    item.telefono = value;
                                                    onChange(proveedor);
                                                } }
                                                disabled={ disabled.data }
                                            />
                                        </Col>
                                        <Col xs={{ span: 24, }} sm={{ span: 6, }}>
                                            <C_Input
                                                label={"Celular"}
                                                placeholder={ "INGRESAR CELULAR..." }
                                                value={ item.celular }
                                                onChange={ (value) => {
                                                    item.index = key;
                                                    item.celular = value;
                                                    onChange(proveedor);
                                                } }
                                                disabled={ disabled.data }
                                            />
                                        </Col>
                                    </Row>
                                    { ( !disabled.data ) && ( key !== 0 ) &&
                                        <Row gutter={ [12, 8] } justify={"end"} className="mt-1">
                                            <C_Button color={"danger"} 
                                                onClick={ () => DeleteRowProveedorPersonal(key) }
                                            >
                                                Eliminar
                                            </C_Button>
                                        </Row>
                                    }
                                </div>
                            ) 
                        } ) }
                    </div>
                    { ( !disabled.data ) &&
                        <Row gutter={ [12, 8] } justify={"end"} className={"mt-2"}>
                            <C_Button color={"link"} onClick={AddRowProveedorPersonal}>
                                Agregar Personal
                            </C_Button>
                        </Row>
                    }
                </Col>
            </Row>
        </>
    );
};

C_Form.propTypes = {
    proveedor: PropTypes.object,
    disabled:     PropTypes.object,

    onChange:     PropTypes.func.isRequired,
    onPressEnter: PropTypes.func,
};

C_Form.defaultProps = {
    onChange: ( evt ) => {},
};

export default C_Form;
