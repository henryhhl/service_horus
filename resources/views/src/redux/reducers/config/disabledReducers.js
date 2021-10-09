
import { Strings } from "../../constants";

const initialState = {
    iddata: false,
    data:   true,

    btnnuevo:     false,
    btngrabar:    true,
    btnmodificar: true,
    btnbuscar:    false,
    btneliminar:  true,
    btncancelar:  true,
    btnimprimir:  false,
};

export const DisabledReducer = ( state = initialState, action ) => {

    switch ( action.type ) {

        case Strings.setDisabledCreate:
            state = Object.assign( {}, onAction() );
            return state;

        case Strings.setDisabledEditar:
            state = Object.assign( {}, onAction() );
            return state;

        case Strings.setDisabledLimpiar:
            state = Object.assign( {}, onLimpiar() );
            return state;

        case Strings.setDisabledAction:
            state = Object.assign( {}, onState() );
            return state;

        default:
            return state;
    }

    function onLimpiar() {
        return {
            iddata: false,
            data:   true,
    
            btnnuevo:     false,
            btngrabar:    true,
            btnmodificar: true,
            btnbuscar:    false,
            btneliminar:  true,
            btncancelar:  true,
            btnimprimir:  false,
        };
    }

    function onAction() {
        return {
            btnnuevo    : true,
            btngrabar   : false,
            btnmodificar: true,
            btnbuscar   : true,
            btneliminar : true,
            btncancelar : false,
            btnimprimir : true,
            btnterminar : true,
        
            data   : false,
            iddata : true,
        };
    }

    function onState() {
        return {
            btnnuevo    : false,
            btngrabar   : true,
            btnmodificar: false,
            btnbuscar   : false,
            btneliminar : false,
            btncancelar : true,
            btnimprimir : false,
            btnterminar : false,
        
            data   : true,
            iddata : false,
        };
    };

};
