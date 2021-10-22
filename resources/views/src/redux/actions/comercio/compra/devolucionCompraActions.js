
import { C_Message } from "../../../../components";

import { Strings } from "../../../constants";
import { DevolucionCompraServices } from "../../../services/comercio/compra/devolucionCompraServices";

import { disabledActions } from "../../config/disabledActions";
import { removeLoading, setLoading } from "../../config/loadingActions";
import { paginationActions } from "../../config/paginationActions";

const onLimpiar = ( ) => ( {
    type: Strings.devolucioncompra_setLimpiar,
} );

const onLoad = ( ) => ( {
    type: Strings.devolucioncompra_setLoad,
} );

const setState = ( data ) => ( {
    type: Strings.devolucioncompra_setState,
    payload: data,
} );

const onChange = ( data ) => ( {
    type: Strings.devolucioncompra_onChange,
    payload: data,
} );

const setCreate = ( data ) => ( {
    type:    Strings.devolucioncompra_onCreate,
    payload: data,
} );

const setEditar = ( data ) => ( {
    type:    Strings.devolucioncompra_onEditar,
    payload: data,
} );

const setShow = ( data ) => ( {
    type:    Strings.devolucioncompra_onShow,
    payload: data,
} );

const onFocus = ( ) => ( {
    type: Strings.devolucioncompra_onFocus,
} );

const offFocus = ( ) => ( {
    type: Strings.devolucioncompra_offFocus,
} );

const setImprimir = ( data ) => ( {
    type: Strings.devolucioncompra_setImprimir,
    payload: data,
} );

