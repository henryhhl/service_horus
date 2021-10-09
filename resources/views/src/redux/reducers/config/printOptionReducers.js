
import { Functions } from "../../../utils/functions";
import { Strings } from "../../constants";

const initialState = {
    visible: false,
    checked: {
        pantalla: true,
        impresora: false,
        archivo: false,
    },
};

export const PrintOptionReducer = ( state = initialState, action = { payload } ) => {

    switch ( action.type ) {
        
        case Strings.setPrintOption:
            state = Object.assign( {}, action.payload );
            return state;

        case Strings.resetPrintOption: 
            Functions.cleanObejct( state );
            state.checked.pantalla = true;
            state = Object.assign( {}, state );
            return state;

        default:
            return state;
    }
};

