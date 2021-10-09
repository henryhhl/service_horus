
import { C_Message } from "../../../../components";

import { Strings } from "../../../constants";
import { ListaPrecioServices } from "../../../services/comercio/venta/listaPrecioServices";

import { disabledActions } from "../../config/disabledActions";
import { removeLoading, setLoading } from "../../config/loadingActions";
import { paginationActions } from "../../config/paginationActions";

const onLimpiar = ( ) => ( {
    type: Strings.listaprecio_setLimpiar,
} );

const onLoad = ( ) => ( {
    type: Strings.listaprecio_setLoad,
} );

const setState = ( data ) => ( {
    type: Strings.listaprecio_setState,
    payload: data,
} );

const onChange = ( data ) => ( {
    type: Strings.listaprecio_onChange,
    payload: data,
} );

const setCreate = ( data ) => ( {
    type:    Strings.listaprecio_onCreate,
    payload: data,
} );

const setEditar = ( data ) => ( {
    type:    Strings.listaprecio_onEditar,
    payload: data,
} );

const setShow = ( data ) => ( {
    type:    Strings.listaprecio_onShow,
    payload: data,
} );

const onFocus = ( ) => ( {
    type: Strings.listaprecio_onFocus,
} );

const offFocus = ( ) => ( {
    type: Strings.listaprecio_offFocus,
} );

const setImprimir = ( data ) => ( {
    type: Strings.listaprecio_setImprimir,
    payload: data,
} );

const initData = ( ) => {
    return async ( dispatch ) => {

        await dispatch( onFocus() );
        await dispatch( paginationActions.removePagination() );
        await dispatch( disabledActions.onLimpiar() );
        await dispatch( onLimpiar() );

        ListaPrecioServices.getData( ).then ( ( result ) => {
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

const getData = () => {
    return ( dispatch ) => {
        ListaPrecioServices.getData( ).then ( async ( result ) => {
            if ( result.response == 1 ) {
                // dispatch( setDataCiudad(result.ciudad) );
            }
        } );
    };
};

const onChangePage = ( page ) => {
    return ( dispatch ) => {

        ListaPrecioServices.getData( page ).then ( async ( result ) => {
            if ( result.response == 1 ) {
                let obj = {
                    pagination: result.pagination,
                    pagina: page,
                };
                await dispatch( disabledActions.onAction() );
                await dispatch( paginationActions.setPagination( obj ) );
                await dispatch( setState( result.listaprecio[0] ) );
            }
        } );

    };
};

const onCreate = ( ) => {
    return ( dispatch ) => {
        dispatch( setLoading() );

        ListaPrecioServices.onCreate().then( ( result ) => {
            if ( result.response == 1 ) {
                dispatch( setCreate( result ) );
                dispatch( disabledActions.onCreate() );
            }
        } ) . finally ( () => {
            dispatch( removeLoading() );
        } );
    };
};

const onGrabar = ( listaprecio ) => {
    return ( dispatch ) => {
        if ( !onValidate( listaprecio ) ) {
            dispatch( onChange( listaprecio ) );
            return;
        }
        dispatch( setLoading() );

        ListaPrecioServices.onGrabar( listaprecio ).then( (result) => {
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

const onEdit = ( idlistaprecio ) => {
    return ( dispatch ) => {
        dispatch( onLoad() );

        ListaPrecioServices.onEdit( idlistaprecio ).then( ( result ) => {
            if ( result.response == 1 ) {
                dispatch( setEditar( result ) );
            }
        } ) . finally ( () => {
            // dispatch( removeLoading() );
        } );
    };
};

const onEditar = ( listaprecio ) => {
    return ( dispatch ) => {
        dispatch( disabledActions.onEditar() );
        listaprecio.update = true;
        dispatch( onChange( listaprecio ) );
    };
};

const onUpdate = ( listaprecio ) => {
    return ( dispatch ) => {
        if ( !onValidate( listaprecio ) ) {
            dispatch( onChange( listaprecio ) );
            return;
        }
        dispatch( setLoading() );

        ListaPrecioServices.onUpdate( listaprecio ).then( (result) => {
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

const onShow = ( idlistaprecio ) => {
    return ( dispatch ) => {
        dispatch( onLoad() );

        ListaPrecioServices.onShow( idlistaprecio ).then( ( result ) => {
            if ( result.response == 1 ) {
                dispatch( setShow( result ) );
            }
        } ) . finally ( () => {
            // dispatch( removeLoading() );
        } );
    };
};

const onDelete = ( listaprecio ) => {
    return ( dispatch ) => {
        dispatch( setLoading() );

        ListaPrecioServices.onDelete( listaprecio ).then( (result) => {

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

const onSearchData = ( listaprecio ) => {
    return ( dispatch ) => {
        dispatch( setLoading() );

        ListaPrecioServices.onSearchData( listaprecio ).then( (result) => {
            if ( result.response == 1 ) {
                dispatch( disabledActions.onAction() );
                dispatch( setState( result.listaprecio ) );
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
        return await ListaPrecioServices.onImprimir().then( async (result) => {
            if ( result.response == 1 ) {
                await dispatch( setImprimir( result ) );
            }
            return result;
        } ) . finally ( () => {
            dispatch( removeLoading() );
        });
    };
};

function onValidate( listaprecio ) {
    const { abreviatura, nombre } = listaprecio;
    let bandera = true;
    if ( nombre.toString().trim().length === 0 ) {
        listaprecio.error.nombre   = true;
        listaprecio.message.nombre = "Campo requerido";
        bandera = false;
    }
    if ( nombre.toString().length > 200 ) {
        listaprecio.error.nombre   = true;
        listaprecio.message.nombre = "Se permite máximo 200 caracteres";
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

export const listaPrecioActions = {
    initData,
    getData,
    onChangePage,

    onChange,
    setState,

    onCreate,
    onGrabar,
    onEditar,
    onEdit,
    onUpdate,
    onShow,
    onDelete,
    onImprimir,

    onSearch,
    onSearchData,

    onCancelar,
};
