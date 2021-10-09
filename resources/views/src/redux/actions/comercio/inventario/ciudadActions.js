
import { C_Message } from "../../../../components";

import { Strings } from "../../../constants";
import { ciudadServices } from "../../../services/comercio/inventario/ciudadServices";

import { disabledActions } from "../../config/disabledActions";
import { removeLoading, setLoading } from "../../config/loadingActions";
import { paginationActions } from "../../config/paginationActions";

const onLimpiar = ( ) => ( {
    type: Strings.ciudad_setLimpiar,
} );

const onLoad = ( ) => ( {
    type: Strings.ciudad_setLoad,
} );

const setState = ( data ) => ( {
    type: Strings.ciudad_setState,
    payload: data,
} );

const onChange = ( data ) => ( {
    type: Strings.ciudad_onChange,
    payload: data,
} );

const setCreateCiudad = ( data ) => ( {
    type:    Strings.ciudad_onCreate,
    payload: data,
} );

const setEditarCiudad = ( data ) => ( {
    type:    Strings.ciudad_onEditar,
    payload: data,
} );

const setShowCiudad = ( data ) => ( {
    type:    Strings.ciudad_onShow,
    payload: data,
} );

const onFocus = ( ) => ( {
    type: Strings.ciudad_onFocus,
} );

const offFocus = ( ) => ( {
    type: Strings.ciudad_offFocus,
} );

const setDataCiudad = ( data ) => ( {
    type: Strings.ciudad_setArray,
    payload: data,
} );

const setImprimir = ( data ) => ( {
    type: Strings.ciudad_setImprimir,
    payload: data,
} );

const initData = ( ) => {
    return async ( dispatch ) => {

        await dispatch( onFocus() );
        await dispatch( paginationActions.removePagination() );
        await dispatch( disabledActions.onLimpiar() );
        await dispatch( onLimpiar() );

        ciudadServices.getData( ).then ( ( result ) => {
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
        ciudadServices.getData( ).then ( async ( result ) => {
            if ( result.response == 1 ) {
                dispatch( setDataCiudad(result.ciudad) );
            }
        } );
    };
};

const onChangePage = ( page ) => {
    return ( dispatch ) => {

        ciudadServices.getData( page ).then ( async ( result ) => {
            if ( result.response == 1 ) {
                let obj = {
                    pagination: result.pagination,
                    pagina: page,
                };
                await dispatch( disabledActions.onAction() );
                await dispatch( paginationActions.setPagination( obj ) );
                await dispatch( setState( result.ciudad[0] ) );
            }
        } );

    };
};

const onCreate = ( ) => {
    return ( dispatch ) => {
        // dispatch( setLoading() );
        // dispatch( onLimpiar() );
        dispatch( onLoad() );

        ciudadServices.onCreate().then( ( result ) => {
            if ( result.response == 1 ) {
                dispatch( setCreateCiudad( result ) );
                // dispatch( disabledActions.onCreate() );
            }
        } ) . finally ( () => {
            // dispatch( removeLoading() );
        } );
    };
};

const onGrabar = ( ciudad ) => {
    return async ( dispatch ) => {
        if ( !onValidate( ciudad ) ) {
            dispatch( onChange( ciudad ) );
            return;
        }
        await dispatch( setLoading() );

        return await ciudadServices.onGrabar( ciudad ).then( (result) => {
            if ( result.response == 0 ) {
                dispatch( onChange( result.resultData ) );
            }
            if ( result.response == 1 ) {
                dispatch( setDataCiudad(result.arrayCiudad) );
            }
            return result;
        } ) . finally ( () => {
            dispatch( removeLoading() );
        } );
    };
};

const onEdit = ( idciudad ) => {
    return ( dispatch ) => {
        dispatch( onLoad() );

        ciudadServices.onEdit( idciudad ).then( ( result ) => {
            if ( result.response == 1 ) {
                dispatch( setEditarCiudad( result ) );
            }
        } ) . finally ( () => {
            // dispatch( removeLoading() );
        } );
    };
};

const onUpdate = ( ciudad ) => {
    return async ( dispatch ) => {
        if ( !onValidate( ciudad ) ) {
            dispatch( onChange( ciudad ) );
            return;
        }
        await dispatch( setLoading() );

        return await ciudadServices.onUpdate( ciudad ).then( (result) => {
            if ( result.response == 0 ) {
                dispatch( onChange( result.resultData ) );
            }
            if ( result.response == 1 ) {
                dispatch( setDataCiudad(result.arrayCiudad) );
            }
            return result;
        } ) . finally ( () => {
            dispatch( removeLoading() );
        } );
    };
};

const onShow = ( idciudad ) => {
    return ( dispatch ) => {
        dispatch( onLoad() );

        ciudadServices.onShow( idciudad ).then( ( result ) => {
            if ( result.response == 1 ) {
                dispatch( setShowCiudad( result ) );
            }
        } ) . finally ( () => {
            // dispatch( removeLoading() );
        } );
    };
};

const onDelete = ( ciudad ) => {
    return ( dispatch ) => {
        // dispatch( setLoading() );

        ciudadServices.onDelete( ciudad ).then( (result) => {

            if ( result.response == 1 ) {
                dispatch( getData() );
            }

        } ) . finally ( () => {
            // dispatch( removeLoading() );
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

const onSearchData = ( ciudad ) => {
    return ( dispatch ) => {
        dispatch( setLoading() );

        ciudadServices.onSearchData( ciudad ).then( (result) => {
            if ( result.response == 1 ) {
                dispatch( disabledActions.onAction() );
                dispatch( setState( result.ciudad ) );
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
        return await ciudadServices.onImprimir().then( async (result) => {
            if ( result.response == 1 ) {
                await dispatch( setImprimir( result ) );
            }
            return result;
        } ) . finally ( () => {
            dispatch( removeLoading() );
        });
    };
};

function onValidate( ciudad ) {
    const { abreviatura, descripcion, fkidciudadclasificacion } = ciudad;
    let bandera = true;
    if ( descripcion.toString().trim().length === 0 ) {
        ciudad.error.descripcion   = true;
        ciudad.message.descripcion = "Campo requerido";
        bandera = false;
    }
    if ( descripcion.toString().length > 200 ) {
        ciudad.error.descripcion   = true;
        ciudad.message.descripcion = "Se permite máximo 200 caracteres";
        bandera = false;
    }
    if ( abreviatura?.toString().length > 50 ) {
        ciudad.error.abreviatura   = true;
        ciudad.message.abreviatura = "Se permite máximo 50 caracteres";
        bandera = false;
    }
    if ( typeof fkidciudadclasificacion !== "number" ) {
        ciudad.error.fkidciudadclasificacion   = true;
        ciudad.message.fkidciudadclasificacion = "Campo requerido";
        bandera = false;
    }
    if ( !bandera ) {
        C_Message( "error", "Problemas al registrar" );
    }
    return bandera;
};

export const ciudadActions = {
    initData,
    getData,
    onChangePage,

    onChange,
    setState,

    onCreate,
    onGrabar,
    onEdit,
    onUpdate,
    onShow,
    onDelete,
    onImprimir,

    onSearch,
    onSearchData,

    onCancelar,
};
