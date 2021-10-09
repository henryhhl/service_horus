
import { Functions } from '../../../../utils/functions';
import { Strings } from '../../../constants';

const { cleanObejct } = Functions;

const initialState = {

    focusInput: false,
    update: false,
    imprimir: false,

    idciudadclasificacion: "",
    codigo: "",
    descripcion: "",
    estado: "",
    fecha: "",
    hora: "",

    error: {
        descripcion: false,
    },
    message: {
        descripcion: "",
    },

    reporte: {
        arrayCiudadClasificacion: [],
        fecha: "",
        hora: "",
    },
};

export const CiudadClasificacionReducer = ( state = initialState, action = { payload, type} ) => {

    switch ( action.type ) {

        case Strings.ciudadclasificacion_onChange:
            state = Object.assign( {}, action.payload );
            return state;

        case Strings.ciudadclasificacion_onCreate:
            cleanObejct( state );
            state.idciudadclasificacion = action.payload;
            state = Object.assign( {}, state );
            return state;

        case Strings.ciudadclasificacion_setLimpiar:
            cleanObejct( state );
            state = Object.assign( {}, state );
            return state;

        case Strings.ciudadclasificacion_setState:
            cleanObejct( state );
            onSetData( state, action.payload );
            state = Object.assign( {}, state );
            return state;

        case Strings.ciudadclasificacion_setImprimir: 
            return {
                ...state,
                reporte: action.payload,
            };

        case Strings.ciudadclasificacion_onFocus:
            state.focusInput = true;
            state = Object.assign( {}, state );
            return state;

        case Strings.ciudadclasificacion_offFocus:
            state.focusInput = false;
            state = Object.assign( {}, state );
            return state;
    
        default:
            return state;
    }
};

function onSetData( state, payload ) {
    state.idciudadclasificacion = payload.idciudadclasificacion;
    state.descripcion           = payload.descripcion;
}


