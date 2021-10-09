
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
    return httpRequest( 'get', webservices.wscomercioinventarionotaingreso_index + '?page=' + page, {
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
    
    return httpRequest( 'get', webservices.wscomercioinventarionotaingreso_create, {

    } ) . then ( ( result ) => {
        console.log( result )
        resultData( result );

        if ( result.response == 1 ) {
            C_Message( "success", "Servicio realizado exitosamente." );
        }
        return result;
    } );

};

const onGrabar = async ( notaingreso ) => {
    return httpRequest( "post", webservices.wscomercioinventarionotaingreso_store, {
        fkidsucursal:  notaingreso.fkidsucursal,
        fkidalmacen:  notaingreso.fkidalmacen,
        fkidconceptoinventario:  notaingreso.fkidconceptoinventario,
        fkidmoneda:  notaingreso.fkidmoneda,
        codigo:  notaingreso.codigo,
        nromanual:  notaingreso.nromanual,
        tipocambio:  notaingreso.tipocambio,
        fechanotaingreso: Functions.convertDMYToYMD(notaingreso.fechanotaingreso),
        cantidadtotal:  notaingreso.cantidadtotal,
        montototal:  notaingreso.montototal,
        pesototal:  notaingreso.pesototal,
        volumentotal:  notaingreso.volumentotal,
        nrocajastotal:  notaingreso.nrocajastotal,
        nota:  notaingreso.nota,
        esingresado:  notaingreso.esingresado,
        estado:  notaingreso.estado,
        arrayNotaIngresoDetalle: JSON.stringify(notaingreso.arrayNotaIngresoDetalle),
    } ) . then ( ( result ) => {
        resultData( result );
        
        if ( result.response == 0 ) {
            C_Message( "warning", result.message );
            var errors = result.errors;
            for (let index in errors) {
                notaingreso.error[index] = true;
                notaingreso.message[index] = errors[index][0];
            }
            result.resultData = notaingreso;
        }

        if ( result.response == 1 ) {
            C_Message( "success", result.message );
        }
        console.log(result)
        return result;
    } );
};

const onEdit = async ( idnotaingreso ) => {
    return httpRequest( "get", webservices.wscomercioinventarionotaingreso_editar + "/" + idnotaingreso, {
        idnotaingreso: idnotaingreso,
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

const onUpdate = async ( notaingreso ) => {
    return httpRequest( "post", webservices.wscomercioinventarionotaingreso_update, {
        idnotaingreso: notaingreso.idnotaingreso,
        fkidsucursal:  notaingreso.fkidsucursal,
        fkidalmacen:  notaingreso.fkidalmacen,
        fkidconceptoinventario:  notaingreso.fkidconceptoinventario,
        fkidmoneda:  notaingreso.fkidmoneda,
        codigo:  notaingreso.codigo,
        nromanual:  notaingreso.nromanual,
        tipocambio:  notaingreso.tipocambio,
        fechanotaingreso: Functions.convertDMYToYMD(notaingreso.fechanotaingreso),
        cantidadtotal:  notaingreso.cantidadtotal,
        montototal:  notaingreso.montototal,
        pesototal:  notaingreso.pesototal,
        volumentotal:  notaingreso.volumentotal,
        nrocajastotal:  notaingreso.nrocajastotal,
        nota:  notaingreso.nota,
        esingresado:  notaingreso.esingresado,
        estado:  notaingreso.estado,
    } ) . then ( ( result ) => {
        resultData( result );
        if ( result.response == 0 ) {
            C_Message( "warning", result.message );
            var errors = result.errors;
            for (let index in errors) {
                notaingreso.error[index] = true;
                notaingreso.message[index] = errors[index][0];
            }
            result.resultData = notaingreso;
        }
        if ( result.response == 1 ) {
            C_Message( "success", result.message );
        }
        console.log(result)
        return result;
    } );
};

const onDelete = async ( notaingreso ) => {
    return httpRequest( "post", webservices.wscomercioinventarionotaingreso_delete, {
        idnotaingreso: notaingreso.idnotaingreso,
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

const onShow = async ( idnotaingreso ) => {
    return httpRequest( "get", webservices.wscomercioinventarionotaingreso_show + "/" + idnotaingreso, {
        idnotaingreso: idnotaingreso,
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

const onSearchData = async ( notaingreso ) => {
    return httpRequest( 'get', webservices.wscomercioinventarionotaingreso_searchByID, {
        idnotaingreso: notaingreso.idnotaingreso
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
    return httpRequest( "post", webservices.wscomercioinventarionotaingreso_reporte, {
        
    } ) . then ( ( result ) => {
        resultData( result );
        if ( result.response == 1 ) {
            C_Message( "success", "Servicio realizado exitosamente." );
        }
        return result;
    } );
};

export const NotaIngresoServices = {
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
