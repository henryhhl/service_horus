
import { Strings } from "../../constants";

const initialState = {
    pagination: { 
        'total': 0, 'current_page': 0,
        'per_page': 0, 'last_page': 0,
        'from': 0, 'to': 0,
    },
    page: 0,
};

export const PaginationReducers = ( state = initialState, action ) => {

    switch ( action.type ) {
        
        case Strings.setPagination:
            state = Object.assign( {}, action.payload );
            return state;

        case Strings.removePagintion:
            state = Object.assign( {}, onLimpiar() );
            return state;

        default:
            return state;
    }

};

function onLimpiar() {
    return {
        pagination: { 
            'total': 0, 'current_page': 0,
            'per_page': 0, 'last_page': 0,
            'from': 0, 'to': 0,
        },
        pagina: 0,
    };
}
