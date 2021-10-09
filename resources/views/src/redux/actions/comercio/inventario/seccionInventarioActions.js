
import { C_Message } from "../../../../components";

import { Strings } from "../../../constants";
import { SeccionInventarioServices } from "../../../services/comercio/inventario/seccionInventarioServices";

import { disabledActions } from "../../config/disabledActions";
import { removeLoading, setLoading } from "../../config/loadingActions";
import { paginationActions } from "../../config/paginationActions";

const onLimpiar = ( ) => ( {
    type: Strings.seccioninventario_setLimpiar,
} );

const onLoad = ( ) => ( {
    type: Strings.seccioninventario_setLoad,
} );

const setState = ( data ) => ( {
    type: Strings.seccioninventario_setState,
    payload: data,
} );

const onChange = ( data ) => ( {
    type: Strings.seccioninventario_onChange,
    payload: data,
} );

const setCreate = ( data ) => ( {
    type:    Strings.seccioninventario_onCreate,
    payload: data,
} );

const setEditar = ( data ) => ( {
    type:    Strings.seccioninventario_onEditar,
    payload: data,
} );

const setShow = ( data ) => ( {
    type:    Strings.seccioninventario_onShow,
    payload: data,
} );

const onFocus = ( ) => ( {
    type: Strings.seccioninventario_onFocus,
} );

const offFocus = ( ) => ( {
    type: Strings.seccioninventario_offFocus,
} );

const setImprimir = ( data ) => ( {
    type: Strings.seccioninventario_setImprimir,
    payload: data,
} );

const initData = ( ) => {
    return async ( dispatch ) => {

        await dispatch( onFocus() );
        await dispatch( paginationActions.removePagination() );
        await dispatch( disabledActions.onLimpiar() );
        await dispatch( onLimpiar() );

        SeccionInventarioServices.getData( ).then ( ( result ) => {
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
        SeccionInventarioServices.getData( ).then ( async ( result ) => {
            if ( result.response == 1 ) {
                // dispatch( setDataCiudad(result.ciudad) );
            }
        } );
    };
};

const onChangePage = ( page ) => {
    return ( dispatch ) => {

        SeccionInventarioServices.getData( page ).then ( async ( result ) => {
            if ( result.response == 1 ) {
                let obj = {
                    pagination: result.pagination,
                    pagina: page,
                };
                await dispatch( disabledActions.onAction() );
                await dispatch( paginationActions.setPagination( obj ) );
                await dispatch( setState( result.seccioninventario[0] ) );
            }
        } );

    };
};

const onCreate = ( ) => {
    return ( dispatch ) => {
        dispatch( setLoading() );

        SeccionInventarioServices.onCreate().then( ( result ) => {
            if ( result.response == 1 ) {
                dispatch( setCreate( result ) );
                dispatch( disabledActions.onCreate() );
            }
        } ) . finally ( () => {
            dispatch( removeLoading() );
        } );
    };
};

const onGrabar = ( seccioninventario ) => {
    return ( dispatch ) => {
        if ( !onValidate( seccioninventario ) ) {
            dispatch( onChange( seccioninventario ) );
            return;
        }
        dispatch( setLoading() );

        SeccionInventarioServices.onGrabar( seccioninventario ).then( (result) => {
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

const onEdit = ( idseccioninventario ) => {
    return ( dispatch ) => {
        dispatch( onLoad() );

        SeccionInventarioServices.onEdit( idseccioninventario ).then( ( result ) => {
            if ( result.response == 1 ) {
                dispatch( setEditar( result ) );
            }
        } ) . finally ( () => {
            // dispatch( removeLoading() );
        } );
    };
};

const onEditar = ( seccioninventario ) => {
    return ( dispatch ) => {
        dispatch( disabledActions.onEditar() );
        seccioninventario.update = true;
        dispatch( onChange( seccioninventario ) );
    };
};

const onUpdate = ( seccioninventario ) => {
    return ( dispatch ) => {
        if ( !onValidate( seccioninventario ) ) {
            dispatch( onChange( seccioninventario ) );
            return;
        }
        dispatch( setLoading() );

        SeccionInventarioServices.onUpdate( seccioninventario ).then( (result) => {
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

const onShow = ( idseccioninventario ) => {
    return ( dispatch ) => {
        dispatch( onLoad() );

        SeccionInventarioServices.onShow( idseccioninventario ).then( ( result ) => {
            if ( result.response == 1 ) {
                dispatch( setShow( result ) );
            }
        } ) . finally ( () => {
            // dispatch( removeLoading() );
        } );
    };
};

const onDelete = ( seccioninventario ) => {
    return ( dispatch ) => {
        dispatch( setLoading() );

        SeccionInventarioServices.onDelete( seccioninventario ).then( (result) => {

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

const onSearchData = ( seccioninventario ) => {
    return ( dispatch ) => {
        dispatch( setLoading() );

        SeccionInventarioServices.onSearchData( seccioninventario ).then( (result) => {
            if ( result.response == 1 ) {
                dispatch( disabledActions.onAction() );
                dispatch( setState( result.seccioninventario ) );
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
        return await SeccionInventarioServices.onImprimir().then( async (result) => {
            if ( result.response == 1 ) {
                await dispatch( setImprimir( result ) );
            }
            return result;
        } ) . finally ( () => {
            dispatch( removeLoading() );
        });
    };
};

function onValidate( seccioninventario ) {
    const { descripcion } = seccioninventario;
    let bandera = true;
    if ( descripcion.toString().trim().length === 0 ) {
        seccioninventario.error.descripcion   = true;
        seccioninventario.message.descripcion = "Campo requerido";
        bandera = false;
    }
    if ( descripcion.toString().length > 200 ) {
        seccioninventario.error.descripcion   = true;
        seccioninventario.message.descripcion = "Se permite máximo 200 caracteres";
        bandera = false;
    }
    if ( !bandera ) {
        C_Message( "error", "Problemas al registrar" );
    }
    return bandera;
};

export const seccionInventarioActions = {
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
