
import { Strings } from "../../constants";

const setData = ( option ) => ( {
    type: Strings.setPrintOption,
    payload: option,
} );

const reset = () => ( {
    type: Strings.resetPrintOption,
} );

export const printOptionActions = {
    setData,
    reset,
};

