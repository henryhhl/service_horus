
import { C_Message } from "../../../../components";

import { Strings } from "../../../constants";
import { ciudadClasificacionServices } from "../../../services/comercio/inventario/ciudadClasificacionServices";

import { disabledActions } from "../../config/disabledActions";
import { removeLoading, setLoading } from "../../config/loadingActions";
import { paginationActions } from "../../config/paginationActions";

const onLimpiar = ( ) => ( {
    type: Strings.ciudadclasificacion_setLimpiar,
} );

const setState = ( data ) => ( {
    type: Strings.ciudadclasificacion_setState,
    payload: data,
} );

const onChange = ( data ) => ( {
    type: Strings.ciudadclasificacion_onChange,
    payload: data,
} );

const setIDCiudadClasificacion = ( idciudadclasificacion ) => ( {
    type:    Strings.ciudadclasificacion_onCreate,
    payload: idciudadclasificacion,
} );

const onFocus = ( ) => ( {
    type: Strings.ciudadclasificacion_onFocus,
} );

const offFocus = ( ) => ( {
    type: Strings.ciudadclasificacion_offFocus,
} );

const setImprimir = ( data ) => ( {
    type: Strings.ciudadclasificacion_setImprimir,
    payload: data,
} );

const initData = ( ) => {
    return async ( dispatch ) => {

        await dispatch( onFocus() );
        await dispatch( paginationActions.removePagination() );
        await dispatch( disabledActions.onLimpiar() );
        await dispatch( onLimpiar() );

        ciudadClasificacionServices.getData( ).then ( ( result ) => {
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

const onChangePage = ( page ) => {
    return ( dispatch ) => {

        ciudadClasificacionServices.getData( page ).then ( async ( result ) => {
            if ( result.response == 1 ) {
                let obj = {
                    pagination: result.pagination,
                    pagina: page,
                };
                await dispatch( disabledActions.onAction() );
                await dispatch( paginationActions.setPagination( obj ) );
                await dispatch( setState( result.ciudadclasificacion[0] ) );
            }
        } );

    };
};

const onCreate = ( ) => {
    return ( dispatch ) => {
        dispatch( setLoading() );

        ciudadClasificacionServices.onCreate().then( ( result ) => {
            if ( result.response == 1 ) {
                dispatch( setIDCiudadClasificacion( result.idciudadclasificacion) );
                dispatch( disabledActions.onCreate() );
            }
        } ) . finally ( () => {
            dispatch( removeLoading() );
        } );
    };
};

const onGrabar = ( ciudadClasificacion ) => {
    return ( dispatch ) => {
        if ( !onValidate( ciudadClasificacion ) ) {
            dispatch( onChange( ciudadClasificacion ) );
            return;
        }
        dispatch( setLoading() );

        ciudadClasificacionServices.onGrabar( ciudadClasificacion ).then( (result) => {
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

const onEditar = ( ciudadClasificacion ) => {
    return ( dispatch ) => {
        dispatch( disabledActions.onEditar() );
        ciudadClasificacion.update = true;
        dispatch( onChange( ciudadClasificacion ) );
    };
};

const onUpdate = ( ciudadClasificacion ) => {
    return ( dispatch ) => {
        if ( !onValidate( ciudadClasificacion ) ) {
            dispatch( onChange( ciudadClasificacion ) );
            return;
        }
        dispatch( setLoading() );

        ciudadClasificacionServices.onUpdate( ciudadClasificacion ).then( (result) => {
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

const onDelete = ( ciudadClasificacion ) => {
    return ( dispatch ) => {
        dispatch( setLoading() );

        ciudadClasificacionServices.onDelete( ciudadClasificacion ).then( (result) => {

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

const onSearchData = ( ciudadClasificacion ) => {
    return ( dispatch ) => {
        dispatch( setLoading() );

        ciudadClasificacionServices.onSearchData( ciudadClasificacion ).then( (result) => {
            if ( result.response == 1 ) {
                dispatch( disabledActions.onAction() );
                dispatch( setState( result.ciudadclasificacion ) );
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
        return await ciudadClasificacionServices.onImprimir().then( async (result) => {
            if ( result.response == 1 ) {
                await dispatch( setImprimir( result ) );
            }
            return result;
        } ) . finally ( () => {
            dispatch( removeLoading() );
        });
    };
};

function onValidate( ciudadClasificacion ) {
    const { descripcion } = ciudadClasificacion;
    let bandera = true;
    if ( descripcion.toString().trim().length === 0 ) {
        ciudadClasificacion.error.descripcion   = true;
        ciudadClasificacion.message.descripcion = "Campo requerido";
        bandera = false;
    }
    if ( !bandera ) {
        C_Message( "error", "Problemas al registrar" );
    }
    return bandera;
};

export const ciudadClasificacionActions = {
    initData,
    onChangePage,
    onChange,
    setState,

    onCreate,
    onGrabar,
    onEditar,
    onUpdate,
    onDelete,
    onImprimir,

    onSearch,
    onSearchData,

    onCancelar,
};
