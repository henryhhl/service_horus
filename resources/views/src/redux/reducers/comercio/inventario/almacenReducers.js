
import { Functions } from '../../../../utils/functions';
import { Strings } from '../../../constants';

const { cleanObejct } = Functions;

const initialState = {

    focusInput: false,
    update: false,
    imprimir: false,
    loading:  false,

    idalmacen: "",
    codigo: "",
    abreviatura: "",
    descripcion: "",
    direccion: "",

    fkidsucursal: "",
    sucursal:     "",

    estado: "",
    fecha: "",
    hora: "",

    error: {
        abreviatura:  false,
        descripcion:  false,
        direccion:    false,
        fkidsucursal: false,
    },
    message: {
        abreviatura:  "",
        descripcion:  "",
        direccion:    "",
        fkidsucursal: "",
    },

    reporte: {
        arrayAlmacen: [],
        fecha: "",
        hora:  "",
    },
};

export const AlmacenReducer = ( state = initialState, action = { payload, type} ) => {

    switch ( action.type ) {

        case Strings.almacen_onChange:
            state = Object.assign( {}, action.payload );
            return state;

        case Strings.almacen_onCreate:
            cleanObejct( state );
            state.idalmacen = action.payload.idalmacen;
            state.loading = false;
            state = Object.assign( {}, state );
            return state;

        case Strings.almacen_onEditar:
            onSetData( state, action.payload.almacen );
            state.loading = false;
            state = Object.assign( {}, state );
            return state;

        case Strings.almacen_onShow:
            onSetData( state, action.payload.almacen );
            state.loading = false;
            state = Object.assign( {}, state );
            return state;

        case Strings.almacen_setLoad:
            cleanObejct( state );
            state.loading = true;
            state = Object.assign( {}, state );
            return state;

        case Strings.almacen_setLimpiar:
            cleanObejct( state );
            state = Object.assign( {}, state );
            return state;

        case Strings.almacen_setState:
            cleanObejct( state );
            onSetData( state, action.payload );
            state = Object.assign( {}, state );
            return state;

        case Strings.almacen_setImprimir: 
            return {
                ...state,
                reporte: action.payload,
            };

        case Strings.almacen_onFocus:
            state.focusInput = true;
            state = Object.assign( {}, state );
            return state;

        case Strings.almacen_offFocus:
            state.focusInput = false;
            state = Object.assign( {}, state );
            return state;
    
        default:
            return state;
    }
};

function onSetData( state, payload ) {
    state.idalmacen   = payload.idalmacen;
    state.abreviatura = payload.abreviatura;
    state.descripcion = payload.descripcion;
    state.direccion   = payload.direccion;

    state.fkidsucursal = payload.fkidsucursal;
    state.sucursal     = payload.sucursal;
}  
