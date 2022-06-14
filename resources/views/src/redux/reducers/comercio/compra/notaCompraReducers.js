
import { Functions } from '../../../../utils/functions';
import { Strings } from '../../../constants';

const { cleanObejct } = Functions;

const initialState = {

    focusInput: false,
    update: false,
    imprimir: false,
    loading:  false,

    idnotacompra: "",
    codigo: "",
    nrofactura: "",
    nrorefprov: "",

    tipocambio: "",
    tipomoneda: "",
    impuesto: "",

    diascredito: "",
    fechanotacompra: "",
    fechavencimiento: "",

    nota: "",
    tipocompra: "",

    isordencompra: "",
    issolicitudcompra: "",

    cantidadtotal: "",
    montosubtotal: "",
    descuento: "",
    montodescuento: "",
    montototal: "",
    impuestototal: "",

    volumentotal: "",
    pesototal: "",

    fletes: "",
    internacion: "",
    otrosgastos: "",
    nrocajastotal: "",

    fkidsucursal: "",
    sucursal: "",

    fkidalmacen: "",
    almacen: "",

    fkidconceptocompra: "",
    conceptocompra: "",

    fkidproveedor: "",
    proveedor: "",

    fkidmoneda: "",
    moneda: "",

    fkidordencompra: "",

    arrayNotaCompraDetalle: [],
    arrayDeleteNotaCompraDetalle: [],

    isdevolucioncompra: "",
    isordencompra: "",
    issolicitudcompra: "",
    esingresado: "",

    isdelete: "",
    estado: "",
    fecha: "",
    hora: "",

    nombrerazonsocial: "",
    nitproveedor: "",
    nroautorizacion: "",
    codigocontrol: "",
    fechafactura: "",

    error: {
        codigo: false,
        nrofactura: false,
        nrorefprov: false,
        tipocambio:  false,
        fechanotacompra: false,
        fkidsucursal: false,
        fkidalmacen: false,
        fkidconceptocompra: false,
        fkidproveedor: false,
        fkidmoneda: false,
    },
    message: {
        codigo: "",
        nrofactura: "",
        nrorefprov: "",
        tipocambio:  "",
        fechanotacompra: "",
        fkidsucursal: "",
        fkidalmacen: "",
        fkidconceptocompra: "",
        fkidproveedor: "",
        fkidmoneda: "",
    },

    reporte: {
        arrayNotaCompra: [],
        fecha: "",
        hora:  "",
    },
};

export const NotaCompraCompraReducer = ( state = initialState, action = { payload, type} ) => {
    const { payload, type } = action;

    switch ( type ) {

        case Strings.notacompra_onChange:
            state = Object.assign( {}, action.payload );
            return state;

        case Strings.notacompra_onCreate:
            const { arrayConceptoCompra, arrayMoneda, arraySeccionInventario, arraySucursal } = payload;
            cleanObejct( state );
            state.idnotacompra = action.payload.idnotacompra;

            state.fechanotacompra   = Functions.dateToString( new Date() );
            state.fechafactura   = Functions.dateToString( new Date() );
            state.tipocambio  = "6.95";
            state.diascredito  = "0";

            state.tipocompra  = "L";
            state.tipomoneda = 'N';
            state.impuesto = '13.00';
            state.impuestototal = '0.00';
            state.nrofactura = 0;

            state.fkidordencompra  = null;

            state.cantidadtotal = "0";
            state.montosubtotal = "0.00";
            state.descuento = '0';
            state.montodescuento = '0.00';
            state.montototal = "0.00";

            state.volumentotal = '0.00';
            state.pesototal = '0.00';

            state.fletes = "0.00";
            state.internacion = "0.00";
            state.otrosgastos = "0.00";
            state.nrocajastotal = '0';
            
            state.isdevolucioncompra = "N";
            state.isordencompra = "N";
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
            
            state.arrayNotaCompraDetalle = loadDetailBuyNote( state );

            state.loading = false;
            state = Object.assign( {}, state );
            return state;

        case Strings.notacompra_onEditar:
            onSetData( state, action.payload.notacompra );
            state.loading = false;
            state = Object.assign( {}, state );
            return state;

        case Strings.notacompra_onShow:
            onSetData( state, action.payload.notacompra );
            state.loading = false;
            state = Object.assign( {}, state );
            return state;

        case Strings.notacompra_setLoad:
            cleanObejct( state );
            state.loading = true;
            state = Object.assign( {}, state );
            return state;

        case Strings.notacompra_setLimpiar:
            cleanObejct( state );
            state = Object.assign( {}, state );
            return state;

        case Strings.notacompra_setState:
            cleanObejct( state );
            onSetData( state, action.payload );
            state = Object.assign( {}, state );
            return state;

        case Strings.notacompra_setImprimir: 
            return {
                ...state,
                reporte: action.payload,
            };

        case Strings.notacompra_onFocus:
            state.focusInput = true;
            state = Object.assign( {}, state );
            return state;

        case Strings.notacompra_offFocus:
            state.focusInput = false;
            state = Object.assign( {}, state );
            return state;
    
        default:
            return state;
    }
};

