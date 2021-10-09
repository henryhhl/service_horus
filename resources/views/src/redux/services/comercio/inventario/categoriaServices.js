
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
    return httpRequest( 'get', webservices.wscomercioinventariocategoria_index + '?page=' + page, {
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
    
    return httpRequest( 'get', webservices.wscomercioinventariocategoria_create, {

    } ) . then ( ( result ) => {
        console.log( result )
        resultData( result );

        if ( result.response == 1 ) {
            C_Message( "success", "Servicio realizado exitosamente." );
        }
        return result;
    } );

};

const onGrabar = async ( categoria ) => {
    return httpRequest( "post", webservices.wscomercioinventariocategoria_store, {
        descripcion: categoria.descripcion,
        abreviatura: categoria.abreviatura,
        imagen:      categoria.imagen,
        extension:   categoria.extension,
        fkidcategoriapadre: categoria.fkidcategoriapadre,
    } ) . then ( ( result ) => {
        resultData( result );
        
        if ( result.response == 0 ) {
            C_Message( "warning", result.message );
            var errors = result.errors;
            for (let index in errors) {
                categoria.error[index] = true;
                categoria.message[index] = errors[index][0];
            }
            result.resultData = categoria;
        }

        if ( result.response == 1 ) {
            C_Message( "success", result.message );
        }
        console.log(result)
        return result;
    } );
};

const onUpdate = async ( categoria ) => {
    return httpRequest( "post", webservices.wscomercioinventariocategoria_update, {
        idcategoria: categoria.idcategoria,
        descripcion: categoria.descripcion,
        abreviatura: categoria.abreviatura,
        imagen:      categoria.imagen,
        extension:   categoria.extension,
        fkidcategoriapadre: categoria.fkidcategoriapadre,
    } ) . then ( ( result ) => {
        resultData( result );
        if ( result.response == 0 ) {
            C_Message( "warning", result.message );
            var errors = result.errors;
            for (let index in errors) {
                categoria.error[index] = true;
                categoria.message[index] = errors[index][0];
            }
            result.resultData = categoria;
        }
        if ( result.response == 1 ) {
            C_Message( "success", result.message );
        }
        console.log(result)
        return result;
    } );
};

const onDelete = async ( categoria ) => {
    return httpRequest( "post", webservices.wscomercioinventariocategoria_delete, {
        idcategoria: categoria.idcategoria,
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

const onSearchData = async ( categoria ) => {
    return httpRequest( 'get', webservices.wscomercioinventariocategoria_searchByID, {
        idcategoria: categoria.idcategoria
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
    return httpRequest( "post", webservices.wscomercioinventariocategoria_reporte, {
        
    } ) . then ( ( result ) => {
        resultData( result );
        if ( result.response == 1 ) {
            C_Message( "success", "Servicio realizado exitosamente." );
        }
        return result;
    } );
};

export const categoriaServices = {
    getData,

    onCreate,
    onGrabar,
    onUpdate,
    onDelete,
    onImprimir,

    onSearchData,

};
