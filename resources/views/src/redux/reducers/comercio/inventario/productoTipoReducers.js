
import { Functions } from '../../../../utils/functions';
import { Strings } from '../../../constants';

const { cleanObejct } = Functions;

const initialState = {

    focusInput: false,
    update: false,
    imprimir: false,

    idproductotipo: "",
    abreviatura: "",
    codigo: "",
    descripcion: "",
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
        arrayProductoTipo: [],
        fecha: "",
        hora: "",
    },
};

export const ProductoTipoReducer = ( state = initialState, action = { payload, type} ) => {

    switch ( action.type ) {

        case Strings.productotipo_onChange:
            state = Object.assign( {}, action.payload );
            return state;

        case Strings.productotipo_onCreate:
            cleanObejct( state );
            state.idproductotipo = action.payload;
            state = Object.assign( {}, state );
            return state;

        case Strings.productotipo_setLimpiar:
            cleanObejct( state );
            state = Object.assign( {}, state );
            return state;

        case Strings.productotipo_setState:
            cleanObejct( state );
            onSetData( state, action.payload );
            state = Object.assign( {}, state );
            return state;

        case Strings.productotipo_setImprimir: 
            return {
                ...state,
                reporte: action.payload,
            };

        case Strings.productotipo_onFocus:
            state.focusInput = true;
            state = Object.assign( {}, state );
            return state;

        case Strings.productotipo_offFocus:
            state.focusInput = false;
            state = Object.assign( {}, state );
            return state;
    
        default:
            return state;
    }
};

function onSetData( state, payload ) {
    state.idproductotipo = payload.idproductotipo;
    state.abreviatura    = payload.abreviatura;
    state.descripcion    = payload.descripcion;
}
