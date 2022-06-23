
import { C_Message } from "../../../../components";

import { Strings } from "../../../constants";
import { ProductoServices } from "../../../services/comercio/inventario/productoServices";

import { disabledActions } from "../../config/disabledActions";
import { removeLoading, setLoading } from "../../config/loadingActions";
import { paginationActions } from "../../config/paginationActions";

const onLimpiar = ( ) => ( {
    type: Strings.producto_setLimpiar,
} );

const onLoad = ( ) => ( {
    type: Strings.producto_setLoad,
} );

const setState = ( data ) => ( {
    type: Strings.producto_setState,
    payload: data,
} );

const onChange = ( data ) => ( {
    type: Strings.producto_onChange,
    payload: data,
} );

const setCreate = ( data ) => ( {
    type:    Strings.producto_onCreate,
    payload: data,
} );

const setEditar = ( data ) => ( {
    type:    Strings.producto_onEditar,
    payload: data,
} );

const setShow = ( data ) => ( {
    type:    Strings.producto_onShow,
    payload: data,
} );

const onFocus = ( ) => ( {
    type: Strings.producto_onFocus,
} );

const offFocus = ( ) => ( {
    type: Strings.producto_offFocus,
} );

const setImprimir = ( data ) => ( {
    type: Strings.producto_setImprimir,
    payload: data,
} );

const updateListaPrecio = ( arrayListaPrecio ) => ( {
    type: Strings.producto_updateListaPrecio,
    payload: arrayListaPrecio,
} );

const updateSucursalAlmacen = ( arraySucursal ) => ( {
    type: Strings.producto_updateSucursalAlmacen,
    payload: arraySucursal,
} );

