
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

    switch ( action.type ) {

        case Strings.ordencompra_onChange:
            state = Object.assign( {}, action.payload );
            return state;

        case Strings.ordencompra_onCreate:
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

            state.fletes = "0.00";
            state.internacion = "0.00";
            state.otrosgastos = "0.00";
            state.nrofactura = 0;

            state.arrayOrdenCompraDetalle = loadDetailBuyOrder();

            state.fkidmoneda  = action.payload.arrayMoneda.length == 0 ? "" : action.payload.arrayMoneda[0].idmoneda;
            state.moneda      = action.payload.arrayMoneda.length == 0 ? "" : action.payload.arrayMoneda[0].descripcion;

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

    state.arrayOrdenCompraDetalle = setStateDetailsBuyOrder(payload.ordencompradetalle);
};

function loadDetailBuyOrder() {
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

            costounitario: "",
            costosubtotal: "",

            peso: "",
            pesosubtotal: "",

            volumen: "",
            volumensubtotal: "",

            fechasolicitada: null,
            fsolicitada: null,
            nota: null,

            visible_producto: false,
            fkidproducto: null,
            fkidsolicitudcompradetalle: null,
            idordencompradetalle: null,
            errorcantidad: false,
            errorcosto: false,
        };
        array = [ ...array, element];
    }
    return array;
};

function setStateDetailsBuyOrder( ordencompradetalle ) {
    let array = [];
    for (let index = 0; index < ordencompradetalle.length; index++) {
        let detalle = ordencompradetalle[index];

        const element = {
            key: index,

            codigo: detalle.codigo,
            producto: detalle.nombre,
            ciudadorigen: detalle.ciudadorigen,
            productomarca: detalle.productomarca,

            fkidunidadmedidaproducto: detalle.fkidunidadmedidaproducto,
            unidadmedidaproducto: parseFloat(detalle.valorequivalente).toFixed(2) + " " + detalle.abreviatura,

            cantidad: parseInt(detalle.cantidad),
            cantidadsolicitada: parseInt(detalle.cantidadsolicitada),

            costounitario: parseFloat(detalle.costounitario).toFixed(2),
            costosubtotal: parseFloat(detalle.costosubtotal).toFixed(2),

            peso: parseFloat(detalle.peso).toFixed(2),
            pesosubtotal: parseFloat(detalle.pesosubtotal).toFixed(2),

            volumen: parseFloat(detalle.volumen).toFixed(2),
            volumensubtotal: parseFloat(detalle.volumensubtotal).toFixed(2),

            fechasolicitada: detalle.fechasolicitada,
            fsolicitada: Functions.convertYMDToDMY(detalle.fechasolicitada),
            
            nota: detalle.nota,

            visible_producto: false,
            fkidproducto: detalle.idproducto,
            fkidsolicitudcompradetalle: detalle.fkidsolicitudcompradetalle,
            idordencompradetalle: detalle.idordencompradetalle,
            errorcantidad: false,
            errorcosto: false,
        };
        array = [ ...array, element];
    };
    return array;
};
