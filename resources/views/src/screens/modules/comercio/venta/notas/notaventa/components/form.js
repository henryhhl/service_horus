
import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Col, Row } from 'antd';
import { C_Date, C_Input } from '../../../../../../../components';
import { Functions } from '../../../../../../../utils/functions';

import M_ListadoSucursal from '../../../data/sucursal/modal/listado';
import M_ListadoAlmacen from '../../../../inventario/data/almacen/modal/listado';

import M_ListadoCliente from '../../../data/cliente/modal/listado';
import M_ListadoVendedor from '../../../data/vendedor/modal/listado';
import M_ListadoConceptoVenta from '../../../data/conceptoventa/modal/listado';

function C_Form( props ) {
    const { notaVenta, disabled, onChange } = props;
    const { idnotaventa } = notaVenta;
    const { focusInput, error, message } = notaVenta;

    const [ visible_sucursal, setVisibleSucursal ] = useState(false);
    const [ visible_almacen, setVisibleAlmacen ] = useState(false);
    const [ visible_concepto, setVisibleConcepto ] = useState(false);
    const [ visible_vendedor, setVisibleVendedor ] = useState(false);
    const [ visible_cliente, setVisibleCliente ] = useState(false);

    function onChangeID( value ) {
        notaVenta.idnotaventa = value;
        onChange( notaVenta );
    };

    function onChangeTipoCambio( value ) {
        if ( value === "" ) value = 0;
        if ( !isNaN( value ) ) {
            if ( Functions.esDecimal( value, 2 ) ) {
                notaVenta.tipocambio = Functions.onChangeNumberDecimal(value);
                onChange( notaVenta );
            }
        };
    }

    function onChangeFechaNotaVenta( value ) {
        notaVenta.fechaventa = value;
        onChange( notaVenta );
    }

    function onChangeFKIDSucursal( sucursal ) {
        notaVenta.fkidsucursal = sucursal.idsucursal;
        notaVenta.sucursal     = `${sucursal.descripcion}`;
        notaVenta.error.fkidsucursal  = false;
        notaVenta.message.fkidsucursal = "";
        onChange( notaVenta );
        setVisibleSucursal( () => false );
    }

    function onChangeFKIDAlmacen( almacen ) {
        notaVenta.fkidalmacen = almacen.idalmacen;
        notaVenta.almacen     = `${almacen.descripcion}`;
        notaVenta.error.fkidalmacen  = false;
        notaVenta.message.fkidalmacen = "";
        onChange( notaVenta );
        setVisibleAlmacen( () => false );
    }

    function onChangeFKIDConcepto( conceptoventa ) {
        notaVenta.fkidconceptoventa = conceptoventa.idconceptoventa;
        notaVenta.conceptoventa     = `${conceptoventa.descripcion}`;
        notaVenta.error.fkidconceptoventa  = false;
        notaVenta.message.fkidconceptoventa = "";
        onChange( notaVenta );
        setVisibleConcepto( () => false );
    }

    function onChangeFKIDVendedor( vendedor ) {
        notaVenta.fkidvendedor = vendedor.idvendedor;
        notaVenta.vendedor     = `${vendedor.nombre} ${vendedor.apellido}`;
        notaVenta.error.fkidvendedor  = false;
        notaVenta.message.fkidvendedor = "";
        onChange( notaVenta );
        setVisibleVendedor( () => false );
    }

    function onChangeFKIDCliente( cliente ) {
        notaVenta.fkidcliente = cliente.idcliente;
        notaVenta.cliente     = `${cliente.nombre} ${cliente.apellido}`;
        notaVenta.error.fkidcliente  = false;
        notaVenta.message.fkidcliente = "";
        onChange( notaVenta );
        setVisibleCliente( () => false );
    }

    function onShowSucursal() {
        if ( !disabled.data ) setVisibleSucursal(true);
    };
    function onShowAlmacen() {
        if ( ( !disabled.data ) && ( typeof notaVenta.fkidsucursal == 'number' ) ) setVisibleAlmacen(true);
    };
    function onShowConcepto() {
        if ( !disabled.data ) setVisibleConcepto(true);
    };
    function onShowVendedor() {
        if ( !disabled.data ) setVisibleVendedor(true);
    };
    function onShowCliente() {
        if ( !disabled.data ) setVisibleCliente(true);
    };

    function componentSucursal() {
        if ( !visible_sucursal ) return null;
        return (
            <M_ListadoSucursal
                visible={visible_sucursal}
                onClose={ () => setVisibleSucursal(false) }
                value={notaVenta.fkidsucursal}
                onChange={onChangeFKIDSucursal}
            />
        );
    }

    function componentAlmacen() {
        if ( !visible_almacen ) return null;
        return (
            <M_ListadoAlmacen
                visible={visible_almacen}
                onClose={ () => setVisibleAlmacen(false) }
                value={notaVenta.fkidalmacen}
                onChange={onChangeFKIDAlmacen}
                fkidsucursal={notaVenta.fkidsucursal}
            />
        );
    }

    function componentConcepto() {
        if ( !visible_concepto ) return null;
        return (
            <M_ListadoConceptoVenta
                visible={visible_concepto}
                onClose={ () => setVisibleConcepto(false) }
                value={notaVenta.fkidconceptoventa}
                onChange={onChangeFKIDConcepto}
            />
        );
    }

    function componentVendedor() {
        if ( !visible_vendedor ) return null;
        return (
            <M_ListadoVendedor
                visible={visible_vendedor}
                onClose={ () => setVisibleVendedor(false) }
                value={notaVenta.fkidvendedor}
                onChange={onChangeFKIDVendedor}
            />
        );
    }

    function componentCliente() {
        if ( !visible_cliente ) return null;
        return (
            <M_ListadoCliente
                visible={visible_cliente}
                onClose={ () => setVisibleCliente(false) }
                value={notaVenta.fkidcliente}
                onChange={onChangeFKIDCliente}
            />
        );
    }

    return (
        <>
            { componentSucursal() }
            { componentAlmacen() }
            { componentConcepto() }

            { componentVendedor() }
            { componentCliente() }
            <Row gutter={ [12, 8] }>
                <Col xs={{ span: 24, }} sm={{ span: 4, }}>
                    <C_Input
                        label={ "Nro"}
                        placeholder={ "INGRESAR NRO..." }
                        value={ idnotaventa }
                        onChange={ onChangeID }
                        disabled={ disabled.iddata }
                        onPressEnter={ props.onPressEnter }
                        autoFocus={true}
                        focus={ focusInput }
                    />
                </Col>
                <Col sm={{ span: 8, }}></Col>
                <Col xs={{ span: 24, }} sm={{ span: 4, }}>
                    <C_Input
                        label={"Moneda"}
                        value={ notaVenta.moneda }
                        disabled={ true }
                    />
                </Col>
                <Col xs={{ span: 24, }} sm={{ span: 4, }}>
                    <C_Input
                        label={"T. C."}
                        value={ notaVenta.tipocambio }
                        onChange={ onChangeTipoCambio }
                        disabled={ disabled.data }
                    />
                </Col>
                <Col xs={{ span: 24, }} sm={{ span: 4, }}>
                    <C_Date
                        label={"Fecha"}
                        value={ notaVenta.fechaventa }
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
                        value={ notaVenta.sucursal }
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
                        value={ notaVenta.almacen }
                        onClick={onShowAlmacen}
                        disabled={ (disabled.data || ( typeof notaVenta.fkidsucursal != 'number' ) ) ? true : false }
                        error={error.fkidalmacen}
                        message={message.fkidalmacen}
                        select={true}
                    />
                </Col>
                <Col xs={{ span: 24, }} sm={{ span: 8, }}>
                    <C_Input
                        label={"Concepto"}
                        placeholder={ "SELECCIONAR CONCEPTO..." }
                        value={ notaVenta.conceptoventa }
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
                        value={ notaVenta.vendedor }
                        onClick={onShowVendedor}
                        disabled={ disabled.data }
                        error={error.fkidvendedor}
                        message={message.fkidvendedor}
                        select={true}
                    />
                </Col>
                <Col xs={{ span: 24, }} sm={{ span: 6, }}>
                    <C_Input
                        label={"Cliente"}
                        placeholder={ "SELECCIONAR CLIENTE..." }
                        value={ notaVenta.cliente }
                        onClick={onShowCliente}
                        disabled={ disabled.data }
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
        </>
    );
};

C_Form.propTypes = {
    notaVenta: PropTypes.object,
    disabled:     PropTypes.object,

    onChange:     PropTypes.func.isRequired,
    onPressEnter: PropTypes.func,
};

C_Form.defaultProps = {
    onChange: ( evt ) => {},
};

export default C_Form;
