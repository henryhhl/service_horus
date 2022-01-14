
import { Functions } from '../../../../utils/functions';
import { Strings } from '../../../constants';

const { cleanObejct } = Functions;

const initialState = {

    focusInput: false,
    update: false,
    imprimir: false,
    loading:  false,

    idclientetipo: "",
    codigo: "",
    abreviatura: "",
    descripcion: "",

    imagen: "",
    extension: "",

    estado: "",
    fecha: "",
    hora: "",

    error: {
        codigo:  false,
        abreviatura:  false,
        descripcion:  false,
    },
    message: {
        codigo:  "",
        abreviatura:  "",
        descripcion:  "",
    },

    reporte: {
        arrayClienteTipo: [],
        fecha: "",
        hora:  "",
    },
};

export const ClienteTipoReducer = ( state = initialState, action = { payload, type} ) => {

    switch ( action.type ) {

        case Strings.clientetipo_onChange:
            state = Object.assign( {}, action.payload );
            return state;

        case Strings.clientetipo_onCreate:
            cleanObejct( state );
            state.idclientetipo = action.payload.idclientetipo;
            state.loading = false;
            state = Object.assign( {}, state );
            return state;

        case Strings.clientetipo_onEditar:
            onSetData( state, action.payload.clientetipo );
            state.loading = false;
            state = Object.assign( {}, state );
            return state;

        case Strings.clientetipo_onShow:
            onSetData( state, action.payload.clientetipo );
            state.loading = false;
            state = Object.assign( {}, state );
            return state;

        case Strings.clientetipo_setLoad:
            cleanObejct( state );
            state.loading = true;
            state = Object.assign( {}, state );
            return state;

        case Strings.clientetipo_setLimpiar:
            cleanObejct( state );
            state = Object.assign( {}, state );
            return state;

        case Strings.clientetipo_setState:
            cleanObejct( state );
            onSetData( state, action.payload );
            state = Object.assign( {}, state );
            return state;

        case Strings.clientetipo_setImprimir: 
            return {
                ...state,
                reporte: action.payload,
            };

        case Strings.clientetipo_onFocus:
            state.focusInput = true;
            state = Object.assign( {}, state );
            return state;

        case Strings.clientetipo_offFocus:
            state.focusInput = false;
            state = Object.assign( {}, state );
            return state;
    
        default:
            return state;
    }
};

function onSetData( state, payload ) {
    state.idclientetipo   = payload.idclientetipo;
    
    state.codigo = payload.codigo;
    state.abreviatura = payload.abreviatura;
    state.descripcion = payload.descripcion;

    state.imagen = payload.imagen;
    state.extension = payload.extension;
}  
