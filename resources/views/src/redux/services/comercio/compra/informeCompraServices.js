
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

const initData = async ( page = 1, nroPagination = 1, search = "" ) => {
    return httpRequest( 'get', webservices.wscomerciocompraconceptocompra_index + '?page=' + page, {
        paginate: nroPagination,
        orderBy: 'asc',
        search: search,
    } ) . then ( ( result ) => {
        resultData( result );
        
        if ( result.response == 1 ) {
            C_Message( "success", "Servicio realizado exitosamente." );
        }
        return result;
    } );
};

const onImprimir = async ( informeCompra ) => {
    return httpRequest( "post", webservices.wscomerciocomprainformecompra_notacomprageneral, {
        fechainicio: Functions.convertDMYToYMD(informeCompra.fechainicio),
        fechafinal: Functions.convertDMYToYMD(informeCompra.fechafinal),
        tipoinforme: informeCompra.tipoinforme,
        fkidsucursal: informeCompra.fkidsucursal,
        fkidalmacen: informeCompra.fkidalmacen,
        fkidconceptocompra: informeCompra.fkidconceptocompra,
        fkidproveedor: informeCompra.fkidproveedor,
        fkidcategoria: informeCompra.fkidcategoria,
        fkidproductomarca: informeCompra.fkidproductomarca,
        fkidproductogrupo: informeCompra.fkidproductogrupo,
        fkidproductosubgrupo: informeCompra.fkidproductosubgrupo,
        fkidproducto: informeCompra.fkidproducto,
        tipocompra: informeCompra.tipocompra,
        formato: informeCompra.formato,
    } ) . then ( ( result ) => {
        console.log(result)
        resultData( result );
        if ( result.response == 1 ) {
            C_Message( "success", "Servicio realizado exitosamente." );
        }
        return result;
    } );
};

export const InformeCompraServices = {
    initData,
    onImprimir,
};
