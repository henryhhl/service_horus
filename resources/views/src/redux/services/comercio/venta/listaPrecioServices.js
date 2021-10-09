
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
    return httpRequest( 'get', webservices.wscomercioventalistaprecio_index + '?page=' + page, {
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
    
    return httpRequest( 'get', webservices.wscomercioventalistaprecio_create, {

    } ) . then ( ( result ) => {
        console.log( result )
        resultData( result );

        if ( result.response == 1 ) {
            C_Message( "success", "Servicio realizado exitosamente." );
        }
        return result;
    } );

};

const onGrabar = async ( listaprecio ) => {
    return httpRequest( "post", webservices.wscomercioventalistaprecio_store, {
        nombre:        listaprecio.nombre,
        abreviatura:   listaprecio.abreviatura,
        tipocambio:    listaprecio.tipocambio,
        fechainicio:   Functions.convertDMYToYMD(listaprecio.fechainicio),
        fechafinal:    Functions.convertDMYToYMD(listaprecio.fechafinal),
        nota:          listaprecio.nota,
        imagen:        listaprecio.imagen,
        extension:     listaprecio.extension,
    } ) . then ( ( result ) => {
        resultData( result );
        
        if ( result.response == 0 ) {
            C_Message( "warning", result.message );
            var errors = result.errors;
            for (let index in errors) {
                listaprecio.error[index] = true;
                listaprecio.message[index] = errors[index][0];
            }
            result.resultData = listaprecio;
        }

        if ( result.response == 1 ) {
            C_Message( "success", result.message );
        }
        console.log(result)
        return result;
    } );
};

const onEdit = async ( idlistaprecio ) => {
    return httpRequest( "get", webservices.wscomercioventalistaprecio_editar + "/" + idlistaprecio, {
        
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

const onUpdate = async ( listaprecio ) => {
    return httpRequest( "post", webservices.wscomercioventalistaprecio_update, {
        idlistaprecio: listaprecio.idlistaprecio,
        nombre:        listaprecio.nombre,
        abreviatura:   listaprecio.abreviatura,
        tipocambio:    listaprecio.tipocambio,
        fechainicio:   Functions.convertDMYToYMD(listaprecio.fechainicio),
        fechafinal:    Functions.convertDMYToYMD(listaprecio.fechafinal),
        nota:          listaprecio.nota,
        imagen:        listaprecio.imagen,
        extension:     listaprecio.extension,
    } ) . then ( ( result ) => {
        resultData( result );
        if ( result.response == 0 ) {
            C_Message( "warning", result.message );
            var errors = result.errors;
            for (let index in errors) {
                listaprecio.error[index] = true;
                listaprecio.message[index] = errors[index][0];
            }
            result.resultData = listaprecio;
        }
        if ( result.response == 1 ) {
            C_Message( "success", result.message );
        }
        console.log(result)
        return result;
    } );
};

const onDelete = async ( listaprecio ) => {
    return httpRequest( "post", webservices.wscomercioventalistaprecio_delete, {
        idlistaprecio: listaprecio.idlistaprecio,
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

const onShow = async ( idlistaprecio ) => {
    return httpRequest( "get", webservices.wscomercioventalistaprecio_show + "/" + idlistaprecio, {

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

const onSearchData = async ( listaprecio ) => {
    return httpRequest( 'get', webservices.wscomercioventalistaprecio_searchByID, {
        idlistaprecio: listaprecio.idlistaprecio
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
    return httpRequest( "post", webservices.wscomercioventalistaprecio_reporte, {
        
    } ) . then ( ( result ) => {
        resultData( result );
        if ( result.response == 1 ) {
            C_Message( "success", "Servicio realizado exitosamente." );
        }
        return result;
    } );
};

export const ListaPrecioServices = {
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
