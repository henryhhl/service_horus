
import { C_Message } from "../../../../components";
import { Functions } from "../../../../utils/functions";

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
    return httpRequest( 'get', webservices.wscomercioventaactividadeconomica_index + '?page=' + page, {
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

    return httpRequest( 'get', webservices.wscomercioventaactividadeconomica_create, {

    } ) . then ( ( result ) => {
        console.log( result )
        resultData( result );

        if ( result.response == 1 ) {
            C_Message( "success", "Servicio realizado exitosamente." );
        }
        return result;
    } );

};

const onGrabar = async ( actividadeconomica ) => {
    return httpRequest( "post", webservices.wscomercioventaactividadeconomica_store, {
        descripcion: actividadeconomica.descripcion,
        abreviatura: actividadeconomica.abreviatura,
        codigo: actividadeconomica.codigo,
        estado: actividadeconomica.estado,
        imagen:  actividadeconomica.imagen,
        extension: actividadeconomica.extension,
    } ) . then ( ( result ) => {
        resultData( result );

        if ( result.response == 0 ) {
            C_Message( "warning", result.message );
            var errors = result.errors;
            for (let index in errors) {
                actividadeconomica.error[index] = true;
                actividadeconomica.message[index] = errors[index][0];
            }
            result.resultData = actividadeconomica;
        }

        if ( result.response == 1 ) {
            C_Message( "success", result.message );
        }
        console.log(result)
        return result;
    } );
};

const onEdit = async ( idactividadeconomica ) => {
    return httpRequest( "get", webservices.wscomercioventaactividadeconomica_editar + "/" + idactividadeconomica, {

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

const onUpdate = async ( actividadeconomica ) => {
    return httpRequest( "post", webservices.wscomercioventaactividadeconomica_update, {
        idactividadeconomica: actividadeconomica.idactividadeconomica,
        descripcion: actividadeconomica.descripcion,
        abreviatura: actividadeconomica.abreviatura,
        codigo: actividadeconomica.codigo,
        estado: actividadeconomica.estado,
        imagen:  actividadeconomica.imagen,
        extension: actividadeconomica.extension,
    } ) . then ( ( result ) => {
        resultData( result );
        if ( result.response == 0 ) {
            C_Message( "warning", result.message );
            var errors = result.errors;
            for (let index in errors) {
                actividadeconomica.error[index] = true;
                actividadeconomica.message[index] = errors[index][0];
            }
            result.resultData = actividadeconomica;
        }
        if ( result.response == 1 ) {
            C_Message( "success", result.message );
        }
        console.log(result)
        return result;
    } );
};

const onDelete = async ( actividadeconomica ) => {
    return httpRequest( "post", webservices.wscomercioventaactividadeconomica_delete, {
        idactividadeconomica: actividadeconomica.idactividadeconomica,
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

const onShow = async ( idactividadeconomica ) => {
    return httpRequest( "get", webservices.wscomercioventaactividadeconomica_show + "/" + idactividadeconomica, {

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

const onSearchData = async ( actividadeconomica ) => {
    return httpRequest( 'get', webservices.wscomercioventaactividadeconomica_searchByID, {
        idactividadeconomica: actividadeconomica.idactividadeconomica
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
    return httpRequest( "post", webservices.wscomercioventaactividadeconomica_reporte, {

    } ) . then ( ( result ) => {
        resultData( result );
        if ( result.response == 1 ) {
            C_Message( "success", "Servicio realizado exitosamente." );
        }
        return result;
    } );
};

export const ActividadEconomicaServices = {
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
