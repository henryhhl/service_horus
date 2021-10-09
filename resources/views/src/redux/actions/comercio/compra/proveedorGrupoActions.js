
import { C_Message } from "../../../../components";

import { Strings } from "../../../constants";
import { ProveedorGrupoServices } from "../../../services/comercio/compra/proveedorGrupoServices";

import { disabledActions } from "../../config/disabledActions";
import { removeLoading, setLoading } from "../../config/loadingActions";
import { paginationActions } from "../../config/paginationActions";

const onLimpiar = ( ) => ( {
    type: Strings.proveedorgrupo_setLimpiar,
} );

const onLoad = ( ) => ( {
    type: Strings.proveedorgrupo_setLoad,
} );

const setState = ( data ) => ( {
    type: Strings.proveedorgrupo_setState,
    payload: data,
} );

const onChange = ( data ) => ( {
    type: Strings.proveedorgrupo_onChange,
    payload: data,
} );

const setCreate = ( data ) => ( {
    type:    Strings.proveedorgrupo_onCreate,
    payload: data,
} );

const setEditar = ( data ) => ( {
    type:    Strings.proveedorgrupo_onEditar,
    payload: data,
} );

const setShow = ( data ) => ( {
    type:    Strings.proveedorgrupo_onShow,
    payload: data,
} );

const onFocus = ( ) => ( {
    type: Strings.proveedorgrupo_onFocus,
} );

const offFocus = ( ) => ( {
    type: Strings.proveedorgrupo_offFocus,
} );

const setImprimir = ( data ) => ( {
    type: Strings.proveedorgrupo_setImprimir,
    payload: data,
} );

const initData = ( ) => {
    return async ( dispatch ) => {

        await dispatch( onFocus() );
        await dispatch( paginationActions.removePagination() );
        await dispatch( disabledActions.onLimpiar() );
        await dispatch( onLimpiar() );

        ProveedorGrupoServices.getData( ).then ( ( result ) => {
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
        ProveedorGrupoServices.getData( ).then ( async ( result ) => {
            if ( result.response == 1 ) {
                // dispatch( setDataCiudad(result.ciudad) );
            }
        } );
    };
};

const onChangePage = ( page ) => {
    return ( dispatch ) => {

        ProveedorGrupoServices.getData( page ).then ( async ( result ) => {
            if ( result.response == 1 ) {
                let obj = {
                    pagination: result.pagination,
                    pagina: page,
                };
                await dispatch( disabledActions.onAction() );
                await dispatch( paginationActions.setPagination( obj ) );
                await dispatch( setState( result.proveedorgrupo[0] ) );
            }
        } );

    };
};

const onCreate = ( ) => {
    return ( dispatch ) => {
        dispatch( setLoading() );

        ProveedorGrupoServices.onCreate().then( ( result ) => {
            if ( result.response == 1 ) {
                dispatch( setCreate( result ) );
                dispatch( disabledActions.onCreate() );
            }
        } ) . finally ( () => {
            dispatch( removeLoading() );
        } );
    };
};

const onGrabar = ( proveedorgrupo ) => {
    return ( dispatch ) => {
        if ( !onValidate( proveedorgrupo ) ) {
            dispatch( onChange( proveedorgrupo ) );
            return;
        }
        dispatch( setLoading() );

        ProveedorGrupoServices.onGrabar( proveedorgrupo ).then( (result) => {
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

const onEdit = ( idproveedorgrupo ) => {
    return ( dispatch ) => {
        dispatch( onLoad() );

        ProveedorGrupoServices.onEdit( idproveedorgrupo ).then( ( result ) => {
            if ( result.response == 1 ) {
                dispatch( setEditar( result ) );
            }
        } ) . finally ( () => {
            // dispatch( removeLoading() );
        } );
    };
};

const onEditar = ( proveedorgrupo ) => {
    return ( dispatch ) => {
        dispatch( disabledActions.onEditar() );
        proveedorgrupo.update = true;
        dispatch( onChange( proveedorgrupo ) );
    };
};

const onUpdate = ( proveedorgrupo ) => {
    return ( dispatch ) => {
        if ( !onValidate( proveedorgrupo ) ) {
            dispatch( onChange( proveedorgrupo ) );
            return;
        }
        dispatch( setLoading() );

        ProveedorGrupoServices.onUpdate( proveedorgrupo ).then( (result) => {
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

const onShow = ( idproveedorgrupo ) => {
    return ( dispatch ) => {
        dispatch( onLoad() );

        ProveedorGrupoServices.onShow( idproveedorgrupo ).then( ( result ) => {
            if ( result.response == 1 ) {
                dispatch( setShow( result ) );
            }
        } ) . finally ( () => {
            // dispatch( removeLoading() );
        } );
    };
};

const onDelete = ( proveedorgrupo ) => {
    return ( dispatch ) => {
        dispatch( setLoading() );

        ProveedorGrupoServices.onDelete( proveedorgrupo ).then( (result) => {

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

const onSearchData = ( proveedorgrupo ) => {
    return ( dispatch ) => {
        dispatch( setLoading() );

        ProveedorGrupoServices.onSearchData( proveedorgrupo ).then( (result) => {
            if ( result.response == 1 ) {
                dispatch( disabledActions.onAction() );
                dispatch( setState( result.proveedorgrupo ) );
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
        return await ProveedorGrupoServices.onImprimir().then( async (result) => {
            if ( result.response == 1 ) {
                await dispatch( setImprimir( result ) );
            }
            return result;
        } ) . finally ( () => {
            dispatch( removeLoading() );
        });
    };
};

function onValidate( proveedorgrupo ) {
    const { descripcion } = proveedorgrupo;
    let bandera = true;
    if ( descripcion.toString().trim().length === 0 ) {
        proveedorgrupo.error.descripcion   = true;
        proveedorgrupo.message.descripcion = "Campo requerido";
        bandera = false;
    }
    if ( descripcion.toString().length > 200 ) {
        proveedorgrupo.error.descripcion   = true;
        proveedorgrupo.message.descripcion = "Se permite máximo 200 caracteres";
        bandera = false;
    }
    if ( !bandera ) {
        C_Message( "error", "Problemas al registrar" );
    }
    return bandera;
};

export const proveedorGrupoActions = {
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
