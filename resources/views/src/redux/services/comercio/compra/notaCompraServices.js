
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
    return httpRequest( 'get', webservices.wscomerciocompranotacompra_index + '?page=' + page, {
        paginate: nroPagination,
        orderBy: 'asc',
        search: search,
    } ) . then ( ( result ) => {
        resultData( result );
        console.log(result)
        if ( result.response == 1 ) {
            C_Message( "success", "Servicio realizado exitosamente." );
        }
        return result;
    } );
};

const onCreate = async () => {
    
    return httpRequest( 'get', webservices.wscomerciocompranotacompra_create, {

    } ) . then ( ( result ) => {
        console.log( result )
        resultData( result );

        if ( result.response == 1 ) {
            C_Message( "success", "Servicio realizado exitosamente." );
        }
        return result;
    } );

};

const onGrabar = async ( notacompra ) => {
    return httpRequest( "post", webservices.wscomerciocompranotacompra_store, {
        fkidsucursal:  notacompra.fkidsucursal,
        fkidalmacen:  notacompra.fkidalmacen,
        fkidconceptocompra:  notacompra.fkidconceptocompra,
        fkidproveedor:  notacompra.fkidproveedor,
        fkidmoneda:  notacompra.fkidmoneda,
        fkidordencompra:  notacompra.fkidordencompra,
        codigo:  notacompra.codigo,
        nrorefprov:  notacompra.nrorefprov,
        tipocambio:  notacompra.tipocambio,
        tipomoneda:  notacompra.tipomoneda,
        impuesto:  notacompra.impuesto,
        diascredito:  notacompra.diascredito,
        fechanotacompra:  Functions.convertDMYToYMD(notacompra.fechanotacompra),
        fechavencimiento:  Functions.convertDMYToYMD(notacompra.fechavencimiento),
        cantidadtotal:  notacompra.cantidadtotal,
        montosubtotal:  notacompra.montosubtotal,
        descuento:  notacompra.descuento,
        montodescuento:  notacompra.montodescuento,
        impuestototal:  notacompra.impuestototal,
        montototal:  notacompra.montototal,
        fletes:  notacompra.fletes,
        internacion:  notacompra.internacion,
        otrosgastos:  notacompra.otrosgastos,
        nrocajastotal: notacompra.nrocajastotal,
        volumentotal: notacompra.volumentotal,
        pesototal: notacompra.pesototal,
        nota:  notacompra.nota,
        tipocompra:  notacompra.tipocompra,
        arrayNotaCompraDetalle: JSON.stringify(notacompra.arrayNotaCompraDetalle),
        nrofactura:  notacompra.nrofactura,
        nombrerazonsocial:  notacompra.nombrerazonsocial,
        nitproveedor:  notacompra.nitproveedor,
        nroautorizacion:  notacompra.nroautorizacion,
        codigocontrol:  notacompra.codigocontrol,
        fechafactura:  Functions.convertDMYToYMD(notacompra.fechafactura),
    } ) . then ( ( result ) => {
        resultData( result );
        
        if ( result.response == 0 ) {
            C_Message( "warning", result.message );
            var errors = result.errors;
            for (let index in errors) {
                notacompra.error[index] = true;
                notacompra.message[index] = errors[index][0];
            }
            result.resultData = notacompra;
        }

        if ( result.response == 1 ) {
            C_Message( "success", result.message );
        }
        console.log(result)
        return result;
    } );
};

const onEdit = async ( idnotacompra ) => {
    return httpRequest( "get", webservices.wscomerciocompranotacompra_editar + "/" + idnotacompra, {
        idnotacompra: idnotacompra,
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

const onUpdate = async ( notacompra ) => {
    return httpRequest( "post", webservices.wscomerciocompranotacompra_update, {
        idnotacompra: notacompra.idnotacompra,
        fkidsucursal:  notacompra.fkidsucursal,
        fkidalmacen:  notacompra.fkidalmacen,
        fkidconceptocompra:  notacompra.fkidconceptocompra,
        fkidproveedor:  notacompra.fkidproveedor,
        fkidmoneda:  notacompra.fkidmoneda,
        fkidordencompra:  notacompra.fkidordencompra,
        codigo:  notacompra.codigo,
        nrorefprov:  notacompra.nrorefprov,
        tipocambio:  notacompra.tipocambio,
        tipomoneda:  notacompra.tipomoneda,
        impuesto:  notacompra.impuesto,
        diascredito:  notacompra.diascredito,
        fechanotacompra:  Functions.convertDMYToYMD(notacompra.fechanotacompra),
        fechavencimiento:  Functions.convertDMYToYMD(notacompra.fechavencimiento),
        cantidadtotal:  notacompra.cantidadtotal,
        montosubtotal:  notacompra.montosubtotal,
        descuento:  notacompra.descuento,
        montodescuento:  notacompra.montodescuento,
        montototal:  notacompra.montototal,
        fletes:  notacompra.fletes,
        internacion:  notacompra.internacion,
        otrosgastos:  notacompra.otrosgastos,
        nrocajastotal: notacompra.nrocajastotal,
        volumentotal: notacompra.volumentotal,
        pesototal: notacompra.pesototal,
        nota:  notacompra.nota,
        tipocompra:  notacompra.tipocompra,
        arrayNotaCompraDetalle: JSON.stringify(notacompra.arrayNotaCompraDetalle),
        nrofactura:  notacompra.nrofactura,
        nombrerazonsocial:  notacompra.nombrerazonsocial,
        nitproveedor:  notacompra.nitproveedor,
        nroautorizacion:  notacompra.nroautorizacion,
        codigocontrol:  notacompra.codigocontrol,
        fechafactura:  Functions.convertDMYToYMD(notacompra.fechafactura),
    } ) . then ( ( result ) => {
        resultData( result );
        if ( result.response == 0 ) {
            C_Message( "warning", result.message );
            var errors = result.errors;
            for (let index in errors) {
                notacompra.error[index] = true;
                notacompra.message[index] = errors[index][0];
            }
            result.resultData = notacompra;
        }
        if ( result.response == 1 ) {
            C_Message( "success", result.message );
        }
        console.log(result)
        return result;
    } );
};

const onDelete = async ( notacompra ) => {
    return httpRequest( "post", webservices.wscomerciocompranotacompra_delete, {
        idnotacompra: notacompra.idnotacompra,
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

const onShow = async ( idnotacompra ) => {
    return httpRequest( "get", webservices.wscomerciocompranotacompra_show + "/" + idnotacompra, {
        idnotacompra: idnotacompra,
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

const onSearchData = async ( notacompra ) => {
    return httpRequest( 'get', webservices.wscomerciocompranotacompra_searchByID, {
        idnotacompra: notacompra.idnotacompra
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
    return httpRequest( "post", webservices.wscomerciocompranotacompra_reporte, {
        
    } ) . then ( ( result ) => {
        resultData( result );
        if ( result.response == 1 ) {
            C_Message( "success", "Servicio realizado exitosamente." );
        }
        return result;
    } );
};

export const NotaCompraServices = {
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
