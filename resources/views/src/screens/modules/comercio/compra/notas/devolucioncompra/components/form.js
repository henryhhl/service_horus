
import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Col, Row, Table } from 'antd';
import { C_Date, C_Input, C_Select } from '../../../../../../../components';
import { Functions } from '../../../../../../../utils/functions';

import M_ListadoConceptoCompra from '../../../data/conceptocompra/modal/listado';
import M_ListadoNotaCompra from '../../notacompra/modal/listado';

import { columns } from './column';

function C_Form( props ) {
    const { devolucionCompra, disabled, onChange } = props;
    const { codigo, iddevolucioncompra, focusInput, error, message } = devolucionCompra;

    const [ visible_concepto, setVisibleConcepto ] = useState(false);
    const [ visible_notacompra, setVisibleNotaCompra ] = useState(false);

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
        devolucionCompra.nrofactura = data.nrofactura;

        devolucionCompra.isnotacompra = "A";
        devolucionCompra.isordencompra = data.isordencompra;
        devolucionCompra.issolicitudcompra = data.issolicitudcompra;

        let array = [];
        for (let index = 0; index < data.arraynotacompradetalle.length; index++) {
            const detalle = data.arraynotacompradetalle[index];
            let element = {
                key: index,

                codigo: detalle.codigo,
                producto: detalle.producto,
                fkidproducto: detalle.fkidproducto,
                unidadmedida: `${parseFloat(detalle.valorequivalente).toFixed(2)} ${detalle.abreviatura}`,

                fkidciudadorigen: detalle.fkidciudadorigen,
                ciudadorigen: detalle.ciudadorigen,

                fkidproductomarca: detalle.fkidproductomarca,
                productomarca: detalle.productomarca,

                fkidproductotipo: detalle.fkidproductotipo,
                productotipo: detalle.productotipo,

                fkidsucursal: detalle.fkidsucursal,
                sucursal: detalle.sucursal,

                fkidalmacen: detalle.fkidalmacen,
                almacen: detalle.almacen,

                fkidproveedor: detalle.fkidproveedor,
                proveedor: detalle.proveedor,

                fkidseccioninventario: detalle.fkidseccioninventario,
                seccioninventario: detalle.seccioninventario,

                cantidad: 0,
                cantidadcomprada: detalle.cantidad,

                descuento: detalle.descuento,
                montodescuento: parseFloat(detalle.montodescuento).toFixed(2),

                costobase: parseFloat(detalle.costobase).toFixed(2),
                costounitario: parseFloat(detalle.costounitario).toFixed(2),
                costosubtotal: parseFloat(detalle.costosubtotal).toFixed(2),

                peso: parseFloat(detalle.peso).toFixed(2),
                pesosubtotal: parseFloat(detalle.pesosubtotal).toFixed(2),

                volumen: parseFloat(detalle.volumen).toFixed(2),
                volumensubtotal: parseFloat(detalle.volumensubtotal).toFixed(2),

                fechavencimiento: detalle.fechavencimiento,
                fvencimiento: Functions.convertYMDToDMY(detalle.fechavencimiento),

                nota: null,
                nrolote: parseFloat(detalle.nrolote).toFixed(2),
                nrofabrica: parseFloat(detalle.nrofabrica).toFixed(2),

                isnotacompra: "A",
                isordencompra: detalle.fkidordencompra ? "A" : "N",
                issolicitudcompra: detalle.fkidsolicitudcompra ? "A" : "N",

                fkidnotacompra: detalle.fkidnotacompra,
                fkidnotacompradetalle: detalle.idnotacompradetalle,

                fkidordencompra: detalle.fkidordencompra,
                fkidordencompradetalle: detalle.fkidordencompradetalle,

                fkidsolicitudcompradetalle: detalle.fkidsolicitudcompradetalle,
                fkidsolicitudcompra: detalle.fkidsolicitudcompra,

                fkidalmacenproductodetalle: detalle.fkidalmacenproductodetalle,
                fkiddevolucioncompra: null,
                iddevolucioncompradetalle: null,

                visible_producto: false,
                visible_sucursal: false,
                visible_almacen: false,
                visible_proveedor: false,
                errorcantidad: false,
                errorcostounitario: false,
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
            <div className="main-card card mb-1 mt-3 pl-1 pr-1 pb-1">
                <Table 
                    pagination={false} bordered size={"small"}
                    style={{ width: "100%", minWidth: "100%", maxWidth: "100%", }}
                    columns={ columns( devolucionCompra, disabled, onChange  ) } 
                    dataSource={devolucionCompra.arrayDevolucionCompraDetalle}
                    scroll={{ x: 2400, y: devolucionCompra.arrayDevolucionCompraDetalle.length == 0 ? 40 : 150 }}
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
