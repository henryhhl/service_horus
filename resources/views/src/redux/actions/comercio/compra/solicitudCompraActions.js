
import { C_Message } from "../../../../components";

import { Strings } from "../../../constants";
import { SolicitudCompraServices } from "../../../services/comercio/compra/solicitudCompraServices";

import { disabledActions } from "../../config/disabledActions";
import { removeLoading, setLoading } from "../../config/loadingActions";
import { paginationActions } from "../../config/paginationActions";

const onLimpiar = ( ) => ( {
    type: Strings.solicitudcompra_setLimpiar,
} );

const onLoad = ( ) => ( {
    type: Strings.solicitudcompra_setLoad,
} );

const setState = ( data ) => ( {
    type: Strings.solicitudcompra_setState,
    payload: data,
} );

const onChange = ( data ) => ( {
    type: Strings.solicitudcompra_onChange,
    payload: data,
} );

const setCreate = ( data ) => ( {
    type:    Strings.solicitudcompra_onCreate,
    payload: data,
} );

const setEditar = ( data ) => ( {
    type:    Strings.solicitudcompra_onEditar,
    payload: data,
} );

const setShow = ( data ) => ( {
    type:    Strings.solicitudcompra_onShow,
    payload: data,
} );

const onFocus = ( ) => ( {
    type: Strings.solicitudcompra_onFocus,
} );

const offFocus = ( ) => ( {
    type: Strings.solicitudcompra_offFocus,
} );

const setImprimir = ( data ) => ( {
    type: Strings.solicitudcompra_setImprimir,
    payload: data,
} );

