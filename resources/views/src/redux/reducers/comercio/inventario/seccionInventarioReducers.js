
import { Functions } from '../../../../utils/functions';
import { Strings } from '../../../constants';

const { cleanObejct } = Functions;

const initialState = {

    focusInput: false,
    update: false,
    imprimir: false,
    loading:  false,

    idseccioninventario: "",
    codigo: "",
    descripcion: "",

    estado: "",
    fecha: "",
    hora: "",

    error: {
        codigo:  false,
        descripcion:  false,
    },
    message: {
        codigo:  "",
        descripcion:  "",
    },

    reporte: {
        arraySeccionInventario: [],
        fecha: "",
        hora:  "",
    },
};

export const SeccionInventarioReducer = ( state = initialState, action = { payload, type} ) => {

    switch ( action.type ) {

        case Strings.seccioninventario_onChange:
            state = Object.assign( {}, action.payload );
            return state;

        case Strings.seccioninventario_onCreate:
            cleanObejct( state );
            state.idseccioninventario = action.payload.idseccioninventario;
            state.loading = false;
            state = Object.assign( {}, state );
            return state;

        case Strings.seccioninventario_onEditar:
            onSetData( state, action.payload.seccioninventario );
            state.loading = false;
            state = Object.assign( {}, state );
            return state;

        case Strings.seccioninventario_onShow:
            onSetData( state, action.payload.seccioninventario );
            state.loading = false;
            state = Object.assign( {}, state );
            return state;

        case Strings.seccioninventario_setLoad:
            cleanObejct( state );
            state.loading = true;
            state = Object.assign( {}, state );
            return state;

        case Strings.seccioninventario_setLimpiar:
            cleanObejct( state );
            state = Object.assign( {}, state );
            return state;

        case Strings.seccioninventario_setState:
            cleanObejct( state );
            onSetData( state, action.payload );
            state = Object.assign( {}, state );
            return state;

        case Strings.seccioninventario_setImprimir: 
            return {
                ...state,
                reporte: action.payload,
            };

        case Strings.seccioninventario_onFocus:
            state.focusInput = true;
            state = Object.assign( {}, state );
            return state;

        case Strings.seccioninventario_offFocus:
            state.focusInput = false;
            state = Object.assign( {}, state );
            return state;
    
        default:
            return state;
    }
};

function onSetData( state, payload ) {
    state.idseccioninventario   = payload.idseccioninventario;
    
    state.codigo = payload.codigo;
    state.descripcion = payload.descripcion;
}  
