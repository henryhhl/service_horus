import { Strings } from "../../constants";


const initialState = {
    visible: false,
};

export const LoadingReducer = ( state = initialState, action ) => {

    switch ( action.type ) {
        
        case Strings.setLoading:
            state = Object.assign( {}, { visible: true, } );
            return state;

        case Strings.removeLoading:
            state = Object.assign( {}, { visible: false, } );
            return state;
    
        default:
            return state;
    }

};

