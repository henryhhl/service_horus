
import { Functions } from '../../../../utils/functions';
import { Strings } from '../../../constants';

const { cleanObejct } = Functions;

const initialState = {

    focusInput: false,
    update: false,
    imprimir: false,
    loading:  false,

    idconceptoventa: "",
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
        arrayConceptoVenta: [],
        fecha: "",
        hora:  "",
    },
};

export const ConceptoVentaReducer = ( state = initialState, action = { payload, type} ) => {

    switch ( action.type ) {

        case Strings.conceptoventa_onChange:
            state = Object.assign( {}, action.payload );
            return state;

        case Strings.conceptoventa_onCreate:
            cleanObejct( state );
            state.idconceptoventa = action.payload.idconceptoventa;
            state.loading = false;
            state = Object.assign( {}, state );
            return state;

        case Strings.conceptoventa_onEditar:
            onSetData( state, action.payload.conceptoventa );
            state.loading = false;
            state = Object.assign( {}, state );
            return state;

        case Strings.conceptoventa_onShow:
            onSetData( state, action.payload.conceptoventa );
            state.loading = false;
            state = Object.assign( {}, state );
            return state;

        case Strings.conceptoventa_setLoad:
            cleanObejct( state );
            state.loading = true;
            state = Object.assign( {}, state );
            return state;

        case Strings.conceptoventa_setLimpiar:
            cleanObejct( state );
            state = Object.assign( {}, state );
            return state;

        case Strings.conceptoventa_setState:
            cleanObejct( state );
            onSetData( state, action.payload );
            state = Object.assign( {}, state );
            return state;

        case Strings.conceptoventa_setImprimir: 
            return {
                ...state,
                reporte: action.payload,
            };

        case Strings.conceptoventa_onFocus:
            state.focusInput = true;
            state = Object.assign( {}, state );
            return state;

        case Strings.conceptoventa_offFocus:
            state.focusInput = false;
            state = Object.assign( {}, state );
            return state;
    
        default:
            return state;
    }
};

function onSetData( state, payload ) {
    state.idconceptoventa   = payload.idconceptoventa;
    
    state.codigo = payload.codigo;
    state.abreviatura = payload.abreviatura;
    state.descripcion = payload.descripcion;

    state.imagen = payload.imagen;
    state.extension = payload.extension;
}  
