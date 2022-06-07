
import { Functions } from '../../../../utils/functions';
import { Strings } from '../../../constants';

const { cleanObejct } = Functions;

const initialState = {

    focusInput: false,
    update: false,
    imprimir: false,
    loading:  false,

    idnotaventa: "",
    codigo: "",
    tipoventa: "",
    estadoproceso: "",
    fechaventa: "",
    diascredito: "",
    fechavencimiento: "",

    fkidsucursal: "",
    sucursal: "",

    fkidvendedor: "",
    vendedor: "",

    fkidcliente: "",
    cliente: "",

    fkidalmacen: "",
    almacen: "",

    fkidlistaprecio: "",
    listaprecio: "",

    fkidconceptoventa: "",
    conceptoventa: "",

    fkidmoneda: "",
    moneda: "",

    fkidusers: "",
    users: "",

    fkidtipotransaccion: "",
    tipotransaccion: "",

    fkidtipopago: "",
    tipopago: "",

    nrodebito: "",
    nroventa: "",
    nrocotizacion: "",
    tipocambio: "",

    facturar: "",
    nrofactura: "",
    razonsocial: "",
    nit: "",
    glosa: "",
    esnotaentrega: "",

    impuestoiva: "",
    montototalcobrado: "",
    montototaldeudamora: "",
    montototaldeudaactual: "",
    descuentoacumulado: "",
    porcentajerangodescuentoinicial: "",
    porcentajerangodescuentofinal: "",

    montosubtotal: "",
    descuento: "",
    montodescuento: "",
    montototal: "",
    cantidadtotal: "",
    montoanticipo: "",
    isdevolucionventa: "",

    notaventadetalle: [],
    notaventadetalledelete: [],

    estado: "",
    fecha: "",
    hora: "",

    error: {
        codigo:  false,
        estadoproceso: false,
        fechaventa: false,

        fkidsucursal: false,
        fkidalmacen: false,
        fkidvendedor: false,
        fkidcliente: false,
        fkidlistaprecio: false,
        fkidconceptoventa: false,
        fkidmoneda: false,
        fkidusers: false,
        fkidtipotransaccion: false,
        fkidtipopago: false,

        nrodebito: false,
        nroventa: false,
        nrocotizacion: false,
        tipocambio: false,

        impuestoiva: false,
        montototalcobrado: false,
        montototaldeudamora: false,
        montototaldeudaactual: false,
        descuentoacumulado: false,
        porcentajerangodescuentoinicial: false,
        porcentajerangodescuentofinal: false,

        montosubtotal: false,
        descuento: false,
        montodescuento: false,
        montototal: false,
        cantidadtotal: false,
        montoanticipo: false,
        isdevolucionventa: false,
    },
    message: {
        codigo:  "",
        estadoproceso: "",
        fechaventa: "",

        fkidsucursal: "",
        fkidalmacen: "",
        fkidvendedor: "",
        fkidcliente: "",
        fkidlistaprecio: "",
        fkidconceptoventa: "",
        fkidmoneda: "",
        fkidusers: "",
        fkidtipotransaccion: "",
        fkidtipopago: "",

        nrodebito: "",
        nroventa: "",
        nrocotizacion: "",
        tipocambio: "",

        impuestoiva: "",
        montototalcobrado: "",
        montototaldeudamora: "",
        montototaldeudaactual: "",
        descuentoacumulado: "",
        porcentajerangodescuentoinicial: "",
        porcentajerangodescuentofinal: "",

        montosubtotal: "",
        descuento: "",
        montodescuento: "",
        montototal: "",
        cantidadtotal: "",
        montoanticipo: "",
        isdevolucionventa: "",
    },

    reporte: {
        arrayNotaVenta: [],
        fecha: "",
        hora:  "",
    },
};

