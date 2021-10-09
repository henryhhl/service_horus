
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
    return httpRequest( 'get', webservices.wscomercioinventariociudad_index + '?page=' + page, {
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
    
    return httpRequest( 'get', webservices.wscomercioinventariociudad_create, {

    } ) . then ( ( result ) => {
        console.log( result )
        resultData( result );

        if ( result.response == 1 ) {
            C_Message( "success", "Servicio realizado exitosamente." );
        }
        return result;
    } );

};

const onGrabar = async ( ciudad ) => {
    return httpRequest( "post", webservices.wscomercioinventariociudad_store, {
        abreviatura: ciudad.abreviatura,
        descripcion: ciudad.descripcion,
        fkidciudadpadre: ciudad.fkidciudadpadre,
        fkidciudadclasificacion: ciudad.fkidciudadclasificacion,
    } ) . then ( ( result ) => {
        resultData( result );
        
        if ( result.response == 0 ) {
            C_Message( "warning", result.message );
            var errors = result.errors;
            for (let index in errors) {
                ciudad.error[index] = true;
                ciudad.message[index] = errors[index][0];
            }
            result.resultData = ciudad;
        }

        if ( result.response == 1 ) {
            C_Message( "success", result.message );
        }
        console.log(result)
        return result;
    } );
};

const onEdit = async ( idciudad ) => {
    return httpRequest( "get", webservices.wscomercioinventariociudad_editar + "/" + idciudad, {
        idciudad: idciudad,
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

const onUpdate = async ( ciudad ) => {
    return httpRequest( "post", webservices.wscomercioinventariociudad_update, {
        idciudad: ciudad.idciudad,
        abreviatura: ciudad.abreviatura,
        descripcion: ciudad.descripcion,
        fkidciudadpadre: ciudad.fkidciudadpadre,
        fkidciudadclasificacion: ciudad.fkidciudadclasificacion,
    } ) . then ( ( result ) => {
        resultData( result );
        if ( result.response == 0 ) {
            C_Message( "warning", result.message );
            var errors = result.errors;
            for (let index in errors) {
                ciudad.error[index] = true;
                ciudad.message[index] = errors[index][0];
            }
            result.resultData = ciudad;
        }
        if ( result.response == 1 ) {
            C_Message( "success", result.message );
        }
        console.log(result)
        return result;
    } );
};

const onDelete = async ( ciudad ) => {
    return httpRequest( "post", webservices.wscomercioinventariociudad_delete, {
        idciudad: ciudad.idciudad,
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

const onShow = async ( idciudad ) => {
    return httpRequest( "get", webservices.wscomercioinventariociudad_show + "/" + idciudad, {
        idciudad: idciudad,
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

const onSearchData = async ( ciudad ) => {
    return httpRequest( 'get', webservices.wscomercioinventariociudad_searchByID, {
        idciudad: ciudad.idciudad
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
    return httpRequest( "post", webservices.wscomercioinventariociudad_reporte, {
        
    } ) . then ( ( result ) => {
        resultData( result );
        if ( result.response == 1 ) {
            C_Message( "success", "Servicio realizado exitosamente." );
        }
        return result;
    } );
};

export const ciudadServices = {
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
