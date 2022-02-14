
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

    arrayUnidadMedidaProducto: [],
    arrayDeleteUnidadMedida: [],

    arrayProveedor: [],
    arrayDeleteProveedor: [],

    imagen: "",
    extension: "",

    arrayListaPrecio: [],

    estado: "",
    fecha: "",
    hora: "",

    error: {
        codigo:  false,
        nombre:  false,
        abreviatura: false,
        fkidciudadorigen: false,
        fkidcategoria: false,
        fkidproductotipo: false,
        fkidproductogrupo: false,
        fkidproductosubgrupo: false,
        fkidunidadmedida: false,
        fkidproductomarca: false,
    },
    message: {
        codigo:  "",
        nombre:  "",
        abreviatura: "",
        fkidciudadorigen: "",
        fkidcategoria: "",
        fkidproductotipo: "",
        fkidproductogrupo: "",
        fkidproductosubgrupo: "",
        fkidunidadmedida: "",
        fkidproductomarca: "",
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

            let arrayProductoTipo = action.payload.arrayProductoTipo;
            state.fkidproductotipo = arrayProductoTipo.length === 0 ? "" : arrayProductoTipo[0].idproductotipo;
            state.productotipo     = arrayProductoTipo.length === 0 ? "" : arrayProductoTipo[0].descripcion;

            state.arrayUnidadMedidaProducto = loadUnidadMedida();
            state.arrayProveedor = loadProveedor();

            // let arrayUnidadMedidaProducto = action.payload.arrayUnidadMedidaProducto;

            // state.arrayUnidadMedidaProducto[0].fkidunidadmedida =  arrayUnidadMedidaProducto.length === 0 ? null : arrayUnidadMedidaProducto[0].idunidadmedida;
            // state.arrayUnidadMedidaProducto[0].unidadmedida =  arrayUnidadMedidaProducto.length === 0 ? "" : arrayUnidadMedidaProducto[0].descripcion;

            state.loading = false;
            state.nivel = "0";
            state.stockactual = 0;
            state.estado = "A";
            state = Object.assign( {}, state );
            return state;

        case Strings.producto_onEditar:
            onSetData( state, action.payload.producto );
            state.loading = false;
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

    state.fkidciudadorigen = payload.fkidciudadorigen;
    state.ciudadorigen = payload.ciudadorigen;

    state.fkidcategoria = payload.fkidcategoria;
    state.categoria = payload.categoria;

    state.fkidproductomarca = payload.fkidproductomarca;
    state.productomarca = payload.productomarca;

    state.fkidproductotipo = payload.fkidproductotipo;
    state.productotipo = payload.productotipo;

    state.fkidproductogrupo = payload.fkidproductogrupo;
    state.productogrupo = payload.productogrupo;

    state.fkidproductosubgrupo = payload.fkidproductosubgrupo;
    state.productosubgrupo = payload.productosubgrupo;

    state.imagen = payload.imagen;
    state.extension = payload.extension;

    state.estado = payload.estado;

    let array = [];
    for ( let index = 0; index < payload.unidadmedidaproducto.length; index++ ) {
        let detalle = payload.unidadmedidaproducto[index];
        let element = {
            idunidadmedidaproducto: detalle.idunidadmedidaproducto,
            codigo: detalle.codigo,
            fkidunidadmedida: detalle.fkidunidadmedida,
            unidadmedida: detalle.unidadmedida,
            peso: parseFloat( detalle.peso ).toFixed(2),
            valorequivalente: parseFloat( detalle.valorequivalente ).toFixed(2),
            volumen: parseFloat( detalle.volumen ).toFixed(2),
            stock: parseInt( detalle.stock ),
            costo: parseFloat( detalle.costo ).toFixed(2),
            costounitario: parseFloat( detalle.costounitario ).toFixed(2),
            costodescuento: parseFloat( detalle.costodescuento ).toFixed(2),
            costomontodescuento: parseFloat( detalle.costomontodescuento ).toFixed(2),
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

    if ( array.length === 0 ) {
        let element = {
            idunidadmedidaproducto: null,
            codigo: null,
            fkidunidadmedida: null,
            unidadmedida: "",
            valorequivalente: "0.00",
            peso: "0.00",
            volumen: "0.00",
            stock: "0",
            costo: "0.00",
            costodescuento: "0",
            costomontodescuento: "0.00",
            costounitario: "0.00",
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
    state.arrayUnidadMedidaProducto = array;

    array = [];
    for ( let index = 0; index < payload.proveedorproducto.length; index++ ) {
        let element = {
            idproveedorproducto: payload.proveedorproducto[index].idproveedorproducto,
            fkidproveedor: payload.proveedorproducto[index].fkidproveedor,
            proveedor: payload.proveedorproducto[index].proveedor,
            costounitario: parseFloat( payload.proveedorproducto[index].costounitario ).toFixed(2),
            stock: payload.proveedorproducto[index].stock,
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

};

function loadDetailPriceList( listaPrecio = [] ) {
    let array = [];
    for ( let index = 0; index < listaPrecio.length; index++ ) {
        const element = {
            key: index,
            codigo: "",
            idlistaprecio: listaPrecio[index].idlistaprecio,
            fkidmoneda: "",
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
