
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
    return httpRequest( 'get', webservices.wscomercioinventarionotatraspasoproducto_index + '?page=' + page, {
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
    
    return httpRequest( 'get', webservices.wscomercioinventarionotatraspasoproducto_create, {

    } ) . then ( ( result ) => {
        console.log( result )
        resultData( result );

        if ( result.response == 1 ) {
            C_Message( "success", "Servicio realizado exitosamente." );
        }
        return result;
    } );

};

const onGrabar = async ( notatraspasoproducto ) => {
    return httpRequest( "post", webservices.wscomercioinventarionotatraspasoproducto_store, {
        fkidsucursalingreso:  notatraspasoproducto.fkidsucursalingreso,
        fkidsucursalsalida:  notatraspasoproducto.fkidsucursalsalida,
        fkidalmaceningreso:  notatraspasoproducto.fkidalmaceningreso,
        fkidalmacensalida:  notatraspasoproducto.fkidalmacensalida,
        fkidconceptoinventario:  notatraspasoproducto.fkidconceptoinventario,
        fkidmoneda:  notatraspasoproducto.fkidmoneda,
        fkidtipotransaccion: 3,
        codigo:  notatraspasoproducto.codigo,
        nromanual:  notatraspasoproducto.nromanual,
        tipocambio:  notatraspasoproducto.tipocambio,
        fechanotatraspaso: Functions.convertDMYToYMD(notatraspasoproducto.fechanotatraspaso),
        cantidadtotal:  notatraspasoproducto.cantidadtotal,
        montototal:  notatraspasoproducto.montototal,
        pesototal:  notatraspasoproducto.pesototal,
        volumentotal:  notatraspasoproducto.volumentotal,
        nrocajastotal:  notatraspasoproducto.nrocajastotal,
        nota:  notatraspasoproducto.nota,
        estado:  notatraspasoproducto.estado,
        arrayNotaTraspasoProductoDetalle: JSON.stringify(notatraspasoproducto.arrayNotaTraspasoProductoDetalle),
    } ) . then ( ( result ) => {
        resultData( result );
        
        if ( result.response == 0 ) {
            C_Message( "warning", result.message );
            var errors = result.errors;
            for (let index in errors) {
                notatraspasoproducto.error[index] = true;
                notatraspasoproducto.message[index] = errors[index][0];
            }
            result.resultData = notatraspasoproducto;
        }

        if ( result.response == 1 ) {
            C_Message( "success", result.message );
        }
        console.log(result)
        return result;
    } );
};

const onEdit = async ( idnotatraspasoproducto ) => {
    return httpRequest( "get", webservices.wscomercioinventarionotatraspasoproducto_editar + "/" + idnotatraspasoproducto, {
        idnotatraspasoproducto: idnotatraspasoproducto,
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

const onUpdate = async ( notatraspasoproducto ) => {
    return httpRequest( "post", webservices.wscomercioinventarionotatraspasoproducto_update, {
        idnotatraspasoproducto: notatraspasoproducto.idnotatraspasoproducto,
        fkidsucursalingreso:  notatraspasoproducto.fkidsucursalingreso,
        fkidsucursalsalida:  notatraspasoproducto.fkidsucursalsalida,
        fkidalmaceningreso:  notatraspasoproducto.fkidalmaceningreso,
        fkidalmacensalida:  notatraspasoproducto.fkidalmacensalida,
        fkidconceptoinventario:  notatraspasoproducto.fkidconceptoinventario,
        fkidmoneda:  notatraspasoproducto.fkidmoneda,
        fkidtipotransaccion: 3,
        codigo:  notatraspasoproducto.codigo,
        nromanual:  notatraspasoproducto.nromanual,
        tipocambio:  notatraspasoproducto.tipocambio,
        fechanotatraspaso: Functions.convertDMYToYMD(notatraspasoproducto.fechanotatraspaso),
        cantidadtotal:  notatraspasoproducto.cantidadtotal,
        montototal:  notatraspasoproducto.montototal,
        pesototal:  notatraspasoproducto.pesototal,
        volumentotal:  notatraspasoproducto.volumentotal,
        nrocajastotal:  notatraspasoproducto.nrocajastotal,
        nota:  notatraspasoproducto.nota,
        estado:  notatraspasoproducto.estado,
        arrayNotaTraspasoProductoDetalle: JSON.stringify(notatraspasoproducto.arrayNotaTraspasoProductoDetalle),
        arrayDeleteNotaTraspasoProductoDetalle: JSON.stringify(notatraspasoproducto.arrayDeleteNotaTraspasoProductoDetalle),
    } ) . then ( ( result ) => {
        resultData( result );
        if ( result.response == 0 ) {
            C_Message( "warning", result.message );
            var errors = result.errors;
            for (let index in errors) {
                notatraspasoproducto.error[index] = true;
                notatraspasoproducto.message[index] = errors[index][0];
            }
            result.resultData = notatraspasoproducto;
        }
        if ( result.response == 1 ) {
            C_Message( "success", result.message );
        }
        console.log(result)
        return result;
    } );
};

const onDelete = async ( notatraspasoproducto ) => {
    return httpRequest( "post", webservices.wscomercioinventarionotatraspasoproducto_delete, {
        idnotatraspasoproducto: notatraspasoproducto.idnotatraspasoproducto,
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

const onShow = async ( idnotatraspasoproducto ) => {
    return httpRequest( "get", webservices.wscomercioinventarionotatraspasoproducto_show + "/" + idnotatraspasoproducto, {
        idnotatraspasoproducto: idnotatraspasoproducto,
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

const onSearchData = async ( notatraspasoproducto ) => {
    return httpRequest( 'get', webservices.wscomercioinventarionotatraspasoproducto_searchByID, {
        idnotatraspasoproducto: notatraspasoproducto.idnotatraspasoproducto
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
    return httpRequest( "post", webservices.wscomercioinventarionotatraspasoproducto_reporte, {
        
    } ) . then ( ( result ) => {
        resultData( result );
        if ( result.response == 1 ) {
            C_Message( "success", "Servicio realizado exitosamente." );
        }
        return result;
    } );
};

export const NotaTraspasoProductoServices = {
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
