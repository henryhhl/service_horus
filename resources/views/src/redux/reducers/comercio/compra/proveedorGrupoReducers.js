
import { Functions } from '../../../../utils/functions';
import { Strings } from '../../../constants';

const { cleanObejct } = Functions;

const initialState = {

    focusInput: false,
    update: false,
    imprimir: false,
    loading:  false,

    idproveedorgrupo: "",
    codigo: "",
    descripcion: "",

    estado: "",
    fecha: "",
    hora: "",

    error: {
        descripcion:  false,
    },
    message: {
        descripcion:  "",
    },

    reporte: {
        arrayProveedorGrupo: [],
        fecha: "",
        hora:  "",
    },
};

export const ProveedorGrupoReducer = ( state = initialState, action = { payload, type} ) => {

    switch ( action.type ) {

        case Strings.proveedorgrupo_onChange:
            state = Object.assign( {}, action.payload );
            return state;

        case Strings.proveedorgrupo_onCreate:
            cleanObejct( state );
            state.idproveedorgrupo = action.payload.idproveedorgrupo;
            state.loading = false;
            state = Object.assign( {}, state );
            return state;

        case Strings.proveedorgrupo_onEditar:
            onSetData( state, action.payload.proveedorgrupo );
            state.loading = false;
            state = Object.assign( {}, state );
            return state;

        case Strings.proveedorgrupo_onShow:
            onSetData( state, action.payload.proveedorgrupo );
            state.loading = false;
            state = Object.assign( {}, state );
            return state;

        case Strings.proveedorgrupo_setLoad:
            cleanObejct( state );
            state.loading = true;
            state = Object.assign( {}, state );
            return state;

        case Strings.proveedorgrupo_setLimpiar:
            cleanObejct( state );
            state = Object.assign( {}, state );
            return state;

        case Strings.proveedorgrupo_setState:
            cleanObejct( state );
            onSetData( state, action.payload );
            state = Object.assign( {}, state );
            return state;

        case Strings.proveedorgrupo_setImprimir: 
            return {
                ...state,
                reporte: action.payload,
            };

        case Strings.proveedorgrupo_onFocus:
            state.focusInput = true;
            state = Object.assign( {}, state );
            return state;

        case Strings.proveedorgrupo_offFocus:
            state.focusInput = false;
            state = Object.assign( {}, state );
            return state;
    
        default:
            return state;
    }
};

function onSetData( state, payload ) {
    state.idproveedorgrupo   = payload.idproveedorgrupo;
    
    state.descripcion = payload.descripcion;
}  
