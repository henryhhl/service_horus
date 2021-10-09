
import { C_Message } from "../../../../components";

import { Strings } from "../../../constants";
import { almacenServices } from "../../../services/comercio/inventario/almacenServices";

import { disabledActions } from "../../config/disabledActions";
import { removeLoading, setLoading } from "../../config/loadingActions";
import { paginationActions } from "../../config/paginationActions";

const onLimpiar = ( ) => ( {
    type: Strings.almacen_setLimpiar,
} );

const onLoad = ( ) => ( {
    type: Strings.almacen_setLoad,
} );

const setState = ( data ) => ( {
    type: Strings.almacen_setState,
    payload: data,
} );

const onChange = ( data ) => ( {
    type: Strings.almacen_onChange,
    payload: data,
} );

const setCreate = ( data ) => ( {
    type:    Strings.almacen_onCreate,
    payload: data,
} );

const setEditar = ( data ) => ( {
    type:    Strings.almacen_onEditar,
    payload: data,
} );

const setShow = ( data ) => ( {
    type:    Strings.almacen_onShow,
    payload: data,
} );

const onFocus = ( ) => ( {
    type: Strings.almacen_onFocus,
} );

const offFocus = ( ) => ( {
    type: Strings.almacen_offFocus,
} );

const setImprimir = ( data ) => ( {
    type: Strings.almacen_setImprimir,
    payload: data,
} );

const initData = ( ) => {
    return async ( dispatch ) => {

        await dispatch( onFocus() );
        await dispatch( paginationActions.removePagination() );
        await dispatch( disabledActions.onLimpiar() );
        await dispatch( onLimpiar() );

        almacenServices.getData( ).then ( ( result ) => {
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
        almacenServices.getData( ).then ( async ( result ) => {
            if ( result.response == 1 ) {
                // dispatch( setDataCiudad(result.ciudad) );
            }
        } );
    };
};

const onChangePage = ( page ) => {
    return ( dispatch ) => {

        almacenServices.getData( page ).then ( async ( result ) => {
            if ( result.response == 1 ) {
                let obj = {
                    pagination: result.pagination,
                    pagina: page,
                };
                await dispatch( disabledActions.onAction() );
                await dispatch( paginationActions.setPagination( obj ) );
                await dispatch( setState( result.almacen[0] ) );
            }
        } );

    };
};

const onCreate = ( ) => {
    return ( dispatch ) => {
        dispatch( setLoading() );

        almacenServices.onCreate().then( ( result ) => {
            if ( result.response == 1 ) {
                dispatch( setCreate( result ) );
                dispatch( disabledActions.onCreate() );
            }
        } ) . finally ( () => {
            dispatch( removeLoading() );
        } );
    };
};

const onGrabar = ( almacen ) => {
    return ( dispatch ) => {
        if ( !onValidate( almacen ) ) {
            dispatch( onChange( almacen ) );
            return;
        }
        dispatch( setLoading() );

        almacenServices.onGrabar( almacen ).then( (result) => {
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

const onEdit = ( idalmacen ) => {
    return ( dispatch ) => {
        dispatch( onLoad() );

        almacenServices.onEdit( idalmacen ).then( ( result ) => {
            if ( result.response == 1 ) {
                dispatch( setEditar( result ) );
            }
        } ) . finally ( () => {
            // dispatch( removeLoading() );
        } );
    };
};

const onEditar = ( almacen ) => {
    return ( dispatch ) => {
        dispatch( disabledActions.onEditar() );
        almacen.update = true;
        dispatch( onChange( almacen ) );
    };
};

const onUpdate = ( almacen ) => {
    return ( dispatch ) => {
        if ( !onValidate( almacen ) ) {
            dispatch( onChange( almacen ) );
            return;
        }
        dispatch( setLoading() );

        almacenServices.onUpdate( almacen ).then( (result) => {
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

const onShow = ( idalmacen ) => {
    return ( dispatch ) => {
        dispatch( onLoad() );

        almacenServices.onShow( idalmacen ).then( ( result ) => {
            if ( result.response == 1 ) {
                dispatch( setShow( result ) );
            }
        } ) . finally ( () => {
            // dispatch( removeLoading() );
        } );
    };
};

const onDelete = ( almacen ) => {
    return ( dispatch ) => {
        dispatch( setLoading() );

        almacenServices.onDelete( almacen ).then( (result) => {

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

const onSearchData = ( almacen ) => {
    return ( dispatch ) => {
        dispatch( setLoading() );

        almacenServices.onSearchData( almacen ).then( (result) => {
            if ( result.response == 1 ) {
                dispatch( disabledActions.onAction() );
                dispatch( setState( result.almacen ) );
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
        return await almacenServices.onImprimir().then( async (result) => {
            if ( result.response == 1 ) {
                await dispatch( setImprimir( result ) );
            }
            return result;
        } ) . finally ( () => {
            dispatch( removeLoading() );
        });
    };
};

function onValidate( almacen ) {
    const { abreviatura, descripcion, direccion, fkidsucursal } = almacen;
    let bandera = true;
    if ( abreviatura?.toString().length > 50 ) {
        almacen.error.abreviatura   = true;
        almacen.message.abreviatura = "Se permite máximo 50 caracteres";
        bandera = false;
    }
    if ( descripcion.toString().trim().length === 0 ) {
        almacen.error.descripcion   = true;
        almacen.message.descripcion = "Campo requerido";
        bandera = false;
    }
    if ( descripcion.toString().length > 200 ) {
        almacen.error.descripcion   = true;
        almacen.message.descripcion = "Se permite máximo 200 caracteres";
        bandera = false;
    }
    if ( direccion.toString().trim().length === 0 ) {
        almacen.error.direccion   = true;
        almacen.message.direccion = "Campo requerido";
        bandera = false;
    }
    if ( direccion.toString().length > 250 ) {
        almacen.error.direccion   = true;
        almacen.message.direccion = "Se permite máximo 200 caracteres";
        bandera = false;
    }
    if ( typeof fkidsucursal !== "number" ) {
        almacen.error.fkidsucursal   = true;
        almacen.message.fkidsucursal = "Campo requerido";
        bandera = false;
    }
    if ( !bandera ) {
        C_Message( "error", "Problemas al registrar" );
    }
    return bandera;
};

export const almacenActions = {
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
