
import { C_Message } from "../../../../components";

import { Strings } from "../../../constants";
import { NotaSalidaServices } from "../../../services/comercio/inventario/notaSalidaServices";

import { disabledActions } from "../../config/disabledActions";
import { removeLoading, setLoading } from "../../config/loadingActions";
import { paginationActions } from "../../config/paginationActions";

const onLimpiar = ( ) => ( {
    type: Strings.notasalida_setLimpiar,
} );

const onLoad = ( ) => ( {
    type: Strings.notasalida_setLoad,
} );

const setState = ( data ) => ( {
    type: Strings.notasalida_setState,
    payload: data,
} );

const onChange = ( data ) => ( {
    type: Strings.notasalida_onChange,
    payload: data,
} );

const setCreate = ( data ) => ( {
    type:    Strings.notasalida_onCreate,
    payload: data,
} );

const setEditar = ( data ) => ( {
    type:    Strings.notasalida_onEditar,
    payload: data,
} );

const setShow = ( data ) => ( {
    type:    Strings.notasalida_onShow,
    payload: data,
} );

const onFocus = ( ) => ( {
    type: Strings.notasalida_onFocus,
} );

const offFocus = ( ) => ( {
    type: Strings.notasalida_offFocus,
} );

const setImprimir = ( data ) => ( {
    type: Strings.notasalida_setImprimir,
    payload: data,
} );

const initData = ( ) => {
    return async ( dispatch ) => {

        await dispatch( onFocus() );
        await dispatch( paginationActions.removePagination() );
        await dispatch( disabledActions.onLimpiar() );
        await dispatch( onLimpiar() );

        NotaSalidaServices.getData( ).then ( ( result ) => {
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
        NotaSalidaServices.getData( ).then ( async ( result ) => {
            if ( result.response == 1 ) {
                // dispatch( setDataCiudad(result.ciudad) );
            }
        } );
    };
};

const onChangePage = ( page ) => {
    return ( dispatch ) => {

        NotaSalidaServices.getData( page ).then ( async ( result ) => {
            if ( result.response == 1 ) {
                let obj = {
                    pagination: result.pagination,
                    pagina: page,
                };
                await dispatch( disabledActions.onAction() );
                await dispatch( paginationActions.setPagination( obj ) );
                await dispatch( setState( result.arrayNotaSalida[0] ) );
            }
        } );

    };
};

const onCreate = ( ) => {
    return ( dispatch ) => {
        dispatch( setLoading() );

        NotaSalidaServices.onCreate().then( ( result ) => {
            if ( result.response == 1 ) {
                dispatch( setCreate( result ) );
                dispatch( disabledActions.onCreate() );
            }
        } ) . finally ( () => {
            dispatch( removeLoading() );
        } );
    };
};

const onGrabar = ( notasalida ) => {
    return ( dispatch ) => {
        if ( !onValidate( notasalida ) ) {
            dispatch( onChange( notasalida ) );
            return;
        }
        dispatch( setLoading() );

        NotaSalidaServices.onGrabar( notasalida ).then( (result) => {
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

const onEdit = ( idnotasalida ) => {
    return ( dispatch ) => {
        dispatch( onLoad() );

        NotaSalidaServices.onEdit( idnotasalida ).then( ( result ) => {
            if ( result.response == 1 ) {
                dispatch( setEditar( result ) );
            }
        } ) . finally ( () => {
            // dispatch( removeLoading() );
        } );
    };
};

const onEditar = ( notasalida ) => {
    return ( dispatch ) => {
        dispatch( disabledActions.onEditar() );
        notasalida.update = true;
        dispatch( onChange( notasalida ) );
    };
};

const onUpdate = ( notasalida ) => {
    return ( dispatch ) => {
        if ( !onValidate( notasalida ) ) {
            dispatch( onChange( notasalida ) );
            return;
        }
        dispatch( setLoading() );

        NotaSalidaServices.onUpdate( notasalida ).then( (result) => {
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

const onShow = ( idnotasalida ) => {
    return ( dispatch ) => {
        dispatch( onLoad() );

        NotaSalidaServices.onShow( idnotasalida ).then( ( result ) => {
            if ( result.response == 1 ) {
                dispatch( setShow( result ) );
            }
        } ) . finally ( () => {
            // dispatch( removeLoading() );
        } );
    };
};

const onDelete = ( notasalida ) => {
    return ( dispatch ) => {
        dispatch( setLoading() );

        NotaSalidaServices.onDelete( notasalida ).then( (result) => {

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

const onSearchData = ( notasalida ) => {
    return ( dispatch ) => {
        dispatch( setLoading() );

        NotaSalidaServices.onSearchData( notasalida ).then( (result) => {
            if ( result.response == 1 ) {
                dispatch( disabledActions.onAction() );
                dispatch( setState( result.notasalida ) );
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
        return await NotaSalidaServices.onImprimir().then( async (result) => {
            if ( result.response == 1 ) {
                await dispatch( setImprimir( result ) );
            }
            return result;
        } ) . finally ( () => {
            dispatch( removeLoading() );
        });
    };
};

function validateDetails(notasalida) {
    let contador = 0;
    for (let index = 0; index < notasalida.arrayNotaSalidaDetalle.length; index++) {
        const element = notasalida.arrayNotaSalidaDetalle[index];
        if ( element.fkidproducto != null ) {
            if ( parseInt(element.cantidad) <= 0 ) {
                element.errorcantidad = true;
                C_Message( "warning", `La cantidad de ${element.producto} debe ser mayor a 0`, 'topRight' );
                return false;
            }
            if ( parseInt(element.costounitario) <= 0 ) {
                element.errorcosto = true;
                C_Message( "warning", `El costo de ${element.producto} debe ser mayor a 0`, 'topRight' );
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
    if ( contador === notasalida.arrayNotaSalidaDetalle.length ) {
        C_Message( "warning", `Campo Producto requerido.`, 'topRight' );
        return false;
    }
    return true;
}

function onValidate( notasalida ) {
    let bandera = true;
    if ( notasalida.codigo?.toString().length > 150 ) {
        notasalida.error.codigo   = true;
        notasalida.message.codigo = "Se permite máximo 150 caracteres";
        bandera = false;
    }
    if ( typeof notasalida.fkidsucursal !== "number" ) {
        notasalida.error.fkidsucursal   = true;
        notasalida.message.fkidsucursal = "Campo requerido";
        bandera = false;
    }
    if ( typeof notasalida.fkidalmacen !== "number" ) {
        notasalida.error.fkidalmacen   = true;
        notasalida.message.fkidalmacen = "Campo requerido";
        bandera = false;
    }
    if ( typeof notasalida.fkidconceptoinventario !== "number" ) {
        notasalida.error.fkidconceptoinventario   = true;
        notasalida.message.fkidconceptoinventario = "Campo requerido";
        bandera = false;
    }
    if ( typeof notasalida.fkidmoneda !== "number" ) {
        notasalida.error.fkidmoneda   = true;
        notasalida.message.fkidmoneda = "Campo requerido";
        bandera = false;
    }
    bandera = validateDetails(notasalida);
    if ( !bandera ) {
        C_Message( "error", `Error al procesar el servicio favor de verificar, Campos Requeridos.` );
    }
    return bandera;
};

export const NotaSalidaActions = {
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
