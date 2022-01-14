
import { C_Message } from "../../../../components";

import { Strings } from "../../../constants";
import { ClienteTipoServices } from "../../../services/comercio/venta/clienteTipoServices";

import { disabledActions } from "../../config/disabledActions";
import { removeLoading, setLoading } from "../../config/loadingActions";
import { paginationActions } from "../../config/paginationActions";

const onLimpiar = ( ) => ( {
    type: Strings.clientetipo_setLimpiar,
} );

const onLoad = ( ) => ( {
    type: Strings.clientetipo_setLoad,
} );

const setState = ( data ) => ( {
    type: Strings.clientetipo_setState,
    payload: data,
} );

const onChange = ( data ) => ( {
    type: Strings.clientetipo_onChange,
    payload: data,
} );

const setCreate = ( data ) => ( {
    type:    Strings.clientetipo_onCreate,
    payload: data,
} );

const setEditar = ( data ) => ( {
    type:    Strings.clientetipo_onEditar,
    payload: data,
} );

const setShow = ( data ) => ( {
    type:    Strings.clientetipo_onShow,
    payload: data,
} );

const onFocus = ( ) => ( {
    type: Strings.clientetipo_onFocus,
} );

const offFocus = ( ) => ( {
    type: Strings.clientetipo_offFocus,
} );

const setImprimir = ( data ) => ( {
    type: Strings.clientetipo_setImprimir,
    payload: data,
} );

const initData = ( ) => {
    return async ( dispatch ) => {

        await dispatch( onFocus() );
        await dispatch( paginationActions.removePagination() );
        await dispatch( disabledActions.onLimpiar() );
        await dispatch( onLimpiar() );

        ClienteTipoServices.getData( ).then ( ( result ) => {
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
        ClienteTipoServices.getData( ).then ( async ( result ) => {
            if ( result.response == 1 ) {
                // dispatch( setDataCiudad(result.ciudad) );
            }
        } );
    };
};

const onChangePage = ( page ) => {
    return ( dispatch ) => {

        ClienteTipoServices.getData( page ).then ( async ( result ) => {
            if ( result.response == 1 ) {
                let obj = {
                    pagination: result.pagination,
                    pagina: page,
                };
                await dispatch( disabledActions.onAction() );
                await dispatch( paginationActions.setPagination( obj ) );
                await dispatch( setState( result.clientetipo[0] ) );
            }
        } );

    };
};

const onCreate = ( ) => {
    return ( dispatch ) => {
        dispatch( setLoading() );

        ClienteTipoServices.onCreate().then( ( result ) => {
            if ( result.response == 1 ) {
                dispatch( setCreate( result ) );
                dispatch( disabledActions.onCreate() );
            }
        } ) . finally ( () => {
            dispatch( removeLoading() );
        } );
    };
};

const onGrabar = ( clientetipo ) => {
    return ( dispatch ) => {
        if ( !onValidate( clientetipo ) ) {
            dispatch( onChange( clientetipo ) );
            return;
        }
        dispatch( setLoading() );

        ClienteTipoServices.onGrabar( clientetipo ).then( (result) => {
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

const onEdit = ( idclientetipo ) => {
    return ( dispatch ) => {
        dispatch( onLoad() );

        ClienteTipoServices.onEdit( idclientetipo ).then( ( result ) => {
            if ( result.response == 1 ) {
                dispatch( setEditar( result ) );
            }
        } ) . finally ( () => {
            // dispatch( removeLoading() );
        } );
    };
};

const onEditar = ( clientetipo ) => {
    return ( dispatch ) => {
        dispatch( disabledActions.onEditar() );
        clientetipo.update = true;
        dispatch( onChange( clientetipo ) );
    };
};

const onUpdate = ( clientetipo ) => {
    return ( dispatch ) => {
        if ( !onValidate( clientetipo ) ) {
            dispatch( onChange( clientetipo ) );
            return;
        }
        dispatch( setLoading() );

        ClienteTipoServices.onUpdate( clientetipo ).then( (result) => {
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

const onShow = ( idclientetipo ) => {
    return ( dispatch ) => {
        dispatch( onLoad() );

        ClienteTipoServices.onShow( idclientetipo ).then( ( result ) => {
            if ( result.response == 1 ) {
                dispatch( setShow( result ) );
            }
        } ) . finally ( () => {
            // dispatch( removeLoading() );
        } );
    };
};

const onDelete = ( clientetipo ) => {
    return ( dispatch ) => {
        dispatch( setLoading() );

        ClienteTipoServices.onDelete( clientetipo ).then( (result) => {

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

const onSearchData = ( clientetipo ) => {
    return ( dispatch ) => {
        dispatch( setLoading() );

        ClienteTipoServices.onSearchData( clientetipo ).then( (result) => {
            if ( result.response == 1 ) {
                dispatch( disabledActions.onAction() );
                dispatch( setState( result.clientetipo ) );
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
        return await ClienteTipoServices.onImprimir().then( async (result) => {
            if ( result.response == 1 ) {
                await dispatch( setImprimir( result ) );
            }
            return result;
        } ) . finally ( () => {
            dispatch( removeLoading() );
        });
    };
};

function onValidate( clientetipo ) {
    const { descripcion } = clientetipo;
    let bandera = true;
    if ( descripcion.toString().trim().length === 0 ) {
        clientetipo.error.descripcion   = true;
        clientetipo.message.descripcion = "Campo requerido";
        bandera = false;
    }
    if ( descripcion.toString().length > 200 ) {
        clientetipo.error.descripcion   = true;
        clientetipo.message.descripcion = "Se permite máximo 200 caracteres";
        bandera = false;
    }
    if ( !bandera ) {
        C_Message( "error", "Problemas al registrar" );
    }
    return bandera;
};

export const clienteTipoActions = {
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
