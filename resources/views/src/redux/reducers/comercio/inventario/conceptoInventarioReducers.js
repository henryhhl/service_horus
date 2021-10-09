
import { Functions } from '../../../../utils/functions';
import { Strings } from '../../../constants';

const { cleanObejct } = Functions;

const initialState = {

    focusInput: false,
    update: false,
    imprimir: false,
    loading:  false,

    idconceptoinventario: "",
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
        arrayConceptoInventario: [],
        fecha: "",
        hora:  "",
    },
};

export const ConceptoInventarioReducer = ( state = initialState, action = { payload, type} ) => {

    switch ( action.type ) {

        case Strings.conceptoinventario_onChange:
            state = Object.assign( {}, action.payload );
            return state;

        case Strings.conceptoinventario_onCreate:
            cleanObejct( state );
            state.idconceptoinventario = action.payload.idconceptoinventario;
            state.loading = false;
            state = Object.assign( {}, state );
            return state;

        case Strings.conceptoinventario_onEditar:
            onSetData( state, action.payload.conceptoinventario );
            state.loading = false;
            state = Object.assign( {}, state );
            return state;

        case Strings.conceptoinventario_onShow:
            onSetData( state, action.payload.conceptoinventario );
            state.loading = false;
            state = Object.assign( {}, state );
            return state;

        case Strings.conceptoinventario_setLoad:
            cleanObejct( state );
            state.loading = true;
            state = Object.assign( {}, state );
            return state;

        case Strings.conceptoinventario_setLimpiar:
            cleanObejct( state );
            state = Object.assign( {}, state );
            return state;

        case Strings.conceptoinventario_setState:
            cleanObejct( state );
            onSetData( state, action.payload );
            state = Object.assign( {}, state );
            return state;

        case Strings.conceptoinventario_setImprimir: 
            return {
                ...state,
                reporte: action.payload,
            };

        case Strings.conceptoinventario_onFocus:
            state.focusInput = true;
            state = Object.assign( {}, state );
            return state;

        case Strings.conceptoinventario_offFocus:
            state.focusInput = false;
            state = Object.assign( {}, state );
            return state;
    
        default:
            return state;
    }
};

function onSetData( state, payload ) {
    state.idconceptoinventario   = payload.idconceptoinventario;
    
    state.descripcion = payload.descripcion;
}  
