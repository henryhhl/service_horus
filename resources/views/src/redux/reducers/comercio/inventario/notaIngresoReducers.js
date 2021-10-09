
import { Functions } from '../../../../utils/functions';
import { Strings } from '../../../constants';

const { cleanObejct, dateToString } = Functions;

const initialState = {

    focusInput: false,
    update: false,
    imprimir: false,
    loading:  false,

    idnotaingreso: "",
    codigo: "",
    nromanual: "",
    tipocambio: "",
    fechanotaingreso: "",

    cantidadtotal: "",
    montototal: "",
    pesototal: "",
    volumentotal: "",
    nrocajastotal: "",
    
    nota: "",
    esingresado: "",

    fkidsucursal: "",
    sucursal: "",

    fkidalmacen: "",
    almacen: "",

    fkidconceptoinventario: "",
    conceptoinventario: "",

    fkidmoneda: "",
    moneda: "",

    arrayNotaIngresoDetalle: [],
    arrayDeleteNotaIngresoDetalle: [],

    estado: "",
    fecha: "",
    hora: "",

    error: {
        codigo: false,
        fkidsucursal: false,
        fkidalmacen:  false,
        fkidconceptoinventario:  false,
        fkidmoneda:  false,
        fechanotaingreso:  false,
    },
    message: {
        codigo:  "",
        fkidsucursal:  "",
        fkidalmacen:  "",
        fkidconceptoinventario:  "",
        fkidmoneda:  "",
        fechanotaingreso:  "",
    },

    reporte: {
        arrayNotaIngreso: [],
        fecha: "",
        hora:  "",
    },
};

export const NotaIngresoReducer = ( state = initialState, action = { payload, type} ) => {

    switch ( action.type ) {

        case Strings.notaingreso_onChange:
            state = Object.assign( {}, action.payload );
            return state;

        case Strings.notaingreso_onCreate:
            cleanObejct( state );
            state.idnotaingreso = action.payload.idnotaingreso;
            state.fechanotaingreso   = dateToString( new Date() );
            state.nromanual    = "0";
            state.esingresado  = "N";
            state.tipocambio  = "6.95";

            state.arrayNotaIngresoDetalle = loadDetailEntryNote();

            state.cantidadtotal = "0",
            state.montototal = "0.00",
            state.pesototal = "0.00",
            state.volumentotal = "0.00",
            state.nrocajastotal = "0.00",
    
            state.fkidmoneda  = action.payload.arrayMoneda.length == 0 ? "" : action.payload.arrayMoneda[0].idmoneda;
            state.moneda      = action.payload.arrayMoneda.length == 0 ? "" : action.payload.arrayMoneda[0].descripcion;
            state.loading = false;
            state = Object.assign( {}, state );
            return state;

        case Strings.notaingreso_onEditar:
            onSetData( state, action.payload.notaingreso );
            state.loading = false;
            state = Object.assign( {}, state );
            return state;

        case Strings.notaingreso_onShow:
            onSetData( state, action.payload.notaingreso );
            state.loading = false;
            state = Object.assign( {}, state );
            return state;

        case Strings.notaingreso_setLoad:
            cleanObejct( state );
            state.loading = true;
            state = Object.assign( {}, state );
            return state;

        case Strings.notaingreso_setLimpiar:
            cleanObejct( state );
            state = Object.assign( {}, state );
            return state;

        case Strings.notaingreso_setState:
            cleanObejct( state );
            onSetData( state, action.payload );
            state = Object.assign( {}, state );
            return state;

        case Strings.notaingreso_setImprimir: 
            return {
                ...state,
                reporte: action.payload,
            };

        case Strings.notaingreso_onFocus:
            state.focusInput = true;
            state = Object.assign( {}, state );
            return state;

        case Strings.notaingreso_offFocus:
            state.focusInput = false;
            state = Object.assign( {}, state );
            return state;
    
        default:
            return state;
    }
};

