
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
    return httpRequest( 'get', webservices.wscomercioventacomisionventa_index + '?page=' + page, {
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

    return httpRequest( 'get', webservices.wscomercioventacomisionventa_create, {

    } ) . then ( ( result ) => {
        console.log( result )
        resultData( result );

        if ( result.response == 1 ) {
            C_Message( "success", "Servicio realizado exitosamente." );
        }
        return result;
    } );

};

const onGrabar = async ( comisionventa ) => {
    return httpRequest( "post", webservices.wscomercioventacomisionventa_store, {
        codigo: comisionventa.codigo,
        descripcion: comisionventa.descripcion,
        valor: comisionventa.valor,
        imagen: comisionventa.imagen,
        extension: comisionventa.extension,
        estado: comisionventa.estado,
    } ) . then ( ( result ) => {
        resultData( result );

        if ( result.response == 0 ) {
            C_Message( "warning", result.message );
            var errors = result.errors;
            for (let index in errors) {
                comisionventa.error[index] = true;
                comisionventa.message[index] = errors[index][0];
            }
            result.resultData = comisionventa;
        }

        if ( result.response == 1 ) {
            C_Message( "success", result.message );
        }
        console.log(result)
        return result;
    } );
};

const onEdit = async ( idcomisionventa ) => {
    return httpRequest( "get", webservices.wscomercioventacomisionventa_editar + "/" + idcomisionventa, {
        idcomisionventa: idcomisionventa,
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

const onUpdate = async ( comisionventa ) => {
    return httpRequest( "post", webservices.wscomercioventacomisionventa_update, {
        idcomisionventa: comisionventa.idcomisionventa,
        codigo: comisionventa.codigo,
        descripcion: comisionventa.descripcion,
        valor: comisionventa.valor,
        imagen: comisionventa.imagen,
        extension: comisionventa.extension,
        estado: comisionventa.estado,
    } ) . then ( ( result ) => {
        resultData( result );
        if ( result.response == 0 ) {
            C_Message( "warning", result.message );
            var errors = result.errors;
            for (let index in errors) {
                comisionventa.error[index] = true;
                comisionventa.message[index] = errors[index][0];
            }
            result.resultData = comisionventa;
        }
        if ( result.response == 1 ) {
            C_Message( "success", result.message );
        }
        console.log(result)
        return result;
    } );
};

const onDelete = async ( comisionventa ) => {
    return httpRequest( "post", webservices.wscomercioventacomisionventa_delete, {
        idcomisionventa: comisionventa.idcomisionventa,
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

const onShow = async ( idcomisionventa ) => {
    return httpRequest( "get", webservices.wscomercioventacomisionventa_show + "/" + idcomisionventa, {
        idcomisionventa: idcomisionventa,
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

const onSearchData = async ( comisionventa ) => {
    return httpRequest( 'get', webservices.wscomercioventacomisionventa_searchByID, {
        idcomisionventa: comisionventa.idcomisionventa
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
    return httpRequest( "post", webservices.wscomercioventacomisionventa_reporte, {

    } ) . then ( ( result ) => {
        resultData( result );
        if ( result.response == 1 ) {
            C_Message( "success", "Servicio realizado exitosamente." );
        }
        return result;
    } );
};

export const ComisionVentaServices = {
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
