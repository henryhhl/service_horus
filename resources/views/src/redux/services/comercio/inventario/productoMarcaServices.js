
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
    return httpRequest( 'get', webservices.wscomercioinventarioproductomarca_index + '?page=' + page, {
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
    
    return httpRequest( 'get', webservices.wscomercioinventarioproductomarca_create, {

    } ) . then ( ( result ) => {
        console.log( result )
        resultData( result );

        if ( result.response == 1 ) {
            C_Message( "success", "Servicio realizado exitosamente." );
        }
        return result;
    } );

};

const onGrabar = async ( productomarca ) => {
    return httpRequest( "post", webservices.wscomercioinventarioproductomarca_store, {
        descripcion: productomarca.descripcion,
        abreviatura: productomarca.abreviatura,
    } ) . then ( ( result ) => {
        resultData( result );
        
        if ( result.response == 0 ) {
            C_Message( "warning", result.message );
            var errors = result.errors;
            for (let index in errors) {
                productomarca.error[index] = true;
                productomarca.message[index] = errors[index][0];
            }
            result.resultData = productomarca;
        }

        if ( result.response == 1 ) {
            C_Message( "success", result.message );
        }
        console.log(result)
        return result;
    } );
};

const onUpdate = async ( productomarca ) => {
    return httpRequest( "post", webservices.wscomercioinventarioproductomarca_update, {
        idproductomarca: productomarca.idproductomarca,
        descripcion: productomarca.descripcion,
        abreviatura: productomarca.abreviatura,
    } ) . then ( ( result ) => {
        resultData( result );
        if ( result.response == 0 ) {
            C_Message( "warning", result.message );
            var errors = result.errors;
            for (let index in errors) {
                productomarca.error[index] = true;
                productomarca.message[index] = errors[index][0];
            }
            result.resultData = productomarca;
        }
        if ( result.response == 1 ) {
            C_Message( "success", result.message );
        }
        console.log(result)
        return result;
    } );
};

const onDelete = async ( productomarca ) => {
    return httpRequest( "post", webservices.wscomercioinventarioproductomarca_delete, {
        idproductomarca: productomarca.idproductomarca,
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

const onSearchData = async ( productomarca ) => {
    return httpRequest( 'get', webservices.wscomercioinventarioproductomarca_searchByID, {
        idproductomarca: productomarca.idproductomarca
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
    return httpRequest( "post", webservices.wscomercioinventarioproductomarca_reporte, {
        
    } ) . then ( ( result ) => {
        resultData( result );
        if ( result.response == 1 ) {
            C_Message( "success", "Servicio realizado exitosamente." );
        }
        return result;
    } );
};

export const productoMarcaServices = {
    getData,

    onCreate,
    onGrabar,
    onUpdate,
    onDelete,
    onImprimir,

    onSearchData,

};
