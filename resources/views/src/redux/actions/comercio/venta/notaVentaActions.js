
import { C_Message } from "../../../../components";

import { Strings } from "../../../constants";
import { NotaVentaServices } from "../../../services/comercio/venta/notaVentaServices";

import { disabledActions } from "../../config/disabledActions";
import { removeLoading, setLoading } from "../../config/loadingActions";
import { paginationActions } from "../../config/paginationActions";

const onLimpiar = ( ) => ( {
    type: Strings.notaventa_setLimpiar,
} );

const onLoad = ( ) => ( {
    type: Strings.notaventa_setLoad,
} );

const setState = ( data ) => ( {
    type: Strings.notaventa_setState,
    payload: data,
} );

const onChange = ( data ) => ( {
    type: Strings.notaventa_onChange,
    payload: data,
} );

const setCreate = ( data ) => ( {
    type:    Strings.notaventa_onCreate,
    payload: data,
} );

const setEditar = ( data ) => ( {
    type:    Strings.notaventa_onEditar,
    payload: data,
} );

const setShow = ( data ) => ( {
    type:    Strings.notaventa_onShow,
    payload: data,
} );

const onFocus = ( ) => ( {
    type: Strings.notaventa_onFocus,
} );

const offFocus = ( ) => ( {
    type: Strings.notaventa_offFocus,
} );

const setImprimir = ( data ) => ( {
    type: Strings.notaventa_setImprimir,
    payload: data,
} );

