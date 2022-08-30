
import { C_Message } from "../../../../components";

import { Strings } from "../../../constants";
import { DevolucionNotaVentaServices } from "../../../services/comercio/venta/devolucionNotaVentaServices";

import { disabledActions } from "../../config/disabledActions";
import { removeLoading, setLoading } from "../../config/loadingActions";
import { paginationActions } from "../../config/paginationActions";

const onLimpiar = ( ) => ( {
    type: Strings.devolucionnotaventa_setLimpiar,
} );

const onLoad = ( ) => ( {
    type: Strings.devolucionnotaventa_setLoad,
} );

const setState = ( data ) => ( {
    type: Strings.devolucionnotaventa_setState,
    payload: data,
} );

const onChange = ( data ) => ( {
    type: Strings.devolucionnotaventa_onChange,
    payload: data,
} );

const setCreate = ( data ) => ( {
    type:    Strings.devolucionnotaventa_onCreate,
    payload: data,
} );

const setEditar = ( data ) => ( {
    type:    Strings.devolucionnotaventa_onEditar,
    payload: data,
} );

const setShow = ( data ) => ( {
    type:    Strings.devolucionnotaventa_onShow,
    payload: data,
} );

const onFocus = ( ) => ( {
    type: Strings.devolucionnotaventa_onFocus,
} );

const offFocus = ( ) => ( {
    type: Strings.devolucionnotaventa_offFocus,
} );

const setImprimir = ( data ) => ( {
    type: Strings.devolucionnotaventa_setImprimir,
    payload: data,
} );

