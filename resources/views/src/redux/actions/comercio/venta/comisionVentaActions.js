
import { C_Message } from "../../../../components";

import { Strings } from "../../../constants";
import { ComisionVentaServices } from "../../../services/comercio/venta/comisionVentaServices";

import { disabledActions } from "../../config/disabledActions";
import { removeLoading, setLoading } from "../../config/loadingActions";
import { paginationActions } from "../../config/paginationActions";

const onLimpiar = ( ) => ( {
    type: Strings.comisionventa_setLimpiar,
} );

const onLoad = ( ) => ( {
    type: Strings.comisionventa_setLoad,
} );

const setState = ( data ) => ( {
    type: Strings.comisionventa_setState,
    payload: data,
} );

const onChange = ( data ) => ( {
    type: Strings.comisionventa_onChange,
    payload: data,
} );

const setCreate = ( data ) => ( {
    type:    Strings.comisionventa_onCreate,
    payload: data,
} );

const setEditar = ( data ) => ( {
    type:    Strings.comisionventa_onEditar,
    payload: data,
} );

const setShow = ( data ) => ( {
    type:    Strings.comisionventa_onShow,
    payload: data,
} );

const onFocus = ( ) => ( {
    type: Strings.comisionventa_onFocus,
} );

const offFocus = ( ) => ( {
    type: Strings.comisionventa_offFocus,
} );

const setImprimir = ( data ) => ( {
    type: Strings.comisionventa_setImprimir,
    payload: data,
} );

const initData = ( ) => {
    return async ( dispatch ) => {

        await dispatch( onFocus() );
        await dispatch( paginationActions.removePagination() );
        await dispatch( disabledActions.onLimpiar() );
        await dispatch( onLimpiar() );

        ComisionVentaServices.getData( ).then ( ( result ) => {
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
        ComisionVentaServices.getData( ).then ( async ( result ) => {
            if ( result.response == 1 ) {
                // dispatch( setDataCiudad(result.ciudad) );
            }
        } );
    };
};

const onChangePage = ( page ) => {
    return ( dispatch ) => {

        ComisionVentaServices.getData( page ).then ( async ( result ) => {
            if ( result.response == 1 ) {
                let obj = {
                    pagination: result.pagination,
                    pagina: page,
                };
                await dispatch( disabledActions.onAction() );
                await dispatch( paginationActions.setPagination( obj ) );
                await dispatch( setState( result.arrayComisionVenta[0] ) );
            }
        } );

    };
};

const onCreate = ( ) => {
    return ( dispatch ) => {
        dispatch( setLoading() );

        ComisionVentaServices.onCreate().then( ( result ) => {
            if ( result.response == 1 ) {
                dispatch( setCreate( result ) );
                dispatch( disabledActions.onCreate() );
            }
        } ) . finally ( () => {
            dispatch( removeLoading() );
        } );
    };
};

const onGrabar = ( comisionventa ) => {
    return ( dispatch ) => {
        if ( !onValidate( comisionventa ) ) {
            dispatch( onChange( comisionventa ) );
            return;
        }
        dispatch( setLoading() );

        ComisionVentaServices.onGrabar( comisionventa ).then( (result) => {
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

const onEdit = ( idcomisionventa ) => {
    return ( dispatch ) => {
        dispatch( onLoad() );

        ComisionVentaServices.onEdit( idcomisionventa ).then( ( result ) => {
            if ( result.response == 1 ) {
                dispatch( setEditar( result ) );
            }
        } ) . finally ( () => {
            // dispatch( removeLoading() );
        } );
    };
};

const onEditar = ( comisionventa ) => {
    return ( dispatch ) => {
        dispatch( disabledActions.onEditar() );
        comisionventa.update = true;
        dispatch( onChange( comisionventa ) );
    };
};

const onUpdate = ( comisionventa ) => {
    return ( dispatch ) => {
        if ( !onValidate( comisionventa ) ) {
            dispatch( onChange( comisionventa ) );
            return;
        }
        dispatch( setLoading() );

        ComisionVentaServices.onUpdate( comisionventa ).then( (result) => {
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

const onShow = ( idcomisionventa ) => {
    return ( dispatch ) => {
        dispatch( onLoad() );

        ComisionVentaServices.onShow( idcomisionventa ).then( ( result ) => {
            if ( result.response == 1 ) {
                dispatch( setShow( result ) );
            }
        } ) . finally ( () => {
            // dispatch( removeLoading() );
        } );
    };
};

const onDelete = ( comisionventa ) => {
    return ( dispatch ) => {
        dispatch( setLoading() );

        ComisionVentaServices.onDelete( comisionventa ).then( (result) => {

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

const onSearchData = ( comisionventa ) => {
    return ( dispatch ) => {
        dispatch( setLoading() );

        ComisionVentaServices.onSearchData( comisionventa ).then( (result) => {
            if ( result.response == 1 ) {
                dispatch( disabledActions.onAction() );
                dispatch( setState( result.comisionventa ) );
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
        return await ComisionVentaServices.onImprimir().then( async (result) => {
            if ( result.response == 1 ) {
                await dispatch( setImprimir( result ) );
            }
            return result;
        } ) . finally ( () => {
            dispatch( removeLoading() );
        });
    };
};

function onValidate( comisionventa ) {
    let bandera = true;
    if ( comisionventa.descripcion.toString().trim().length === 0 ) {
        comisionventa.error.descripcion   = true;
        comisionventa.message.descripcion = "Campo requerido";
        bandera = false;
    }
    if ( comisionventa.descripcion.toString().length > 250 ) {
        comisionventa.error.descripcion   = true;
        comisionventa.message.descripcion = "Se permite máximo 250 caracteres";
        bandera = false;
    }
    if ( !bandera ) {
        C_Message( "error", "Problemas al registrar" );
    }
    return bandera;
};

export const comisionVentaActions = {
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