const initData = ( ) => {
    return async ( dispatch ) => {

        await dispatch( onFocus() );
        await dispatch( paginationActions.removePagination() );
        await dispatch( disabledActions.onLimpiar() );
        await dispatch( onLimpiar() );

        NotaVentaServices.getData( ).then ( ( result ) => {
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
        NotaVentaServices.getData( ).then ( async ( result ) => {
            if ( result.response == 1 ) {
                // dispatch( setDataCiudad(result.ciudad) );
            }
        } );
    };
};

const onChangePage = ( page ) => {
    return ( dispatch ) => {

        NotaVentaServices.getData( page ).then ( async ( result ) => {
            if ( result.response == 1 ) {
                let obj = {
                    pagination: result.pagination,
                    pagina: page,
                };
                await dispatch( disabledActions.onAction() );
                await dispatch( paginationActions.setPagination( obj ) );
                await dispatch( setState( result.arrayNotaVenta[0] ) );
            }
        } );

    };
};

const onCreate = ( ) => {
    return ( dispatch ) => {
        dispatch( setLoading() );

        NotaVentaServices.onCreate().then( ( result ) => {
            if ( result.response == 1 ) {
                dispatch( setCreate( result ) );
                dispatch( disabledActions.onCreate() );
            }
        } ) . finally ( () => {
            dispatch( removeLoading() );
        } );
    };
};

const onGrabar = ( notaventa ) => {
    return ( dispatch ) => {
        if ( !onValidate( notaventa ) ) {
            dispatch( onChange( notaventa ) );
            return;
        }
        dispatch( setLoading() );

        NotaVentaServices.onGrabar( notaventa ).then( (result) => {
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

const onEdit = ( idnotaventa ) => {
    return ( dispatch ) => {
        dispatch( onLoad() );

        NotaVentaServices.onEdit( idnotaventa ).then( ( result ) => {
            if ( result.response == 1 ) {
                dispatch( setEditar( result ) );
            }
        } ) . finally ( () => {
            // dispatch( removeLoading() );
        } );
    };
};

const onEditar = ( notaventa ) => {
    return ( dispatch ) => {
        dispatch( disabledActions.onEditar() );
        notaventa.update = true;
        dispatch( onChange( notaventa ) );
    };
};

const onUpdate = ( notaventa ) => {
    return ( dispatch ) => {
        if ( !onValidate( notaventa ) ) {
            dispatch( onChange( notaventa ) );
            return;
        }
        dispatch( setLoading() );

        NotaVentaServices.onUpdate( notaventa ).then( (result) => {
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

const onShow = ( idnotaventa ) => {
    return ( dispatch ) => {
        dispatch( onLoad() );

        NotaVentaServices.onShow( idnotaventa ).then( ( result ) => {
            if ( result.response == 1 ) {
                dispatch( setShow( result ) );
            }
        } ) . finally ( () => {
            // dispatch( removeLoading() );
        } );
    };
};

const onDelete = ( notaventa ) => {
    return ( dispatch ) => {
        dispatch( setLoading() );

        NotaVentaServices.onDelete( notaventa ).then( (result) => {

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

const onSearchData = ( notaventa ) => {
    return ( dispatch ) => {
        dispatch( setLoading() );

        NotaVentaServices.onSearchData( notaventa ).then( (result) => {
            if ( result.response == 1 ) {
                dispatch( disabledActions.onAction() );
                dispatch( setState( result.notaventa ) );
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
        return await NotaVentaServices.onImprimir().then( async (result) => {
            if ( result.response == 1 ) {
                await dispatch( setImprimir( result ) );
            }
            return result;
        } ) . finally ( () => {
            dispatch( removeLoading() );
        });
    };
};

function validateDetails(notaventa) {
    let contador = 0;
    for (let index = 0; index < notaventa.notaventadetalle.length; index++) {
        const element = notaventa.notaventadetalle[index];
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
            if ( parseInt(element.cantidad) > parseInt(element.stockactualanterior) ) {
                element.errorstockactual = true;
                C_Message( "warning", `La cantidad de ${element.producto} debe ser menor al stock.`, 'topRight' );
                return false;
            }
        } else {
            contador++;
        }
    }
    if ( contador === notaventa.notaventadetalle.length ) {
        C_Message( "warning", `Campo Producto requerido.`, 'topRight' );
        return false;
    }
    return true;
}

function onValidate( notaventa ) {
    let bandera = true;
    if ( notaventa.codigo?.toString().length > 150 ) {
        notaventa.error.codigo   = true;
        notaventa.message.codigo = "Se permite máximo 150 caracteres";
        bandera = false
    }
    if ( typeof notaventa.fkidsucursal != "number" ) {
        notaventa.error.fkidsucursal   = true;
        notaventa.message.fkidsucursal = "Campo requerido";
        bandera = false
    }
    if ( typeof notaventa.fkidalmacen != "number" ) {
        notaventa.error.fkidalmacen   = true;
        notaventa.message.fkidalmacen = "Campo requerido";
        bandera = false
    }
    if ( typeof notaventa.fkidvendedor != "number" ) {
        notaventa.error.fkidvendedor   = true;
        notaventa.message.fkidvendedor = "Campo requerido";
        bandera = false
    }
    if ( typeof notaventa.fkidcliente != "number" ) {
        notaventa.error.fkidcliente   = true;
        notaventa.message.fkidcliente = "Campo requerido";
        bandera = false
    }
    if ( typeof notaventa.fkidlistaprecio != "number" ) {
        notaventa.error.fkidlistaprecio   = true;
        notaventa.message.fkidlistaprecio = "Campo requerido";
        bandera = false
    }
    if ( typeof notaventa.fkidconceptoventa != "number" ) {
        notaventa.error.fkidconceptoventa   = true;
        notaventa.message.fkidconceptoventa = "Campo requerido";
        bandera = false
    }
    if ( typeof notaventa.fkidmoneda != "number" ) {
        notaventa.error.fkidmoneda   = true;
        notaventa.message.fkidmoneda = "Campo requerido";
        bandera = false
    }

    if ( typeof notaventa.nrodebito != "number" ) {
        notaventa.error.nrodebito   = true;
        notaventa.message.nrodebito = "Campo requerido";
        bandera = false
    }
    if ( typeof notaventa.nroventa != "number" ) {
        notaventa.error.nroventa   = true;
        notaventa.message.nroventa = "Campo requerido";
        bandera = false;
    }
    if ( typeof notaventa.nrocotizacion != "number" ) {
        notaventa.error.nrocotizacion   = true;
        notaventa.message.nrocotizacion = "Campo requerido";
        bandera = false;
    }
    if ( typeof parseFloat(notaventa.tipocambio) != "number" ) {
        notaventa.error.tipocambio   = true;
        notaventa.message.tipocambio = "Campo requerido";
        bandera = false;
    }

    if ( typeof parseFloat(notaventa.impuestoiva) != "number" ) {
        notaventa.error.impuestoiva   = true;
        notaventa.message.impuestoiva = "Campo requerido";
        bandera = false;
    }
    if ( typeof parseFloat(notaventa.montototalcobrado) != "number" ) {
        notaventa.error.montototalcobrado   = true;
        notaventa.message.montototalcobrado = "Campo requerido";
        bandera = false;
    }
    if ( typeof parseFloat(notaventa.montototaldeudamora) != "number" ) {
        notaventa.error.montototaldeudamora   = true;
        notaventa.message.montototaldeudamora = "Campo requerido";
        bandera = false;
    }
    if ( typeof parseFloat(notaventa.montototaldeudaactual) != "number" ) {
        notaventa.error.montototaldeudaactual   = true;
        notaventa.message.montototaldeudaactual = "Campo requerido";
        bandera = false;
    }
    if ( typeof parseFloat(notaventa.descuentoacumulado) != "number" ) {
        notaventa.error.descuentoacumulado   = true;
        notaventa.message.descuentoacumulado = "Campo requerido";
        bandera = false;
    }
    if ( typeof parseFloat(notaventa.porcentajerangodescuentoinicial) != "number" ) {
        notaventa.error.porcentajerangodescuentoinicial   = true;
        notaventa.message.porcentajerangodescuentoinicial = "Campo requerido";
        bandera = false;
    }
    if ( typeof parseFloat(notaventa.porcentajerangodescuentofinal) != "number" ) {
        notaventa.error.porcentajerangodescuentofinal   = true;
        notaventa.message.porcentajerangodescuentofinal = "Campo requerido";
        bandera = false;
    }

    if ( typeof parseFloat(notaventa.montosubtotal) != "number" ) {
        notaventa.error.montosubtotal   = true;
        notaventa.message.montosubtotal = "Campo requerido";
        bandera = false;
    }
    if ( typeof parseFloat(notaventa.descuento) != "number" ) {
        notaventa.error.descuento   = true;
        notaventa.message.descuento = "Campo requerido";
        bandera = false;
    }
    if ( typeof parseFloat(notaventa.montodescuento) != "number" ) {
        notaventa.error.montodescuento   = true;
        notaventa.message.montodescuento = "Campo requerido";
        bandera = false;
    }
    if ( typeof parseFloat(notaventa.montototal) != "number" ) {
        notaventa.error.montototal   = true;
        notaventa.message.montototal = "Campo requerido";
        bandera = false;
    }
    if ( typeof parseFloat(notaventa.montoanticipo) != "number" ) {
        notaventa.error.montoanticipo   = true;
        notaventa.message.montoanticipo = "Campo requerido";
        bandera = false;
    }

    bandera = validateDetails(notaventa);

    if ( !bandera ) {
        C_Message( "error", "Error al procesar el servicio favor de verificar, Campos Requeridos." );
    }
    return bandera;
};

export const notaVentaActions = {
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