const initData = ( ) => {
    return async ( dispatch ) => {

        await dispatch( onFocus() );
        await dispatch( paginationActions.removePagination() );
        await dispatch( disabledActions.onLimpiar() );
        await dispatch( onLimpiar() );

        ProductoServices.getData( ).then ( ( result ) => {
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
        ProductoServices.getData( ).then ( async ( result ) => {
            if ( result.response == 1 ) {
                // dispatch( setDataCiudad(result.ciudad) );
            }
        } );
    };
};

const onChangePage = ( page ) => {
    return ( dispatch ) => {

        ProductoServices.getData( page ).then ( async ( result ) => {
            if ( result.response == 1 ) {
                let obj = {
                    pagination: result.pagination,
                    pagina: page,
                };
                await dispatch( disabledActions.onAction() );
                await dispatch( paginationActions.setPagination( obj ) );
                await dispatch( setState( result.producto[0] ) );
                // await dispatch( updateListaPrecio( result.arrayListaPrecio ) );
            }
        } );

    };
};

const onCreate = ( ) => {
    return ( dispatch ) => {
        dispatch( setLoading() );

        ProductoServices.onCreate().then( ( result ) => {
            if ( result.response == 1 ) {
                dispatch( setCreate( result ) );
                dispatch( disabledActions.onCreate() );
            }
        } ) . finally ( () => {
            dispatch( removeLoading() );
        } );
    };
};

const onGrabar = ( producto ) => {
    return ( dispatch ) => {
        if ( !onValidate( producto ) ) {
            dispatch( onChange( producto ) );
            return;
        }
        dispatch( setLoading() );

        ProductoServices.onGrabar( producto ).then( (result) => {
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

const onEdit = ( producto ) => {
    return ( dispatch ) => {
        dispatch( setLoading() );

        ProductoServices.onEdit( producto.idproducto ).then( async ( result ) => {
            if ( result.response == 1 ) {
                await dispatch( setEditar( result.producto ) );
                await dispatch( updateListaPrecio( result.arrayListaPrecio ) );
                await dispatch( updateSucursalAlmacen( result ) );
                await dispatch( disabledActions.onEditar() );
            }
        } ) . finally ( () => {
            dispatch( removeLoading() );
        } );
    };
};

const onEditar = ( producto ) => {
    return ( dispatch ) => {
        dispatch( disabledActions.onEditar() );
        producto.update = true;
        dispatch( onChange( producto ) );
    };
};

const onUpdate = ( producto ) => {
    return ( dispatch ) => {
        if ( !onValidate( producto ) ) {
            dispatch( onChange( producto ) );
            return;
        }
        dispatch( setLoading() );

        ProductoServices.onUpdate( producto ).then( (result) => {
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

const onShow = ( idproducto ) => {
    return ( dispatch ) => {
        dispatch( onLoad() );

        ProductoServices.onShow( idproducto ).then( ( result ) => {
            if ( result.response == 1 ) {
                dispatch( setShow( result ) );
            }
        } ) . finally ( () => {
            // dispatch( removeLoading() );
        } );
    };
};

const onDelete = ( producto ) => {
    return ( dispatch ) => {
        dispatch( setLoading() );

        ProductoServices.onDelete( producto ).then( (result) => {

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

const onSearchData = ( producto ) => {
    return ( dispatch ) => {
        dispatch( setLoading() );

        ProductoServices.onSearchData( producto ).then( async (result) => {
            if ( result.response == 1 ) {
                await dispatch( disabledActions.onAction() );
                await dispatch( setState( result.producto ) );
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
        return await ProductoServices.onImprimir().then( async (result) => {
            if ( result.response == 1 ) {
                await dispatch( setImprimir( result ) );
            }
            return result;
        } ) . finally ( () => {
            dispatch( removeLoading() );
        });
    };
};

function onValidate( producto ) {
    const { abreviatura, codigo, nombre } = producto;
    let bandera = true;
    if ( nombre.toString().trim().length === 0 ) {
        producto.error.nombre   = true;
        producto.message.nombre = "Campo requerido";
        bandera = false;
    }
    if ( nombre.toString().length > 250 ) {
        producto.error.nombre   = true;
        producto.message.nombre = "Se permite máximo 200 caracteres";
        bandera = false;
    }
    if ( abreviatura?.toString().length > 50 ) {
        producto.error.abreviatura   = true;
        producto.message.abreviatura = "Se permite máximo 50 caracteres";
        bandera = false;
    }
    if ( codigo?.toString().length > 150 ) {
        producto.error.codigo   = true;
        producto.message.codigo = "Se permite máximo 50 caracteres";
        bandera = false;
    }
    if ( typeof parseFloat(producto.valorequivalente) != "number" ) {
        producto.error.valorequivalente   = true;
        producto.message.valorequivalente = "Campo requerido";
        bandera = false;
    }
    if ( parseInt(producto.valorequivalente) <= 0 ) {
        producto.error.valorequivalente   = true;
        producto.message.valorequivalente = "Campo requerido";
        bandera = false;
    }
    if ( typeof producto.fkidciudadorigen !== "number" ) {
        producto.error.fkidciudadorigen   = true;
        producto.message.fkidciudadorigen = "Campo requerido";
        bandera = false;
    }
    if ( typeof producto.fkidcategoria !== "number" ) {
        producto.error.fkidcategoria   = true;
        producto.message.fkidcategoria = "Campo requerido";
        bandera = false;
    }
    if ( typeof producto.fkidproductomarca !== "number" ) {
        producto.error.fkidproductomarca   = true;
        producto.message.fkidproductomarca = "Campo requerido";
        bandera = false;
    }
    if ( typeof producto.fkidproductotipo !== "number" ) {
        producto.error.fkidproductotipo   = true;
        producto.message.fkidproductotipo = "Campo requerido";
        bandera = false;
    }
    if ( typeof producto.fkidproductogrupo !== "number" ) {
        producto.error.fkidproductogrupo   = true;
        producto.message.fkidproductogrupo = "Campo requerido";
        bandera = false;
    }
    if ( typeof producto.fkidproductosubgrupo !== "number" ) {
        producto.error.fkidproductosubgrupo   = true;
        producto.message.fkidproductosubgrupo = "Campo requerido";
        bandera = false;
    }
    if ( typeof producto.fkidunidadmedida !== "number" ) {
        producto.error.fkidunidadmedida   = true;
        producto.message.fkidunidadmedida = "Campo requerido";
        bandera = false;
    }

    if ( !bandera ) {
        C_Message( "error", "Conflictos al registrar" );
    }
    return bandera;
};

export const productoActions = {
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
