
import { C_Message } from "../../../../components";

import { httpRequest } from "../../../../utils/httpRequest";
import webservices from "../../../../utils/webservices";

function resultData( result ) {
    if ( result.response == -5 ) {
        C_Message( "error", "Problemas con la conexión al servidor." );
    }
    if ( result.response == -4 ) {
        C_Message( "error", "Hubo error al procesar la solicitud." );
    }
    if ( result.response == -1 ) {
        C_Message( "warning", result.message );
    }
};

const getData = async ( page = 1, nroPagination = 1, search = "" ) => {
    return httpRequest( 'get', webservices.wscomerciocompraproveedorcargo_index + '?page=' + page, {
        paginate: nroPagination,
        orderBy: 'asc',
        search: search,
    } ) . then ( ( result ) => {
        resultData( result );
        
        if ( result.response == 1 ) {
            C_Message( "success", "Servicio realizado exitosamente." );
        }
        return result;
    } );
};

const onCreate = async () => {
    
    return httpRequest( 'get', webservices.wscomerciocompraproveedorcargo_create, {

    } ) . then ( ( result ) => {
        console.log( result )
        resultData( result );

        if ( result.response == 1 ) {
            C_Message( "success", "Servicio realizado exitosamente." );
        }
        return result;
    } );

};

const onGrabar = async ( proveedorcargo ) => {
    return httpRequest( "post", webservices.wscomerciocompraproveedorcargo_store, {
        codigo:  proveedorcargo.codigo,
        abreviatura:  proveedorcargo.abreviatura,
        descripcion:  proveedorcargo.descripcion,
    } ) . then ( ( result ) => {
        resultData( result );
        
        if ( result.response == 0 ) {
            C_Message( "warning", result.message );
            var errors = result.errors;
            for (let index in errors) {
                proveedorcargo.error[index] = true;
                proveedorcargo.message[index] = errors[index][0];
            }
            result.resultData = proveedorcargo;
        }

        if ( result.response == 1 ) {
            C_Message( "success", result.message );
        }
        console.log(result)
        return result;
    } );
};

const onEdit = async ( idproveedorcargo ) => {
    return httpRequest( "get", webservices.wscomerciocompraproveedorcargo_editar + "/" + idproveedorcargo, {
        idproveedorcargo: idproveedorcargo,
    } ) . then ( ( result ) => {
        resultData( result );
        if ( result.response == 0 ) {
            C_Message( "warning", result.message );
        }
        if ( result.response == 1 ) {
            C_Message( "success", "Servicio realizado exitosamente." );
        }
        console.log(result)
        return result;
    } );
};

const onUpdate = async ( proveedorcargo ) => {
    return httpRequest( "post", webservices.wscomerciocompraproveedorcargo_update, {
        idproveedorcargo: proveedorcargo.idproveedorcargo,
        codigo:  proveedorcargo.codigo,
        abreviatura:  proveedorcargo.abreviatura,
        descripcion:  proveedorcargo.descripcion,
    } ) . then ( ( result ) => {
        resultData( result );
        if ( result.response == 0 ) {
            C_Message( "warning", result.message );
            var errors = result.errors;
            for (let index in errors) {
                proveedorcargo.error[index] = true;
                proveedorcargo.message[index] = errors[index][0];
            }
            result.resultData = proveedorcargo;
        }
        if ( result.response == 1 ) {
            C_Message( "success", result.message );
        }
        console.log(result)
        return result;
    } );
};

const onDelete = async ( proveedorcargo ) => {
    return httpRequest( "post", webservices.wscomerciocompraproveedorcargo_delete, {
        idproveedorcargo: proveedorcargo.idproveedorcargo,
    } ) . then ( ( result ) => {
        resultData( result );
        if ( result.response == 0 ) {
            C_Message( "warning", result.message );
        }
        if ( result.response == 1 ) {
            C_Message( "success", result.message );
        }
        console.log(result)
        return result;
    } );
};

const onShow = async ( idproveedorcargo ) => {
    return httpRequest( "get", webservices.wscomerciocompraproveedorcargo_show + "/" + idproveedorcargo, {
        idproveedorcargo: idproveedorcargo,
    } ) . then ( ( result ) => {
        resultData( result );
        if ( result.response == 0 ) {
            C_Message( "warning", result.message );
        }
        if ( result.response == 1 ) {
            C_Message( "success", "Servicio realizado exitosamente." );
        }
        console.log(result)
        return result;
    } );
};

const onSearchData = async ( proveedorcargo ) => {
    return httpRequest( 'get', webservices.wscomerciocompraproveedorcargo_searchByID, {
        idproveedorcargo: proveedorcargo.idproveedorcargo
    } ) . then( ( result ) => {
        resultData( result );

        if ( result.response == 0 ) {
            C_Message( "warning", result.message );
        }

        if ( result.response == 1 ) {
            C_Message( "success", "Servicio realizado exitosamente." );
        }
        console.log(result)
        return result;
    } );
};

const onImprimir = async () => {
    return httpRequest( "post", webservices.wscomerciocompraproveedorcargo_reporte, {
        
    } ) . then ( ( result ) => {
        resultData( result );
        if ( result.response == 1 ) {
            C_Message( "success", "Servicio realizado exitosamente." );
        }
        return result;
    } );
};

export const ProveedorCargoServices = {
    getData,

    onCreate,
    onEdit,
    onGrabar,
    onUpdate,
    onShow,
    onDelete,
    onImprimir,

    onSearchData,

};
