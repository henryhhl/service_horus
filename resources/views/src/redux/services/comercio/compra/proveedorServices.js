
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
    return httpRequest( 'get', webservices.wscomerciocompraproveedor_index + '?page=' + page, {
        paginate: nroPagination,
        orderBy: 'asc',
        search: search,
    } ) . then ( ( result ) => {
        resultData( result );
        console.log( result )
        if ( result.response == 1 ) {
            C_Message( "success", "Servicio realizado exitosamente." );
        }
        return result;
    } );
};

const onCreate = async () => {

    return httpRequest( 'get', webservices.wscomerciocompraproveedor_create, {

    } ) . then ( ( result ) => {
        console.log( result )
        resultData( result );

        if ( result.response == 1 ) {
            C_Message( "success", "Servicio realizado exitosamente." );
        }
        return result;
    } );

};

const onGrabar = async ( proveedor ) => {
    return httpRequest( "post", webservices.wscomerciocompraproveedor_store, {
        nombre:  proveedor.nombre,
        direccion:  proveedor.direccion,
        nit:  proveedor.nit,
        telefono:  proveedor.telefono,
        celular:  proveedor.celular,
        fax:  proveedor.fax,
        contacto:  proveedor.contacto,
        email:  proveedor.email,
        sitioweb:  proveedor.sitioweb,
        nroorden:  proveedor.nroorden,
        diascredito:  proveedor.diascredito,
        formadepago:  proveedor.formadepago,
        tipopersoneria:  proveedor.tipopersoneria,
        imagen:  proveedor.imagen,
        extension:  proveedor.extension,
        fechaalta:  Functions.convertDMYToYMD(proveedor.fechaalta),
        fechabaja:  Functions.convertDMYToYMD(proveedor.fechabaja),
        fkidciudad:  proveedor.fkidciudad,
        fkidciudadpais:  proveedor.fkidciudadpais,
        fkidproveedortipo:  proveedor.fkidproveedortipo,
        fkidproveedorgrupo:  proveedor.fkidproveedorgrupo,
        arrayProductoTipo: JSON.stringify(proveedor.arrayProductoTipo),
        arrayProveedorPersonal: JSON.stringify(proveedor.arrayProveedorPersonal),
        arrayProveedorProducto: JSON.stringify(proveedor.arrayProveedorProducto),
    } ) . then ( ( result ) => {
        resultData( result );

        if ( result.response == 0 ) {
            C_Message( "warning", result.message );
            var errors = result.errors;
            for (let index in errors) {
                proveedor.error[index] = true;
                proveedor.message[index] = errors[index][0];
            }
            result.resultData = proveedor;
        }

        if ( result.response == 1 ) {
            C_Message( "success", result.message );
        }
        console.log(result)
        return result;
    } );
};

const onEdit = async ( idproveedor ) => {
    return httpRequest( "get", webservices.wscomerciocompraproveedor_editar + "/" + idproveedor, {
        idproveedor: idproveedor,
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

const onUpdate = async ( proveedor ) => {
    return httpRequest( "post", webservices.wscomerciocompraproveedor_update, {
        idproveedor: proveedor.idproveedor,
        nombre:  proveedor.nombre,
        direccion:  proveedor.direccion,
        nit:  proveedor.nit,
        telefono:  proveedor.telefono,
        celular:  proveedor.celular,
        fax:  proveedor.fax,
        contacto:  proveedor.contacto,
        email:  proveedor.email,
        sitioweb:  proveedor.sitioweb,
        nroorden:  proveedor.nroorden,
        diascredito:  proveedor.diascredito,
        formadepago:  proveedor.formadepago,
        tipopersoneria:  proveedor.tipopersoneria,
        imagen:  proveedor.imagen,
        extension:  proveedor.extension,
        fechaalta:  Functions.convertDMYToYMD(proveedor.fechaalta),
        fechabaja:  Functions.convertDMYToYMD(proveedor.fechabaja),
        fkidciudad:  proveedor.fkidciudad,
        fkidciudadpais:  proveedor.fkidciudadpais,
        fkidproveedortipo:  proveedor.fkidproveedortipo,
        fkidproveedorgrupo:  proveedor.fkidproveedorgrupo,
        arrayProductoTipo: JSON.stringify(proveedor.arrayProductoTipo),
        arrayDeleteProductoTipo: JSON.stringify(proveedor.arrayDeleteProductoTipo),
        arrayProveedorPersonal: JSON.stringify(proveedor.arrayProveedorPersonal),
        arrayDeleteProveedorPersonal: JSON.stringify(proveedor.arrayDeleteProveedorPersonal),
        arrayProveedorProducto: JSON.stringify(proveedor.arrayProveedorProducto),
    } ) . then ( ( result ) => {
        resultData( result );
        if ( result.response == 0 ) {
            C_Message( "warning", result.message );
            var errors = result.errors;
            for (let index in errors) {
                proveedor.error[index] = true;
                proveedor.message[index] = errors[index][0];
            }
            result.resultData = proveedor;
        }
        if ( result.response == 1 ) {
            C_Message( "success", result.message );
        }
        console.log(result)
        return result;
    } );
};

const onDelete = async ( proveedor ) => {
    return httpRequest( "post", webservices.wscomerciocompraproveedor_delete, {
        idproveedor: proveedor.idproveedor,
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

const onShow = async ( idproveedor ) => {
    return httpRequest( "get", webservices.wscomerciocompraproveedor_show + "/" + idproveedor, {
        idproveedor: idproveedor,
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

const onSearchData = async ( proveedor ) => {
    return httpRequest( 'get', webservices.wscomerciocompraproveedor_searchByID, {
        idproveedor: proveedor.idproveedor
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
    return httpRequest( "post", webservices.wscomerciocompraproveedor_reporte, {

    } ) . then ( ( result ) => {
        resultData( result );
        if ( result.response == 1 ) {
            C_Message( "success", "Servicio realizado exitosamente." );
        }
        return result;
    } );
};

export const ProveedorServices = {
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