const initData = ( ) => {
    return async ( dispatch ) => {

        await dispatch( onFocus() );
        await dispatch( paginationActions.removePagination() );
        await dispatch( disabledActions.onLimpiar() );
        await dispatch( onLimpiar() );

        DevolucionCompraServices.getData( ).then ( ( result ) => {
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
        DevolucionCompraServices.getData( ).then ( async ( result ) => {
            if ( result.response == 1 ) {
                // dispatch( setDataCiudad(result.ciudad) );
            }
        } );
    };
};

const onChangePage = ( page ) => {
    return ( dispatch ) => {

        DevolucionCompraServices.getData( page ).then ( async ( result ) => {
            if ( result.response == 1 ) {
                let obj = {
                    pagination: result.pagination,
                    pagina: page,
                };
                await dispatch( disabledActions.onAction() );
                await dispatch( paginationActions.setPagination( obj ) );
                await dispatch( setState( result.devolucioncompra[0] ) );
            }
        } );

    };
};

const onCreate = ( ) => {
    return ( dispatch ) => {
        dispatch( setLoading() );

        DevolucionCompraServices.onCreate().then( ( result ) => {
            if ( result.response == 1 ) {
                dispatch( setCreate( result ) );
                dispatch( disabledActions.onCreate() );
            }
        } ) . finally ( () => {
            dispatch( removeLoading() );
        } );
    };
};

const onGrabar = ( devolucioncompra ) => {
    return ( dispatch ) => {
        if ( !onValidate( devolucioncompra ) ) {
            dispatch( onChange( devolucioncompra ) );
            return;
        }
        dispatch( setLoading() );

        DevolucionCompraServices.onGrabar( devolucioncompra ).then( (result) => {
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

const onEdit = ( iddevolucioncompra ) => {
    return ( dispatch ) => {
        dispatch( onLoad() );

        DevolucionCompraServices.onEdit( iddevolucioncompra ).then( ( result ) => {
            if ( result.response == 1 ) {
                dispatch( setEditar( result ) );
            }
        } ) . finally ( () => {
            // dispatch( removeLoading() );
        } );
    };
};

const onEditar = ( devolucioncompra ) => {
    return ( dispatch ) => {
        dispatch( disabledActions.onEditar() );
        devolucioncompra.update = true;
        dispatch( onChange( devolucioncompra ) );
    };
};

const onUpdate = ( devolucioncompra ) => {
    return ( dispatch ) => {
        if ( !onValidate( devolucioncompra ) ) {
            dispatch( onChange( devolucioncompra ) );
            return;
        }
        dispatch( setLoading() );

        DevolucionCompraServices.onUpdate( devolucioncompra ).then( (result) => {
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

const onShow = ( iddevolucioncompra ) => {
    return ( dispatch ) => {
        dispatch( onLoad() );

        DevolucionCompraServices.onShow( iddevolucioncompra ).then( ( result ) => {
            if ( result.response == 1 ) {
                dispatch( setShow( result ) );
            }
        } ) . finally ( () => {
            // dispatch( removeLoading() );
        } );
    };
};

const onDelete = ( devolucioncompra ) => {
    return ( dispatch ) => {
        dispatch( setLoading() );

        DevolucionCompraServices.onDelete( devolucioncompra ).then( (result) => {

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

const onSearchData = ( devolucioncompra ) => {
    return ( dispatch ) => {
        dispatch( setLoading() );

        DevolucionCompraServices.onSearchData( devolucioncompra ).then( (result) => {
            if ( result.response == 1 ) {
                dispatch( disabledActions.onAction() );
                dispatch( setState( result.devolucioncompra ) );
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
        return await DevolucionCompraServices.onImprimir().then( async (result) => {
            if ( result.response == 1 ) {
                await dispatch( setImprimir( result ) );
            }
            return result;
        } ) . finally ( () => {
            dispatch( removeLoading() );
        });
    };
};

function onValidate( devolucioncompra ) {
    const { codigo, nrofactura } = devolucioncompra;
    let bandera = true;
    if ( codigo?.toString().length > 150 ) {
        devolucioncompra.error.codigo   = true;
        devolucioncompra.message.codigo = "Se permite máximo 150 caracteres";
        bandera = false;
    }
    if ( nrofactura?.toString().length > 150 ) {
        devolucioncompra.error.nrofactura   = true;
        devolucioncompra.message.nrofactura = "Se permite máximo 150 caracteres";
        bandera = false;
    }
    if ( typeof devolucioncompra.fkidsucursal !== "number" ) {
        devolucioncompra.error.fkidsucursal   = true;
        devolucioncompra.message.fkidsucursal = "Campo requerido";
        bandera = false;
    }
    if ( typeof devolucioncompra.fkidalmacen !== "number" ) {
        devolucioncompra.error.fkidalmacen   = true;
        devolucioncompra.message.fkidalmacen = "Campo requerido";
        bandera = false;
    }
    if ( typeof devolucioncompra.fkidconceptocompra !== "number" ) {
        devolucioncompra.error.fkidconceptocompra   = true;
        devolucioncompra.message.fkidconceptocompra = "Campo requerido";
        bandera = false;
    }
    if ( typeof devolucioncompra.fkidproveedor !== "number" ) {
        devolucioncompra.error.fkidproveedor   = true;
        devolucioncompra.message.fkidproveedor = "Campo requerido";
        bandera = false;
    }
    if ( typeof devolucioncompra.fkidmoneda !== "number" ) {
        devolucioncompra.error.fkidmoneda   = true;
        devolucioncompra.message.fkidmoneda = "Campo requerido";
        bandera = false;
    }

    let contador = 0;
    for (let index = 0; index < devolucioncompra.arrayDevolucionCompraDetalle.length; index++) {
        const element = devolucioncompra.arrayDevolucionCompraDetalle[index];
        if ( element.fkidproducto != null ) {
            if ( parseInt(element.cantidad) <= 0 ) {
                element.errorcantidad = true;
                C_Message( "warning", `La cantidad de ${element.producto} debe ser mayor a 0` );
                bandera = false;
            }
        } else {
            contador++;
        }
    }
    if ( contador === devolucioncompra.arrayDevolucionCompraDetalle.length ) {
        C_Message( "warning", `Campo Producto requerido` );
        bandera = false;
    }

    if ( !bandera ) {
        C_Message( "error", "Problemas al registrar" );
    }
    return bandera;
};

export const DevolucionCompraActions = {
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
