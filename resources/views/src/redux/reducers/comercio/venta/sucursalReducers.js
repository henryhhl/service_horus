
import { Functions } from '../../../../utils/functions';
import { Strings } from '../../../constants';

const { cleanObejct } = Functions;

const initialState = {

    focusInput: false,
    update: false,
    imprimir: false,
    loading:  false,

    idsucursal: "",
    codigo: "",
    abreviatura:"",
    descripcion: "",
    direccion: "",

    fkidunionsucursal: "",
    unionsucursal: "",

    fkidciudad: "",
    ciudad: "",

    fkidciudadpais: "",
    ciudadpais: "",

    estado: "",
    fecha: "",
    hora: "",

    error: {
        abreviatura: false,
        descripcion: false,
        direccion:   false,
        fkidciudad:  false,
        fkidciudadpais:  false,
        fkidunionsucursal: false,
    },
    message: {
        abreviatura: "",
        descripcion: "",
        direccion:   "",
        fkidciudad:  "",
        fkidciudadpais: "",
        fkidunionsucursal: "",
    },

    reporte: {
        arraySucursal: [],
        fecha: "",
        hora: "",
    },
};

export const SucursalReducer = ( state = initialState, action = { payload, type} ) => {

    switch ( action.type ) {

        case Strings.sucursal_onChange:
            state = Object.assign( {}, action.payload );
            return state;

        case Strings.sucursal_onCreate:
            state.idsucursal = action.payload.idsucursal;
            state.loading = false;
            state = Object.assign( {}, state );
            return state;

        case Strings.sucursal_onEditar:
            onSetData( state, action.payload.sucursal );
            state.loading = false;
            state = Object.assign( {}, state );
            return state;

        case Strings.sucursal_onShow:
            onSetData( state, action.payload.sucursal );
            state.loading = false;
            state = Object.assign( {}, state );
            return state;

        case Strings.sucursal_setLoad:
            cleanObejct( state );
            state.loading = true;
            state = Object.assign( {}, state );
            return state;

        case Strings.sucursal_setLimpiar:
            cleanObejct( state );
            state = Object.assign( {}, state );
            return state;

        case Strings.sucursal_setState:
            cleanObejct( state );
            onSetData( state, action.payload );
            state = Object.assign( {}, state );
            return state;

        case Strings.sucursal_setImprimir:
            return {
                ...state,
                reporte: action.payload,
            };

        case Strings.sucursal_onFocus:
            state.focusInput = true;
            state = Object.assign( {}, state );
            return state;

        case Strings.sucursal_offFocus:
            state.focusInput = false;
            state = Object.assign( {}, state );
            return state;

        default:
            return state;
    }
};

function onSetData( state, payload ) {
    state.idsucursal  = payload.idsucursal;
    state.abreviatura = payload.abreviatura;
    state.descripcion = payload.descripcion;
    state.direccion   = payload.direccion;

    state.fkidunionsucursal = payload.fkidunionsucursal;
    state.unionsucursal     = payload.unionsucursal;

    state.fkidciudad = payload.fkidciudad;
    state.ciudad     = payload.ciudad;

    state.fkidciudadpais = payload.fkidciudadpais;
    state.ciudadpais     = payload.ciudadpais;
}


