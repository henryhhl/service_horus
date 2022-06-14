
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
    return httpRequest( 'get', webservices.wscomerciocompraordencompra_index + '?page=' + page, {
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
    
    return httpRequest( 'get', webservices.wscomerciocompraordencompra_create, {

    } ) . then ( ( result ) => {
        console.log( result )
        resultData( result );

        if ( result.response == 1 ) {
            C_Message( "success", "Servicio realizado exitosamente." );
        }
        return result;
    } );

};

const onGrabar = async ( ordencompra ) => {
    return httpRequest( "post", webservices.wscomerciocompraordencompra_store, {
        fkidsucursal:  ordencompra.fkidsucursal,
        fkidalmacen:  ordencompra.fkidalmacen,
        fkidconceptocompra:  ordencompra.fkidconceptocompra,
        fkidseccioninventario:  ordencompra.fkidseccioninventario,
        fkidproveedor:  ordencompra.fkidproveedor,
        fkidmoneda:  ordencompra.fkidmoneda,
        fkidsolicitudcompra:  ordencompra.fkidsolicitudcompra,
        codigo:  ordencompra.codigo,
        nrofactura:  ordencompra.nrofactura,
        tipocambio:  ordencompra.tipocambio,
        diasplazo:  ordencompra.diasplazo,
        fechasolicitada:  Functions.convertDMYToYMD(ordencompra.fechasolicitada),
        fechafinalizada:  Functions.convertDMYToYMD(ordencompra.fechafinalizada),
        cantidadtotal:  ordencompra.cantidadtotal,
        montosubtotal:  ordencompra.montosubtotal,
        montototal:  ordencompra.montototal,
        fletes:  ordencompra.fletes,
        internacion:  ordencompra.internacion,
        otrosgastos:  ordencompra.otrosgastos,
        nota:  ordencompra.nota,
        tiposolicitud:  ordencompra.tiposolicitud,
        descuento:  ordencompra.descuento,
        montodescuento:  ordencompra.montodescuento,
        fkidtipotransaccion: 5,
        fkidusers: null,
        iscompra: ordencompra.iscompra,
        issolicitudcompra: ordencompra.issolicitudcompra,
        arrayOrdenCompraDetalle: JSON.stringify(ordencompra.arrayOrdenCompraDetalle),
    } ) . then ( ( result ) => {
        resultData( result );
        
        if ( result.response == 0 ) {
            C_Message( "warning", result.message );
            var errors = result.errors;
            for (let index in errors) {
                ordencompra.error[index] = true;
                ordencompra.message[index] = errors[index][0];
            }
            result.resultData = ordencompra;
        }

        if ( result.response == 1 ) {
            C_Message( "success", result.message );
        }
        console.log(result)
        return result;
    } );
};

const onEdit = async ( idordencompra ) => {
    return httpRequest( "get", webservices.wscomerciocompraordencompra_editar + "/" + idordencompra, {
        idordencompra: idordencompra,
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

const onUpdate = async ( ordencompra ) => {
    return httpRequest( "post", webservices.wscomerciocompraordencompra_update, {
        idordencompra: ordencompra.idordencompra,
        fkidsucursal:  ordencompra.fkidsucursal,
        fkidalmacen:  ordencompra.fkidalmacen,
        fkidconceptocompra:  ordencompra.fkidconceptocompra,
        fkidseccioninventario:  ordencompra.fkidseccioninventario,
        fkidproveedor:  ordencompra.fkidproveedor,
        fkidmoneda:  ordencompra.fkidmoneda,
        fkidsolicitudcompra:  ordencompra.fkidsolicitudcompra,
        codigo:  ordencompra.codigo,
        nrofactura:  ordencompra.nrofactura,
        tipocambio:  ordencompra.tipocambio,
        diasplazo:  ordencompra.diasplazo,
        fechasolicitada:  Functions.convertDMYToYMD(ordencompra.fechasolicitada),
        fechafinalizada:  Functions.convertDMYToYMD(ordencompra.fechafinalizada),
        cantidadtotal:  ordencompra.cantidadtotal,
        montosubtotal:  ordencompra.montosubtotal,
        montototal:  ordencompra.montototal,
        fletes:  ordencompra.fletes,
        internacion:  ordencompra.internacion,
        otrosgastos:  ordencompra.otrosgastos,
        nota:  ordencompra.nota,
        tiposolicitud:  ordencompra.tiposolicitud,
        descuento:  ordencompra.descuento,
        montodescuento:  ordencompra.montodescuento,
        fkidtipotransaccion: 5,
        fkidusers: null,
        iscompra: ordencompra.iscompra,
        issolicitudcompra: ordencompra.issolicitudcompra,
        arrayOrdenCompraDetalle: JSON.stringify(ordencompra.arrayOrdenCompraDetalle),
        arrayDeleteOrdenCompraDetalle: JSON.stringify(ordencompra.arrayDeleteOrdenCompraDetalle),
    } ) . then ( ( result ) => {
        console.log(ordencompra)
        resultData( result );
        if ( result.response == 0 ) {
            C_Message( "warning", result.message );
            var errors = result.errors;
            for (let index in errors) {
                ordencompra.error[index] = true;
                ordencompra.message[index] = errors[index][0];
            }
            result.resultData = ordencompra;
        }
        if ( result.response == 1 ) {
            C_Message( "success", result.message );
        }
        console.log(result)
        return result;
    } );
};

const onDelete = async ( ordencompra ) => {
    return httpRequest( "post", webservices.wscomerciocompraordencompra_delete, {
        idordencompra: ordencompra.idordencompra,
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

const onShow = async ( idordencompra ) => {
    return httpRequest( "get", webservices.wscomerciocompraordencompra_show + "/" + idordencompra, {
        idordencompra: idordencompra,
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

const onSearchData = async ( ordencompra ) => {
    return httpRequest( 'get', webservices.wscomerciocompraordencompra_searchByID, {
        idordencompra: ordencompra.idordencompra
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
    return httpRequest( "post", webservices.wscomerciocompraordencompra_reporte, {
        
    } ) . then ( ( result ) => {
        resultData( result );
        if ( result.response == 1 ) {
            C_Message( "success", "Servicio realizado exitosamente." );
        }
        return result;
    } );
};

export const OrdenCompraServices = {
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
