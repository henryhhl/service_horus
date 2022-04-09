
import { C_Message } from "../../../../components";

import { httpRequest } from "../../../../utils/httpRequest";
import webservices from "../../../../utils/webservices";
import { Functions } from '../../../../utils/functions';

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
    return httpRequest( 'get', webservices.wscomercioventavendedor_index + '?page=' + page, {
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

    return httpRequest( 'get', webservices.wscomercioventavendedor_create, {

    } ) . then ( ( result ) => {
        console.log( result )
        resultData( result );

        if ( result.response == 1 ) {
            C_Message( "success", "Servicio realizado exitosamente." );
        }
        return result;
    } );

};

const onGrabar = async ( vendedor ) => {
    return httpRequest( "post", webservices.wscomercioventavendedor_store, {
        fkidciudadpais: vendedor.fkidciudadpais,
        fkidciudad: vendedor.fkidciudad,
        fkidcomisionventa: vendedor.fkidcomisionventa,
        codigo: vendedor.codigo,
        ci: vendedor.ci,
        nombre: vendedor.nombre,
        apellido: vendedor.apellido,
        direccion: vendedor.direccion,
        fax: vendedor.fax,
        telefono: vendedor.telefono,
        celular: vendedor.celular,
        email: vendedor.email,
        fechanacimiento: Functions.convertDMYToYMD(vendedor.fechanacimiento),
        genero: vendedor.genero,
        estadocivil: vendedor.estadocivil,
        imagen: vendedor.imagen,
        extension: vendedor.extension,
        estado: vendedor.estado,
    } ) . then ( ( result ) => {
        resultData( result );

        if ( result.response == 0 ) {
            C_Message( "warning", result.message );
            var errors = result.errors;
            for (let index in errors) {
                vendedor.error[index] = true;
                vendedor.message[index] = errors[index][0];
            }
            result.resultData = vendedor;
        }

        if ( result.response == 1 ) {
            C_Message( "success", result.message );
        }
        console.log(result)
        return result;
    } );
};

const onEdit = async ( idvendedor ) => {
    return httpRequest( "get", webservices.wscomercioventavendedor_editar + "/" + idvendedor, {
        idvendedor: idvendedor,
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

const onUpdate = async ( vendedor ) => {
    return httpRequest( "post", webservices.wscomercioventavendedor_update, {
        idvendedor: vendedor.idvendedor,
        fkidciudadpais: vendedor.fkidciudadpais,
        fkidciudad: vendedor.fkidciudad,
        fkidcomisionventa: vendedor.fkidcomisionventa,
        codigo: vendedor.codigo,
        ci: vendedor.ci,
        nombre: vendedor.nombre,
        apellido: vendedor.apellido,
        direccion: vendedor.direccion,
        fax: vendedor.fax,
        telefono: vendedor.telefono,
        celular: vendedor.celular,
        email: vendedor.email,
        fechanacimiento: Functions.convertDMYToYMD(vendedor.fechanacimiento),
        genero: vendedor.genero,
        estadocivil: vendedor.estadocivil,
        imagen: vendedor.imagen,
        extension: vendedor.extension,
        estado: vendedor.estado,
    } ) . then ( ( result ) => {
        resultData( result );
        if ( result.response == 0 ) {
            C_Message( "warning", result.message );
            var errors = result.errors;
            for (let index in errors) {
                vendedor.error[index] = true;
                vendedor.message[index] = errors[index][0];
            }
            result.resultData = vendedor;
        }
        if ( result.response == 1 ) {
            C_Message( "success", result.message );
        }
        console.log(result)
        return result;
    } );
};

const onDelete = async ( vendedor ) => {
    return httpRequest( "post", webservices.wscomercioventavendedor_delete, {
        idvendedor: vendedor.idvendedor,
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

const onShow = async ( idvendedor ) => {
    return httpRequest( "get", webservices.wscomercioventavendedor_show + "/" + idvendedor, {
        idvendedor: idvendedor,
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

const onSearchData = async ( vendedor ) => {
    return httpRequest( 'get', webservices.wscomercioventavendedor_searchByID, {
        idvendedor: vendedor.idvendedor
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
    return httpRequest( "post", webservices.wscomercioventavendedor_reporte, {

    } ) . then ( ( result ) => {
        resultData( result );
        if ( result.response == 1 ) {
            C_Message( "success", "Servicio realizado exitosamente." );
        }
        return result;
    } );
};

export const VendedorServices = {
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
