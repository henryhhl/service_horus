
import { Functions } from '../../../../utils/functions';
import { Strings } from '../../../constants';

const { cleanObejct } = Functions;

const initialState = {

    focusInput: false,
    update: false,
    imprimir: false,
    loading:  false,

    idproducto: "",
    codigo: "",
    nombre: "",
    descripcion: "",
    abreviatura: "",
    stockactual: "",
    nivel: "",
    valorequivalente: "",
    peso: "",
    volumen: "",
    costobase: "",
    costodescuento: "",
    costomontodescuento: "",
    costounitario: "",

    fkidciudadorigen: "",
    ciudadorigen: "",

    fkidcategoria: "",
    categoria: "",

    fkidproductomarca: "",
    productomarca: "",

    fkidproductotipo: "",
    productotipo: "",

    fkidproductogrupo: "",
    productogrupo: "",

    fkidproductosubgrupo: "",
    productosubgrupo: "",

    fkidunidadmedida: "",
    unidadmedida: "",

    arraySucursalAlmacen: [],

    arrayUnidadMedidaProducto: [],
    arrayDeleteUnidadMedida: [],

    arrayProveedor: [],
    arrayDeleteProveedor: [],

    imagen: "",
    extension: "",

    arrayListaPrecio: [],

    estado: "",
    isventa: "",
    fecha: "",
    hora: "",

    error: {
        codigo:  false,
        nombre:  false,
        abreviatura: false,
        valorequivalente: false,
        peso: false,
        volumen: false,
        costobase: false,
        costodescuento: false,
        costomontodescuento: false,
        costounitario: false,
        fkidciudadorigen: false,
        fkidcategoria: false,
        fkidproductotipo: false,
        fkidproductogrupo: false,
        fkidproductosubgrupo: false,
        fkidunidadmedida: false,
        fkidproductomarca: false,
        fkidunidadmedida: false,
    },
    message: {
        codigo:  "",
        nombre:  "",
        abreviatura: "",
        valorequivalente: "",
        peso: "",
        volumen: "",
        costobase: "",
        costodescuento: "",
        costomontodescuento: "",
        costounitario: "",
        fkidciudadorigen: "",
        fkidcategoria: "",
        fkidproductotipo: "",
        fkidproductogrupo: "",
        fkidproductosubgrupo: "",
        fkidunidadmedida: "",
        fkidproductomarca: "",
        fkidunidadmedida: "",
    },

    reporte: {
        arrayProducto: [],
        fecha: "",
        hora:  "",
    },
};

export const ProductoReducer = ( state = initialState, action = { payload, type} ) => {

    switch ( action.type ) {

        case Strings.producto_onChange:
            state = Object.assign( {}, action.payload );
            return state;

        case Strings.producto_onCreate:
            cleanObejct( state );
            state.idproducto = action.payload.idproducto;
            state.arrayListaPrecio = loadDetailPriceList(action.payload.arrayListaPrecio);
            state.arraySucursalAlmacen = loadDetailSucursalAlmacen(action.payload.arraySucursal);

            let arrayProductoTipo = action.payload.arrayProductoTipo;
            state.fkidproductotipo = arrayProductoTipo.length === 0 ? "" : arrayProductoTipo[0].idproductotipo;
            state.productotipo     = arrayProductoTipo.length === 0 ? "" : arrayProductoTipo[0].descripcion;

            // state.arrayUnidadMedidaProducto = loadUnidadMedida();
            state.arrayProveedor = loadProveedor();

            // let arrayUnidadMedidaProducto = action.payload.arrayUnidadMedidaProducto;

            // state.arrayUnidadMedidaProducto[0].fkidunidadmedida =  arrayUnidadMedidaProducto.length === 0 ? null : arrayUnidadMedidaProducto[0].idunidadmedida;
            // state.arrayUnidadMedidaProducto[0].unidadmedida =  arrayUnidadMedidaProducto.length === 0 ? "" : arrayUnidadMedidaProducto[0].descripcion;

            state.loading = false;
            state.nivel = 0;
            state.stockactual = 0;
            state.valorequivalente = 0;

            state.peso = 0;
            state.volumen = 0;

            state.costobase = 0;
            state.costodescuento = 0;
            state.costomontodescuento = 0;
            state.costounitario = 0;

            state.estado = "A";
            state.isventa = 'A';

            state = Object.assign( {}, state );
            return state;

        case Strings.producto_onEditar:
            onSetData( state, action.payload );
            state.update = true;
            state = Object.assign( {}, state );
            return state;

        case Strings.producto_onShow:
            onSetData( state, action.payload.producto );
            state.loading = false;
            state = Object.assign( {}, state );
            return state;

        case Strings.producto_setLoad:
            cleanObejct( state );
            state.loading = true;
            state = Object.assign( {}, state );
            return state;

        case Strings.producto_setLimpiar:
            cleanObejct( state );
            state.arrayUnidadMedidaProducto = loadUnidadMedida( false );
            state.arrayProveedor = loadProveedor();
            state = Object.assign( {}, state );
            return state;

        case Strings.producto_updateListaPrecio:
            state.arrayListaPrecio = updateListaPrecio( action.payload, state );
            state = Object.assign( {}, state );
            return state;

        case Strings.producto_updateSucursalAlmacen:
            state.arraySucursalAlmacen = updateSucursalAlmacen( action.payload.producto.arrayalmacenproductodetalle, action.payload.arraySucursal );
            state = Object.assign( {}, state );
            return state;

        case Strings.producto_setState:
            cleanObejct( state );
            onSetData( state, action.payload );
            state = Object.assign( {}, state );
            return state;

        case Strings.producto_setImprimir:
            return {
                ...state,
                reporte: action.payload,
            };

        case Strings.producto_onFocus:
            state.focusInput = true;
            state = Object.assign( {}, state );
            return state;

        case Strings.producto_offFocus:
            state.focusInput = false;
            state = Object.assign( {}, state );
            return state;

        default:
            return state;
    }
};

