
import { Functions } from '../../../../utils/functions';
import { Strings } from '../../../constants';

const { cleanObejct } = Functions;

const initialState = {

    focusInput: false,
    update: false,
    imprimir: false,

    treeCategoria: [],

    idcategoria: "",
    fkidcategoriapadre: "",
    categoriapadre: "",
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
        arrayCategoria: [],
        fecha: "",
        hora: "",
    },
};

export const CategoriaReducer = ( state = initialState, action = { payload, type} ) => {

    switch ( action.type ) {

        case Strings.categoria_onChange:
            state = Object.assign( {}, action.payload );
            return state;

        case Strings.categoria_onCreate:
            cleanObejct( state );
            state.idcategoria   = action.payload.idcategoria;
            state = Object.assign( {}, state );
            return state;

        case Strings.categoria_setLimpiar:
            cleanObejct( state );
            state = Object.assign( {}, state );
            return state;

        case Strings.categoria_setState:
            cleanObejct( state );
            onSetData( state, action.payload );
            state = Object.assign( {}, state );
            return state;

        case Strings.categoria_setImprimir: 
            return {
                ...state,
                reporte: action.payload,
            };

        case Strings.categoria_onFocus:
            state.focusInput = true;
            state = Object.assign( {}, state );
            return state;

        case Strings.categoria_offFocus:
            state.focusInput = false;
            state = Object.assign( {}, state );
            return state;
    
        default:
            return state;
    }
};

function onSetData( state, payload ) {
    state.idcategoria = payload.idcategoria;
    state.abreviatura = payload.abreviatura;
    state.descripcion = payload.descripcion;
    state.imagen      = payload.imagen;
    state.extension   = payload.extension;
    state.fkidcategoriapadre = payload.fkidcategoriapadre;
}
