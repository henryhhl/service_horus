
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
    return httpRequest( 'get', webservices.wscomercioventadevolucionnotaventa_index + '?page=' + page, {
        paginate: nroPagination,
        orderBy: 'asc',
        search: search,
    } ) . then ( ( result ) => {
        console.log(result)
        resultData( result );

        if ( result.response == 1 ) {
            C_Message( "success", "Servicio realizado exitosamente." );
        }
        return result;
    } );
};

const onCreate = async () => {

    return httpRequest( 'get', webservices.wscomercioventadevolucionnotaventa_create, {

    } ) . then ( ( result ) => {
        console.log( result )
        resultData( result );

        if ( result.response == 1 ) {
            C_Message( "success", "Servicio realizado exitosamente." );
        }
        return result;
    } );

};

const onGrabar = async ( devolucionnotaventa ) => {
    return httpRequest( "post", webservices.wscomercioventadevolucionnotaventa_store, {
        codigo: devolucionnotaventa.codigo,
        tiponotaventa: devolucionnotaventa.tiponotaventa,
        fechadevolucionnotaventa: Functions.convertDMYToYMD( devolucionnotaventa.fechadevolucionnotaventa ),
        fechanotaventa: Functions.convertDMYToYMD( devolucionnotaventa.fechanotaventa ),

        fkidnotaventa: devolucionnotaventa.fkidsucursal,
        fkidsucursal: devolucionnotaventa.fkidsucursal,
        fkidalmacen: devolucionnotaventa.fkidalmacen,
        fkidvendedor: devolucionnotaventa.fkidvendedor,
        fkidcliente: devolucionnotaventa.fkidcliente,
        fkidlistaprecio: devolucionnotaventa.fkidlistaprecio,
        fkidconceptoventa: devolucionnotaventa.fkidconceptoventa,
        fkidmoneda: devolucionnotaventa.fkidmoneda,
        fkidusers: devolucionnotaventa.fkidusers,
        fkidtipotransaccion: devolucionnotaventa.fkidtipotransaccion,
        fkidtipopago: devolucionnotaventa.fkidtipopago,

        tipocambio: devolucionnotaventa.tipocambio,
        nrofactura: devolucionnotaventa.nrofactura,
        razonsocial: devolucionnotaventa.razonsocial,
        nit: devolucionnotaventa.nit,
        glosa: devolucionnotaventa.glosa,
        esnotadevolucion: devolucionnotaventa.esnotadevolucion,

        montosubtotal: devolucionnotaventa.montosubtotal,
        descuento: devolucionnotaventa.descuento,
        montodescuento: devolucionnotaventa.montodescuento,
        montototal: devolucionnotaventa.montototal,
        cantidadtotal: devolucionnotaventa.cantidadtotal,

        arraydevolucionnotaventadetalle: JSON.stringify( devolucionnotaventa.devolucionnotaventadetalle ),

        estado: devolucionnotaventa.estado,
    } ) . then ( ( result ) => {
        console.log(devolucionnotaventa)
        console.log(result)
        resultData( result );

        if ( result.response == 0 ) {
            C_Message( "warning", result.message );
            var errors = result.errors;
            for (let index in errors) {
                devolucionnotaventa.error[index] = true;
                devolucionnotaventa.message[index] = errors[index][0];
            }
            result.resultData = devolucionnotaventa;
        }

        if ( result.response == 1 ) {
            C_Message( "success", result.message );
        }
        
        return result;
    } );
};

const onEdit = async ( iddevolucionnotaventa ) => {
    return httpRequest( "get", webservices.wscomercioventadevolucionnotaventa_editar + "/" + iddevolucionnotaventa, {

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

const onUpdate = async ( devolucionnotaventa ) => {
    return httpRequest( "post", webservices.wscomercioventadevolucionnotaventa_update, {
        iddevolucionnotaventa: devolucionnotaventa.iddevolucionnotaventa,
        codigo: devolucionnotaventa.codigo,
        tiponotaventa: devolucionnotaventa.tiponotaventa,
        fechadevolucionnotaventa: Functions.convertDMYToYMD( devolucionnotaventa.fechadevolucionnotaventa ),
        fechanotaventa: Functions.convertDMYToYMD( devolucionnotaventa.fechanotaventa ),

        fkidnotaventa: devolucionnotaventa.fkidnotaventa,
        fkidsucursal: devolucionnotaventa.fkidsucursal,
        fkidalmacen: devolucionnotaventa.fkidalmacen,
        fkidvendedor: devolucionnotaventa.fkidvendedor,
        fkidcliente: devolucionnotaventa.fkidcliente,
        fkidlistaprecio: devolucionnotaventa.fkidlistaprecio,
        fkidconceptoventa: devolucionnotaventa.fkidconceptoventa,
        fkidmoneda: devolucionnotaventa.fkidmoneda,
        fkidusers: devolucionnotaventa.fkidusers,
        fkidtipotransaccion: devolucionnotaventa.fkidtipotransaccion,
        fkidtipopago: devolucionnotaventa.fkidtipopago,

        tipocambio: devolucionnotaventa.tipocambio,
        nrofactura: devolucionnotaventa.nrofactura,
        razonsocial: devolucionnotaventa.razonsocial,
        nit: devolucionnotaventa.nit,
        glosa: devolucionnotaventa.glosa,
        esnotadevolucion: devolucionnotaventa.esnotadevolucion,

        montosubtotal: devolucionnotaventa.montosubtotal,
        descuento: devolucionnotaventa.descuento,
        montodescuento: devolucionnotaventa.montodescuento,
        montototal: devolucionnotaventa.montototal,
        cantidadtotal: devolucionnotaventa.cantidadtotal,

        arraydevolucionnotaventadetalle: JSON.stringify( devolucionnotaventa.devolucionnotaventadetalle ),
        arraydevolucionnotaventadetalledelete: JSON.stringify( devolucionnotaventa.devolucionnotaventadetalledelete ),

        estado: devolucionnotaventa.estado,
    } ) . then ( ( result ) => {
        resultData( result );
        if ( result.response == 0 ) {
            C_Message( "warning", result.message );
            var errors = result.errors;
            for (let index in errors) {
                devolucionnotaventa.error[index] = true;
                devolucionnotaventa.message[index] = errors[index][0];
            }
            result.resultData = devolucionnotaventa;
        }
        if ( result.response == 1 ) {
            C_Message( "success", result.message );
        }
        console.log(result)
        return result;
    } );
};

const onDelete = async ( devolucionnotaventa ) => {
    return httpRequest( "post", webservices.wscomercioventadevolucionnotaventa_delete, {
        iddevolucionnotaventa: devolucionnotaventa.iddevolucionnotaventa,
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

const onShow = async ( iddevolucionnotaventa ) => {
    return httpRequest( "get", webservices.wscomercioventadevolucionnotaventa_show + "/" + iddevolucionnotaventa, {

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

const onSearchData = async ( devolucionnotaventa ) => {
    return httpRequest( 'get', webservices.wscomercioventadevolucionnotaventa_searchByID, {
        idnotaventa: devolucionnotaventa.idnotaventa
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
    return httpRequest( "post", webservices.wscomercioventadevolucionnotaventa_reporte, {

    } ) . then ( ( result ) => {
        resultData( result );
        if ( result.response == 1 ) {
            C_Message( "success", "Servicio realizado exitosamente." );
        }
        return result;
    } );
};

export const DevolucionNotaVentaServices = {
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
