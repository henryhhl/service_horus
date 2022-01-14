
import { C_Message } from "../../../../components";

import { Strings } from "../../../constants";
import { ConceptoVentaServices } from "../../../services/comercio/venta/conceptoVentaServices";

import { disabledActions } from "../../config/disabledActions";
import { removeLoading, setLoading } from "../../config/loadingActions";
import { paginationActions } from "../../config/paginationActions";

const onLimpiar = ( ) => ( {
    type: Strings.conceptoventa_setLimpiar,
} );

const onLoad = ( ) => ( {
    type: Strings.conceptoventa_setLoad,
} );

const setState = ( data ) => ( {
    type: Strings.conceptoventa_setState,
    payload: data,
} );

const onChange = ( data ) => ( {
    type: Strings.conceptoventa_onChange,
    payload: data,
} );

const setCreate = ( data ) => ( {
    type:    Strings.conceptoventa_onCreate,
    payload: data,
} );

const setEditar = ( data ) => ( {
    type:    Strings.conceptoventa_onEditar,
    payload: data,
} );

const setShow = ( data ) => ( {
    type:    Strings.conceptoventa_onShow,
    payload: data,
} );

const onFocus = ( ) => ( {
    type: Strings.conceptoventa_onFocus,
} );

const offFocus = ( ) => ( {
    type: Strings.conceptoventa_offFocus,
} );

const setImprimir = ( data ) => ( {
    type: Strings.conceptoventa_setImprimir,
    payload: data,
} );

const initData = ( ) => {
    return async ( dispatch ) => {

        await dispatch( onFocus() );
        await dispatch( paginationActions.removePagination() );
        await dispatch( disabledActions.onLimpiar() );
        await dispatch( onLimpiar() );

        ConceptoVentaServices.getData( ).then ( ( result ) => {
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
        ConceptoVentaServices.getData( ).then ( async ( result ) => {
            if ( result.response == 1 ) {
                // dispatch( setDataCiudad(result.ciudad) );
            }
        } );
    };
};

const onChangePage = ( page ) => {
    return ( dispatch ) => {

        ConceptoVentaServices.getData( page ).then ( async ( result ) => {
            if ( result.response == 1 ) {
                let obj = {
                    pagination: result.pagination,
                    pagina: page,
                };
                await dispatch( disabledActions.onAction() );
                await dispatch( paginationActions.setPagination( obj ) );
                await dispatch( setState( result.conceptoventa[0] ) );
            }
        } );

    };
};

const onCreate = ( ) => {
    return ( dispatch ) => {
        dispatch( setLoading() );

        ConceptoVentaServices.onCreate().then( ( result ) => {
            if ( result.response == 1 ) {
                dispatch( setCreate( result ) );
                dispatch( disabledActions.onCreate() );
            }
        } ) . finally ( () => {
            dispatch( removeLoading() );
        } );
    };
};

const onGrabar = ( conceptoventa ) => {
    return ( dispatch ) => {
        if ( !onValidate( conceptoventa ) ) {
            dispatch( onChange( conceptoventa ) );
            return;
        }
        dispatch( setLoading() );

        ConceptoVentaServices.onGrabar( conceptoventa ).then( (result) => {
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

const onEdit = ( idconceptoventa ) => {
    return ( dispatch ) => {
        dispatch( onLoad() );

        ConceptoVentaServices.onEdit( idconceptoventa ).then( ( result ) => {
            if ( result.response == 1 ) {
                dispatch( setEditar( result ) );
            }
        } ) . finally ( () => {
            // dispatch( removeLoading() );
        } );
    };
};

const onEditar = ( conceptoventa ) => {
    return ( dispatch ) => {
        dispatch( disabledActions.onEditar() );
        conceptoventa.update = true;
        dispatch( onChange( conceptoventa ) );
    };
};

const onUpdate = ( conceptoventa ) => {
    return ( dispatch ) => {
        if ( !onValidate( conceptoventa ) ) {
            dispatch( onChange( conceptoventa ) );
            return;
        }
        dispatch( setLoading() );

        ConceptoVentaServices.onUpdate( conceptoventa ).then( (result) => {
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

const onShow = ( idconceptoventa ) => {
    return ( dispatch ) => {
        dispatch( onLoad() );

        ConceptoVentaServices.onShow( idconceptoventa ).then( ( result ) => {
            if ( result.response == 1 ) {
                dispatch( setShow( result ) );
            }
        } ) . finally ( () => {
            // dispatch( removeLoading() );
        } );
    };
};

const onDelete = ( conceptoventa ) => {
    return ( dispatch ) => {
        dispatch( setLoading() );

        ConceptoVentaServices.onDelete( conceptoventa ).then( (result) => {

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

const onSearchData = ( conceptoventa ) => {
    return ( dispatch ) => {
        dispatch( setLoading() );

        ConceptoVentaServices.onSearchData( conceptoventa ).then( (result) => {
            if ( result.response == 1 ) {
                dispatch( disabledActions.onAction() );
                dispatch( setState( result.conceptoventa ) );
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
        return await ConceptoVentaServices.onImprimir().then( async (result) => {
            if ( result.response == 1 ) {
                await dispatch( setImprimir( result ) );
            }
            return result;
        } ) . finally ( () => {
            dispatch( removeLoading() );
        });
    };
};

function onValidate( conceptoventa ) {
    const { descripcion } = conceptoventa;
    let bandera = true;
    if ( descripcion.toString().trim().length === 0 ) {
        conceptoventa.error.descripcion   = true;
        conceptoventa.message.descripcion = "Campo requerido";
        bandera = false;
    }
    if ( descripcion.toString().length > 200 ) {
        conceptoventa.error.descripcion   = true;
        conceptoventa.message.descripcion = "Se permite máximo 200 caracteres";
        bandera = false;
    }
    if ( !bandera ) {
        C_Message( "error", "Problemas al registrar" );
    }
    return bandera;
};

export const conceptoVentaActions = {
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
