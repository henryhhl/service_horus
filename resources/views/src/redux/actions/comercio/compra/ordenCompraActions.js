
import { C_Message } from "../../../../components";

import { Strings } from "../../../constants";
import { OrdenCompraServices } from "../../../services/comercio/compra/ordenCompraServices";

import { disabledActions } from "../../config/disabledActions";
import { removeLoading, setLoading } from "../../config/loadingActions";
import { paginationActions } from "../../config/paginationActions";

const onLimpiar = ( ) => ( {
    type: Strings.ordencompra_setLimpiar,
} );

const onLoad = ( ) => ( {
    type: Strings.ordencompra_setLoad,
} );

const setState = ( data ) => ( {
    type: Strings.ordencompra_setState,
    payload: data,
} );

const onChange = ( data ) => ( {
    type: Strings.ordencompra_onChange,
    payload: data,
} );

const setCreate = ( data ) => ( {
    type:    Strings.ordencompra_onCreate,
    payload: data,
} );

const setEditar = ( data ) => ( {
    type:    Strings.ordencompra_onEditar,
    payload: data,
} );

const setShow = ( data ) => ( {
    type:    Strings.ordencompra_onShow,
    payload: data,
} );

const onFocus = ( ) => ( {
    type: Strings.ordencompra_onFocus,
} );

const offFocus = ( ) => ( {
    type: Strings.ordencompra_offFocus,
} );

const setImprimir = ( data ) => ( {
    type: Strings.ordencompra_setImprimir,
    payload: data,
} );

