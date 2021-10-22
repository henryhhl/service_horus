
import { C_Message } from "../../../../components";

import { Strings } from "../../../constants";
import { ProveedorServices } from "../../../services/comercio/compra/proveedorServices";

import { disabledActions } from "../../config/disabledActions";
import { removeLoading, setLoading } from "../../config/loadingActions";
import { paginationActions } from "../../config/paginationActions";

const onLimpiar = ( ) => ( {
    type: Strings.proveedor_setLimpiar,
} );

const onLoad = ( ) => ( {
    type: Strings.proveedor_setLoad,
} );

const setState = ( data ) => ( {
    type: Strings.proveedor_setState,
    payload: data,
} );

const onChange = ( data ) => ( {
    type: Strings.proveedor_onChange,
    payload: data,
} );

const setCreate = ( data ) => ( {
    type:    Strings.proveedor_onCreate,
    payload: data,
} );

const setEditar = ( data ) => ( {
    type:    Strings.proveedor_onEditar,
    payload: data,
} );

const setShow = ( data ) => ( {
    type:    Strings.proveedor_onShow,
    payload: data,
} );

const onFocus = ( ) => ( {
    type: Strings.proveedor_onFocus,
} );

const offFocus = ( ) => ( {
    type: Strings.proveedor_offFocus,
} );

const setImprimir = ( data ) => ( {
    type: Strings.proveedor_setImprimir,
    payload: data,
} );