export const NotaVentaReducer = ( state = initialState, action = { payload, type} ) => {

    const { payload, type } = action;
 
    switch ( action.type ) {

        case Strings.notaventa_onChange:
            state = Object.assign( {}, action.payload );
            return state;

        case Strings.notaventa_onCreate:
            const { arrayConceptoVenta, arrayListaPrecio, arrayTipoPago, arraySucursal } = payload;
            cleanObejct( state );
            state.idnotaventa = action.payload.idnotaventa;
            state.loading = false;

            state.nrodebito = 0;
            state.nroventa = 0;
            state.nrocotizacion = 0;
            state.tipocambio = "6.95";

            state.fkidmoneda = 1;
            state.moneda = "Bolivianos";

            state.fechaventa = Functions.dateToString( new Date() );
            state.facturar = 'N';
            state.nrofactura = 0;
            state.esnotaentrega = 'N';

            state.impuestoiva = 0;
            state.montototalcobrado = 0;
            state.montototaldeudamora = 0;
            state.montototaldeudaactual = 0;
            state.descuentoacumulado = 0;
            state.porcentajerangodescuentoinicial = 0;
            state.porcentajerangodescuentofinal = 0;

            state.montosubtotal = 0;
            state.descuento = 0;
            state.montodescuento = 0;
            state.montototal = 0;
            state.cantidadtotal = 0;
            state.montoanticipo = 0;
            state.isdevolucionventa = 'N';

            state.fkidconceptoventa = arrayConceptoVenta.length > 0 ? arrayConceptoVenta[0].idconceptoventa : null;
            state.conceptoventa = arrayConceptoVenta.length > 0 ? arrayConceptoVenta[0].descripcion : "";

            state.fkidlistaprecio = arrayListaPrecio.length > 0 ? arrayListaPrecio[0].idlistaprecio : null;
            state.listaprecio = arrayListaPrecio.length > 0 ? arrayListaPrecio[0].descripcion : "";

            state.fkidsucursal = arraySucursal.length > 0 ? arraySucursal[0].idsucursal : null;
            state.sucursal = arraySucursal.length > 0 ? arraySucursal[0].descripcion : "";

            let arrayAlmacen = arraySucursal.length > 0 ? arraySucursal[0].arrayalmacen : [];

            state.fkidalmacen = arrayAlmacen.length > 0 ? arrayAlmacen[0].idalmacen : null;
            state.almacen = arrayAlmacen.length > 0 ? arrayAlmacen[0].descripcion : "";

            state.fkidtipopago = arrayTipoPago.length > 0 ? arrayTipoPago[0].idtipopago : null;
            state.tipopago = arrayTipoPago.length > 0 ? arrayTipoPago[0].descripcion : "";

            state.fkidtipotransaccion = 1;
            state.tipotransaccion = "Venta";

            state.notaventadetalle = loadNotaVentaDetalle(state);

            state.estado = 'A';
            state = Object.assign( {}, state );
            return state;

        case Strings.notaventa_onEditar:
            onSetData( state, action.payload.notaventa );
            state.loading = false;
            state = Object.assign( {}, state );
            return state;

        case Strings.notaventa_onShow:
            onSetData( state, action.payload.notaventa );
            state.loading = false;
            state = Object.assign( {}, state );
            return state;

        case Strings.notaventa_setLoad:
            cleanObejct( state );
            state.loading = true;
            state = Object.assign( {}, state );
            return state;

        case Strings.notaventa_setLimpiar:
            cleanObejct( state );
            state = Object.assign( {}, state );
            return state;

        case Strings.notaventa_setState:
            cleanObejct( state );
            onSetData( state, action.payload );
            state = Object.assign( {}, state );
            return state;

        case Strings.notaventa_setImprimir:
            return {
                ...state,
                reporte: action.payload,
            };

        case Strings.notaventa_onFocus:
            state.focusInput = true;
            state = Object.assign( {}, state );
            return state;

        case Strings.notaventa_offFocus:
            state.focusInput = false;
            state = Object.assign( {}, state );
            return state;

        default:
            return state;
    }
};

function onSetData( state = initialState, payload ) {
    state.idnotaventa   = payload.idnotaventa;

    state.codigo = payload.codigo;
    state.tipoventa = payload.tipoventa;
    state.estadoproceso = payload.estadoproceso;
    state.fechaventa = Functions.convertYMDToDMY( payload.fechaventa );
    state.diascredito = payload.diascredito;
    state.fechavencimiento = Functions.convertYMDToDMY( payload.fechavencimiento );

    state.fkidsucursal = payload.fkidsucursal;
    state.sucursal = payload.sucursal;

    state.fkidalmacen = payload.fkidalmacen;
    state.almacen = payload.almacen;

    state.fkidvendedor = payload.fkidvendedor;
    state.vendedor = payload.vendedor;

    state.fkidcliente = payload.fkidcliente;
    state.cliente = payload.cliente;

    state.fkidlistaprecio = payload.fkidlistaprecio;
    state.listaprecio = payload.listaprecio;

    state.fkidconceptoventa = payload.fkidconceptoventa;
    state.conceptoventa = payload.conceptoventa;

    state.fkidmoneda = payload.fkidmoneda;
    state.moneda = payload.moneda;

    state.fkidusers = payload.fkidusers;
    state.users = payload.users;

    state.fkidtipotransaccion = payload.fkidtipotransaccion;
    state.tipotransaccion = payload.tipotransaccion;

    state.fkidtipopago = payload.fkidtipopago;
    state.tipopago = payload.tipopago;

    state.nrodebito = payload.nrodebito;
    state.nroventa = payload.nroventa;
    state.nrocotizacion = payload.nrocotizacion;
    state.tipocambio = parseFloat(payload.tipocambio).toFixed(2);

    state.facturar = payload.facturar;
    state.nrofactura = payload.nrofactura;
    state.razonsocial = payload.razonsocial;
    state.nit = payload.nit;
    state.glosa = payload.glosa;
    state.esnotaentrega = payload.esnotaentrega;

    state.impuestoiva = payload.impuestoiva;
    state.montototalcobrado = payload.montototalcobrado;
    state.montototaldeudamora = parseFloat(payload.montototaldeudamora).toFixed(2);
    state.montototaldeudaactual = parseFloat(payload.montototaldeudaactual).toFixed(2);
    state.descuentoacumulado = payload.descuentoacumulado;
    state.porcentajerangodescuentoinicial = payload.porcentajerangodescuentoinicial;
    state.porcentajerangodescuentofinal = payload.porcentajerangodescuentofinal;

    state.montosubtotal = parseFloat(payload.montosubtotal).toFixed(2);
    state.descuento = payload.descuento;
    state.montodescuento = parseFloat(payload.montodescuento).toFixed(2);
    state.montototal = parseFloat(payload.montototal).toFixed(2);
    state.cantidadtotal = payload.cantidadtotal;
    state.montoanticipo = payload.montoanticipo;
    state.isdevolucionventa = payload.isdevolucionventa;

    state.estado = payload.estado;

    let arrayNotaVentaDetalle = [];
    for (let pos = 0; pos < payload.arraynotaventadetalle.length; pos++) {
        const element = payload.arraynotaventadetalle[pos];
        let detalle = defaulNotaVentaDetalle( pos, null, element );
        arrayNotaVentaDetalle = [ ...arrayNotaVentaDetalle, detalle ];
    }
    
    state.notaventadetalle = arrayNotaVentaDetalle;
}

