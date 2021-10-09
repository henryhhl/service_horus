
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
    return httpRequest( 'get', webservices.wscomercioinventarioproductotipo_index + '?page=' + page, {
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
    
    return httpRequest( 'get', webservices.wscomercioinventarioproductotipo_create, {

    } ) . then ( ( result ) => {
        console.log( result )
        resultData( result );

        if ( result.response == 1 ) {
            C_Message( "success", "Servicio realizado exitosamente." );
        }
        return result;
    } );

};

const onGrabar = async ( productotipo ) => {
    return httpRequest( "post", webservices.wscomercioinventarioproductotipo_store, {
        descripcion: productotipo.descripcion,
        abreviatura: productotipo.abreviatura,
    } ) . then ( ( result ) => {
        resultData( result );
        
        if ( result.response == 0 ) {
            C_Message( "warning", result.message );
            var errors = result.errors;
            for (let index in errors) {
                productotipo.error[index] = true;
                productotipo.message[index] = errors[index][0];
            }
            result.resultData = productotipo;
        }

        if ( result.response == 1 ) {
            C_Message( "success", result.message );
        }
        console.log(result)
        return result;
    } );
};

const onUpdate = async ( productotipo ) => {
    return httpRequest( "post", webservices.wscomercioinventarioproductotipo_update, {
        idproductotipo: productotipo.idproductotipo,
        descripcion: productotipo.descripcion,
        abreviatura: productotipo.abreviatura,
    } ) . then ( ( result ) => {
        resultData( result );
        if ( result.response == 0 ) {
            C_Message( "warning", result.message );
            var errors = result.errors;
            for (let index in errors) {
                productotipo.error[index] = true;
                productotipo.message[index] = errors[index][0];
            }
            result.resultData = productotipo;
        }
        if ( result.response == 1 ) {
            C_Message( "success", result.message );
        }
        console.log(result)
        return result;
    } );
};

const onDelete = async ( productotipo ) => {
    return httpRequest( "post", webservices.wscomercioinventarioproductotipo_delete, {
        idproductotipo: productotipo.idproductotipo,
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

const onSearchData = async ( productotipo ) => {
    return httpRequest( 'get', webservices.wscomercioinventarioproductotipo_searchByID, {
        idproductotipo: productotipo.idproductotipo
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
    return httpRequest( "post", webservices.wscomercioinventarioproductotipo_reporte, {
        
    } ) . then ( ( result ) => {
        resultData( result );
        if ( result.response == 1 ) {
            C_Message( "success", "Servicio realizado exitosamente." );
        }
        return result;
    } );
};

export const productoTipoServices = {
    getData,

    onCreate,
    onGrabar,
    onUpdate,
    onDelete,
    onImprimir,

    onSearchData,

};