const initData = ( ) => {
    return async ( dispatch ) => {

        await dispatch( onFocus() );
        await dispatch( paginationActions.removePagination() );
        await dispatch( disabledActions.onLimpiar() );
        await dispatch( onLimpiar() );

        ProveedorServices.getData( ).then ( ( result ) => {
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
        ProveedorServices.getData( ).then ( async ( result ) => {
            if ( result.response == 1 ) {
                // dispatch( setDataCiudad(result.ciudad) );
            }
        } );
    };
};

const onChangePage = ( page ) => {
    return ( dispatch ) => {

        ProveedorServices.getData( page ).then ( async ( result ) => {
            if ( result.response == 1 ) {
                let obj = {
                    pagination: result.pagination,
                    pagina: page,
                };
                await dispatch( disabledActions.onAction() );
                await dispatch( paginationActions.setPagination( obj ) );
                await dispatch( setState( result.proveedor[0] ) );
            }
        } );

    };
};

const onCreate = ( ) => {
    return ( dispatch ) => {
        dispatch( setLoading() );

        ProveedorServices.onCreate().then( ( result ) => {
            if ( result.response == 1 ) {
                dispatch( setCreate( result ) );
                dispatch( disabledActions.onCreate() );
            }
        } ) . finally ( () => {
            dispatch( removeLoading() );
        } );
    };
};

const onGrabar = ( proveedor ) => {
    return ( dispatch ) => {
        if ( !onValidate( proveedor ) ) {
            dispatch( onChange( proveedor ) );
            return;
        }
        dispatch( setLoading() );

        ProveedorServices.onGrabar( proveedor ).then( (result) => {
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

const onEdit = ( idproveedor ) => {
    return ( dispatch ) => {
        dispatch( onLoad() );

        ProveedorServices.onEdit( idproveedor ).then( ( result ) => {
            if ( result.response == 1 ) {
                dispatch( setEditar( result ) );
            }
        } ) . finally ( () => {
            // dispatch( removeLoading() );
        } );
    };
};

const onEditar = ( proveedor ) => {
    return ( dispatch ) => {
        dispatch( disabledActions.onEditar() );
        proveedor.update = true;
        dispatch( onChange( proveedor ) );
    };
};

const onUpdate = ( proveedor ) => {
    return ( dispatch ) => {
        if ( !onValidate( proveedor ) ) {
            dispatch( onChange( proveedor ) );
            return;
        }
        dispatch( setLoading() );

        ProveedorServices.onUpdate( proveedor ).then( (result) => {
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

const onShow = ( idproveedor ) => {
    return ( dispatch ) => {
        dispatch( onLoad() );

        ProveedorServices.onShow( idproveedor ).then( ( result ) => {
            if ( result.response == 1 ) {
                dispatch( setShow( result ) );
            }
        } ) . finally ( () => {
            // dispatch( removeLoading() );
        } );
    };
};

const onDelete = ( proveedor ) => {
    return ( dispatch ) => {
        dispatch( setLoading() );

        ProveedorServices.onDelete( proveedor ).then( (result) => {

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

const onSearchData = ( proveedor ) => {
    return ( dispatch ) => {
        dispatch( setLoading() );

        ProveedorServices.onSearchData( proveedor ).then( (result) => {
            if ( result.response == 1 ) {
                dispatch( disabledActions.onAction() );
                dispatch( setState( result.proveedor ) );
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
        return await ProveedorServices.onImprimir().then( async (result) => {
            if ( result.response == 1 ) {
                await dispatch( setImprimir( result ) );
            }
            return result;
        } ) . finally ( () => {
            dispatch( removeLoading() );
        });
    };
};

function onValidate( proveedor ) {
    const { nombre } = proveedor;
    let bandera = true;
    if ( nombre.toString().trim().length === 0 ) {
        proveedor.error.nombre   = true;
        proveedor.message.nombre = "Campo requerido";
        bandera = false;
    }
    if ( nombre.toString().length > 250 ) {
        proveedor.error.nombre   = true;
        proveedor.message.nombre = "Se permite máximo 200 caracteres";
        bandera = false;
    }
    if ( typeof proveedor.fkidciudad !== "number" ) {
        proveedor.error.fkidciudad   = true;
        proveedor.message.fkidciudad = "Campo requerido";
        bandera = false;
    }
    if ( typeof proveedor.fkidciudadpais !== "number" ) {
        proveedor.error.fkidciudadpais   = true;
        proveedor.message.fkidciudadpais = "Campo requerido";
        bandera = false;
    }
    if ( typeof proveedor.fkidproveedortipo !== "number" ) {
        proveedor.error.fkidproveedortipo   = true;
        proveedor.message.fkidproveedortipo = "Campo requerido";
        bandera = false;
    }
    if ( typeof proveedor.fkidproveedorgrupo !== "number" ) {
        proveedor.error.fkidproveedorgrupo   = true;
        proveedor.message.fkidproveedorgrupo = "Campo requerido";
        bandera = false;
    }
    if ( proveedor.direccion?.toString().length > 250 ) {
        proveedor.error.direccion   = true;
        proveedor.message.direccion = "Se permite máximo 250 caracteres";
        bandera = false;
    }
    if ( proveedor.nit?.toString().length > 200 ) {
        proveedor.error.nit   = true;
        proveedor.message.nit = "Se permite máximo 200 caracteres";
        bandera = false;
    }
    if ( proveedor.email?.toString().length > 0 ) {
        if ( proveedor.email.toString().length > 300 ) {
            proveedor.error.email   = true;
            proveedor.message.email = "Se permite máximo 300 caracteres";
            bandera = false;
        }
        if ( proveedor.email.toString().length <= 300 ) {
            let email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if ( !email.test( proveedor.email ) ) {
                proveedor.error.email   = true;
                proveedor.message.email = "Email incorrecto";
                bandera = false;
            }
        }
    }

    for (let index = 0; index < proveedor.arrayProveedorPersonal.length; index++) {
        const element = proveedor.arrayProveedorPersonal[index];

        element.error.nombre = false;
        element.message.nombre = "";

        element.error.apellido = false;
        element.message.apellido = "";

        element.error.fkidproveedorcargo = false;
        element.message.fkidproveedorcargo = "";

        if ( element.fkidproveedorcargo != null ) {
            if ( element.nombre == "" ) {
                element.error.nombre = true;
                element.message.nombre = "Campo requerido";
                bandera = false;
            }
            if ( element.apellido == "" ) {
                element.error.apellido = true;
                element.message.apellido = "Campo requerido";
                bandera = false;
            }
        }
        if ( element.nombre != "" ) {
            if ( element.apellido == "" ) {
                element.error.apellido = true;
                element.message.apellido = "Campo requerido";
                bandera = false;
            }
            if ( element.fkidproveedorcargo == null ) {
                element.error.fkidproveedorcargo = true;
                element.message.fkidproveedorcargo = "Campo requerido";
                bandera = false;
            }
        }
        if ( element.apellido != "" ) {
            if ( element.nombre == "" ) {
                element.error.nombre = true;
                element.message.nombre = "Campo requerido";
                bandera = false;
            }
            if ( element.fkidproveedorcargo == null ) {
                element.error.fkidproveedorcargo = true;
                element.message.fkidproveedorcargo = "Campo requerido";
                bandera = false;
            }
        }
    }

    if ( !bandera ) {
        C_Message( "error", "Problemas al registrar" );
    }
    return bandera;
};

export const proveedorActions = {
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
