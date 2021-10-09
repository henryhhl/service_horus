
import { Strings } from "../../constants";

export const setLoading = ( ) => ( {
    type: Strings.setLoading,
} );

export const removeLoading = ( ) => ( {
    type: Strings.removeLoading,
} );

export const loadingActions = {
    setLoading,
    removeLoading,
};
