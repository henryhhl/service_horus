
import { Functions } from '../../../../utils/functions';
import { Strings } from '../../../constants';

const { cleanObejct } = Functions;

const initialState = {

    focusInput: false,
    update: false,
    imprimir: false,
    loading:  false,

    iddevolucionnotaventa: "",
    codigo: "",
    tiponotaventa: "",
    fechadevolucionnotaventa: "",
    fechanotaventa: "",

    fkidnotaventa: "",
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

    tipocambio: "",
    nrofactura: "",
    razonsocial: "",
    nit: "",
    glosa: "",
    esnotadevolucion: "",

    montosubtotal: "",
    descuento: "",
    montodescuento: "",
    montototal: "",
    cantidadtotal: "",

    devolucionnotaventadetalle: [],
    devolucionnotaventadetalledelete: [],

    estado: "",
    fecha: "",
    hora: "",

    error: {
        codigo:  false,
        fechadevolucionnotaventa: false,
        fechanotaventa: false,

        fkidnotaventa: false,
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

        tipocambio: false,
        montosubtotal: false,
        descuento: false,
        montodescuento: false,
        montototal: false,
        cantidadtotal: false,
    },
    message: {
        codigo:  "",
        fechadevolucionnotaventa: "",
        fechanotaventa: "",

        fkidnotaventa: "",
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

        tipocambio: "",
        montosubtotal: "",
        descuento: "",
        montodescuento: "",
        montototal: "",
        cantidadtotal: "",
    },

    reporte: {
        arrayDevolucionNotaVenta: [],
        fecha: "",
        hora:  "",
    },
};

export const DevolucionNotaVentaReducer = ( state = initialState, action = { payload, type} ) => {

    const { payload, type } = action;
 
    switch ( action.type ) {

        case Strings.devolucionnotaventa_onChange:
            state = Object.assign( {}, action.payload );
            return state;

        case Strings.devolucionnotaventa_onCreate:
            cleanObejct( state );
            state.iddevolucionnotaventa = action.payload.iddevolucionnotaventa;
            state.loading = false;

            state.tipocambio = "6.95";
            state.esnotadevolucion = "N",

            state.fkidmoneda = 1;
            state.moneda = "Bolivianos";

            state.fechadevolucionnotaventa = Functions.dateToString( new Date() );
            state.nrofactura = 0;

            state.montosubtotal = 0;
            state.descuento = 0;
            state.montodescuento = 0;
            state.montototal = 0;
            state.cantidadtotal = 0;

            state.fkidtipotransaccion = 2;
            state.tipotransaccion = "Venta";

            // state.devolucionnotaventadetalle = loadDevolucionNotaVentaDetalle(state);

            state.estado = 'A';
            state = Object.assign( {}, state );
            return state;

        case Strings.devolucionnotaventa_onEditar:
            onSetData( state, action.payload.notaventa );
            state.loading = false;
            state = Object.assign( {}, state );
            return state;

        case Strings.devolucionnotaventa_onShow:
            onSetData( state, action.payload.notaventa );
            state.loading = false;
            state = Object.assign( {}, state );
            return state;

        case Strings.devolucionnotaventa_setLoad:
            cleanObejct( state );
            state.loading = true;
            state = Object.assign( {}, state );
            return state;

        case Strings.devolucionnotaventa_setLimpiar:
            cleanObejct( state );
            state = Object.assign( {}, state );
            return state;

        case Strings.devolucionnotaventa_setState:
            cleanObejct( state );
            onSetData( state, action.payload );
            state = Object.assign( {}, state );
            return state;

        case Strings.devolucionnotaventa_setImprimir:
            return {
                ...state,
                reporte: action.payload,
            };

        case Strings.devolucionnotaventa_onFocus:
            state.focusInput = true;
            state = Object.assign( {}, state );
            return state;

        case Strings.devolucionnotaventa_offFocus:
            state.focusInput = false;
            state = Object.assign( {}, state );
            return state;

        default:
            return state;
    }
};

function onSetData( state = initialState, payload ) {
    state.iddevolucionnotaventa   = payload.iddevolucionnotaventa;

    state.codigo = payload.codigo;
    state.tiponotaventa = payload.tiponotaventa;
    state.fechadevolucionnotaventa = Functions.convertYMDToDMY( payload.fechadevolucionnotaventa );
    state.fechanotaventa = Functions.convertYMDToDMY( payload.fechanotaventa );

    state.fkidnotaventa = payload.fkidnotaventa;
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

    state.tipocambio = parseFloat(payload.tipocambio).toFixed(2);
    state.nrofactura = payload.nrofactura;
    state.razonsocial = payload.razonsocial;
    state.nit = payload.nit;
    state.glosa = payload.glosa;

    state.montosubtotal = parseFloat(payload.montosubtotal).toFixed(2);
    state.descuento = payload.descuento;
    state.montodescuento = parseFloat(payload.montodescuento).toFixed(2);
    state.montototal = parseFloat(payload.montototal).toFixed(2);
    state.cantidadtotal = payload.cantidadtotal;

    state.estado = payload.estado;
    state.esnotadevolucion = payload.esnotadevolucion;

    let arrayNotaVentaDetalle = [];
    for (let pos = 0; pos < payload.arraydevolucionnotaventadetalle.length; pos++) {
        const element = payload.arraydevolucionnotaventadetalle[pos];
        let detalle = defaulDevolucionNotaVentaDetalle( pos, null, element );
        arrayNotaVentaDetalle = [ ...arrayNotaVentaDetalle, detalle ];
    }
    
    state.devolucionnotaventadetalle = arrayNotaVentaDetalle;
}

function loadDevolucionNotaVentaDetalle(state) {
    let array = [];
    for ( let index = 0; index < 10; index++ ) {
        const element = defaulDevolucionNotaVentaDetalle( index, state );
        array = [ ...array, element];
    };
    return array;
};

function defaulDevolucionNotaVentaDetalle( index = 0, state = initialState, detalle = null ) {
    return {
        key: index,

        codigo: detalle ? detalle.codigo : "",
        fkidproducto: detalle ? detalle.fkidproducto : null,
        fkidalmacenproductodetalle: detalle ? detalle.fkidalmacenproductodetalle : null,
        producto: detalle ? detalle.producto : "",

        cantidadvendida: detalle ? detalle.cantidadvendida : "",
        cantidad: detalle ? detalle.cantidad : "",
        unidadmedida: detalle ? `${parseFloat(detalle.valorequivalente).toFixed(2)} ${detalle.abreviatura}` : "",

        fkidlistaprecio: detalle ? detalle.fkidlistaprecio : state.fkidlistaprecio,
        fkidlistapreciodetalle: detalle ? detalle.fkidlistapreciodetalle : null,
        listaprecio: detalle ? detalle.listaprecio : state.listaprecio,

        preciounitario: detalle ? parseFloat(detalle.preciounitario).toFixed(2) : "",
        preciosubtotal: detalle ? parseFloat(detalle.preciosubtotal).toFixed(2) : "",

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

        fkidalmacenunidadmedidaproducto: null,
        fkidunidadmedidaproducto: null,
        iddevolucionnotaventadetalle: detalle ? detalle.iddevolucionnotaventadetalle : null,
        fkiddevolucionnotaventa: detalle ? detalle.fkiddevolucionnotaventa : null,
        visible_producto: false,
        visible_almacen: false,
        visible_listaprecio: false,
        errorcantidad: false,
        errorpreciounitario: false,
    };
};
