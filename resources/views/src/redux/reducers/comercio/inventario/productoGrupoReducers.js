
import { Functions } from '../../../../utils/functions';
import { Strings } from '../../../constants';

const { cleanObejct } = Functions;

const initialState = {

    focusInput: false,
    update: false,
    imprimir: false,

    idproductogrupo: "",
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
        arrayProductoGrupo: [],
        fecha: "",
        hora: "",
    },
};

export const ProductoGrupoReducer = ( state = initialState, action = { payload, type} ) => {

    switch ( action.type ) {

        case Strings.productogrupo_onChange:
            state = Object.assign( {}, action.payload );
            return state;

        case Strings.productogrupo_onCreate:
            cleanObejct( state );
            state.idproductogrupo = action.payload;
            state = Object.assign( {}, state );
            return state;

        case Strings.productogrupo_setLimpiar:
            cleanObejct( state );
            state = Object.assign( {}, state );
            return state;

        case Strings.productogrupo_setState:
            cleanObejct( state );
            onSetData( state, action.payload );
            state = Object.assign( {}, state );
            return state;

        case Strings.productogrupo_setImprimir: 
            return {
                ...state,
                reporte: action.payload,
            };

        case Strings.productogrupo_onFocus:
            state.focusInput = true;
            state = Object.assign( {}, state );
            return state;

        case Strings.productogrupo_offFocus:
            state.focusInput = false;
            state = Object.assign( {}, state );
            return state;
    
        default:
            return state;
    }
};

function onSetData( state, payload ) {
    state.idproductogrupo = payload.idproductogrupo;
    state.abreviatura     = payload.abreviatura;
    state.descripcion     = payload.descripcion;
    state.imagen          = payload.imagen;
    state.extension       = payload.extension;
}
