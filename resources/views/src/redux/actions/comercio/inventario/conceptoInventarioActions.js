
import { C_Message } from "../../../../components";

import { Strings } from "../../../constants";
import { conceptoInventarioServices } from "../../../services/comercio/inventario/conceptoInventarioServices";

import { disabledActions } from "../../config/disabledActions";
import { removeLoading, setLoading } from "../../config/loadingActions";
import { paginationActions } from "../../config/paginationActions";

const onLimpiar = ( ) => ( {
    type: Strings.conceptoinventario_setLimpiar,
} );

const onLoad = ( ) => ( {
    type: Strings.conceptoinventario_setLoad,
} );

const setState = ( data ) => ( {
    type: Strings.conceptoinventario_setState,
    payload: data,
} );

const onChange = ( data ) => ( {
    type: Strings.conceptoinventario_onChange,
    payload: data,
} );

const setCreateConceptoInventario = ( data ) => ( {
    type:    Strings.conceptoinventario_onCreate,
    payload: data,
} );

const setEditarConceptoInventario = ( data ) => ( {
    type:    Strings.conceptoinventario_onEditar,
    payload: data,
} );

const setShowConceptoInventario = ( data ) => ( {
    type:    Strings.conceptoinventario_onShow,
    payload: data,
} );

const onFocus = ( ) => ( {
    type: Strings.conceptoinventario_onFocus,
} );

const offFocus = ( ) => ( {
    type: Strings.conceptoinventario_offFocus,
} );

const setImprimir = ( data ) => ( {
    type: Strings.conceptoinventario_setImprimir,
    payload: data,
} );

const initData = ( ) => {
    return async ( dispatch ) => {

        await dispatch( onFocus() );
        await dispatch( paginationActions.removePagination() );
        await dispatch( disabledActions.onLimpiar() );
        await dispatch( onLimpiar() );

        conceptoInventarioServices.getData( ).then ( ( result ) => {
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
        conceptoInventarioServices.getData( ).then ( async ( result ) => {
            if ( result.response == 1 ) {
                // dispatch( setDataCiudad(result.ciudad) );
            }
        } );
    };
};

const onChangePage = ( page ) => {
    return ( dispatch ) => {

        conceptoInventarioServices.getData( page ).then ( async ( result ) => {
            if ( result.response == 1 ) {
                let obj = {
                    pagination: result.pagination,
                    pagina: page,
                };
                await dispatch( disabledActions.onAction() );
                await dispatch( paginationActions.setPagination( obj ) );
                await dispatch( setState( result.conceptoinventario[0] ) );
            }
        } );

    };
};

const onCreate = ( ) => {
    return ( dispatch ) => {
        dispatch( setLoading() );

        conceptoInventarioServices.onCreate().then( ( result ) => {
            if ( result.response == 1 ) {
                dispatch( setCreateConceptoInventario( result ) );
                dispatch( disabledActions.onCreate() );
            }
        } ) . finally ( () => {
            dispatch( removeLoading() );
        } );
    };
};

const onGrabar = ( conceptoinventario ) => {
    return ( dispatch ) => {
        if ( !onValidate( conceptoinventario ) ) {
            dispatch( onChange( conceptoinventario ) );
            return;
        }
        dispatch( setLoading() );

        conceptoInventarioServices.onGrabar( conceptoinventario ).then( (result) => {
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

const onEdit = ( idconceptoinventario ) => {
    return ( dispatch ) => {
        dispatch( onLoad() );

        conceptoInventarioServices.onEdit( idconceptoinventario ).then( ( result ) => {
            if ( result.response == 1 ) {
                dispatch( setEditarConceptoInventario( result ) );
            }
        } ) . finally ( () => {
            // dispatch( removeLoading() );
        } );
    };
};

const onEditar = ( conceptoinventario ) => {
    return ( dispatch ) => {
        dispatch( disabledActions.onEditar() );
        conceptoinventario.update = true;
        dispatch( onChange( conceptoinventario ) );
    };
};

const onUpdate = ( conceptoinventario ) => {
    return ( dispatch ) => {
        if ( !onValidate( conceptoinventario ) ) {
            dispatch( onChange( conceptoinventario ) );
            return;
        }
        dispatch( setLoading() );

        conceptoInventarioServices.onUpdate( conceptoinventario ).then( (result) => {
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

const onShow = ( idconceptoinventario ) => {
    return ( dispatch ) => {
        dispatch( onLoad() );

        conceptoInventarioServices.onShow( idconceptoinventario ).then( ( result ) => {
            if ( result.response == 1 ) {
                dispatch( setShowConceptoInventario( result ) );
            }
        } ) . finally ( () => {
            // dispatch( removeLoading() );
        } );
    };
};

const onDelete = ( conceptoinventario ) => {
    return ( dispatch ) => {
        dispatch( setLoading() );

        conceptoInventarioServices.onDelete( conceptoinventario ).then( (result) => {

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

const onSearchData = ( conceptoinventario ) => {
    return ( dispatch ) => {
        dispatch( setLoading() );

        conceptoInventarioServices.onSearchData( conceptoinventario ).then( (result) => {
            if ( result.response == 1 ) {
                dispatch( disabledActions.onAction() );
                dispatch( setState( result.conceptoinventario ) );
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
        return await conceptoInventarioServices.onImprimir().then( async (result) => {
            if ( result.response == 1 ) {
                await dispatch( setImprimir( result ) );
            }
            return result;
        } ) . finally ( () => {
            dispatch( removeLoading() );
        });
    };
};

function onValidate( conceptoinventario ) {
    const { descripcion } = conceptoinventario;
    let bandera = true;
    if ( descripcion.toString().trim().length === 0 ) {
        conceptoinventario.error.descripcion   = true;
        conceptoinventario.message.descripcion = "Campo requerido";
        bandera = false;
    }
    if ( descripcion.toString().length > 200 ) {
        conceptoinventario.error.descripcion   = true;
        conceptoinventario.message.descripcion = "Se permite máximo 200 caracteres";
        bandera = false;
    }
    if ( !bandera ) {
        C_Message( "error", "Problemas al registrar" );
    }
    return bandera;
};

export const conceptoInventarioActions = {
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
