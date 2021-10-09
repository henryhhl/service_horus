
import { Functions } from '../../../../utils/functions';
import { Strings } from '../../../constants';

const { cleanObejct } = Functions;

const initialState = {

    focusInput: false,
    update: false,
    imprimir: false,

    idunidadmedida: "",
    abreviatura: "",
    codigo: "",
    descripcion: "",
    estado: "",
    fecha: "",
    hora: "",

    error: {
        abreviatura: false,
        descripcion: false,
    },
    message: {
        abreviatura: "",
        descripcion: "",
    },

    reporte: {
        arrayUnidadMedida: [],
        fecha: "",
        hora: "",
    },
};

export const UnidadMedidaReducer = ( state = initialState, action = { payload, type} ) => {

    switch ( action.type ) {

        case Strings.unidadmedida_onChange:
            state = Object.assign( {}, action.payload );
            return state;

        case Strings.unidadmedida_onCreate:
            cleanObejct( state );
            state.idunidadmedida = action.payload;
            state = Object.assign( {}, state );
            return state;

        case Strings.unidadmedida_setLimpiar:
            cleanObejct( state );
            state = Object.assign( {}, state );
            return state;

        case Strings.unidadmedida_setState:
            cleanObejct( state );
            onSetData( state, action.payload );
            state = Object.assign( {}, state );
            return state;

        case Strings.unidadmedida_setImprimir: 
            return {
                ...state,
                reporte: action.payload,
            };

        case Strings.unidadmedida_onFocus:
            state.focusInput = true;
            state = Object.assign( {}, state );
            return state;

        case Strings.unidadmedida_offFocus:
            state.focusInput = false;
            state = Object.assign( {}, state );
            return state;
    
        default:
            return state;
    }
};

function onSetData( state, payload ) {
    state.idunidadmedida = payload.idunidadmedida;
    state.abreviatura    = payload.abreviatura;
    state.descripcion    = payload.descripcion;
}
