
import { Functions } from '../../../../utils/functions';
import { Strings } from '../../../constants';

const { cleanObejct } = Functions;

const initialState = {

    focusInput: false,
    update: false,
    imprimir: false,
    loading:  false,

    iddevolucioncompra: "",
    codigo: "",
    nrofactura: "",

    tipocambio: "",
    tipomoneda: "",
    fechadevolucioncompra: "",

    nota: "",
    tipocompra: "",

    cantidadtotal: "",
    montosubtotal: "",
    descuento: "",
    montodescuento: "",
    montototal: "",

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

    fkidnotacompra: "",

    arrayDevolucionCompraDetalle: [],
    arrayDeleteDevolucionCompraDetalle: [],

    isnotacompra: "",
    isordencompra: "",
    issolicitudcompra: "",

    isdelete: "",
    estado: "",
    fecha: "",
    hora: "",

    error: {
        codigo: false,
        nrofactura: false,
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
        tipocambio:  "",
        fechanotacompra: "",
        fkidsucursal: "",
        fkidalmacen: "",
        fkidconceptocompra: "",
        fkidproveedor: "",
        fkidmoneda: "",
    },

    reporte: {
        arrayDevolucionCompra: [],
        fecha: "",
        hora:  "",
    },
};

export const DevolucionCompraCompraReducer = ( state = initialState, action = { payload, type} ) => {
    const { payload, type } = action;

    switch ( type ) {

        case Strings.devolucioncompra_onChange:
            state = Object.assign( {}, action.payload );
            return state;

        case Strings.devolucioncompra_onCreate:
            const { arrayConceptoCompra, arrayMoneda } = payload;
            cleanObejct( state );
            state.iddevolucioncompra = action.payload.iddevolucioncompra;

            state.fechadevolucioncompra = Functions.dateToString( new Date() );
            state.tipocambio  = "6.95";

            state.tipocompra  = "L";
            state.tipomoneda = 'N';

            state.fkidnotacompra  = null;

            state.cantidadtotal = "0";
            state.montosubtotal = "0.00";
            state.descuento = '0';
            state.montodescuento = '0.00';
            state.montototal = "0.00";

            state.isnotacompra = "N";
            state.isordencompra = "N";
            state.issolicitudcompra = "N";
            
            state.fkidmoneda  = arrayMoneda.length == 0 ? "" : arrayMoneda[0].idmoneda;
            state.moneda      = arrayMoneda.length == 0 ? "" : arrayMoneda[0].descripcion;

            state.fkidconceptocompra = Functions.initValueServiceInArray( arrayConceptoCompra, "idconceptocompra" );
            state.conceptocompra     = Functions.initValueServiceInArray( arrayConceptoCompra, "descripcion" );
            
            state.arrayDevolucionCompraDetalle = loadDetailBuyDevolution();

            state.loading = false;
            state = Object.assign( {}, state );
            return state;

        case Strings.devolucioncompra_onEditar:
            onSetData( state, action.payload.devolucioncompra );
            state.loading = false;
            state = Object.assign( {}, state );
            return state;

        case Strings.devolucioncompra_onShow:
            onSetData( state, action.payload.devolucioncompra );
            state.loading = false;
            state = Object.assign( {}, state );
            return state;

        case Strings.devolucioncompra_setLoad:
            cleanObejct( state );
            state.loading = true;
            state = Object.assign( {}, state );
            return state;

        case Strings.devolucioncompra_setLimpiar:
            cleanObejct( state );
            state = Object.assign( {}, state );
            return state;

        case Strings.devolucioncompra_setState:
            cleanObejct( state );
            onSetData( state, action.payload );
            state = Object.assign( {}, state );
            return state;

        case Strings.devolucioncompra_setImprimir: 
            return {
                ...state,
                reporte: action.payload,
            };

        case Strings.devolucioncompra_onFocus:
            state.focusInput = true;
            state = Object.assign( {}, state );
            return state;

        case Strings.devolucioncompra_offFocus:
            state.focusInput = false;
            state = Object.assign( {}, state );
            return state;
    
        default:
            return state;
    }
};

function onSetData( state, payload ) {
    state.iddevolucioncompra   = payload.iddevolucioncompra;
    
    state.codigo = payload.codigo;
    state.nrofactura = payload.nrofactura;

    state.tipocambio = parseFloat(payload.tipocambio).toFixed(2);
    state.fechadevolucioncompra = Functions.convertYMDToDMY(payload.fechadevolucioncompra);

    state.nota = payload.nota;
    state.tipocompra = payload.tipocompra;
    state.tipomoneda = payload.tipomoneda;

    state.cantidadtotal = parseInt(payload.cantidadtotal);
    state.montosubtotal = parseFloat(payload.montosubtotal).toFixed(2);
    state.descuento = parseInt(payload.descuento);
    state.montodescuento = parseFloat(payload.montodescuento).toFixed(2);
    state.montototal = parseFloat(payload.montototal).toFixed(2);

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
    
    state.fkidnotacompra = payload.fkidnotacompra;

    state.estado = payload.estado;
    state.isdelete = payload.isdelete;

    state.issolicitudcompra = payload.issolicitudcompra;
    state.isordencompra = payload.isordencompra;
    state.isnotacompra = payload.isnotacompra;

    state.arrayDevolucionCompraDetalle = setStateDetailsBuyDevolution(payload.arraydevolucioncompradetalle, state);
};

function loadDetailBuyDevolution() {
    let array = [];
    return array;
};

function setStateDetailsBuyDevolution( devolucioncompradetalle, state ) {
    let array = [];
    for (let index = 0; index < devolucioncompradetalle.length; index++) {
        let detalle = devolucioncompradetalle[index];
        const element = defaultDevolucionNotaCompraDetalle(index, state, detalle);
        array = [ ...array, element];
    };
    return array;
};

function defaultDevolucionNotaCompraDetalle( index = 0, state = initialState, detalle = null ) {
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

        cantidad: detalle ? detalle.cantidad : "",
        cantidadcomprada: detalle ? detalle.cantidadcomprada : "",

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

        isnotacompra: detalle ? detalle.isnotacompra : "N",
        isordencompra: detalle ? detalle.isordencompra : "N",
        issolicitudcompra: detalle ? detalle.issolicitudcompra : "N",

        fkidnotacompra: detalle ? detalle.fkidnotacompra : null,
        fkidnotacompradetalle: detalle ? detalle.fkidnotacompradetalle : null,

        fkidordencompra: detalle ? detalle.fkidordencompra : null,
        fkidordencompradetalle: detalle ? detalle.fkidordencompradetalle : null,

        fkidsolicitudcompradetalle: detalle ? detalle.fkidsolicitudcompradetalle : null,
        fkidsolicitudcompra: detalle ? detalle.fkidsolicitudcompra : null,

        fkidalmacenproductodetalle: detalle ? detalle.fkidalmacenproductodetalle : null,
        fkiddevolucioncompra:  detalle ? detalle.fkiddevolucioncompra : null,
        iddevolucioncompradetalle:  detalle ? detalle.iddevolucioncompradetalle : null,

        visible_producto: false,
        visible_sucursal: false,
        visible_almacen: false,
        visible_proveedor: false,
        errorcantidad: false,
        errorcostounitario: false,
    };
}
