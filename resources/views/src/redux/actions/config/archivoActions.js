
import { Strings } from "../../constants";

const setData = ( option ) => ( {
    type: Strings.setArchivoOption,
    payload: option,
} );

const reset = () => ( {
    type: Strings.resetArchivoOption,
} );

export const archivoOptionActions = {
    setData,
    reset,
};

