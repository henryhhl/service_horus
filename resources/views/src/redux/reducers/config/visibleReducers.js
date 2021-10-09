
import { Strings } from '../../constants';

const initialState = {
    visible_notaingreso:  false,
    visible_notasalida:   false,
    visible_notatraspaso: false,

    visible_marca:    false,
    visible_producto: false,
    visible_ciudad:   false,
    visible_ciudadclasificacion: false,
};

export const VisibleReducer = ( state = initialState, action = { payload, type } ) => {

    switch ( action.type ) {
        
        case Strings.showNotaIngreso: 
            return {
                ...state,
                visible_notaingreso: true,
            };
        case Strings.hideNotaIngreso: 
            return {
                ...state,
                visible_notaingreso: false,
            };


        case Strings.showNotaSalida: 
            return {
                ...state,
                visible_notasalida: true,
            };
        case Strings.hideNotaSalida: 
            return {
                ...state,
                visible_notasalida: false,
            };


        case Strings.showNotaTraspaso: 
            return {
                ...state,
                visible_notatraspaso: true,
            };
        case Strings.hideNotaTraspaso: 
            return {
                ...state,
                visible_notatraspaso: false,
            };


        case Strings.showMarca: 
            return {
                ...state,
                visible_marca: true,
            };
        case Strings.hideMarca: 
            return {
                ...state,
                visible_marca: false,
            };


        case Strings.showProducto: 
            return {
                ...state,
                visible_producto: true,
            };
        case Strings.hideProducto: 
            return {
                ...state,
                visible_producto: false,
            };


        case Strings.showCiudad: 
            return {
                ...state,
                visible_ciudad: true,
            };
        case Strings.hideCiudad: 
            return {
                ...state,
                visible_ciudad: false,
            };


        case Strings.showCiudadClasificacion: 
            return {
                ...state,
                visible_ciudadclasificacion: true,
            };
        case Strings.hideCiudadClasificacion: 
            return {
                ...state,
                visible_ciudadclasificacion: false,
            };
    
        default:
            return state;
    }

};
