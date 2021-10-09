
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
    return httpRequest( 'get', webservices.wscomerciocomprasolicitudcompra_index + '?page=' + page, {
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
    
    return httpRequest( 'get', webservices.wscomerciocomprasolicitudcompra_create, {

    } ) . then ( ( result ) => {
        console.log( result )
        resultData( result );

        if ( result.response == 1 ) {
            C_Message( "success", "Servicio realizado exitosamente." );
        }
        return result;
    } );

};

const onGrabar = async ( solicitudcompra ) => {
    return httpRequest( "post", webservices.wscomerciocomprasolicitudcompra_store, {
        fkidsucursal:  solicitudcompra.fkidsucursal,
        fkidalmacen:  solicitudcompra.fkidalmacen,
        fkidconceptocompra:  solicitudcompra.fkidconceptocompra,
        fkidseccioninventario:  solicitudcompra.fkidseccioninventario,
        fkidproveedor:  solicitudcompra.fkidproveedor,
        fkidmoneda:  solicitudcompra.fkidmoneda,
        codigo:  solicitudcompra.codigo,
        tipocambio:  solicitudcompra.tipocambio,
        fechasolicitada:  Functions.convertDMYToYMD(solicitudcompra.fechasolicitada),
        fechafinalizada:  Functions.convertDMYToYMD(solicitudcompra.fechafinalizada),
        cantidadpendientetotal:  solicitudcompra.cantidadpendientetotal,
        cantidadsolicitadatotal:  solicitudcompra.cantidadsolicitadatotal,
        montototal:  solicitudcompra.montototal,
        nota:  solicitudcompra.nota,
        tiposolicitud:  solicitudcompra.tiposolicitud,
        arraySolicitudCompraDetalle: JSON.stringify(solicitudcompra.arraySolicitudCompraDetalle),
    } ) . then ( ( result ) => {
        resultData( result );
        
        if ( result.response == 0 ) {
            C_Message( "warning", result.message );
            var errors = result.errors;
            for (let index in errors) {
                solicitudcompra.error[index] = true;
                solicitudcompra.message[index] = errors[index][0];
            }
            result.resultData = solicitudcompra;
        }

        if ( result.response == 1 ) {
            C_Message( "success", result.message );
        }
        console.log(result)
        return result;
    } );
};

const onEdit = async ( idsolicitudcompra ) => {
    return httpRequest( "get", webservices.wscomerciocomprasolicitudcompra_editar + "/" + idsolicitudcompra, {
        idsolicitudcompra: idsolicitudcompra,
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

const onUpdate = async ( solicitudcompra ) => {
    return httpRequest( "post", webservices.wscomerciocomprasolicitudcompra_update, {
        idsolicitudcompra: solicitudcompra.idsolicitudcompra,
        fkidsucursal:  solicitudcompra.fkidsucursal,
        fkidalmacen:  solicitudcompra.fkidalmacen,
        fkidconceptocompra:  solicitudcompra.fkidconceptocompra,
        fkidseccioninventario:  solicitudcompra.fkidseccioninventario,
        fkidproveedor:  solicitudcompra.fkidproveedor,
        fkidmoneda:  solicitudcompra.fkidmoneda,
        codigo:  solicitudcompra.codigo,
        tipocambio:  solicitudcompra.tipocambio,
        fechasolicitada:  Functions.convertDMYToYMD(solicitudcompra.fechasolicitada),
        fechafinalizada:  Functions.convertDMYToYMD(solicitudcompra.fechafinalizada),
        cantidadpendientetotal:  solicitudcompra.cantidadpendientetotal,
        cantidadsolicitadatotal:  solicitudcompra.cantidadsolicitadatotal,
        montototal:  solicitudcompra.montototal,
        nota:  solicitudcompra.nota,
        tiposolicitud:  solicitudcompra.tiposolicitud,
    } ) . then ( ( result ) => {
        resultData( result );
        if ( result.response == 0 ) {
            C_Message( "warning", result.message );
            var errors = result.errors;
            for (let index in errors) {
                solicitudcompra.error[index] = true;
                solicitudcompra.message[index] = errors[index][0];
            }
            result.resultData = solicitudcompra;
        }
        if ( result.response == 1 ) {
            C_Message( "success", result.message );
        }
        console.log(result)
        return result;
    } );
};

const onDelete = async ( solicitudcompra ) => {
    return httpRequest( "post", webservices.wscomerciocomprasolicitudcompra_delete, {
        idsolicitudcompra: solicitudcompra.idsolicitudcompra,
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

const onShow = async ( idsolicitudcompra ) => {
    return httpRequest( "get", webservices.wscomerciocomprasolicitudcompra_show + "/" + idsolicitudcompra, {
        idsolicitudcompra: idsolicitudcompra,
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

const onSearchData = async ( solicitudcompra ) => {
    return httpRequest( 'get', webservices.wscomerciocomprasolicitudcompra_searchByID, {
        idsolicitudcompra: solicitudcompra.idsolicitudcompra
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
    return httpRequest( "post", webservices.wscomerciocomprasolicitudcompra_reporte, {
        
    } ) . then ( ( result ) => {
        resultData( result );
        if ( result.response == 1 ) {
            C_Message( "success", "Servicio realizado exitosamente." );
        }
        return result;
    } );
};

export const SolicitudCompraServices = {
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