const initData = ( ) => {
    return async ( dispatch ) => {

        await dispatch( onFocus() );
        await dispatch( paginationActions.removePagination() );
        await dispatch( disabledActions.onLimpiar() );
        await dispatch( onLimpiar() );

        DevolucionNotaVentaServices.getData( ).then ( ( result ) => {
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
        DevolucionNotaVentaServices.getData( ).then ( async ( result ) => {
            if ( result.response == 1 ) {
                // dispatch( setDataCiudad(result.ciudad) );
            }
        } );
    };
};

const onChangePage = ( page ) => {
    return ( dispatch ) => {

        DevolucionNotaVentaServices.getData( page ).then ( async ( result ) => {
            if ( result.response == 1 ) {
                let obj = {
                    pagination: result.pagination,
                    pagina: page,
                };
                await dispatch( disabledActions.onAction() );
                await dispatch( paginationActions.setPagination( obj ) );
                await dispatch( setState( result.arrayDevolucionNotaVenta[0] ) );
            }
        } );

    };
};

const onCreate = ( ) => {
    return ( dispatch ) => {
        dispatch( setLoading() );

        DevolucionNotaVentaServices.onCreate().then( ( result ) => {
            if ( result.response == 1 ) {
                dispatch( setCreate( result ) );
                dispatch( disabledActions.onCreate() );
            }
        } ) . finally ( () => {
            dispatch( removeLoading() );
        } );
    };
};

const onGrabar = ( devolucionnotaventa ) => {
    return ( dispatch ) => {
        if ( !onValidate( devolucionnotaventa ) ) {
            dispatch( onChange( devolucionnotaventa ) );
            return;
        }
        dispatch( setLoading() );

        DevolucionNotaVentaServices.onGrabar( devolucionnotaventa ).then( (result) => {
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

const onEdit = ( iddevolucionnotaventa ) => {
    return ( dispatch ) => {
        dispatch( onLoad() );

        DevolucionNotaVentaServices.onEdit( iddevolucionnotaventa ).then( ( result ) => {
            if ( result.response == 1 ) {
                dispatch( setEditar( result ) );
            }
        } ) . finally ( () => {
            // dispatch( removeLoading() );
        } );
    };
};

const onEditar = ( devolucionnotaventa ) => {
    return ( dispatch ) => {
        dispatch( disabledActions.onEditar() );
        devolucionnotaventa.update = true;
        dispatch( onChange( devolucionnotaventa ) );
    };
};

const onUpdate = ( devolucionnotaventa ) => {
    return ( dispatch ) => {
        if ( !onValidate( devolucionnotaventa ) ) {
            dispatch( onChange( devolucionnotaventa ) );
            return;
        }
        dispatch( setLoading() );

        DevolucionNotaVentaServices.onUpdate( devolucionnotaventa ).then( (result) => {
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

const onShow = ( iddevolucionnotaventa ) => {
    return ( dispatch ) => {
        dispatch( onLoad() );

        DevolucionNotaVentaServices.onShow( iddevolucionnotaventa ).then( ( result ) => {
            if ( result.response == 1 ) {
                dispatch( setShow( result ) );
            }
        } ) . finally ( () => {
            // dispatch( removeLoading() );
        } );
    };
};

const onDelete = ( devolucionnotaventa ) => {
    return ( dispatch ) => {
        dispatch( setLoading() );

        DevolucionNotaVentaServices.onDelete( devolucionnotaventa ).then( (result) => {

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

const onSearchData = ( devolucionnotaventa ) => {
    return ( dispatch ) => {
        dispatch( setLoading() );

        DevolucionNotaVentaServices.onSearchData( devolucionnotaventa ).then( (result) => {
            if ( result.response == 1 ) {
                dispatch( disabledActions.onAction() );
                dispatch( setState( result.devolucionnotaventa ) );
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
        return await DevolucionNotaVentaServices.onImprimir().then( async (result) => {
            if ( result.response == 1 ) {
                await dispatch( setImprimir( result ) );
            }
            return result;
        } ) . finally ( () => {
            dispatch( removeLoading() );
        });
    };
};

function onValidate( devolucionnotaventa ) {
    let bandera = true;
    if ( devolucionnotaventa.codigo?.toString().length > 150 ) {
        devolucionnotaventa.error.codigo   = true;
        devolucionnotaventa.message.codigo = "Se permite máximo 150 caracteres";
        bandera = false
    }
    if ( typeof devolucionnotaventa.fkidnotaventa != "number" ) {
        devolucionnotaventa.error.fkidnotaventa   = true;
        devolucionnotaventa.message.fkidnotaventa = "Campo requerido";
        bandera = false
    }
    if ( typeof devolucionnotaventa.fkidsucursal != "number" ) {
        devolucionnotaventa.error.fkidsucursal   = true;
        devolucionnotaventa.message.fkidsucursal = "Campo requerido";
        bandera = false
    }
    if ( typeof devolucionnotaventa.fkidalmacen != "number" ) {
        devolucionnotaventa.error.fkidalmacen   = true;
        devolucionnotaventa.message.fkidalmacen = "Campo requerido";
        bandera = false
    }
    if ( typeof devolucionnotaventa.fkidvendedor != "number" ) {
        devolucionnotaventa.error.fkidvendedor   = true;
        devolucionnotaventa.message.fkidvendedor = "Campo requerido";
        bandera = false
    }
    if ( typeof devolucionnotaventa.fkidcliente != "number" ) {
        devolucionnotaventa.error.fkidcliente   = true;
        devolucionnotaventa.message.fkidcliente = "Campo requerido";
        bandera = false
    }
    if ( typeof devolucionnotaventa.fkidlistaprecio != "number" ) {
        devolucionnotaventa.error.fkidlistaprecio   = true;
        devolucionnotaventa.message.fkidlistaprecio = "Campo requerido";
        bandera = false
    }
    if ( typeof devolucionnotaventa.fkidconceptoventa != "number" ) {
        devolucionnotaventa.error.fkidconceptoventa   = true;
        devolucionnotaventa.message.fkidconceptoventa = "Campo requerido";
        bandera = false
    }
    if ( typeof devolucionnotaventa.fkidmoneda != "number" ) {
        devolucionnotaventa.error.fkidmoneda   = true;
        devolucionnotaventa.message.fkidmoneda = "Campo requerido";
        bandera = false
    }

    if ( typeof parseFloat(devolucionnotaventa.tipocambio) != "number" ) {
        devolucionnotaventa.error.tipocambio   = true;
        devolucionnotaventa.message.tipocambio = "Campo requerido";
        bandera = false;
    }
    if ( typeof parseFloat(devolucionnotaventa.montosubtotal) != "number" ) {
        devolucionnotaventa.error.montosubtotal   = true;
        devolucionnotaventa.message.montosubtotal = "Campo requerido";
        bandera = false;
    }
    if ( typeof parseFloat(devolucionnotaventa.descuento) != "number" ) {
        devolucionnotaventa.error.descuento   = true;
        devolucionnotaventa.message.descuento = "Campo requerido";
        bandera = false;
    }
    if ( typeof parseFloat(devolucionnotaventa.montodescuento) != "number" ) {
        devolucionnotaventa.error.montodescuento   = true;
        devolucionnotaventa.message.montodescuento = "Campo requerido";
        bandera = false;
    }
    if ( typeof parseFloat(devolucionnotaventa.montototal) != "number" ) {
        devolucionnotaventa.error.montototal   = true;
        devolucionnotaventa.message.montototal = "Campo requerido";
        bandera = false;
    }

    bandera = validateDetails(devolucionnotaventa);

    if ( !bandera ) {
        C_Message( "error", "Conflictos. Favor de llenar datos requeridos." );
    }
    return bandera;
};

function validateDetails(devolucionnotaventa) {
    let contador = 0;
    for (let index = 0; index < devolucionnotaventa.devolucionnotaventadetalle.length; index++) {
        const element = devolucionnotaventa.devolucionnotaventadetalle[index];
        if ( element.fkidproducto != null ) {
            if ( parseInt(element.cantidad) <= 0 ) {
                element.errorcantidad = true;
                C_Message( "warning", `La cantidad de ${element.producto} debe ser mayor a 0`, 'topRight' );
                return false;
            }
            if ( parseInt(element.preciounitario) <= 0 ) {
                element.errorpreciounitario = true;
                C_Message( "warning", `El precio de ${element.producto} debe ser mayor a 0`, 'topRight' );
                return false;
            }
            if ( parseInt(element.cantidad) > parseInt(element.cantidadvendida) ) {
                element.errorcantidad = true;
                C_Message( "warning", `La cantidad de ${element.producto} debe ser menor a la cantidad vendida.`, 'topRight' );
                return false;
            }
        } else {
            contador++;
        }
    }
    if ( contador === devolucionnotaventa.devolucionnotaventadetalle.length ) {
        C_Message( "warning", `Campo Producto requerido.`, 'topRight' );
        return false;
    }
    return true;
}

export const devolucionNotaVentaActions = {
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