function loadNotaVentaDetalle(state) {
    let array = [];
    for ( let index = 0; index < 10; index++ ) {
        const element = defaulNotaVentaDetalle( index, state );
        array = [ ...array, element];
    };
    return array;
};

function defaulNotaVentaDetalle( index = 0, state = initialState, detalle = null ) {
    return {
        key: index,

        codigo: detalle ? detalle.codigo : "",
        fkidproducto: detalle ? detalle.fkidproducto : null,
        fkidalmacenproductodetalle: detalle ? detalle.fkidalmacenproductodetalle : null,
        producto: detalle ? detalle.producto : "",

        cantidadsolicitada: detalle ? detalle.cantidadsolicitada : "",
        cantidad: detalle ? detalle.cantidad : "",
        unidadmedida: detalle ? `${parseFloat(detalle.valorequivalente).toFixed(2)} ${detalle.abreviatura}` : "",

        fkidlistaprecio: detalle ? detalle.fkidlistaprecio : state.fkidlistaprecio,
        fkidlistapreciodetalle: detalle ? detalle.fkidlistapreciodetalle : null,
        listaprecio: detalle ? detalle.listaprecio : state.listaprecio,

        preciobase: detalle ? parseFloat(detalle.preciobase).toFixed(2) : "",
        preciounitario: detalle ? parseFloat(detalle.preciounitario).toFixed(2) : "",
        preciosubtotal: detalle ? parseFloat(detalle.preciosubtotal).toFixed(2) : "",

        descuento: detalle ? detalle.descuento : "",
        montodescuento: detalle ? parseFloat(detalle.montodescuento).toFixed(2) : "",

        fkidalmacen: detalle ? detalle.fkidalmacen : state.fkidalmacen,
        fkidsucursal: detalle ? detalle.fkidsucursal : state.fkidsucursal,
        almacen: detalle ? detalle.almacen : state.almacen,

        nrolote: detalle ? parseFloat(detalle.nrolote).toFixed(2) : "",
        nrofabrica: detalle ? parseFloat(detalle.nrofabrica).toFixed(2) : "",
        fvencimiento: detalle ? Functions.convertYMDToDMY(detalle.fechavencimiento) : null,
        fechavencimiento: detalle ? detalle.fechavencimiento : null,

        fkidproductotipo: detalle ? detalle.fkidproductotipo : null,
        productotipo: detalle ? detalle.productotipo : "",

        fkidproductomarca: detalle ? detalle.fkidproductomarca : null,
        productomarca: detalle ? detalle.productomarca : "",

        fkidciudad: detalle ? detalle.fkidciudadorigen : null,
        productociudad: detalle ? detalle.ciudadorigen : "",

        fkidvendedor: detalle ? detalle.fkidvendedor : null,
        vendedor: detalle ? detalle.vendedor : "",
        nota: detalle ? detalle.nota : "",

        isdevolucionventa: detalle ? detalle.isdevolucionventa : "N",
        estadoproceso: detalle ? detalle.estadoproceso : "F",
        tipoentrega: detalle ? detalle.tipoentrega : "L",

        fkidalmacenunidadmedidaproducto: null,
        fkidunidadmedidaproducto: null,
        idnotaventadetalle: detalle ? detalle.idnotaventadetalle : null,
        fkidnotaventa: detalle ? detalle.fkidnotaventa : null,
        visible_producto: false,
        visible_almacen: false,
        visible_listaprecio: false,
        errorcantidad: false,
        errorpreciounitario: false,
    };
};
