
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
    return httpRequest( 'get', webservices.wscomercioinventariociudadclasificacion_index + '?page=' + page, {
        paginate: nroPagination,
        orderBy: 'asc',
        search: search,
    } ) . then ( ( result ) => {
        resultData( result );
        console.log(result)
        return result;
    } );
};

const onCreate = async () => {
    
    return httpRequest( 'get', webservices.wscomercioinventariociudadclasificacion_create, {

    } ) . then ( ( result ) => {
        console.log( result )
        resultData( result );

        if ( result.response == 1 ) {
            C_Message( "success", "Servicio realizado exitosamente." );
        }
        return result;
    } );

};

const onGrabar = async ( ciudadClasificacion ) => {
    return httpRequest( "post", webservices.wscomercioinventariociudadclasificacion_store, {
        descripcion: ciudadClasificacion.descripcion,
    } ) . then ( ( result ) => {
        resultData( result );
        
        if ( result.response == 0 ) {
            C_Message( "warning", result.message );
            var errors = result.errors;
            for (let index in errors) {
                ciudadClasificacion.error[index] = true;
                ciudadClasificacion.message[index] = errors[index][0];
            }
            result.resultData = ciudadClasificacion;
        }

        if ( result.response == 1 ) {
            C_Message( "success", result.message );
        }
        console.log(result)
        return result;
    } );
};

const onUpdate = async ( ciudadClasificacion ) => {
    return httpRequest( "post", webservices.wscomercioinventariociudadclasificacion_update, {
        idciudadclasificacion: ciudadClasificacion.idciudadclasificacion,
        descripcion: ciudadClasificacion.descripcion,
    } ) . then ( ( result ) => {
        resultData( result );
        if ( result.response == 0 ) {
            C_Message( "warning", result.message );
            var errors = result.errors;
            for (let index in errors) {
                ciudadClasificacion.error[index] = true;
                ciudadClasificacion.message[index] = errors[index][0];
            }
            result.resultData = ciudadClasificacion;
        }
        if ( result.response == 1 ) {
            C_Message( "success", result.message );
        }
        console.log(result)
        return result;
    } );
};

const onDelete = async ( ciudadClasificacion ) => {
    return httpRequest( "post", webservices.wscomercioinventariociudadclasificacion_delete, {
        idciudadclasificacion: ciudadClasificacion.idciudadclasificacion,
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

const onSearchData = async ( ciudadClasificacion ) => {
    return httpRequest( 'get', webservices.wscomercioinventariociudadclasificacion_searchByID, {
        idciudadclasificacion: ciudadClasificacion.idciudadclasificacion
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
    return httpRequest( "post", webservices.wscomercioinventariociudadclasificacion_reporte, {
        
    } ) . then ( ( result ) => {
        resultData( result );
        if ( result.response == 1 ) {
            C_Message( "success", "Servicio realizado exitosamente." );
        }
        return result;
    } );
};

export const ciudadClasificacionServices = {
    getData,

    onCreate,
    onGrabar,
    onUpdate,
    onDelete,
    onImprimir,

    onSearchData,

};