function onSetData( state, payload ) {
    state.idnotaingreso   = payload.idnotaingreso;
    
    state.codigo = payload.codigo ? payload.codigo : "";
    state.nromanual = payload.nromanual;
    state.tipocambio = parseFloat(payload.tipocambio).toFixed(2);
    state.fechanotaingreso = Functions.convertYMDToDMY(payload.fechanotaingreso);

    state.cantidadtotal = parseInt(payload.cantidadtotal);
    state.montototal = parseFloat(payload.montototal).toFixed(2);
    state.pesototal = parseFloat(payload.pesototal).toFixed(2);
    state.volumentotal = parseFloat(payload.volumentotal).toFixed(2);
    state.nrocajastotal = parseFloat(payload.nrocajastotal).toFixed(2);
    
    state.nota = payload.nota ? payload.nota : "";
    state.esingresado = payload.esingresado;

    state.fkidsucursal = payload.fkidsucursal;
    state.sucursal = payload.sucursal;

    state.fkidalmacen = payload.fkidalmacen;
    state.almacen = payload.almacen;

    state.fkidconceptoinventario = payload.fkidconceptoinventario;
    state.conceptoinventario = payload.conceptoinventario;

    state.fkidmoneda = payload.fkidmoneda;
    state.moneda = payload.moneda;

    state.arrayNotaIngresoDetalle = setStateDetailsEntryNote(payload.notaingresodetalle);
};

function loadDetailEntryNote() {
    let array = [];
    for ( let index = 0; index < 10; index++ ) {
        const element = {
            key: index,
            codigo: "",
            producto: "",
            ciudadorigen: "",
            cantidad: "",
            costounitario: "",
            costototal: "",
            nrocajas: "",
            peso: "",
            pesosubtotal: "",
            volumen: "",
            volumensubtotal: "",
            productomarca: "",
            fechavencimiento: null,
            vencimiento: null,
            nrolote: "",
            nrofabrica: "",
            precio: "",
            nota: null,
            unidadmedidaproducto: "",

            visible_producto: false,
            visible_unidadmedida: false,

            array_unidadmedidaproducto: [],
            array_unidadmedida: [],

            fkidproducto: null,
            fkidunidadmedidaproducto: null,
            idnotaingresodetalle: null,
        };
        array = [ ...array, element];
    }
    return array;
};

function setStateDetailsEntryNote( notaingresodetalle ) {
    let array = [];
    for (let index = 0; index < notaingresodetalle.length; index++) {
        let detalle = notaingresodetalle[index];
        let element = {
            key: index,
            codigo: detalle.codigo,
            producto: detalle.nombre,
            ciudadorigen: detalle.ciudadorigen,
            cantidad: detalle.cantidad,
            costounitario: parseFloat(detalle.costounitario).toFixed(2),
            costototal: parseFloat(detalle.costototal).toFixed(2),
            nrocajas: parseInt(detalle.nrocajas),
            peso: parseFloat(detalle.peso).toFixed(2),
            pesosubtotal: parseFloat(detalle.pesosubtotal).toFixed(2),
            volumen: parseFloat(detalle.volumen).toFixed(2),
            volumensubtotal: parseFloat(detalle.volumensubtotal).toFixed(2),
            productomarca: detalle.productomarca,
            fechavencimiento: detalle.fechavencimiento,
            vencimiento: Functions.convertYMDToDMY(detalle.fechavencimiento),
            nrolote: parseFloat(detalle.nrolote).toFixed(2),
            nrofabrica: parseFloat(detalle.nrofabrica).toFixed(2),
            precio: parseFloat(detalle.precio).toFixed(2),
            nota: detalle.nota,
            unidadmedidaproducto: parseFloat(detalle.pesounidadmedida).toFixed(2) + " " + detalle.abreviatura,

            visible_producto: false,
            visible_unidadmedida: false,

            array_unidadmedidaproducto: [],
            array_unidadmedida: [],

            fkidproducto: detalle.idproducto,
            fkidunidadmedidaproducto: detalle.fkidunidadmedidaproducto,
            idnotaingresodetalle: detalle.idnotaingresodetalle,
        };
        array = [ ...array, element];
    }
    return array;
};
