
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
    return httpRequest( 'get', webservices.wscomercioventanotaventa_index + '?page=' + page, {
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

    return httpRequest( 'get', webservices.wscomercioventanotaventa_create, {

    } ) . then ( ( result ) => {
        console.log( result )
        resultData( result );

        if ( result.response == 1 ) {
            C_Message( "success", "Servicio realizado exitosamente." );
        }
        return result;
    } );

};

const onGrabar = async ( notaventa ) => {
    return httpRequest( "post", webservices.wscomercioventanotaventa_store, {
        codigo: notaventa.codigo,
        tipoventa: notaventa.tipoventa,
        estadoproceso: notaventa.estadoproceso,
        fechaventa: Functions.convertDMYToYMD( notaventa.fechaventa ),
        diascredito: notaventa.diascredito,
        fechavencimiento: Functions.convertDMYToYMD( notaventa.fechavencimiento ),

        fkidsucursal: notaventa.fkidsucursal,
        fkidalmacen: notaventa.fkidalmacen,
        fkidvendedor: notaventa.fkidvendedor,
        fkidcliente: notaventa.fkidcliente,
        fkidlistaprecio: notaventa.fkidlistaprecio,
        fkidconceptoventa: notaventa.fkidconceptoventa,
        fkidmoneda: notaventa.fkidmoneda,
        fkidusers: notaventa.fkidusers,
        fkidtipotransaccion: 8,
        fkidtipopago: notaventa.fkidtipopago,

        nrodebito: notaventa.nrodebito,
        nroventa: notaventa.nroventa,
        nrocotizacion: notaventa.nrocotizacion,
        tipocambio: notaventa.tipocambio,

        facturar: notaventa.facturar,
        nrofactura: notaventa.nrofactura,
        razonsocial: notaventa.razonsocial,
        nit: notaventa.nit,
        glosa: notaventa.glosa,
        esnotaentrega: notaventa.esnotaentrega,

        impuestoiva: notaventa.impuestoiva,
        montototalcobrado: notaventa.montototalcobrado,
        montototaldeudamora: notaventa.montototaldeudamora,
        montototaldeudaactual: notaventa.montototaldeudaactual,
        descuentoacumulado: notaventa.descuentoacumulado,
        porcentajerangodescuentoinicial: notaventa.porcentajerangodescuentoinicial,
        porcentajerangodescuentofinal: notaventa.porcentajerangodescuentofinal,

        montosubtotal: notaventa.montosubtotal,
        descuento: notaventa.descuento,
        montodescuento: notaventa.montodescuento,
        montototal: notaventa.montototal,
        cantidadtotal: notaventa.cantidadtotal,
        montoanticipo: notaventa.montoanticipo,
        isdevolucionventa: notaventa.isdevolucionventa,
        arraynotaventadetalle: JSON.stringify( notaventa.notaventadetalle ),

        estado: notaventa.estado,
    } ) . then ( ( result ) => {
        resultData( result );

        if ( result.response == 0 ) {
            C_Message( "warning", result.message );
            var errors = result.errors;
            for (let index in errors) {
                notaventa.error[index] = true;
                notaventa.message[index] = errors[index][0];
            }
            result.resultData = notaventa;
        }

        if ( result.response == 1 ) {
            C_Message( "success", result.message );
        }
        console.log(result)
        return result;
    } );
};

const onEdit = async ( idnotaventa ) => {
    return httpRequest( "get", webservices.wscomercioventanotaventa_editar + "/" + idnotaventa, {

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

const onUpdate = async ( notaventa ) => {
    return httpRequest( "post", webservices.wscomercioventanotaventa_update, {
        idnotaventa: notaventa.idnotaventa,
        codigo: notaventa.codigo,
        tipoventa: notaventa.tipoventa,
        estadoproceso: notaventa.estadoproceso,
        fechaventa: Functions.convertDMYToYMD( notaventa.fechaventa ),
        diascredito: notaventa.diascredito,
        fechavencimiento: Functions.convertDMYToYMD( notaventa.fechavencimiento ),

        fkidsucursal: notaventa.fkidsucursal,
        fkidalmacen: notaventa.fkidalmacen,
        fkidvendedor: notaventa.fkidvendedor,
        fkidcliente: notaventa.fkidcliente,
        fkidlistaprecio: notaventa.fkidlistaprecio,
        fkidconceptoventa: notaventa.fkidconceptoventa,
        fkidmoneda: notaventa.fkidmoneda,
        fkidusers: notaventa.fkidusers,
        fkidtipotransaccion: 8,
        fkidtipopago: notaventa.fkidtipopago,

        nrodebito: notaventa.nrodebito,
        nroventa: notaventa.nroventa,
        nrocotizacion: notaventa.nrocotizacion,
        tipocambio: notaventa.tipocambio,

        facturar: notaventa.facturar,
        nrofactura: notaventa.nrofactura,
        razonsocial: notaventa.razonsocial,
        nit: notaventa.nit,
        glosa: notaventa.glosa,
        esnotaentrega: notaventa.esnotaentrega,

        impuestoiva: notaventa.impuestoiva,
        montototalcobrado: notaventa.montototalcobrado,
        montototaldeudamora: notaventa.montototaldeudamora,
        montototaldeudaactual: notaventa.montototaldeudaactual,
        descuentoacumulado: notaventa.descuentoacumulado,
        porcentajerangodescuentoinicial: notaventa.porcentajerangodescuentoinicial,
        porcentajerangodescuentofinal: notaventa.porcentajerangodescuentofinal,

        montosubtotal: notaventa.montosubtotal,
        descuento: notaventa.descuento,
        montodescuento: notaventa.montodescuento,
        montototal: notaventa.montototal,
        cantidadtotal: notaventa.cantidadtotal,
        montoanticipo: notaventa.montoanticipo,
        isdevolucionventa: notaventa.isdevolucionventa,
        arraynotaventadetalle: JSON.stringify( notaventa.notaventadetalle ),
        arraynotaventadetalledelete: JSON.stringify( notaventa.notaventadetalledelete ),

        estado: notaventa.estado,
    } ) . then ( ( result ) => {
        resultData( result );
        if ( result.response == 0 ) {
            C_Message( "warning", result.message );
            var errors = result.errors;
            for (let index in errors) {
                notaventa.error[index] = true;
                notaventa.message[index] = errors[index][0];
            }
            result.resultData = notaventa;
        }
        if ( result.response == 1 ) {
            C_Message( "success", result.message );
        }
        console.log(result)
        return result;
    } );
};

const onDelete = async ( notaventa ) => {
    return httpRequest( "post", webservices.wscomercioventanotaventa_delete, {
        idnotaventa: notaventa.idnotaventa,
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

const onShow = async ( idnotaventa ) => {
    return httpRequest( "get", webservices.wscomercioventanotaventa_show + "/" + idnotaventa, {

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

const onSearchData = async ( notaventa ) => {
    return httpRequest( 'get', webservices.wscomercioventanotaventa_searchByID, {
        idnotaventa: notaventa.idnotaventa
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
    return httpRequest( "post", webservices.wscomercioventanotaventa_reporte, {

    } ) . then ( ( result ) => {
        resultData( result );
        if ( result.response == 1 ) {
            C_Message( "success", "Servicio realizado exitosamente." );
        }
        return result;
    } );
};

export const NotaVentaServices = {
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
