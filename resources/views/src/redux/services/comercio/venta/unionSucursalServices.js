
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
    return httpRequest( 'get', webservices.wscomercioventaunionsucursal_index + '?page=' + page, {
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
    
    return httpRequest( 'get', webservices.wscomercioventaunionsucursal_create, {

    } ) . then ( ( result ) => {
        console.log( result )
        resultData( result );

        if ( result.response == 1 ) {
            C_Message( "success", "Servicio realizado exitosamente." );
        }
        return result;
    } );

};

const onGrabar = async ( unionsucursal ) => {
    return httpRequest( "post", webservices.wscomercioventaunionsucursal_store, {
        descripcion: unionsucursal.descripcion,
    } ) . then ( ( result ) => {
        resultData( result );
        
        if ( result.response == 0 ) {
            C_Message( "warning", result.message );
            var errors = result.errors;
            for (let index in errors) {
                unionsucursal.error[index] = true;
                unionsucursal.message[index] = errors[index][0];
            }
            result.resultData = unionsucursal;
        }

        if ( result.response == 1 ) {
            C_Message( "success", result.message );
        }
        console.log(result)
        return result;
    } );
};

const onEdit = async ( idunionsucursal ) => {
    return httpRequest( "get", webservices.wscomercioventaunionsucursal_editar + "/" + idunionsucursal, {
        idunionsucursal: idunionsucursal,
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

const onUpdate = async ( unionsucursal ) => {
    return httpRequest( "post", webservices.wscomercioventaunionsucursal_update, {
        idunionsucursal: unionsucursal.idunionsucursal,
        descripcion: unionsucursal.descripcion,
    } ) . then ( ( result ) => {
        resultData( result );
        if ( result.response == 0 ) {
            C_Message( "warning", result.message );
            var errors = result.errors;
            for (let index in errors) {
                unionsucursal.error[index] = true;
                unionsucursal.message[index] = errors[index][0];
            }
            result.resultData = unionsucursal;
        }
        if ( result.response == 1 ) {
            C_Message( "success", result.message );
        }
        console.log(result)
        return result;
    } );
};

const onDelete = async ( unionsucursal ) => {
    return httpRequest( "post", webservices.wscomercioventaunionsucursal_delete, {
        idunionsucursal: unionsucursal.idunionsucursal,
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

const onShow = async ( idunionsucursal ) => {
    return httpRequest( "get", webservices.wscomercioventaunionsucursal_show + "/" + idunionsucursal, {
        idunionsucursal: idunionsucursal,
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

const onSearchData = async ( unionsucursal ) => {
    return httpRequest( 'get', webservices.wscomercioventaunionsucursal_searchByID, {
        idunionsucursal: unionsucursal.idunionsucursal
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
    return httpRequest( "post", webservices.wscomercioventaunionsucursal_reporte, {
        
    } ) . then ( ( result ) => {
        resultData( result );
        if ( result.response == 1 ) {
            C_Message( "success", "Servicio realizado exitosamente." );
        }
        return result;
    } );
};

export const unionSucursalServices = {
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
