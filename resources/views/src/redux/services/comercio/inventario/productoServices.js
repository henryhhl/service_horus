
import { C_Message } from "../../../../components";

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

const getAllProduct = async ( ) => {
    return await httpRequest( 'get', webservices.wscomercioinventarioproducto_index, {
        esPaginado: 0,
    } ) . then ( ( result ) => {
        resultData( result );
        if ( result.response == 1 ) {
            C_Message( "success", "Servicio realizado exitosamente." );
        }
        console.log(result)
        return result;
    } );
};

const getData = async ( page = 1, nroPagination = 1, search = "" ) => {
    return httpRequest( 'get', webservices.wscomercioinventarioproducto_index + '?page=' + page, {
        paginate: nroPagination,
        orderBy: 'asc',
        search: search,
    } ) . then ( ( result ) => {
        resultData( result );

        if ( result.response == 1 ) {
            C_Message( "success", "Servicio realizado exitosamente." );
        }
        console.log(result)
        return result;
    } );
};

const onCreate = async () => {

    return httpRequest( 'get', webservices.wscomercioinventarioproducto_create, {

    } ) . then ( ( result ) => {
        console.log( result )
        resultData( result );

        if ( result.response == 1 ) {
            C_Message( "success", "Servicio realizado exitosamente." );
        }
        return result;
    } );

};

const onGrabar = async ( producto ) => {
    return httpRequest( "post", webservices.wscomercioinventarioproducto_store, {
        abreviatura:  producto.abreviatura,
        codigo:  producto.codigo,
        nombre:  producto.nombre,
        descripcion:  producto.descripcion,
        stockactual:  producto.stockactual,
        nivel:  producto.nivel,
        imagen:  producto.imagen,
        extension:  producto.extension,
        estado:  producto.estado,
        isventa: producto.isventa,
        valorequivalente: producto.valorequivalente,
        peso: producto.peso,
        volumen: producto.volumen,
        costobase: producto.costobase,
        costodescuento: producto.costodescuento,
        costomontodescuento: producto.costomontodescuento,
        costounitario: producto.costounitario,
        fkidciudadorigen:  producto.fkidciudadorigen,
        fkidcategoria:  producto.fkidcategoria,
        fkidproductomarca:  producto.fkidproductomarca,
        fkidproductotipo:  producto.fkidproductotipo,
        fkidproductogrupo:  producto.fkidproductogrupo,
        fkidproductosubgrupo:  producto.fkidproductosubgrupo,
        fkidunidadmedida:  producto.fkidunidadmedida,
        arrayProveedor: JSON.stringify(producto.arrayProveedor),
        arrayListaPrecio: JSON.stringify(producto.arrayListaPrecio),
        arraySucursalAlmacen: JSON.stringify(producto.arraySucursalAlmacen),
    } ) . then ( ( result ) => {
        resultData( result );

        if ( result.response == 0 ) {
            C_Message( "warning", result.message );
            var errors = result.errors;
            for (let index in errors) {
                producto.error[index] = true;
                producto.message[index] = errors[index][0];
            }
            result.resultData = producto;
        }

        if ( result.response == 1 ) {
            C_Message( "success", result.message );
        }
        console.log(result)
        return result;
    } );
};

const onEdit = async ( idproducto ) => {
    return httpRequest( "get", webservices.wscomercioinventarioproducto_editar + "/" + idproducto, {
        idproducto: idproducto,
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

const onUpdate = async ( producto ) => {
    return httpRequest( "post", webservices.wscomercioinventarioproducto_update, {
        idproducto: producto.idproducto,
        abreviatura:  producto.abreviatura,
        codigo:  producto.codigo,
        nombre:  producto.nombre,
        descripcion:  producto.descripcion,
        stockactual:  producto.stockactual,
        nivel:  producto.nivel,
        imagen:  producto.imagen,
        extension:  producto.extension,
        estado:  producto.estado,
        isventa: producto.isventa,
        valorequivalente: producto.valorequivalente,
        peso: producto.peso,
        volumen: producto.volumen,
        costobase: producto.costobase,
        costodescuento: producto.costodescuento,
        costomontodescuento: producto.costomontodescuento,
        costounitario: producto.costounitario,
        fkidciudadorigen:  producto.fkidciudadorigen,
        fkidcategoria:  producto.fkidcategoria,
        fkidproductomarca:  producto.fkidproductomarca,
        fkidproductotipo:  producto.fkidproductotipo,
        fkidproductogrupo:  producto.fkidproductogrupo,
        fkidproductosubgrupo:  producto.fkidproductosubgrupo,
        fkidunidadmedida:  producto.fkidunidadmedida,
        arrayProveedor: JSON.stringify(producto.arrayProveedor),
        arrayDeleteProveedor: JSON.stringify(producto.arrayDeleteProveedor),
        arrayListaPrecio: JSON.stringify(producto.arrayListaPrecio),
        arraySucursalAlmacen: JSON.stringify(producto.arraySucursalAlmacen),
    } ) . then ( ( result ) => {
        resultData( result );
        if ( result.response == 0 ) {
            C_Message( "warning", result.message );
            var errors = result.errors;
            for (let index in errors) {
                producto.error[index] = true;
                producto.message[index] = errors[index][0];
            }
            result.resultData = producto;
        }
        if ( result.response == 1 ) {
            C_Message( "success", result.message );
        }
        console.log(result)
        return result;
    } );
};

const onDelete = async ( producto ) => {
    return httpRequest( "post", webservices.wscomercioinventarioproducto_delete, {
        idproducto: producto.idproducto,
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

const onShow = async ( idproducto ) => {
    return httpRequest( "get", webservices.wscomercioinventarioproducto_show + "/" + idproducto, {
        idproducto: idproducto,
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

const onSearchData = async ( producto ) => {
    return httpRequest( 'get', webservices.wscomercioinventarioproducto_searchByID, {
        idproducto: producto.idproducto
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
    return httpRequest( "post", webservices.wscomercioinventarioproducto_reporte, {

    } ) . then ( ( result ) => {
        resultData( result );
        if ( result.response == 1 ) {
            C_Message( "success", "Servicio realizado exitosamente." );
        }
        return result;
    } );
};

export const ProductoServices = {
    getAllProduct,
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
