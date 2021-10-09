
import { C_Message } from "../../../../components";

import { Strings } from "../../../constants";

import { productoGrupoServices } from "../../../services/comercio/inventario/productoGrupoServices";

import { disabledActions } from "../../config/disabledActions";
import { removeLoading, setLoading } from "../../config/loadingActions";
import { paginationActions } from "../../config/paginationActions";

const onLimpiar = ( ) => ( {
    type: Strings.productogrupo_setLimpiar,
} );

const setState = ( data ) => ( {
    type: Strings.productogrupo_setState,
    payload: data,
} );

const onChange = ( data ) => ( {
    type: Strings.productogrupo_onChange,
    payload: data,
} );

const setIDProductoGrupo = ( idproductogrupo ) => ( {
    type:    Strings.productogrupo_onCreate,
    payload: idproductogrupo,
} );

const onFocus = ( ) => ( {
    type: Strings.productogrupo_onFocus,
} );

const offFocus = ( ) => ( {
    type: Strings.productogrupo_offFocus,
} );

const setImprimir = ( data ) => ( {
    type: Strings.productogrupo_setImprimir,
    payload: data,
} );

const initData = ( ) => {
    return async ( dispatch ) => {

        await dispatch( onFocus() );
        await dispatch( paginationActions.removePagination() );
        await dispatch( disabledActions.onLimpiar() );
        await dispatch( onLimpiar() );

        productoGrupoServices.getData( ).then ( ( result ) => {
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

        productoGrupoServices.getData( page ).then ( async ( result ) => {
            if ( result.response == 1 ) {
                let obj = {
                    pagination: result.pagination,
                    pagina: page,
                };
                await dispatch( disabledActions.onAction() );
                await dispatch( paginationActions.setPagination( obj ) );
                await dispatch( setState( result.productogrupo[0] ) );
            }
        } );

    };
};

const onCreate = ( ) => {
    return ( dispatch ) => {
        dispatch( setLoading() );

        productoGrupoServices.onCreate().then( ( result ) => {
            if ( result.response == 1 ) {
                dispatch( setIDProductoGrupo( result.idproductogrupo ) );
                dispatch( disabledActions.onCreate() );
            }
        } ) . finally ( () => {
            dispatch( removeLoading() );
        } );
    };
};

const onGrabar = ( productogrupo ) => {
    return ( dispatch ) => {
        if ( !onValidate( productogrupo ) ) {
            dispatch( onChange( productogrupo ) );
            return;
        }
        dispatch( setLoading() );

        productoGrupoServices.onGrabar( productogrupo ).then( (result) => {
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

const onEditar = ( productogrupo ) => {
    return ( dispatch ) => {
        dispatch( disabledActions.onEditar() );
        productogrupo.update = true;
        dispatch( onChange( productogrupo ) );
    };
};

const onUpdate = ( productogrupo ) => {
    return ( dispatch ) => {
        if ( !onValidate( productogrupo ) ) {
            dispatch( onChange( productogrupo ) );
            return;
        }
        dispatch( setLoading() );

        productoGrupoServices.onUpdate( productogrupo ).then( (result) => {
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

const onDelete = ( productogrupo ) => {
    return ( dispatch ) => {
        dispatch( setLoading() );

        productoGrupoServices.onDelete( productogrupo ).then( (result) => {

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

const onSearchData = ( productogrupo ) => {
    return ( dispatch ) => {
        dispatch( setLoading() );

        productoGrupoServices.onSearchData( productogrupo ).then( (result) => {
            if ( result.response == 1 ) {
                dispatch( disabledActions.onAction() );
                dispatch( setState( result.productogrupo ) );
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
        return await productoGrupoServices.onImprimir().then( async (result) => {
            if ( result.response == 1 ) {
                await dispatch( setImprimir( result ) );
            }
            return result;
        } ) . finally ( () => {
            dispatch( removeLoading() );
        });
    };
};

function onValidate( productogrupo ) {
    const { abreviatura, descripcion } = productogrupo;
    let bandera = true;
    if ( descripcion.toString().trim().length === 0 ) {
        productogrupo.error.descripcion   = true;
        productogrupo.message.descripcion = "Campo requerido";
        bandera = false;
    }
    if ( descripcion.toString().length > 200 ) {
        productogrupo.error.descripcion   = true;
        productogrupo.message.descripcion = "Se permite máximo 200 caracteres";
        bandera = false;
    }
    if ( abreviatura?.toString().length > 50 ) {
        productogrupo.error.abreviatura   = true;
        productogrupo.message.abreviatura = "Se permite máximo 50 caracteres";
        bandera = false;
    }
    if ( !bandera ) {
        C_Message( "error", "Problemas al registrar" );
    }
    return bandera;
};

export const productoGrupoActions = {
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
