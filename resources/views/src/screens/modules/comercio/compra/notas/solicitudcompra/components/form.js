
import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Col, Row, Table } from 'antd';
import { C_Date, C_Input, C_Message, C_Select } from '../../../../../../../components';
import { Functions } from '../../../../../../../utils/functions';

import M_ListadoSucursal from '../../../../venta/data/sucursal/modal/listado';
import M_ListadoAlmacen from '../../../../inventario/data/almacen/modal/listado';
import M_ListadoConceptoCompra from '../../../data/conceptocompra/modal/listado';
import M_ListadoSeccionInventario from '../../../../inventario/data/seccion/modal/listado';
import M_ListadoProveedor from '../../../data/proveedor/modal/listado';
import M_ListadoUnidadMedidaProducto from '../../../../inventario/data/unidadmedidaproducto/modal/listado';

import { columns } from './column';
import M_ListadoProducto from '../../../../inventario/data/producto/modal/listado';

function C_Form( props ) {
    const { solicitudCompra, disabled, onChange } = props;
    const { codigo, idsolicitudcompra, focusInput, error, message } = solicitudCompra;

    const [ visible_seccion, setVisibleSeccion ] = useState(false);
    const [ visible_sucursal, setVisibleSucursal ] = useState(false);
    const [ visible_almacen, setVisibleAlmacen ] = useState(false);
    const [ visible_concepto, setVisibleConcepto ] = useState(false);
    const [ visible_proveedor, setVisibleProveedor ] = useState(false);

    const [ row_detalle, setRowDetalle ] = useState( null );

    function onChangeID( value ) {
        solicitudCompra.idsolicitudcompra = value;
        onChange( solicitudCompra );
    };

    function onChangeTipoCambio( value ) {
        if ( value === "" ) value = 0;
        if ( !isNaN( value ) ) {
            if ( Functions.esDecimal( value, 2 ) ) {
                solicitudCompra.tipocambio = Functions.onChangeNumberDecimal(value);
                onChange( solicitudCompra );
            }
        };
    };

    function onChangeFechaSolicitada( value ) {
        solicitudCompra.fechasolicitada = value;
        onChange( solicitudCompra );
    };

    function onChangeCodigo( value ) {
        solicitudCompra.codigo        = value;
        solicitudCompra.error.codigo  = false;
        solicitudCompra.message.codigo = "";
        onChange( solicitudCompra );
    };

    function onChangeTipoSolicitud( value ) {
        solicitudCompra.tiposolicitud = value;
        onChange( solicitudCompra );
    };

    function onChangeNota( value ) {
        solicitudCompra.nota = value;
        onChange( solicitudCompra );
    };

    function onShowSeccion() {
        if ( !disabled.data ) setVisibleSeccion(true);
    };

    function onChangeFKIDSeccionInventario( data ) {
        solicitudCompra.fkidseccioninventario  = data.idseccioninventario;
        solicitudCompra.seccioninventario      = data.descripcion;
        solicitudCompra.error.fkidseccioninventario   = false;
        solicitudCompra.message.fkidseccioninventario = "";

        for (let index = 0; index < solicitudCompra.arraySolicitudCompraDetalle.length; index++) {
            let element = solicitudCompra.arraySolicitudCompraDetalle[index];
            element.fkidseccioninventario = data.idseccioninventario;
            element.seccioninventario = data.descripcion;
        }

        onChange( solicitudCompra );
        setVisibleSeccion(false);
    };

    function componentSeccion() {
        if ( !visible_seccion ) return null;
        return (
            <M_ListadoSeccionInventario
                visible={visible_seccion}
                onClose={ () => setVisibleSeccion(false) }
                value={solicitudCompra.fkidseccioninventario}
                onChange={onChangeFKIDSeccionInventario}
            />
        );
    };

    function onShowSucursal() {
        if ( !disabled.data ) setVisibleSucursal(true);
    };

    function onChangeFKIDSucursal( data ) {
        solicitudCompra.fkidsucursal  = data.idsucursal;
        solicitudCompra.sucursal      = data.descripcion;
        solicitudCompra.error.fkidsucursal   = false;
        solicitudCompra.message.fkidsucursal = "";

        for (let index = 0; index < solicitudCompra.arraySolicitudCompraDetalle.length; index++) {
            let element = solicitudCompra.arraySolicitudCompraDetalle[index];
            element.fkidsucursal = data.idsucursal;
            element.sucursal = data.descripcion;
        }

        onChange( solicitudCompra );
        setVisibleSucursal(false);
    };

    function componentSucursal() {
        if ( !visible_sucursal ) return null;
        return (
            <M_ListadoSucursal
                visible={visible_sucursal}
                onClose={ () => setVisibleSucursal(false) }
                value={solicitudCompra.fkidsucursal}
                onChange={onChangeFKIDSucursal}
            />
        );
    };

    function onShowAlmacen() {
        if ( ( !disabled.data ) && ( typeof solicitudCompra.fkidsucursal === "number" ) ) setVisibleAlmacen(true);
    };

    function onChangeFKIDAlmacen( data ) {
        solicitudCompra.fkidalmacen  = data.idalmacen;
        solicitudCompra.almacen      = data.descripcion;
        solicitudCompra.error.fkidalmacen   = false;
        solicitudCompra.message.fkidalmacen = "";

        for (let index = 0; index < solicitudCompra.arraySolicitudCompraDetalle.length; index++) {
            let element = solicitudCompra.arraySolicitudCompraDetalle[index];
            element.fkidalmacen = data.idalmacen;
            element.almacen = data.descripcion;
        }

        onChange( solicitudCompra );
        setVisibleAlmacen(false);
    };

    function componentAlmacen() {
        if ( !visible_almacen ) return null;
        return (
            <M_ListadoAlmacen
                visible={visible_almacen}
                onClose={ () => setVisibleAlmacen(false) }
                value={solicitudCompra.fkidalmacen}
                onChange={onChangeFKIDAlmacen}
                fkidsucursal={solicitudCompra.fkidsucursal}
            />
        );
    };

    function onShowConcepto() {
        if ( !disabled.data ) setVisibleConcepto(true);
    };

    function onChangeFKIDConceptoCompra( data ) {
        solicitudCompra.fkidconceptocompra  = data.idconceptocompra;
        solicitudCompra.conceptocompra      = data.descripcion;
        solicitudCompra.error.fkidconceptocompra   = false;
        solicitudCompra.message.fkidconceptocompra = "";
        onChange( solicitudCompra );
        setVisibleConcepto(false);
    };

    function componentConcepto() {
        if ( !visible_concepto ) return null;
        return (
            <M_ListadoConceptoCompra
                visible={visible_concepto}
                onClose={ () => setVisibleConcepto(false) }
                value={solicitudCompra.fkidconceptocompra}
                onChange={onChangeFKIDConceptoCompra}
            />
        );
    };

    function onShowProveedor() {
        if ( !disabled.data ) setVisibleProveedor(true);
    };

    function onChangeFKIDProveedor( data ) {
        solicitudCompra.fkidproveedor  = data.idproveedor;
        solicitudCompra.proveedor      = data.nombre;
        solicitudCompra.error.fkidproveedor   = false;
        solicitudCompra.message.fkidproveedor = "";

        for (let index = 0; index < solicitudCompra.arraySolicitudCompraDetalle.length; index++) {
            let element = solicitudCompra.arraySolicitudCompraDetalle[index];
            element.fkidproveedor = data.idproveedor;
            element.proveedor = data.nombre;
        }

        onChange( solicitudCompra );
        setVisibleProveedor(false);
    };

    function componentProveedor() {
        if ( !visible_proveedor ) return null;
        return (
            <M_ListadoProveedor
                visible={visible_proveedor}
                onClose={ () => setVisibleProveedor(false) }
                value={solicitudCompra.fkidproveedor}
                onChange={onChangeFKIDProveedor}
            />
        );
    };

    function onVisibleProducto( detalle, index ) {
        detalle.index = index;
        detalle.visible_producto = true;
        setRowDetalle(detalle);
    };

    function existProducto( value ) {
        for (let index = 0; index < solicitudCompra.arraySolicitudCompraDetalle.length; index++) {
            const element = solicitudCompra.arraySolicitudCompraDetalle[index];
            if ( element.fkidproducto == value ) return true;
        }
        return false;
    };

    function onFKIDProducto( producto ) {
        if ( !existProducto( producto.idproducto ) ) {
            let detalle = solicitudCompra.arraySolicitudCompraDetalle[row_detalle.index];

            detalle.fkidproducto = producto.idproducto;
            detalle.codigo = producto.codigo ? producto.codigo : "";
            detalle.producto = producto.nombre;
            detalle.unidadmedida = `${parseFloat(producto.valorequivalente).toFixed(2)} ${producto.abreviatura}`;

            detalle.fkidciudadorigen = producto.fkidciudadorigen;
            detalle.ciudadorigen = producto.ciudadorigen;

            detalle.fkidproductomarca = producto.fkidproductomarca;
            detalle.productomarca = producto.productomarca;

            detalle.fkidproductotipo = producto.fkidproductotipo;
            detalle.productotipo = producto.productotipo;

            detalle.stockactual = parseInt(producto.stockactual);
            detalle.cantidadsolicitada = 0;
            detalle.cantidadpendiente = 0;

            detalle.costobase = parseFloat(producto.costounitario).toFixed(2);
            detalle.costounitario = parseFloat(producto.costounitario).toFixed(2);
            detalle.costosubtotal = "0.00";
            detalle.errorcantidad = false;
            detalle.errorcostounitario = false;

            onChange(solicitudCompra);
            setRowDetalle(null);
        } else {
            C_Message( "warning", "Producto ya seleccionado" );
        }
    };

    function componentProducto() {
        if ( row_detalle === null ) return null;
        if ( !row_detalle.visible_producto ) return null;
        return (
            <M_ListadoProducto
                visible={row_detalle.visible_producto}
                onClose={ () =>  setRowDetalle(null) }
                value={row_detalle.fkidproducto}
                onChange={onFKIDProducto}
            />
        );
    };

    return (
        <>

            { componentSeccion() }
            { componentSucursal() }
            { componentAlmacen() }
            { componentConcepto() }
            { componentProveedor() }

            { componentProducto() }

            <Row gutter={ [12, 8] }>
                <Col xs={{ span: 24, }} sm={{ span: 4, }}>
                    <C_Input
                        label={ "Nro"}
                        placeholder={ "INGRESAR NRO..." }
                        value={ idsolicitudcompra }
                        onChange={ onChangeID }
                        disabled={ disabled.iddata }
                        onPressEnter={ props.onPressEnter }
                        autoFocus={true}
                        focus={ focusInput }
                    />
                </Col>
                <Col sm={{ span: 4, }}></Col>
                <Col xs={{ span: 24, }} sm={{ span: 4, }}>
                    <C_Select
                        label={ "Tipo"}
                        placeholder={ "TIPO SOLICITUD" }
                        value={ solicitudCompra.tiposolicitud }
                        onChange={ onChangeTipoSolicitud }
                        disabled={ disabled.data }
                        data={ [
                            { title: "Local",   value: "L" },
                            { title: "Exterior", value: "E" },
                        ] }
                    />
                </Col>
                <Col xs={{ span: 24, }} sm={{ span: 4, }}>
                    <C_Input 
                        label={"Moneda"}
                        value={ solicitudCompra.moneda }
                        disabled={ true }
                    />
                </Col>
                <Col xs={{ span: 24, }} sm={{ span: 4, }}>
                    <C_Input 
                        label={"Tipo Cambio"}
                        value={ solicitudCompra.tipocambio }
                        onChange={ onChangeTipoCambio }
                        disabled={ disabled.data }
                    />
                </Col>
                <Col xs={{ span: 24, }} sm={{ span: 4, }}>
                    <C_Date 
                        label={"Fecha"}
                        value={ solicitudCompra.fechasolicitada }
                        onChange={ onChangeFechaSolicitada }
                        disabled={ disabled.data }
                        allowClear={false}
                    />
                </Col>
            </Row>
            <Row gutter={ [12, 8] }>
                <Col xs={{ span: 24, }} sm={{ span: 8, }}>
                    <C_Input
                        label={"Concepto*"}
                        placeholder={ "SELECCIONAR CONCEPTO..." }
                        value={ solicitudCompra.conceptocompra }
                        onClick={onShowConcepto}
                        disabled={ disabled.data }
                        error={error.fkidconceptocompra}
                        message={message.fkidconceptocompra}
                        select={true}
                    />
                </Col>
                <Col xs={{ span: 24, }} sm={{ span: 8, }}>
                    <C_Input
                        label={ "Solicitado Por"}
                        placeholder={ "INGRESAR SOLICITADO..." }
                        value={ "POR DEFINIR" }
                        disabled
                    />
                </Col>
                <Col xs={{ span: 24, }} sm={{ span: 8, }}>
                    <C_Input
                        label={"Sección*"}
                        placeholder={ "SELECCIONAR SECCIÓN..." }
                        value={ solicitudCompra.seccioninventario }
                        onClick={onShowSeccion}
                        disabled={ disabled.data }
                        error={error.fkidseccioninventario}
                        message={message.fkidseccioninventario}
                        select={true}
                    />
                </Col>
            </Row>
            <Row gutter={ [12, 8] }>
                <Col xs={{ span: 24, }} sm={{ span: 8, }}>
                    <C_Input
                        label={"Sucursal*"}
                        placeholder={ "SELECCIONAR SUCURSAL..." }
                        value={ solicitudCompra.sucursal }
                        onClick={onShowSucursal}
                        disabled={ disabled.data }
                        error={error.fkidsucursal}
                        message={message.fkidsucursal}
                        select={true}
                    />
                </Col>
                <Col xs={{ span: 24, }} sm={{ span: 8, }}>
                    <C_Input
                        label={"Álmacen*"}
                        placeholder={ "SELECCIONAR ÁLMACEN..." }
                        value={ solicitudCompra.almacen }
                        onClick={onShowAlmacen}
                        disabled={ (disabled.data || ( typeof solicitudCompra.fkidsucursal !== 'number' ) ) ? true : false }
                        error={error.fkidalmacen}
                        message={message.fkidalmacen}
                        select={true}
                    />
                </Col>
                <Col xs={{ span: 24, }} sm={{ span: 8, }}>
                    <C_Input
                        label={"Proveedor*"}
                        placeholder={ "SELECCIONAR PROVEEDOR..." }
                        value={ solicitudCompra.proveedor }
                        onClick={onShowProveedor}
                        disabled={ disabled.data }
                        error={error.fkidproveedor}
                        message={message.fkidproveedor}
                        select={true}
                    />
                </Col>
            </Row>
            <div className="main-card card mb-1 mt-3 pl-1 pr-1 pb-1">
                <Table 
                    pagination={false} bordered size={"small"}
                    style={{ width: "100%", minWidth: "100%", maxWidth: "100%", }}
                    columns={ columns( solicitudCompra, disabled, onChange, onVisibleProducto ) } 
                    dataSource={solicitudCompra.arraySolicitudCompraDetalle}
                    scroll={{ x: 2200, y: solicitudCompra.arraySolicitudCompraDetalle.length == 0 ? 40 : 150 }}
                />
            </div>
            <Row gutter={ [12, 8] }>
                <Col xs={{ span: 24, }} sm={{ span: 16, }}>
                    <C_Input
                        label={ "Nota"}
                        placeholder={ "INGRESAR NOTA..." }
                        value={ solicitudCompra.nota }
                        onChange={ onChangeNota }
                        disabled={ disabled.data }
                        multiline minRows={2} maxRows={3}
                    />
                </Col>
                <Col xs={{ span: 24, }} sm={{ span: 4, }}>
                    <C_Input
                        label={ "Cant. Total"}
                        value={ solicitudCompra.cantidadsolicitadatotal }
                        readOnly
                    />
                </Col>
                <Col xs={{ span: 24, }} sm={{ span: 4, }}>
                    <C_Input
                        label={ "Mto. Total"}
                        value={ solicitudCompra.montototal }
                        readOnly
                    />
                </Col>
            </Row>
        </>
    );
};

C_Form.propTypes = {
    solicitudCompra: PropTypes.object,
    disabled:  PropTypes.object,

    onChange:     PropTypes.func.isRequired,
    onPressEnter: PropTypes.func,
};

C_Form.defaultProps = {
    onChange: ( evt ) => {},
};

export default C_Form;
