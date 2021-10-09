
import { C_Message } from "../../../../components";

import { Strings } from "../../../constants";
import { ProveedorTipoServices } from "../../../services/comercio/compra/proveedorTipoServices";

import { disabledActions } from "../../config/disabledActions";
import { removeLoading, setLoading } from "../../config/loadingActions";
import { paginationActions } from "../../config/paginationActions";

const onLimpiar = ( ) => ( {
    type: Strings.proveedortipo_setLimpiar,
} );

const onLoad = ( ) => ( {
    type: Strings.proveedortipo_setLoad,
} );

const setState = ( data ) => ( {
    type: Strings.proveedortipo_setState,
    payload: data,
} );

const onChange = ( data ) => ( {
    type: Strings.proveedortipo_onChange,
    payload: data,
} );

const setCreate = ( data ) => ( {
    type:    Strings.proveedortipo_onCreate,
    payload: data,
} );

const setEditar = ( data ) => ( {
    type:    Strings.proveedortipo_onEditar,
    payload: data,
} );

const setShow = ( data ) => ( {
    type:    Strings.proveedortipo_onShow,
    payload: data,
} );

const onFocus = ( ) => ( {
    type: Strings.proveedortipo_onFocus,
} );

const offFocus = ( ) => ( {
    type: Strings.proveedortipo_offFocus,
} );

const setImprimir = ( data ) => ( {
    type: Strings.proveedortipo_setImprimir,
    payload: data,
} );

const initData = ( ) => {
    return async ( dispatch ) => {

        await dispatch( onFocus() );
        await dispatch( paginationActions.removePagination() );
        await dispatch( disabledActions.onLimpiar() );
        await dispatch( onLimpiar() );

        ProveedorTipoServices.getData( ).then ( ( result ) => {
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
        ProveedorTipoServices.getData( ).then ( async ( result ) => {
            if ( result.response == 1 ) {
                // dispatch( setDataCiudad(result.ciudad) );
            }
        } );
    };
};

const onChangePage = ( page ) => {
    return ( dispatch ) => {

        ProveedorTipoServices.getData( page ).then ( async ( result ) => {
            if ( result.response == 1 ) {
                let obj = {
                    pagination: result.pagination,
                    pagina: page,
                };
                await dispatch( disabledActions.onAction() );
                await dispatch( paginationActions.setPagination( obj ) );
                await dispatch( setState( result.proveedortipo[0] ) );
            }
        } );

    };
};

const onCreate = ( ) => {
    return ( dispatch ) => {
        dispatch( setLoading() );

        ProveedorTipoServices.onCreate().then( ( result ) => {
            if ( result.response == 1 ) {
                dispatch( setCreate( result ) );
                dispatch( disabledActions.onCreate() );
            }
        } ) . finally ( () => {
            dispatch( removeLoading() );
        } );
    };
};

const onGrabar = ( proveedortipo ) => {
    return ( dispatch ) => {
        if ( !onValidate( proveedortipo ) ) {
            dispatch( onChange( proveedortipo ) );
            return;
        }
        dispatch( setLoading() );

        ProveedorTipoServices.onGrabar( proveedortipo ).then( (result) => {
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

const onEdit = ( idproveedortipo ) => {
    return ( dispatch ) => {
        dispatch( onLoad() );

        ProveedorTipoServices.onEdit( idproveedortipo ).then( ( result ) => {
            if ( result.response == 1 ) {
                dispatch( setEditar( result ) );
            }
        } ) . finally ( () => {
            // dispatch( removeLoading() );
        } );
    };
};

const onEditar = ( proveedortipo ) => {
    return ( dispatch ) => {
        dispatch( disabledActions.onEditar() );
        proveedortipo.update = true;
        dispatch( onChange( proveedortipo ) );
    };
};

const onUpdate = ( proveedortipo ) => {
    return ( dispatch ) => {
        if ( !onValidate( proveedortipo ) ) {
            dispatch( onChange( proveedortipo ) );
            return;
        }
        dispatch( setLoading() );

        ProveedorTipoServices.onUpdate( proveedortipo ).then( (result) => {
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

const onShow = ( idproveedortipo ) => {
    return ( dispatch ) => {
        dispatch( onLoad() );

        ProveedorTipoServices.onShow( idproveedortipo ).then( ( result ) => {
            if ( result.response == 1 ) {
                dispatch( setShow( result ) );
            }
        } ) . finally ( () => {
            // dispatch( removeLoading() );
        } );
    };
};

const onDelete = ( proveedortipo ) => {
    return ( dispatch ) => {
        dispatch( setLoading() );

        ProveedorTipoServices.onDelete( proveedortipo ).then( (result) => {

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

const onSearchData = ( proveedortipo ) => {
    return ( dispatch ) => {
        dispatch( setLoading() );

        ProveedorTipoServices.onSearchData( proveedortipo ).then( (result) => {
            if ( result.response == 1 ) {
                dispatch( disabledActions.onAction() );
                dispatch( setState( result.proveedortipo ) );
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
        return await ProveedorTipoServices.onImprimir().then( async (result) => {
            if ( result.response == 1 ) {
                await dispatch( setImprimir( result ) );
            }
            return result;
        } ) . finally ( () => {
            dispatch( removeLoading() );
        });
    };
};

function onValidate( proveedortipo ) {
    const { descripcion } = proveedortipo;
    let bandera = true;
    if ( descripcion.toString().trim().length === 0 ) {
        proveedortipo.error.descripcion   = true;
        proveedortipo.message.descripcion = "Campo requerido";
        bandera = false;
    }
    if ( descripcion.toString().length > 200 ) {
        proveedortipo.error.descripcion   = true;
        proveedortipo.message.descripcion = "Se permite máximo 200 caracteres";
        bandera = false;
    }
    if ( !bandera ) {
        C_Message( "error", "Problemas al registrar" );
    }
    return bandera;
};

export const proveedorTipoActions = {
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
