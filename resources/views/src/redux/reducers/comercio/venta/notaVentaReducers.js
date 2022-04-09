
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

    switch ( action.type ) {

        case Strings.notaventa_onChange:
            state = Object.assign( {}, action.payload );
            return state;

        case Strings.notaventa_onCreate:
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

function onSetData( state, payload ) {
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
    state.tipocambio = payload.tipocambio;

    state.facturar = payload.facturar;
    state.nrofactura = payload.nrofactura;
    state.razonsocial = payload.razonsocial;
    state.nit = payload.nit;
    state.glosa = payload.glosa;

    state.impuestoiva = payload.impuestoiva;
    state.montototalcobrado = payload.montototalcobrado;
    state.montototaldeudamora = payload.montototaldeudamora;
    state.montototaldeudaactual = payload.montototaldeudaactual;
    state.descuentoacumulado = payload.descuentoacumulado;
    state.porcentajerangodescuentoinicial = payload.porcentajerangodescuentoinicial;
    state.porcentajerangodescuentofinal = payload.porcentajerangodescuentofinal;

    state.montosubtotal = payload.montosubtotal;
    state.descuento = payload.descuento;
    state.montodescuento = payload.montodescuento;
    state.montototal = payload.montototal;
    state.cantidadtotal = payload.cantidadtotal;
    state.montoanticipo = payload.montoanticipo;
    state.isdevolucionventa = payload.isdevolucionventa;

    state.estado = payload.estado;
}
