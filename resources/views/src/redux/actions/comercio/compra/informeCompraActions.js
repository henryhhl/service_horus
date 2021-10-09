
import { Strings } from "../../../constants";
import { InformeCompraServices } from "../../../services/comercio/compra/informeCompraServices";

import { removeLoading, setLoading } from "../../config/loadingActions";

const onLimpiar = ( ) => ( {
    type: Strings.informecompra_setLimpiar,
} );

const onChange = ( data ) => ( {
    type: Strings.informecompra_onChange,
    payload: data,
} );

const setImprimir = ( data ) => ( {
    type: Strings.informecompra_setImprimir,
    payload: data,
} );

const setInit = ( ) => ( {
    type: Strings.informecompra_setInit,
} );

const onLoad = ( ) => ( {
    type: Strings.informecompra_setLoad,
} );

const initData = ( ) => {
    return ( dispatch ) => {
        dispatch( setInit() );
    };
};

const onImprimir = ( ) => {
    return async ( dispatch ) => {
        await dispatch( setLoading() );
        return await InformeCompraServices.onImprimir().then( async (result) => {
            if ( result.response == 1 ) {
                await dispatch( setImprimir( result ) );
            }
            return result;
        } ) . finally ( () => {
            dispatch( removeLoading() );
        });
    };
};

export const informeCompraActions = {
    initData,
    onChange,
    onImprimir,
};
