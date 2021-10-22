
import { Functions } from '../../../../utils/functions';
import { Strings } from '../../../constants';

const { cleanObejct } = Functions;

const initialState = {

    focusInput: false,
    update: false,
    imprimir: false,
    loading:  false,

    idsolicitudcompra: "",
    codigo: "",
    tipocambio: "",
    fechasolicitada: "",
    fechafinalizada: "",
    nota: "",
    tiposolicitud: "",
    isordencompra: "",

    cantidadpendientetotal: "",
    cantidadsolicitadatotal: "",
    montototal: "",

    fkidsucursal: "",
    sucursal: "",

    fkidalmacen: "",
    almacen: "",

    fkidconceptocompra: "",
    conceptocompra: "",

    fkidseccioninventario: "",
    seccioninventario: "",

    fkidproveedor: "",
    proveedor: "",

    fkidmoneda: "",
    moneda: "",

    arraySolicitudCompraDetalle: [],
    arrayDeleteSolicitudCompraDetalle: [],

    estado: "",
    fecha: "",
    hora: "",

    error: {
        tipocambio:  false,
        fechasolicitada: false,
        fkidsucursal: false,
        fkidalmacen: false,
        fkidconceptocompra: false,
        fkidseccioninventario: false,
        fkidproveedor: false,
        fkidmoneda: false,
    },
    message: {
        tipocambio:  "",
        fechasolicitada: "",
        fkidsucursal: "",
        fkidalmacen: "",
        fkidconceptocompra: "",
        fkidseccioninventario: "",
        fkidproveedor: "",
        fkidmoneda: "",
    },

    reporte: {
        arraySolicitudCompra: [],
        fecha: "",
        hora:  "",
    },
};

export const SolicitudCompraCompraReducer = ( state = initialState, action = { payload, type} ) => {

    switch ( action.type ) {

        case Strings.solicitudcompra_onChange:
            state = Object.assign( {}, action.payload );
            return state;

        case Strings.solicitudcompra_onCreate:
            cleanObejct( state );
            state.idsolicitudcompra = action.payload.idsolicitudcompra;

            state.fechasolicitada   = Functions.dateToString( new Date() );
            state.tipocambio  = "6.95";
            state.tiposolicitud  = "L";

            state.cantidadpendientetotal = "0";
            state.cantidadsolicitadatotal = "0";
            state.montototal = "0.00";

            state.arraySolicitudCompraDetalle = loadDetailBuySolicitude();

            state.fkidmoneda  = action.payload.arrayMoneda.length == 0 ? "" : action.payload.arrayMoneda[0].idmoneda;
            state.moneda      = action.payload.arrayMoneda.length == 0 ? "" : action.payload.arrayMoneda[0].descripcion;

            state.loading = false;
            state = Object.assign( {}, state );
            return state;

        case Strings.solicitudcompra_onEditar:
            onSetData( state, action.payload.solicitudcompra );
            state.loading = false;
            state = Object.assign( {}, state );
            return state;

        case Strings.solicitudcompra_onShow:
            onSetData( state, action.payload.solicitudcompra );
            state.loading = false;
            state = Object.assign( {}, state );
            return state;

        case Strings.solicitudcompra_setLoad:
            cleanObejct( state );
            state.loading = true;
            state = Object.assign( {}, state );
            return state;

        case Strings.solicitudcompra_setLimpiar:
            cleanObejct( state );
            state = Object.assign( {}, state );
            return state;

        case Strings.solicitudcompra_setState:
            cleanObejct( state );
            onSetData( state, action.payload );
            state = Object.assign( {}, state );
            return state;

        case Strings.solicitudcompra_setImprimir: 
            return {
                ...state,
                reporte: action.payload,
            };

        case Strings.solicitudcompra_onFocus:
            state.focusInput = true;
            state = Object.assign( {}, state );
            return state;

        case Strings.solicitudcompra_offFocus:
            state.focusInput = false;
            state = Object.assign( {}, state );
            return state;
    
        default:
            return state;
    }
};

function onSetData( state, payload ) {
    state.idsolicitudcompra   = payload.idsolicitudcompra;
    
    state.codigo = payload.codigo;
    state.tipocambio = parseFloat(payload.tipocambio).toFixed(2);
    state.fechasolicitada = Functions.convertYMDToDMY(payload.fechasolicitada);
    state.fechafinalizada = Functions.convertYMDToDMY(payload.fechafinalizada);
    state.nota = payload.nota;
    state.tiposolicitud = payload.tiposolicitud;
    state.isordencompra = payload.isordencompra;

    state.cantidadpendientetotal = parseInt(payload.cantidadpendientetotal);
    state.cantidadsolicitadatotal = parseInt(payload.cantidadsolicitadatotal);
    state.montototal = parseFloat(payload.montototal).toFixed(2);

    state.fkidsucursal = payload.fkidsucursal;
    state.sucursal = payload.sucursal;

    state.fkidalmacen = payload.fkidalmacen;
    state.almacen = payload.almacen;

    state.fkidconceptocompra = payload.fkidconceptocompra;
    state.conceptocompra = payload.conceptocompra;

    state.fkidseccioninventario = payload.fkidseccioninventario;
    state.seccioninventario = payload.seccioninventario;

    state.fkidproveedor = payload.fkidproveedor;
    state.proveedor = payload.proveedor;

    state.fkidmoneda = payload.fkidmoneda;
    state.moneda = payload.moneda;

    state.estado = payload.estado;

    state.arraySolicitudCompraDetalle = setStateDetailsBuySolicitude(payload.solicitudcompradetalle);
};

function loadDetailBuySolicitude() {
    let array = [];
    for ( let index = 0; index < 10; index++ ) {
        const element = {
            key: index,

            codigo: "",
            producto: "",
            ciudadorigen: "",

            fkidunidadmedidaproducto: null,
            unidadmedidaproducto: "",

            stockactual: "",
            cantidadsolicitada: "",
            costounitario: "",
            costosubtotal: "",
            productomarca: "",

            fechasolicitada: null,
            fsolicitada: null,
            
            nota: null,

            visible_producto: false,
            fkidproducto: null,
            idsolicitudcompradetalle: null,
            error: false,
        };
        array = [ ...array, element];
    }
    return array;
};

function setStateDetailsBuySolicitude( solicitudcompradetalle ) {
    let array = [];
    for (let index = 0; index < solicitudcompradetalle.length; index++) {
        let detalle = solicitudcompradetalle[index];

        const element = {
            key: index,

            codigo: detalle.codigo,
            producto: detalle.nombre,
            ciudadorigen: detalle.ciudadorigen,

            fkidunidadmedidaproducto: detalle.fkidunidadmedidaproducto,
            unidadmedidaproducto: parseFloat(detalle.valorequivalente).toFixed(2) + " " + detalle.unidadmedida,

            stockactual: parseInt(detalle.stockactual),
            cantidadsolicitada: parseInt(detalle.cantidadsolicitada),
            costounitario: parseFloat(detalle.costounitario).toFixed(2),
            costosubtotal: parseFloat(detalle.costosubtotal).toFixed(2),
            productomarca: detalle.productomarca,

            fechasolicitada: detalle.fechasolicitada,
            fsolicitada: Functions.convertYMDToDMY(detalle.fechasolicitada),
            
            nota: detalle.nota,

            visible_producto: false,
            fkidproducto: null,
            idsolicitudcompradetalle: null,
            error: false,
        };
        array = [ ...array, element];
    };
    return array;
};
