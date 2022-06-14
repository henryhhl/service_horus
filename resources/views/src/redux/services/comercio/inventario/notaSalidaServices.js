
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
    return httpRequest( 'get', webservices.wscomercioinventarionotasalida_index + '?page=' + page, {
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
    
    return httpRequest( 'get', webservices.wscomercioinventarionotasalida_create, {

    } ) . then ( ( result ) => {
        console.log( result )
        resultData( result );

        if ( result.response == 1 ) {
            C_Message( "success", "Servicio realizado exitosamente." );
        }
        return result;
    } );

};

const onGrabar = async ( notasalida ) => {
    return httpRequest( "post", webservices.wscomercioinventarionotasalida_store, {
        fkidsucursal:  notasalida.fkidsucursal,
        fkidalmacen:  notasalida.fkidalmacen,
        fkidconceptoinventario:  notasalida.fkidconceptoinventario,
        fkidmoneda:  notasalida.fkidmoneda,
        fkidtipotransaccion: 2,
        codigo:  notasalida.codigo,
        nro:  notasalida.nro,
        nromanual:  notasalida.nromanual,
        tipocambio:  notasalida.tipocambio,
        fechanotasalida: Functions.convertDMYToYMD(notasalida.fechanotasalida),
        cantidadtotal:  notasalida.cantidadtotal,
        montototal:  notasalida.montototal,
        pesototal:  notasalida.pesototal,
        volumentotal:  notasalida.volumentotal,
        nrocajastotal:  notasalida.nrocajastotal,
        nota:  notasalida.nota,
        actualizarcostos:  notasalida.actualizarcostos,
        esnotasalida:  notasalida.esnotasalida,
        esingresado:  notasalida.esingresado,
        estado:  notasalida.estado,
        arrayNotaSalidaDetalle: JSON.stringify(notasalida.arrayNotaSalidaDetalle),
    } ) . then ( ( result ) => {
        resultData( result );
        
        if ( result.response == 0 ) {
            C_Message( "warning", result.message );
            var errors = result.errors;
            for (let index in errors) {
                notasalida.error[index] = true;
                notasalida.message[index] = errors[index][0];
            }
            result.resultData = notasalida;
        }

        if ( result.response == 1 ) {
            C_Message( "success", result.message );
        }
        console.log(result)
        return result;
    } );
};

const onEdit = async ( idnotasalida ) => {
    return httpRequest( "get", webservices.wscomercioinventarionotasalida_editar + "/" + idnotasalida, {
        idnotasalida: idnotasalida,
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

const onUpdate = async ( notasalida ) => {
    return httpRequest( "post", webservices.wscomercioinventarionotasalida_update, {
        idnotasalida: notasalida.idnotasalida,
        fkidsucursal:  notasalida.fkidsucursal,
        fkidalmacen:  notasalida.fkidalmacen,
        fkidconceptoinventario:  notasalida.fkidconceptoinventario,
        fkidmoneda:  notasalida.fkidmoneda,
        fkidtipotransaccion: 2,
        codigo:  notasalida.codigo,
        nro:  notasalida.nro,
        nromanual:  notasalida.nromanual,
        tipocambio:  notasalida.tipocambio,
        fechanotasalida: Functions.convertDMYToYMD(notasalida.fechanotasalida),
        cantidadtotal:  notasalida.cantidadtotal,
        montototal:  notasalida.montototal,
        pesototal:  notasalida.pesototal,
        volumentotal:  notasalida.volumentotal,
        nrocajastotal:  notasalida.nrocajastotal,
        nota:  notasalida.nota,
        esnotasalida:  notasalida.esnotasalida,
        esingresado:  notasalida.esingresado,
        estado:  notasalida.estado,
        arrayNotaSalidaDetalle: JSON.stringify(notasalida.arrayNotaSalidaDetalle),
        arrayDeleteNotaSalidaDetalle: JSON.stringify(notasalida.arrayDeleteNotaSalidaDetalle),
    } ) . then ( ( result ) => {
        resultData( result );
        if ( result.response == 0 ) {
            C_Message( "warning", result.message );
            var errors = result.errors;
            for (let index in errors) {
                notasalida.error[index] = true;
                notasalida.message[index] = errors[index][0];
            }
            result.resultData = notasalida;
        }
        if ( result.response == 1 ) {
            C_Message( "success", result.message );
        }
        console.log(result)
        return result;
    } );
};

const onDelete = async ( notasalida ) => {
    return httpRequest( "post", webservices.wscomercioinventarionotasalida_delete, {
        idnotasalida: notasalida.idnotasalida,
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

const onShow = async ( idnotasalida ) => {
    return httpRequest( "get", webservices.wscomercioinventarionotasalida_show + "/" + idnotasalida, {
        idnotasalida: idnotasalida,
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

const onSearchData = async ( notasalida ) => {
    return httpRequest( 'get', webservices.wscomercioinventarionotasalida_searchByID, {
        idnotasalida: notasalida.idnotasalida
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
    return httpRequest( "post", webservices.wscomercioinventarionotasalida_reporte, {
        
    } ) . then ( ( result ) => {
        resultData( result );
        if ( result.response == 1 ) {
            C_Message( "success", "Servicio realizado exitosamente." );
        }
        return result;
    } );
};

export const NotaSalidaServices = {
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
