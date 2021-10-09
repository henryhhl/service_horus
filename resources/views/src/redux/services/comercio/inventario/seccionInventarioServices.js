
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
    return httpRequest( 'get', webservices.wscomercioinventarioseccioninventario_index + '?page=' + page, {
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
    
    return httpRequest( 'get', webservices.wscomercioinventarioseccioninventario_create, {

    } ) . then ( ( result ) => {
        console.log( result )
        resultData( result );

        if ( result.response == 1 ) {
            C_Message( "success", "Servicio realizado exitosamente." );
        }
        return result;
    } );

};

const onGrabar = async ( seccioninventario ) => {
    return httpRequest( "post", webservices.wscomercioinventarioseccioninventario_store, {
        codigo:  seccioninventario.codigo,
        descripcion:  seccioninventario.descripcion,
    } ) . then ( ( result ) => {
        resultData( result );
        
        if ( result.response == 0 ) {
            C_Message( "warning", result.message );
            var errors = result.errors;
            for (let index in errors) {
                seccioninventario.error[index] = true;
                seccioninventario.message[index] = errors[index][0];
            }
            result.resultData = seccioninventario;
        }

        if ( result.response == 1 ) {
            C_Message( "success", result.message );
        }
        console.log(result)
        return result;
    } );
};

const onEdit = async ( idseccioninventario ) => {
    return httpRequest( "get", webservices.wscomercioinventarioseccioninventario_editar + "/" + idseccioninventario, {
        idseccioninventario: idseccioninventario,
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

const onUpdate = async ( seccioninventario ) => {
    return httpRequest( "post", webservices.wscomercioinventarioseccioninventario_update, {
        idseccioninventario: seccioninventario.idseccioninventario,
        codigo:  seccioninventario.codigo,
        descripcion:  seccioninventario.descripcion,
    } ) . then ( ( result ) => {
        resultData( result );
        if ( result.response == 0 ) {
            C_Message( "warning", result.message );
            var errors = result.errors;
            for (let index in errors) {
                seccioninventario.error[index] = true;
                seccioninventario.message[index] = errors[index][0];
            }
            result.resultData = seccioninventario;
        }
        if ( result.response == 1 ) {
            C_Message( "success", result.message );
        }
        console.log(result)
        return result;
    } );
};

const onDelete = async ( seccioninventario ) => {
    return httpRequest( "post", webservices.wscomercioinventarioseccioninventario_delete, {
        idseccioninventario: seccioninventario.idseccioninventario,
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

const onShow = async ( idseccioninventario ) => {
    return httpRequest( "get", webservices.wscomercioinventarioseccioninventario_show + "/" + idseccioninventario, {
        idseccioninventario: idseccioninventario,
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

const onSearchData = async ( seccioninventario ) => {
    return httpRequest( 'get', webservices.wscomercioinventarioseccioninventario_searchByID, {
        idseccioninventario: seccioninventario.idseccioninventario
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
    return httpRequest( "post", webservices.wscomercioinventarioseccioninventario_reporte, {
        
    } ) . then ( ( result ) => {
        resultData( result );
        if ( result.response == 1 ) {
            C_Message( "success", "Servicio realizado exitosamente." );
        }
        return result;
    } );
};

export const SeccionInventarioServices = {
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
