
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { Col, Row, Table } from 'antd';
import { C_Checkbox, C_Confirm, C_Date, C_Input, C_Message } from '../../../../../../../components';
import { Functions } from '../../../../../../../utils/functions';

import M_ListadoSucursal from '../../../data/sucursal/modal/listado';
import M_ListadoAlmacen from '../../../../inventario/data/almacen/modal/listado';

import M_ListadoCliente from '../../../data/cliente/modal/listado';
import M_ListadoVendedor from '../../../data/vendedor/modal/listado';
import M_ListadoConceptoVenta from '../../../data/conceptoventa/modal/listado';
import M_ListadoAlmacenProductoDetalle from '../../../../inventario/data/almacenproducto/modal/listado';

import { columns } from './columns';
import M_ListadoListaPrecio from '../../../data/listaprecio/modal/listado';

function C_Form( props ) {
    const { notaVenta, disabled, onChange } = props;
    const { idnotaventa } = notaVenta;
    const { focusInput, error, message } = notaVenta;

    const [ visible_sucursal, setVisibleSucursal ] = useState(false);
    const [ visible_almacen, setVisibleAlmacen ] = useState(false);
    const [ visible_concepto, setVisibleConcepto ] = useState(false);
    const [ visible_vendedor, setVisibleVendedor ] = useState(false);
    const [ visible_cliente, setVisibleCliente ] = useState(false);
    const [ visible_listaprecio, setVisibleListaPrecio ] = useState(false);

    const [ rownotaventadetalle, setRowNotaVentaDetalle ] = useState( null );

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
    };

    function onChangeNota( value ) {
        notaVenta.glosa = value;
        onChange( notaVenta );
    };

    function onChangeDescuento( value ) {
        if ( value === "" ) value = 0;
        if ( !isNaN( value ) ) {
            if ( parseInt( value ) <= 100 && parseInt( value ) >= 0 ) {
                notaVenta.descuento = parseInt(value);
                let montosubtotal = parseFloat(notaVenta.montosubtotal);
                let descuento = parseInt(notaVenta.descuento);
                let montodescuento = parseFloat( ( descuento / 100 ) * montosubtotal );
                notaVenta.montodescuento = montodescuento.toFixed(2);

                notaVenta.montototal = parseFloat( montosubtotal - montodescuento ).toFixed(2);
                onChange( notaVenta );
            }
        };
    };

    function onChangeMontoDescuento( value ) {
        if ( value === "" ) value = 0;
        if ( !isNaN( value ) ) {
            if ( Functions.esDecimal( value, 2 ) ) {
                let montodescuento = Functions.onChangeNumberDecimal(value);
                if ( parseFloat( montodescuento ) <= parseFloat( notaVenta.montosubtotal ) ) {
                    notaVenta.montodescuento = montodescuento;
                    let montosubtotal = parseFloat(notaVenta.montosubtotal);
                    montodescuento = parseFloat(notaVenta.montodescuento);
                    let descuento = parseInt( ( montodescuento / montosubtotal ) * 100 );
                    notaVenta.descuento = descuento;

                    notaVenta.montototal = parseFloat( montosubtotal  - montodescuento ).toFixed(2);
                    onChange( notaVenta );
                }
            }
        };
    };

    function onChangeFKIDSucursal( sucursal ) {
        notaVenta.fkidsucursal = sucursal.idsucursal;
        notaVenta.sucursal     = `${sucursal.descripcion}`;

        notaVenta.fkidalmacen = sucursal.arrayalmacen.length > 0 ? sucursal.arrayalmacen[0].idalmacen : null;
        notaVenta.almacen = sucursal.arrayalmacen.length > 0 ? sucursal.arrayalmacen[0].descripcion : "";

        notaVenta.error.fkidsucursal  = false;
        notaVenta.message.fkidsucursal = "";
        notaVenta.error.fkidalmacen  = false;
        notaVenta.message.fkidalmacen = "";

        for (let index = 0; index < notaVenta.notaventadetalle.length; index++) {
            let element = notaVenta.notaventadetalle[index];
            if ( element.fkidproducto == null ) {
                element.fkidsucursal = sucursal.idsucursal;
                element.fkidalmacen = sucursal.arrayalmacen.length > 0 ? sucursal.arrayalmacen[0].idalmacen : null;
                element.almacen = sucursal.arrayalmacen.length > 0 ? sucursal.arrayalmacen[0].descripcion : "";
            }
        }

        onChange( notaVenta );
        setVisibleSucursal( () => false );
    }

    function onChangeFKIDAlmacen( almacen ) {
        notaVenta.fkidalmacen = almacen.idalmacen;
        notaVenta.almacen     = `${almacen.descripcion}`;
        notaVenta.error.fkidalmacen  = false;
        notaVenta.message.fkidalmacen = "";
        
        for (let index = 0; index < notaVenta.notaventadetalle.length; index++) {
            let element = notaVenta.notaventadetalle[index];
            if ( element.fkidproducto == null ) {
                element.fkidalmacen = almacen.idalmacen;
                element.almacen = almacen.descripcion;
            }
        }

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
        console.log(cliente)
        notaVenta.fkidcliente = cliente.idcliente;
        notaVenta.cliente     = `${cliente.nombre} ${cliente.apellido}`;
        notaVenta.nit         = `${cliente.nit ? cliente.nit  : "0"}`;
        notaVenta.razonsocial = `${cliente.razonsocial ? cliente.razonsocial  : ""}`;
        notaVenta.error.fkidcliente  = false;
        notaVenta.message.fkidcliente = "";
        onChange( notaVenta );
        setVisibleCliente( () => false );
    }

    function onChangeFechaVencimiento( value ) {
        if ( value == "" ) {
            notaVenta.diascredito = 0;
            notaVenta.fechavencimiento = "";
        } else {
            if ( Functions.convertDMYToYMD( value ) >= Functions.convertDMYToYMD( notaVenta.fechaventa ) ) {
                let fechaventa  = moment( Functions.convertDMYToYMD( notaVenta.fechaventa ) );
                let fechavencimiento = moment( Functions.convertDMYToYMD( value ) );
                let cantDias = fechavencimiento.diff( fechaventa, "days" );
                notaVenta.fechavencimiento = value;
                notaVenta.diascredito = cantDias;
            } else {
                C_Message( "warning", "La fecha vcmto. debe ser mayor" );
            }
        }
        onChange( notaVenta );
    };

    function onChangeNroFactura( value ) {
        if ( value === "" ) value = 0;
        if ( !isNaN( value ) ) {
            if ( parseInt(value) >= 0 ) {
                notaVenta.nrofactura        = parseInt(value);
                notaVenta.error.nrofactura  = false;
                notaVenta.message.nrofactura = "";
                onChange( notaVenta );
            }
        }
    };

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

    function onShowListaPrecio() {
        if ( !disabled.data ) setVisibleListaPrecio(true);
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

    function onVisibleProducto( detalle, index ) {
        detalle.index = index;
        detalle.visible_almacen = false;
        detalle.visible_listaprecio = false;
        detalle.visible_producto = true;
        setRowNotaVentaDetalle(detalle);
    };

    function existProduct( fkidproducto ) {
        for (let index = 0; index < notaVenta.notaventadetalle.length; index++) {
            const element = notaVenta.notaventadetalle[index];
            if ( element.fkidproducto == fkidproducto ) return true;
        }
        return false;
    }

    function onChangeFKIDProducto( producto ) {
        let index = rownotaventadetalle.index;
        let detalle = notaVenta.notaventadetalle[index];
        let existCantidad = ( typeof detalle.cantidad == "number" ) ? true : false;
        if ( existCantidad ) {
            if ( parseInt( detalle.cantidad ) > 0 ) {
                detalle.visible_producto = false;
                onChange( notaVenta );
                setRowNotaVentaDetalle(null);
                C_Message( "warning", "Producto ya seleccionado y con cantidad ya establecido." );
                return;
            };
        }
        if ( existProduct( producto.idproducto ) ) {
            C_Message( "warning", "Producto ya ha selecionado." );
            return;
        }
        detalle.fkidproducto = producto.idproducto;
        detalle.fkidalmacenproductodetalle = producto.idalmacenproductodetalle;
        detalle.fkidlistapreciodetalle = producto.idlistapreciodetalle;
        detalle.codigo = producto.codigo;
        detalle.unidadmedida = `${parseFloat(producto.valorequivalente).toFixed(2)} ${producto.abreviatura}`;
        detalle.producto = `${producto.producto}`;
        detalle.cantidadsolicitada = 0;
        detalle.cantidad = 0;
        detalle.preciobase = parseFloat(producto.precioventa).toFixed(2);
        detalle.descuento = 0;
        detalle.montodescuento = 0;
        detalle.preciounitario = parseFloat(producto.precioventa).toFixed(2);
        detalle.preciosubtotal = 0;
        detalle.nrolote = 0;
        detalle.nrofabrica = 0;
        detalle.fvencimiento = null;
        detalle.fechavencimiento = null;
        detalle.nota = "";
        detalle.visible_producto = false;

        detalle.fkidproductotipo = producto.idproductotipo;
        detalle.productotipo = producto.tipo;

        detalle.fkidproductomarca = producto.idproductomarca;
        detalle.productomarca = producto.marca;

        detalle.fkidciudad = producto.idciudad;
        detalle.productociudad = producto.origen;
        onChange( notaVenta );
        setRowNotaVentaDetalle(null);
    };

    function componentProducto() {
        if ( rownotaventadetalle === null ) return null;
        if ( !rownotaventadetalle.visible_producto ) return null;
        return (
            <M_ListadoAlmacenProductoDetalle
                visible={rownotaventadetalle.visible_producto}
                onClose={ () =>  setRowNotaVentaDetalle(null) }
                value={rownotaventadetalle.fkidproducto}
                onChange={ onChangeFKIDProducto }
                isventa={"A"} estado={"A"} 
                fkidalmacen={rownotaventadetalle.fkidalmacen}
                fkidlistaprecio={rownotaventadetalle.fkidlistaprecio}
            />
        );
    };

    function onVisibleAlmacenDetalle(detalle, index) {
        detalle.index = index;
        detalle.visible_producto = false;
        detalle.visible_listaprecio = false;
        detalle.visible_almacen = true;
        setRowNotaVentaDetalle(detalle);
    }

    function onChangeFKIDAlmacenDetalle( almacen ) {
        let index = rownotaventadetalle.index;
        let detalle = notaVenta.notaventadetalle[index];
        if ( typeof detalle.fkidproducto == "number" ) {
            C_Confirm( {
                title: "Cambiar Álmacen", onOk: () => {
                    detalle.fkidalmacen = almacen.idalmacen;
                    detalle.almacen = almacen.descripcion;
                    detalle.visible_almacen = false;

                    detalle.fkidproducto = null;
                    detalle.fkidalmacenproductodetalle = null;
                    detalle.fkidlistapreciodetalle = null;
                    detalle.codigo = "";
                    detalle.unidadmedida = "";
                    detalle.producto = "";
                    detalle.cantidadsolicitada = "";
                    detalle.cantidad = "";
                    detalle.preciobase = "";
                    detalle.descuento = "";
                    detalle.montodescuento = "";
                    detalle.preciounitario = "";
                    detalle.preciosubtotal = "";
                    detalle.nrolote = "";
                    detalle.nrofabrica = "";
                    detalle.visible_producto = false;

                    detalle.fkidproductotipo = null;
                    detalle.productotipo = "";

                    detalle.fkidproductomarca = null;
                    detalle.productomarca = "";

                    detalle.fkidciudad = null;
                    detalle.productociudad = "";

                    onChange( notaVenta );
                    setRowNotaVentaDetalle(null);
                },
                okType: "primary", content: "Estás seguro de realizar cambio, por que se perderá los datos registrados en esa fila.?",
            } );
        } else {
            detalle.fkidalmacen = almacen.idalmacen;
            detalle.almacen = almacen.descripcion;
            detalle.visible_almacen = false;
            onChange( notaVenta );
            setRowNotaVentaDetalle(null);
        }
    }

    function componentAlmacenDetalle() {
        if ( rownotaventadetalle === null ) return null;
        if ( !rownotaventadetalle.visible_almacen ) return null;
        return (
            <M_ListadoAlmacen
                visible={rownotaventadetalle.visible_almacen}
                onClose={ () => setRowNotaVentaDetalle(null) }
                value={rownotaventadetalle.fkidalmacen}
                onChange={onChangeFKIDAlmacenDetalle}
                fkidsucursal={rownotaventadetalle.fkidsucursal}
            />
        );
    }

    function onVisibleListaPrecioDetalle(detalle, index) {
        detalle.index = index;
        detalle.visible_producto = false;
        detalle.visible_almacen = false;
        detalle.visible_listaprecio = true;
        setRowNotaVentaDetalle(detalle);
    }

    function onChangeFKIDListaPrecioDetalle( listaprecio ) {
        let index = rownotaventadetalle.index;
        let detalle = notaVenta.notaventadetalle[index];

        if ( typeof detalle.fkidproducto == "number" ) {
            C_Confirm( {
                title: "Cambiar Lista Precio", onOk: () => {
                    detalle.fkidlistaprecio = listaprecio.idlistaprecio;
                    detalle.listaprecio = listaprecio.descripcion;
                    detalle.visible_listaprecio = false;

                    detalle.fkidproducto = null;
                    detalle.fkidalmacenproductodetalle = null;
                    detalle.fkidlistapreciodetalle = null;
                    detalle.codigo = "";
                    detalle.unidadmedida = "";
                    detalle.producto = "";
                    detalle.cantidadsolicitada = "";
                    detalle.cantidad = "";
                    detalle.preciobase = "";
                    detalle.descuento = "";
                    detalle.montodescuento = "";
                    detalle.preciounitario = "";
                    detalle.preciosubtotal = "";
                    detalle.nrolote = "";
                    detalle.nrofabrica = "";
                    detalle.visible_producto = false;

                    detalle.fkidproductotipo = null;
                    detalle.productotipo = "";

                    detalle.fkidproductomarca = null;
                    detalle.productomarca = "";

                    detalle.fkidciudad = null;
                    detalle.productociudad = "";

                    onChange( notaVenta );
                    setRowNotaVentaDetalle(null);
                },
                okType: "primary", content: "Estás seguro de realizar cambio, por que se perderá los datos registrados en esa fila.?",
            } );
        } else {
            detalle.fkidlistaprecio = listaprecio.idlistaprecio;
            detalle.listaprecio = listaprecio.descripcion;
            detalle.visible_listaprecio = false;
            onChange( notaVenta );
            setRowNotaVentaDetalle(null);
        }

    }

    function componentListaPrecioDetalle() {
        if ( rownotaventadetalle === null ) return null;
        if ( !rownotaventadetalle.visible_listaprecio ) return null;
        return (
            <M_ListadoListaPrecio
                visible={rownotaventadetalle.visible_listaprecio}
                onClose={ () => setRowNotaVentaDetalle(null) }
                value={rownotaventadetalle.fkidlistaprecio}
                onChange={onChangeFKIDListaPrecioDetalle}
            />
        );
    }

    function onChangeFKIDListaPrecio( listaprecio ) {
        notaVenta.fkidlistaprecio = listaprecio.idlistaprecio;
        notaVenta.listaprecio     = `${listaprecio.descripcion}`;
        notaVenta.error.fkidlistaprecio  = false;
        notaVenta.message.fkidlistaprecio = "";

        for (let index = 0; index < notaVenta.notaventadetalle.length; index++) {
            let element = notaVenta.notaventadetalle[index];
            if ( element.fkidproducto == null ) {
                element.fkidlistaprecio = listaprecio.idlistaprecio;
                element.listaprecio = listaprecio.descripcion;
            }
        }
        
        onChange( notaVenta );
        setVisibleListaPrecio( () => false );
    }

    function componentListaPrecio() {
        if ( !visible_listaprecio ) return null;
        return (
            <M_ListadoListaPrecio
                visible={visible_listaprecio}
                onClose={ () => setVisibleListaPrecio(false) }
                value={notaVenta.fkidlistaprecio}
                onChange={onChangeFKIDListaPrecio}
            />
        );
    }

    return (
        <>
            { componentSucursal() }
            { componentAlmacen() }
            { componentConcepto() }
            { componentListaPrecio() }

            { componentVendedor() }
            { componentCliente() }

            { componentProducto() }
            { componentAlmacenDetalle() }
            { componentListaPrecioDetalle() }

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
            <Row gutter={ [12, 8] }>
                <Col sm={{ span: 6, }}></Col>
                <Col xs={{ span: 24, }} sm={{ span: 6, }}>
                    <C_Input
                        label={"Lista Precio"}
                        placeholder={ "SELECCIONAR LISTA PRECIO..." }
                        value={ notaVenta.listaprecio }
                        onClick={onShowListaPrecio}
                        disabled={ disabled.data }
                        error={error.fkidlistaprecio}
                        message={message.fkidlistaprecio}
                        select={true}
                    />
                </Col>
            </Row>
            <Row gutter={ [12, 8] }>
                <Col xs={{ span: 24, }}>
                    <div className="main-card card mb-1 mt-2 pl-1 pr-1 pb-1">
                        <Table
                            pagination={false} bordered size={"small"}
                            style={{ width: "100%", minWidth: "100%", maxWidth: "100%", }}
                            columns={ columns( notaVenta, disabled, onChange, onVisibleProducto, onVisibleAlmacenDetalle, onVisibleListaPrecioDetalle  ) }
                            dataSource={notaVenta.notaventadetalle} rowKey="key"
                            scroll={{ x: 2100, y: notaVenta.notaventadetalle.length == 0 ? 40 : 200 }}
                        />
                    </div>
                </Col>
            </Row>
            <Row gutter={ [12, 8] }>
                <Col xs={{ span: 24, }} sm={{ span: 14, }}>
                    <Row gutter={ [12, 8] }>
                        <Col xs={{ span: 24, }} sm={{ span: 6, }}>
                            <C_Input
                                label={ "D. cred."}
                                placeholder={ "INGRESAR NRO..." }
                                value={ notaVenta.diascredito }
                                readOnly
                                disabled={ disabled.data }
                            />
                        </Col>
                        <Col xs={{ span: 24, }} sm={{ span: 6, }}>
                            <C_Date
                                label={"Vcmto."}
                                value={ notaVenta.fechavencimiento }
                                onChange={ onChangeFechaVencimiento }
                                disabled={ disabled.data }
                            />
                        </Col>
                        <Col xs={{ span: 24, }} sm={{ span: 6, }} className="d-flex justify-content-end align-items-center mt-1">
                            <C_Checkbox disabled={disabled.data}
                                titleText={ "Facturar" }
                                checked={ (notaVenta.facturar === "S") }
                                onChange={ () => {
                                    notaVenta.facturar = (notaVenta.facturar === "S") ? "N" : "S";
                                    onChange( notaVenta );
                                } }
                            />
                        </Col>
                        <Col xs={{ span: 24, }} sm={{ span: 6, }}>
                            <C_Input
                                label={ "Nº Fac."}
                                placeholder={ "INGRESAR NRO..." }
                                value={ notaVenta.nrofactura }
                                onChange={ onChangeNroFactura }
                                disabled={ disabled.data }
                                error={error.nrofactura}
                                message={message.nrofactura}
                            />
                        </Col>
                    </Row>
                    <Row gutter={ [12, 8] }>
                        <Col xs={{ span: 24, }} sm={{ span: 6, }}>
                            <C_Input
                                label={ "N.I.T."}
                                placeholder={ "INGRESAR ENCARGADO..." }
                                value={notaVenta.nit}
                                disabled={disabled.data}
                                readOnly
                            />
                        </Col>
                        <Col xs={{ span: 24, }} sm={{ span: 12, }}>
                            <C_Input
                                label={ "Razon Social"}
                                placeholder={ "INGRESAR RAZON SOCIAL..." }
                                value={notaVenta.razonsocial}
                                disabled={disabled.data}
                                readOnly
                            />
                        </Col>
                        <Col xs={{ span: 24, }} sm={{ span: 6, }} className="d-flex justify-content-end align-items-center mt-1">
                            <C_Checkbox disabled={disabled.data}
                                titleText={ "Nota Entrega?" }
                                checked={ (notaVenta.esnotaentrega === "S") }
                                onChange={ () => {
                                    notaVenta.esnotaentrega = (notaVenta.esnotaentrega === "S") ? "N" : "S";
                                    onChange( notaVenta );
                                } }
                            />
                        </Col>
                    </Row>
                    <Row gutter={ [12, 8] }>
                        <Col xs={{ span: 24, }} sm={{ span: 24, }}>
                            <C_Input
                                label={ "Glosa"}
                                placeholder={ "INGRESAR GLOSA..." }
                                value={ notaVenta.glosa }
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
                            label={ "Deuda Mora"}
                            value={  notaVenta.montototaldeudamora }
                            readOnly
                        />
                    </Col>
                    <Col xs={{ span: 24, }} sm={{ span: 24, }}>
                        <C_Input
                            label={ "Deuda Actual"}
                            value={  notaVenta.montototaldeudaactual }
                            readOnly
                        />
                    </Col>
                    <Col xs={{ span: 24, }} sm={{ span: 24, }}>
                        <C_Input
                            label={ "%Desc. Acum."}
                            value={  notaVenta.descuentoacumulado }
                            readOnly
                        />
                    </Col>
                    <Col xs={{ span: 24, }} sm={{ span: 24, }}>
                        <div className='form-row'>
                            <Col xs={{ span: 24, }} sm={{ span: 12, }}>
                                <C_Input
                                    label={ "%R. Ini."}
                                    value={  notaVenta.porcentajerangodescuentoinicial }
                                    readOnly
                                />
                            </Col>
                            <Col xs={{ span: 24, }} sm={{ span: 12, }}>
                                <C_Input
                                    label={ "%R. Fin."}
                                    value={  notaVenta.porcentajerangodescuentofinal }
                                    readOnly
                                />
                            </Col>
                        </div>
                    </Col>
                </Col>
                <Col xs={{ span: 24, }} sm={{ span: 6, }}>
                    <Col xs={{ span: 24, }} sm={{ span: 24, }}>
                        <C_Input
                            label={ "SubTotal"}
                            value={  notaVenta.montosubtotal }
                            disabled={ disabled.data }
                            readOnly
                        />
                    </Col>
                    <Col xs={{ span: 24, }} sm={{ span: 24, }}>
                        <div className="form-row">
                            <Col xs={{ span: 24, }} sm={{ span: 8, }}>
                                <C_Input
                                    label={ "Desc."}
                                    value={ notaVenta.descuento }
                                    disabled={ disabled.data }
                                    onChange={onChangeDescuento}
                                />
                            </Col>
                            <Col xs={{ span: 24, }} sm={{ span: 16, }}>
                                <C_Input
                                    label={ "Mto. desc."}
                                    value={ notaVenta.montodescuento }
                                    disabled={ disabled.data }
                                    onChange={onChangeMontoDescuento}
                                />
                            </Col>
                        </div>
                    </Col>
                    <Col xs={{ span: 24, }} sm={{ span: 24, }}>
                        <C_Input
                            label={ "Mto. Total"}
                            value={ notaVenta.montototal }
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
    notaVenta: PropTypes.object,
    disabled:     PropTypes.object,

    onChange:     PropTypes.func.isRequired,
    onPressEnter: PropTypes.func,
};

C_Form.defaultProps = {
    onChange: ( evt ) => {},
};

export default C_Form;
