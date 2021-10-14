
import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Col, Row, Table, Tooltip } from 'antd';
import { CloseOutlined, DeleteOutlined } from '@ant-design/icons';
import { C_Button, C_Checkbox, C_Image, C_Input, C_Message } from '../../../../../../../components';

import { Functions } from '../../../../../../../utils/functions';
import { listaPrecioColumns } from './listaPrecioColumn';

import M_ListadoProductoTipo from '../../productotipo/modal/listado';
import M_ListadoCategoria from '../../categoria/modal/listado';
import M_TreeCiudad from '../../ciudad/modal/listado';

import M_ListadoProductoMarca from '../../productomarca/modal/listado';
import M_ListadoProductoGrupo from '../../productogrupo/modal/listado';
import M_ListadoProductoSubGrupo from '../../productosubgrupo/modal/listado';

import M_ListadoUnidadMedida from '../../unidadmedida/modal/listado';
import M_ListadoProveedor from '../../../../compra/data/proveedor/modal/listado';

function C_Form( props ) {
    const { producto, disabled, onChange } = props;
    const { descripcion, idproducto } = producto;
    const { focusInput, error, message } = producto;

    const [ visible_tipo, setVisibleTipo ] = useState( false );
    const [ visible_origen, setVisibleOrigen ] = useState( false );
    const [ visible_categoria, setVisibleCategoria ] = useState( false );
    const [ visible_marca, setVisibleMarca ] = useState( false );
    const [ visible_grupo, setVisibleGrupo ] = useState( false );
    const [ visible_subgrupo, setVisibleSubGrupo ] = useState( false );

    const [ visible_unidadmedida, setVisibleUnidadMedida ] = useState( false );
    const [ unidadmedidadetalle, setUnidadMedidaDetalle ] = useState( null );

    const [ visible_proveedor, setVisibleProveedor ] = useState( false );
    const [ proveedordetalle, setProveedorDetalle ] = useState( null );

    function onChangeID( value ) {
        producto.idproducto = value;
        onChange( producto );
    };

    function onChangeEstado() {
        producto.estado = (producto.estado === "A") ? "N" : "A";
        onChange( producto );
    }

    function onChangeNivel( value ) {
        if ( value == "" ) value = 0;
        if ( !isNaN( value ) ) {
            producto.nivel = parseInt(value);
            onChange( producto );
        };
    };

    function onChangeCodigo( value ) {
        producto.codigo        = value;
        producto.error.codigo  = false;
        producto.message.codigo = "";
        onChange( producto );
    };

    function onChangeNombre( value ) {
        producto.nombre        = value;
        producto.error.nombre  = false;
        producto.message.nombre = "";
        onChange( producto );
    };

    function onChangeDescripcion( value ) {
        producto.descripcion        = value;
        producto.error.descripcion  = false;
        producto.message.descripcion = "";
        onChange( producto );
    };

    function onChangeImage( value ) {
        producto.imagen = value;
        onChange( producto );
    };

    function onShowTipo() {
        if ( !disabled.data ) setVisibleTipo(true);
    };

    function onChangeFKIDProductoTipo( data ) {
        producto.fkidproductotipo  = data.idproductotipo;
        producto.productotipo      = data.descripcion;
        producto.error.fkidproductotipo   = false;
        producto.message.fkidproductotipo = "";
        onChange( producto );
        setVisibleTipo(false);
    };

    function componentTipo() {
        if ( !visible_tipo ) return null;
        return (
            <M_ListadoProductoTipo
                visible={visible_tipo}
                onClose={ () => setVisibleTipo(false) }
                value={producto.fkidproductotipo}
                onChange={onChangeFKIDProductoTipo}
            />
        );
    };

    function onShowOrigen() {
        if ( !disabled.data ) setVisibleOrigen(true);
    };

    function onChangeFKIDCiudadOrigen( data ) {
        producto.fkidciudadorigen  = data.idciudad;
        producto.ciudadorigen      = data.descripcion;
        producto.error.fkidciudadorigen   = false;
        producto.message.fkidciudadorigen = "";
        onChange( producto );
        setVisibleOrigen(false);
    };

    function componentOrigen() {
        if ( !visible_origen ) return null;
        return (
            <M_TreeCiudad
                showChildren={false}
                visible={visible_origen}
                onClose={ () => setVisibleOrigen(false) }
                onSelect={onChangeFKIDCiudadOrigen}
            />
        );
    };

    function onShowCategoria() {
        if ( !disabled.data ) setVisibleCategoria(true);
    };

    function onChangeFKIDCategoria( data ) {
        producto.fkidcategoria  = data.idcategoria;
        producto.categoria      = data.descripcion;
        producto.error.fkidcategoria   = false;
        producto.message.fkidcategoria = "";
        onChange( producto );
        setVisibleCategoria(false);
    };

    function componentCategoria() {
        if ( !visible_categoria ) return null;
        return (
            <M_ListadoCategoria
                visible={visible_categoria}
                onClose={ () => setVisibleCategoria(false) }
                value={producto.fkidcategoria}
                onChange={onChangeFKIDCategoria}
            />
        );
    };

    function onShowMarca() {
        if ( !disabled.data ) setVisibleMarca(true);
    };

    function onChangeFKIDMarca( data ) {
        producto.fkidproductomarca  = data.idproductomarca;
        producto.productomarca      = data.descripcion;
        producto.error.fkidproductomarca   = false;
        producto.message.fkidproductomarca = "";
        onChange( producto );
        setVisibleMarca(false);
    };

    function componentMarca() {
        if ( !visible_marca ) return null;
        return (
            <M_ListadoProductoMarca
                visible={visible_marca}
                onClose={ () => setVisibleMarca(false) }
                value={producto.fkidproductomarca}
                onChange={onChangeFKIDMarca}
            />
        );
    };

    function onShowGrupo() {
        if ( !disabled.data ) setVisibleGrupo(true);
    };

    function onChangeFKIDGrupo( data ) {
        producto.fkidproductogrupo  = data.idproductogrupo;
        producto.productogrupo      = data.descripcion;
        producto.error.fkidproductogrupo   = false;
        producto.message.fkidproductogrupo = "";
        if ( data.productosubgrupo.length > 0 ) {
            producto.fkidproductosubgrupo = data.productosubgrupo[0].idproductosubgrupo;
            producto.productosubgrupo = data.productosubgrupo[0].descripcion;
            producto.error.fkidproductosubgrupo   = false;
            producto.message.fkidproductosubgrupo = "";
        }
        onChange( producto );
        setVisibleGrupo(false);
    };

    function componentGrupo() {
        if ( !visible_grupo ) return null;
        return (
            <M_ListadoProductoGrupo
                visible={visible_grupo}
                onClose={ () => setVisibleGrupo(false) }
                value={producto.fkidproductogrupo}
                onChange={onChangeFKIDGrupo}
            />
        );
    };

    function onShowSubGrupo() {
        if ( ( !disabled.data ) && ( typeof producto.fkidproductogrupo === "number" ) ) setVisibleSubGrupo(true);
    };

    function onChangeFKIDSubGrupo( data ) {
        producto.fkidproductosubgrupo  = data.idproductosubgrupo;
        producto.productosubgrupo      = data.descripcion;
        producto.error.fkidproductosubgrupo   = false;
        producto.message.fkidproductosubgrupo = "";
        onChange( producto );
        setVisibleSubGrupo(false);
    };

    function componentSubGrupo() {
        if ( !visible_subgrupo ) return null;
        return (
            <M_ListadoProductoSubGrupo
                visible={visible_subgrupo}
                onClose={ () => setVisibleSubGrupo(false) }
                value={producto.fkidproductosubgrupo}
                onChange={onChangeFKIDSubGrupo}
                fkidproductogrupo={ ( typeof producto.fkidproductogrupo === "number" ) ? producto.fkidproductogrupo : null } 
            />
        );
    };

    function onShowUnidadMedida( unidadmedida ) {
        if ( !disabled.data ) {
            setUnidadMedidaDetalle( unidadmedida );
            setVisibleUnidadMedida(true);
        };
    };

    function componentUnidadMedida() {
        if ( !visible_unidadmedida ) return null;
        return (
            <M_ListadoUnidadMedida
                visible={visible_unidadmedida}
                onClose={ () => {
                    setUnidadMedidaDetalle(null);
                    setVisibleUnidadMedida(false);
                } }
                value={unidadmedidadetalle.fkidunidadmedida}
                onChange={ (data) => {
                    let detalle = producto.arrayUnidadMedidaProducto[unidadmedidadetalle.index];
                    detalle.fkidunidadmedida = data.idunidadmedida;
                    detalle.unidadmedida = data.descripcion;
                    detalle.message.fkidunidadmedida = "";
                    detalle.error.fkidunidadmedida = false;
                    onChange( producto );
                    setUnidadMedidaDetalle(null);
                    setVisibleUnidadMedida(false);
                } }
            />
        );
    };

    function onChangePeso( data, value ) {
        if ( value === "" ) value = 0;
        if ( !isNaN( value ) ) {
            if ( Functions.esDecimal( value, 2 ) ) {
                value += '';
                const list = value.split('.');
                let peso = `${ parseInt( list[0] ) }${ ( list[1] ) ? `.${ list[1] }` : ( list.length > 1 ) ? '.' : '' }`;
                producto.arrayUnidadMedidaProducto[data.index].peso = peso;
                onChange( producto );
            }
        };
    };

    function onChangeVolumen( data, value ) {
        if ( value === "" ) value = 0;
        if ( !isNaN( value ) ) {
            if ( Functions.esDecimal( value, 2 ) ) {
                value += '';
                const list = value.split('.');
                let volumen = `${ parseInt( list[0] ) }${ ( list[1] ) ? `.${ list[1] }` : ( list.length > 1 ) ? '.' : '' }`;
                producto.arrayUnidadMedidaProducto[data.index].volumen = volumen;
                onChange( producto );
            }
        };
    };

    function onChangeStock( data, value ) {
        if ( value === "" ) value = 0;
        if ( !isNaN( value ) ) {
            producto.arrayUnidadMedidaProducto[data.index].stock = parseInt(value);
            onChange( producto );
        };
    };

    function onChangeCosto( data, value ) {
        if ( value === "" ) value = 0;
        if ( !isNaN( value ) ) {
            if ( Functions.esDecimal( value, 2 ) ) {
                value += '';
                const list = value.split('.');
                let costo = `${ parseInt( list[0] ) }${ ( list[1] ) ? `.${ list[1] }` : ( list.length > 1 ) ? '.' : '' }`;
                producto.arrayUnidadMedidaProducto[data.index].costounitario = costo;

                let detalle = producto.arrayUnidadMedidaProducto[data.index];
                let montodescuento = parseFloat( ( detalle.costodescuento * 1 / 100 ) * detalle.costounitario );
                producto.arrayUnidadMedidaProducto[data.index].costo = parseFloat( detalle.costounitario - montodescuento ).toFixed(2);

                onChange( producto );
            }
        };
    };

    function onChangeCostoDescuento( data, value ) {
        if ( value === "" ) value = 0;
        if ( !isNaN( value ) ) {
            let detalle = producto.arrayUnidadMedidaProducto[data.index];
            producto.arrayUnidadMedidaProducto[data.index].costodescuento = parseInt(value);
            let montodescuento = parseFloat( ( value * 1 / 100 ) * detalle.costounitario );
            producto.arrayUnidadMedidaProducto[data.index].costo = parseFloat( detalle.costounitario - montodescuento ).toFixed(2);
            onChange( producto );
        };
    };

    function AddRowUnidadMedida() {
        const element = {
            idunidadmedidaproducto: null,
            codigo: null,
            fkidunidadmedida: null,
            unidadmedida: "",
            peso: "0.00",
            volumen: "0.00",
            stock: "0",
            costo: "0.00",
            costodescuento: "0",
            costomontodescuento: "0.00",
            costounitario: "0.00",
            error: {
                codigo: false,
                fkidunidadmedida: false,
            },
            message: {
                codigo: "",
                fkidunidadmedida: "",
            },
        };
        producto.arrayUnidadMedidaProducto = [ ...producto.arrayUnidadMedidaProducto, element];
        onChange( producto );
    };

    function DeleteRowUnidadMedida( pos ) {
        if ( producto.arrayUnidadMedidaProducto.length > 1 ) {
            let arrayUnidadMedidaProducto = producto.arrayUnidadMedidaProducto;
            let idunidadmedidaproducto = arrayUnidadMedidaProducto[pos].idunidadmedidaproducto;
            if ( idunidadmedidaproducto !== null ) {
                producto.arrayDeleteUnidadMedida = [ ...producto.arrayDeleteUnidadMedida, idunidadmedidaproducto];
            }
            producto.arrayUnidadMedidaProducto = arrayUnidadMedidaProducto.filter( ( item, index ) => index !== pos );
            onChange( producto );
        } else {
            C_Message( "warning", "Acción no permitida" );
        }
    };

    function onShowProveedor( proveedor ) {
        if ( !disabled.data ) {
            setProveedorDetalle( proveedor );
            setVisibleProveedor(true);
        };
    };

    function existProveedor( value ) {
        for (let index = 0; index < producto.arrayProveedor.length; index++) {
            const element = producto.arrayProveedor[index];
            if ( element.fkidproveedor === value ) return true;
        }
        return false;
    };

    function onChangeFKIDProveedor( data ) {
        if ( !existProveedor( data.idproveedor ) ) {
            producto.arrayProveedor[proveedordetalle.index].fkidproveedor = data.idproveedor;
            producto.arrayProveedor[proveedordetalle.index].proveedor = data.nombre;
            onChange( producto );
            setProveedorDetalle(null);
            setVisibleProveedor(false);
        } else {
            C_Message( "warning", "Proveedor ya seleccionado" );
        }
    };

    function componentProveedor() {
        if ( !visible_proveedor ) return null;
        return (
            <M_ListadoProveedor
                visible={visible_proveedor}
                onClose={ () => {
                    setProveedorDetalle(null);
                    setVisibleProveedor(false);
                } }
                value={proveedordetalle.fkidproveedor}
                onChange={ onChangeFKIDProveedor }
            />
        );
    };

    function AddRowProveedor() {
        const element = {
            idproveedorproducto: null,
            fkidproveedor: null,
            proveedor: "",
        };
        producto.arrayProveedor = [ ...producto.arrayProveedor, element];
        onChange( producto );
    };

    function DeleteRowProveedor( pos ) {
        if ( producto.arrayProveedor.length > 1 ) {
            let arrayProveedor = producto.arrayProveedor;
            let idproveedorproducto = arrayProveedor[pos].idproveedorproducto;
            if ( idproveedorproducto !== null ) {
                producto.arrayDeleteProveedor = [ ...producto.arrayDeleteProveedor, idproveedorproducto];
            }
            producto.arrayProveedor = arrayProveedor.filter( ( item, index ) => index !== pos );
            onChange( producto );
        } else {
            C_Message( "warning", "Acción no permitida" );
        }
    };

    return (
        <>

            { componentTipo() }
            { componentOrigen() }
            { componentCategoria() }
            { componentMarca() }
            { componentGrupo() }
            { componentSubGrupo() }
            { componentUnidadMedida() }
            { componentProveedor() }

            <Row gutter={ [12, 8] }>
                <Col xs={{ span: 24, }} sm={{ span: 4, }}>
                    <C_Input
                        label={ "Nro."}
                        placeholder={ "INGRESAR NRO..." }
                        value={ idproducto }
                        onChange={ onChangeID }
                        disabled={ disabled.iddata }
                        onPressEnter={ props.onPressEnter }
                        autoFocus={true}
                        focus={ focusInput }
                    />
                </Col>
                <Col sm={{ span: 6, }}></Col>
                {/* <Col xs={{ span: 24, }} sm={{ span: 4, }}>
                    <C_Input
                        label={ "Código"}
                        placeholder={ "INGRESAR CÓDIGO..." }
                        value={ producto.codigo }
                        onChange={ onChangeCodigo }
                        disabled={ disabled.data }
                        error={error.codigo}
                        message={message.codigo}
                    />
                </Col> */}
                <Col xs={{ span: 24, }} sm={{ span: 4, }}>
                    <C_Input
                        label={"Tipo"}
                        placeholder={ "SELECCIONAR TIPO..." }
                        value={ producto.productotipo }
                        onClick={onShowTipo}
                        disabled={ disabled.data }
                        error={error.fkidproductotipo}
                        message={message.fkidproductotipo}
                        select={true}
                    />
                </Col>
                <Col xs={{ span: 24, }} sm={{ span: 4, }}>
                    <C_Input
                        label={"Origen"}
                        placeholder={ "SELECCIONAR ORIGEN..." }
                        value={ producto.ciudadorigen }
                        onClick={onShowOrigen}
                        disabled={ disabled.data }
                        error={error.fkidciudadorigen}
                        message={message.fkidciudadorigen}
                        select={true}
                    />
                </Col>
                <Col xs={{ span: 24, }} sm={{ span: 2, }}>
                    <C_Input
                        label={ "Nivel"}
                        placeholder={ "INGRESAR NIVEL..." }
                        value={ producto.nivel }
                        onChange={ onChangeNivel }
                        disabled={ disabled.data }
                    />
                </Col>
                <Col xs={{ span: 24, }} sm={{ span: 4, }} className="d-flex justify-content-start align-items-center mt-1">
                    <C_Checkbox disabled={disabled.data}
                        titleText={ (producto.estado === "A") ? "Activo" : "Inactivo" } 
                        checked={ (producto.estado === "A") }
                        onChange={ onChangeEstado }
                    />
                </Col>
            </Row>

            <div className="main-card mb-3 mt-3 card pl-1 pr-1 pb-2 pt-1">
                <Row gutter={ [12, 8] }>
                    <Col xs={{ span: 24, }} sm={{ span: 16, }}>
                        <Row gutter={ [12, 8] }>
                            <Col xs={{ span: 24, }} sm={{ span: 16, }}>
                                <C_Input
                                    label={"Nombre"}
                                    placeholder={ "INGRESAR NOMBRE..." }
                                    value={ producto.nombre }
                                    onChange={ onChangeNombre }
                                    disabled={ disabled.data }
                                    error={error.nombre}
                                    message={message.nombre}
                                />
                            </Col>
                            <Col xs={{ span: 24, }} sm={{ span: 8, }}>
                                <C_Input
                                    label={"Categoría"}
                                    placeholder={ "SELECCIONAR CATEGORÍA..." }
                                    value={ producto.categoria }
                                    onClick={onShowCategoria}
                                    disabled={ disabled.data }
                                    error={error.fkidcategoria}
                                    message={message.fkidcategoria}
                                    select={true}
                                />
                            </Col>
                        </Row>
                        <Row gutter={ [12, 8] }>
                            <Col xs={{ span: 24, }} sm={{ span: 24, }}>
                                <C_Input
                                    label={ "Descripción"}
                                    placeholder={ "INGRESAR DESCRIPCIÓN..." }
                                    value={ descripcion }
                                    onChange={ onChangeDescripcion }
                                    disabled={ disabled.data }
                                    multiline minRows={2} maxRows={3}
                                />
                            </Col>
                        </Row>
                        <Row gutter={ [12, 8] } className="mb-2">
                            <Col xs={{ span: 24, }} sm={{ span: 8, }}>
                                <C_Input
                                    label={"Marca"}
                                    placeholder={ "SELECCIONAR MARCA..." }
                                    value={ producto.productomarca }
                                    onClick={onShowMarca}
                                    disabled={ disabled.data }
                                    error={error.fkidproductomarca}
                                    message={message.fkidproductomarca}
                                    select={true}
                                />
                            </Col>
                            <Col xs={{ span: 24, }} sm={{ span: 8, }}>
                                <C_Input
                                    label={"Grupo"}
                                    placeholder={ "SELECCIONAR GRUPO..." }
                                    value={ producto.productogrupo }
                                    onClick={onShowGrupo}
                                    disabled={ disabled.data }
                                    error={error.fkidproductogrupo}
                                    message={message.fkidproductogrupo}
                                    select={true}
                                />
                            </Col>
                            <Col xs={{ span: 24, }} sm={{ span: 8, }}>
                                <C_Input
                                    label={"Sub Grupo"}
                                    placeholder={ "SELECCIONAR SUB GRUPO..." }
                                    value={ producto.productosubgrupo }
                                    onClick={onShowSubGrupo}
                                    disabled={ ( disabled.data || (typeof producto.fkidproductogrupo !== "number") ) ? true : false }
                                    error={error.fkidproductosubgrupo}
                                    message={message.fkidproductosubgrupo}
                                    select={true}
                                />
                            </Col>
                        </Row>
                        <Row gutter={ [12, 8] } className="mb-2">
                            <Col xs={{ span: 24, }} sm={{ span: 8, }}>
                                <div className="main-card mt-2 card pl-2 pr-2 pb-3 pt-1"
                                    style={{ maxHeight: 170, overflowX: 'hidden', overflowY: 'auto', }}
                                >
                                    { producto.arrayProveedor.map( (item, key) => {
                                        return (
                                            <Col xs={{ span: 24, }} sm={{ span: 24, }} key={key}>
                                                <C_Input
                                                    label={ (key === 0) ? "Proveedor" : "Proveedor Alt." }
                                                    placeholder={ "SELECCIONAR PROVEEDOR..." }
                                                    value={ item.proveedor }
                                                    onClick={ () => {
                                                        item.index = key;
                                                        onShowProveedor(item);
                                                    } }
                                                    disabled={ disabled.data }
                                                    select={true}
                                                    suffix={ ( !disabled.data ) && ( key !== 0 ) &&
                                                        <Tooltip title="ELIMINAR" placement="top" color={'#2db7f5'}>
                                                            <DeleteOutlined 
                                                                className="icon-table-horus"
                                                                onClick={ () => DeleteRowProveedor(key) }
                                                            />
                                                        </Tooltip>
                                                    }
                                                />
                                            </Col>
                                        );
                                    } ) }
                                </div>
                                { ( !disabled.data ) &&
                                    <Row gutter={ [12, 8] } justify={"end"} className={"mt-2"}>
                                        <C_Button color={"link"} onClick={AddRowProveedor}>
                                            Agregar Proveedor
                                        </C_Button>
                                    </Row>
                                }
                            </Col>
                            <Col xs={{ span: 24, }} sm={{ span: 16, }}>
                                <div className="main-card mt-2 card pl-2 pr-2 pb-2 pt-1"
                                    style={{ maxHeight: 200, overflowX: 'hidden', overflowY: 'auto', }}
                                >
                                    { producto.arrayUnidadMedidaProducto.map( (item, key) => {
                                        return (
                                            <div key={key} className="main-card card pl-1 pr-1 pb-1 pt-0 mb-2">
                                                <Row gutter={ [12, 8] }>
                                                    <Col xs={{ span: 24, }} sm={{ span: 24, }}>
                                                        <C_Input
                                                            label={"Código"}
                                                            placeholder={ "INGRESAR CÓDIGO..." }
                                                            value={ item.codigo }
                                                            onChange={ (value) => {
                                                                item.index = key;
                                                                item.codigo = value;
                                                                item.message.codigo = "";
                                                                item.error.codigo = false;
                                                                onChange(producto);
                                                            } }
                                                            disabled={ (disabled.data || ( typeof item.fkidunidadmedida !== "number" ) ) ? true : false }
                                                            message={ item.message.codigo }
                                                            error={ item.error.codigo }
                                                        />
                                                    </Col>
                                                </Row>
                                                <Row gutter={ [12, 8] }>
                                                    <Col xs={{ span: 24, }} sm={{ span: 12, }}>
                                                        <C_Input
                                                            label={"Und. Med."}
                                                            placeholder={ "SELECCIONAR UND MEDIDA..." }
                                                            value={ item.unidadmedida }
                                                            onClick={ () => {
                                                                item.index = key;
                                                                onShowUnidadMedida(item);
                                                            } }
                                                            disabled={ disabled.data }
                                                            select={true}
                                                            message={ item.message.fkidunidadmedida }
                                                            error={ item.error.fkidunidadmedida }
                                                            suffix={ ( !disabled.data ) && ( item.fkidunidadmedida !== null ) &&
                                                                <Tooltip title="QUITAR" placement="top" color={'#2db7f5'}>
                                                                    <CloseOutlined 
                                                                        className="icon-table-horus"
                                                                        style={{ marginLeft: -20, }}
                                                                        onClick={ () => {
                                                                            item.fkidunidadmedida = null;
                                                                            item.unidadmedida = "";
                                                                            item.codigo= null;
                                                                            item.peso = "0.00";
                                                                            item.volumen = "0.00";
                                                                            item.costounitario = "0.00";
                                                                            item.costodescuento = "0";
                                                                            item.stock = "0";
                                                                            item.costo = "0.00";
                                                                            onChange(producto);
                                                                        } }
                                                                    />
                                                                </Tooltip>
                                                            }
                                                        />
                                                    </Col>
                                                    <Col xs={{ span: 24, }} sm={{ span: 12, }}>
                                                        <C_Input
                                                            label={"Costo FOB"}
                                                            placeholder={ "INGRESAR COSTO..." }
                                                            value={ item.costounitario }
                                                            onChange={ (value) => {
                                                                item.index = key;
                                                                onChangeCosto(item, value);
                                                            } }
                                                            disabled={ (disabled.data || ( typeof item.fkidunidadmedida !== "number" ) ) ? true : false }
                                                        />
                                                    </Col>
                                                </Row>
                                                <Row gutter={ [12, 8] }>
                                                    <Col sm={{ span: 24, }} md={{ span: 6, }}>
                                                        <C_Input
                                                            label={"Peso"}
                                                            placeholder={ "INGRESAR PESO..." }
                                                            value={ item.peso }
                                                            onChange={ (value) => {
                                                                item.index = key;
                                                                onChangePeso(item, value);
                                                            } }
                                                            disabled={ (disabled.data || ( typeof item.fkidunidadmedida !== "number" ) ) ? true : false }
                                                        />
                                                    </Col>
                                                    <Col sm={{ span: 24, }} md={{ span: 6, }}>
                                                        <C_Input
                                                            label={"Volumen"}
                                                            placeholder={ "INGRESAR VOLUMEN..." }
                                                            value={ item.volumen }
                                                            onChange={ (value) => {
                                                                item.index = key;
                                                                onChangeVolumen(item, value);
                                                            } }
                                                            disabled={ (disabled.data || ( typeof item.fkidunidadmedida !== "number" ) ) ? true : false }
                                                        />
                                                    </Col>
                                                    <Col xs={{ span: 24, }} sm={{ span: 12, }}>
                                                        <C_Input
                                                            label={"%CIF"}
                                                            placeholder={ "INGRESAR DESC..." }
                                                            value={ item.costodescuento }
                                                            onChange={ (value) => {
                                                                item.index = key;
                                                                onChangeCostoDescuento(item, value);
                                                            } }
                                                            disabled={ (disabled.data || ( typeof item.fkidunidadmedida !== "number" ) ) ? true : false }
                                                        />
                                                    </Col>
                                                </Row>
                                                <Row gutter={ [12, 8] }>
                                                    <Col xs={{ span: 24, }} sm={{ span: 12, }}>
                                                        <C_Input
                                                            label={"Stock"}
                                                            placeholder={ "INGRESAR STOCK..." }
                                                            value={ item.stock }
                                                            onChange={ (value) => {
                                                                item.index = key;
                                                                onChangeStock(item, value);
                                                            } }
                                                            disabled={ (disabled.data || ( typeof item.fkidunidadmedida !== "number" ) ) ? true : false }
                                                        />
                                                    </Col>
                                                    <Col xs={{ span: 24, }} sm={{ span: 12, }}>
                                                        <C_Input
                                                            label={"Costo CIF"}
                                                            placeholder={ "INGRESAR COSTO..." }
                                                            value={ item.costo }
                                                            readOnly
                                                            disabled={ disabled.data }
                                                        />
                                                    </Col>
                                                </Row>
                                                { ( !disabled.data ) && ( key !== 0 ) &&
                                                    <Row gutter={ [12, 8] } justify={"end"} className="mt-1">
                                                        <C_Button color={"danger"} 
                                                            onClick={ () => DeleteRowUnidadMedida(key) }
                                                        >
                                                            Eliminar
                                                        </C_Button>
                                                    </Row>
                                                }
                                            </div>
                                        );
                                    } ) }
                                </div>
                                { ( !disabled.data ) &&
                                    <Row gutter={ [12, 8] } justify={"end"} className={"mt-2"}>
                                        <C_Button color={"link"} onClick={AddRowUnidadMedida}>
                                            Agregar Unidad Medida
                                        </C_Button>
                                    </Row>
                                }
                            </Col>
                        </Row>
                    </Col>
                    <Col xs={{ span: 24, }} sm={{ span: 8, }}>
                        <Row gutter={ [12, 8] }>
                            <Col xs={{ span: 24, }} sm={{ span: 24, }}>
                                <Table 
                                    pagination={false} bordered size={"small"}
                                    style={{ width: "100%", minWidth: "100%", maxWidth: "100%", }}
                                    scroll={{ x: 1000, y: producto.arrayListaPrecio.length == 0 ? 40 : 200 }}
                                    columns={ listaPrecioColumns() } dataSource={producto.arrayListaPrecio}
                                />
                            </Col>
                            <Col xs={{ span: 24, }} sm={{ span: 24, }}>
                                <C_Image
                                    data={ producto.imagen }
                                    onChange={onChangeImage}
                                    id="img-producto"
                                    disabled={disabled.data}
                                />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        </>
    );
};

C_Form.propTypes = {
    producto: PropTypes.object,
    disabled:     PropTypes.object,

    onChange:     PropTypes.func.isRequired,
    onPressEnter: PropTypes.func,
};

C_Form.defaultProps = {
    onChange: ( evt ) => {},
};

export default C_Form;
