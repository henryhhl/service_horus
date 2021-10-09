
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

    switch ( action.type ) {

        case Strings.notacompra_onChange:
            state = Object.assign( {}, action.payload );
            return state;

        case Strings.notacompra_onCreate:
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

            state.arrayNotaCompraDetalle = loadDetailBuyNote();

            state.fkidmoneda  = action.payload.arrayMoneda.length == 0 ? "" : action.payload.arrayMoneda[0].idmoneda;
            state.moneda      = action.payload.arrayMoneda.length == 0 ? "" : action.payload.arrayMoneda[0].descripcion;

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

    state.arrayNotaCompraDetalle = setStateDetailsBuyNote(payload.notacompradetalle);
};

function loadDetailBuyNote() {
    let array = [];
    for ( let index = 0; index < 10; index++ ) {
        const element = {
            key: index,

            codigo: "",
            producto: "",
            ciudadorigen: "",
            productomarca: "",

            fkidunidadmedidaproducto: null,
            unidadmedidaproducto: "",

            cantidad: "",
            cantidadsolicitada: "",
            cantidadrecibida: "",
            cantidadfaltante: "",
            cantidadsobrante: "",
            nrocajas: "",

            costounitario: "",
            costosubtotal: "",

            peso: "",
            pesosubtotal: "",

            volumen: "",
            volumensubtotal: "",

            fechavencimiento: null,
            fvencimiento: null,
            nota: null,

            nrolote: "",
            nrofabrica: "",

            isdevolucioncompra: "",
            isordencompra: "",
            issolicitudcompra: "",

            visible_producto: false,
            fkidnotacompra: null,
            fkidproducto: null,
            fkidalmacenunidadmedidaproducto: null,
            fkidordencompradetalle: null,
            idnotacompradetalle: null,
        };
        array = [ ...array, element];
    }
    return array;
};

function setStateDetailsBuyNote( notacompradetalle ) {
    let array = [];
    for (let index = 0; index < notacompradetalle.length; index++) {
        let detalle = notacompradetalle[index];

        const element = {
            key: index,

            codigo: detalle.codigo,
            producto: detalle.nombre,
            ciudadorigen: detalle.ciudadorigen,
            productomarca: detalle.productomarca,

            fkidunidadmedidaproducto: detalle.fkidunidadmedidaproducto,
            unidadmedidaproducto: parseFloat(detalle.peso).toFixed(2) + " " + detalle.abreviatura,

            cantidad: parseInt(detalle.cantidad),
            cantidadsolicitada: parseInt(detalle.cantidadsolicitada),
            cantidadrecibida: parseInt(detalle.cantidadrecibida),
            cantidadfaltante: parseInt(detalle.cantidadfaltante),
            cantidadsobrante: parseInt(detalle.cantidadsobrante),
            nrocajas: parseInt(detalle.nrocajas),

            costounitario: parseFloat(detalle.costounitario).toFixed(2),
            costosubtotal: parseFloat(detalle.costosubtotal).toFixed(2),

            peso: parseFloat(detalle.peso).toFixed(2),
            pesosubtotal: parseFloat(detalle.pesosubtotal).toFixed(2),

            volumen: parseFloat(detalle.volumen).toFixed(2),
            volumensubtotal: parseFloat(detalle.volumensubtotal).toFixed(2),

            fechavencimiento: detalle.fechavencimiento,
            fvencimiento: Functions.convertYMDToDMY(detalle.fechavencimiento),
            
            nota: detalle.nota,
            nrolote: parseFloat(detalle.nrolote).toFixed(2),
            nrofabrica: parseFloat(detalle.nrofabrica).toFixed(2),

            isdevolucioncompra: detalle.isdevolucioncompra,
            isordencompra: detalle.isordencompra,
            issolicitudcompra: detalle.issolicitudcompra,

            visible_producto: false,

            fkidnotacompra: detalle.fkidnotacompra,
            fkidproducto: detalle.idproducto,
            fkidalmacenunidadmedidaproducto: detalle.fkidalmacenunidadmedidaproducto,
            fkidordencompradetalle: detalle.fkidordencompradetalle,
            nota: detalle.nota,
            idnotacompradetalle: detalle.idnotacompradetalle,
        };
        array = [ ...array, element];
    };
    return array;
};
