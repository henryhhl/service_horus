
import { Functions } from '../../../../utils/functions';
import { Strings } from '../../../constants';

const { cleanObejct } = Functions;

const initialState = {

    focusInput: false,
    update: false,
    imprimir: false,
    loading:  false,

    visible_show: false,
    visible_edit: false,

    array_ciudadclasificacion: [],
    array_ciudad: [],

    idciudad: "",
    codigo: "",
    abreviatura:"",
    descripcion: "",
    fkidciudadpadre: "",

    fkidciudadclasificacion: "",
    ciudadclasificacion: "",

    estado: "",
    fecha: "",
    hora: "",

    error: {
        abreviatura: false,
        descripcion: false,
        fkidciudadclasificacion: false,
    },
    message: {
        abreviatura: "",
        descripcion: "",
        fkidciudadclasificacion: "",
    },

    reporte: {
        arrayCiudad: [],
        fecha: "",
        hora: "",
    },
};

export const CiudadReducer = ( state = initialState, action = { payload, type} ) => {

    switch ( action.type ) {

        case Strings.ciudad_onChange:
            state = Object.assign( {}, action.payload );
            return state;

        case Strings.ciudad_onCreate:
            state.idciudad = action.payload.idciudad;
            state.array_ciudadclasificacion = action.payload.array_ciudadClasificacion;
            state.array_ciudad = action.payload.array_ciudad;
            state.loading = false;
            state = Object.assign( {}, state );
            return state;

        case Strings.ciudad_onEditar:
            onSetData( state, action.payload.ciudad );
            state.array_ciudadclasificacion = action.payload.array_ciudadClasificacion;
            state.array_ciudad = action.payload.array_ciudad;
            state.loading = false;
            state = Object.assign( {}, state );
            return state;

        case Strings.ciudad_onShow:
            onSetData( state, action.payload.ciudad );
            state.loading = false;
            state = Object.assign( {}, state );
            return state;

        case Strings.ciudad_setLoad:
            cleanObejct( state );
            state.loading = true;
            state = Object.assign( {}, state );
            return state;

        case Strings.ciudad_setLimpiar:
            cleanObejct( state );
            state = Object.assign( {}, state );
            return state;

        case Strings.ciudad_setState:
            cleanObejct( state );
            onSetData( state, action.payload );
            state = Object.assign( {}, state );
            return state;

        case Strings.ciudad_setImprimir: 
            return {
                ...state,
                reporte: action.payload,
            };

        case Strings.ciudad_onFocus:
            state.focusInput = true;
            state = Object.assign( {}, state );
            return state;

        case Strings.ciudad_offFocus:
            state.focusInput = false;
            state = Object.assign( {}, state );
            return state;
    
        default:
            return state;
    }
};

function onSetData( state, payload ) {
    state.idciudad    = payload.idciudad;
    state.abreviatura = payload.abreviatura;
    state.descripcion = payload.descripcion;
    state.fkidciudadpadre = payload.fkidciudadpadre;
    state.fkidciudadclasificacion = payload.fkidciudadclasificacion;
    state.ciudadclasificacion = payload.ciudadclasificacion;
}


