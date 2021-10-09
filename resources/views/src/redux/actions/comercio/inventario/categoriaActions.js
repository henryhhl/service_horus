
import { C_Message } from "../../../../components";

import { Strings } from "../../../constants";

import { categoriaServices } from "../../../services/comercio/inventario/categoriaServices";

import { disabledActions } from "../../config/disabledActions";
import { removeLoading, setLoading } from "../../config/loadingActions";
import { paginationActions } from "../../config/paginationActions";

const onLimpiar = ( ) => ( {
    type: Strings.categoria_setLimpiar,
} );

const setState = ( data ) => ( {
    type: Strings.categoria_setState,
    payload: data,
} );

const onChange = ( data ) => ( {
    type: Strings.categoria_onChange,
    payload: data,
} );

const setIDCategoria = ( idcategoria ) => ( {
    type:    Strings.categoria_onCreate,
    payload: idcategoria,
} );

const onFocus = ( ) => ( {
    type: Strings.categoria_onFocus,
} );

const offFocus = ( ) => ( {
    type: Strings.categoria_offFocus,
} );

const setImprimir = ( data ) => ( {
    type: Strings.categoria_setImprimir,
    payload: data,
} );

const initData = ( ) => {
    return async ( dispatch ) => {

        await dispatch( onFocus() );
        await dispatch( paginationActions.removePagination() );
        await dispatch( disabledActions.onLimpiar() );
        await dispatch( onLimpiar() );

        categoriaServices.getData( ).then ( ( result ) => {
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

        categoriaServices.getData( page ).then ( async ( result ) => {
            if ( result.response == 1 ) {
                let obj = {
                    pagination: result.pagination,
                    pagina: page,
                };
                await dispatch( disabledActions.onAction() );
                await dispatch( paginationActions.setPagination( obj ) );
                await dispatch( setState( result.categoria[0] ) );
            }
        } );

    };
};

const onCreate = ( ) => {
    return ( dispatch ) => {
        dispatch( setLoading() );

        categoriaServices.onCreate().then( ( result ) => {
            if ( result.response == 1 ) {
                dispatch( setIDCategoria( result.idcategoria ) );
                dispatch( disabledActions.onCreate() );
            }
        } ) . finally ( () => {
            dispatch( removeLoading() );
        } );
    };
};

const onGrabar = ( categoria ) => {
    return ( dispatch ) => {
        if ( !onValidate( categoria ) ) {
            dispatch( onChange( categoria ) );
            return;
        }
        dispatch( setLoading() );

        categoriaServices.onGrabar( categoria ).then( (result) => {
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

const onEditar = ( categoria ) => {
    return ( dispatch ) => {
        dispatch( disabledActions.onEditar() );
        categoria.update = true;
        dispatch( onChange( categoria ) );
    };
};

const onUpdate = ( categoria ) => {
    return ( dispatch ) => {
        if ( !onValidate( categoria ) ) {
            dispatch( onChange( categoria ) );
            return;
        }
        dispatch( setLoading() );

        categoriaServices.onUpdate( categoria ).then( (result) => {
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

const onDelete = ( categoria ) => {
    return ( dispatch ) => {
        dispatch( setLoading() );

        categoriaServices.onDelete( categoria ).then( (result) => {

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

const onSearchData = ( categoria ) => {
    return ( dispatch ) => {
        dispatch( setLoading() );

        categoriaServices.onSearchData( categoria ).then( (result) => {
            if ( result.response == 1 ) {
                dispatch( disabledActions.onAction() );
                dispatch( setState( result.categoria ) );
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
        return await categoriaServices.onImprimir().then( async (result) => {
            if ( result.response == 1 ) {
                await dispatch( setImprimir( result ) );
            }
            return result;
        } ) . finally ( () => {
            dispatch( removeLoading() );
        });
    };
};

function onValidate( categoria ) {
    const { abreviatura, descripcion } = categoria;
    let bandera = true;
    if ( descripcion.toString().trim().length === 0 ) {
        categoria.error.descripcion   = true;
        categoria.message.descripcion = "Campo requerido";
        bandera = false;
    }
    if ( descripcion.toString().length > 200 ) {
        categoria.error.descripcion   = true;
        categoria.message.descripcion = "Se permite máximo 200 caracteres";
        bandera = false;
    }
    if ( abreviatura?.toString().length > 50 ) {
        categoria.error.abreviatura   = true;
        categoria.message.abreviatura = "Se permite máximo 50 caracteres";
        bandera = false;
    }
    if ( !bandera ) {
        C_Message( "error", "Problemas al registrar" );
    }
    return bandera;
};

export const categoriaActions = {
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
