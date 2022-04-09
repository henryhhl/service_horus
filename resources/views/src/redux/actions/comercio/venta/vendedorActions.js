
import { C_Message } from "../../../../components";

import { Strings } from "../../../constants";
import { VendedorServices } from "../../../services/comercio/venta/vendedorServices";

import { disabledActions } from "../../config/disabledActions";
import { removeLoading, setLoading } from "../../config/loadingActions";
import { paginationActions } from "../../config/paginationActions";

const onLimpiar = ( ) => ( {
    type: Strings.vendedor_setLimpiar,
} );

const onLoad = ( ) => ( {
    type: Strings.vendedor_setLoad,
} );

const setState = ( data ) => ( {
    type: Strings.vendedor_setState,
    payload: data,
} );

const onChange = ( data ) => ( {
    type: Strings.vendedor_onChange,
    payload: data,
} );

const setCreate = ( data ) => ( {
    type:    Strings.vendedor_onCreate,
    payload: data,
} );

const setEditar = ( data ) => ( {
    type:    Strings.vendedor_onEditar,
    payload: data,
} );

const setShow = ( data ) => ( {
    type:    Strings.vendedor_onShow,
    payload: data,
} );

const onFocus = ( ) => ( {
    type: Strings.vendedor_onFocus,
} );

const offFocus = ( ) => ( {
    type: Strings.vendedor_offFocus,
} );

const setImprimir = ( data ) => ( {
    type: Strings.vendedor_setImprimir,
    payload: data,
} );

const initData = ( ) => {
    return async ( dispatch ) => {

        await dispatch( onFocus() );
        await dispatch( paginationActions.removePagination() );
        await dispatch( disabledActions.onLimpiar() );
        await dispatch( onLimpiar() );

        VendedorServices.getData( ).then ( ( result ) => {
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
        VendedorServices.getData( ).then ( async ( result ) => {
            if ( result.response == 1 ) {
                // dispatch( setDataCiudad(result.ciudad) );
            }
        } );
    };
};

const onChangePage = ( page ) => {
    return ( dispatch ) => {

        VendedorServices.getData( page ).then ( async ( result ) => {
            if ( result.response == 1 ) {
                let obj = {
                    pagination: result.pagination,
                    pagina: page,
                };
                await dispatch( disabledActions.onAction() );
                await dispatch( paginationActions.setPagination( obj ) );
                await dispatch( setState( result.arrayVendedor[0] ) );
            }
        } );

    };
};

const onCreate = ( ) => {
    return ( dispatch ) => {
        dispatch( setLoading() );

        VendedorServices.onCreate().then( ( result ) => {
            if ( result.response == 1 ) {
                dispatch( setCreate( result ) );
                dispatch( disabledActions.onCreate() );
            }
        } ) . finally ( () => {
            dispatch( removeLoading() );
        } );
    };
};

const onGrabar = ( vendedor ) => {
    return ( dispatch ) => {
        if ( !onValidate( vendedor ) ) {
            dispatch( onChange( vendedor ) );
            return;
        }
        dispatch( setLoading() );

        VendedorServices.onGrabar( vendedor ).then( (result) => {
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

const onEdit = ( idvendedor ) => {
    return ( dispatch ) => {
        dispatch( onLoad() );

        VendedorServices.onEdit( idvendedor ).then( ( result ) => {
            if ( result.response == 1 ) {
                dispatch( setEditar( result ) );
            }
        } ) . finally ( () => {
            // dispatch( removeLoading() );
        } );
    };
};

const onEditar = ( vendedor ) => {
    return ( dispatch ) => {
        dispatch( disabledActions.onEditar() );
        vendedor.update = true;
        dispatch( onChange( vendedor ) );
    };
};

const onUpdate = ( vendedor ) => {
    return ( dispatch ) => {
        if ( !onValidate( vendedor ) ) {
            dispatch( onChange( vendedor ) );
            return;
        }
        dispatch( setLoading() );

        VendedorServices.onUpdate( vendedor ).then( (result) => {
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

const onShow = ( idvendedor ) => {
    return ( dispatch ) => {
        dispatch( onLoad() );

        VendedorServices.onShow( idvendedor ).then( ( result ) => {
            if ( result.response == 1 ) {
                dispatch( setShow( result ) );
            }
        } ) . finally ( () => {
            // dispatch( removeLoading() );
        } );
    };
};

const onDelete = ( vendedor ) => {
    return ( dispatch ) => {
        dispatch( setLoading() );

        VendedorServices.onDelete( vendedor ).then( (result) => {

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

const onSearchData = ( vendedor ) => {
    return ( dispatch ) => {
        dispatch( setLoading() );

        VendedorServices.onSearchData( vendedor ).then( (result) => {
            if ( result.response == 1 ) {
                dispatch( disabledActions.onAction() );
                dispatch( setState( result.vendedor ) );
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
        return await VendedorServices.onImprimir().then( async (result) => {
            if ( result.response == 1 ) {
                await dispatch( setImprimir( result ) );
            }
            return result;
        } ) . finally ( () => {
            dispatch( removeLoading() );
        });
    };
};

function onValidate( vendedor ) {
    let bandera = true;
    if ( typeof vendedor.fkidciudadpais !== "number" ) {
        vendedor.error.fkidciudadpais   = true;
        vendedor.message.fkidciudadpais = "Campo requerido";
        bandera = false;
    }
    if ( typeof vendedor.fkidciudad !== "number" ) {
        vendedor.error.fkidciudad = true;
        vendedor.message.fkidciudad = "Campo requerido";
        bandera = false;
    }
    if ( typeof vendedor.fkidcomisionventa !== "number" ) {
        vendedor.error.fkidcomisionventa   = true;
        vendedor.message.fkidcomisionventa = "Campo requerido";
        bandera = false;
    }

    if ( vendedor.codigo?.toString().length > 150 ) {
        categoria.error.codigo   = true;
        categoria.message.codigo = "Se permite máximo 150 caracteres";
        bandera = false;
    }
    if ( vendedor.ci.toString().trim().length === 0 ) {
        vendedor.error.ci   = true;
        vendedor.message.ci = "Campo requerido";
        bandera = false;
    }
    if ( vendedor.ci.toString().length > 100 ) {
        vendedor.error.ci   = true;
        vendedor.message.ci = "Se permite máximo 100 caracteres";
        bandera = false;
    }
    if ( vendedor.nombre.toString().trim().length === 0 ) {
        vendedor.error.nombre   = true;
        vendedor.message.nombre = "Campo requerido";
        bandera = false;
    }
    if ( vendedor.nombre.toString().length > 150 ) {
        vendedor.error.nombre   = true;
        vendedor.message.nombre = "Se permite máximo 150 caracteres";
        bandera = false;
    }
    if ( vendedor.apellido.toString().trim().length === 0 ) {
        vendedor.error.apellido   = true;
        vendedor.message.apellido = "Campo requerido";
        bandera = false;
    }
    if ( vendedor.apellido.toString().length > 250 ) {
        vendedor.error.apellido   = true;
        vendedor.message.apellido = "Se permite máximo 250 caracteres";
        bandera = false;
    }
    if ( !bandera ) {
        C_Message( "error", "Problemas al registrar" );
    }
    return bandera;
};

export const vendedorActions = {
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
