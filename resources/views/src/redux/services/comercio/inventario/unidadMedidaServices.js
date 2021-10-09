
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
    return httpRequest( 'get', webservices.wscomercioinventariounidadmedida_index + '?page=' + page, {
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
    
    return httpRequest( 'get', webservices.wscomercioinventariounidadmedida_create, {

    } ) . then ( ( result ) => {
        console.log( result )
        resultData( result );

        if ( result.response == 1 ) {
            C_Message( "success", "Servicio realizado exitosamente." );
        }
        return result;
    } );

};

const onGrabar = async ( unidadmedida ) => {
    return httpRequest( "post", webservices.wscomercioinventariounidadmedida_store, {
        descripcion: unidadmedida.descripcion,
        abreviatura: unidadmedida.abreviatura,
    } ) . then ( ( result ) => {
        resultData( result );
        
        if ( result.response == 0 ) {
            C_Message( "warning", result.message );
            var errors = result.errors;
            for (let index in errors) {
                unidadmedida.error[index] = true;
                unidadmedida.message[index] = errors[index][0];
            }
            result.resultData = unidadmedida;
        }

        if ( result.response == 1 ) {
            C_Message( "success", result.message );
        }
        console.log(result)
        return result;
    } );
};

const onUpdate = async ( unidadmedida ) => {
    return httpRequest( "post", webservices.wscomercioinventariounidadmedida_update, {
        idunidadmedida: unidadmedida.idunidadmedida,
        descripcion: unidadmedida.descripcion,
        abreviatura: unidadmedida.abreviatura,
    } ) . then ( ( result ) => {
        resultData( result );
        if ( result.response == 0 ) {
            C_Message( "warning", result.message );
            var errors = result.errors;
            for (let index in errors) {
                unidadmedida.error[index] = true;
                unidadmedida.message[index] = errors[index][0];
            }
            result.resultData = unidadmedida;
        }
        if ( result.response == 1 ) {
            C_Message( "success", result.message );
        }
        console.log(result)
        return result;
    } );
};

const onDelete = async ( unidadmedida ) => {
    return httpRequest( "post", webservices.wscomercioinventariounidadmedida_delete, {
        idunidadmedida: unidadmedida.idunidadmedida,
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

const onSearchData = async ( unidadmedida ) => {
    return httpRequest( 'get', webservices.wscomercioinventariounidadmedida_searchByID, {
        idunidadmedida: unidadmedida.idunidadmedida
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
    return httpRequest( "post", webservices.wscomercioinventariounidadmedida_reporte, {
        
    } ) . then ( ( result ) => {
        resultData( result );
        if ( result.response == 1 ) {
            C_Message( "success", "Servicio realizado exitosamente." );
        }
        return result;
    } );
};

export const unidadMedidaServices = {
    getData,

    onCreate,
    onGrabar,
    onUpdate,
    onDelete,
    onImprimir,

    onSearchData,

};
