
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

    switch ( action.type ) {

        case Strings.devolucioncompra_onChange:
            state = Object.assign( {}, action.payload );
            return state;

        case Strings.devolucioncompra_onCreate:
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

            state.arrayDevolucionCompraDetalle = loadDetailBuyDevolution();

            state.fkidmoneda  = action.payload.arrayMoneda.length == 0 ? "" : action.payload.arrayMoneda[0].idmoneda;
            state.moneda      = action.payload.arrayMoneda.length == 0 ? "" : action.payload.arrayMoneda[0].descripcion;

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

    state.arrayDevolucionCompraDetalle = setStateDetailsBuyDevolution(payload.devolucioncompradetalle);
};

function loadDetailBuyDevolution() {
    let array = [];
    // for ( let index = 0; index < 10; index++ ) {
    //     const element = {
    //         key: index,

    //         codigo: "",
    //         producto: "",
    //         ciudadorigen: "",
    //         productomarca: "",

    //         fkidunidadmedidaproducto: null,
    //         unidadmedidaproducto: "",

    //         cantidad: "",
    //         cantidadcomprada: "",

    //         costounitario: "",
    //         costosubtotal: "",

    //         peso: "",
    //         pesosubtotal: "",

    //         volumen: "",
    //         volumensubtotal: "",

    //         fechavencimiento: null,
    //         fvencimiento: null,
    //         nota: null,

    //         nrolote: "",
    //         nrofabrica: "",

    //         isnotacompra: "",
    //         isordencompra: "",
    //         issolicitudcompra: "",

    //         visible_producto: false,
    //         visible_unidadmedida: false,

    //         array_unidadmedidaproducto: [],

    //         fkiddevolucioncompra: null,
    //         fkidproducto: null,
    //         fkidalmacenunidadmedidaproducto: null,
    //         fkidnotacompradetalle: null,
    //         iddevolucioncompradetalle: null,
    //     };
    //     array = [ ...array, element];
    // }
    return array;
};

function setStateDetailsBuyDevolution( devolucioncompradetalle ) {
    let array = [];
    for (let index = 0; index < devolucioncompradetalle.length; index++) {
        let detalle = devolucioncompradetalle[index];

        const element = {
            key: index,

            codigo: detalle.codigo,
            producto: detalle.nombre,
            ciudadorigen: detalle.ciudadorigen,
            productomarca: detalle.productomarca,

            fkidunidadmedidaproducto: detalle.fkidunidadmedidaproducto,
            unidadmedidaproducto: parseFloat(detalle.valorequivalente).toFixed(2) + " " + detalle.abreviatura,

            cantidad: parseInt(detalle.cantidad),
            cantidadcomprada: parseInt(detalle.cantidadcomprada),

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

            isnotacompra: detalle.isnotacompra,
            isordencompra: detalle.isordencompra,
            issolicitudcompra: detalle.issolicitudcompra,

            visible_producto: false,
            visible_unidadmedida: false,

            array_unidadmedidaproducto: [],

            fkiddevolucioncompra: detalle.fkiddevolucioncompra,
            fkidproducto: detalle.idproducto,
            fkidalmacenunidadmedidaproducto: detalle.fkidalmacenunidadmedidaproducto,
            fkidnotacompradetalle: detalle.fkidnotacompradetalle,
            nota: detalle.nota,
            iddevolucioncompradetalle: detalle.iddevolucioncompradetalle,
            errorcantidad: false,
        };
        array = [ ...array, element];
    };
    return array;
};