const initData = ( ) => {
    return async ( dispatch ) => {

        await dispatch( onFocus() );
        await dispatch( paginationActions.removePagination() );
        await dispatch( disabledActions.onLimpiar() );
        await dispatch( onLimpiar() );

        SolicitudCompraServices.getData( ).then ( ( result ) => {
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
        SolicitudCompraServices.getData( ).then ( async ( result ) => {
            if ( result.response == 1 ) {
                // dispatch( setDataCiudad(result.ciudad) );
            }
        } );
    };
};

const onChangePage = ( page ) => {
    return ( dispatch ) => {

        SolicitudCompraServices.getData( page ).then ( async ( result ) => {
            if ( result.response == 1 ) {
                let obj = {
                    pagination: result.pagination,
                    pagina: page,
                };
                await dispatch( disabledActions.onAction() );
                await dispatch( paginationActions.setPagination( obj ) );
                await dispatch( setState( result.solicitudcompra[0] ) );
            }
        } );

    };
};

const onCreate = ( ) => {
    return ( dispatch ) => {
        dispatch( setLoading() );

        SolicitudCompraServices.onCreate().then( ( result ) => {
            if ( result.response == 1 ) {
                dispatch( setCreate( result ) );
                dispatch( disabledActions.onCreate() );
            }
        } ) . finally ( () => {
            dispatch( removeLoading() );
        } );
    };
};

const onGrabar = ( solicitudcompra ) => {
    return ( dispatch ) => {
        if ( !onValidate( solicitudcompra ) ) {
            dispatch( onChange( solicitudcompra ) );
            return;
        }
        dispatch( setLoading() );

        SolicitudCompraServices.onGrabar( solicitudcompra ).then( (result) => {
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

const onEdit = ( idsolicitudcompra ) => {
    return ( dispatch ) => {
        dispatch( onLoad() );

        SolicitudCompraServices.onEdit( idsolicitudcompra ).then( ( result ) => {
            if ( result.response == 1 ) {
                dispatch( setEditar( result ) );
            }
        } ) . finally ( () => {
            // dispatch( removeLoading() );
        } );
    };
};

const onEditar = ( solicitudcompra ) => {
    return ( dispatch ) => {
        dispatch( disabledActions.onEditar() );
        solicitudcompra.update = true;
        dispatch( onChange( solicitudcompra ) );
    };
};

const onUpdate = ( solicitudcompra ) => {
    return ( dispatch ) => {
        if ( !onValidate( solicitudcompra ) ) {
            dispatch( onChange( solicitudcompra ) );
            return;
        }
        dispatch( setLoading() );

        SolicitudCompraServices.onUpdate( solicitudcompra ).then( (result) => {
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

const onShow = ( idsolicitudcompra ) => {
    return ( dispatch ) => {
        dispatch( onLoad() );

        SolicitudCompraServices.onShow( idsolicitudcompra ).then( ( result ) => {
            if ( result.response == 1 ) {
                dispatch( setShow( result ) );
            }
        } ) . finally ( () => {
            // dispatch( removeLoading() );
        } );
    };
};

const onDelete = ( solicitudcompra ) => {
    return ( dispatch ) => {
        dispatch( setLoading() );

        SolicitudCompraServices.onDelete( solicitudcompra ).then( (result) => {

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

const onSearchData = ( solicitudcompra ) => {
    return ( dispatch ) => {
        dispatch( setLoading() );

        SolicitudCompraServices.onSearchData( solicitudcompra ).then( (result) => {
            if ( result.response == 1 ) {
                dispatch( disabledActions.onAction() );
                dispatch( setState( result.solicitudcompra ) );
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
        return await SolicitudCompraServices.onImprimir().then( async (result) => {
            if ( result.response == 1 ) {
                await dispatch( setImprimir( result ) );
            }
            return result;
        } ) . finally ( () => {
            dispatch( removeLoading() );
        });
    };
};

function onValidate( solicitudcompra ) {
    const { codigo } = solicitudcompra;
    let bandera = true;
    if ( codigo?.toString().length > 150 ) {
        solicitudcompra.error.codigo   = true;
        solicitudcompra.message.codigo = "Se permite máximo 150 caracteres";
        bandera = false;
    }
    if ( typeof solicitudcompra.fkidsucursal !== "number" ) {
        solicitudcompra.error.fkidsucursal   = true;
        solicitudcompra.message.fkidsucursal = "Campo requerido";
        bandera = false;
    }
    if ( typeof solicitudcompra.fkidalmacen !== "number" ) {
        solicitudcompra.error.fkidalmacen   = true;
        solicitudcompra.message.fkidalmacen = "Campo requerido";
        bandera = false;
    }
    if ( typeof solicitudcompra.fkidconceptocompra !== "number" ) {
        solicitudcompra.error.fkidconceptocompra   = true;
        solicitudcompra.message.fkidconceptocompra = "Campo requerido";
        bandera = false;
    }
    if ( typeof solicitudcompra.fkidseccioninventario !== "number" ) {
        solicitudcompra.error.fkidseccioninventario   = true;
        solicitudcompra.message.fkidseccioninventario = "Campo requerido";
        bandera = false;
    }
    if ( typeof solicitudcompra.fkidproveedor !== "number" ) {
        solicitudcompra.error.fkidproveedor   = true;
        solicitudcompra.message.fkidproveedor = "Campo requerido";
        bandera = false;
    }
    if ( typeof solicitudcompra.fkidmoneda !== "number" ) {
        solicitudcompra.error.fkidmoneda   = true;
        solicitudcompra.message.fkidmoneda = "Campo requerido";
        bandera = false;
    }
    let contador = 0;
    for (let index = 0; index < solicitudcompra.arraySolicitudCompraDetalle.length; index++) {
        const element = solicitudcompra.arraySolicitudCompraDetalle[index];
        if ( element.fkidproducto != null ) {
            if ( parseInt(element.cantidadsolicitada) <= 0 ) {
                C_Message( "warning", `La cantidad de ${element.producto} debe ser mayor a 0` );
                bandera = false;
                element.errorcantidad = true;
            }
            if ( parseInt(element.costounitario) <= 0 ) {
                C_Message( "warning", `La cantidad de ${element.producto} debe ser mayor a 0` );
                bandera = false;
                element.errorcostounitario = true;
            }
        } else {
            contador++;
        }
    }
    if ( contador === solicitudcompra.arraySolicitudCompraDetalle.length ) {
        C_Message( "warning", `Campo Producto requerido` );
        bandera = false;
    }
    if ( !bandera ) {
        C_Message( "error", "Conflictos al registrar" );
    }
    return bandera;
};

export const SolicitudCompraActions = {
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
