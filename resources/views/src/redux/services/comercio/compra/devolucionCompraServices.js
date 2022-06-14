
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
    return httpRequest( 'get', webservices.wscomerciocompradevolucioncompra_index + '?page=' + page, {
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
    
    return httpRequest( 'get', webservices.wscomerciocompradevolucioncompra_create, {

    } ) . then ( ( result ) => {
        console.log( result )
        resultData( result );

        if ( result.response == 1 ) {
            C_Message( "success", "Servicio realizado exitosamente." );
        }
        return result;
    } );

};

const onGrabar = async ( devolucioncompra ) => {
    return httpRequest( "post", webservices.wscomerciocompradevolucioncompra_store, {
        fkidsucursal:  devolucioncompra.fkidsucursal,
        fkidalmacen:  devolucioncompra.fkidalmacen,
        fkidconceptocompra:  devolucioncompra.fkidconceptocompra,
        fkidproveedor:  devolucioncompra.fkidproveedor,
        fkidmoneda:  devolucioncompra.fkidmoneda,
        fkidnotacompra:  devolucioncompra.fkidnotacompra,
        nrofactura:  devolucioncompra.nrofactura,
        codigo:  devolucioncompra.codigo,
        tipocambio:  devolucioncompra.tipocambio,
        tipomoneda:  devolucioncompra.tipomoneda,
        fechadevolucioncompra:  Functions.convertDMYToYMD(devolucioncompra.fechadevolucioncompra),
        cantidadtotal:  devolucioncompra.cantidadtotal,
        montosubtotal:  devolucioncompra.montosubtotal,
        descuento:  devolucioncompra.descuento,
        montodescuento:  devolucioncompra.montodescuento,
        montototal:  devolucioncompra.montototal,
        volumentotal: devolucioncompra.volumentotal,
        pesototal: devolucioncompra.pesototal,
        nota:  devolucioncompra.nota,
        tipocompra:  devolucioncompra.tipocompra,
        fkidtipotransaccion: 7,
        arrayDevolucionCompraDetalle: JSON.stringify(devolucioncompra.arrayDevolucionCompraDetalle),
    } ) . then ( ( result ) => {
        resultData( result );
        
        if ( result.response == 0 ) {
            C_Message( "warning", result.message );
            var errors = result.errors;
            for (let index in errors) {
                devolucioncompra.error[index] = true;
                devolucioncompra.message[index] = errors[index][0];
            }
            result.resultData = devolucioncompra;
        }

        if ( result.response == 1 ) {
            C_Message( "success", result.message );
        }
        console.log(result)
        return result;
    } );
};

const onEdit = async ( iddevolucioncompra ) => {
    return httpRequest( "get", webservices.wscomerciocompradevolucioncompra_editar + "/" + iddevolucioncompra, {
        iddevolucioncompra: iddevolucioncompra,
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

const onUpdate = async ( devolucioncompra ) => {
    return httpRequest( "post", webservices.wscomerciocompradevolucioncompra_update, {
        iddevolucioncompra: devolucioncompra.iddevolucioncompra,
        fkidsucursal:  devolucioncompra.fkidsucursal,
        fkidalmacen:  devolucioncompra.fkidalmacen,
        fkidconceptocompra:  devolucioncompra.fkidconceptocompra,
        fkidproveedor:  devolucioncompra.fkidproveedor,
        fkidmoneda:  devolucioncompra.fkidmoneda,
        fkidnotacompra:  devolucioncompra.fkidnotacompra,
        nrofactura:  devolucioncompra.nrofactura,
        codigo:  devolucioncompra.codigo,
        tipocambio:  devolucioncompra.tipocambio,
        tipomoneda:  devolucioncompra.tipomoneda,
        fechadevolucioncompra:  Functions.convertDMYToYMD(devolucioncompra.fechadevolucioncompra),
        cantidadtotal:  devolucioncompra.cantidadtotal,
        montosubtotal:  devolucioncompra.montosubtotal,
        descuento:  devolucioncompra.descuento,
        montodescuento:  devolucioncompra.montodescuento,
        montototal:  devolucioncompra.montototal,
        volumentotal: devolucioncompra.volumentotal,
        pesototal: devolucioncompra.pesototal,
        nota:  devolucioncompra.nota,
        tipocompra:  devolucioncompra.tipocompra,
        fkidtipotransaccion: 7,
        arrayDevolucionCompraDetalle: JSON.stringify(devolucioncompra.arrayDevolucionCompraDetalle),
        arrayDeleteDevolucionCompraDetalle: JSON.stringify(devolucioncompra.arrayDeleteDevolucionCompraDetalle),
    } ) . then ( ( result ) => {
        resultData( result );
        if ( result.response == 0 ) {
            C_Message( "warning", result.message );
            var errors = result.errors;
            for (let index in errors) {
                devolucioncompra.error[index] = true;
                devolucioncompra.message[index] = errors[index][0];
            }
            result.resultData = devolucioncompra;
        }
        if ( result.response == 1 ) {
            C_Message( "success", result.message );
        }
        console.log(result)
        return result;
    } );
};

const onDelete = async ( devolucioncompra ) => {
    return httpRequest( "post", webservices.wscomerciocompradevolucioncompra_delete, {
        iddevolucioncompra: devolucioncompra.iddevolucioncompra,
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

const onShow = async ( iddevolucioncompra ) => {
    return httpRequest( "get", webservices.wscomerciocompradevolucioncompra_show + "/" + iddevolucioncompra, {
        iddevolucioncompra: iddevolucioncompra,
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

const onSearchData = async ( devolucioncompra ) => {
    return httpRequest( 'get', webservices.wscomerciocompradevolucioncompra_searchByID, {
        iddevolucioncompra: devolucioncompra.iddevolucioncompra
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
    return httpRequest( "post", webservices.wscomerciocompradevolucioncompra_reporte, {
        
    } ) . then ( ( result ) => {
        resultData( result );
        if ( result.response == 1 ) {
            C_Message( "success", "Servicio realizado exitosamente." );
        }
        return result;
    } );
};

export const DevolucionCompraServices = {
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
