
import { C_Message } from "../../../../components";

import { Strings } from "../../../constants";
import { ConceptoCompraServices } from "../../../services/comercio/compra/conceptoCompraServices";

import { disabledActions } from "../../config/disabledActions";
import { removeLoading, setLoading } from "../../config/loadingActions";
import { paginationActions } from "../../config/paginationActions";

const onLimpiar = ( ) => ( {
    type: Strings.conceptocompra_setLimpiar,
} );

const onLoad = ( ) => ( {
    type: Strings.conceptocompra_setLoad,
} );

const setState = ( data ) => ( {
    type: Strings.conceptocompra_setState,
    payload: data,
} );

const onChange = ( data ) => ( {
    type: Strings.conceptocompra_onChange,
    payload: data,
} );

const setCreate = ( data ) => ( {
    type:    Strings.conceptocompra_onCreate,
    payload: data,
} );

const setEditar = ( data ) => ( {
    type:    Strings.conceptocompra_onEditar,
    payload: data,
} );

const setShow = ( data ) => ( {
    type:    Strings.conceptocompra_onShow,
    payload: data,
} );

const onFocus = ( ) => ( {
    type: Strings.conceptocompra_onFocus,
} );

const offFocus = ( ) => ( {
    type: Strings.conceptocompra_offFocus,
} );

const setImprimir = ( data ) => ( {
    type: Strings.conceptocompra_setImprimir,
    payload: data,
} );

const initData = ( ) => {
    return async ( dispatch ) => {

        await dispatch( onFocus() );
        await dispatch( paginationActions.removePagination() );
        await dispatch( disabledActions.onLimpiar() );
        await dispatch( onLimpiar() );

        ConceptoCompraServices.getData( ).then ( ( result ) => {
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
        ConceptoCompraServices.getData( ).then ( async ( result ) => {
            if ( result.response == 1 ) {
                // dispatch( setDataCiudad(result.ciudad) );
            }
        } );
    };
};

const onChangePage = ( page ) => {
    return ( dispatch ) => {

        ConceptoCompraServices.getData( page ).then ( async ( result ) => {
            if ( result.response == 1 ) {
                let obj = {
                    pagination: result.pagination,
                    pagina: page,
                };
                await dispatch( disabledActions.onAction() );
                await dispatch( paginationActions.setPagination( obj ) );
                await dispatch( setState( result.conceptocompra[0] ) );
            }
        } );

    };
};

const onCreate = ( ) => {
    return ( dispatch ) => {
        dispatch( setLoading() );

        ConceptoCompraServices.onCreate().then( ( result ) => {
            if ( result.response == 1 ) {
                dispatch( setCreate( result ) );
                dispatch( disabledActions.onCreate() );
            }
        } ) . finally ( () => {
            dispatch( removeLoading() );
        } );
    };
};

const onGrabar = ( conceptocompra ) => {
    return ( dispatch ) => {
        if ( !onValidate( conceptocompra ) ) {
            dispatch( onChange( conceptocompra ) );
            return;
        }
        dispatch( setLoading() );

        ConceptoCompraServices.onGrabar( conceptocompra ).then( (result) => {
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

const onEdit = ( idconceptocompra ) => {
    return ( dispatch ) => {
        dispatch( onLoad() );

        ConceptoCompraServices.onEdit( idconceptocompra ).then( ( result ) => {
            if ( result.response == 1 ) {
                dispatch( setEditar( result ) );
            }
        } ) . finally ( () => {
            // dispatch( removeLoading() );
        } );
    };
};

const onEditar = ( conceptocompra ) => {
    return ( dispatch ) => {
        dispatch( disabledActions.onEditar() );
        conceptocompra.update = true;
        dispatch( onChange( conceptocompra ) );
    };
};

const onUpdate = ( conceptocompra ) => {
    return ( dispatch ) => {
        if ( !onValidate( conceptocompra ) ) {
            dispatch( onChange( conceptocompra ) );
            return;
        }
        dispatch( setLoading() );

        ConceptoCompraServices.onUpdate( conceptocompra ).then( (result) => {
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

const onShow = ( idconceptocompra ) => {
    return ( dispatch ) => {
        dispatch( onLoad() );

        ConceptoCompraServices.onShow( idconceptocompra ).then( ( result ) => {
            if ( result.response == 1 ) {
                dispatch( setShow( result ) );
            }
        } ) . finally ( () => {
            // dispatch( removeLoading() );
        } );
    };
};

const onDelete = ( conceptocompra ) => {
    return ( dispatch ) => {
        dispatch( setLoading() );

        ConceptoCompraServices.onDelete( conceptocompra ).then( (result) => {

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

const onSearchData = ( conceptocompra ) => {
    return ( dispatch ) => {
        dispatch( setLoading() );

        ConceptoCompraServices.onSearchData( conceptocompra ).then( (result) => {
            if ( result.response == 1 ) {
                dispatch( disabledActions.onAction() );
                dispatch( setState( result.conceptocompra ) );
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
        return await ConceptoCompraServices.onImprimir().then( async (result) => {
            if ( result.response == 1 ) {
                await dispatch( setImprimir( result ) );
            }
            return result;
        } ) . finally ( () => {
            dispatch( removeLoading() );
        });
    };
};

function onValidate( conceptocompra ) {
    const { descripcion } = conceptocompra;
    let bandera = true;
    if ( descripcion.toString().trim().length === 0 ) {
        conceptocompra.error.descripcion   = true;
        conceptocompra.message.descripcion = "Campo requerido";
        bandera = false;
    }
    if ( descripcion.toString().length > 200 ) {
        conceptocompra.error.descripcion   = true;
        conceptocompra.message.descripcion = "Se permite máximo 200 caracteres";
        bandera = false;
    }
    if ( !bandera ) {
        C_Message( "error", "Problemas al registrar" );
    }
    return bandera;
};

export const conceptoCompraActions = {
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
