
import { Functions } from "../../../utils/functions";
import { Strings } from "../../constants";


const initialState = {
    visible: false,
    checked: {
        xls: true,
        xlsx: false,
        csv: false,
        pdf: false,
    },
};

export const ArhivoOptionReducer = ( state = initialState, action = { payload } ) => {

    switch ( action.type ) {
        
        case Strings.setArchivoOption:
            state = Object.assign( {}, action.payload );
            return state;

        case Strings.resetArchivoOption: 
            Functions.cleanObejct( state );
            state.checked.xlsx = true;
            state = Object.assign( {}, state );
            return state;

        default:
            return state;
    }
};

