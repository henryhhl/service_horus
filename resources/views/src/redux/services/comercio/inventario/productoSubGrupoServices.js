
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
    return httpRequest( 'get', webservices.wscomercioinventarioproductosubgrupo_index + '?page=' + page, {
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
    
    return httpRequest( 'get', webservices.wscomercioinventarioproductosubgrupo_create, {

    } ) . then ( ( result ) => {
        console.log( result )
        resultData( result );

        if ( result.response == 1 ) {
            C_Message( "success", "Servicio realizado exitosamente." );
        }
        return result;
    } );

};

const onGrabar = async ( productosubgrupo ) => {
    return httpRequest( "post", webservices.wscomercioinventarioproductosubgrupo_store, {
        fkidproductogrupo: productosubgrupo.fkidproductogrupo,
        descripcion: productosubgrupo.descripcion,
        abreviatura: productosubgrupo.abreviatura,
    } ) . then ( ( result ) => {
        resultData( result );
        
        if ( result.response == 0 ) {
            C_Message( "warning", result.message );
            var errors = result.errors;
            for (let index in errors) {
                productosubgrupo.error[index] = true;
                productosubgrupo.message[index] = errors[index][0];
            }
            result.resultData = productosubgrupo;
        }

        if ( result.response == 1 ) {
            C_Message( "success", result.message );
        }
        console.log(result)
        return result;
    } );
};

const onUpdate = async ( productosubgrupo ) => {
    return httpRequest( "post", webservices.wscomercioinventarioproductosubgrupo_update, {
        idproductosubgrupo: productosubgrupo.idproductosubgrupo,
        fkidproductogrupo: productosubgrupo.fkidproductogrupo,
        descripcion: productosubgrupo.descripcion,
        abreviatura: productosubgrupo.abreviatura,
    } ) . then ( ( result ) => {
        resultData( result );
        if ( result.response == 0 ) {
            C_Message( "warning", result.message );
            var errors = result.errors;
            for (let index in errors) {
                productosubgrupo.error[index] = true;
                productosubgrupo.message[index] = errors[index][0];
            }
            result.resultData = productosubgrupo;
        }
        if ( result.response == 1 ) {
            C_Message( "success", result.message );
        }
        console.log(result)
        return result;
    } );
};

const onDelete = async ( productosubgrupo ) => {
    return httpRequest( "post", webservices.wscomercioinventarioproductosubgrupo_delete, {
        idproductosubgrupo: productosubgrupo.idproductosubgrupo,
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

const onSearchData = async ( productosubgrupo ) => {
    return httpRequest( 'get', webservices.wscomercioinventarioproductosubgrupo_searchByID, {
        idproductosubgrupo: productosubgrupo.idproductosubgrupo
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
    return httpRequest( "post", webservices.wscomercioinventarioproductosubgrupo_reporte, {
        
    } ) . then ( ( result ) => {
        resultData( result );
        if ( result.response == 1 ) {
            C_Message( "success", "Servicio realizado exitosamente." );
        }
        return result;
    } );
};

export const productoSubGrupoServices = {
    getData,

    onCreate,
    onGrabar,
    onUpdate,
    onDelete,
    onImprimir,

    onSearchData,

};
