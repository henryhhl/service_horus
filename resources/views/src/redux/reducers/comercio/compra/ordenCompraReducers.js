
import { Functions } from '../../../../utils/functions';
import { Strings } from '../../../constants';

const { cleanObejct } = Functions;

const initialState = {

    focusInput: false,
    update: false,
    imprimir: false,
    loading:  false,

    idordencompra: "",
    codigo: "",
    nrofactura: "",
    tipocambio: "",

    diasplazo: "",
    fechasolicitada: "",
    fechavencimiento: "",

    nota: "",
    tiposolicitud: "",

    iscompra: "",
    issolicitudcompra: "",

    cantidadtotal: "",
    montosubtotal: "",
    montototal: "",

    descuento: "",
    montodescuento: "",

    fletes: "",
    internacion: "",
    otrosgastos: "",

    fkidsucursal: "",
    sucursal: "",

    fkidalmacen: "",
    almacen: "",

    fkidconceptocompra: "",
    conceptocompra: "",

    fkidseccioninventario: "",
    seccioninventario: "",

    fkidproveedor: "",
    proveedor: "",

    fkidmoneda: "",
    moneda: "",

    fkidsolicitudcompra: "",

    arrayOrdenCompraDetalle: [],
    arrayDeleteOrdenCompraDetalle: [],

    isdelete: "",
    estado: "",
    fecha: "",
    hora: "",

    error: {
        codigo: false,
        nrofactura: false,
        tipocambio:  false,
        fechasolicitada: false,
        fkidsucursal: false,
        fkidalmacen: false,
        fkidconceptocompra: false,
        fkidseccioninventario: false,
        fkidproveedor: false,
        fkidmoneda: false,
    },
    message: {
        codigo: "",
        nrofactura: "",
        tipocambio:  "",
        fechasolicitada: "",
        fkidsucursal: "",
        fkidalmacen: "",
        fkidconceptocompra: "",
        fkidseccioninventario: "",
        fkidproveedor: "",
        fkidmoneda: "",
    },

    reporte: {
        arrayOrdenCompra: [],
        fecha: "",
        hora:  "",
    },
};

export const OrdenCompraCompraReducer = ( state = initialState, action = { payload, type} ) => {
    const { payload, type } = action;

    switch ( type ) {

        case Strings.ordencompra_onChange:
            state = Object.assign( {}, action.payload );
            return state;

        case Strings.ordencompra_onCreate:
            const { arrayConceptoCompra, arrayMoneda, arraySeccionInventario, arraySucursal } = payload;
            cleanObejct( state );
            state.idordencompra = action.payload.idordencompra;

            state.fechasolicitada   = Functions.dateToString( new Date() );
            state.diasplazo  = "0";
            state.tipocambio  = "6.95";
            state.tiposolicitud  = "L";
            state.fkidsolicitudcompra  = null;

            state.cantidadtotal = "0";
            state.montosubtotal = "0.00";
            state.montototal = "0.00";

            state.descuento = "0";
            state.montodescuento = "0.00";

            state.fletes = "0.00";
            state.internacion = "0.00";
            state.otrosgastos = "0.00";
            state.nrofactura = 0;

            state.iscompra = "N";
            state.issolicitudcompra = "N";
            
            state.fkidmoneda  = arrayMoneda.length == 0 ? "" : arrayMoneda[0].idmoneda;
            state.moneda      = arrayMoneda.length == 0 ? "" : arrayMoneda[0].descripcion;
            
            state.fkidconceptocompra = Functions.initValueServiceInArray( arrayConceptoCompra, "idconceptocompra" );
            state.conceptocompra     = Functions.initValueServiceInArray( arrayConceptoCompra, "descripcion" );
            
            state.fkidsucursal = Functions.initValueServiceInArray( arraySucursal, "idsucursal" );
            state.sucursal     = Functions.initValueServiceInArray( arraySucursal, "descripcion" );
            
            let arrayAlmacen = ( typeof state.fkidsucursal == "number" ) ? arraySucursal[0].arrayalmacen : [];
            
            state.fkidalmacen = Functions.initValueServiceInArray( arrayAlmacen, "idalmacen" );
            state.almacen = Functions.initValueServiceInArray( arrayAlmacen, "descripcion" );
            
            state.fkidseccioninventario = Functions.initValueServiceInArray( arraySeccionInventario, "idseccioninventario" );
            state.seccioninventario = Functions.initValueServiceInArray( arraySeccionInventario, "descripcion" );
            
            state.arrayOrdenCompraDetalle = loadDetailBuyOrder( state );

            state.loading = false;
            state = Object.assign( {}, state );
            return state;

        case Strings.ordencompra_onEditar:
            onSetData( state, action.payload.ordencompra );
            state.loading = false;
            state = Object.assign( {}, state );
            return state;

        case Strings.ordencompra_onShow:
            onSetData( state, action.payload.ordencompra );
            state.loading = false;
            state = Object.assign( {}, state );
            return state;

        case Strings.ordencompra_setLoad:
            cleanObejct( state );
            state.loading = true;
            state = Object.assign( {}, state );
            return state;

        case Strings.ordencompra_setLimpiar:
            cleanObejct( state );
            state = Object.assign( {}, state );
            return state;

        case Strings.ordencompra_setState:
            cleanObejct( state );
            onSetData( state, action.payload );
            state = Object.assign( {}, state );
            return state;

        case Strings.ordencompra_setImprimir: 
            return {
                ...state,
                reporte: action.payload,
            };

        case Strings.ordencompra_onFocus:
            state.focusInput = true;
            state = Object.assign( {}, state );
            return state;

        case Strings.ordencompra_offFocus:
            state.focusInput = false;
            state = Object.assign( {}, state );
            return state;
    
        default:
            return state;
    }
};