function onSetData( state, payload ) {
    state.idnotacompra   = payload.idnotacompra;
    
    state.codigo = payload.codigo;
    state.nrorefprov = payload.nrorefprov,

    state.tipocambio = parseFloat(payload.tipocambio).toFixed(2);
    state.fechanotacompra = Functions.convertYMDToDMY(payload.fechanotacompra);
    state.fechavencimiento = Functions.convertYMDToDMY(payload.fechavencimiento);
    state.diascredito = parseInt(payload.diascredito);

    state.nota = payload.nota;
    state.tipocompra = payload.tipocompra;
    state.tipomoneda = payload.tipomoneda;
    state.impuesto = parseFloat(payload.impuesto).toFixed(2);
    state.impuestototal = parseFloat(payload.impuestototal).toFixed(2);

    state.cantidadtotal = parseInt(payload.cantidadtotal);
    state.montosubtotal = parseFloat(payload.montosubtotal).toFixed(2);
    state.descuento = parseInt(payload.descuento);
    state.montodescuento = parseFloat(payload.montodescuento).toFixed(2);
    state.montototal = parseFloat(payload.montototal).toFixed(2);

    state.volumentotal = parseFloat(payload.volumentotal).toFixed(2);
    state.pesototal = parseFloat(payload.pesototal).toFixed(2);

    state.fletes = parseFloat(payload.fletes).toFixed(2);
    state.internacion = parseFloat(payload.internacion).toFixed(2);
    state.otrosgastos = parseFloat(payload.otrosgastos).toFixed(2);
    state.nrocajastotal = parseInt(payload.nrocajastotal);

    state.fkidsucursal = payload.fkidsucursal;
    state.sucursal = payload.sucursal;

    state.fkidalmacen = payload.fkidalmacen;
    state.almacen = payload.almacen;

    state.fkidconceptocompra = payload.fkidconceptocompra;
    state.conceptocompra = payload.conceptocompra;

    state.fkidproveedor = payload.fkidproveedor;
    state.proveedor = payload.proveedor;

    state.fkidmoneda = payload.fkidmoneda;
    state.moneda = payload.moneda;
    
    state.fkidordencompra = payload.fkidordencompra;

    state.estado = payload.estado;
    state.isdelete = payload.isdelete;

    state.issolicitudcompra = payload.issolicitudcompra;
    state.isordencompra = payload.isordencompra;
    state.isdevolucioncompra = payload.isdevolucioncompra;
    state.esingresado = payload.esingresado;

    state.nrofactura = payload.nrofactura;
    state.fechafactura = Functions.convertYMDToDMY(payload.fechafactura);
    state.nombrerazonsocial = payload.nombrerazonsocial;
    state.nitproveedor = payload.nitproveedor;
    state.nroautorizacion = payload.nroautorizacion;
    state.codigocontrol = payload.codigocontrol;

    state.arrayNotaCompraDetalle = setStateDetailsBuyNote( payload.arraynotacompradetalle, state );
};

function loadDetailBuyNote( state ) {
    let array = [];
    for ( let index = 0; index < 10; index++ ) {
        const element = defaultNotaCompraDetalle( index, state );
        array = [ ...array, element];
    }
    return array;
};

function defaultNotaCompraDetalle( index = 0, state = initialState, detalle = null ) {
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

        fkidseccioninventario: null,
        seccioninventario: "",

        cantidad: detalle ? detalle.cantidad : "",
        cantidadsolicitada: detalle ? detalle.cantidadsolicitada : "",
        cantidadrecibida: detalle ? detalle.cantidadrecibida : "",
        cantidadfaltante: detalle ? detalle.cantidadfaltante : "",
        cantidadsobrante: detalle ? detalle.cantidadsobrante : "",
        nrocajas: detalle ? detalle.nrocajas : "",

        descuento: detalle ? detalle.descuento : "",
        montodescuento: detalle ? parseFloat(detalle.montodescuento).toFixed(2) : "",

        costobase: detalle ? parseFloat(detalle.costobase).toFixed(2) : "",
        costounitario: detalle ? parseFloat(detalle.costounitario).toFixed(2) : "",
        costosubtotal: detalle ? parseFloat(detalle.costosubtotal).toFixed(2) : "",

        peso: detalle ? parseFloat(detalle.peso).toFixed(2) : "",
        pesosubtotal: detalle ? parseFloat(detalle.pesosubtotal).toFixed(2) : "",

        volumen: detalle ? parseFloat(detalle.volumen).toFixed(2) : "",
        volumensubtotal: detalle ? parseFloat(detalle.volumensubtotal).toFixed(2) : "",

        fechavencimiento: detalle ? detalle.fechavencimiento : null,
        fvencimiento: detalle ? Functions.convertYMDToDMY(detalle.fechavencimiento) : null,
        nota: detalle ? detalle.nota : null,

        nrolote: detalle ? parseFloat(detalle.nrolote).toFixed(2) : "",
        nrofabrica: detalle ? parseFloat(detalle.nrofabrica).toFixed(2) : "",

        isdevolucioncompra: detalle ? detalle.isdevolucioncompra : "N",
        isordencompra: detalle ? detalle.isordencompra : "N",
        issolicitudcompra: detalle ? detalle.issolicitudcompra : "N",

        fkidnotacompra: detalle ? detalle.fkidnotacompra : null,
        fkidordencompra: detalle ? detalle.fkidordencompra : null,
        fkidordencompradetalle: detalle ? detalle.fkidordencompradetalle : null,
        fkidsolicitudcompradetalle: detalle ? detalle.fkidsolicitudcompradetalle : null,
        fkidsolicitudcompra: detalle ? detalle.fkidsolicitudcompra : null,

        idnotacompradetalle: detalle ? detalle.idnotacompradetalle : null,
        fkidalmacenproductodetalle: detalle ? detalle.fkidalmacenproductodetalle : null,

        visible_producto: false,
        visible_sucursal: false,
        visible_almacen: false,
        visible_proveedor: false,
        errorcantidad: false,
        errorcostounitario: false,
    };
}

function setStateDetailsBuyNote( notacompradetalle, state ) {
    let array = [];
    for (let index = 0; index < notacompradetalle.length; index++) {
        let detalle = notacompradetalle[index];
        const element = defaultNotaCompraDetalle( index, state, detalle );
        array = [ ...array, element];
    };
    return array;
};
