
import { C_Message } from "../../../../components";

import { Strings } from "../../../constants";
import { ActividadEconomicaServices } from "../../../services/comercio/venta/actividadEconomicaServices";

import { disabledActions } from "../../config/disabledActions";
import { removeLoading, setLoading } from "../../config/loadingActions";
import { paginationActions } from "../../config/paginationActions";

const onLimpiar = ( ) => ( {
    type: Strings.actividadeconomica_setLimpiar,
} );

const onLoad = ( ) => ( {
    type: Strings.actividadeconomica_setLoad,
} );

const setState = ( data ) => ( {
    type: Strings.actividadeconomica_setState,
    payload: data,
} );

const onChange = ( data ) => ( {
    type: Strings.actividadeconomica_onChange,
    payload: data,
} );

const setCreate = ( data ) => ( {
    type:    Strings.actividadeconomica_onCreate,
    payload: data,
} );

const setEditar = ( data ) => ( {
    type:    Strings.actividadeconomica_onEditar,
    payload: data,
} );

const setShow = ( data ) => ( {
    type:    Strings.actividadeconomica_onShow,
    payload: data,
} );

const onFocus = ( ) => ( {
    type: Strings.actividadeconomica_onFocus,
} );

const offFocus = ( ) => ( {
    type: Strings.actividadeconomica_offFocus,
} );

const setImprimir = ( data ) => ( {
    type: Strings.actividadeconomica_setImprimir,
    payload: data,
} );

const initData = ( ) => {
    return async ( dispatch ) => {

        await dispatch( onFocus() );
        await dispatch( paginationActions.removePagination() );
        await dispatch( disabledActions.onLimpiar() );
        await dispatch( onLimpiar() );

        ActividadEconomicaServices.getData( ).then ( ( result ) => {
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
        ActividadEconomicaServices.getData( ).then ( async ( result ) => {
            if ( result.response == 1 ) {
                // dispatch( setDataCiudad(result.ciudad) );
            }
        } );
    };
};

const onChangePage = ( page ) => {
    return ( dispatch ) => {

        ActividadEconomicaServices.getData( page ).then ( async ( result ) => {
            if ( result.response == 1 ) {
                let obj = {
                    pagination: result.pagination,
                    pagina: page,
                };
                await dispatch( disabledActions.onAction() );
                await dispatch( paginationActions.setPagination( obj ) );
                await dispatch( setState( result.arrayActividadEconomica[0] ) );
            }
        } );

    };
};

const onCreate = ( ) => {
    return ( dispatch ) => {
        dispatch( setLoading() );

        ActividadEconomicaServices.onCreate().then( ( result ) => {
            if ( result.response == 1 ) {
                dispatch( setCreate( result ) );
                dispatch( disabledActions.onCreate() );
            }
        } ) . finally ( () => {
            dispatch( removeLoading() );
        } );
    };
};

const onGrabar = ( actividadeconomica ) => {
    return ( dispatch ) => {
        if ( !onValidate( actividadeconomica ) ) {
            dispatch( onChange( actividadeconomica ) );
            return;
        }
        dispatch( setLoading() );

        ActividadEconomicaServices.onGrabar( actividadeconomica ).then( (result) => {
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

const onEdit = ( idactividadeconomica ) => {
    return ( dispatch ) => {
        dispatch( onLoad() );

        ActividadEconomicaServices.onEdit( idactividadeconomica ).then( ( result ) => {
            if ( result.response == 1 ) {
                dispatch( setEditar( result ) );
            }
        } ) . finally ( () => {
            // dispatch( removeLoading() );
        } );
    };
};

const onEditar = ( actividadeconomica ) => {
    return ( dispatch ) => {
        dispatch( disabledActions.onEditar() );
        actividadeconomica.update = true;
        dispatch( onChange( actividadeconomica ) );
    };
};

const onUpdate = ( actividadeconomica ) => {
    return ( dispatch ) => {
        if ( !onValidate( actividadeconomica ) ) {
            dispatch( onChange( actividadeconomica ) );
            return;
        }
        dispatch( setLoading() );

        ActividadEconomicaServices.onUpdate( actividadeconomica ).then( (result) => {
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

const onShow = ( idactividadeconomica ) => {
    return ( dispatch ) => {
        dispatch( onLoad() );

        ActividadEconomicaServices.onShow( idactividadeconomica ).then( ( result ) => {
            if ( result.response == 1 ) {
                dispatch( setShow( result ) );
            }
        } ) . finally ( () => {
            // dispatch( removeLoading() );
        } );
    };
};

const onDelete = ( actividadeconomica ) => {
    return ( dispatch ) => {
        dispatch( setLoading() );

        ActividadEconomicaServices.onDelete( actividadeconomica ).then( (result) => {

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

const onSearchData = ( actividadeconomica ) => {
    return ( dispatch ) => {
        dispatch( setLoading() );

        ActividadEconomicaServices.onSearchData( actividadeconomica ).then( (result) => {
            if ( result.response == 1 ) {
                dispatch( disabledActions.onAction() );
                dispatch( setState( result.actividadEconomica ) );
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
        return await ActividadEconomicaServices.onImprimir().then( async (result) => {
            if ( result.response == 1 ) {
                await dispatch( setImprimir( result ) );
            }
            return result;
        } ) . finally ( () => {
            dispatch( removeLoading() );
        });
    };
};

function onValidate( actividadeconomica ) {
    const { abreviatura, codigo, descripcion } = actividadeconomica;
    let bandera = true;
    if ( descripcion.toString().trim().length === 0 ) {
        actividadeconomica.error.descripcion   = true;
        actividadeconomica.message.descripcion = "Campo requerido";
        bandera = false;
    }
    if ( abreviatura?.toString().length > 50 ) {
        actividadeconomica.error.abreviatura   = true;
        actividadeconomica.message.abreviatura = "Se permite máximo 50 caracteres";
        bandera = false;
    }
    if ( codigo?.toString().length > 150 ) {
        actividadeconomica.error.codigo   = true;
        actividadeconomica.message.codigo = "Se permite máximo 150 caracteres";
        bandera = false;
    }
    if ( !bandera ) {
        C_Message( "error", "Problemas al registrar" );
    }
    return bandera;
};

export const actividadEconomicaActions = {
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
