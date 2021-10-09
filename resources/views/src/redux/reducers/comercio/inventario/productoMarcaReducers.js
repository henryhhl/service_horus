
import { Functions } from '../../../../utils/functions';
import { Strings } from '../../../constants';

const { cleanObejct } = Functions;

const initialState = {

    focusInput: false,
    update: false,
    imprimir: false,

    idproductomarca: "",
    abreviatura: "",
    codigo: "",
    descripcion: "",
    imagen: "",
    extension: "",
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
        arrayProductoMarca: [],
        fecha: "",
        hora: "",
    },
};

export const ProductoMarcaReducer = ( state = initialState, action = { payload, type} ) => {

    switch ( action.type ) {

        case Strings.productomarca_onChange:
            state = Object.assign( {}, action.payload );
            return state;

        case Strings.productomarca_onCreate:
            cleanObejct( state );
            state.idproductomarca = action.payload;
            state = Object.assign( {}, state );
            return state;

        case Strings.productomarca_setLimpiar:
            cleanObejct( state );
            state = Object.assign( {}, state );
            return state;

        case Strings.productomarca_setState:
            cleanObejct( state );
            onSetData( state, action.payload );
            state = Object.assign( {}, state );
            return state;

        case Strings.productomarca_setImprimir: 
            return {
                ...state,
                reporte: action.payload,
            };

        case Strings.productomarca_onFocus:
            state.focusInput = true;
            state = Object.assign( {}, state );
            return state;

        case Strings.productomarca_offFocus:
            state.focusInput = false;
            state = Object.assign( {}, state );
            return state;
    
        default:
            return state;
    }
};

function onSetData( state, payload ) {
    state.idproductomarca = payload.idproductomarca;
    state.abreviatura     = payload.abreviatura;
    state.descripcion     = payload.descripcion;
    state.imagen          = payload.imagen;
    state.extension       = payload.extension;
}
