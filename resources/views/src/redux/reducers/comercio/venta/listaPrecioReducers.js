
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
    nombre: "",
    tipocambio: "",
    nota: "",

    fechainicio: "",
    fechafinal: "",

    imagen: "",
    extension: "",

    listapreciodetalle: [],

    estado: "",
    fecha: "",
    hora: "",

    error: {
        nombre:  false,
        abreviatura: false,
        fechainicio:  false,
        tipocambio: false,
    },
    message: {
        nombre:  "",
        abreviatura: "",
        fechainicio: "",
        tipocambio: "",
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
            state.tipocambio    = "6.95";
            state.loading = false;
            state.listapreciodetalle = loadDetalle(state.listapreciodetalle);
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
    
    state.nombre      = payload.nombre;
    state.codigo      = payload.codigo;
    state.abreviatura = payload.abreviatura;
    state.tipocambio  = parseFloat( payload.tipocambio ).toFixed(2);
    state.nota        = payload.nota;

    state.listaprecio = payload.listaprecio;

    state.fechainicio = convertYMDToDMY(payload.fechainicio);
    state.fechafinal  = convertYMDToDMY(payload.fechafinal);
    
    state.imagen = payload.imagen;
    state.extension = payload.extension;
};

function loadDetalle( array ) {
    for ( let index = 0; index < 10; index++ ) {
        const element = {
            key: index,
            codigo: "",
            producto: "",
            fkidproducto: "",
            fkidlistaprecio: "",
            fkidmoneda: "",
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
