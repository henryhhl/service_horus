
import { Functions } from '../../../../utils/functions';
import { Strings } from '../../../constants';

const { cleanObejct, convertYMDToDMY, dateToString } = Functions;

const initialState = {

    focusInput: false,
    update: false,
    imprimir: false,
    loading:  false,

    idlistaprecio: "",

    codigo: "",
    abreviatura: "",
    descripcion: "",
    tipocambio: "",
    nota: "",

    fechalistaprecio: "",
    fechainicio: "",
    fechafinal: "",

    valor: "",
    fijoporcentaje: "",
    accion: "",

    imagen: "",
    extension: "",

    listapreciodetalle: [],
    listapreciodetalledelete: [],

    estado: "",
    fecha: "",
    hora: "",

    error: {
        descripcion:  false,
        abreviatura: false,
        fechainicio:  false,
        tipocambio: false,
        valor: false,
        fijoporcentaje: false,
        accion: false,
    },
    message: {
        descripcion:  "",
        abreviatura: "",
        fechainicio: "",
        tipocambio: "",
        valor: "",
        fijoporcentaje: "",
        accion: "",
    },

    reporte: {
        arrayListaPrecio: [],
        fecha: "",
        hora:  "",
    },
};

export const ListaPrecioReducer = ( state = initialState, action = { payload, type} ) => {

    switch ( action.type ) {

        case Strings.listaprecio_onChange:
            state = Object.assign( {}, action.payload );
            return state;

        case Strings.listaprecio_onCreate:
            cleanObejct( state );
            state.idlistaprecio = action.payload.idlistaprecio;
            state.fechainicio   = dateToString( new Date() );
            state.fechalistaprecio   = dateToString( new Date() );
            state.tipocambio    = "6.95";
            state.valor = "0";
            state.fijoporcentaje = "P";
            state.accion = "N";
            state.estado = "A";
            state.loading = false;
            state.listapreciodetalle = loadDetalle();
            state = Object.assign( {}, state );
            return state;

        case Strings.listaprecio_onEditar:
            onSetData( state, action.payload.listaprecio );
            state.loading = false;
            state = Object.assign( {}, state );
            return state;

        case Strings.listaprecio_onShow:
            onSetData( state, action.payload.listaprecio );
            state.loading = false;
            state = Object.assign( {}, state );
            return state;

        case Strings.listaprecio_setLoad:
            cleanObejct( state );
            state.loading = true;
            state = Object.assign( {}, state );
            return state;

        case Strings.listaprecio_setLimpiar:
            cleanObejct( state );
            state = Object.assign( {}, state );
            return state;

        case Strings.listaprecio_setState:
            cleanObejct( state );
            onSetData( state, action.payload );
            state = Object.assign( {}, state );
            return state;

        case Strings.listaprecio_setImprimir:
            return {
                ...state,
                reporte: action.payload,
            };

        case Strings.listaprecio_onFocus:
            state.focusInput = true;
            state = Object.assign( {}, state );
            return state;

        case Strings.listaprecio_offFocus:
            state.focusInput = false;
            state = Object.assign( {}, state );
            return state;

        default:
            return state;
    }
};

function onSetData( state, payload ) {
    state.idlistaprecio   = payload.idlistaprecio;

    state.descripcion      = payload.descripcion;
    state.codigo      = payload.codigo;
    state.abreviatura = payload.abreviatura;
    state.tipocambio  = parseFloat( payload.tipocambio ).toFixed(2);
    state.nota        = payload.nota;

    state.listaprecio = payload.listaprecio;

    state.fechalistaprecio = convertYMDToDMY(payload.fechalistaprecio);
    state.fechainicio = convertYMDToDMY(payload.fechainicio);
    state.fechafinal  = convertYMDToDMY(payload.fechafinal);

    state.valor = parseFloat(payload.valor).toFixed(2);
    state.fijoporcentaje = payload.fijoporcentaje;
    state.accion = payload.accion;
    state.estado = payload.estado;

    let array = [];
    for ( let index = 0; index < payload.listapreciodetalle.length; index++ ) {
        const detalle = payload.listapreciodetalle[index];
        const element = {
            key: index,
            idlistapreciodetalle: detalle.idlistapreciodetalle,
            codigo: detalle.codigo,
            producto: detalle.producto,
            fkidproducto: detalle.fkidproducto,
            fkidunidadmedidaproducto: detalle.fkidunidadmedidaproducto,
            fkidlistaprecio: detalle.fkidlistaprecio,
            fkidmoneda: detalle.fkidmoneda,
            preciobase: parseFloat(detalle.preciobase).toFixed(2),
            preciopivote: parseFloat(detalle.preciopivote).toFixed(2),
            descuento: parseInt(detalle.descuento),
            montodescuento: parseFloat(detalle.montodescuento).toFixed(2),
            precioventa: parseFloat(detalle.precioventa).toFixed(2),
            nota: detalle.nota,
        };
        array = [ ...array, element];
    }

    if ( array.length === 0 ) {
        array = loadDetalle();
    }

    state.listapreciodetalle = array;

    state.imagen = payload.imagen;
    state.extension = payload.extension;
};

function loadDetalle( ) {
    let array = [];
    for ( let index = 0; index < 10; index++ ) {
        const element = {
            key: index,
            idlistapreciodetalle: null,
            codigo: "",
            producto: "",
            fkidproducto: null,
            fkidunidadmedidaproducto: null,
            fkidlistaprecio: null,
            fkidmoneda: null,
            preciobase: "",
            preciopivote: "",
            descuento: "",
            montodescuento: "",
            precioventa: "",
            nota: "",
        };
        array = [ ...array, element];
    }
    return array;
};
