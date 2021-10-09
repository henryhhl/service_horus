
import { Functions } from '../../../../utils/functions';
import { Strings } from '../../../constants';

const { cleanObejct } = Functions;

const initialState = {

    focusInput: false,
    update: false,
    imprimir: false,

    idproductosubgrupo: "",
    fkidproductogrupo: "",
    productogrupo: "",
    abreviatura: "",
    codigo: "",
    descripcion: "",
    imagen: "",
    extension: "",
    estado: "",
    fecha: "",
    hora: "",

    error: {
        fkidproductogrupo: false,
        abreviatura: false,
        descripcion: false,
    },
    message: {
        fkidproductogrupo: "",
        abreviatura: "",
        descripcion: "",
    },

    reporte: {
        arrayProductoSubGrupo: [],
        fecha: "",
        hora: "",
    },
};

export const ProductoSubGrupoReducer = ( state = initialState, action = { payload, type} ) => {

    switch ( action.type ) {

        case Strings.productosubgrupo_onChange:
            state = Object.assign( {}, action.payload );
            return state;

        case Strings.productosubgrupo_onCreate:
            cleanObejct( state );
            state.idproductosubgrupo = action.payload;
            state = Object.assign( {}, state );
            return state;

        case Strings.productosubgrupo_setLimpiar:
            cleanObejct( state );
            state = Object.assign( {}, state );
            return state;

        case Strings.productosubgrupo_setState:
            cleanObejct( state );
            onSetData( state, action.payload );
            state = Object.assign( {}, state );
            return state;

        case Strings.productosubgrupo_setImprimir: 
            return {
                ...state,
                reporte: action.payload,
            };

        case Strings.productosubgrupo_onFocus:
            state.focusInput = true;
            state = Object.assign( {}, state );
            return state;

        case Strings.productosubgrupo_offFocus:
            state.focusInput = false;
            state = Object.assign( {}, state );
            return state;
    
        default:
            return state;
    }
};

function onSetData( state, payload ) {
    state.idproductosubgrupo = payload.idproductosubgrupo;
    state.fkidproductogrupo  = payload.fkidproductogrupo;
    state.productogrupo      = payload.productogrupo;
    state.abreviatura     = payload.abreviatura;
    state.descripcion     = payload.descripcion;
    state.imagen          = payload.imagen;
    state.extension       = payload.extension;
}
