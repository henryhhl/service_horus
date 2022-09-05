
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

const onImprimir = async ( informeVenta ) => {
    return httpRequest( "post", webservices.wscomercioventainformeventa_notaventageneral, {
        fechainicio: Functions.convertDMYToYMD(informeVenta.fechainicio),
        fechafinal: Functions.convertDMYToYMD(informeVenta.fechafinal),
        tipoinforme: informeVenta.tipoinforme,
        tipomoneda: informeVenta.tipomoneda,
        fkidalmacen: informeVenta.fkidalmacen,
        fkidcliente: informeVenta.fkidcliente,
        fkidconceptoventa: informeVenta.fkidconceptoventa,
        fkidsucursal: informeVenta.fkidsucursal,
        fkidciudad: informeVenta.fkidciudad,
        fkidvendedor: informeVenta.fkidvendedor,
        fkidcategoria: informeVenta.fkidcategoria,
        fkidgrupo: informeVenta.fkidgrupo,
        fkidsubgrupo: informeVenta.fkidsubgrupo,
        fkidtipoproducto: informeVenta.fkidtipoproducto,
        fkidmarca: informeVenta.fkidmarca,
        fkidproducto: informeVenta.fkidproducto,
    } ) . then ( ( result ) => {
        console.log(result)
        resultData( result );
        if ( result.response == 1 ) {
            C_Message( "success", "Servicio realizado exitosamente." );
        }
        return result;
    } );
};

export const InformeVentaServices = {
    onImprimir,
};
