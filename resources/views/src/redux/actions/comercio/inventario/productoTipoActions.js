
import { C_Message } from "../../../../components";

import { Strings } from "../../../constants";
import { productoTipoServices } from "../../../services/comercio/inventario/productoTipoServices";

import { disabledActions } from "../../config/disabledActions";
import { removeLoading, setLoading } from "../../config/loadingActions";
import { paginationActions } from "../../config/paginationActions";

const onLimpiar = ( ) => ( {
    type: Strings.productotipo_setLimpiar,
} );

const setState = ( data ) => ( {
    type: Strings.productotipo_setState,
    payload: data,
} );

const onChange = ( data ) => ( {
    type: Strings.productotipo_onChange,
    payload: data,
} );

const setIDProductoTipo = ( idproductotipo ) => ( {
    type:    Strings.productotipo_onCreate,
    payload: idproductotipo,
} );

const onFocus = ( ) => ( {
    type: Strings.productotipo_onFocus,
} );

const offFocus = ( ) => ( {
    type: Strings.productotipo_offFocus,
} );

const setImprimir = ( data ) => ( {
    type: Strings.productotipo_setImprimir,
    payload: data,
} );

const initData = ( ) => {
    return async ( dispatch ) => {

        await dispatch( onFocus() );
        await dispatch( paginationActions.removePagination() );
        await dispatch( disabledActions.onLimpiar() );
        await dispatch( onLimpiar() );

        productoTipoServices.getData( ).then ( ( result ) => {
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

        productoTipoServices.getData( page ).then ( async ( result ) => {
            if ( result.response == 1 ) {
                let obj = {
                    pagination: result.pagination,
                    pagina: page,
                };
                await dispatch( disabledActions.onAction() );
                await dispatch( paginationActions.setPagination( obj ) );
                await dispatch( setState( result.productotipo[0] ) );
            }
        } );

    };
};

const onCreate = ( ) => {
    return ( dispatch ) => {
        dispatch( setLoading() );

        productoTipoServices.onCreate().then( ( result ) => {
            if ( result.response == 1 ) {
                dispatch( setIDProductoTipo( result.idproductotipo ) );
                dispatch( disabledActions.onCreate() );
            }
        } ) . finally ( () => {
            dispatch( removeLoading() );
        } );
    };
};

const onGrabar = ( productoTipo ) => {
    return ( dispatch ) => {
        if ( !onValidate( productoTipo ) ) {
            dispatch( onChange( productoTipo ) );
            return;
        }
        dispatch( setLoading() );

        productoTipoServices.onGrabar( productoTipo ).then( (result) => {
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

const onEditar = ( productoTipo ) => {
    return ( dispatch ) => {
        dispatch( disabledActions.onEditar() );
        productoTipo.update = true;
        dispatch( onChange( productoTipo ) );
    };
};

const onUpdate = ( productoTipo ) => {
    return ( dispatch ) => {
        if ( !onValidate( productoTipo ) ) {
            dispatch( onChange( productoTipo ) );
            return;
        }
        dispatch( setLoading() );

        productoTipoServices.onUpdate( productoTipo ).then( (result) => {
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

const onDelete = ( productoTipo ) => {
    return ( dispatch ) => {
        dispatch( setLoading() );

        productoTipoServices.onDelete( productoTipo ).then( (result) => {

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

const onSearchData = ( productoTipo ) => {
    return ( dispatch ) => {
        dispatch( setLoading() );

        productoTipoServices.onSearchData( productoTipo ).then( (result) => {
            if ( result.response == 1 ) {
                dispatch( disabledActions.onAction() );
                dispatch( setState( result.productotipo ) );
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
        return await productoTipoServices.onImprimir().then( async (result) => {
            if ( result.response == 1 ) {
                await dispatch( setImprimir( result ) );
            }
            return result;
        } ) . finally ( () => {
            dispatch( removeLoading() );
        });
    };
};

function onValidate( productoTipo ) {
    const { abreviatura, descripcion } = productoTipo;
    let bandera = true;
    if ( descripcion.toString().trim().length === 0 ) {
        productoTipo.error.descripcion   = true;
        productoTipo.message.descripcion = "Campo requerido";
        bandera = false;
    }
    if ( descripcion.toString().length > 200 ) {
        productoTipo.error.descripcion   = true;
        productoTipo.message.descripcion = "Se permite máximo 200 caracteres";
        bandera = false;
    }
    if ( abreviatura?.toString().length > 50 ) {
        productoTipo.error.abreviatura   = true;
        productoTipo.message.abreviatura = "Se permite máximo 50 caracteres";
        bandera = false;
    }
    if ( !bandera ) {
        C_Message( "error", "Problemas al registrar" );
    }
    return bandera;
};

export const productoTipoActions = {
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
