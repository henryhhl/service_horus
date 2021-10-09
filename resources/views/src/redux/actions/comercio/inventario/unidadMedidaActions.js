
import { C_Message } from "../../../../components";

import { Strings } from "../../../constants";
import { unidadMedidaServices } from "../../../services/comercio/inventario/unidadMedidaServices";

import { disabledActions } from "../../config/disabledActions";
import { removeLoading, setLoading } from "../../config/loadingActions";
import { paginationActions } from "../../config/paginationActions";

const onLimpiar = ( ) => ( {
    type: Strings.unidadmedida_setLimpiar,
} );

const setState = ( data ) => ( {
    type: Strings.unidadmedida_setState,
    payload: data,
} );

const onChange = ( data ) => ( {
    type: Strings.unidadmedida_onChange,
    payload: data,
} );

const setIDUnidadMedida = ( idunidadmedida ) => ( {
    type:    Strings.unidadmedida_onCreate,
    payload: idunidadmedida,
} );

const onFocus = ( ) => ( {
    type: Strings.unidadmedida_onFocus,
} );

const offFocus = ( ) => ( {
    type: Strings.unidadmedida_offFocus,
} );

const setImprimir = ( data ) => ( {
    type: Strings.unidadmedida_setImprimir,
    payload: data,
} );

const initData = ( ) => {
    return async ( dispatch ) => {

        await dispatch( onFocus() );
        await dispatch( paginationActions.removePagination() );
        await dispatch( disabledActions.onLimpiar() );
        await dispatch( onLimpiar() );

        unidadMedidaServices.getData( ).then ( ( result ) => {
            if ( result.response == 1 ) {
                let obj = {
                    pagination: result.pagination,
                    pagina: 0,
                };
                dispatch( paginationActions.setPagination( obj ) );
            }
        } );
    };
};

const onChangePage = ( page ) => {
    return ( dispatch ) => {

        unidadMedidaServices.getData( page ).then ( async ( result ) => {
            if ( result.response == 1 ) {
                let obj = {
                    pagination: result.pagination,
                    pagina: page,
                };
                await dispatch( disabledActions.onAction() );
                await dispatch( paginationActions.setPagination( obj ) );
                await dispatch( setState( result.unidadmedida[0] ) );
            }
        } );

    };
};

const onCreate = ( ) => {
    return ( dispatch ) => {
        dispatch( setLoading() );

        unidadMedidaServices.onCreate().then( ( result ) => {
            if ( result.response == 1 ) {
                dispatch( setIDUnidadMedida( result.idunidadmedida ) );
                dispatch( disabledActions.onCreate() );
            }
        } ) . finally ( () => {
            dispatch( removeLoading() );
        } );
    };
};

const onGrabar = ( unidadmedida ) => {
    return ( dispatch ) => {
        if ( !onValidate( unidadmedida ) ) {
            dispatch( onChange( unidadmedida ) );
            return;
        }
        dispatch( setLoading() );

        unidadMedidaServices.onGrabar( unidadmedida ).then( (result) => {
            if ( result.response == 0 ) {
                dispatch( onChange( result.resultData ) );
            }
            if ( result.response == 1 ) {
                dispatch( initData() );
            }
        } ) . finally ( () => {
            dispatch( removeLoading() );
        } );
    };
};

const onEditar = ( unidadmedida ) => {
    return ( dispatch ) => {
        dispatch( disabledActions.onEditar() );
        unidadmedida.update = true;
        dispatch( onChange( unidadmedida ) );
    };
};

const onUpdate = ( unidadmedida ) => {
    return ( dispatch ) => {
        if ( !onValidate( unidadmedida ) ) {
            dispatch( onChange( unidadmedida ) );
            return;
        }
        dispatch( setLoading() );

        unidadMedidaServices.onUpdate( unidadmedida ).then( (result) => {
            if ( result.response == 0 ) {
                dispatch( onChange( result.resultData ) );
            }
            if ( result.response == 1 ) {
                dispatch( initData() );
            }
        } ) . finally ( () => {
            dispatch( removeLoading() );
        } );
    };
};

const onDelete = ( unidadmedida ) => {
    return ( dispatch ) => {
        dispatch( setLoading() );

        unidadMedidaServices.onDelete( unidadmedida ).then( (result) => {

            if ( result.response == 1 ) {
                dispatch( initData() );
            }

        } ) . finally ( () => {
            dispatch( removeLoading() );
        } );
    };
};

const onSearch = ( ) => {
    return async ( dispatch ) => {
        await dispatch( disabledActions.onLimpiar() );
        await dispatch( onLimpiar() );
        await dispatch( onFocus() );
        setTimeout( () => {
            dispatch( offFocus() );
        }, 1000 );
    };
};

const onSearchData = ( unidadmedida ) => {
    return ( dispatch ) => {
        dispatch( setLoading() );

        unidadMedidaServices.onSearchData( unidadmedida ).then( (result) => {
            if ( result.response == 1 ) {
                dispatch( disabledActions.onAction() );
                dispatch( setState( result.unidadmedida ) );
            }
        } ) . finally ( () => {
            dispatch( removeLoading() );
        } );
    };
};

const onCancelar = ( ) => {
    return ( dispatch ) => {
        dispatch( initData() );
    };
};

const onImprimir = ( ) => {
    return async ( dispatch ) => {
        await dispatch( setLoading() );
        return await unidadMedidaServices.onImprimir().then( async (result) => {
            if ( result.response == 1 ) {
                await dispatch( setImprimir( result ) );
            }
            return result;
        } ) . finally ( () => {
            dispatch( removeLoading() );
        });
    };
};

function onValidate( unidadmedida ) {
    const { abreviatura, descripcion } = unidadmedida;
    let bandera = true;
    if ( descripcion.toString().trim().length === 0 ) {
        unidadmedida.error.descripcion   = true;
        unidadmedida.message.descripcion = "Campo requerido";
        bandera = false;
    }
    if ( descripcion.toString().length > 200 ) {
        unidadmedida.error.descripcion   = true;
        unidadmedida.message.descripcion = "Se permite máximo 200 caracteres";
        bandera = false;
    }
    if ( abreviatura?.toString().length > 50 ) {
        unidadmedida.error.abreviatura   = true;
        unidadmedida.message.abreviatura = "Se permite máximo 50 caracteres";
        bandera = false;
    }
    if ( !bandera ) {
        C_Message( "error", "Problemas al registrar" );
    }
    return bandera;
};

export const unidadMedidaActions = {
    initData,
    onChangePage,
    onChange,
    setState,

    onCreate,
    onGrabar,
    onEditar,
    onUpdate,
    onDelete,
    onImprimir,

    onSearch,
    onSearchData,

    onCancelar,
};
