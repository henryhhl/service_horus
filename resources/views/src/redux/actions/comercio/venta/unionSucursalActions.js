
import { C_Message } from "../../../../components";

import { Strings } from "../../../constants";
import { unionSucursalServices } from "../../../services/comercio/venta/unionSucursalServices";

import { disabledActions } from "../../config/disabledActions";
import { removeLoading, setLoading } from "../../config/loadingActions";
import { paginationActions } from "../../config/paginationActions";

const onLimpiar = ( ) => ( {
    type: Strings.unionsucursal_setLimpiar,
} );

const onLoad = ( ) => ( {
    type: Strings.unionsucursal_setLoad,
} );

const setState = ( data ) => ( {
    type: Strings.unionsucursal_setState,
    payload: data,
} );

const onChange = ( data ) => ( {
    type: Strings.unionsucursal_onChange,
    payload: data,
} );

const setCreate = ( data ) => ( {
    type:    Strings.unionsucursal_onCreate,
    payload: data,
} );

const setEditar = ( data ) => ( {
    type:    Strings.unionsucursal_onEditar,
    payload: data,
} );

const setShow = ( data ) => ( {
    type:    Strings.unionsucursal_onShow,
    payload: data,
} );

const onFocus = ( ) => ( {
    type: Strings.unionsucursal_onFocus,
} );

const offFocus = ( ) => ( {
    type: Strings.unionsucursal_offFocus,
} );

const setImprimir = ( data ) => ( {
    type: Strings.unionsucursal_setImprimir,
    payload: data,
} );

const initData = ( ) => {
    return async ( dispatch ) => {

        await dispatch( onFocus() );
        await dispatch( paginationActions.removePagination() );
        await dispatch( disabledActions.onLimpiar() );
        await dispatch( onLimpiar() );

        unionSucursalServices.getData( ).then ( ( result ) => {
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
        unionSucursalServices.getData( ).then ( async ( result ) => {
            if ( result.response == 1 ) {
                // dispatch( setDataCiudad(result.ciudad) );
            }
        } );
    };
};

const onChangePage = ( page ) => {
    return ( dispatch ) => {

        unionSucursalServices.getData( page ).then ( async ( result ) => {
            if ( result.response == 1 ) {
                let obj = {
                    pagination: result.pagination,
                    pagina: page,
                };
                await dispatch( disabledActions.onAction() );
                await dispatch( paginationActions.setPagination( obj ) );
                await dispatch( setState( result.unionsucursal[0] ) );
            }
        } );

    };
};

const onCreate = ( ) => {
    return ( dispatch ) => {
        dispatch( setLoading() );

        unionSucursalServices.onCreate().then( ( result ) => {
            if ( result.response == 1 ) {
                dispatch( setCreate( result ) );
                dispatch( disabledActions.onCreate() );
            }
        } ) . finally ( () => {
            dispatch( removeLoading() );
        } );
    };
};

const onGrabar = ( unionsucursal ) => {
    return ( dispatch ) => {
        if ( !onValidate( unionsucursal ) ) {
            dispatch( onChange( unionsucursal ) );
            return;
        }
        dispatch( setLoading() );

        unionSucursalServices.onGrabar( unionsucursal ).then( (result) => {
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

const onEdit = ( idunionsucursal ) => {
    return ( dispatch ) => {
        dispatch( onLoad() );

        unionSucursalServices.onEdit( idunionsucursal ).then( ( result ) => {
            if ( result.response == 1 ) {
                dispatch( setEditar( result ) );
            }
        } ) . finally ( () => {
            // dispatch( removeLoading() );
        } );
    };
};

const onEditar = ( unionsucursal ) => {
    return ( dispatch ) => {
        dispatch( disabledActions.onEditar() );
        unionsucursal.update = true;
        dispatch( onChange( unionsucursal ) );
    };
};

const onUpdate = ( unionsucursal ) => {
    return ( dispatch ) => {
        if ( !onValidate( unionsucursal ) ) {
            dispatch( onChange( unionsucursal ) );
            return;
        }
        dispatch( setLoading() );

        unionSucursalServices.onUpdate( unionsucursal ).then( (result) => {
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

const onShow = ( idunionsucursal ) => {
    return ( dispatch ) => {
        dispatch( onLoad() );

        unionSucursalServices.onShow( idunionsucursal ).then( ( result ) => {
            if ( result.response == 1 ) {
                dispatch( setShow( result ) );
            }
        } ) . finally ( () => {
            // dispatch( removeLoading() );
        } );
    };
};

const onDelete = ( unionsucursal ) => {
    return ( dispatch ) => {
        dispatch( setLoading() );

        unionSucursalServices.onDelete( unionsucursal ).then( (result) => {

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

const onSearchData = ( unionsucursal ) => {
    return ( dispatch ) => {
        dispatch( setLoading() );

        unionSucursalServices.onSearchData( unionsucursal ).then( (result) => {
            if ( result.response == 1 ) {
                dispatch( disabledActions.onAction() );
                dispatch( setState( result.unionsucursal ) );
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
        return await unionSucursalServices.onImprimir().then( async (result) => {
            if ( result.response == 1 ) {
                await dispatch( setImprimir( result ) );
            }
            return result;
        } ) . finally ( () => {
            dispatch( removeLoading() );
        });
    };
};

function onValidate( unionsucursal ) {
    const { descripcion } = unionsucursal;
    let bandera = true;
    if ( descripcion.toString().trim().length === 0 ) {
        unionsucursal.error.descripcion   = true;
        unionsucursal.message.descripcion = "Campo requerido";
        bandera = false;
    }
    if ( descripcion.toString().length > 200 ) {
        unionsucursal.error.descripcion   = true;
        unionsucursal.message.descripcion = "Se permite máximo 200 caracteres";
        bandera = false;
    }
    if ( !bandera ) {
        C_Message( "error", "Problemas al registrar" );
    }
    return bandera;
};

export const unionSucursalActions = {
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
