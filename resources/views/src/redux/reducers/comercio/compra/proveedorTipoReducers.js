
import { Functions } from '../../../../utils/functions';
import { Strings } from '../../../constants';

const { cleanObejct } = Functions;

const initialState = {

    focusInput: false,
    update: false,
    imprimir: false,
    loading:  false,

    idproveedortipo: "",
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
        arrayProveedorTipo: [],
        fecha: "",
        hora:  "",
    },
};

export const ProveedorTipoReducer = ( state = initialState, action = { payload, type} ) => {

    switch ( action.type ) {

        case Strings.proveedortipo_onChange:
            state = Object.assign( {}, action.payload );
            return state;

        case Strings.proveedortipo_onCreate:
            cleanObejct( state );
            state.idproveedortipo = action.payload.idproveedortipo;
            state.loading = false;
            state = Object.assign( {}, state );
            return state;

        case Strings.proveedortipo_onEditar:
            onSetData( state, action.payload.proveedortipo );
            state.loading = false;
            state = Object.assign( {}, state );
            return state;

        case Strings.proveedortipo_onShow:
            onSetData( state, action.payload.proveedortipo );
            state.loading = false;
            state = Object.assign( {}, state );
            return state;

        case Strings.proveedortipo_setLoad:
            cleanObejct( state );
            state.loading = true;
            state = Object.assign( {}, state );
            return state;

        case Strings.proveedortipo_setLimpiar:
            cleanObejct( state );
            state = Object.assign( {}, state );
            return state;

        case Strings.proveedortipo_setState:
            cleanObejct( state );
            onSetData( state, action.payload );
            state = Object.assign( {}, state );
            return state;

        case Strings.proveedortipo_setImprimir: 
            return {
                ...state,
                reporte: action.payload,
            };

        case Strings.proveedortipo_onFocus:
            state.focusInput = true;
            state = Object.assign( {}, state );
            return state;

        case Strings.proveedortipo_offFocus:
            state.focusInput = false;
            state = Object.assign( {}, state );
            return state;
    
        default:
            return state;
    }
};

function onSetData( state, payload ) {
    state.idproveedortipo   = payload.idproveedortipo;
    
    state.descripcion = payload.descripcion;
}  