function onSetData( state, payload ) {

    state.idproducto   = payload.idproducto;

    state.codigo = payload.codigo;
    state.nombre = payload.nombre;
    state.descripcion = payload.descripcion;
    state.abreviatura = payload.abreviatura;
    state.stockactual = payload.stockactual;
    state.nivel = payload.nivel;
    state.valorequivalente = parseFloat( payload.valorequivalente ).toFixed(2);
    state.peso = parseFloat( payload.peso ).toFixed(2);
    state.volumen = parseFloat( payload.volumen ).toFixed(2);
    state.costobase = parseFloat( payload.costobase ).toFixed(2);
    state.costodescuento = payload.costodescuento;
    state.costomontodescuento = parseFloat( payload.costomontodescuento ).toFixed(2);
    state.costounitario = parseFloat( payload.costounitario ).toFixed(2);

    state.fkidciudadorigen = payload.fkidciudadorigen;
    state.ciudadorigen = payload.ciudadorigen;

    state.fkidcategoria = payload.fkidcategoria;
    state.categoria = payload.categoria;

    state.fkidproductomarca = payload.fkidproductomarca;
    state.productomarca = payload.productomarca;

    state.fkidproductotipo = payload.fkidproductotipo;
    state.productotipo = payload.productotipo;

    state.fkidunidadmedida = payload.fkidunidadmedida;
    state.unidadmedida = payload.unidadmedida;

    state.fkidproductogrupo = payload.fkidproductogrupo;
    state.productogrupo = payload.productogrupo;

    state.fkidproductosubgrupo = payload.fkidproductosubgrupo;
    state.productosubgrupo = payload.productosubgrupo;

    state.imagen = payload.imagen;
    state.extension = payload.extension;

    state.estado = payload.estado;
    state.isventa = payload.isventa;

    let arraySucursalAlmacen = [];
    let idsucursal = null;
    for (let pos = 0; pos < payload.arrayalmacenproductodetalle.length; pos++) {
        let data = payload.arrayalmacenproductodetalle[pos];
        if ( data.idsucursal != idsucursal ) {
            let sucursal = {
                idsucursal: data.idsucursal,
                sucursal: data.sucursal,
                arrayalmacen: [],
            };
            arraySucursalAlmacen.push(sucursal);
            idsucursal = data.idsucursal;
        }
        let almacen = {
            idalmacen: data.idalmacen,
            fkidalmacen: data.fkidalmacen,
            almacen: data.almacen,
            direccion: data.direccion,
            idalmacenproductodetalle: data.idalmacenproductodetalle,
            fkidproducto: data.fkidproducto,
            compras: data.compras,
            ingresos: data.ingresos,
            salidas: data.salidas,
            traspasos: data.traspasos,
            ventas: data.ventas,
            stockactual: data.stockactual,
            stockmaximo: data.stockmaximo,
            stockminimo: data.stockminimo,
            disabled: true,
            checked: true,
        };
        arraySucursalAlmacen[arraySucursalAlmacen.length - 1].arrayalmacen.push(almacen);
    }
    state.arraySucursalAlmacen = arraySucursalAlmacen;

    let array = [];
    for ( let index = 0; index < payload.arrayproveedorproducto.length; index++ ) {
        let element = {
            idproveedorproducto: payload.arrayproveedorproducto[index].idproveedorproducto,
            fkidproveedor: payload.arrayproveedorproducto[index].fkidproveedor,
            proveedor: payload.arrayproveedorproducto[index].proveedor,
            costounitario: parseFloat( payload.arrayproveedorproducto[index].costounitario ).toFixed(2),
            stock: payload.arrayproveedorproducto[index].stock,
        };
        array = [ ...array, element];
    }

    if ( array.length === 0 ) {
        let element = {
            idproveedorproducto: null,
            fkidproveedor: null,
            proveedor: "",
            costounitario: 0,
            stock: 0,
        };
        array = [ ...array, element];
    }
    state.arrayProveedor = array;

    array = [];
    for (let index = 0; index < payload.arraylistapreciodetalle.length; index++) {
        const detalle = payload.arraylistapreciodetalle[index];
        const element = {
            key: index,
            nro: index,
            abreviatura: detalle.abreviatura,
            descripcion: detalle.listaprecio,
            codigo: detalle.codigo,
            accion: detalle.accion,
            valor: parseInt(detalle.valor),
            fkidlistaprecio: detalle.fkidlistaprecio,
            idlistapreciodetalle: detalle.idlistapreciodetalle,
            fkidproducto: detalle.fkidproducto,
            fkidmoneda: detalle.fkidmoneda,
            preciobase: parseFloat(detalle.preciobase).toFixed(2),
            preciopivote: parseFloat(detalle.preciopivote).toFixed(2),
            descuento: parseInt(detalle.descuento),
            montodescuento: parseFloat(detalle.montodescuento).toFixed(2),
            precioventa: parseFloat(detalle.precioventa).toFixed(2),
            nota: detalle.nota,
        };
        array = [ ...array, element];
    }
    state.arrayListaPrecio = array;

};

