
import { C_Message } from "../../../../components";

import { Strings } from "../../../constants";
import { NotaCompraServices } from "../../../services/comercio/compra/notaCompraServices";

import { disabledActions } from "../../config/disabledActions";
import { removeLoading, setLoading } from "../../config/loadingActions";
import { paginationActions } from "../../config/paginationActions";

const onLimpiar = ( ) => ( {
    type: Strings.notacompra_setLimpiar,
} );

const onLoad = ( ) => ( {
    type: Strings.notacompra_setLoad,
} );

const setState = ( data ) => ( {
    type: Strings.notacompra_setState,
    payload: data,
} );

const onChange = ( data ) => ( {
    type: Strings.notacompra_onChange,
    payload: data,
} );

const setCreate = ( data ) => ( {
    type:    Strings.notacompra_onCreate,
    payload: data,
} );

const setEditar = ( data ) => ( {
    type:    Strings.notacompra_onEditar,
    payload: data,
} );

const setShow = ( data ) => ( {
    type:    Strings.notacompra_onShow,
    payload: data,
} );

const onFocus = ( ) => ( {
    type: Strings.notacompra_onFocus,
} );

const offFocus = ( ) => ( {
    type: Strings.notacompra_offFocus,
} );

const setImprimir = ( data ) => ( {
    type: Strings.notacompra_setImprimir,
    payload: data,
} );

const initData = ( ) => {
    return async ( dispatch ) => {

        await dispatch( onFocus() );
        await dispatch( paginationActions.removePagination() );
        await dispatch( disabledActions.onLimpiar() );
        await dispatch( onLimpiar() );

        NotaCompraServices.getData( ).then ( ( result ) => {
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
        NotaCompraServices.getData( ).then ( async ( result ) => {
            if ( result.response == 1 ) {
                // dispatch( setDataCiudad(result.ciudad) );
            }
        } );
    };
};

const onChangePage = ( page ) => {
    return ( dispatch ) => {

        NotaCompraServices.getData( page ).then ( async ( result ) => {
            if ( result.response == 1 ) {
                let obj = {
                    pagination: result.pagination,
                    pagina: page,
                };
                await dispatch( disabledActions.onAction() );
                await dispatch( paginationActions.setPagination( obj ) );
                await dispatch( setState( result.notacompra[0] ) );
            }
        } );

    };
};

const onCreate = ( ) => {
    return ( dispatch ) => {
        dispatch( setLoading() );

        NotaCompraServices.onCreate().then( ( result ) => {
            if ( result.response == 1 ) {
                dispatch( setCreate( result ) );
                dispatch( disabledActions.onCreate() );
            }
        } ) . finally ( () => {
            dispatch( removeLoading() );
        } );
    };
};

const onGrabar = ( notacompra ) => {
    return ( dispatch ) => {
        if ( !onValidate( notacompra ) ) {
            dispatch( onChange( notacompra ) );
            return;
        }
        dispatch( setLoading() );

        NotaCompraServices.onGrabar( notacompra ).then( (result) => {
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

const onEdit = ( idnotacompra ) => {
    return ( dispatch ) => {
        dispatch( onLoad() );

        NotaCompraServices.onEdit( idnotacompra ).then( ( result ) => {
            if ( result.response == 1 ) {
                dispatch( setEditar( result ) );
            }
        } ) . finally ( () => {
            // dispatch( removeLoading() );
        } );
    };
};

const onEditar = ( notacompra ) => {
    return ( dispatch ) => {
        dispatch( disabledActions.onEditar() );
        notacompra.update = true;
        dispatch( onChange( notacompra ) );
    };
};

const onUpdate = ( notacompra ) => {
    return ( dispatch ) => {
        if ( !onValidate( notacompra ) ) {
            dispatch( onChange( notacompra ) );
            return;
        }
        dispatch( setLoading() );

        NotaCompraServices.onUpdate( notacompra ).then( (result) => {
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

const onShow = ( idnotacompra ) => {
    return ( dispatch ) => {
        dispatch( onLoad() );

        NotaCompraServices.onShow( idnotacompra ).then( ( result ) => {
            if ( result.response == 1 ) {
                dispatch( setShow( result ) );
            }
        } ) . finally ( () => {
            // dispatch( removeLoading() );
        } );
    };
};

const onDelete = ( notacompra ) => {
    return ( dispatch ) => {
        dispatch( setLoading() );

        NotaCompraServices.onDelete( notacompra ).then( (result) => {

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

const onSearchData = ( notacompra ) => {
    return ( dispatch ) => {
        dispatch( setLoading() );

        NotaCompraServices.onSearchData( notacompra ).then( (result) => {
            if ( result.response == 1 ) {
                dispatch( disabledActions.onAction() );
                dispatch( setState( result.notacompra ) );
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
        return await NotaCompraServices.onImprimir().then( async (result) => {
            if ( result.response == 1 ) {
                await dispatch( setImprimir( result ) );
            }
            return result;
        } ) . finally ( () => {
            dispatch( removeLoading() );
        });
    };
};

function onValidate( notacompra ) {
    const { codigo, nrofactura, nrorefprov } = notacompra;
    let bandera = true;
    if ( codigo?.toString().length > 150 ) {
        notacompra.error.codigo   = true;
        notacompra.message.codigo = "Se permite máximo 150 caracteres";
        bandera = false;
    }
    if ( nrofactura?.toString().length > 150 ) {
        notacompra.error.nrofactura   = true;
        notacompra.message.nrofactura = "Se permite máximo 150 caracteres";
        bandera = false;
    }
    if ( nrorefprov?.toString().length > 150 ) {
        notacompra.error.nrorefprov   = true;
        notacompra.message.nrorefprov = "Se permite máximo 150 caracteres";
        bandera = false;
    }
    if ( typeof notacompra.fkidsucursal !== "number" ) {
        notacompra.error.fkidsucursal   = true;
        notacompra.message.fkidsucursal = "Campo requerido";
        bandera = false;
    }
    if ( typeof notacompra.fkidalmacen !== "number" ) {
        notacompra.error.fkidalmacen   = true;
        notacompra.message.fkidalmacen = "Campo requerido";
        bandera = false;
    }
    if ( typeof notacompra.fkidconceptocompra !== "number" ) {
        notacompra.error.fkidconceptocompra   = true;
        notacompra.message.fkidconceptocompra = "Campo requerido";
        bandera = false;
    }
    if ( typeof notacompra.fkidproveedor !== "number" ) {
        notacompra.error.fkidproveedor   = true;
        notacompra.message.fkidproveedor = "Campo requerido";
        bandera = false;
    }
    if ( typeof notacompra.fkidmoneda !== "number" ) {
        notacompra.error.fkidmoneda   = true;
        notacompra.message.fkidmoneda = "Campo requerido";
        bandera = false;
    }
    let contador = 0;
    for (let index = 0; index < notacompra.arrayNotaCompraDetalle.length; index++) {
        const element = notacompra.arrayNotaCompraDetalle[index];
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
    if ( contador === notacompra.arrayNotaCompraDetalle.length ) {
        C_Message( "warning", `Campo Producto requerido` );
        bandera = false;
    }
    if ( !bandera ) {
        C_Message( "error", "Problemas al registrar" );
    }
    return bandera;
};

export const NotaCompraActions = {
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