function onSetData( state, payload ) {
    state.idordencompra   = payload.idordencompra;
    
    state.codigo = payload.codigo;
    state.nrofactura = payload.nrofactura;
    state.tipocambio = parseFloat(payload.tipocambio).toFixed(2);
    state.fechasolicitada = Functions.convertYMDToDMY(payload.fechasolicitada);
    state.fechavencimiento = Functions.convertYMDToDMY(payload.fechavencimiento);
    state.diasplazo = parseInt(payload.diasplazo);

    state.nota = payload.nota;
    state.tiposolicitud = payload.tiposolicitud;

    state.iscompra = payload.iscompra;
    state.issolicitudcompra = payload.issolicitudcompra;

    state.cantidadtotal = parseInt(payload.cantidadtotal);
    state.montosubtotal = parseFloat(payload.montosubtotal).toFixed(2);
    state.montototal = parseFloat(payload.montototal).toFixed(2);

    state.fletes = parseFloat(payload.fletes).toFixed(2);
    state.internacion = parseFloat(payload.internacion).toFixed(2);
    state.otrosgastos = parseFloat(payload.otrosgastos).toFixed(2);

    state.descuento = parseInt(payload.descuento);
    state.montodescuento = parseFloat(payload.montodescuento).toFixed(2);

    state.fkidsucursal = payload.fkidsucursal;
    state.sucursal = payload.sucursal;

    state.fkidalmacen = payload.fkidalmacen;
    state.almacen = payload.almacen;

    state.fkidconceptocompra = payload.fkidconceptocompra;
    state.conceptocompra = payload.conceptocompra;

    state.fkidseccioninventario = payload.fkidseccioninventario;
    state.seccioninventario = payload.seccioninventario;

    state.fkidproveedor = payload.fkidproveedor;
    state.proveedor = payload.proveedor;

    state.fkidmoneda = payload.fkidmoneda;
    state.moneda = payload.moneda;
    
    state.fkidsolicitudcompra = payload.fkidsolicitudcompra;

    state.estado = payload.estado;
    state.isdelete = payload.isdelete;

    state.arrayOrdenCompraDetalle = setStateDetailsBuyOrder( payload.arrayordencompradetalle, state );
};

function loadDetailBuyOrder( state ) {
    let array = [];
    for ( let index = 0; index < 10; index++ ) {
        const element = defaultOrdenCompraDetalle( index, state );
        array = [ ...array, element];
    }
    return array;
};