function loadDetailPriceList( listaPrecio = [] ) {
    let array = [];
    for ( let index = 0; index < listaPrecio.length; index++ ) {
        const element = {
            key: index,
            nro: index,
            abreviatura: listaPrecio[index].abreviatura,
            descripcion: listaPrecio[index].descripcion,
            codigo: listaPrecio[index].codigo,
            accion: listaPrecio[index].accion,
            valor: parseInt(listaPrecio[index].valor),
            fkidlistaprecio: listaPrecio[index].idlistaprecio,
            idlistapreciodetalle: null,
            fkidproducto: null,
            fkidmoneda: null,
            preciobase: "0.00",
            preciopivote: "0.00",
            descuento: "0",
            montodescuento: "0.00",
            precioventa: "0.00",
            nota: "",
        };
        array = [ ...array, element];
    }
    return array;
};

function loadDetailSucursalAlmacen( arraySucursal = [] ) {
    let array = [];
    for ( let index = 0; index < arraySucursal.length; index++ ) {
        let sucursales = arraySucursal[index];
        sucursales.key = index;
        sucursales.nro = index;
        sucursales.sucursal = sucursales.descripcion;
        for (let pos = 0; pos < sucursales.arrayalmacen.length; pos++) {
            let almacen = sucursales.arrayalmacen[pos];
            almacen.key = pos;
            almacen.nro = pos;
            almacen.almacen = almacen.descripcion;
            almacen.fkidalmacen = almacen.idalmacen;
            almacen.stockactual = 0;
            almacen.stockminimo = 0;
            almacen.stockmaximo = 0;
            almacen.checked = false;
            almacen.disabled = false;
            almacen.idalmacenproductodetalle = null;
        }
        array = [ ...array, sucursales];
    }
    if ( array.length === 1 ) {
        if ( array[0].arrayalmacen.length === 1 ) {
            array[0].arrayalmacen[0].checked = true;
        }
    }
    return array;
};

