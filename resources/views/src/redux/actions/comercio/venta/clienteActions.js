
import { C_Message } from "../../../../components";

import { Strings } from "../../../constants";
import { ClienteServices } from "../../../services/comercio/venta/clienteServices";

import { disabledActions } from "../../config/disabledActions";
import { removeLoading, setLoading } from "../../config/loadingActions";
import { paginationActions } from "../../config/paginationActions";

const onLimpiar = ( ) => ( {
    type: Strings.cliente_setLimpiar,
} );

const onLoad = ( ) => ( {
    type: Strings.cliente_setLoad,
} );

const setState = ( data ) => ( {
    type: Strings.cliente_setState,
    payload: data,
} );

const onChange = ( data ) => ( {
    type: Strings.cliente_onChange,
    payload: data,
} );

const setCreate = ( data ) => ( {
    type:    Strings.cliente_onCreate,
    payload: data,
} );

const setEditar = ( data ) => ( {
    type:    Strings.cliente_onEditar,
    payload: data,
} );

const setShow = ( data ) => ( {
    type:    Strings.cliente_onShow,
    payload: data,
} );

const onFocus = ( ) => ( {
    type: Strings.cliente_onFocus,
} );

const offFocus = ( ) => ( {
    type: Strings.cliente_offFocus,
} );

const setImprimir = ( data ) => ( {
    type: Strings.cliente_setImprimir,
    payload: data,
} );

const initData = ( ) => {
    return async ( dispatch ) => {

        await dispatch( onFocus() );
        await dispatch( paginationActions.removePagination() );
        await dispatch( disabledActions.onLimpiar() );
        await dispatch( onLimpiar() );

        ClienteServices.getData( ).then ( ( result ) => {
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
        ClienteServices.getData( ).then ( async ( result ) => {
            if ( result.response == 1 ) {
                // dispatch( setDataCiudad(result.ciudad) );
            }
        } );
    };
};

const onChangePage = ( page ) => {
    return ( dispatch ) => {

        ClienteServices.getData( page ).then ( async ( result ) => {
            if ( result.response == 1 ) {
                let obj = {
                    pagination: result.pagination,
                    pagina: page,
                };
                await dispatch( disabledActions.onAction() );
                await dispatch( paginationActions.setPagination( obj ) );
                await dispatch( setState( result.arrayCliente[0] ) );
            }
        } );

    };
};

const onCreate = ( ) => {
    return ( dispatch ) => {
        dispatch( setLoading() );

        ClienteServices.onCreate().then( ( result ) => {
            if ( result.response == 1 ) {
                dispatch( setCreate( result ) );
                dispatch( disabledActions.onCreate() );
            }
        } ) . finally ( () => {
            dispatch( removeLoading() );
        } );
    };
};

const onGrabar = ( cliente ) => {
    return ( dispatch ) => {
        if ( !onValidate( cliente ) ) {
            dispatch( onChange( cliente ) );
            return;
        }
        dispatch( setLoading() );

        ClienteServices.onGrabar( cliente ).then( (result) => {
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

const onEdit = ( idcliente ) => {
    return ( dispatch ) => {
        dispatch( onLoad() );

        ClienteServices.onEdit( idcliente ).then( ( result ) => {
            if ( result.response == 1 ) {
                dispatch( setEditar( result ) );
            }
        } ) . finally ( () => {
            // dispatch( removeLoading() );
        } );
    };
};

const onEditar = ( cliente ) => {
    return ( dispatch ) => {
        dispatch( disabledActions.onEditar() );
        cliente.update = true;
        dispatch( onChange( cliente ) );
    };
};

const onUpdate = ( cliente ) => {
    return ( dispatch ) => {
        if ( !onValidate( cliente ) ) {
            dispatch( onChange( cliente ) );
            return;
        }
        dispatch( setLoading() );

        ClienteServices.onUpdate( cliente ).then( (result) => {
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

const onShow = ( idcliente ) => {
    return ( dispatch ) => {
        dispatch( onLoad() );

        ClienteServices.onShow( idcliente ).then( ( result ) => {
            if ( result.response == 1 ) {
                dispatch( setShow( result ) );
            }
        } ) . finally ( () => {
            // dispatch( removeLoading() );
        } );
    };
};

const onDelete = ( cliente ) => {
    return ( dispatch ) => {
        dispatch( setLoading() );

        ClienteServices.onDelete( cliente ).then( (result) => {

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

const onSearchData = ( cliente ) => {
    return ( dispatch ) => {
        dispatch( setLoading() );

        ClienteServices.onSearchData( cliente ).then( (result) => {
            if ( result.response == 1 ) {
                dispatch( disabledActions.onAction() );
                dispatch( setState( result.cliente ) );
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
        return await ClienteServices.onImprimir().then( async (result) => {
            if ( result.response == 1 ) {
                await dispatch( setImprimir( result ) );
            }
            return result;
        } ) . finally ( () => {
            dispatch( removeLoading() );
        });
    };
};

function onValidate( cliente ) {
    let bandera = true;
    if ( cliente.nombre.toString().trim().length === 0 ) {
        cliente.error.nombre   = true;
        cliente.message.nombre = "Campo requerido";
        bandera = false;
    }
    if ( cliente.nombre.toString().length > 150 ) {
        cliente.error.nombre   = true;
        cliente.message.nombre = "Se permite máximo 150 caracteres";
        bandera = false;
    }

    if ( cliente.apellido.toString().trim().length === 0 ) {
        cliente.error.apellido   = true;
        cliente.message.apellido = "Campo requerido";
        bandera = false;
    }
    if ( cliente.apellido.toString().length > 250 ) {
        cliente.error.apellido   = true;
        cliente.message.apellido = "Se permite máximo 250 caracteres";
        bandera = false;
    }

    if ( cliente.razonsocial.toString().trim().length === 0 ) {
        cliente.error.razonsocial   = true;
        cliente.message.razonsocial = "Campo requerido";
        bandera = false;
    }
    if ( cliente.razonsocial.toString().length > 300 ) {
        cliente.error.razonsocial   = true;
        cliente.message.razonsocial = "Se permite máximo 300 caracteres";
        bandera = false;
    }
    if ( typeof cliente.fkidciudadpais !== "number" ) {
        cliente.error.fkidciudadpais   = true;
        cliente.message.fkidciudadpais = "Campo requerido";
        bandera = false;
    }
    if ( typeof cliente.fkidciudad !== "number" ) {
        cliente.error.fkidciudad   = true;
        cliente.message.fkidciudad = "Campo requerido";
        bandera = false;
    }
    if ( typeof cliente.fkidclientetipo !== "number" ) {
        cliente.error.fkidclientetipo   = true;
        cliente.message.fkidclientetipo = "Campo requerido";
        bandera = false;
    }
    if ( !bandera ) {
        C_Message( "error", "Problemas al registrar" );
    }
    return bandera;
};

export const clienteActions = {
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
