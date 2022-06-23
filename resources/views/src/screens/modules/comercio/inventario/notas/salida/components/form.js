
import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Col, Row, Table } from 'antd';
import { C_Checkbox, C_Date, C_Input } from '../../../../../../../components';
import { Functions } from '../../../../../../../utils/functions';
import { columns } from './column';

import M_ListadoSucursal from '../../../../venta/data/sucursal/modal/listado';
import M_ListadoAlmacen from '../../../data/almacen/modal/listado';
import M_ListadoConceptoInventario from '../../../data/conceptoinventario/modal/listado';
import M_ListadoProducto from '../../../data/producto/modal/listado';
import M_ListadoUnidadMedidaProducto from '../../../data/unidadmedidaproducto/modal/listado';

function C_Form( props ) {
    const { notaSalida, disabled, onChange } = props;
    const { codigo, idnotasalida, focusInput, error, message } = notaSalida;

    const [ visible_sucursal, setVisibleSucursal ] = useState(false);
    const [ visible_almacen, setVisibleAlmacen ] = useState(false);
    const [ visible_concepto, setVisibleConcepto ] = useState(false);

    const [ row_detalle, setRowDetalle ] = useState( null );

    function onChangeID( value ) {
        notaSalida.idnotasalida = value;
        onChange( notaSalida );
    };

    function onChangeTipoCambio( value ) {
        if ( value === "" ) value = 0;
        if ( !isNaN( value ) ) {
            if ( Functions.esDecimal( value, 2 ) ) {
                notaSalida.tipocambio = Functions.onChangeNumberDecimal(value);
                onChange( notaSalida );
            }
        };
    };

    function onChangeFecha( value ) {
        notaSalida.fechanotasalida = value;
        onChange( notaSalida );
    };

    function onChangeCodigo( value ) {
        notaSalida.codigo        = value;
        notaSalida.error.codigo  = false;
        notaSalida.message.codigo = "";
        onChange( notaSalida );
    };

    function onChangeNroManual( value ) {
        notaSalida.nromanual = value;
        onChange( notaSalida );
    };

    function onChangeEsIngresado() {
        notaSalida.esingresado = (notaSalida.esingresado === "A") ? "N" : "A";
        onChange( notaSalida );
    };

    function onChangeNota( value ) {
        notaSalida.nota = value;
        onChange( notaSalida );
    };

    function onShowSucursal() {
        if ( !disabled.data ) setVisibleSucursal(true);
    };

    function onChangeFKIDSucursal( data ) {
        notaSalida.fkidsucursal  = data.idsucursal;
        notaSalida.sucursal      = data.descripcion;
        notaSalida.error.fkidsucursal   = false;
        notaSalida.message.fkidsucursal = "";
        onChange( notaSalida );
        setVisibleSucursal(false);
    };

    function componentSucursal() {
        if ( !visible_sucursal ) return null;
        return (
            <M_ListadoSucursal
                visible={visible_sucursal}
                onClose={ () => setVisibleSucursal(false) }
                value={notaSalida.fkidsucursal}
                onChange={onChangeFKIDSucursal}
            />
        );
    };

    function onShowAlmacen() {
        if ( !disabled.data ) setVisibleAlmacen(true);
    };

    function onChangeFKIDAlmacen( data ) {
        notaSalida.fkidalmacen  = data.idalmacen;
        notaSalida.almacen      = data.descripcion;
        notaSalida.error.fkidalmacen   = false;
        notaSalida.message.fkidalmacen = "";
        onChange( notaSalida );
        setVisibleAlmacen(false);
    };

    function componentAlmacen() {
        if ( !visible_almacen ) return null;
        return (
            <M_ListadoAlmacen
                visible={visible_almacen}
                onClose={ () => setVisibleAlmacen(false) }
                value={notaSalida.fkidalmacen}
                onChange={onChangeFKIDAlmacen}
                fkidsucursal={notaSalida.fkidsucursal}
            />
        );
    };

    function onShowConceptoInventario() {
        if ( !disabled.data ) setVisibleConcepto(true);
    };

    function onChangeFKIDConceptoInventario( data ) {
        notaSalida.fkidconceptoinventario  = data.idconceptoinventario;
        notaSalida.conceptoinventario      = data.descripcion;
        notaSalida.error.fkidconceptoinventario   = false;
        notaSalida.message.fkidconceptoinventario = "";
        onChange( notaSalida );
        setVisibleConcepto(false);
    };

    function componentConceptoInventario() {
        if ( !visible_concepto ) return null;
        return (
            <M_ListadoConceptoInventario
                visible={visible_concepto}
                onClose={ () => setVisibleConcepto(false) }
                value={notaSalida.fkidconceptoinventario}
                onChange={onChangeFKIDConceptoInventario}
            />
        );
    };

    function onVisibleProducto( detalle, index ) {
        detalle.index = index;
        detalle.visible_producto = true;
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
                    console.log(data);
                    let detalle = notaSalida.arrayNotaSalidaDetalle[row_detalle.index];

                    detalle.codigo = data.codigo;
                    detalle.producto = data.nombre;
                    detalle.fkidproducto = data.idproducto;
                    detalle.unidadmedida = `${parseFloat(data.valorequivalente).toFixed(2)} ${data.abreviatura}`;

                    detalle.fkidciudadorigen = data.fkidciudadorigen;
                    detalle.ciudadorigen = data.ciudadorigen;

                    detalle.fkidproductomarca = data.fkidproductomarca;
                    detalle.productomarca = data.productomarca;

                    detalle.fkidproductotipo = data.fkidproductotipo;
                    detalle.productotipo = data.productotipo;

                    detalle.fkidsucursal = notaSalida.fkidsucursal;
                    detalle.sucursal = notaSalida.sucursal;

                    detalle.fkidalmacen = notaSalida.fkidalmacen;
                    detalle.almacen = notaSalida.almacen;

                    detalle.stockactualanterior = data.stockactual;
                    detalle.cantidad = 0;
                    detalle.nrocajas = 0;

                    detalle.descuento = 0;
                    detalle.montodescuento = 0;

                    detalle.costobase = parseFloat(data.costounitario).toFixed(2);
                    detalle.costounitario = parseFloat(data.costounitario).toFixed(2);
                    detalle.costosubtotal = "0.00";

                    detalle.peso = parseFloat(data.peso).toFixed(2);
                    detalle.pesosubtotal = "0.00";

                    detalle.volumen = parseFloat(data.volumen).toFixed(2);
                    detalle.volumensubtotal = "0.00";

                    detalle.fechavencimiento = null;
                    detalle.fvencimiento = null;
                    detalle.nota = null;

                    detalle.nrolote = "0.00";
                    detalle.nrofabrica = "0.00";

                    detalle.fkidnotasalida = null;
                    detalle.idnotasalidadetalle = null;
                    detalle.fkidalmacenproductodetalle = null;

                    detalle.visible_producto = false;
                    detalle.visible_sucursal = false;
                    detalle.visible_almacen = false;
                    detalle.errorcantidad = false;
                    detalle.errorcostounitario = false;
        
                    onChange(notaSalida);
                    setRowDetalle(null);
                } }
            />
        );
    };

    return (
        <>

            { componentSucursal() }
            { componentAlmacen() }
            { componentConceptoInventario() }
            { componentProducto() }

            <Row gutter={ [12, 8] }>
                <Col xs={{ span: 24, }} sm={{ span: 4, }}>
                    <C_Input
                        label={ "Nro"}
                        placeholder={ "INGRESAR NRO..." }
                        value={ idnotasalida }
                        onChange={ onChangeID }
                        disabled={ disabled.iddata }
                        onPressEnter={ props.onPressEnter }
                        autoFocus={true}
                        focus={ focusInput }
                    />
                </Col>
                <Col xs={{ span: 24, }} sm={{ span: 4, }}>
                    <C_Input
                        label={ "Código"}
                        placeholder={ "INGRESAR CÓDIGO..." }
                        value={ codigo }
                        onChange={ onChangeCodigo }
                        disabled={ disabled.data }
                        error={error.codigo}
                        message={message.codigo}
                    />
                </Col>
                <Col xs={{ span: 24, }} sm={{ span: 4, }}>
                    <C_Input
                        label={ "Nro. manual"}
                        placeholder={ "INGRESAR NRO MANUAL..." }
                        value={ notaSalida.nromanual }
                        onChange={ onChangeNroManual }
                        disabled={ disabled.data }
                    />
                </Col>
                <Col xs={{ span: 24, }} sm={{ span: 4, }}>
                    <C_Date 
                        label={"Fecha"}
                        value={ notaSalida.fechanotasalida }
                        onChange={ onChangeFecha }
                        disabled={ disabled.data }
                        allowClear={false}
                    />
                </Col>
                <Col xs={{ span: 24, }} sm={{ span: 4, }}>
                    <C_Input 
                        label={"Moneda"}
                        value={ notaSalida.moneda }
                        disabled={ true }
                    />
                </Col>
                <Col xs={{ span: 24, }} sm={{ span: 4, }}>
                    <C_Input 
                        label={"Tipo Cambio"}
                        value={ notaSalida.tipocambio }
                        onChange={ onChangeTipoCambio }
                        disabled={ disabled.data }
                    />
                </Col>
            </Row>
            <Row gutter={ [12, 8] }>
                <Col xs={{ span: 24, }} sm={{ span: 8, }}>
                    <C_Input
                        label={"Sucursal"}
                        placeholder={ "SELECCIONAR SUCURSAL..." }
                        value={ notaSalida.sucursal }
                        onClick={onShowSucursal}
                        disabled={ disabled.data }
                        error={error.fkidsucursal}
                        message={message.fkidsucursal}
                        select={true}
                    />
                </Col>
                <Col xs={{ span: 24, }} sm={{ span: 8, }}>
                    <C_Input
                        label={"Álmacen"}
                        placeholder={ "SELECCIONAR ÁLMACEN..." }
                        value={ notaSalida.almacen }
                        onClick={onShowAlmacen}
                        disabled={ (disabled.data || ( typeof notaSalida.fkidsucursal !== 'number' ) ) ? true : false }
                        error={error.fkidalmacen}
                        message={message.fkidalmacen}
                        select={true}
                    />
                </Col>
                <Col xs={{ span: 24, }} sm={{ span: 8, }}>
                    <C_Input
                        label={"Concepto"}
                        placeholder={ "SELECCIONAR CONCEPTO..." }
                        value={ notaSalida.conceptoinventario }
                        onClick={onShowConceptoInventario}
                        disabled={ disabled.data }
                        error={error.fkidconceptoinventario}
                        message={message.fkidconceptoinventario}
                        select={true}
                    />
                </Col>
            </Row>
            <div className="main-card card mb-1 mt-3 pl-1 pr-1 pb-1">
                <Table 
                    pagination={false} bordered size={"small"}
                    style={{ width: "100%", minWidth: "100%", maxWidth: "100%", }}
                    columns={ columns( notaSalida, disabled, onVisibleProducto, onChange ) } 
                    dataSource={notaSalida.arrayNotaSalidaDetalle}
                    scroll={{ x: 2400, y: notaSalida.arrayNotaSalidaDetalle.length == 0 ? 40 : 150 }}
                />
            </div>
            <Row gutter={ [12, 8] }>
                <Col xs={{ span: 24, }} sm={{ span: 16, }}>
                    <Row gutter={ [12, 8] }>
                        <Col xs={{ span: 24, }} sm={{ span: 12, }}>
                            <C_Input
                                label={ "Analitico"}
                                placeholder={ "INGRESAR ANALITICO..." }
                                value={ "Por definir" }
                                disabled
                            />
                        </Col>
                        <Col xs={{ span: 24, }} sm={{ span: 6, }} className="d-flex justify-content-start align-items-center mt-1">
                            <C_Checkbox disabled={disabled.data}
                                titleText={ (notaSalida.estado === "A") ? "Activo" : "Inactivo" }
                                checked={ (notaSalida.estado === "A") }
                                onChange={ () => {
                                    notaSalida.estado = (notaSalida.estado === "A") ? "N" : "A";
                                    onChange( notaSalida );
                                } }
                            />
                        </Col>
                    </Row>
                    <Row gutter={ [12, 8] }>
                        <Col xs={{ span: 24, }} sm={{ span: 24, }}>
                            <C_Input
                                label={ "Nota"}
                                placeholder={ "INGRESAR NOTA..." }
                                value={ notaSalida.nota }
                                onChange={ onChangeNota }
                                disabled={ disabled.data }
                                multiline minRows={3} maxRows={3}
                            />
                        </Col>
                    </Row>
                </Col>
                <Col xs={{ span: 24, }} sm={{ span: 8, }}>
                    <Row gutter={ [12, 8] }>
                        <Col xs={{ span: 24, }} sm={{ span: 12, }}>
                            <div className='form-row'>
                                <Col xs={{ span: 24, }} sm={{ span: 24, }}>
                                    <C_Input
                                        label={ "Nro. Cajas Total"}
                                        value={ notaSalida.nrocajastotal }
                                        readOnly
                                    />
                                </Col>
                                <Col xs={{ span: 24, }} sm={{ span: 24, }}>
                                    <C_Input
                                        label={ "Peso Total"}
                                        value={ notaSalida.pesototal }
                                        readOnly
                                    />
                                </Col>
                                <Col xs={{ span: 24, }} sm={{ span: 24, }}>
                                    <C_Input
                                        label={ "Vol. Total"}
                                        value={ notaSalida.volumentotal }
                                        readOnly
                                    />
                                </Col>
                            </div>
                        </Col>
                        <Col xs={{ span: 24, }} sm={{ span: 12, }}>
                            <div className='form-row'>
                                <Col xs={{ span: 24, }} sm={{ span: 24, }}>
                                    <C_Input
                                        label={ "Cant. Total"}
                                        value={ notaSalida.cantidadtotal }
                                        readOnly
                                    />
                                </Col>
                                <Col xs={{ span: 24, }} sm={{ span: 24, }}>
                                    <C_Input
                                        label={ "Mto. Total"}
                                        value={ notaSalida.montototal }
                                        readOnly
                                    />
                                </Col>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    );
};

C_Form.propTypes = {
    notaSalida: PropTypes.object,
    disabled:  PropTypes.object,

    onChange:     PropTypes.func.isRequired,
    onPressEnter: PropTypes.func,
};

C_Form.defaultProps = {
    onChange: ( evt ) => {},
};

export default C_Form;