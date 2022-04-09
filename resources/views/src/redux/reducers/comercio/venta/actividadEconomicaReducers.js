
import { Functions } from '../../../../utils/functions';
import { Strings } from '../../../constants';

const { cleanObejct } = Functions;

const initialState = {

    focusInput: false,
    update: false,
    imprimir: false,
    loading:  false,

    idactividadeconomica: "",
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
        arrayActividadEconomica: [],
        fecha: "",
        hora:  "",
    },
};

export const ActividadEconomicaReducer = ( state = initialState, action = { payload, type} ) => {

    switch ( action.type ) {

        case Strings.actividadeconomica_onChange:
            state = Object.assign( {}, action.payload );
            return state;

        case Strings.actividadeconomica_onCreate:
            cleanObejct( state );
            state.idactividadeconomica = action.payload.idactividadeconomica;
            state.loading = false;
            state.estado = 'A';
            state = Object.assign( {}, state );
            return state;

        case Strings.actividadeconomica_onEditar:
            onSetData( state, action.payload.actividadeconomica );
            state.loading = false;
            state = Object.assign( {}, state );
            return state;

        case Strings.actividadeconomica_onShow:
            onSetData( state, action.payload.actividadeconomica );
            state.loading = false;
            state = Object.assign( {}, state );
            return state;

        case Strings.actividadeconomica_setLoad:
            cleanObejct( state );
            state.loading = true;
            state = Object.assign( {}, state );
            return state;

        case Strings.actividadeconomica_setLimpiar:
            cleanObejct( state );
            state = Object.assign( {}, state );
            return state;

        case Strings.actividadeconomica_setState:
            cleanObejct( state );
            onSetData( state, action.payload );
            state = Object.assign( {}, state );
            return state;

        case Strings.actividadeconomica_setImprimir:
            return {
                ...state,
                reporte: action.payload,
            };

        case Strings.actividadeconomica_onFocus:
            state.focusInput = true;
            state = Object.assign( {}, state );
            return state;

        case Strings.actividadeconomica_offFocus:
            state.focusInput = false;
            state = Object.assign( {}, state );
            return state;

        default:
            return state;
    }
};

function onSetData( state, payload ) {
    state.idactividadeconomica   = payload.idactividadeconomica;

    state.codigo = payload.codigo;
    state.abreviatura = payload.abreviatura;
    state.descripcion = payload.descripcion;

    state.imagen = payload.imagen;
    state.extension = payload.extension;
    state.estado = payload.estado;
}
