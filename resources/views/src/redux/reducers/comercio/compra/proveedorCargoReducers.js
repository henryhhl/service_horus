
import { Functions } from '../../../../utils/functions';
import { Strings } from '../../../constants';

const { cleanObejct } = Functions;

const initialState = {

    focusInput: false,
    update: false,
    imprimir: false,
    loading:  false,

    idproveedorcargo: "",
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
        arrayProveedorCargo: [],
        fecha: "",
        hora:  "",
    },
};

export const ProveedorCargoReducer = ( state = initialState, action = { payload, type} ) => {

    switch ( action.type ) {

        case Strings.proveedorcargo_onChange:
            state = Object.assign( {}, action.payload );
            return state;

        case Strings.proveedorcargo_onCreate:
            cleanObejct( state );
            state.idproveedorcargo = action.payload.idproveedorcargo;
            state.loading = false;
            state = Object.assign( {}, state );
            return state;

        case Strings.proveedorcargo_onEditar:
            onSetData( state, action.payload.proveedorcargo );
            state.loading = false;
            state = Object.assign( {}, state );
            return state;

        case Strings.proveedorcargo_onShow:
            onSetData( state, action.payload.proveedorcargo );
            state.loading = false;
            state = Object.assign( {}, state );
            return state;

        case Strings.proveedorcargo_setLoad:
            cleanObejct( state );
            state.loading = true;
            state = Object.assign( {}, state );
            return state;

        case Strings.proveedorcargo_setLimpiar:
            cleanObejct( state );
            state = Object.assign( {}, state );
            return state;

        case Strings.proveedorcargo_setState:
            cleanObejct( state );
            onSetData( state, action.payload );
            state = Object.assign( {}, state );
            return state;

        case Strings.proveedorcargo_setImprimir: 
            return {
                ...state,
                reporte: action.payload,
            };

        case Strings.proveedorcargo_onFocus:
            state.focusInput = true;
            state = Object.assign( {}, state );
            return state;

        case Strings.proveedorcargo_offFocus:
            state.focusInput = false;
            state = Object.assign( {}, state );
            return state;
    
        default:
            return state;
    }
};

function onSetData( state, payload ) {
    state.idproveedorcargo   = payload.idproveedorcargo;
    
    state.codigo = payload.codigo;
    state.abreviatura = payload.abreviatura;
    state.descripcion = payload.descripcion;
}  
