
import { C_Message } from "../../../../components";

import { Strings } from "../../../constants";

import { productoSubGrupoServices } from "../../../services/comercio/inventario/productoSubGrupoServices";

import { disabledActions } from "../../config/disabledActions";
import { removeLoading, setLoading } from "../../config/loadingActions";
import { paginationActions } from "../../config/paginationActions";

const onLimpiar = ( ) => ( {
    type: Strings.productosubgrupo_setLimpiar,
} );

const setState = ( data ) => ( {
    type: Strings.productosubgrupo_setState,
    payload: data,
} );

const onChange = ( data ) => ( {
    type: Strings.productosubgrupo_onChange,
    payload: data,
} );

const setIDProductoSubGrupo = ( idproductosubgrupo ) => ( {
    type:    Strings.productosubgrupo_onCreate,
    payload: idproductosubgrupo,
} );

const onFocus = ( ) => ( {
    type: Strings.productosubgrupo_onFocus,
} );

const offFocus = ( ) => ( {
    type: Strings.productosubgrupo_offFocus,
} );

const setImprimir = ( data ) => ( {
    type: Strings.productosubgrupo_setImprimir,
    payload: data,
} );

const initData = ( ) => {
    return async ( dispatch ) => {

        await dispatch( onFocus() );
        await dispatch( paginationActions.removePagination() );
        await dispatch( disabledActions.onLimpiar() );
        await dispatch( onLimpiar() );

        productoSubGrupoServices.getData( ).then ( ( result ) => {
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

        productoSubGrupoServices.getData( page ).then ( async ( result ) => {
            if ( result.response == 1 ) {
                let obj = {
                    pagination: result.pagination,
                    pagina: page,
                };
                await dispatch( disabledActions.onAction() );
                await dispatch( paginationActions.setPagination( obj ) );
                await dispatch( setState( result.productosubgrupo[0] ) );
            }
        } );

    };
};

const onCreate = ( ) => {
    return ( dispatch ) => {
        dispatch( setLoading() );

        productoSubGrupoServices.onCreate().then( ( result ) => {
            if ( result.response == 1 ) {
                dispatch( setIDProductoSubGrupo( result.idproductosubgrupo ) );
                dispatch( disabledActions.onCreate() );
            }
        } ) . finally ( () => {
            dispatch( removeLoading() );
        } );
    };
};

const onGrabar = ( productosubgrupo ) => {
    return ( dispatch ) => {
        if ( !onValidate( productosubgrupo ) ) {
            dispatch( onChange( productosubgrupo ) );
            return;
        }
        dispatch( setLoading() );

        productoSubGrupoServices.onGrabar( productosubgrupo ).then( (result) => {
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

const onEditar = ( productosubgrupo ) => {
    return ( dispatch ) => {
        dispatch( disabledActions.onEditar() );
        productosubgrupo.update = true;
        dispatch( onChange( productosubgrupo ) );
    };
};

const onUpdate = ( productosubgrupo ) => {
    return ( dispatch ) => {
        if ( !onValidate( productosubgrupo ) ) {
            dispatch( onChange( productosubgrupo ) );
            return;
        }
        dispatch( setLoading() );

        productoSubGrupoServices.onUpdate( productosubgrupo ).then( (result) => {
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

const onDelete = ( productosubgrupo ) => {
    return ( dispatch ) => {
        dispatch( setLoading() );

        productoSubGrupoServices.onDelete( productosubgrupo ).then( (result) => {

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

const onSearchData = ( productosubgrupo ) => {
    return ( dispatch ) => {
        dispatch( setLoading() );

        productoSubGrupoServices.onSearchData( productosubgrupo ).then( (result) => {
            if ( result.response == 1 ) {
                dispatch( disabledActions.onAction() );
                dispatch( setState( result.productosubgrupo ) );
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
        return await productoSubGrupoServices.onImprimir().then( async (result) => {
            if ( result.response == 1 ) {
                await dispatch( setImprimir( result ) );
            }
            return result;
        } ) . finally ( () => {
            dispatch( removeLoading() );
        });
    };
};

function onValidate( productosubgrupo ) {
    const { abreviatura, descripcion, fkidproductogrupo } = productosubgrupo;
    let bandera = true;
    if ( descripcion.toString().trim().length === 0 ) {
        productosubgrupo.error.descripcion   = true;
        productosubgrupo.message.descripcion = "Campo requerido";
        bandera = false;
    }
    if ( descripcion.toString().length > 200 ) {
        productosubgrupo.error.descripcion   = true;
        productosubgrupo.message.descripcion = "Se permite máximo 200 caracteres";
        bandera = false;
    }
    if ( abreviatura?.toString().length > 50 ) {
        productosubgrupo.error.abreviatura   = true;
        productosubgrupo.message.abreviatura = "Se permite máximo 50 caracteres";
        bandera = false;
    }
    if ( fkidproductogrupo == null || fkidproductogrupo == "" ) {
        productosubgrupo.error.fkidproductogrupo   = true;
        productosubgrupo.message.fkidproductogrupo = "Campo requerido";
        bandera = false;
    }
    if ( !bandera ) {
        C_Message( "error", "Problemas al registrar" );
    }
    return bandera;
};

export const productoSubGrupoActions = {
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
