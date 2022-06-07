
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { Col, Row, Table } from 'antd';
import { C_Checkbox, C_Confirm, C_Date, C_Input, C_Message } from '../../../../../../../components';
import { Functions } from '../../../../../../../utils/functions';

import M_ListadoConceptoVenta from '../../../data/conceptoventa/modal/listado';
import { column } from './column';
import M_ListadoNotaVenta from '../../notaventa/modal/listado';

function C_Form( props ) {
    const { devolucionNotaVenta, disabled, onChange } = props;
    const { iddevolucionnotaventa } = devolucionNotaVenta;
    const { focusInput, error, message } = devolucionNotaVenta;

    const [ visible_concepto, setVisibleConcepto ] = useState(false);
    const [ visible_notaventa, setVisibleNotaVenta ] = useState(false);

    function onChangeID( value ) {
        devolucionNotaVenta.iddevolucionnotaventa = value;
        onChange( devolucionNotaVenta );
    };

    function onChangeTipoCambio( value ) {
        if ( value === "" ) value = 0;
        if ( !isNaN( value ) ) {
            if ( Functions.esDecimal( value, 2 ) ) {
                devolucionNotaVenta.tipocambio = Functions.onChangeNumberDecimal(value);
                onChange( devolucionNotaVenta );
            }
        };
    }

    function onChangeFechaNotaVenta( value ) {
        devolucionNotaVenta.fechaventa = value;
        onChange( devolucionNotaVenta );
    };

    function onChangeNota( value ) {
        devolucionNotaVenta.glosa = value;
        onChange( devolucionNotaVenta );
    };

    function onChangeDescuento( value ) {
        if ( value === "" ) value = 0;
        if ( !isNaN( value ) ) {
            if ( parseInt( value ) <= 100 && parseInt( value ) >= 0 ) {
                devolucionNotaVenta.descuento = parseInt(value);
                let montosubtotal = parseFloat(devolucionNotaVenta.montosubtotal);
                let descuento = parseInt(devolucionNotaVenta.descuento);
                let montodescuento = parseFloat( ( descuento / 100 ) * montosubtotal );
                devolucionNotaVenta.montodescuento = montodescuento.toFixed(2);

                devolucionNotaVenta.montototal = parseFloat( montosubtotal - montodescuento ).toFixed(2);
                onChange( devolucionNotaVenta );
            }
        };
    };

    function onChangeMontoDescuento( value ) {
        if ( value === "" ) value = 0;
        if ( !isNaN( value ) ) {
            if ( Functions.esDecimal( value, 2 ) ) {
                let montodescuento = Functions.onChangeNumberDecimal(value);
                if ( parseFloat( montodescuento ) <= parseFloat( devolucionNotaVenta.montosubtotal ) ) {
                    devolucionNotaVenta.montodescuento = montodescuento;
                    let montosubtotal = parseFloat(devolucionNotaVenta.montosubtotal);
                    montodescuento = parseFloat(devolucionNotaVenta.montodescuento);
                    let descuento = parseInt( ( montodescuento / montosubtotal ) * 100 );
                    devolucionNotaVenta.descuento = descuento;

                    devolucionNotaVenta.montototal = parseFloat( montosubtotal  - montodescuento ).toFixed(2);
                    onChange( devolucionNotaVenta );
                }
            }
        };
    };

    function onChangeFKIDConcepto( conceptoventa ) {
        devolucionNotaVenta.fkidconceptoventa = conceptoventa.idconceptoventa;
        devolucionNotaVenta.conceptoventa     = `${conceptoventa.descripcion}`;
        devolucionNotaVenta.error.fkidconceptoventa  = false;
        devolucionNotaVenta.message.fkidconceptoventa = "";
        onChange( devolucionNotaVenta );
        setVisibleConcepto( () => false );
    }

    function onShowConcepto() {
        if ( !disabled.data ) setVisibleConcepto(true);
    };

    function componentConcepto() {
        if ( !visible_concepto ) return null;
        return (
            <M_ListadoConceptoVenta
                visible={visible_concepto}
                onClose={ () => setVisibleConcepto(false) }
                value={devolucionNotaVenta.fkidconceptoventa}
                onChange={onChangeFKIDConcepto}
            />
        );
    }

    function onShowNotaVenta() {
        if ( !disabled.data ) setVisibleNotaVenta(true);
    }

    function onChangeFKIDNotaVenta( notaventa ) {
        console.log(notaventa)
        devolucionNotaVenta.sucursal = notaventa.sucursal;
        devolucionNotaVenta.fkidsucursal = notaventa.fkidsucursal;

        devolucionNotaVenta.almacen = notaventa.almacen;
        devolucionNotaVenta.fkidalmacen = notaventa.fkidalmacen;

        devolucionNotaVenta.vendedor = notaventa.vendedor;
        devolucionNotaVenta.fkidvendedor = notaventa.fkidvendedor;

        devolucionNotaVenta.cliente = notaventa.cliente;
        devolucionNotaVenta.fkidcliente = notaventa.fkidcliente;
        devolucionNotaVenta.nit = notaventa.nit;
        devolucionNotaVenta.razonsocial = notaventa.razonsocial;
        
        devolucionNotaVenta.listaprecio = notaventa.listaprecio;
        devolucionNotaVenta.fkidlistaprecio = notaventa.fkidlistaprecio;

        devolucionNotaVenta.fkidnotaventa = notaventa.idnotaventa;
        devolucionNotaVenta.fkidtipopago = notaventa.fkidtipopago;
        devolucionNotaVenta.nrofactura = notaventa.nrofactura;
        devolucionNotaVenta.fechanotaventa = Functions.convertYMDToDMY(notaventa.fechaventa);

        let array = [];
        for (let index = 0; index < notaventa.arraynotaventadetalle.length; index++) {
            const element = notaventa.arraynotaventadetalle[index];
            let detalle = {
                key: index,

                codigo: element.codigo,
                fkidproducto: element.fkidproducto,
                fkidalmacenproductodetalle: element.fkidalmacenproductodetalle,
                producto: element.producto,

                cantidadvendida: element.cantidad,
                cantidad: 0,
                unidadmedida: `${parseFloat(element.valorequivalente).toFixed(2)} ${element.abreviatura}`,

                fkidlistaprecio: element.fkidlistaprecio,
                fkidlistapreciodetalle: element.fkidlistapreciodetalle,
                listaprecio: element.listaprecio,

                preciounitario: parseFloat(element.preciounitario).toFixed(2),
                preciosubtotal: parseFloat(element.preciosubtotal).toFixed(2),

                fkidalmacen: element.fkidalmacen,
                fkidsucursal: element.fkidsucursal,
                almacen: element.almacen,

                nrolote: parseFloat(element.nrolote).toFixed(2),
                nrofabrica: parseFloat(element.nrofabrica).toFixed(2),
                fvencimiento: Functions.convertYMDToDMY(element.fechavencimiento),
                fechavencimiento: element.fechavencimiento,

                fkidproductotipo: element.fkidproductotipo,
                productotipo: element.productotipo,

                fkidproductomarca: element.fkidproductomarca,
                productomarca: element.productomarca,

                fkidciudad: element.fkidciudadorigen,
                productociudad: element.ciudadorigen,

                fkidvendedor: element.fkidvendedor,
                vendedor: element.vendedor,
                nota: element.nota,

                fkidnotaventadetalle: element.idnotaventadetalle,
                fkidalmacenunidadmedidaproducto: null,
                fkidunidadmedidaproducto: null,
                iddevolucionnotaventadetalle: null,
                fkiddevolucionnotaventa: null,

                errorcantidad: false,
            };
            array = [ ...array, detalle ]
        }
        devolucionNotaVenta.devolucionnotaventadetalle = array;
        onChange( devolucionNotaVenta );
        setVisibleNotaVenta( () => false );
    }

    function componentNotaVenta() {
        if ( !visible_notaventa ) return null;
        return (
            <M_ListadoNotaVenta
                visible={visible_notaventa}
                onClose={ () => setVisibleNotaVenta(false) }
                value={devolucionNotaVenta.fkidnotaventa}
                onChange={onChangeFKIDNotaVenta}
            />
        );
    }

    return (
        <>
            { componentConcepto() }
            { componentNotaVenta() }

            <Row gutter={ [12, 8] }>
                <Col xs={{ span: 24, }} sm={{ span: 4, }}>
                    <C_Input
                        label={ "Nro"}
                        placeholder={ "INGRESAR NRO..." }
                        value={ iddevolucionnotaventa }
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
                        label={ "Nº Fac."}
                        placeholder={ "INGRESAR NRO..." }
                        value={ devolucionNotaVenta.nrofactura }
                        disabled
                        error={error.nrofactura}
                        message={message.nrofactura}
                    />
                </Col>
                <Col xs={{ span: 24, }} sm={{ span: 4, }}>
                    <C_Input
                        label={"Moneda"}
                        value={ devolucionNotaVenta.moneda }
                        disabled={ true }
                    />
                </Col>
                <Col xs={{ span: 24, }} sm={{ span: 4, }}>
                    <C_Input
                        label={"T. C."}
                        value={ devolucionNotaVenta.tipocambio }
                        onChange={ onChangeTipoCambio }
                        disabled={ disabled.data }
                    />
                </Col>
                <Col xs={{ span: 24, }} sm={{ span: 4, }}>
                    <C_Date
                        label={"Fecha"}
                        value={ devolucionNotaVenta.fechaventa }
                        onChange={ onChangeFechaNotaVenta }
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
                        value={ devolucionNotaVenta.sucursal }
                        disabled
                        error={error.fkidsucursal}
                        message={message.fkidsucursal}
                        select={true}
                    />
                </Col>
                <Col xs={{ span: 24, }} sm={{ span: 8, }}>
                    <C_Input
                        label={"Álmacen"}
                        placeholder={ "SELECCIONAR ÁLMACEN..." }
                        value={ devolucionNotaVenta.almacen }
                        disabled
                        error={error.fkidalmacen}
                        message={message.fkidalmacen}
                        select={true}
                    />
                </Col>
                <Col xs={{ span: 24, }} sm={{ span: 8, }}>
                    <C_Input
                        label={"Concepto"}
                        placeholder={ "SELECCIONAR CONCEPTO..." }
                        value={ devolucionNotaVenta.conceptoventa }
                        onClick={onShowConcepto}
                        disabled={ disabled.data }
                        error={error.fkidconceptoventa}
                        message={message.fkidconceptoventa}
                        select={true}
                    />
                </Col>
            </Row>
            <Row gutter={ [12, 8] }>
                <Col xs={{ span: 24, }} sm={{ span: 6, }}>
                    <C_Input
                        label={"Vendedor"}
                        placeholder={ "SELECCIONAR VENDEDOR..." }
                        value={ devolucionNotaVenta.vendedor }
                        disabled
                        error={error.fkidvendedor}
                        message={message.fkidvendedor}
                        select={true}
                    />
                </Col>
                <Col xs={{ span: 24, }} sm={{ span: 6, }}>
                    <C_Input
                        label={"Cliente"}
                        placeholder={ "SELECCIONAR CLIENTE..." }
                        value={ devolucionNotaVenta.cliente }
                        disabled
                        error={error.fkidcliente}
                        message={message.fkidcliente}
                        select={true}
                    />
                </Col>
                <Col xs={{ span: 24, }} sm={{ span: 6, }}>
                    <C_Input
                        label={ "Recibio"}
                        placeholder={ "INGRESAR SOLICITADO..." }
                        value={ "POR DEFINIR" }
                        disabled
                    />
                </Col>
                <Col xs={{ span: 24, }} sm={{ span: 6, }}>
                    <C_Input
                        label={ "Analitico"}
                        placeholder={ "INGRESAR SOLICITADO..." }
                        value={ "POR DEFINIR" }
                        disabled
                    />
                </Col>
            </Row>
            <Row gutter={ [12, 8] }>
                <Col sm={{ span: 4, }}></Col>
                <Col xs={{ span: 24, }} sm={{ span: 6, }}>
                    <C_Input
                        label={"Lista Precio"}
                        placeholder={ "SELECCIONAR LISTA PRECIO..." }
                        value={ devolucionNotaVenta.listaprecio }
                        disabled
                        error={error.fkidlistaprecio}
                        message={message.fkidlistaprecio}
                        select={true}
                    />
                </Col>
                <Col xs={{ span: 24, }} sm={{ span: 6, }}>
                    <C_Input
                        label={"Nota Venta"}
                        placeholder={ "SELECCIONAR NOTA VENTA..." }
                        value={ devolucionNotaVenta.fkidnotaventa }
                        onClick={onShowNotaVenta}
                        disabled={disabled.data}
                        error={error.fkidnotaventa}
                        message={message.fkidnotaventa}
                        select={true}
                    />
                </Col>
                <Col xs={{ span: 24, }} sm={{ span: 4, }}>
                    <C_Input
                        label={ "Fecha Venta"}
                        placeholder={ "INGRESAR FECHA VENTA..." }
                        value={devolucionNotaVenta.fechanotaventa}
                        readOnly
                    />
                </Col>
            </Row>
            <Row gutter={ [12, 8] }>
                <Col xs={{ span: 24, }}>
                    <div className="main-card card mb-1 mt-2 pl-1 pr-1 pb-1">
                        <Table
                            pagination={false} bordered size={"small"}
                            style={{ width: "100%", minWidth: "100%", maxWidth: "100%", }}
                            columns={ column( devolucionNotaVenta, disabled, onChange  ) }
                            dataSource={devolucionNotaVenta.devolucionnotaventadetalle} rowKey="key"
                            scroll={{ x: 2100, y: devolucionNotaVenta.devolucionnotaventadetalle.length == 0 ? 40 : 200 }}
                        />
                    </div>
                </Col>
            </Row>
            <Row gutter={ [12, 8] }>
                <Col xs={{ span: 24, }} sm={{ span: 14, }}>
                    <Row gutter={ [12, 8] }>
                        <Col xs={{ span: 24, }} sm={{ span: 6, }}>
                            <C_Input
                                label={ "N.I.T."}
                                placeholder={ "INGRESAR ENCARGADO..." }
                                value={devolucionNotaVenta.nit}
                                disabled
                                readOnly
                            />
                        </Col>
                        <Col xs={{ span: 24, }} sm={{ span: 12, }}>
                            <C_Input
                                label={ "Razon Social"}
                                placeholder={ "INGRESAR RAZON SOCIAL..." }
                                value={devolucionNotaVenta.razonsocial}
                                disabled
                                readOnly
                            />
                        </Col>
                        <Col xs={{ span: 24, }} sm={{ span: 6, }} className="d-flex justify-content-end align-items-center mt-1">
                            <C_Checkbox disabled={disabled.data}
                                titleText={ "Nota Devolución?" }
                                checked={ (devolucionNotaVenta.esnotadevolucion === "S") }
                                onChange={ () => {
                                    devolucionNotaVenta.esnotadevolucion = (devolucionNotaVenta.esnotadevolucion === "S") ? "N" : "S";
                                    onChange( devolucionNotaVenta );
                                } }
                            />
                        </Col>
                    </Row>
                    <Row gutter={ [12, 8] }>
                        <Col xs={{ span: 24, }} sm={{ span: 24, }}>
                            <C_Input
                                label={ "Glosa"}
                                placeholder={ "INGRESAR GLOSA..." }
                                value={ devolucionNotaVenta.glosa }
                                onChange={ onChangeNota }
                                disabled={ disabled.data }
                                multiline minRows={3} maxRows={3}
                            />
                        </Col>
                    </Row>
                </Col>
                <Col xs={{ span: 24, }} sm={{ span: 4, }}></Col>
                <Col xs={{ span: 24, }} sm={{ span: 6, }}>
                    <Col xs={{ span: 24, }} sm={{ span: 24, }}>
                        <C_Input
                            label={ "SubTotal"}
                            value={  devolucionNotaVenta.montosubtotal }
                            disabled={ disabled.data }
                            readOnly
                        />
                    </Col>
                    <Col xs={{ span: 24, }} sm={{ span: 24, }}>
                        <div className="form-row">
                            <Col xs={{ span: 24, }} sm={{ span: 8, }}>
                                <C_Input
                                    label={ "Desc."}
                                    value={ devolucionNotaVenta.descuento }
                                    disabled={ disabled.data }
                                    onChange={onChangeDescuento}
                                />
                            </Col>
                            <Col xs={{ span: 24, }} sm={{ span: 16, }}>
                                <C_Input
                                    label={ "Mto. desc."}
                                    value={ devolucionNotaVenta.montodescuento }
                                    disabled={ disabled.data }
                                    onChange={onChangeMontoDescuento}
                                />
                            </Col>
                        </div>
                    </Col>
                    <Col xs={{ span: 24, }} sm={{ span: 24, }}>
                        <C_Input
                            label={ "Mto. Total"}
                            value={ devolucionNotaVenta.montototal }
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
    devolucionNotaVenta: PropTypes.object,
    disabled:     PropTypes.object,

    onChange:     PropTypes.func.isRequired,
    onPressEnter: PropTypes.func,
};

C_Form.defaultProps = {
    onChange: ( evt ) => {},
};

export default C_Form;