function loadUnidadMedida( bandera = true ) {
    let array = [];
    for (let index = 0; index < 1; index++) {
        const element = {
            idunidadmedidaproducto: null,
            codigo: null,
            fkidunidadmedida: null,
            unidadmedida: "",
            peso: ( bandera ) ? "0.00" : "",
            valorequivalente: ( bandera ) ? "0.00" : "",
            volumen: ( bandera ) ? "0.00" : "",
            stock: ( bandera ) ? "0" : "",
            costo: ( bandera ) ? "0.00" : "",
            costodescuento: ( bandera ) ? "0" : "",
            costomontodescuento: ( bandera ) ? "0.00" : "",
            costounitario: ( bandera ) ? "0.00" : "",
            error: {
                codigo: false,
                fkidunidadmedida: false,
            },
            message: {
                codigo: "",
                fkidunidadmedida: "",
            },
        };
        array = [ ...array, element];
    }
    return array;
};

function loadProveedor( ) {
    let array = [];
    for (let index = 0; index < 2; index++) {
        const element = {
            idproveedorproducto: null,
            fkidproveedor: null,
            proveedor: "",
            costounitario: 0,
            stock: 0,
        };
        array = [ ...array, element];
    }
    return array;
};

function existsIDListaPrecio( arrayListaPrecio, fkidlistaprecio ) {
    for (let index = 0; index < arrayListaPrecio.length; index++) {
        const element = arrayListaPrecio[index];
        if ( element.fkidlistaprecio == fkidlistaprecio ) return true;
    }
    return false;
}

function updateListaPrecio( array, state ) {
    for ( let index = 0; index < array.length; index++ ) {
        const element = array[index];
        if ( !existsIDListaPrecio( state.arrayListaPrecio, element.idlistaprecio ) ) {
            let costounitario = state.costounitario;
            let montodescuento = parseFloat( ( element.valor*1/100 ) * costounitario ).toFixed(2);
            let precioventa = 0;
            if ( element.accion == 'I' ) {
                precioventa = parseFloat( costounitario*1 + montodescuento*1 ).toFixed(2);
            } else {
                precioventa = parseFloat( costounitario*1 - montodescuento*1 ).toFixed(2);
            }
            const detalle = {
                key: state.arrayListaPrecio.length,
                nro: state.arrayListaPrecio.length,
                abreviatura: element.abreviatura,
                descripcion: element.descripcion,
                codigo: element.codigo,
                accion: element.accion,
                valor: parseInt(element.valor),
                fkidlistaprecio: element.idlistaprecio,
                idlistapreciodetalle: null,
                fkidproducto: state.idproducto,
                fkidmoneda: null,
                preciobase: costounitario,
                preciopivote: costounitario,
                descuento: parseInt(element.valor),
                montodescuento: montodescuento,
                precioventa: precioventa,
                nota: "",
            };
            state.arrayListaPrecio = [ ...state.arrayListaPrecio, detalle];
        }
    }
    return state.arrayListaPrecio;
}

function firstIDAlmacen( arrayAlmacen, fkidalmacen ) {
    for (let index = 0; index < arrayAlmacen.length; index++) {
        const element = arrayAlmacen[index];
        if ( element.idalmacen == fkidalmacen ) return element;
    }
    return null;
}

function updateSucursalAlmacen( arrayalmacenproductodetalle, arraySucursal ) {
    let array = [];
    for ( let index = 0; index < arraySucursal.length; index++ ) {
        let sucursales = arraySucursal[index];
        sucursales.key = index;
        sucursales.nro = index;
        sucursales.sucursal = sucursales.descripcion;
        for (let pos = 0; pos < sucursales.arrayalmacen.length; pos++) {
            let almacen = sucursales.arrayalmacen[pos];
            almacen.key = pos;
            almacen.nro = pos;
            almacen.almacen = almacen.descripcion;
            almacen.fkidalmacen = almacen.idalmacen;
            almacen.stockactual = 0;
            almacen.stockminimo = 0;
            almacen.stockmaximo = 0;
            almacen.checked = false;
            almacen.disabled = false;
            almacen.idalmacenproductodetalle = null;
            let almacenFirst = firstIDAlmacen( arrayalmacenproductodetalle, almacen.idalmacen );
            if ( almacenFirst != null ) {
                almacen.stockactual = almacenFirst.stockactual;
                almacen.stockminimo = almacenFirst.stockminimo;
                almacen.stockmaximo = almacenFirst.stockmaximo;
                almacen.idalmacenproductodetalle = almacenFirst.idalmacenproductodetalle;
                almacen.checked = true;
            }
        }
        array = [ ...array, sucursales];
    }
    return array;
}
