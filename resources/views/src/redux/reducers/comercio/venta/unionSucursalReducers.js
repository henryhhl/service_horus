
import { Functions } from '../../../../utils/functions';
import { Strings } from '../../../constants';

const { cleanObejct } = Functions;

const initialState = {

    focusInput: false,
    update: false,
    imprimir: false,
    loading:  false,

    idunionsucursal: "",
    codigo: "",
    abreviatura:"",
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
        arrayUnionSucursal: [],
        fecha: "",
        hora: "",
    },
};

export const UnionSucursalReducer = ( state = initialState, action = { payload, type} ) => {

    switch ( action.type ) {

        case Strings.unionsucursal_onChange:
            state = Object.assign( {}, action.payload );
            return state;

        case Strings.unionsucursal_onCreate:
            state.idunionsucursal = action.payload.idunionsucursal;
            state.loading = false;
            state = Object.assign( {}, state );
            return state;

        case Strings.unionsucursal_onEditar:
            onSetData( state, action.payload.unionsucursal );
            state.loading = false;
            state = Object.assign( {}, state );
            return state;

        case Strings.unionsucursal_onShow:
            onSetData( state, action.payload.unionsucursal );
            state.loading = false;
            state = Object.assign( {}, state );
            return state;

        case Strings.unionsucursal_setLoad:
            cleanObejct( state );
            state.loading = true;
            state = Object.assign( {}, state );
            return state;

        case Strings.unionsucursal_setLimpiar:
            cleanObejct( state );
            state = Object.assign( {}, state );
            return state;

        case Strings.unionsucursal_setState:
            cleanObejct( state );
            onSetData( state, action.payload );
            state = Object.assign( {}, state );
            return state;

        case Strings.unionsucursal_setImprimir: 
            return {
                ...state,
                reporte: action.payload,
            };

        case Strings.unionsucursal_onFocus:
            state.focusInput = true;
            state = Object.assign( {}, state );
            return state;

        case Strings.unionsucursal_offFocus:
            state.focusInput = false;
            state = Object.assign( {}, state );
            return state;
    
        default:
            return state;
    }
};

function onSetData( state, payload ) {
    state.idunionsucursal = payload.idunionsucursal;
    state.abreviatura     = payload.abreviatura;
    state.descripcion     = payload.descripcion;
}


