
import { C_Message } from "../../../../components";

import { Strings } from "../../../constants";
import { ProveedorCargoServices } from "../../../services/comercio/compra/proveedorCargoServices";

import { disabledActions } from "../../config/disabledActions";
import { removeLoading, setLoading } from "../../config/loadingActions";
import { paginationActions } from "../../config/paginationActions";

const onLimpiar = ( ) => ( {
    type: Strings.proveedorcargo_setLimpiar,
} );

const onLoad = ( ) => ( {
    type: Strings.proveedorcargo_setLoad,
} );

const setState = ( data ) => ( {
    type: Strings.proveedorcargo_setState,
    payload: data,
} );

const onChange = ( data ) => ( {
    type: Strings.proveedorcargo_onChange,
    payload: data,
} );

const setCreate = ( data ) => ( {
    type:    Strings.proveedorcargo_onCreate,
    payload: data,
} );

const setEditar = ( data ) => ( {
    type:    Strings.proveedorcargo_onEditar,
    payload: data,
} );

const setShow = ( data ) => ( {
    type:    Strings.proveedorcargo_onShow,
    payload: data,
} );

const onFocus = ( ) => ( {
    type: Strings.proveedorcargo_onFocus,
} );

const offFocus = ( ) => ( {
    type: Strings.proveedorcargo_offFocus,
} );

const setImprimir = ( data ) => ( {
    type: Strings.proveedorcargo_setImprimir,
    payload: data,
} );

const initData = ( ) => {
    return async ( dispatch ) => {

        await dispatch( onFocus() );
        await dispatch( paginationActions.removePagination() );
        await dispatch( disabledActions.onLimpiar() );
        await dispatch( onLimpiar() );

        ProveedorCargoServices.getData( ).then ( ( result ) => {
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
        ProveedorCargoServices.getData( ).then ( async ( result ) => {
            if ( result.response == 1 ) {
                // dispatch( setDataCiudad(result.ciudad) );
            }
        } );
    };
};

const onChangePage = ( page ) => {
    return ( dispatch ) => {

        ProveedorCargoServices.getData( page ).then ( async ( result ) => {
            if ( result.response == 1 ) {
                let obj = {
                    pagination: result.pagination,
                    pagina: page,
                };
                await dispatch( disabledActions.onAction() );
                await dispatch( paginationActions.setPagination( obj ) );
                await dispatch( setState( result.proveedorcargo[0] ) );
            }
        } );

    };
};

const onCreate = ( ) => {
    return ( dispatch ) => {
        dispatch( setLoading() );

        ProveedorCargoServices.onCreate().then( ( result ) => {
            if ( result.response == 1 ) {
                dispatch( setCreate( result ) );
                dispatch( disabledActions.onCreate() );
            }
        } ) . finally ( () => {
            dispatch( removeLoading() );
        } );
    };
};

const onGrabar = ( proveedorcargo ) => {
    return ( dispatch ) => {
        if ( !onValidate( proveedorcargo ) ) {
            dispatch( onChange( proveedorcargo ) );
            return;
        }
        dispatch( setLoading() );

        ProveedorCargoServices.onGrabar( proveedorcargo ).then( (result) => {
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

const onEdit = ( idproveedorcargo ) => {
    return ( dispatch ) => {
        dispatch( onLoad() );

        ProveedorCargoServices.onEdit( idproveedorcargo ).then( ( result ) => {
            if ( result.response == 1 ) {
                dispatch( setEditar( result ) );
            }
        } ) . finally ( () => {
            // dispatch( removeLoading() );
        } );
    };
};

const onEditar = ( proveedorcargo ) => {
    return ( dispatch ) => {
        dispatch( disabledActions.onEditar() );
        proveedorcargo.update = true;
        dispatch( onChange( proveedorcargo ) );
    };
};

const onUpdate = ( proveedorcargo ) => {
    return ( dispatch ) => {
        if ( !onValidate( proveedorcargo ) ) {
            dispatch( onChange( proveedorcargo ) );
            return;
        }
        dispatch( setLoading() );

        ProveedorCargoServices.onUpdate( proveedorcargo ).then( (result) => {
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

const onShow = ( idproveedorcargo ) => {
    return ( dispatch ) => {
        dispatch( onLoad() );

        ProveedorCargoServices.onShow( idproveedorcargo ).then( ( result ) => {
            if ( result.response == 1 ) {
                dispatch( setShow( result ) );
            }
        } ) . finally ( () => {
            // dispatch( removeLoading() );
        } );
    };
};

const onDelete = ( proveedorcargo ) => {
    return ( dispatch ) => {
        dispatch( setLoading() );

        ProveedorCargoServices.onDelete( proveedorcargo ).then( (result) => {

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

const onSearchData = ( proveedorcargo ) => {
    return ( dispatch ) => {
        dispatch( setLoading() );

        ProveedorCargoServices.onSearchData( proveedorcargo ).then( (result) => {
            if ( result.response == 1 ) {
                dispatch( disabledActions.onAction() );
                dispatch( setState( result.proveedorcargo ) );
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
        return await ProveedorCargoServices.onImprimir().then( async (result) => {
            if ( result.response == 1 ) {
                await dispatch( setImprimir( result ) );
            }
            return result;
        } ) . finally ( () => {
            dispatch( removeLoading() );
        });
    };
};

function onValidate( proveedorcargo ) {
    const { descripcion } = proveedorcargo;
    let bandera = true;
    if ( descripcion.toString().trim().length === 0 ) {
        proveedorcargo.error.descripcion   = true;
        proveedorcargo.message.descripcion = "Campo requerido";
        bandera = false;
    }
    if ( descripcion.toString().length > 200 ) {
        proveedorcargo.error.descripcion   = true;
        proveedorcargo.message.descripcion = "Se permite máximo 200 caracteres";
        bandera = false;
    }
    if ( !bandera ) {
        C_Message( "error", "Problemas al registrar" );
    }
    return bandera;
};

export const proveedorCargoActions = {
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