const initData = ( ) => {
    return async ( dispatch ) => {

        await dispatch( onFocus() );
        await dispatch( paginationActions.removePagination() );
        await dispatch( disabledActions.onLimpiar() );
        await dispatch( onLimpiar() );

        OrdenCompraServices.getData( ).then ( ( result ) => {
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
        OrdenCompraServices.getData( ).then ( async ( result ) => {
            if ( result.response == 1 ) {
                // dispatch( setDataCiudad(result.ciudad) );
            }
        } );
    };
};

const onChangePage = ( page ) => {
    return ( dispatch ) => {

        OrdenCompraServices.getData( page ).then ( async ( result ) => {
            if ( result.response == 1 ) {
                let obj = {
                    pagination: result.pagination,
                    pagina: page,
                };
                await dispatch( disabledActions.onAction() );
                await dispatch( paginationActions.setPagination( obj ) );
                await dispatch( setState( result.ordencompra[0] ) );
            }
        } );

    };
};

const onCreate = ( ) => {
    return ( dispatch ) => {
        dispatch( setLoading() );

        OrdenCompraServices.onCreate().then( ( result ) => {
            if ( result.response == 1 ) {
                dispatch( setCreate( result ) );
                dispatch( disabledActions.onCreate() );
            }
        } ) . finally ( () => {
            dispatch( removeLoading() );
        } );
    };
};

const onGrabar = ( ordencompra ) => {
    return ( dispatch ) => {
        if ( !onValidate( ordencompra ) ) {
            dispatch( onChange( ordencompra ) );
            return;
        }
        dispatch( setLoading() );

        OrdenCompraServices.onGrabar( ordencompra ).then( (result) => {
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

const onEdit = ( idordencompra ) => {
    return ( dispatch ) => {
        dispatch( onLoad() );

        OrdenCompraServices.onEdit( idordencompra ).then( ( result ) => {
            if ( result.response == 1 ) {
                dispatch( setEditar( result ) );
            }
        } ) . finally ( () => {
            // dispatch( removeLoading() );
        } );
    };
};

const onEditar = ( ordencompra ) => {
    return ( dispatch ) => {
        dispatch( disabledActions.onEditar() );
        ordencompra.update = true;
        dispatch( onChange( ordencompra ) );
    };
};

const onUpdate = ( ordencompra ) => {
    return ( dispatch ) => {
        if ( !onValidate( ordencompra ) ) {
            dispatch( onChange( ordencompra ) );
            return;
        }
        dispatch( setLoading() );

        OrdenCompraServices.onUpdate( ordencompra ).then( (result) => {
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

const onShow = ( idordencompra ) => {
    return ( dispatch ) => {
        dispatch( onLoad() );

        OrdenCompraServices.onShow( idordencompra ).then( ( result ) => {
            if ( result.response == 1 ) {
                dispatch( setShow( result ) );
            }
        } ) . finally ( () => {
            // dispatch( removeLoading() );
        } );
    };
};

const onDelete = ( ordencompra ) => {
    return ( dispatch ) => {
        dispatch( setLoading() );

        OrdenCompraServices.onDelete( ordencompra ).then( (result) => {

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

const onSearchData = ( ordencompra ) => {
    return ( dispatch ) => {
        dispatch( setLoading() );

        OrdenCompraServices.onSearchData( ordencompra ).then( (result) => {
            if ( result.response == 1 ) {
                dispatch( disabledActions.onAction() );
                dispatch( setState( result.ordencompra ) );
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
        return await OrdenCompraServices.onImprimir().then( async (result) => {
            if ( result.response == 1 ) {
                await dispatch( setImprimir( result ) );
            }
            return result;
        } ) . finally ( () => {
            dispatch( removeLoading() );
        });
    };
};

function onValidate( ordencompra ) {
    const { codigo, nrofactura } = ordencompra;
    let bandera = true;
    if ( codigo?.toString().length > 150 ) {
        ordencompra.error.codigo   = true;
        ordencompra.message.codigo = "Se permite máximo 150 caracteres";
        bandera = false;
    }
    if ( nrofactura?.toString().length > 150 ) {
        ordencompra.error.nrofactura   = true;
        ordencompra.message.nrofactura = "Se permite máximo 150 caracteres";
        bandera = false;
    }
    if ( typeof ordencompra.fkidsucursal !== "number" ) {
        ordencompra.error.fkidsucursal   = true;
        ordencompra.message.fkidsucursal = "Campo requerido";
        bandera = false;
    }
    if ( typeof ordencompra.fkidalmacen !== "number" ) {
        ordencompra.error.fkidalmacen   = true;
        ordencompra.message.fkidalmacen = "Campo requerido";
        bandera = false;
    }
    if ( typeof ordencompra.fkidconceptocompra !== "number" ) {
        ordencompra.error.fkidconceptocompra   = true;
        ordencompra.message.fkidconceptocompra = "Campo requerido";
        bandera = false;
    }
    if ( typeof ordencompra.fkidseccioninventario !== "number" ) {
        ordencompra.error.fkidseccioninventario   = true;
        ordencompra.message.fkidseccioninventario = "Campo requerido";
        bandera = false;
    }
    if ( typeof ordencompra.fkidproveedor !== "number" ) {
        ordencompra.error.fkidproveedor   = true;
        ordencompra.message.fkidproveedor = "Campo requerido";
        bandera = false;
    }
    if ( typeof ordencompra.fkidmoneda !== "number" ) {
        ordencompra.error.fkidmoneda   = true;
        ordencompra.message.fkidmoneda = "Campo requerido";
        bandera = false;
    }
    let contador = 0;
    for (let index = 0; index < ordencompra.arrayOrdenCompraDetalle.length; index++) {
        const element = ordencompra.arrayOrdenCompraDetalle[index];
        if ( element.fkidproducto != null ) {
            if ( parseInt(element.cantidad) <= 0 ) {
                C_Message( "warning", `La cantidad de ${element.producto} debe ser mayor a 0` );
                bandera = false;
                element.errorcantidad = true;
            }
            if ( parseInt(element.costounitario) <= 0 ) {
                C_Message( "warning", `El costo de ${element.producto} debe ser mayor a 0` );
                bandera = false;
                element.errorcosto = true;
            }
        } else {
            contador++;
        }
    }
    if ( contador === ordencompra.arrayOrdenCompraDetalle.length ) {
        C_Message( "warning", `Campo Producto requerido` );
        bandera = false;
    }
    if ( !bandera ) {
        C_Message( "error", "Conflictos al registrar" );
    }
    return bandera;
};

export const OrdenCompraActions = {
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