function defaultOrdenCompraDetalle( index = 0, state = initialState, detalle = null ) {
    return {
        key: index,

        codigo: detalle ? detalle.codigo : "",
        producto: detalle ? detalle.producto : "",
        fkidproducto: detalle ? detalle.fkidproducto : null,
        unidadmedida: detalle ? `${parseFloat(detalle.valorequivalente).toFixed(2)} ${detalle.abreviatura}` :  "",

        fkidciudadorigen: detalle ? detalle.fkidciudadorigen : null,
        ciudadorigen: detalle ? detalle.ciudadorigen : "",

        fkidproductomarca: detalle ? detalle.fkidproductomarca : null,
        productomarca: detalle ? detalle.productomarca : "",

        fkidproductotipo: detalle ? detalle.fkidproductotipo : null,
        productotipo: detalle ? detalle.productotipo : "",

        fkidsucursal: detalle ? detalle.fkidsucursal : state.fkidsucursal,
        sucursal: detalle ? detalle.sucursal : state.sucursal,

        fkidalmacen: detalle ? detalle.fkidalmacen : state.fkidalmacen,
        almacen: detalle ? detalle.almacen : state.almacen,

        fkidproveedor: detalle ? detalle.fkidproveedor : state.fkidproveedor,
        proveedor: detalle ? detalle.proveedor : state.proveedor,

        fkidseccioninventario: detalle ? detalle.fkidseccioninventario : state.fkidseccioninventario,
        seccioninventario: detalle ? detalle.seccioninventario : state.seccioninventario,

        stockactual: detalle ? detalle.stockactual : "",
        cantidad: detalle ? detalle.cantidad : "",
        cantidadsolicitada: detalle ? detalle.cantidadsolicitada : "",

        costobase: detalle ? parseFloat( detalle.costobase ).toFixed(2) : "",
        costounitario: detalle ? parseFloat( detalle.costounitario ).toFixed(2) : "",
        costosubtotal: detalle ? parseFloat( detalle.costosubtotal ).toFixed(2) : "",

        descuento: detalle ? parseInt( detalle.descuento ) : "",
        montodescuento: detalle ? parseFloat( detalle.montodescuento ).toFixed(2) : "",

        peso: detalle ? parseFloat( detalle.peso ).toFixed(2) : "",
        pesosubtotal: detalle ? parseFloat( detalle.pesosubtotal ).toFixed(2) : "",

        volumen: detalle ? parseFloat( detalle.volumen ).toFixed(2) : "",
        volumensubtotal: detalle ? parseFloat( detalle.volumensubtotal ).toFixed(2) : "",

        fechasolicitada: detalle ? detalle.fechasolicitada : null,
        fsolicitada: detalle ? Functions.convertYMDToDMY( detalle.fechasolicitada ) : null,

        fechavencimiento: detalle ? detalle.fechavencimiento : null,
        fvencimiento: detalle ? Functions.convertYMDToDMY( detalle.fechavencimiento ) : null,

        nota: detalle ? detalle.nota : null,
        iscompra: detalle ? detalle.iscompra : "N",
        issolicitudcompra: detalle ? detalle.issolicitudcompra : "N",

        fkidordencompra: detalle ? detalle.fkidordencompra : null,
        fkidsolicitudcompradetalle: detalle ? detalle.fkidsolicitudcompradetalle : null,
        fkidsolicitudcompra: detalle ? detalle.fkidsolicitudcompra : null,
        idordencompradetalle: detalle ? detalle.idordencompradetalle : null,

        visible_producto: false,
        visible_sucursal: false,
        visible_almacen: false,
        visible_seccioninventario: false,

        errorcantidad: false,
        errorcostounitario: false,
    };
}

function setStateDetailsBuyOrder( arrayordencompradetalle, state ) {
    let array = [];
    for (let index = 0; index < arrayordencompradetalle.length; index++) {
        let detalle = arrayordencompradetalle[index];
        const element = defaultOrdenCompraDetalle( index, state, detalle );
        array = [ ...array, element];
    };
    return array;
};
