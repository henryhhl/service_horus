
import { C_Message } from "../../../../components";

import { Strings } from "../../../constants";
import { productoMarcaServices } from "../../../services/comercio/inventario/productoMarcaServices";

import { disabledActions } from "../../config/disabledActions";
import { removeLoading, setLoading } from "../../config/loadingActions";
import { paginationActions } from "../../config/paginationActions";

const onLimpiar = ( ) => ( {
    type: Strings.productomarca_setLimpiar,
} );

const setState = ( data ) => ( {
    type: Strings.productomarca_setState,
    payload: data,
} );

const onChange = ( data ) => ( {
    type: Strings.productomarca_onChange,
    payload: data,
} );

const setIDProductoMarca = ( idproductomarca ) => ( {
    type:    Strings.productomarca_onCreate,
    payload: idproductomarca,
} );

const onFocus = ( ) => ( {
    type: Strings.productomarca_onFocus,
} );

const offFocus = ( ) => ( {
    type: Strings.productomarca_offFocus,
} );

const setImprimir = ( data ) => ( {
    type: Strings.productomarca_setImprimir,
    payload: data,
} );

const initData = ( ) => {
    return async ( dispatch ) => {

        await dispatch( onFocus() );
        await dispatch( paginationActions.removePagination() );
        await dispatch( disabledActions.onLimpiar() );
        await dispatch( onLimpiar() );

        productoMarcaServices.getData( ).then ( ( result ) => {
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

        productoMarcaServices.getData( page ).then ( async ( result ) => {
            if ( result.response == 1 ) {
                let obj = {
                    pagination: result.pagination,
                    pagina: page,
                };
                await dispatch( disabledActions.onAction() );
                await dispatch( paginationActions.setPagination( obj ) );
                await dispatch( setState( result.productomarca[0] ) );
            }
        } );

    };
};

const onCreate = ( ) => {
    return ( dispatch ) => {
        dispatch( setLoading() );

        productoMarcaServices.onCreate().then( ( result ) => {
            if ( result.response == 1 ) {
                dispatch( setIDProductoMarca( result.idproductomarca ) );
                dispatch( disabledActions.onCreate() );
            }
        } ) . finally ( () => {
            dispatch( removeLoading() );
        } );
    };
};

const onGrabar = ( productomarca ) => {
    return ( dispatch ) => {
        if ( !onValidate( productomarca ) ) {
            dispatch( onChange( productomarca ) );
            return;
        }
        dispatch( setLoading() );

        productoMarcaServices.onGrabar( productomarca ).then( (result) => {
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

const onEditar = ( productomarca ) => {
    return ( dispatch ) => {
        dispatch( disabledActions.onEditar() );
        productomarca.update = true;
        dispatch( onChange( productomarca ) );
    };
};

const onUpdate = ( productomarca ) => {
    return ( dispatch ) => {
        if ( !onValidate( productomarca ) ) {
            dispatch( onChange( productomarca ) );
            return;
        }
        dispatch( setLoading() );

        productoMarcaServices.onUpdate( productomarca ).then( (result) => {
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

const onDelete = ( productomarca ) => {
    return ( dispatch ) => {
        dispatch( setLoading() );

        productoMarcaServices.onDelete( productomarca ).then( (result) => {

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

const onSearchData = ( productomarca ) => {
    return ( dispatch ) => {
        dispatch( setLoading() );

        productoMarcaServices.onSearchData( productomarca ).then( (result) => {
            if ( result.response == 1 ) {
                dispatch( disabledActions.onAction() );
                dispatch( setState( result.productomarca ) );
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
        return await productoMarcaServices.onImprimir().then( async (result) => {
            if ( result.response == 1 ) {
                await dispatch( setImprimir( result ) );
            }
            return result;
        } ) . finally ( () => {
            dispatch( removeLoading() );
        });
    };
};

function onValidate( productomarca ) {
    const { abreviatura, descripcion } = productomarca;
    let bandera = true;
    if ( descripcion.toString().trim().length === 0 ) {
        productomarca.error.descripcion   = true;
        productomarca.message.descripcion = "Campo requerido";
        bandera = false;
    }
    if ( descripcion.toString().length > 200 ) {
        productomarca.error.descripcion   = true;
        productomarca.message.descripcion = "Se permite máximo 200 caracteres";
        bandera = false;
    }
    if ( abreviatura?.toString().length > 50 ) {
        productomarca.error.abreviatura   = true;
        productomarca.message.abreviatura = "Se permite máximo 50 caracteres";
        bandera = false;
    }
    if ( !bandera ) {
        C_Message( "error", "Problemas al registrar" );
    }
    return bandera;
};

export const productoMarcaActions = {
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
