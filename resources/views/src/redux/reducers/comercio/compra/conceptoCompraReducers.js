
import { Functions } from '../../../../utils/functions';
import { Strings } from '../../../constants';

const { cleanObejct } = Functions;

const initialState = {

    focusInput: false,
    update: false,
    imprimir: false,
    loading:  false,

    idconceptocompra: "",
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
        arrayConceptoCompra: [],
        fecha: "",
        hora:  "",
    },
};

export const ConceptoCompraReducer = ( state = initialState, action = { payload, type} ) => {

    switch ( action.type ) {

        case Strings.conceptocompra_onChange:
            state = Object.assign( {}, action.payload );
            return state;

        case Strings.conceptocompra_onCreate:
            cleanObejct( state );
            state.idconceptocompra = action.payload.idconceptocompra;
            state.loading = false;
            state = Object.assign( {}, state );
            return state;

        case Strings.conceptocompra_onEditar:
            onSetData( state, action.payload.conceptocompra );
            state.loading = false;
            state = Object.assign( {}, state );
            return state;

        case Strings.conceptocompra_onShow:
            onSetData( state, action.payload.conceptocompra );
            state.loading = false;
            state = Object.assign( {}, state );
            return state;

        case Strings.conceptocompra_setLoad:
            cleanObejct( state );
            state.loading = true;
            state = Object.assign( {}, state );
            return state;

        case Strings.conceptocompra_setLimpiar:
            cleanObejct( state );
            state = Object.assign( {}, state );
            return state;

        case Strings.conceptocompra_setState:
            cleanObejct( state );
            onSetData( state, action.payload );
            state = Object.assign( {}, state );
            return state;

        case Strings.conceptocompra_setImprimir: 
            return {
                ...state,
                reporte: action.payload,
            };

        case Strings.conceptocompra_onFocus:
            state.focusInput = true;
            state = Object.assign( {}, state );
            return state;

        case Strings.conceptocompra_offFocus:
            state.focusInput = false;
            state = Object.assign( {}, state );
            return state;
    
        default:
            return state;
    }
};

function onSetData( state, payload ) {
    state.idconceptocompra   = payload.idconceptocompra;
    
    state.descripcion = payload.descripcion;
}  
