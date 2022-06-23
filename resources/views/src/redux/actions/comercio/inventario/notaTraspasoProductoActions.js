
import { C_Message } from "../../../../components";

import { Strings } from "../../../constants";
import { NotaTraspasoProductoServices } from "../../../services/comercio/inventario/notaTraspasoProductoServices";

import { disabledActions } from "../../config/disabledActions";
import { removeLoading, setLoading } from "../../config/loadingActions";
import { paginationActions } from "../../config/paginationActions";

const onLimpiar = ( ) => ( {
    type: Strings.notatraspasoproducto_setLimpiar,
} );

const onLoad = ( ) => ( {
    type: Strings.notatraspasoproducto_setLoad,
} );

const setState = ( data ) => ( {
    type: Strings.notatraspasoproducto_setState,
    payload: data,
} );

const onChange = ( data ) => ( {
    type: Strings.notatraspasoproducto_onChange,
    payload: data,
} );

const setCreate = ( data ) => ( {
    type:    Strings.notatraspasoproducto_onCreate,
    payload: data,
} );

const setEditar = ( data ) => ( {
    type:    Strings.notatraspasoproducto_onEditar,
    payload: data,
} );

const setShow = ( data ) => ( {
    type:    Strings.notatraspasoproducto_onShow,
    payload: data,
} );

const onFocus = ( ) => ( {
    type: Strings.notatraspasoproducto_onFocus,
} );

const offFocus = ( ) => ( {
    type: Strings.notatraspasoproducto_offFocus,
} );

const setImprimir = ( data ) => ( {
    type: Strings.notatraspasoproducto_setImprimir,
    payload: data,
} );

