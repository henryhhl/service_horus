
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
    return httpRequest( 'get', webservices.wscomercioventacliente_index + '?page=' + page, {
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

    return httpRequest( 'get', webservices.wscomercioventacliente_create, {

    } ) . then ( ( result ) => {
        console.log( result )
        resultData( result );

        if ( result.response == 1 ) {
            C_Message( "success", "Servicio realizado exitosamente." );
        }
        return result;
    } );

};

const onGrabar = async ( cliente ) => {
    return httpRequest( "post", webservices.wscomercioventacliente_store, {
        fkidciudadpais: cliente.fkidciudadpais,
        fkidciudad: cliente.fkidciudad,
        fkidclientetipo: cliente.fkidclientetipo,
        fkidlistaprecio: cliente.fkidlistaprecio,
        fkidconceptoventa: cliente.fkidconceptoventa,
        fkidsucursal: cliente.fkidsucursal,

        codigo: cliente.codigo,
        nombre: cliente.nombre,
        apellido: cliente.apellido,
        razonsocial: cliente.razonsocial,

        nit: cliente.nit,
        email: cliente.email,
        casilla: cliente.casilla,
        fax: cliente.fax,
        telefono: cliente.telefono,
        celular: cliente.celular,
        contacto: cliente.contacto,
        direccion: cliente.direccion,

        diascredito: cliente.diascredito,
        limitecredito: cliente.limitecredito,

        descuento: cliente.descuento,
        cantidaditems: cliente.cantidaditems,
        descuentoxcantidaditems: cliente.descuentoxcantidaditems,
        descuentoinicial: cliente.descuentoinicial,
        descuentofinal: cliente.descuentofinal,

        montototaladeudado: cliente.montototaladeudado,
        fechaultimopago: cliente.fechaultimopago,
        montototaladeudadoultimopago: cliente.montototaladeudadoultimopago,
        fechaultimaventa: cliente.fechaultimaventa,
        montototalultimaventa: cliente.montototalultimaventa,

        tipopersoneria: cliente.tipopersoneria,
        imagen: cliente.imagen,
        extension: cliente.extension,
        estado: cliente.estado,
    } ) . then ( ( result ) => {
        resultData( result );

        if ( result.response == 0 ) {
            C_Message( "warning", result.message );
            var errors = result.errors;
            for (let index in errors) {
                cliente.error[index] = true;
                cliente.message[index] = errors[index][0];
            }
            result.resultData = cliente;
        }

        if ( result.response == 1 ) {
            C_Message( "success", result.message );
        }
        console.log(result)
        return result;
    } );
};

const onEdit = async ( idcliente ) => {
    return httpRequest( "get", webservices.wscomercioventacliente_editar + "/" + idcliente, {
        idcliente: idcliente,
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

const onUpdate = async ( cliente ) => {
    return httpRequest( "post", webservices.wscomercioventacliente_update, {
        idcliente: cliente.idcliente,
        fkidciudadpais: cliente.fkidciudadpais,
        fkidciudad: cliente.fkidciudad,
        fkidclientetipo: cliente.fkidclientetipo,
        fkidlistaprecio: cliente.fkidlistaprecio,
        fkidconceptoventa: cliente.fkidconceptoventa,
        fkidsucursal: cliente.fkidsucursal,

        codigo: cliente.codigo,
        nombre: cliente.nombre,
        apellido: cliente.apellido,
        razonsocial: cliente.razonsocial,

        nit: cliente.nit,
        email: cliente.email,
        casilla: cliente.casilla,
        fax: cliente.fax,
        telefono: cliente.telefono,
        celular: cliente.celular,
        contacto: cliente.contacto,
        direccion: cliente.direccion,

        diascredito: cliente.diascredito,
        limitecredito: cliente.limitecredito,

        descuento: cliente.descuento,
        cantidaditems: cliente.cantidaditems,
        descuentoxcantidaditems: cliente.descuentoxcantidaditems,
        descuentoinicial: cliente.descuentoinicial,
        descuentofinal: cliente.descuentofinal,

        montototaladeudado: cliente.montototaladeudado,
        fechaultimopago: cliente.fechaultimopago,
        montototaladeudadoultimopago: cliente.montototaladeudadoultimopago,
        fechaultimaventa: cliente.fechaultimaventa,
        montototalultimaventa: cliente.montototalultimaventa,

        tipopersoneria: cliente.tipopersoneria,
        imagen: cliente.imagen,
        extension: cliente.extension,
        estado: cliente.estado,
    } ) . then ( ( result ) => {
        resultData( result );
        if ( result.response == 0 ) {
            C_Message( "warning", result.message );
            var errors = result.errors;
            for (let index in errors) {
                cliente.error[index] = true;
                cliente.message[index] = errors[index][0];
            }
            result.resultData = cliente;
        }
        if ( result.response == 1 ) {
            C_Message( "success", result.message );
        }
        console.log(result)
        return result;
    } );
};

const onDelete = async ( cliente ) => {
    return httpRequest( "post", webservices.wscomercioventacliente_delete, {
        idcliente: cliente.idcliente,
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

const onShow = async ( idcliente ) => {
    return httpRequest( "get", webservices.wscomercioventacliente_show + "/" + idcliente, {
        idcliente: idcliente,
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

const onSearchData = async ( cliente ) => {
    return httpRequest( 'get', webservices.wscomercioventacliente_searchByID, {
        idcliente: cliente.idcliente
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
    return httpRequest( "post", webservices.wscomercioventacliente_reporte, {

    } ) . then ( ( result ) => {
        resultData( result );
        if ( result.response == 1 ) {
            C_Message( "success", "Servicio realizado exitosamente." );
        }
        return result;
    } );
};

export const ClienteServices = {
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
