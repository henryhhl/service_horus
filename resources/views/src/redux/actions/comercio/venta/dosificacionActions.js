
import { C_Message } from "../../../../components";

import { Strings } from "../../../constants";
import { DosificacionServices } from "../../../services/comercio/venta/dosificacionServices";

import { disabledActions } from "../../config/disabledActions";
import { removeLoading, setLoading } from "../../config/loadingActions";
import { paginationActions } from "../../config/paginationActions";

const onLimpiar = ( ) => ( {
    type: Strings.dosificacion_setLimpiar,
} );

const onLoad = ( ) => ( {
    type: Strings.dosificacion_setLoad,
} );

const setState = ( data ) => ( {
    type: Strings.dosificacion_setState,
    payload: data,
} );

const onChange = ( data ) => ( {
    type: Strings.dosificacion_onChange,
    payload: data,
} );

const setCreate = ( data ) => ( {
    type:    Strings.dosificacion_onCreate,
    payload: data,
} );

const setEditar = ( data ) => ( {
    type:    Strings.dosificacion_onEditar,
    payload: data,
} );

const setShow = ( data ) => ( {
    type:    Strings.dosificacion_onShow,
    payload: data,
} );

const onFocus = ( ) => ( {
    type: Strings.dosificacion_onFocus,
} );

const offFocus = ( ) => ( {
    type: Strings.dosificacion_offFocus,
} );

const setImprimir = ( data ) => ( {
    type: Strings.dosificacion_setImprimir,
    payload: data,
} );

