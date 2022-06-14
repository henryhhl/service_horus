
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
import M_ListadoProveedor from '../../../data/proveedor/modal/listado';
import M_ListadoUnidadMedidaProducto from '../../../../inventario/data/unidadmedidaproducto/modal/listado';
import M_ListadoOrdenCompra from '../../ordencompra/modal/listado';

import { columns } from './column';
import M_ListadoProducto from '../../../../inventario/data/producto/modal/listado';

function C_Form( props ) {
    const { notaCompra, disabled, onChange } = props;
    const { codigo, idnotacompra, focusInput, error, message } = notaCompra;

    const [ visible_sucursal, setVisibleSucursal ] = useState(false);
    const [ visible_almacen, setVisibleAlmacen ] = useState(false);
    const [ visible_concepto, setVisibleConcepto ] = useState(false);
    const [ visible_proveedor, setVisibleProveedor ] = useState(false);
    const [ visible_ordencompra, setVisibleOrdenCompra ] = useState(false);

    const [ row_detalle, setRowDetalle ] = useState( null );

    function onChangeID( value ) {
        notaCompra.idnotacompra = value;
        onChange( notaCompra );
    };

    function onChangeTipoMoneda( value ) {
        notaCompra.tipomoneda = value;
        onChange( notaCompra );
    };

    function onChangeTipoCambio( value ) {
        if ( value === "" ) value = 0;
        if ( !isNaN( value ) ) {
            if ( Functions.esDecimal( value, 2 ) ) {
                notaCompra.tipocambio = Functions.onChangeNumberDecimal(value);
                onChange( notaCompra );
            }
        };
    };

    function onChangeImpuesto( value ) {
        if ( value === "" ) value = 0;
        if ( !isNaN( value ) ) {
            if ( Functions.esDecimal( value, 2 ) ) {
                notaCompra.impuesto = Functions.onChangeNumberDecimal(value);
                let montodescuento = parseFloat(notaCompra.montodescuento);
                let montosubtotal = parseFloat(notaCompra.montosubtotal);
                let fletes = parseFloat(notaCompra.fletes);
                let internacion = parseFloat(notaCompra.internacion);
                let otrosgastos = parseFloat(notaCompra.otrosgastos);
                let impuesto = parseFloat(notaCompra.impuesto);

                let nrofactura = notaCompra.nrofactura;
                let impuestototal = nrofactura > 0 ? parseFloat( (montosubtotal - montodescuento) * ( impuesto / 100 ) ) : 0;
                notaCompra.impuestototal = impuestototal.toFixed(2);

                notaCompra.montototal = parseFloat(montosubtotal + fletes + internacion + otrosgastos - montodescuento - impuestototal).toFixed(2);
                onChange( notaCompra );
            }
        };
    };

    function onChangeNroRefProv( value ) {
        notaCompra.nrorefprov         = value;
        notaCompra.error.nrorefprov   = false;
        notaCompra.message.nrorefprov = "";
        onChange( notaCompra );
    };

    function onChangeDescuento( value ) {
        if ( value === "" ) value = 0;
        if ( !isNaN( value ) ) {
            if ( parseInt( value ) <= 100 && parseInt( value ) >= 0 ) {
                notaCompra.descuento = parseInt(value);
                let fletes = parseFloat(notaCompra.fletes);
                let internacion = parseFloat(notaCompra.internacion);
                let otrosgastos = parseFloat(notaCompra.otrosgastos);
                let montosubtotal = parseFloat(notaCompra.montosubtotal);
                let descuento = parseInt(notaCompra.descuento);
                let montodescuento = parseFloat( ( descuento/100 ) * montosubtotal );
                let impuesto = parseFloat(notaCompra.impuesto);
                notaCompra.montodescuento = montodescuento.toFixed(2);

                let nrofactura = notaCompra.nrofactura;
                let impuestototal = nrofactura > 0 ? parseFloat( (montosubtotal - montodescuento) * ( impuesto / 100 ) ) : 0;
                notaCompra.impuestototal = impuestototal.toFixed(2);

                notaCompra.montototal = parseFloat(montosubtotal + fletes + internacion + otrosgastos - montodescuento - impuestototal).toFixed(2);
                onChange( notaCompra );
            }
        };
    };

    function onChangeMontoDescuento( value ) {
        if ( value === "" ) value = 0;
        if ( !isNaN( value ) ) {
            if ( Functions.esDecimal( value, 2 ) ) {
                let montodescuento = Functions.onChangeNumberDecimal(value);
                if ( parseFloat( montodescuento ) <= parseFloat( notaCompra.montosubtotal ) ) {
                    notaCompra.montodescuento = montodescuento;
                    let fletes = parseFloat(notaCompra.fletes);
                    let internacion = parseFloat(notaCompra.internacion);
                    let otrosgastos = parseFloat(notaCompra.otrosgastos);
                    let montosubtotal = parseFloat(notaCompra.montosubtotal);
                    montodescuento = parseFloat(notaCompra.montodescuento);
                    let descuento = parseInt( (montodescuento / montosubtotal) * 100 );
                    let impuesto = parseFloat(notaCompra.impuesto);
                    notaCompra.descuento = descuento;

                    let nrofactura = notaCompra.nrofactura;
                    let impuestototal = nrofactura > 0 ? parseFloat( (montosubtotal - montodescuento) * ( impuesto / 100 ) ) : 0;
                    notaCompra.impuestototal = impuestototal.toFixed(2);

                    notaCompra.montototal = parseFloat(montosubtotal + fletes + internacion + otrosgastos - montodescuento - impuestototal).toFixed(2);
                    onChange( notaCompra );
                }
            }
        };
    };

    function onChangeFletes( value ) {
        if ( value === "" ) value = 0;
        if ( !isNaN( value ) ) {
            if ( Functions.esDecimal( value, 2 ) ) {
                notaCompra.fletes = Functions.onChangeNumberDecimal(value);
                let fletes = parseFloat(notaCompra.fletes);
                let internacion = parseFloat(notaCompra.internacion);
                let otrosgastos = parseFloat(notaCompra.otrosgastos);
                let montosubtotal = parseFloat(notaCompra.montosubtotal);
                let montodescuento = parseFloat(notaCompra.montodescuento);
                let impuestototal = parseFloat(notaCompra.impuestototal);
                notaCompra.montototal = parseFloat(montosubtotal + fletes + internacion + otrosgastos - montodescuento - impuestototal).toFixed(2);
                onChange( notaCompra );
            }
        };
    };

    function onChangeInternacion( value ) {
        if ( value === "" ) value = 0;
        if ( !isNaN( value ) ) {
            if ( Functions.esDecimal( value, 2 ) ) {
                notaCompra.internacion = Functions.onChangeNumberDecimal(value);
                let fletes = parseFloat(notaCompra.fletes);
                let internacion = parseFloat(notaCompra.internacion);
                let otrosgastos = parseFloat(notaCompra.otrosgastos);
                let montosubtotal = parseFloat(notaCompra.montosubtotal);
                let montodescuento = parseFloat(notaCompra.montodescuento);
                let impuestototal = parseFloat(notaCompra.impuestototal);
                notaCompra.montototal = parseFloat(montosubtotal + fletes + internacion + otrosgastos - montodescuento - impuestototal).toFixed(2);
                onChange( notaCompra );
            }
        };
    };

    function onChangeOtrosGastos( value ) {
        if ( value === "" ) value = 0;
        if ( !isNaN( value ) ) {
            if ( Functions.esDecimal( value, 2 ) ) {
                notaCompra.otrosgastos = Functions.onChangeNumberDecimal(value);
                let fletes = parseFloat(notaCompra.fletes);
                let internacion = parseFloat(notaCompra.internacion);
                let otrosgastos = parseFloat(notaCompra.otrosgastos);
                let montosubtotal = parseFloat(notaCompra.montosubtotal);
                let montodescuento = parseFloat(notaCompra.montodescuento);
                let impuestototal = parseFloat(notaCompra.impuestototal);
                notaCompra.montototal = parseFloat(montosubtotal + fletes + internacion + otrosgastos - montodescuento - impuestototal).toFixed(2);
                onChange( notaCompra );
            }
        };
    };

    function onChangeFechaNotaCompra( value ) {
        notaCompra.fechanotacompra = value;
        notaCompra.fechafactura    = value;
        onChange( notaCompra );
    };

    function onChangeNroFactura( value ) {
        if ( value === "" ) value = 0;
        if ( !isNaN( value ) ) {
            if ( parseInt(value) >= 0 ) {
                notaCompra.nrofactura        = parseInt(value);
                notaCompra.error.nrofactura  = false;
                notaCompra.message.nrofactura = "";

                let fletes = parseFloat(notaCompra.fletes);
                let internacion = parseFloat(notaCompra.internacion);
                let otrosgastos = parseFloat(notaCompra.otrosgastos);
                let montosubtotal = parseFloat(notaCompra.montosubtotal);
                let montodescuento = parseFloat(notaCompra.montodescuento);

                let impuesto = parseFloat(notaCompra.impuesto);

                if ( parseInt(value) > 0 ) {

                    let impuestototal = parseFloat( (montosubtotal - montodescuento) * ( impuesto / 100 ) );
                    notaCompra.impuestototal = impuestototal.toFixed(2);
                    notaCompra.montototal = parseFloat(montosubtotal + fletes + internacion + otrosgastos - montodescuento - impuestototal).toFixed(2);
                } else {
                    let impuestototal = 0;
                    notaCompra.impuestototal = impuestototal.toFixed(2);
                    notaCompra.montototal = parseFloat(montosubtotal + fletes + internacion + otrosgastos - montodescuento - impuestototal).toFixed(2);
                }
                onChange( notaCompra );
            }
        }
    };

    function onChangeTipoCompra( value ) {
        notaCompra.tipocompra = value;
        onChange( notaCompra );
    };

    function onChangeFechaVencimiento( value ) {
        if ( value == "" ) {
            notaCompra.diascredito = 0;
            notaCompra.fechavencimiento = "";
        } else {
            if ( convertDMYToYMD( value ) >= convertDMYToYMD( notaCompra.fechanotacompra ) ) {
                let fechanotacompra  = moment( convertDMYToYMD( notaCompra.fechanotacompra ) );
                let fechavencimiento = moment( convertDMYToYMD( value ) );
                let cantDias = fechavencimiento.diff( fechanotacompra, "days" );
                notaCompra.fechavencimiento = value;
                notaCompra.diascredito = cantDias;
            } else {
                C_Message( "warning", "La fecha vcmto. debe ser mayor" );
            }
        }
        onChange( notaCompra );
    };

    function onChangeNota( value ) {
        notaCompra.nota = value;
        onChange( notaCompra );
    };

    function onShowSucursal() {
        if ( !disabled.data ) setVisibleSucursal(true);
    };

    function onChangeFKIDSucursal( data ) {
        notaCompra.fkidsucursal  = data.idsucursal;
        notaCompra.sucursal      = data.descripcion;
        notaCompra.error.fkidsucursal   = false;
        notaCompra.message.fkidsucursal = "";
        onChange( notaCompra );
        setVisibleSucursal(false);
    };

    function componentSucursal() {
        if ( !visible_sucursal ) return null;
        return (
            <M_ListadoSucursal
                visible={visible_sucursal}
                onClose={ () => setVisibleSucursal(false) }
                value={notaCompra.fkidsucursal}
                onChange={onChangeFKIDSucursal}
            />
        );
    };

    function onShowAlmacen() {
        if ( ( !disabled.data ) && ( typeof notaCompra.fkidsucursal === "number" ) ) setVisibleAlmacen(true);
    };

    function onChangeFKIDAlmacen( data ) {
        notaCompra.fkidalmacen  = data.idalmacen;
        notaCompra.almacen      = data.descripcion;
        notaCompra.error.fkidalmacen   = false;
        notaCompra.message.fkidalmacen = "";
        onChange( notaCompra );
        setVisibleAlmacen(false);
    };

    function componentAlmacen() {
        if ( !visible_almacen ) return null;
        return (
            <M_ListadoAlmacen
                visible={visible_almacen}
                onClose={ () => setVisibleAlmacen(false) }
                value={notaCompra.fkidalmacen}
                onChange={onChangeFKIDAlmacen}
                fkidsucursal={notaCompra.fkidsucursal}
            />
        );
    };

    function onShowConcepto() {
        if ( !disabled.data ) setVisibleConcepto(true);
    };

    function onChangeFKIDConceptoCompra( data ) {
        notaCompra.fkidconceptocompra  = data.idconceptocompra;
        notaCompra.conceptocompra      = data.descripcion;
        notaCompra.error.fkidconceptocompra   = false;
        notaCompra.message.fkidconceptocompra = "";
        onChange( notaCompra );
        setVisibleConcepto(false);
    };

    function componentConcepto() {
        if ( !visible_concepto ) return null;
        return (
            <M_ListadoConceptoCompra
                visible={visible_concepto}
                onClose={ () => setVisibleConcepto(false) }
                value={notaCompra.fkidconceptocompra}
                onChange={onChangeFKIDConceptoCompra}
            />
        );
    };

    function onShowProveedor() {
        if ( !disabled.data ) setVisibleProveedor(true);
    };

    function onChangeFKIDProveedor( data ) {
        notaCompra.fkidproveedor  = data.idproveedor;
        notaCompra.proveedor      = data.nombre;
        notaCompra.error.fkidproveedor   = false;
        notaCompra.message.fkidproveedor = "";
        notaCompra.nitproveedor = data.nit;
        notaCompra.nombrerazonsocial = data.nombre;
        notaCompra.nroautorizacion = "168401000000724";
        notaCompra.codigocontrol = "98-FD-8D-E7";

        for (let index = 0; index < notaCompra.arrayNotaCompraDetalle.length; index++) {
            let element = notaCompra.arrayNotaCompraDetalle[index];
            element.fkidproveedor = data.idproveedor;
            element.proveedor = data.nombre;
        }

        onChange( notaCompra );
        setVisibleProveedor(false);
    };

    function componentProveedor() {
        if ( !visible_proveedor ) return null;
        return (
            <M_ListadoProveedor
                visible={visible_proveedor}
                onClose={ () => setVisibleProveedor(false) }
                value={notaCompra.fkidproveedor}
                onChange={onChangeFKIDProveedor}
            />
        );
    };

    function onVisibleProducto( detalle, index ) {
        detalle.index = index;
        detalle.visible_producto = true;
        detalle.visible_unidadmedida = false;
        setRowDetalle(detalle);
    };

    function existProducto( value ) {
        for (let index = 0; index < notaCompra.arrayNotaCompraDetalle.length; index++) {
            const element = notaCompra.arrayNotaCompraDetalle[index];
            if ( element.fkidproducto === value ) return true;
        }
        return false;
    };

    function onFKIDProducto( producto ) {
        if ( !existProducto( producto.idproducto ) ) {
            let detalle = notaCompra.arrayNotaCompraDetalle[row_detalle.index];

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
            detalle.cantidadrecibida = 0;
            detalle.cantidadfaltante = 0;
            detalle.cantidadsobrante = 0;
            detalle.cantidad = 0;

            detalle.costobase = parseFloat(producto.costounitario).toFixed(2);
            detalle.costounitario = parseFloat(producto.costounitario).toFixed(2);
            detalle.costosubtotal = "0.00";

            detalle.peso = parseFloat(producto.peso).toFixed(2);
            detalle.pesosubtotal = "0.00";

            detalle.volumen = parseFloat(producto.volumen).toFixed(2);
            detalle.volumensubtotal = "0.00";

            detalle.nrolote = "0.00";
            detalle.nrofabrica = "0.00";
            detalle.nrocajas = "0";

            detalle.isdevolucioncompra = "N";
            detalle.isordencompra = "N";
            detalle.issolicitudcompra = "N";

            detalle.fkidnotacompra = null;
            detalle.fkidordencompra = null;
            detalle.fkidordencompradetalle = null;
            detalle.fkidsolicitudcompradetalle = null;
            detalle.fkidsolicitudcompra = null;

            detalle.idnotacompradetalle = null;
            detalle.fkidalmacenproductodetalle = null;

            onChange(notaCompra);
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
                onChange={ onFKIDProducto }
            />
        );
    };

    function updateTotales() {
        let cantidadtotal = 0;
        let montototal = 0;
        notaCompra.arrayNotaCompraDetalle.map( (item) => {
            if ( item.fkidproducto !== null ) {
                cantidadtotal += parseInt(item.cantidad);
                montototal += parseFloat(item.costosubtotal);
            }
        } );
        notaCompra.cantidadtotal = parseInt(cantidadtotal);
        notaCompra.montosubtotal = parseFloat(montototal).toFixed(2);
        let fletes = parseFloat(notaCompra.fletes);
        let internacion = parseFloat(notaCompra.internacion);
        let otrosgastos = parseFloat(notaCompra.otrosgastos);
        let montosubtotal = parseFloat(notaCompra.montosubtotal);
        let montodescuento = parseFloat(notaCompra.montodescuento);
        let impuesto = parseFloat(notaCompra.impuesto);

        let nrofactura = notaCompra.nrofactura;
        let impuestototal = nrofactura > 0 ? parseFloat( (montosubtotal - montodescuento) * ( impuesto / 100 ) ) : 0;
        notaCompra.impuestototal = impuestototal.toFixed(2);

        notaCompra.montototal = parseFloat(montosubtotal + fletes + internacion + otrosgastos - montodescuento - impuestototal).toFixed(2);
    };

    function onShowOrdenCompra() {
        if ( !disabled.data ) setVisibleOrdenCompra(true);
    };

    function onChangeFKIDOrdenCompra( data ) {
        notaCompra.fkidordencompra = data.idordencompra;
        notaCompra.tipocompra = data.tiposolicitud;

        notaCompra.fkidsucursal = data.fkidsucursal;
        notaCompra.sucursal = data.sucursal;

        notaCompra.fkidalmacen = data.fkidalmacen;
        notaCompra.almacen = data.almacen;

        notaCompra.fkidconceptocompra = data.fkidconceptocompra;
        notaCompra.conceptocompra = data.conceptocompra;

        notaCompra.cantidadtotal = parseInt(data.cantidadtotal);

        notaCompra.fkidproveedor = data.fkidproveedor;
        notaCompra.proveedor = data.proveedor;
        notaCompra.nombrerazonsocial = data.proveedor;
        notaCompra.nitproveedor = data.nitproveedor;
        notaCompra.nroautorizacion = "168401000000724";
        notaCompra.codigocontrol = "98-FD-8D-E7";

        notaCompra.montosubtotal = parseFloat(data.montototal).toFixed(2);
        notaCompra.montototal = parseFloat(data.montototal).toFixed(2);

        notaCompra.fletes = parseFloat(data.fletes).toFixed(2);
        notaCompra.internacion = parseFloat(data.internacion).toFixed(2);
        notaCompra.otrosgastos = parseFloat(data.otrosgastos).toFixed(2);

        notaCompra.nrofactura = data.nrofactura ? 0 : parseInt(data.nrofactura);

        notaCompra.isordencompra = "A";
        notaCompra.issolicitudcompra = data.fkidsolicitudcompra ? "A" : "N";

        let montodescuento = parseFloat(notaCompra.montodescuento);
        let montosubtotal = parseFloat(notaCompra.montosubtotal);
        let fletes = parseFloat(notaCompra.fletes);
        let internacion = parseFloat(notaCompra.internacion);
        let otrosgastos = parseFloat(notaCompra.otrosgastos);
        let impuesto = parseFloat(notaCompra.impuesto);

        let nrofactura = notaCompra.nrofactura;
        let impuestototal = nrofactura > 0 ? parseFloat( (montosubtotal - montodescuento) * ( impuesto / 100 ) ) : 0;
        notaCompra.impuestototal = impuestototal.toFixed(2);

        notaCompra.montototal = parseFloat(montosubtotal + fletes + internacion + otrosgastos - montodescuento - impuestototal).toFixed(2);

        let array = [];
        for (let index = 0; index < data.arrayordencompradetalle.length; index++) {
            const detalle = data.arrayordencompradetalle[index];
            let element = {
                key: index,

                fkidproducto: detalle.fkidproducto,
                codigo: detalle.codigo,
                producto: detalle.producto,
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

                cantidad: parseInt(detalle.cantidad),
                cantidadsolicitada: parseInt(detalle.cantidad),
                cantidadrecibida: "0",
                cantidadfaltante: "0",
                cantidadsobrante: "0",

                costobase: parseFloat(detalle.costounitario).toFixed(2),
                costounitario: parseFloat(detalle.costounitario).toFixed(2),
                costosubtotal: parseFloat(detalle.costosubtotal).toFixed(2),

                descuento: parseInt(detalle.descuento),
                montodescuento: parseFloat(detalle.montodescuento).toFixed(2),

                peso: parseFloat(detalle.peso).toFixed(2),
                pesosubtotal: parseFloat(detalle.peso * detalle.cantidad).toFixed(2),

                volumen: parseFloat(detalle.volumen).toFixed(2),
                volumensubtotal: parseFloat(detalle.volumen * detalle.cantidad).toFixed(2),

                fechavencimiento: detalle.fechavencimiento,
                fvencimiento: Functions.convertYMDToDMY(detalle.fechavencimiento),

                nrolote: "0.00",
                nrofabrica: "0.00",
                nrocajas: "0",
                nota: null,

                isdevolucioncompra: "N",
                isordencompra: "A",
                issolicitudcompra: detalle.fkidsolicitudcompra ? "A" : "N",

                fkidnotacompra: null,
                fkidordencompra: detalle.fkidordencompra,
                fkidordencompradetalle: detalle.idordencompradetalle,
                fkidsolicitudcompradetalle: detalle.fkidsolicitudcompradetalle,
                fkidsolicitudcompra: detalle.fkidsolicitudcompra,

                idnotacompradetalle: null,
                fkidalmacenproductodetalle: null,

                visible_producto: false,
                visible_sucursal: false,
                visible_almacen: false,
                visible_proveedor: false,
                errorcantidad: false,
                errorcostounitario: false,
            };
            array = [ ...array, element ]
        }
        notaCompra.arrayNotaCompraDetalle = array;

        onChange( notaCompra );
        setVisibleOrdenCompra(false);
    };

    function componentOrdenCompra() {
        if ( !visible_ordencompra ) return null;
        return (
            <M_ListadoOrdenCompra
                visible={visible_ordencompra}
                onClose={ () => setVisibleOrdenCompra(false) }
                value={notaCompra.fkidordencompra}
                onChange={onChangeFKIDOrdenCompra}
                iscompra={"N"}
            />
        );
    };

    return (
        <>

            { componentSucursal() }
            { componentAlmacen() }
            { componentConcepto() }
            { componentProveedor() }

            { componentProducto() }
            { componentOrdenCompra() }

            <Row gutter={ [12, 8] }>
                <Col xs={{ span: 24, }} sm={{ span: 3, }}>
                    <C_Input
                        label={ "Nº Nota"}
                        placeholder={ "INGRESAR NRO..." }
                        value={ idnotacompra }
                        onChange={ onChangeID }
                        disabled={ disabled.iddata }
                        onPressEnter={ props.onPressEnter }
                        autoFocus={true}
                        focus={ focusInput }
                    />
                </Col>
                <Col sm={{ span: 6, }}></Col>
                <Col xs={{ span: 24, }} sm={{ span: 3, }}>
                    <C_Input
                        label={"Moneda"}
                        value={ notaCompra.moneda }
                        disabled={ true }
                    />
                </Col>
                <Col xs={{ span: 24, }} sm={{ span: 3, }}>
                    <C_Input
                        label={"T. C."}
                        value={ notaCompra.tipocambio }
                        onChange={ onChangeTipoCambio }
                        disabled={ disabled.data }
                    />
                </Col>
                <Col xs={{ span: 24, }} sm={{ span: 3, }}>
                    <C_Select
                        label={ "T. Moneda"}
                        placeholder={ "TIPO MONEDA" }
                        value={ notaCompra.tipomoneda }
                        onChange={ onChangeTipoMoneda }
                        disabled={ disabled.data }
                        data={ [
                            { title: "Nacional", value: "N" },
                            { title: "Exterior", value: "E" },
                        ] }
                    />
                </Col>
                <Col xs={{ span: 24, }} sm={{ span: 3, }}>
                    <C_Select
                        label={ "T. Comp."}
                        placeholder={ "TIPO COMPRA" }
                        value={ notaCompra.tipocompra }
                        onChange={ onChangeTipoCompra }
                        disabled={ disabled.data }
                        data={ [
                            { title: "Local",   value: "L" },
                            { title: "Exterior", value: "E" },
                        ] }
                    />
                </Col>
                <Col xs={{ span: 24, }} sm={{ span: 3, }}>
                    <C_Date
                        label={"Fecha"}
                        value={ notaCompra.fechanotacompra }
                        onChange={ onChangeFechaNotaCompra }
                        disabled={ disabled.data }
                        allowClear={false}
                    />
                </Col>
            </Row>
            <Row gutter={ [12, 8] }>
                <Col xs={{ span: 24, }} sm={{ span: 6, }}>
                    <C_Input
                        label={"Sucursal"}
                        placeholder={ "SELECCIONAR SUCURSAL..." }
                        value={ notaCompra.sucursal }
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
                        value={ notaCompra.almacen }
                        onClick={onShowAlmacen}
                        disabled={ (disabled.data || ( typeof notaCompra.fkidsucursal !== 'number' ) ) ? true : false }
                        error={error.fkidalmacen}
                        message={message.fkidalmacen}
                        select={true}
                    />
                </Col>
                <Col xs={{ span: 24, }} sm={{ span: 3, }}>
                    <C_Input
                        label={"Impuesto"}
                        value={ notaCompra.impuesto }
                        onChange={ onChangeImpuesto }
                        disabled={ disabled.data }
                    />
                </Col>
                <Col xs={{ span: 24, }} sm={{ span: 3, }}>
                    <C_Input
                        label={ "Nº ref."}
                        placeholder={ "INGRESAR NRO..." }
                        value={ notaCompra.nrorefprov }
                        onChange={ onChangeNroRefProv }
                        disabled={ disabled.data }
                        error={error.nrorefprov}
                        message={message.nrorefprov}
                    />
                </Col>
                <Col xs={{ span: 24, }} sm={{ span: 3, }}>
                    <C_Date
                        label={"Vcmto."}
                        value={ notaCompra.fechavencimiento }
                        onChange={ onChangeFechaVencimiento }
                        disabled={ disabled.data }
                    />
                </Col>
                <Col xs={{ span: 24, }} sm={{ span: 3, }}>
                    <C_Input
                        label={ "D. cred."}
                        placeholder={ "INGRESAR NRO..." }
                        value={ notaCompra.diascredito }
                        readOnly
                        disabled={ disabled.data }
                    />
                </Col>
            </Row>
            <Row gutter={ [12, 8] }>
                <Col xs={{ span: 24, }} sm={{ span: 6, }}>
                    <C_Input
                        label={"Concepto"}
                        placeholder={ "SELECCIONAR CONCEPTO..." }
                        value={ notaCompra.conceptocompra }
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
                        value={ notaCompra.proveedor }
                        onClick={onShowProveedor}
                        disabled={ disabled.data }
                        error={error.fkidproveedor}
                        message={message.fkidproveedor}
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
                <Col sm={{ span: 8, }}></Col>
                <Col xs={{ span: 24, }} sm={{ span: 5, }}>
                    <C_Input
                        label={ "Nº Fac."}
                        placeholder={ "INGRESAR NRO..." }
                        value={ notaCompra.nrofactura }
                        onChange={ onChangeNroFactura }
                        disabled={ disabled.data }
                        error={error.codigo}
                        message={message.codigo}
                    />
                </Col>
                <Col xs={{ span: 24, }} sm={{ span: 5, }}>
                    <C_Input
                        label={"Nº orden comp."}
                        placeholder={ "SELECCIONAR ORDEN COMPRA..." }
                        value={ notaCompra.fkidordencompra }
                        onClick={onShowOrdenCompra}
                        disabled={ disabled.data }
                        error={error.fkidordencompra}
                        message={message.fkidordencompra}
                        select={true}
                    />
                </Col>
            </Row>
            <div className="main-card card mb-1 mt-3 pl-1 pr-1 pb-1">
                <Table
                    pagination={false} bordered size={"small"}
                    style={{ width: "100%", minWidth: "100%", maxWidth: "100%", }}
                    columns={ columns( notaCompra, disabled, onChange, onVisibleProducto  ) }
                    dataSource={notaCompra.arrayNotaCompraDetalle}
                    scroll={{ x: 2600, y: notaCompra.arrayNotaCompraDetalle.length == 0 ? 40 : 150 }}
                />
            </div>
            <Row gutter={ [12, 8] }>
                <Col xs={{ span: 24, }} sm={{ span: 10, }}>
                    <Row gutter={ [12, 8] }>
                        <Col xs={{ span: 24, }} sm={{ span: 12, }}>
                            <C_Input
                                label={ "N.I.T."}
                                placeholder={ "INGRESAR ENCARGADO..." }
                                value={notaCompra.nitproveedor}
                                disabled={disabled.data}
                                readOnly
                            />
                        </Col>
                        <Col xs={{ span: 24, }} sm={{ span: 12, }}>
                            <C_Input
                                label={ "Fecha fac."}
                                placeholder={ "INGRESAR ENCARGADO..." }
                                value={notaCompra.fechafactura}
                                disabled={disabled.data}
                                readOnly
                            />
                        </Col>
                    </Row>
                    <Row gutter={ [12, 8] }>
                        <Col xs={{ span: 24, }} sm={{ span: 24, }}>
                            <C_Input
                                label={ "Razon social"}
                                placeholder={ "INGRESAR ENCARGADO..." }
                                value={notaCompra.nombrerazonsocial}
                                disabled={disabled.data}
                                readOnly
                            />
                        </Col>
                    </Row>
                    <Row gutter={ [12, 8] }>
                        <Col xs={{ span: 24, }} sm={{ span: 12, }}>
                            <C_Input
                                label={ "Nº Autorizacion"}
                                placeholder={ "INGRESAR ENCARGADO..." }
                                value={notaCompra.nroautorizacion}
                                disabled={disabled.data}
                                readOnly
                            />
                        </Col>
                        <Col xs={{ span: 24, }} sm={{ span: 12, }}>
                            <C_Input
                                label={ "Cod. control"}
                                placeholder={ "INGRESAR ENCARGADO..." }
                                value={notaCompra.codigocontrol}
                                disabled={disabled.data}
                                readOnly
                            />
                        </Col>
                    </Row>
                    <Row gutter={ [12, 8] }>
                        <Col xs={{ span: 24, }} sm={{ span: 24, }}>
                            <C_Input
                                label={ "Nota"}
                                placeholder={ "INGRESAR NOTA..." }
                                value={ notaCompra.nota }
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
                            value={ notaCompra.cantidadtotal }
                            disabled={ disabled.data }
                            readOnly
                        />
                    </Col>
                    <Col xs={{ span: 24, }} sm={{ span: 24, }}>
                        <C_Input
                            label={ "Caja Total"}
                            value={ notaCompra.nrocajastotal }
                            disabled={ disabled.data }
                            readOnly
                        />
                    </Col>
                    <Col xs={{ span: 24, }} sm={{ span: 24, }}>
                        <C_Input
                            label={ "Peso Total"}
                            value={ notaCompra.pesototal }
                            disabled={ disabled.data }
                            readOnly
                        />
                    </Col>
                    <Col xs={{ span: 24, }} sm={{ span: 24, }}>
                        <C_Input
                            label={ "Vol. Total"}
                            value={ notaCompra.volumentotal }
                            disabled={ disabled.data }
                            readOnly
                        />
                    </Col>
                </Col>
                <Col xs={{ span: 24, }} sm={{ span: 4, }}>
                    <Col xs={{ span: 24, }} sm={{ span: 24, }}>
                        <C_Input
                            label={"Fletes"}
                            value={ notaCompra.fletes }
                            onChange={ onChangeFletes }
                            disabled={ disabled.data }
                        />
                    </Col>
                    <Col xs={{ span: 24, }} sm={{ span: 24, }}>
                        <C_Input
                            label={"Internación"}
                            value={ notaCompra.internacion }
                            onChange={ onChangeInternacion }
                            disabled={ disabled.data }
                        />
                    </Col>
                    <Col xs={{ span: 24, }} sm={{ span: 24, }}>
                        <C_Input
                            label={"Otros gastos"}
                            value={ notaCompra.otrosgastos }
                            onChange={ onChangeOtrosGastos }
                            disabled={ disabled.data }
                        />
                    </Col>
                </Col>
                <Col xs={{ span: 24, }} sm={{ span: 6, }}>
                    <Col xs={{ span: 24, }} sm={{ span: 24, }}>
                        <C_Input
                            label={ "Total"}
                            value={ notaCompra.montosubtotal }
                            disabled={ disabled.data }
                            readOnly
                        />
                    </Col>
                    <div className="form-row">
                        <Col xs={{ span: 24, }} sm={{ span: 8, }}>
                            <C_Input
                                label={ "Desc."}
                                value={ notaCompra.descuento }
                                disabled={ disabled.data }
                                onChange={onChangeDescuento}
                            />
                        </Col>
                        <Col xs={{ span: 24, }} sm={{ span: 16, }}>
                            <C_Input
                                label={ "Mto. desc."}
                                value={ notaCompra.montodescuento }
                                disabled={ disabled.data }
                                onChange={onChangeMontoDescuento}
                            />
                        </Col>
                    </div>
                    <Col xs={{ span: 24, }} sm={{ span: 24, }}>
                        <C_Input
                            label={ "Sub total"}
                            value={ parseFloat(notaCompra.montosubtotal * 1 - notaCompra.montodescuento * 1).toFixed(2) }
                            disabled={ disabled.data }
                            readOnly
                        />
                    </Col>
                    <Col xs={{ span: 24, }} sm={{ span: 24, }}>
                        <C_Input
                            label={ "Imp. total"}
                            value={ notaCompra.impuestototal }
                            disabled={ disabled.data }
                            readOnly
                        />
                    </Col>
                    <Col xs={{ span: 24, }} sm={{ span: 24, }}>
                        <C_Input
                            label={ "Mto. Total"}
                            value={ notaCompra.montototal }
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
    notaCompra: PropTypes.object,
    disabled:  PropTypes.object,

    onChange:     PropTypes.func.isRequired,
    onPressEnter: PropTypes.func,
};

C_Form.defaultProps = {
    onChange: ( evt ) => {},
};

export default C_Form;
