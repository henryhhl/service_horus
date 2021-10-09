
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { Col, Row, Table } from 'antd';
import { C_Date, C_Input, C_Message, C_Select } from '../../../../../../../components';
import { Functions } from '../../../../../../../utils/functions';
const { convertDMYToYMD } = Functions;

import M_ListadoSucursal from '../../../../venta/data/sucursal/modal/listado';
import M_ListadoAlmacen from '../../../../inventario/data/almacen/modal/listado';
import M_ListadoConceptoCompra from '../../../data/conceptocompra/modal/listado';
import M_ListadoSeccionInventario from '../../../../inventario/data/seccion/modal/listado';
import M_ListadoProveedor from '../../../data/proveedor/modal/listado';
import M_ListadoUnidadMedidaProducto from '../../../../inventario/data/unidadmedidaproducto/modal/listado';
import M_ListadoSolicitudCompra from '../../solicitudcompra/modal/listado';

import { columns } from './column';

function C_Form( props ) {
    const { ordenCompra, disabled, onChange } = props;
    const { codigo, idordencompra, focusInput, error, message } = ordenCompra;

    const [ visible_seccion, setVisibleSeccion ] = useState(false);
    const [ visible_sucursal, setVisibleSucursal ] = useState(false);
    const [ visible_almacen, setVisibleAlmacen ] = useState(false);
    const [ visible_concepto, setVisibleConcepto ] = useState(false);
    const [ visible_proveedor, setVisibleProveedor ] = useState(false);
    const [ visible_solicitudcompra, setVisibleSolicitudCompra ] = useState(false);

    const [ row_detalle, setRowDetalle ] = useState( null );

    function onChangeID( value ) {
        ordenCompra.idordencompra = value;
        onChange( ordenCompra );
    };

    function onChangeTipoCambio( value ) {
        if ( value === "" ) value = 0;
        if ( !isNaN( value ) ) {
            if ( Functions.esDecimal( value, 2 ) ) {
                ordenCompra.tipocambio = Functions.onChangeNumberDecimal(value);
                onChange( ordenCompra );
            }
        };
    };

    function onChangeFletes( value ) {
        if ( value === "" ) value = 0;
        if ( !isNaN( value ) ) {
            if ( Functions.esDecimal( value, 2 ) ) {
                ordenCompra.fletes = Functions.onChangeNumberDecimal(value);
                let fletes = parseFloat(ordenCompra.fletes);
                let internacion = parseFloat(ordenCompra.internacion);
                let otrosgastos = parseFloat(ordenCompra.otrosgastos);
                let montosubtotal = parseFloat(ordenCompra.montosubtotal);
                ordenCompra.montototal = parseFloat(montosubtotal + fletes + internacion + otrosgastos).toFixed(2);
                onChange( ordenCompra );
            }
        };
    };
    
    function onChangeInternacion( value ) {
        if ( value === "" ) value = 0;
        if ( !isNaN( value ) ) {
            if ( Functions.esDecimal( value, 2 ) ) {
                ordenCompra.internacion = Functions.onChangeNumberDecimal(value);
                let fletes = parseFloat(ordenCompra.fletes);
                let internacion = parseFloat(ordenCompra.internacion);
                let otrosgastos = parseFloat(ordenCompra.otrosgastos);
                let montosubtotal = parseFloat(ordenCompra.montosubtotal);
                ordenCompra.montototal = parseFloat(montosubtotal + fletes + internacion + otrosgastos).toFixed(2);
                onChange( ordenCompra );
            }
        };
    };

    function onChangeOtrosGastos( value ) {
        if ( value === "" ) value = 0;
        if ( !isNaN( value ) ) {
            if ( Functions.esDecimal( value, 2 ) ) {
                ordenCompra.otrosgastos = Functions.onChangeNumberDecimal(value);
                let fletes = parseFloat(ordenCompra.fletes);
                let internacion = parseFloat(ordenCompra.internacion);
                let otrosgastos = parseFloat(ordenCompra.otrosgastos);
                let montosubtotal = parseFloat(ordenCompra.montosubtotal);
                ordenCompra.montototal = parseFloat(montosubtotal + fletes + internacion + otrosgastos).toFixed(2);
                onChange( ordenCompra );
            }
        };
    };

    function onChangeFechaSolicitada( value ) {
        ordenCompra.fechasolicitada = value;
        onChange( ordenCompra );
    };

    function onChangeCodigo( value ) {
        ordenCompra.nrofactura        = value;
        ordenCompra.error.nrofactura  = false;
        ordenCompra.message.nrofactura = "";
        onChange( ordenCompra );
    };

    function onChangeTipoSolicitud( value ) {
        ordenCompra.tiposolicitud = value;
        onChange( ordenCompra );
    };

    function onChangeFechaVencimiento( value ) {
        if ( value == "" ) {
            ordenCompra.diasplazo = 0;
            ordenCompra.fechavencimiento = "";
        } else {
            if ( convertDMYToYMD( value ) >= convertDMYToYMD( ordenCompra.fechasolicitada ) ) {
                let fachasolicitada  = moment( convertDMYToYMD( ordenCompra.fechasolicitada ) );
                let fechavencimiento = moment( convertDMYToYMD( value ) );
                let cantDias = fechavencimiento.diff( fachasolicitada, "days" );
                ordenCompra.fechavencimiento = value;
                ordenCompra.diasplazo = cantDias;
            } else {
                C_Message( "warning", "La fecha vcmto. debe ser mayor" );
            }
        }
        onChange( ordenCompra );
    };

    function onChangeNota( value ) {
        ordenCompra.nota = value;
        onChange( ordenCompra );
    };

    function onShowSeccion() {
        if ( !disabled.data ) setVisibleSeccion(true);
    };

    function onChangeFKIDSeccionInventario( data ) {
        ordenCompra.fkidseccioninventario  = data.idseccioninventario;
        ordenCompra.seccioninventario      = data.descripcion;
        ordenCompra.error.fkidseccioninventario   = false;
        ordenCompra.message.fkidseccioninventario = "";
        onChange( ordenCompra );
        setVisibleSeccion(false);
    };

    function componentSeccion() {
        if ( !visible_seccion ) return null;
        return (
            <M_ListadoSeccionInventario
                visible={visible_seccion}
                onClose={ () => setVisibleSeccion(false) }
                value={ordenCompra.fkidseccioninventario}
                onChange={onChangeFKIDSeccionInventario}
            />
        );
    };

    function onShowSucursal() {
        if ( !disabled.data ) setVisibleSucursal(true);
    };

    function onChangeFKIDSucursal( data ) {
        ordenCompra.fkidsucursal  = data.idsucursal;
        ordenCompra.sucursal      = data.descripcion;
        ordenCompra.error.fkidsucursal   = false;
        ordenCompra.message.fkidsucursal = "";
        onChange( ordenCompra );
        setVisibleSucursal(false);
    };

    function componentSucursal() {
        if ( !visible_sucursal ) return null;
        return (
            <M_ListadoSucursal
                visible={visible_sucursal}
                onClose={ () => setVisibleSucursal(false) }
                value={ordenCompra.fkidsucursal}
                onChange={onChangeFKIDSucursal}
            />
        );
    };

    function onShowAlmacen() {
        if ( ( !disabled.data ) && ( typeof ordenCompra.fkidsucursal === "number" ) ) setVisibleAlmacen(true);
    };

    function onChangeFKIDAlmacen( data ) {
        ordenCompra.fkidalmacen  = data.idalmacen;
        ordenCompra.almacen      = data.descripcion;
        ordenCompra.error.fkidalmacen   = false;
        ordenCompra.message.fkidalmacen = "";
        onChange( ordenCompra );
        setVisibleAlmacen(false);
    };

    function componentAlmacen() {
        if ( !visible_almacen ) return null;
        return (
            <M_ListadoAlmacen
                visible={visible_almacen}
                onClose={ () => setVisibleAlmacen(false) }
                value={ordenCompra.fkidalmacen}
                onChange={onChangeFKIDAlmacen}
                fkidsucursal={ordenCompra.fkidsucursal}
            />
        );
    };

    function onShowConcepto() {
        if ( !disabled.data ) setVisibleConcepto(true);
    };

    function onChangeFKIDConceptoCompra( data ) {
        ordenCompra.fkidconceptocompra  = data.idconceptocompra;
        ordenCompra.conceptocompra      = data.descripcion;
        ordenCompra.error.fkidconceptocompra   = false;
        ordenCompra.message.fkidconceptocompra = "";
        onChange( ordenCompra );
        setVisibleConcepto(false);
    };

    function componentConcepto() {
        if ( !visible_concepto ) return null;
        return (
            <M_ListadoConceptoCompra
                visible={visible_concepto}
                onClose={ () => setVisibleConcepto(false) }
                value={ordenCompra.fkidconceptocompra}
                onChange={onChangeFKIDConceptoCompra}
            />
        );
    };

    function onShowProveedor() {
        if ( !disabled.data ) setVisibleProveedor(true);
    };

    function onChangeFKIDProveedor( data ) {
        ordenCompra.fkidproveedor  = data.idproveedor;
        ordenCompra.proveedor      = data.nombre;
        ordenCompra.error.fkidproveedor   = false;
        ordenCompra.message.fkidproveedor = "";
        onChange( ordenCompra );
        setVisibleProveedor(false);
    };

    function componentProveedor() {
        if ( !visible_proveedor ) return null;
        return (
            <M_ListadoProveedor
                visible={visible_proveedor}
                onClose={ () => setVisibleProveedor(false) }
                value={ordenCompra.fkidproveedor}
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
        for (let index = 0; index < ordenCompra.arrayOrdenCompraDetalle.length; index++) {
            const element = ordenCompra.arrayOrdenCompraDetalle[index];
            if ( element.fkidunidadmedidaproducto === value ) return true;
        }
        return false;
    };

    function onFKIDUnidadMedidaProducto( data ) {
        if ( !existProducto( data.idunidadmedidaproducto ) ) {
            let detalle = ordenCompra.arrayOrdenCompraDetalle[row_detalle.index];
            detalle.fkidproducto = data.idproducto;
            detalle.fkidunidadmedidaproducto = data.idunidadmedidaproducto;
            detalle.unidadmedidaproducto = `${parseFloat(data.peso).toFixed(2)} ${data.unidadmedida}`;
            detalle.codigo = data.codigo ? data.codigo : "";
            detalle.producto = data.producto;
            detalle.stockactual = parseInt(data.stock);
            detalle.ciudadorigen = data.origen;
            detalle.cantidad = 0;
            detalle.costounitario = parseFloat(data.costo).toFixed(2);
            detalle.costosubtotal = "0.00";
            detalle.productomarca = data.marca;

            detalle.peso = parseFloat(data.peso).toFixed(2);
            detalle.pesosubtotal = "0.00";

            detalle.volumen = parseFloat(data.volumen).toFixed(2);
            detalle.volumensubtotal = "0.00";

            onChange(ordenCompra);
            setRowDetalle(null);
        } else {
            C_Message( "warning", "Producto ya seleccionado" );
        }
    };

    function componentProducto() {
        if ( row_detalle === null ) return null;
        if ( !row_detalle.visible_producto ) return null;
        return (
            <M_ListadoUnidadMedidaProducto
                visible={row_detalle.visible_producto}
                onClose={ () =>  setRowDetalle(null) }
                value={row_detalle.fkidproducto}
                onChange={onFKIDUnidadMedidaProducto}
            />
        );
    };

    function updateTotales() {
        let cantidadtotal = 0;
        let montototal = 0;
        ordenCompra.arrayOrdenCompraDetalle.map( (item) => {
            if ( item.fkidproducto !== null ) {
                cantidadtotal += parseInt(item.cantidad);
                montototal += parseFloat(item.costosubtotal);
            }
        } );
        ordenCompra.cantidadtotal = parseInt(cantidadtotal);
        ordenCompra.montosubtotal = parseFloat(montototal).toFixed(2);
        let fletes = parseFloat(ordenCompra.fletes);
        let internacion = parseFloat(ordenCompra.internacion);
        let otrosgastos = parseFloat(ordenCompra.otrosgastos);
        let montosubtotal = parseFloat(ordenCompra.montosubtotal);
        ordenCompra.montototal = parseFloat(montosubtotal + fletes + internacion + otrosgastos).toFixed(2);
    };

    function onShowSolicitudCompra() {
        if ( !disabled.data ) setVisibleSolicitudCompra(true);
    };

    function onChangeFKIDSolicitudCompra( data ) {
        console.log(data)
        ordenCompra.fkidsolicitudcompra = data.idsolicitudcompra;
        ordenCompra.tiposolicitud = data.tiposolicitud;

        ordenCompra.fkidseccioninventario = data.fkidseccioninventario;
        ordenCompra.seccioninventario = data.seccioninventario;

        ordenCompra.fkidsucursal = data.fkidsucursal;
        ordenCompra.sucursal = data.sucursal;

        ordenCompra.fkidalmacen = data.fkidalmacen;
        ordenCompra.almacen = data.almacen;

        ordenCompra.fkidconceptocompra = data.fkidconceptocompra;
        ordenCompra.conceptocompra = data.conceptocompra;

        ordenCompra.fkidproveedor = data.fkidproveedor;
        ordenCompra.proveedor = data.proveedor;

        ordenCompra.cantidadtotal = parseInt(data.cantidadsolicitadatotal);

        ordenCompra.montosubtotal = parseFloat(data.montototal).toFixed(2);
        ordenCompra.montototal = parseFloat(data.montototal).toFixed(2);

        let array = [];
        for (let index = 0; index < data.solicitudcompradetalle.length; index++) {
            const detalle = data.solicitudcompradetalle[index];
            let element = {
                key: index,

                codigo: detalle.codigo,
                producto: detalle.nombre,
                ciudadorigen: detalle.ciudadorigen,
                productomarca: detalle.productomarca,

                fkidunidadmedidaproducto: detalle.fkidunidadmedidaproducto,
                unidadmedidaproducto: parseFloat(detalle.peso).toFixed(2) + " " + detalle.abreviatura,

                cantidad: parseInt(detalle.cantidadsolicitada),
                cantidadsolicitada: parseInt(detalle.cantidadsolicitada),

                costounitario: parseFloat(detalle.costounitario).toFixed(2),
                costosubtotal: parseFloat(detalle.costosubtotal).toFixed(2),

                peso: parseFloat(detalle.peso).toFixed(2),
                pesosubtotal: parseFloat(detalle.peso * detalle.cantidad).toFixed(2),

                volumen: parseFloat(detalle.volumen).toFixed(2),
                volumensubtotal: parseFloat(detalle.volumen * detalle.cantidad).toFixed(2),

                fechasolicitada: detalle.fechasolicitada,
                fsolicitada: Functions.convertYMDToDMY(detalle.fechasolicitada),
                
                nota: null,

                visible_producto: false,
                fkidproducto: detalle.idproducto,
                fkidsolicitudcompradetalle: detalle.idsolicitudcompradetalle,
                idordencompradetalle: null,
            };
            array = [ ...array, element ]
        }
        ordenCompra.arrayOrdenCompraDetalle = array;

        onChange( ordenCompra );
        setVisibleSolicitudCompra(false);
    };

    function componentSolicitudCompra() {
        if ( !visible_solicitudcompra ) return null;
        return (
            <M_ListadoSolicitudCompra
                visible={visible_solicitudcompra}
                onClose={ () => setVisibleSolicitudCompra(false) }
                value={ordenCompra.fkidsolicitudcompra}
                onChange={onChangeFKIDSolicitudCompra}
                isordencompra={true}
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
            { componentSolicitudCompra() }

            <Row gutter={ [12, 8] }>
                <Col xs={{ span: 24, }} sm={{ span: 4, }}>
                    <C_Input
                        label={ "Nro"}
                        placeholder={ "INGRESAR NRO..." }
                        value={ idordencompra }
                        onChange={ onChangeID }
                        disabled={ disabled.iddata }
                        onPressEnter={ props.onPressEnter }
                        autoFocus={true}
                        focus={ focusInput }
                    />
                </Col>
                <Col sm={{ span: 4, }}></Col>
                <Col xs={{ span: 24, }} sm={{ span: 4, }}>
                    <C_Input
                        label={"Sol. Comp."}
                        placeholder={ "SELECCIONAR SOLICITUD COMPRA..." }
                        value={ ordenCompra.fkidsolicitudcompra }
                        onClick={onShowSolicitudCompra}
                        disabled={ disabled.data }
                        error={error.fkidsolicitudcompra}
                        message={message.fkidsolicitudcompra}
                        select={true}
                    />
                </Col>
                <Col xs={{ span: 24, }} sm={{ span: 4, }}>
                    <C_Input 
                        label={"Moneda"}
                        value={ ordenCompra.moneda }
                        disabled={ true }
                    />
                </Col>
                <Col xs={{ span: 24, }} sm={{ span: 4, }}>
                    <C_Input 
                        label={"Tipo Cambio"}
                        value={ ordenCompra.tipocambio }
                        onChange={ onChangeTipoCambio }
                        disabled={ disabled.data }
                    />
                </Col>
                <Col xs={{ span: 24, }} sm={{ span: 4, }}>
                    <C_Date 
                        label={"Fecha"}
                        value={ ordenCompra.fechasolicitada }
                        onChange={ onChangeFechaSolicitada }
                        disabled={ disabled.data }
                        allowClear={false}
                    />
                </Col>
            </Row>
            <Row gutter={ [12, 8] }>
                <Col xs={{ span: 24, }} sm={{ span: 4, }}>
                    <C_Input
                        label={ "Nro. Fac."}
                        placeholder={ "INGRESAR NRO..." }
                        value={ ordenCompra.nrofactura }
                        onChange={ onChangeCodigo }
                        disabled={ disabled.data }
                        error={error.codigo}
                        message={message.codigo}
                    />
                </Col>
                <Col xs={{ span: 24, }} sm={{ span: 4, }}>
                    <C_Select
                        label={ "Tipo"}
                        placeholder={ "TIPO SOLICITUD" }
                        value={ ordenCompra.tiposolicitud }
                        onChange={ onChangeTipoSolicitud }
                        disabled={ disabled.data }
                        data={ [
                            { title: "Local",   value: "L" },
                            { title: "Exterior", value: "E" },
                        ] }
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
                        label={"Sección"}
                        placeholder={ "SELECCIONAR SECCIÓN..." }
                        value={ ordenCompra.seccioninventario }
                        onClick={onShowSeccion}
                        disabled={ disabled.data }
                        error={error.fkidseccioninventario}
                        message={message.fkidseccioninventario}
                        select={true}
                    />
                </Col>
            </Row>
            <Row gutter={ [12, 8] }>
                <Col xs={{ span: 24, }} sm={{ span: 6, }}>
                    <C_Input
                        label={"Sucursal"}
                        placeholder={ "SELECCIONAR SUCURSAL..." }
                        value={ ordenCompra.sucursal }
                        onClick={onShowSucursal}
                        disabled={ disabled.data }
                        error={error.fkidsucursal}
                        message={message.fkidsucursal}
                        select={true}
                    />
                </Col>
                <Col xs={{ span: 24, }} sm={{ span: 6, }}>
                    <C_Input
                        label={"Álmacen"}
                        placeholder={ "SELECCIONAR ÁLMACEN..." }
                        value={ ordenCompra.almacen }
                        onClick={onShowAlmacen}
                        disabled={ (disabled.data || ( typeof ordenCompra.fkidsucursal !== 'number' ) ) ? true : false }
                        error={error.fkidalmacen}
                        message={message.fkidalmacen}
                        select={true}
                    />
                </Col>
                <Col xs={{ span: 24, }} sm={{ span: 6, }}>
                    <C_Input
                        label={"Concepto"}
                        placeholder={ "SELECCIONAR CONCEPTO..." }
                        value={ ordenCompra.conceptocompra }
                        onClick={onShowConcepto}
                        disabled={ disabled.data }
                        error={error.fkidconceptocompra}
                        message={message.fkidconceptocompra}
                        select={true}
                    />
                </Col>
                <Col xs={{ span: 24, }} sm={{ span: 6, }}>
                    <C_Input
                        label={"Proveedor"}
                        placeholder={ "SELECCIONAR PROVEEDOR..." }
                        value={ ordenCompra.proveedor }
                        onClick={onShowProveedor}
                        disabled={ disabled.data }
                        error={error.fkidproveedor}
                        message={message.fkidproveedor}
                        select={true}
                    />
                </Col>
            </Row>
            <div className="main-card card mb-3 mt-3 pl-1 pr-1 pb-1">
                <Table 
                    pagination={false} bordered size={"small"}
                    style={{ width: "100%", minWidth: "100%", maxWidth: "100%", }}
                    columns={ columns( ordenCompra, disabled, onChange, onVisibleProducto ) } 
                    dataSource={ordenCompra.arrayOrdenCompraDetalle}
                    scroll={{ x: 2000, y: ordenCompra.arrayOrdenCompraDetalle.length == 0 ? 40 : 150 }}
                />
            </div>
            <Row gutter={ [12, 8] }>
                <Col xs={{ span: 24, }} sm={{ span: 16, }}>
                    <Row gutter={ [12, 8] }>
                        <Col xs={{ span: 24, }} sm={{ span: 8, }}>
                            <C_Date 
                                label={"Vcmto."}
                                value={ ordenCompra.fechavencimiento }
                                onChange={ onChangeFechaVencimiento }
                                disabled={ disabled.data }
                            />
                        </Col>
                        <Col xs={{ span: 24, }} sm={{ span: 8, }}>
                            <C_Input
                                label={ "Dias plazo"}
                                placeholder={ "INGRESAR NRO..." }
                                value={ ordenCompra.diasplazo }
                                readOnly
                                disabled={ disabled.data }
                            />
                        </Col>
                        <Col xs={{ span: 24, }} sm={{ span: 8, }}>
                            <C_Input
                                label={ "Encargado"}
                                placeholder={ "INGRESAR ENCARGADO..." }
                                value={ "POR DEFINIR" }
                                disabled
                            />
                        </Col>
                    </Row>
                    <Row gutter={ [12, 8] }>
                        <Col xs={{ span: 24, }} sm={{ span: 24, }}>
                            <C_Input
                                label={ "Nota"}
                                placeholder={ "INGRESAR NOTA..." }
                                value={ ordenCompra.nota }
                                onChange={ onChangeNota }
                                disabled={ disabled.data }
                                multiline minRows={3} maxRows={3}
                            />
                        </Col>
                    </Row>
                </Col>
                <Col xs={{ span: 24, }} sm={{ span: 4, }}>
                    <Row gutter={ [12, 8] }>
                        <Col xs={{ span: 24, }} sm={{ span: 24, }}>
                            <C_Input
                                label={ "Cant. Total"}
                                value={ ordenCompra.cantidadtotal }
                                disabled={ disabled.data }
                                readOnly
                            />
                        </Col>
                    </Row>
                </Col>
                <Col xs={{ span: 24, }} sm={{ span: 4, }}>
                    <Col xs={{ span: 24, }} sm={{ span: 24, }}>
                        <C_Input
                            label={ "Sub Total"}
                            value={ ordenCompra.montosubtotal }
                            disabled={ disabled.data }
                            readOnly
                        />
                    </Col>
                    <Col xs={{ span: 24, }} sm={{ span: 24, }}>
                        <C_Input 
                            label={"Fletes"}
                            value={ ordenCompra.fletes }
                            onChange={ onChangeFletes }
                            disabled={ disabled.data }
                        />
                    </Col>
                    <Col xs={{ span: 24, }} sm={{ span: 24, }}>
                        <C_Input 
                            label={"Internación"}
                            value={ ordenCompra.internacion }
                            onChange={ onChangeInternacion }
                            disabled={ disabled.data }
                        />
                    </Col>
                    <Col xs={{ span: 24, }} sm={{ span: 24, }}>
                        <C_Input 
                            label={"Otros gastos"}
                            value={ ordenCompra.otrosgastos }
                            onChange={ onChangeOtrosGastos }
                            disabled={ disabled.data }
                        />
                    </Col>
                    <Col xs={{ span: 24, }} sm={{ span: 24, }}>
                        <C_Input
                            label={ "Mto. Total"}
                            value={ ordenCompra.montototal }
                            disabled={ disabled.data }
                            readOnly
                        />
                    </Col>
                </Col>
            </Row>
        </>
    );
};

C_Form.propTypes = {
    ordenCompra: PropTypes.object,
    disabled:  PropTypes.object,

    onChange:     PropTypes.func.isRequired,
    onPressEnter: PropTypes.func,
};

C_Form.defaultProps = {
    onChange: ( evt ) => {},
};

export default C_Form;