const initData = ( ) => {
    return async ( dispatch ) => {

        await dispatch( onFocus() );
        await dispatch( paginationActions.removePagination() );
        await dispatch( disabledActions.onLimpiar() );
        await dispatch( onLimpiar() );

        DosificacionServices.getData( ).then ( ( result ) => {
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
        DosificacionServices.getData( ).then ( async ( result ) => {
            if ( result.response == 1 ) {
                // dispatch( setDataCiudad(result.ciudad) );
            }
        } );
    };
};

const onChangePage = ( page ) => {
    return ( dispatch ) => {

        DosificacionServices.getData( page ).then ( async ( result ) => {
            if ( result.response == 1 ) {
                let obj = {
                    pagination: result.pagination,
                    pagina: page,
                };
                await dispatch( disabledActions.onAction() );
                await dispatch( paginationActions.setPagination( obj ) );
                await dispatch( setState( result.arrayDosificacion[0] ) );
            }
        } );

    };
};

const onCreate = ( ) => {
    return ( dispatch ) => {
        dispatch( setLoading() );

        DosificacionServices.onCreate().then( ( result ) => {
            if ( result.response == 1 ) {
                dispatch( setCreate( result ) );
                dispatch( disabledActions.onCreate() );
            }
        } ) . finally ( () => {
            dispatch( removeLoading() );
        } );
    };
};

const onGrabar = ( dosificacion ) => {
    return ( dispatch ) => {
        if ( !onValidate( dosificacion ) ) {
            dispatch( onChange( dosificacion ) );
            return;
        }
        dispatch( setLoading() );

        DosificacionServices.onGrabar( dosificacion ).then( (result) => {
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

const onEdit = ( iddosificacion ) => {
    return ( dispatch ) => {
        dispatch( onLoad() );

        DosificacionServices.onEdit( iddosificacion ).then( ( result ) => {
            if ( result.response == 1 ) {
                dispatch( setEditar( result ) );
            }
        } ) . finally ( () => {
            // dispatch( removeLoading() );
        } );
    };
};

const onEditar = ( dosificacion ) => {
    return ( dispatch ) => {
        dispatch( disabledActions.onEditar() );
        dosificacion.update = true;
        dispatch( onChange( dosificacion ) );
    };
};

const onUpdate = ( dosificacion ) => {
    return ( dispatch ) => {
        if ( !onValidate( dosificacion ) ) {
            dispatch( onChange( dosificacion ) );
            return;
        }
        dispatch( setLoading() );

        DosificacionServices.onUpdate( dosificacion ).then( (result) => {
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

const onShow = ( iddosificacion ) => {
    return ( dispatch ) => {
        dispatch( onLoad() );

        DosificacionServices.onShow( iddosificacion ).then( ( result ) => {
            if ( result.response == 1 ) {
                dispatch( setShow( result ) );
            }
        } ) . finally ( () => {
            // dispatch( removeLoading() );
        } );
    };
};

const onDelete = ( dosificacion ) => {
    return ( dispatch ) => {
        dispatch( setLoading() );

        DosificacionServices.onDelete( dosificacion ).then( (result) => {

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

const onSearchData = ( dosificacion ) => {
    return ( dispatch ) => {
        dispatch( setLoading() );

        DosificacionServices.onSearchData( dosificacion ).then( (result) => {
            if ( result.response == 1 ) {
                dispatch( disabledActions.onAction() );
                dispatch( setState( result.dosificacion ) );
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
        return await DosificacionServices.onImprimir().then( async (result) => {
            if ( result.response == 1 ) {
                await dispatch( setImprimir( result ) );
            }
            return result;
        } ) . finally ( () => {
            dispatch( removeLoading() );
        });
    };
};

function onValidate( dosificacion ) {
    const { abreviatura, codigo, descripcion } = dosificacion;
    let bandera = true;
    if ( descripcion.toString().trim().length === 0 ) {
        dosificacion.error.descripcion   = true;
        dosificacion.message.descripcion = "Campo requerido";
        bandera = false;
    }
    if ( abreviatura?.toString().length > 50 ) {
        dosificacion.error.abreviatura   = true;
        dosificacion.message.abreviatura = "Se permite máximo 50 caracteres";
        bandera = false;
    }
    if ( codigo?.toString().length > 150 ) {
        dosificacion.error.codigo   = true;
        dosificacion.message.codigo = "Se permite máximo 150 caracteres";
        bandera = false;
    }
    if ( typeof dosificacion.fkidsucursal !== "number" ) {
        dosificacion.error.fkidsucursal   = true;
        dosificacion.message.fkidsucursal = "Campo requerido";
        bandera = false;
    }
    if ( typeof dosificacion.fkidactividadeconomica !== "number" ) {
        dosificacion.error.fkidactividadeconomica   = true;
        dosificacion.message.fkidactividadeconomica = "Campo requerido";
        bandera = false;
    }
    if ( dosificacion.tiposucursal.toString().trim().length === 0 ) {
        dosificacion.error.tiposucursal   = true;
        dosificacion.message.tiposucursal = "Campo requerido";
        bandera = false;
    }
    if ( dosificacion.tipodosificacion.toString().trim().length === 0 ) {
        dosificacion.error.tipodosificacion   = true;
        dosificacion.message.tipodosificacion = "Campo requerido";
        bandera = false;
    }
    if ( dosificacion.tipoempresa.toString().trim().length === 0 ) {
        dosificacion.error.tipoempresa   = true;
        dosificacion.message.tipoempresa = "Campo requerido";
        bandera = false;
    }
    if ( dosificacion.nit.toString().trim().length === 0 ) {
        dosificacion.error.nit   = true;
        dosificacion.message.nit = "Campo requerido";
        bandera = false;
    }
    if ( dosificacion.nroautorizacion.toString().trim().length === 0 ) {
        dosificacion.error.nroautorizacion   = true;
        dosificacion.message.nroautorizacion = "Campo requerido";
        bandera = false;
    }
    if ( dosificacion.llave.toString().trim().length === 0 ) {
        dosificacion.error.llave   = true;
        dosificacion.message.llave = "Campo requerido";
        bandera = false;
    }
    if ( dosificacion.lugaremision.toString().trim().length === 0 ) {
        dosificacion.error.lugaremision   = true;
        dosificacion.message.lugaremision = "Campo requerido";
        bandera = false;
    }
    if ( dosificacion.direccionfiscal.toString().trim().length === 0 ) {
        dosificacion.error.direccionfiscal   = true;
        dosificacion.message.direccionfiscal = "Campo requerido";
        bandera = false;
    }
    if ( dosificacion.telefonofiscal.toString().trim().length === 0 ) {
        dosificacion.error.telefonofiscal   = true;
        dosificacion.message.telefonofiscal = "Campo requerido";
        bandera = false;
    }
    if ( dosificacion.fechaactivacion.toString().trim().length === 0 ) {
        dosificacion.error.fechaactivacion   = true;
        dosificacion.message.fechaactivacion = "Campo requerido";
        bandera = false;
    }
    if ( dosificacion.fechalimiteemision.toString().trim().length === 0 ) {
        dosificacion.error.fechalimiteemision   = true;
        dosificacion.message.fechalimiteemision = "Campo requerido";
        bandera = false;
    }
    if ( typeof dosificacion.numfacturainicial !== "number" ) {
        dosificacion.error.numfacturainicial   = true;
        dosificacion.message.numfacturainicial = "Campo requerido";
        bandera = false;
    }
    if ( typeof dosificacion.numfacturasiguiente !== "number" ) {
        dosificacion.error.numfacturasiguiente   = true;
        dosificacion.message.numfacturasiguiente = "Campo requerido";
        bandera = false;
    }
    if ( parseInt( dosificacion.numfacturainicial ) > parseInt( dosificacion.numfacturasiguiente ) ) {
        dosificacion.error.numfacturainicial   = true;
        dosificacion.message.numfacturainicial = "Campo menor o igual a últimonro SFC.";
        bandera = false;
    }
    if ( typeof dosificacion.rangofacturainicial !== "number" ) {
        dosificacion.error.rangofacturainicial   = true;
        dosificacion.message.rangofacturainicial = "Campo requerido";
        bandera = false;
    }
    if ( typeof dosificacion.rangofacturafinal !== "number" ) {
        dosificacion.error.rangofacturafinal   = true;
        dosificacion.message.rangofacturafinal = "Campo requerido";
        bandera = false;
    }
    if ( parseInt( dosificacion.rangofacturainicial ) > parseInt( dosificacion.rangofacturafinal ) ) {
        dosificacion.error.numfacturainicial   = true;
        dosificacion.message.numfacturainicial = "Campo menor o igual a rango final.";
        bandera = false;
    }
    if ( !bandera ) {
        C_Message( "error", "Problemas al registrar" );
    }
    return bandera;
};

export const dosificacionActions = {
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
