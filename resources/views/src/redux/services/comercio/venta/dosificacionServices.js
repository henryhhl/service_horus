
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
    return httpRequest( 'get', webservices.wscomercioventadosificacion_index + '?page=' + page, {
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

    return httpRequest( 'get', webservices.wscomercioventadosificacion_create, {

    } ) . then ( ( result ) => {
        console.log( result )
        resultData( result );

        if ( result.response == 1 ) {
            C_Message( "success", "Servicio realizado exitosamente." );
        }
        return result;
    } );

};

const onGrabar = async ( dosificacion ) => {
    return httpRequest( "post", webservices.wscomercioventadosificacion_store, {
        codigo: dosificacion.codigo,
        abreviatura: dosificacion.abreviatura,
        descripcion: dosificacion.descripcion,
        fkidsucursal: dosificacion.fkidsucursal,
        fkidactividadeconomica: dosificacion.fkidactividadeconomica,
        tiposucursal: dosificacion.tiposucursal,
        tipodosificacion: dosificacion.tipodosificacion,
        tipoempresa: dosificacion.tipoempresa,
        nit: dosificacion.nit,
        nroautorizacion: dosificacion.nroautorizacion,
        llave: dosificacion.llave,
        lugaremision: dosificacion.lugaremision,
        direccionfiscal: dosificacion.direccionfiscal,
        telefonofiscal: dosificacion.telefonofiscal,
        numerocorrelativo: dosificacion.numerocorrelativo,
        numfacturainicial: dosificacion.numfacturainicial,
        numfacturasiguiente: dosificacion.numfacturasiguiente,
        rangofacturainicial: dosificacion.rangofacturainicial,
        rangofacturafinal: dosificacion.rangofacturafinal,
        fechaactivacion: Functions.convertDMYToYMD( dosificacion.fechaactivacion ),
        fechalimiteemision: Functions.convertDMYToYMD( dosificacion.fechalimiteemision ),
        estado: dosificacion.estado,
        imagen:  dosificacion.imagen,
        extension: dosificacion.extension,
    } ) . then ( ( result ) => {
        resultData( result );

        if ( result.response == 0 ) {
            C_Message( "warning", result.message );
            var errors = result.errors;
            for (let index in errors) {
                dosificacion.error[index] = true;
                dosificacion.message[index] = errors[index][0];
            }
            result.resultData = dosificacion;
        }

        if ( result.response == 1 ) {
            C_Message( "success", result.message );
        }
        console.log(result)
        return result;
    } );
};

const onEdit = async ( iddosificacion ) => {
    return httpRequest( "get", webservices.wscomercioventadosificacion_editar + "/" + iddosificacion, {

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

const onUpdate = async ( dosificacion ) => {
    return httpRequest( "post", webservices.wscomercioventadosificacion_update, {
        iddosificacion: dosificacion.iddosificacion,
        codigo: dosificacion.codigo,
        abreviatura: dosificacion.abreviatura,
        descripcion: dosificacion.descripcion,
        fkidsucursal: dosificacion.fkidsucursal,
        fkidactividadeconomica: dosificacion.fkidactividadeconomica,
        tiposucursal: dosificacion.tiposucursal,
        tipodosificacion: dosificacion.tipodosificacion,
        tipoempresa: dosificacion.tipoempresa,
        nit: dosificacion.nit,
        nroautorizacion: dosificacion.nroautorizacion,
        llave: dosificacion.llave,
        lugaremision: dosificacion.lugaremision,
        direccionfiscal: dosificacion.direccionfiscal,
        telefonofiscal: dosificacion.telefonofiscal,
        numerocorrelativo: dosificacion.numerocorrelativo,
        numfacturainicial: dosificacion.numfacturainicial,
        numfacturasiguiente: dosificacion.numfacturasiguiente,
        rangofacturainicial: dosificacion.rangofacturainicial,
        rangofacturafinal: dosificacion.rangofacturafinal,
        fechaactivacion: Functions.convertDMYToYMD( dosificacion.fechaactivacion ),
        fechalimiteemision: Functions.convertDMYToYMD( dosificacion.fechalimiteemision ),
        estado: dosificacion.estado,
        imagen:  dosificacion.imagen,
        extension: dosificacion.extension,
    } ) . then ( ( result ) => {
        resultData( result );
        if ( result.response == 0 ) {
            C_Message( "warning", result.message );
            var errors = result.errors;
            for (let index in errors) {
                dosificacion.error[index] = true;
                dosificacion.message[index] = errors[index][0];
            }
            result.resultData = dosificacion;
        }
        if ( result.response == 1 ) {
            C_Message( "success", result.message );
        }
        console.log(result)
        return result;
    } );
};

const onDelete = async ( dosificacion ) => {
    return httpRequest( "post", webservices.wscomercioventadosificacion_delete, {
        iddosificacion: dosificacion.iddosificacion,
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

const onShow = async ( iddosificacion ) => {
    return httpRequest( "get", webservices.wscomercioventadosificacion_show + "/" + iddosificacion, {

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

const onSearchData = async ( dosificacion ) => {
    return httpRequest( 'get', webservices.wscomercioventadosificacion_searchByID, {
        iddosificacion: dosificacion.iddosificacion
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
    return httpRequest( "post", webservices.wscomercioventadosificacion_reporte, {

    } ) . then ( ( result ) => {
        resultData( result );
        if ( result.response == 1 ) {
            C_Message( "success", "Servicio realizado exitosamente." );
        }
        return result;
    } );
};

export const DosificacionServices = {
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
