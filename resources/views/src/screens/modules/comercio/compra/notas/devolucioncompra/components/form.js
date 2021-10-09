
import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Col, Row, Table } from 'antd';
import { C_Date, C_Input, C_Select } from '../../../../../../../components';
import { Functions } from '../../../../../../../utils/functions';

import M_ListadoConceptoCompra from '../../../data/conceptocompra/modal/listado';
import M_ListadoProducto from '../../../../inventario/data/producto/modal/listado';
import M_ListadoUnidadMedidaProducto from '../../../../inventario/data/unidadmedidaproducto/modal/listado';
import M_ListadoNotaCompra from '../../notacompra/modal/listado';

import { columns } from './column';

function C_Form( props ) {
    const { devolucionCompra, disabled, onChange } = props;
    const { codigo, iddevolucioncompra, focusInput, error, message } = devolucionCompra;

    const [ visible_concepto, setVisibleConcepto ] = useState(false);
    const [ visible_notacompra, setVisibleNotaCompra ] = useState(false);

    const [ row_detalle, setRowDetalle ] = useState( null );

    function onChangeID( value ) {
        devolucionCompra.iddevolucioncompra = value;
        onChange( devolucionCompra );
    };

    function onChangeTipoMoneda( value ) {
        devolucionCompra.tipomoneda = value;
        onChange( devolucionCompra );
    };

    function onChangeTipoCambio( value ) {
        if ( value === "" ) value = 0;
        if ( !isNaN( value ) ) {
            if ( Functions.esDecimal( value, 2 ) ) {
                devolucionCompra.tipocambio = Functions.onChangeNumberDecimal(value);
                onChange( devolucionCompra );
            }
        };
    };

    function onChangeDescuento( value ) {
        if ( value === "" ) value = 0;
        if ( !isNaN( value ) ) {
            if ( parseInt( value ) <= 100 && parseInt( value ) >= 0 ) {
                devolucionCompra.descuento = parseInt(value);
                let montosubtotal = parseFloat(devolucionCompra.montosubtotal);
                let descuento = parseInt(devolucionCompra.descuento);
                let montodescuento = parseFloat( ( descuento/100 ) * montosubtotal );
                devolucionCompra.montodescuento = montodescuento.toFixed(2);
                devolucionCompra.montototal = parseFloat(montosubtotal - montodescuento ).toFixed(2);
                onChange( devolucionCompra );
            }
        };
    };

    function onChangeMontoDescuento( value ) {
        if ( value === "" ) value = 0;
        if ( !isNaN( value ) ) {
            if ( Functions.esDecimal( value, 2 ) ) {
                let montodescuento = Functions.onChangeNumberDecimal(value);
                if ( parseFloat( montodescuento ) <= parseFloat( devolucionCompra.montosubtotal ) ) {
                    devolucionCompra.montodescuento = montodescuento;
                    let montosubtotal = parseFloat(devolucionCompra.montosubtotal);
                    montodescuento = parseFloat(devolucionCompra.montodescuento);
                    let descuento = parseInt( (montodescuento / montosubtotal) * 100 );
                    devolucionCompra.descuento = descuento;
                    devolucionCompra.montototal = parseFloat(montosubtotal - montodescuento ).toFixed(2);
                    onChange( devolucionCompra );
                }
            }
        };
    };

    function onChangeFechaDevolucionCompra( value ) {
        devolucionCompra.fechadevolucioncompra = value;
        onChange( devolucionCompra );
    };

    function onChangeCodigo( value ) {
        devolucionCompra.nrofactura        = value;
        devolucionCompra.error.nrofactura  = false;
        devolucionCompra.message.nrofactura = "";
        onChange( devolucionCompra );
    };

    function onChangeNota( value ) {
        devolucionCompra.nota = value;
        onChange( devolucionCompra );
    };

    function onShowConcepto() {
        if ( !disabled.data ) setVisibleConcepto(true);
    };

    function onChangeFKIDConceptoCompra( data ) {
        devolucionCompra.fkidconceptocompra  = data.idconceptocompra;
        devolucionCompra.conceptocompra      = data.descripcion;
        devolucionCompra.error.fkidconceptocompra   = false;
        devolucionCompra.message.fkidconceptocompra = "";
        onChange( devolucionCompra );
        setVisibleConcepto(false);
    };

    function componentConcepto() {
        if ( !visible_concepto ) return null;
        return (
            <M_ListadoConceptoCompra
                visible={visible_concepto}
                onClose={ () => setVisibleConcepto(false) }
                value={devolucionCompra.fkidconceptocompra}
                onChange={onChangeFKIDConceptoCompra}
            />
        );
    };

    function onVisibleProducto( detalle, index ) {
        detalle.index = index;
        detalle.visible_producto = true;
        detalle.visible_unidadmedida = false;
        setRowDetalle(detalle);
    };

    function componentProducto() {
        if ( row_detalle === null ) return null;
        if ( !row_detalle.visible_producto ) return null;
        return (
            <M_ListadoProducto
                visible={row_detalle.visible_producto}
                onClose={ () =>  setRowDetalle(null) }
                value={row_detalle.fkidproducto}
                onChange={ ( data ) => {
                    
                    let detalle = devolucionCompra.arrayDevolucionCompraDetalle[row_detalle.index];

                    let array_unidadmedida = data.unidadmedidaproducto;

                    detalle.fkidproducto = data.idproducto;
                    detalle.array_unidadmedidaproducto = array_unidadmedida;

                    detalle.fkidunidadmedidaproducto = array_unidadmedida.length > 0 ? array_unidadmedida[0].idunidadmedidaproducto : null;
                    detalle.unidadmedidaproducto = array_unidadmedida.length > 0 ? parseFloat(array_unidadmedida[0].peso).toFixed(2) + " " + array_unidadmedida[0].abreviatura : "";

                    detalle.peso = array_unidadmedida.length > 0 ? parseFloat(array_unidadmedida[0].peso).toFixed(2) : "0.00";
                    detalle.pesosubtotal = "0.00";

                    detalle.volumen = array_unidadmedida.length > 0 ? parseFloat(array_unidadmedida[0].volumen).toFixed(2) : "0.00";
                    detalle.volumensubtotal = "0.00";

                    detalle.codigo = data.codigo ? data.codigo : "";
                    detalle.producto = data.nombre;
                    detalle.ciudadorigen = data.ciudadorigen;

                    detalle.cantidadsolicitada = "0";
                    detalle.cantidadrecibida = "0";
                    detalle.cantidadfaltante = "0";
                    detalle.cantidadsobrante = "0";

                    detalle.cantidad = 0;
                    detalle.costounitario = array_unidadmedida.length > 0 ? parseFloat(array_unidadmedida[0].costo).toFixed(2) : "0.00";
                    detalle.costosubtotal = "0.00";

                    detalle.nrolote = "0.00";
                    detalle.nrofabrica = "0.00";
                    detalle.nrocajas = "0";

                    detalle.productomarca = data.productomarca;
                    onChange(devolucionCompra);
                    setRowDetalle(null);
                } }
            />
        );
    };

    function onVisibleUnidadMedidaProducto( detalle, index ) {
        detalle.index = index;
        detalle.visible_unidadmedida = true;
        detalle.visible_producto = false;
        setRowDetalle(detalle);
    };

    function componentUnidadMedidaProducto() {
        if ( row_detalle === null ) return null;
        if ( !row_detalle.visible_unidadmedida ) return null;
        return (
            <M_ListadoUnidadMedidaProducto
                visible={row_detalle.visible_unidadmedida}
                onClose={ () => setRowDetalle(null) }
                value={row_detalle.fkidunidadmedidaproducto}
                onChange={ ( data ) => {
                    let detalle = devolucionCompra.arrayDevolucionCompraDetalle[row_detalle.index];
                    detalle.fkidunidadmedidaproducto = data.idunidadmedidaproducto;
                    detalle.unidadmedidaproducto = parseFloat(data.peso).toFixed(2) + " " + data.abreviatura;
                    detalle.peso = parseFloat(data.peso).toFixed(2);
                    detalle.pesosubtotal = parseFloat(data.peso * detalle.cantidad).toFixed(2);
                    detalle.volumen = parseFloat(data.volumen * detalle.cantidad).toFixed(2);
                    detalle.volumensubtotal = parseFloat(data.volumen * detalle.cantidad).toFixed(2);
                    detalle.costounitario = parseFloat(data.costo).toFixed(2);
                    detalle.costosubtotal = parseFloat( detalle.costounitario * detalle.cantidad ).toFixed(2);
                    updateTotales();
                    onChange(devolucionCompra);
                    setRowDetalle(null);
                } }
                data={row_detalle.array_unidadmedidaproducto}
            />
        );
    };

    function updateTotales() {
        let cantidadtotal = 0;
        let montototal = 0;
        devolucionCompra.arrayDevolucionCompraDetalle.map( (item) => {
            if ( item.fkidproducto !== null ) {
                cantidadtotal += parseInt(item.cantidad);
                montototal += parseFloat(item.costosubtotal);
            }
        } );
        devolucionCompra.cantidadtotal = parseInt(cantidadtotal);
        devolucionCompra.montosubtotal = parseFloat(montototal).toFixed(2);
        let montosubtotal = parseFloat(devolucionCompra.montosubtotal);
        let montodescuento = parseFloat(devolucionCompra.montodescuento);
        devolucionCompra.montototal = parseFloat(montosubtotal - montodescuento).toFixed(2);
    };

    function onShowNotaCompra() {
        if ( !disabled.data ) setVisibleNotaCompra(true);
    };

    function onChangeFKIDOrdenCompra( data ) {
        console.log(data)
        devolucionCompra.fkidnotacompra = data.idnotacompra;
        devolucionCompra.tipocompra = data.tipocompra;

        devolucionCompra.fkidmoneda = data.fkidmoneda;
        devolucionCompra.moneda = data.moneda;

        devolucionCompra.fkidsucursal = data.fkidsucursal;
        devolucionCompra.sucursal = data.sucursal;

        devolucionCompra.fkidalmacen = data.fkidalmacen;
        devolucionCompra.almacen = data.almacen;

        devolucionCompra.fkidproveedor = data.fkidproveedor;
        devolucionCompra.proveedor = data.proveedor;

        let array = [];
        for (let index = 0; index < data.notacompradetalle.length; index++) {
            const detalle = data.notacompradetalle[index];
            let element = {
                key: index,
                codigo: detalle.codigo,
                producto: detalle.nombre,
                ciudadorigen: detalle.ciudadorigen,
                productomarca: detalle.productomarca,

                fkidunidadmedidaproducto: detalle.fkidunidadmedidaproducto,
                unidadmedidaproducto: parseFloat(detalle.peso).toFixed(2) + " " + detalle.abreviatura,

                cantidad: "0",
                cantidadcomprada: parseInt(detalle.cantidad),

                costounitario: parseFloat(detalle.costounitario).toFixed(2),
                costosubtotal: parseFloat(detalle.costosubtotal).toFixed(2),

                peso: parseFloat(detalle.peso).toFixed(2),
                pesosubtotal: parseFloat(detalle.peso * detalle.cantidad).toFixed(2),

                volumen: parseFloat(detalle.volumen).toFixed(2),
                volumensubtotal: parseFloat(detalle.volumen * detalle.cantidad).toFixed(2),

                fechavencimiento: detalle.fechavencimiento,
                fvencimiento: Functions.convertYMDToDMY(detalle.fechavencimiento),
                
                nrolote: parseFloat(detalle.nrolote).toFixed(2),
                nrofabrica: parseFloat(detalle.nrofabrica).toFixed(2),
                nota: null,

                isdevolucioncompra: "",
                isordencompra: "",
                issolicitudcompra: "",

                visible_producto: false,
                visible_unidadmedida: false,

                array_unidadmedidaproducto: [],

                fkidproducto: detalle.idproducto,
                fkidnotacompradetalle: detalle.idnotacompradetalle,
                fkidalmacenunidadmedidaproducto: null,
                fkiddevolucioncompra: null,
                iddevolucioncompradetalle: null,
            };
            array = [ ...array, element ]
        }
        devolucionCompra.arrayDevolucionCompraDetalle = array;

        onChange( devolucionCompra );
        setVisibleNotaCompra(false);
    };

    function componentNotaCompra() {
        if ( !visible_notacompra ) return null;
        return (
            <M_ListadoNotaCompra
                visible={visible_notacompra}
                onClose={ () => setVisibleNotaCompra(false) }
                value={devolucionCompra.fkidnotacompra}
                onChange={onChangeFKIDOrdenCompra}
                isordencompra={true}
            />
        );
    };

    return (
        <>

            { componentConcepto() }
            { componentProducto() }
            { componentUnidadMedidaProducto() }

            { componentNotaCompra() }

            <Row gutter={ [12, 8] }>
                <Col xs={{ span: 24, }} sm={{ span: 4, }}>
                    <C_Input
                        label={ "Nº Nota"}
                        placeholder={ "INGRESAR NRO..." }
                        value={ iddevolucioncompra }
                        onChange={ onChangeID }
                        disabled={ disabled.iddata }
                        onPressEnter={ props.onPressEnter }
                        autoFocus={true}
                        focus={ focusInput }
                    />
                </Col>
                <Col xs={{ span: 24, }} sm={{ span: 4, }}>
                    <C_Input
                        label={ "T. Comp."}
                        placeholder={ "TIPO COMPRA" }
                        value={ devolucionCompra.tipocompra == "L" ? "Local" : "Exterior" }
                        disabled
                    />
                </Col>
                <Col xs={{ span: 24, }} sm={{ span: 4, }}>
                    <C_Input 
                        label={"Moneda"}
                        value={ devolucionCompra.moneda }
                        disabled={ true }
                    />
                </Col>
                <Col xs={{ span: 24, }} sm={{ span: 4, }}>
                    <C_Select
                        label={ "T. Moneda"}
                        placeholder={ "TIPO MONEDA" }
                        value={ devolucionCompra.tipomoneda }
                        onChange={ onChangeTipoMoneda }
                        disabled={ disabled.data }
                        data={ [
                            { title: "Nacional", value: "N" },
                            { title: "Exterior", value: "E" },
                        ] }
                    />
                </Col>
                <Col xs={{ span: 24, }} sm={{ span: 4, }}>
                    <C_Input 
                        label={"T. C."}
                        value={ devolucionCompra.tipocambio }
                        onChange={ onChangeTipoCambio }
                        disabled={ disabled.data }
                    />
                </Col>
                <Col xs={{ span: 24, }} sm={{ span: 4, }}>
                    <C_Date 
                        label={"Fecha"}
                        value={ devolucionCompra.fechadevolucioncompra }
                        onChange={ onChangeFechaDevolucionCompra }
                        disabled={ disabled.data }
                        allowClear={false}
                    />
                </Col>
            </Row>
            <Row gutter={ [12, 8] }>
                <Col xs={{ span: 24, }} sm={{ span: 8, }}>
                    <C_Input
                        label={"Sucursal"}
                        placeholder={ "SELECCIONAR SUCURSAL..." }
                        value={ devolucionCompra.sucursal }
                        disabled
                        error={error.fkidsucursal}
                        message={message.fkidsucursal}
                    />
                </Col>
                <Col xs={{ span: 24, }} sm={{ span: 8, }}>
                    <C_Input
                        label={"Álmacen"}
                        placeholder={ "SELECCIONAR ÁLMACEN..." }
                        value={ devolucionCompra.almacen }
                        disabled
                        error={error.fkidalmacen}
                        message={message.fkidalmacen}
                    />
                </Col>
                <Col xs={{ span: 24, }} sm={{ span: 8, }}>
                    <C_Input
                        label={ "Recibio"}
                        placeholder={ "INGRESAR SOLICITADO..." }
                        value={ "POR DEFINIR" }
                        disabled
                    />
                </Col>
            </Row>
            <Row gutter={ [12, 8] }>
                <Col xs={{ span: 24, }} sm={{ span: 8, }}>
                    <C_Input
                        label={"Concepto"}
                        placeholder={ "SELECCIONAR CONCEPTO..." }
                        value={ devolucionCompra.conceptocompra }
                        onClick={onShowConcepto}
                        disabled={ disabled.data }
                        error={error.fkidconceptocompra}
                        message={message.fkidconceptocompra}
                        select={true}
                    />
                </Col>
                <Col xs={{ span: 24, }} sm={{ span: 8, }}>
                    <C_Input
                        label={"Proveedor"}
                        placeholder={ "SELECCIONAR PROVEEDOR..." }
                        value={ devolucionCompra.proveedor }
                        disabled
                        error={error.fkidproveedor}
                        message={message.fkidproveedor}
                    />
                </Col>
                <Col xs={{ span: 24, }} sm={{ span: 8, }}>
                    <C_Input
                        label={ "Analitico"}
                        placeholder={ "INGRESAR SOLICITADO..." }
                        value={ "POR DEFINIR" }
                        disabled
                    />
                </Col>
            </Row>
            <Row gutter={ [12, 8] }>
                <Col xs={{ span: 24, }} sm={{ span: 8, }}></Col>
                <Col xs={{ span: 24, }} sm={{ span: 4, }}>
                    <C_Input
                        label={ "Nº Fac."}
                        placeholder={ "INGRESAR NRO..." }
                        value={ devolucionCompra.nrofactura }
                        onChange={ onChangeCodigo }
                        disabled={ disabled.data }
                        error={error.codigo}
                        message={message.codigo}
                    />
                </Col>
                <Col xs={{ span: 24, }} sm={{ span: 4, }}>
                    <C_Input
                        label={"Nº compra"}
                        placeholder={ "SELECCIONAR NOTA COMPRA..." }
                        value={ devolucionCompra.fkidnotacompra }
                        onClick={onShowNotaCompra}
                        disabled={ disabled.data }
                        error={error.fkidnotacompra}
                        message={message.fkidnotacompra}
                        select={true}
                    />
                </Col>
            </Row>
            <div className="main-card card mb-3 mt-3 pl-1 pr-1 pb-1">
                <Table 
                    pagination={false} bordered size={"small"}
                    style={{ width: "100%", minWidth: "100%", maxWidth: "100%", }}
                    columns={ columns( devolucionCompra, disabled, onChange  ) } 
                    dataSource={devolucionCompra.arrayDevolucionCompraDetalle}
                    scroll={{ x: 2000, y: devolucionCompra.arrayDevolucionCompraDetalle.length == 0 ? 40 : 150 }}
                />
            </div>
            <Row gutter={ [12, 8] }>
                <Col xs={{ span: 24, }} sm={{ span: 14, }}>
                    <Row gutter={ [12, 8] }>
                        <Col xs={{ span: 24, }} sm={{ span: 24, }}>
                            <C_Input
                                label={ "Nota"}
                                placeholder={ "INGRESAR NOTA..." }
                                value={ devolucionCompra.nota }
                                onChange={ onChangeNota }
                                disabled={ disabled.data }
                                multiline minRows={3} maxRows={3}
                            />
                        </Col>
                    </Row>
                </Col>
                <Col xs={{ span: 24, }} sm={{ span: 4, }}>
                    <Col xs={{ span: 24, }} sm={{ span: 24, }}>
                        <C_Input
                            label={ "Cant. Total"}
                            value={ devolucionCompra.cantidadtotal }
                            disabled={ disabled.data }
                            readOnly
                        />
                    </Col>
                </Col>
                <Col xs={{ span: 24, }} sm={{ span: 6, }}>
                    <Col xs={{ span: 24, }} sm={{ span: 24, }}>
                        <C_Input
                            label={ "Total"}
                            value={ devolucionCompra.montosubtotal }
                            disabled={ disabled.data }
                            readOnly
                        />
                    </Col>
                    <div className="form-row">
                        <Col xs={{ span: 24, }} sm={{ span: 8, }}>
                            <C_Input
                                label={ "Desc."}
                                value={ devolucionCompra.descuento }
                                disabled={ disabled.data }
                                onChange={onChangeDescuento}
                            />
                        </Col>
                        <Col xs={{ span: 24, }} sm={{ span: 16, }}>
                            <C_Input
                                label={ "Mto. desc."}
                                value={ devolucionCompra.montodescuento }
                                disabled={ disabled.data }
                                onChange={onChangeMontoDescuento}
                            />
                        </Col>
                    </div>
                    <Col xs={{ span: 24, }} sm={{ span: 24, }}>
                        <C_Input
                            label={ "Sub total"}
                            value={ parseFloat(devolucionCompra.montosubtotal * 1 - devolucionCompra.montodescuento * 1).toFixed(2) }
                            disabled={ disabled.data }
                            readOnly
                        />
                    </Col>
                    <Col xs={{ span: 24, }} sm={{ span: 24, }}>
                        <C_Input
                            label={ "Mto. Total"}
                            value={ devolucionCompra.montototal }
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
    devolucionCompra: PropTypes.object,
    disabled:  PropTypes.object,

    onChange:     PropTypes.func.isRequired,
    onPressEnter: PropTypes.func,
};

C_Form.defaultProps = {
    onChange: ( evt ) => {},
};

export default C_Form;