const initData = ( ) => {
    return async ( dispatch ) => {

        await dispatch( onFocus() );
        await dispatch( paginationActions.removePagination() );
        await dispatch( disabledActions.onLimpiar() );
        await dispatch( onLimpiar() );

        NotaTraspasoProductoServices.getData( ).then ( ( result ) => {
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
        NotaTraspasoProductoServices.getData( ).then ( async ( result ) => {
            if ( result.response == 1 ) {
                // dispatch( setDataCiudad(result.ciudad) );
            }
        } );
    };
};

const onChangePage = ( page ) => {
    return ( dispatch ) => {

        NotaTraspasoProductoServices.getData( page ).then ( async ( result ) => {
            if ( result.response == 1 ) {
                let obj = {
                    pagination: result.pagination,
                    pagina: page,
                };
                await dispatch( disabledActions.onAction() );
                await dispatch( paginationActions.setPagination( obj ) );
                await dispatch( setState( result.arrayNotaTraspasoProducto[0] ) );
            }
        } );

    };
};

const onCreate = ( ) => {
    return ( dispatch ) => {
        dispatch( setLoading() );

        NotaTraspasoProductoServices.onCreate().then( ( result ) => {
            if ( result.response == 1 ) {
                dispatch( setCreate( result ) );
                dispatch( disabledActions.onCreate() );
            }
        } ) . finally ( () => {
            dispatch( removeLoading() );
        } );
    };
};

const onGrabar = ( notatraspasoproducto ) => {
    return ( dispatch ) => {
        if ( !onValidate( notatraspasoproducto ) ) {
            dispatch( onChange( notatraspasoproducto ) );
            return;
        }
        dispatch( setLoading() );

        NotaTraspasoProductoServices.onGrabar( notatraspasoproducto ).then( (result) => {
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

const onEdit = ( idnotatraspasoproducto ) => {
    return ( dispatch ) => {
        dispatch( onLoad() );

        NotaTraspasoProductoServices.onEdit( idnotatraspasoproducto ).then( ( result ) => {
            if ( result.response == 1 ) {
                dispatch( setEditar( result ) );
            }
        } ) . finally ( () => {
            // dispatch( removeLoading() );
        } );
    };
};

const onEditar = ( notatraspasoproducto ) => {
    return ( dispatch ) => {
        dispatch( disabledActions.onEditar() );
        notatraspasoproducto.update = true;
        dispatch( onChange( notatraspasoproducto ) );
    };
};

const onUpdate = ( notatraspasoproducto ) => {
    return ( dispatch ) => {
        if ( !onValidate( notatraspasoproducto ) ) {
            dispatch( onChange( notatraspasoproducto ) );
            return;
        }
        dispatch( setLoading() );

        NotaTraspasoProductoServices.onUpdate( notatraspasoproducto ).then( (result) => {
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

const onShow = ( idnotatraspasoproducto ) => {
    return ( dispatch ) => {
        dispatch( onLoad() );

        NotaTraspasoProductoServices.onShow( idnotatraspasoproducto ).then( ( result ) => {
            if ( result.response == 1 ) {
                dispatch( setShow( result ) );
            }
        } ) . finally ( () => {
            // dispatch( removeLoading() );
        } );
    };
};

const onDelete = ( notatraspasoproducto ) => {
    return ( dispatch ) => {
        dispatch( setLoading() );

        NotaTraspasoProductoServices.onDelete( notatraspasoproducto ).then( (result) => {

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

const onSearchData = ( notatraspasoproducto ) => {
    return ( dispatch ) => {
        dispatch( setLoading() );

        NotaTraspasoProductoServices.onSearchData( notatraspasoproducto ).then( (result) => {
            if ( result.response == 1 ) {
                dispatch( disabledActions.onAction() );
                dispatch( setState( result.notatraspasoproducto ) );
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
        return await NotaTraspasoProductoServices.onImprimir().then( async (result) => {
            if ( result.response == 1 ) {
                await dispatch( setImprimir( result ) );
            }
            return result;
        } ) . finally ( () => {
            dispatch( removeLoading() );
        });
    };
};

function onValidate( notatraspasoproducto ) {
    const { codigo, nrofactura, nrorefprov } = notatraspasoproducto;
    let bandera = true;
    if ( codigo?.toString().length > 150 ) {
        notatraspasoproducto.error.codigo   = true;
        notatraspasoproducto.message.codigo = "Se permite máximo 150 caracteres";
        bandera = false;
    }
    if ( typeof notatraspasoproducto.fkidsucursalingreso !== "number" ) {
        notatraspasoproducto.error.fkidsucursalingreso   = true;
        notatraspasoproducto.message.fkidsucursalingreso = "Campo requerido";
        bandera = false;
    }
    if ( typeof notatraspasoproducto.fkidsucursalsalida !== "number" ) {
        notatraspasoproducto.error.fkidsucursalsalida   = true;
        notatraspasoproducto.message.fkidsucursalsalida = "Campo requerido";
        bandera = false;
    }
    if ( typeof notatraspasoproducto.fkidalmaceningreso !== "number" ) {
        notatraspasoproducto.error.fkidalmaceningreso   = true;
        notatraspasoproducto.message.fkidalmaceningreso = "Campo requerido";
        bandera = false;
    }
    if ( typeof notatraspasoproducto.fkidalmacensalida !== "number" ) {
        notatraspasoproducto.error.fkidalmacensalida   = true;
        notatraspasoproducto.message.fkidalmacensalida = "Campo requerido";
        bandera = false;
    }
    if ( typeof notatraspasoproducto.fkidconceptoinventario !== "number" ) {
        notatraspasoproducto.error.fkidconceptoinventario   = true;
        notatraspasoproducto.message.fkidconceptoinventario = "Campo requerido";
        bandera = false;
    }
    if ( typeof notatraspasoproducto.fkidmoneda !== "number" ) {
        notatraspasoproducto.error.fkidmoneda   = true;
        notatraspasoproducto.message.fkidmoneda = "Campo requerido";
        bandera = false;
    }
    let contador = 0;
    for (let index = 0; index < notatraspasoproducto.arrayNotaTraspasoProductoDetalle.length; index++) {
        const element = notatraspasoproducto.arrayNotaTraspasoProductoDetalle[index];
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
    if ( contador === notatraspasoproducto.arrayNotaTraspasoProductoDetalle.length ) {
        C_Message( "warning", `Campo Producto requerido` );
        bandera = false;
    }
    if ( !bandera ) {
        C_Message( "error", "Problemas al registrar" );
    }
    return bandera;
};

export const NotaTraspasoProductoActions = {
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
