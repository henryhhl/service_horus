
import { C_Message } from "../../../../components";

import { Strings } from "../../../constants";
import { NotaIngresoServices } from "../../../services/comercio/inventario/notaIngresoServices";

import { disabledActions } from "../../config/disabledActions";
import { removeLoading, setLoading } from "../../config/loadingActions";
import { paginationActions } from "../../config/paginationActions";

const onLimpiar = ( ) => ( {
    type: Strings.notaingreso_setLimpiar,
} );

const onLoad = ( ) => ( {
    type: Strings.notaingreso_setLoad,
} );

const setState = ( data ) => ( {
    type: Strings.notaingreso_setState,
    payload: data,
} );

const onChange = ( data ) => ( {
    type: Strings.notaingreso_onChange,
    payload: data,
} );

const setCreate = ( data ) => ( {
    type:    Strings.notaingreso_onCreate,
    payload: data,
} );

const setEditar = ( data ) => ( {
    type:    Strings.notaingreso_onEditar,
    payload: data,
} );

const setShow = ( data ) => ( {
    type:    Strings.notaingreso_onShow,
    payload: data,
} );

const onFocus = ( ) => ( {
    type: Strings.notaingreso_onFocus,
} );

const offFocus = ( ) => ( {
    type: Strings.notaingreso_offFocus,
} );

const setImprimir = ( data ) => ( {
    type: Strings.notaingreso_setImprimir,
    payload: data,
} );

const initData = ( ) => {
    return async ( dispatch ) => {

        await dispatch( onFocus() );
        await dispatch( paginationActions.removePagination() );
        await dispatch( disabledActions.onLimpiar() );
        await dispatch( onLimpiar() );

        NotaIngresoServices.getData( ).then ( ( result ) => {
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
        NotaIngresoServices.getData( ).then ( async ( result ) => {
            if ( result.response == 1 ) {
                // dispatch( setDataCiudad(result.ciudad) );
            }
        } );
    };
};

const onChangePage = ( page ) => {
    return ( dispatch ) => {

        NotaIngresoServices.getData( page ).then ( async ( result ) => {
            if ( result.response == 1 ) {
                let obj = {
                    pagination: result.pagination,
                    pagina: page,
                };
                await dispatch( disabledActions.onAction() );
                await dispatch( paginationActions.setPagination( obj ) );
                await dispatch( setState( result.arrayNotaIngreso[0] ) );
            }
        } );

    };
};

const onCreate = ( ) => {
    return ( dispatch ) => {
        dispatch( setLoading() );

        NotaIngresoServices.onCreate().then( ( result ) => {
            if ( result.response == 1 ) {
                dispatch( setCreate( result ) );
                dispatch( disabledActions.onCreate() );
            }
        } ) . finally ( () => {
            dispatch( removeLoading() );
        } );
    };
};

const onGrabar = ( notaingreso ) => {
    return ( dispatch ) => {
        if ( !onValidate( notaingreso ) ) {
            dispatch( onChange( notaingreso ) );
            return;
        }
        dispatch( setLoading() );

        NotaIngresoServices.onGrabar( notaingreso ).then( (result) => {
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

const onEdit = ( idnotaingreso ) => {
    return ( dispatch ) => {
        dispatch( onLoad() );

        NotaIngresoServices.onEdit( idnotaingreso ).then( ( result ) => {
            if ( result.response == 1 ) {
                dispatch( setEditar( result ) );
            }
        } ) . finally ( () => {
            // dispatch( removeLoading() );
        } );
    };
};

const onEditar = ( notaingreso ) => {
    return ( dispatch ) => {
        dispatch( disabledActions.onEditar() );
        notaingreso.update = true;
        dispatch( onChange( notaingreso ) );
    };
};

const onUpdate = ( notaingreso ) => {
    return ( dispatch ) => {
        if ( !onValidate( notaingreso ) ) {
            dispatch( onChange( notaingreso ) );
            return;
        }
        dispatch( setLoading() );

        NotaIngresoServices.onUpdate( notaingreso ).then( (result) => {
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

const onShow = ( idnotaingreso ) => {
    return ( dispatch ) => {
        dispatch( onLoad() );

        NotaIngresoServices.onShow( idnotaingreso ).then( ( result ) => {
            if ( result.response == 1 ) {
                dispatch( setShow( result ) );
            }
        } ) . finally ( () => {
            // dispatch( removeLoading() );
        } );
    };
};

const onDelete = ( notaingreso ) => {
    return ( dispatch ) => {
        dispatch( setLoading() );

        NotaIngresoServices.onDelete( notaingreso ).then( (result) => {

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

const onSearchData = ( notaingreso ) => {
    return ( dispatch ) => {
        dispatch( setLoading() );

        NotaIngresoServices.onSearchData( notaingreso ).then( (result) => {
            if ( result.response == 1 ) {
                dispatch( disabledActions.onAction() );
                dispatch( setState( result.notaingreso ) );
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
        return await NotaIngresoServices.onImprimir().then( async (result) => {
            if ( result.response == 1 ) {
                await dispatch( setImprimir( result ) );
            }
            return result;
        } ) . finally ( () => {
            dispatch( removeLoading() );
        });
    };
};

function onValidate( notaingreso ) {
    const { codigo, nrofactura, nrorefprov } = notaingreso;
    let bandera = true;
    if ( codigo?.toString().length > 150 ) {
        notaingreso.error.codigo   = true;
        notaingreso.message.codigo = "Se permite máximo 150 caracteres";
        bandera = false;
    }
    if ( typeof notaingreso.fkidsucursal !== "number" ) {
        notaingreso.error.fkidsucursal   = true;
        notaingreso.message.fkidsucursal = "Campo requerido";
        bandera = false;
    }
    if ( typeof notaingreso.fkidalmacen !== "number" ) {
        notaingreso.error.fkidalmacen   = true;
        notaingreso.message.fkidalmacen = "Campo requerido";
        bandera = false;
    }
    if ( typeof notaingreso.fkidconceptoinventario !== "number" ) {
        notaingreso.error.fkidconceptoinventario   = true;
        notaingreso.message.fkidconceptoinventario = "Campo requerido";
        bandera = false;
    }
    if ( typeof notaingreso.fkidmoneda !== "number" ) {
        notaingreso.error.fkidmoneda   = true;
        notaingreso.message.fkidmoneda = "Campo requerido";
        bandera = false;
    }
    let contador = 0;
    for (let index = 0; index < notaingreso.arrayNotaIngresoDetalle.length; index++) {
        const element = notaingreso.arrayNotaIngresoDetalle[index];
        if ( element.fkidproducto != null ) {
            if ( parseInt(element.cantidad) <= 0 ) {
                element.errorcantidad = true;
                C_Message( "warning", `La cantidad de ${element.producto} debe ser mayor a 0` );
                bandera = false;
            }
            if ( parseInt(element.costounitario) <= 0 ) {
                element.errorcosto = true;
                C_Message( "warning", `El costo de ${element.producto} debe ser mayor a 0` );
                bandera = false;
            }
        } else {
            contador++;
        }
    }
    if ( contador === notaingreso.arrayNotaIngresoDetalle.length ) {
        C_Message( "warning", `Campo Producto requerido` );
        bandera = false;
    }
    if ( !bandera ) {
        C_Message( "error", "Problemas al registrar" );
    }
    return bandera;
};

export const NotaIngresoActions = {
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
