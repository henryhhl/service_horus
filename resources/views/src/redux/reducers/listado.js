import { Strings } from '../constants';

const initialState = {
    array_ciudad:  [],
};

export const ListadoModuleReducer = ( state = initialState, action = { payload, type } ) => {

    switch ( action.type ) {
        
        case Strings.ciudad_setArray: 
            return {
                ...state,
                array_ciudad: action.payload,
            };
    
        default:
            return state;
    }

};
