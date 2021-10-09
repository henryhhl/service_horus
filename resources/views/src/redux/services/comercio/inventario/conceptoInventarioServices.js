
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
    return httpRequest( 'get', webservices.wscomercioinventarioconceptoinventario_index + '?page=' + page, {
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
    
    return httpRequest( 'get', webservices.wscomercioinventarioconceptoinventario_create, {

    } ) . then ( ( result ) => {
        console.log( result )
        resultData( result );

        if ( result.response == 1 ) {
            C_Message( "success", "Servicio realizado exitosamente." );
        }
        return result;
    } );

};

const onGrabar = async ( conceptoinventario ) => {
    return httpRequest( "post", webservices.wscomercioinventarioconceptoinventario_store, {
        descripcion:  conceptoinventario.descripcion,
    } ) . then ( ( result ) => {
        resultData( result );
        
        if ( result.response == 0 ) {
            C_Message( "warning", result.message );
            var errors = result.errors;
            for (let index in errors) {
                conceptoinventario.error[index] = true;
                conceptoinventario.message[index] = errors[index][0];
            }
            result.resultData = conceptoinventario;
        }

        if ( result.response == 1 ) {
            C_Message( "success", result.message );
        }
        console.log(result)
        return result;
    } );
};

const onEdit = async ( idconceptoinventario ) => {
    return httpRequest( "get", webservices.wscomercioinventarioconceptoinventario_editar + "/" + idconceptoinventario, {
        idconceptoinventario: idconceptoinventario,
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

const onUpdate = async ( conceptoinventario ) => {
    return httpRequest( "post", webservices.wscomercioinventarioconceptoinventario_update, {
        idconceptoinventario: conceptoinventario.idconceptoinventario,
        descripcion:  conceptoinventario.descripcion,
    } ) . then ( ( result ) => {
        resultData( result );
        if ( result.response == 0 ) {
            C_Message( "warning", result.message );
            var errors = result.errors;
            for (let index in errors) {
                conceptoinventario.error[index] = true;
                conceptoinventario.message[index] = errors[index][0];
            }
            result.resultData = conceptoinventario;
        }
        if ( result.response == 1 ) {
            C_Message( "success", result.message );
        }
        console.log(result)
        return result;
    } );
};

const onDelete = async ( conceptoinventario ) => {
    return httpRequest( "post", webservices.wscomercioinventarioconceptoinventario_delete, {
        idconceptoinventario: conceptoinventario.idconceptoinventario,
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

const onShow = async ( idconceptoinventario ) => {
    return httpRequest( "get", webservices.wscomercioinventarioconceptoinventario_show + "/" + idconceptoinventario, {
        idconceptoinventario: idconceptoinventario,
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

const onSearchData = async ( conceptoinventario ) => {
    return httpRequest( 'get', webservices.wscomercioinventarioconceptoinventario_searchByID, {
        idconceptoinventario: conceptoinventario.idconceptoinventario
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
    return httpRequest( "post", webservices.wscomercioinventarioconceptoinventario_reporte, {
        
    } ) . then ( ( result ) => {
        resultData( result );
        if ( result.response == 1 ) {
            C_Message( "success", "Servicio realizado exitosamente." );
        }
        return result;
    } );
};

export const conceptoInventarioServices = {
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
