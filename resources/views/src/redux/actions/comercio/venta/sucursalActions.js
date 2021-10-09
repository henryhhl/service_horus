
import { C_Message } from "../../../../components";

import { Strings } from "../../../constants";
import { sucursalServices } from "../../../services/comercio/venta/sucursalServices";

import { disabledActions } from "../../config/disabledActions";
import { removeLoading, setLoading } from "../../config/loadingActions";
import { paginationActions } from "../../config/paginationActions";

const onLimpiar = ( ) => ( {
    type: Strings.sucursal_setLimpiar,
} );

const onLoad = ( ) => ( {
    type: Strings.sucursal_setLoad,
} );

const setState = ( data ) => ( {
    type: Strings.sucursal_setState,
    payload: data,
} );

const onChange = ( data ) => ( {
    type: Strings.sucursal_onChange,
    payload: data,
} );

const setCreate = ( data ) => ( {
    type:    Strings.sucursal_onCreate,
    payload: data,
} );

const setEditar = ( data ) => ( {
    type:    Strings.sucursal_onEditar,
    payload: data,
} );

const setShow = ( data ) => ( {
    type:    Strings.sucursal_onShow,
    payload: data,
} );

const onFocus = ( ) => ( {
    type: Strings.sucursal_onFocus,
} );

const offFocus = ( ) => ( {
    type: Strings.sucursal_offFocus,
} );

const setImprimir = ( data ) => ( {
    type: Strings.sucursal_setImprimir,
    payload: data,
} );

const initData = ( ) => {
    return async ( dispatch ) => {

        await dispatch( onFocus() );
        await dispatch( paginationActions.removePagination() );
        await dispatch( disabledActions.onLimpiar() );
        await dispatch( onLimpiar() );

        sucursalServices.getData( ).then ( ( result ) => {
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
        sucursalServices.getData( ).then ( async ( result ) => {
            if ( result.response == 1 ) {
                // dispatch( setDataCiudad(result.ciudad) );
            }
        } );
    };
};

const onChangePage = ( page ) => {
    return ( dispatch ) => {

        sucursalServices.getData( page ).then ( async ( result ) => {
            if ( result.response == 1 ) {
                let obj = {
                    pagination: result.pagination,
                    pagina: page,
                };
                await dispatch( disabledActions.onAction() );
                await dispatch( paginationActions.setPagination( obj ) );
                await dispatch( setState( result.sucursal[0] ) );
            }
        } );

    };
};

const onCreate = ( ) => {
    return ( dispatch ) => {
        dispatch( setLoading() );

        sucursalServices.onCreate().then( ( result ) => {
            if ( result.response == 1 ) {
                dispatch( setCreate( result ) );
                dispatch( disabledActions.onCreate() );
            }
        } ) . finally ( () => {
            dispatch( removeLoading() );
        } );
    };
};

const onGrabar = ( sucursal ) => {
    return ( dispatch ) => {
        if ( !onValidate( sucursal ) ) {
            dispatch( onChange( sucursal ) );
            return;
        }
        dispatch( setLoading() );

        sucursalServices.onGrabar( sucursal ).then( (result) => {
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

const onEdit = ( idsucursal ) => {
    return ( dispatch ) => {
        dispatch( onLoad() );

        sucursalServices.onEdit( idsucursal ).then( ( result ) => {
            if ( result.response == 1 ) {
                dispatch( setEditar( result ) );
            }
        } ) . finally ( () => {
            // dispatch( removeLoading() );
        } );
    };
};

const onEditar = ( sucursal ) => {
    return ( dispatch ) => {
        dispatch( disabledActions.onEditar() );
        sucursal.update = true;
        dispatch( onChange( sucursal ) );
    };
};

const onUpdate = ( sucursal ) => {
    return ( dispatch ) => {
        if ( !onValidate( sucursal ) ) {
            dispatch( onChange( sucursal ) );
            return;
        }
        dispatch( setLoading() );

        sucursalServices.onUpdate( sucursal ).then( (result) => {
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

const onShow = ( idsucursal ) => {
    return ( dispatch ) => {
        dispatch( onLoad() );

        sucursalServices.onShow( idsucursal ).then( ( result ) => {
            if ( result.response == 1 ) {
                dispatch( setShow( result ) );
            }
        } ) . finally ( () => {
            // dispatch( removeLoading() );
        } );
    };
};

const onDelete = ( sucursal ) => {
    return ( dispatch ) => {
        dispatch( setLoading() );

        sucursalServices.onDelete( sucursal ).then( (result) => {

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

const onSearchData = ( sucursal ) => {
    return ( dispatch ) => {
        dispatch( setLoading() );

        sucursalServices.onSearchData( sucursal ).then( (result) => {
            if ( result.response == 1 ) {
                dispatch( disabledActions.onAction() );
                dispatch( setState( result.sucursal ) );
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
        return await sucursalServices.onImprimir().then( async (result) => {
            if ( result.response == 1 ) {
                await dispatch( setImprimir( result ) );
            }
            return result;
        } ) . finally ( () => {
            dispatch( removeLoading() );
        });
    };
};

function onValidate( sucursal ) {
    const { abreviatura, descripcion, direccion, fkidciudad, fkidunionsucursal } = sucursal;
    let bandera = true;
    if ( descripcion.toString().trim().length === 0 ) {
        sucursal.error.descripcion   = true;
        sucursal.message.descripcion = "Campo requerido";
        bandera = false;
    }
    if ( descripcion.toString().length > 200 ) {
        sucursal.error.descripcion   = true;
        sucursal.message.descripcion = "Se permite máximo 200 caracteres";
        bandera = false;
    }
    if ( direccion.toString().trim().length === 0 ) {
        sucursal.error.direccion   = true;
        sucursal.message.direccion = "Campo requerido";
        bandera = false;
    }
    if ( direccion.toString().length > 250 ) {
        sucursal.error.direccion   = true;
        sucursal.message.direccion = "Se permite máximo 200 caracteres";
        bandera = false;
    }
    if ( abreviatura?.toString().length > 50 ) {
        sucursal.error.abreviatura   = true;
        sucursal.message.abreviatura = "Se permite máximo 50 caracteres";
        bandera = false;
    }
    if ( typeof fkidciudad !== "number" ) {
        sucursal.error.fkidciudad   = true;
        sucursal.message.fkidciudad = "Campo requerido";
        bandera = false;
    }
    if ( typeof fkidunionsucursal !== "number" ) {
        sucursal.error.fkidunionsucursal   = true;
        sucursal.message.fkidunionsucursal = "Campo requerido";
        bandera = false;
    }
    if ( !bandera ) {
        C_Message( "error", "Problemas al registrar" );
    }
    return bandera;
};

export const sucursalActions = {
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
