
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
    const { notaIngreso, disabled, onChange } = props;
    const { codigo, idnotaingreso, focusInput, error, message } = notaIngreso;

    const [ visible_sucursal, setVisibleSucursal ] = useState(false);
    const [ visible_almacen, setVisibleAlmacen ] = useState(false);
    const [ visible_concepto, setVisibleConcepto ] = useState(false);

    const [ row_detalle, setRowDetalle ] = useState( null );

    function onChangeID( value ) {
        notaIngreso.idnotaingreso = value;
        onChange( notaIngreso );
    };

    function onChangeTipoCambio( value ) {
        if ( value === "" ) value = 0;
        if ( !isNaN( value ) ) {
            if ( Functions.esDecimal( value, 2 ) ) {
                notaIngreso.tipocambio = Functions.onChangeNumberDecimal(value);
                onChange( notaIngreso );
            }
        };
    };

    function onChangeFecha( value ) {
        notaIngreso.fechanotaingreso = value;
        onChange( notaIngreso );
    };

    function onChangeCodigo( value ) {
        notaIngreso.codigo        = value;
        notaIngreso.error.codigo  = false;
        notaIngreso.message.codigo = "";
        onChange( notaIngreso );
    };

    function onChangeNroManual( value ) {
        notaIngreso.nromanual = value;
        onChange( notaIngreso );
    };

    function onChangeEsIngresado() {
        notaIngreso.esingresado = (notaIngreso.esingresado === "A") ? "N" : "A";
        onChange( notaIngreso );
    };

    function onChangeNota( value ) {
        notaIngreso.nota = value;
        onChange( notaIngreso );
    };

    function onShowSucursal() {
        if ( !disabled.data ) setVisibleSucursal(true);
    };

    function onChangeFKIDSucursal( data ) {
        notaIngreso.fkidsucursal  = data.idsucursal;
        notaIngreso.sucursal      = data.descripcion;
        notaIngreso.error.fkidsucursal   = false;
        notaIngreso.message.fkidsucursal = "";
        onChange( notaIngreso );
        setVisibleSucursal(false);
    };

    function componentSucursal() {
        if ( !visible_sucursal ) return null;
        return (
            <M_ListadoSucursal
                visible={visible_sucursal}
                onClose={ () => setVisibleSucursal(false) }
                value={notaIngreso.fkidsucursal}
                onChange={onChangeFKIDSucursal}
            />
        );
    };

    function onShowAlmacen() {
        if ( !disabled.data ) setVisibleAlmacen(true);
    };

    function onChangeFKIDAlmacen( data ) {
        notaIngreso.fkidalmacen  = data.idalmacen;
        notaIngreso.almacen      = data.descripcion;
        notaIngreso.error.fkidalmacen   = false;
        notaIngreso.message.fkidalmacen = "";
        onChange( notaIngreso );
        setVisibleAlmacen(false);
    };

    function componentAlmacen() {
        if ( !visible_almacen ) return null;
        return (
            <M_ListadoAlmacen
                visible={visible_almacen}
                onClose={ () => setVisibleAlmacen(false) }
                value={notaIngreso.fkidalmacen}
                onChange={onChangeFKIDAlmacen}
                fkidsucursal={notaIngreso.fkidsucursal}
            />
        );
    };

    function onShowConceptoInventario() {
        if ( !disabled.data ) setVisibleConcepto(true);
    };

    function onChangeFKIDConceptoInventario( data ) {
        notaIngreso.fkidconceptoinventario  = data.idconceptoinventario;
        notaIngreso.conceptoinventario      = data.descripcion;
        notaIngreso.error.fkidconceptoinventario   = false;
        notaIngreso.message.fkidconceptoinventario = "";
        onChange( notaIngreso );
        setVisibleConcepto(false);
    };

    function componentConceptoInventario() {
        if ( !visible_concepto ) return null;
        return (
            <M_ListadoConceptoInventario
                visible={visible_concepto}
                onClose={ () => setVisibleConcepto(false) }
                value={notaIngreso.fkidconceptoinventario}
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
                    let detalle = notaIngreso.arrayNotaIngresoDetalle[row_detalle.index];

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

                    detalle.fkidsucursal = notaIngreso.fkidsucursal;
                    detalle.sucursal = notaIngreso.sucursal;

                    detalle.fkidalmacen = notaIngreso.fkidalmacen;
                    detalle.almacen = notaIngreso.almacen;

                    detalle.stockactualanterior = data.stockactual;
                    detalle.cantidad = 0;
                    detalle.nrocajas = 0;

                    detalle.descuento = 0;
                    detalle.montodescuento = 0;

                    detalle.costobase = parseFloat(data.costounitario).toFixed(2);
                    detalle.costounitario = parseFloat(data.costounitario).toFixed(2);
                    detalle.costosubtotal = "0.00";
                    detalle.costopromedio = 0;

                    detalle.peso = parseFloat(data.peso).toFixed(2);
                    detalle.pesosubtotal = "0.00";

                    detalle.volumen = parseFloat(data.volumen).toFixed(2);
                    detalle.volumensubtotal = "0.00";

                    detalle.fechavencimiento = null;
                    detalle.fvencimiento = null;
                    detalle.nota = null;

                    detalle.nrolote = "0.00";
                    detalle.nrofabrica = "0.00";

                    detalle.fkidnotaingreso = null;
                    detalle.idnotaingresodetalle = null;
                    detalle.fkidalmacenproductodetalle = null;

                    detalle.visible_producto = false;
                    detalle.visible_sucursal = false;
                    detalle.visible_almacen = false;
                    detalle.errorcantidad = false;
                    detalle.errorcostounitario = false;
        
                    onChange(notaIngreso);
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
                        value={ idnotaingreso }
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
                        value={ notaIngreso.nromanual }
                        onChange={ onChangeNroManual }
                        disabled={ disabled.data }
                    />
                </Col>
                <Col xs={{ span: 24, }} sm={{ span: 4, }}>
                    <C_Date 
                        label={"Fecha"}
                        value={ notaIngreso.fechanotaingreso }
                        onChange={ onChangeFecha }
                        disabled={ disabled.data }
                        allowClear={false}
                    />
                </Col>
                <Col xs={{ span: 24, }} sm={{ span: 4, }}>
                    <C_Input 
                        label={"Moneda"}
                        value={ notaIngreso.moneda }
                        disabled={ true }
                    />
                </Col>
                <Col xs={{ span: 24, }} sm={{ span: 4, }}>
                    <C_Input 
                        label={"Tipo Cambio"}
                        value={ notaIngreso.tipocambio }
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
                        value={ notaIngreso.sucursal }
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
                        value={ notaIngreso.almacen }
                        onClick={onShowAlmacen}
                        disabled={ (disabled.data || ( typeof notaIngreso.fkidsucursal !== 'number' ) ) ? true : false }
                        error={error.fkidalmacen}
                        message={message.fkidalmacen}
                        select={true}
                    />
                </Col>
                <Col xs={{ span: 24, }} sm={{ span: 8, }}>
                    <C_Input
                        label={"Concepto"}
                        placeholder={ "SELECCIONAR CONCEPTO..." }
                        value={ notaIngreso.conceptoinventario }
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
                    columns={ columns( notaIngreso, disabled, onVisibleProducto, onChange ) } 
                    dataSource={notaIngreso.arrayNotaIngresoDetalle}
                    scroll={{ x: 2400, y: notaIngreso.arrayNotaIngresoDetalle.length == 0 ? 40 : 150 }}
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
                                titleText={ (notaIngreso.estado === "A") ? "Activo" : "Inactivo" }
                                checked={ (notaIngreso.estado === "A") }
                                onChange={ () => {
                                    notaIngreso.estado = (notaIngreso.estado === "A") ? "N" : "A";
                                    onChange( notaIngreso );
                                } }
                            />
                        </Col>
                        <Col xs={{ span: 24, }} sm={{ span: 6, }} className="d-flex justify-content-start align-items-center mt-1">
                            <C_Checkbox disabled={disabled.data}
                                titleText={ "INGRESADO" } 
                                checked={ (notaIngreso.esingresado === "A") }
                                onChange={ onChangeEsIngresado }
                            />
                        </Col>
                    </Row>
                    <Row gutter={ [12, 8] }>
                        <Col xs={{ span: 24, }} sm={{ span: 24, }}>
                            <C_Input
                                label={ "Nota"}
                                placeholder={ "INGRESAR NOTA..." }
                                value={ notaIngreso.nota }
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
                                        value={ notaIngreso.nrocajastotal }
                                        readOnly
                                    />
                                </Col>
                                <Col xs={{ span: 24, }} sm={{ span: 24, }}>
                                    <C_Input
                                        label={ "Peso Total"}
                                        value={ notaIngreso.pesototal }
                                        readOnly
                                    />
                                </Col>
                                <Col xs={{ span: 24, }} sm={{ span: 24, }}>
                                    <C_Input
                                        label={ "Vol. Total"}
                                        value={ notaIngreso.volumentotal }
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
                                        value={ notaIngreso.cantidadtotal }
                                        readOnly
                                    />
                                </Col>
                                <Col xs={{ span: 24, }} sm={{ span: 24, }}>
                                    <C_Input
                                        label={ "Mto. Total"}
                                        value={ notaIngreso.montototal }
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
    notaIngreso: PropTypes.object,
    disabled:  PropTypes.object,

    onChange:     PropTypes.func.isRequired,
    onPressEnter: PropTypes.func,
};

C_Form.defaultProps = {
    onChange: ( evt ) => {},
};

export default C_Form;
