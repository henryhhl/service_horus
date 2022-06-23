
import { Functions } from '../../../../utils/functions';
import { Strings } from '../../../constants';

const { cleanObejct, dateToString } = Functions;

const initialState = {

    focusInput: false,
    update: false,
    imprimir: false,
    loading:  false,

    idnotasalida: "",
    codigo: "",
    nromanual: "",
    tipocambio: "",
    fechanotatraspaso: "",

    cantidadtotal: "",
    montototal: "",
    pesototal: "",
    volumentotal: "",
    nrocajastotal: "",
    
    nota: "",

    fkidsucursalingreso: "",
    sucursalingreso: "",

    fkidsucursalsalida: "",
    sucursalsalida: "",

    fkidalmaceningreso: "",
    almaceningreso: "",

    fkidalmacensalida: "",
    almacensalida: "",

    fkidconceptoinventario: "",
    conceptoinventario: "",

    fkidmoneda: "",
    moneda: "",

    arrayNotaTraspasoProductoDetalle: [],
    arrayDeleteNotaTraspasoProductoDetalle: [],

    estado: "",
    fecha: "",
    hora: "",

    error: {
        codigo: false,
        fkidsucursal: false,
        fkidalmacen:  false,
        fkidconceptoinventario:  false,
        fkidmoneda:  false,
        fechanotatraspaso:  false,
    },
    message: {
        codigo:  "",
        fkidsucursal:  "",
        fkidalmacen:  "",
        fkidconceptoinventario:  "",
        fkidmoneda:  "",
        fechanotatraspaso:  "",
    },

    reporte: {
        arrayNotaTraspasoProducto: [],
        fecha: "",
        hora:  "",
    },
};

export const NotaTraspasoProductoReducer = ( state = initialState, action = { payload, type} ) => {
    const { payload, type } = action;

    switch ( type ) {

        case Strings.notatraspasoproducto_onChange:
            state = Object.assign( {}, action.payload );
            return state;

        case Strings.notatraspasoproducto_onCreate:
            const { arrayConceptoInventario, arrayMoneda, arraySucursal } = payload;
            cleanObejct( state );
            state.idnotasalida = action.payload.idnotasalida;
            state.fechanotatraspaso   = dateToString( new Date() );
            state.nromanual    = "0";
            state.tipocambio  = "6.95";

            
            state.cantidadtotal = "0",
            state.montototal = "0.00",
            state.pesototal = "0.00",
            state.volumentotal = "0.00",
            state.nrocajastotal = "0.00",
            
            state.fkidmoneda  = arrayMoneda.length == 0 ? "" : arrayMoneda[0].idmoneda;
            state.moneda      = arrayMoneda.length == 0 ? "" : arrayMoneda[0].descripcion;

            state.fkidconceptoinventario = Functions.initValueServiceInArray( arrayConceptoInventario, "idconceptoinventario" );
            state.conceptoinventario     = Functions.initValueServiceInArray( arrayConceptoInventario, "descripcion" );

            state.fkidsucursalsalida = Functions.initValueServiceInArray( arraySucursal, "idsucursal" );
            state.sucursalsalida     = Functions.initValueServiceInArray( arraySucursal, "descripcion" );
            
            let arrayAlmacen = ( typeof state.fkidsucursal == "number" ) ? arraySucursal[0].arrayalmacen : [];
            
            state.fkidalmacensalida = Functions.initValueServiceInArray( arrayAlmacen, "idalmacen" );
            state.almacensalida = Functions.initValueServiceInArray( arrayAlmacen, "descripcion" );

            state.arrayNotaTraspasoProductoDetalle = loadDetailNote( state );

            state.loading = false;
            state = Object.assign( {}, state );
            return state;

        case Strings.notatraspasoproducto_onEditar:
            onSetData( state, action.payload.notasalida );
            state.loading = false;
            state = Object.assign( {}, state );
            return state;

        case Strings.notatraspasoproducto_onShow:
            onSetData( state, action.payload.notasalida );
            state.loading = false;
            state = Object.assign( {}, state );
            return state;

        case Strings.notatraspasoproducto_setLoad:
            cleanObejct( state );
            state.loading = true;
            state = Object.assign( {}, state );
            return state;

        case Strings.notatraspasoproducto_setLimpiar:
            cleanObejct( state );
            state = Object.assign( {}, state );
            return state;

        case Strings.notatraspasoproducto_setState:
            cleanObejct( state );
            onSetData( state, action.payload );
            state = Object.assign( {}, state );
            return state;

        case Strings.notatraspasoproducto_setImprimir: 
            return {
                ...state,
                reporte: action.payload,
            };

        case Strings.notatraspasoproducto_onFocus:
            state.focusInput = true;
            state = Object.assign( {}, state );
            return state;

        case Strings.notatraspasoproducto_offFocus:
            state.focusInput = false;
            state = Object.assign( {}, state );
            return state;
    
        default:
            return state;
    }
};

function onSetData( state, payload ) {
    state.idnotasalida   = payload.idnotasalida;
    
    state.codigo = payload.codigo ? payload.codigo : "";
    state.nromanual = payload.nromanual;
    state.tipocambio = parseFloat(payload.tipocambio).toFixed(2);
    state.fechanotatraspaso = Functions.convertYMDToDMY(payload.fechanotatraspaso);

    state.cantidadtotal = parseInt(payload.cantidadtotal);
    state.montototal = parseFloat(payload.montototal).toFixed(2);
    state.pesototal = parseFloat(payload.pesototal).toFixed(2);
    state.volumentotal = parseFloat(payload.volumentotal).toFixed(2);
    state.nrocajastotal = parseFloat(payload.nrocajastotal).toFixed(2);
    
    state.nota = payload.nota ? payload.nota : "";

    state.fkidsucursalingreso = payload.fkidsucursalingreso;
    state.sucursalingreso = payload.sucursalingreso;

    state.fkidsucursalsalida = payload.fkidsucursalsalida;
    state.sucursalsalida = payload.sucursalsalida;

    state.fkidalmaceningreso = payload.fkidalmaceningreso;
    state.almaceningreso = payload.almaceningreso;

    state.fkidalmacensalida = payload.fkidalmacensalida;
    state.almacensalida = payload.almacensalida;

    state.fkidconceptoinventario = payload.fkidconceptoinventario;
    state.conceptoinventario = payload.conceptoinventario;

    state.fkidmoneda = payload.fkidmoneda;
    state.moneda = payload.moneda;

    state.arrayNotaTraspasoProductoDetalle = setStateDetailsEntryNote(payload.arraynotatraspasoproductodetalle, state);
};

function loadDetailNote( state ) {
    let array = [];
    for ( let index = 0; index < 10; index++ ) {
        const element = defaultNotaSalidaDetalle( index, state );
        array = [ ...array, element];
    }
    return array;
};

function setStateDetailsEntryNote( notasalidadetalle, state ) {
    let array = [];
    for (let index = 0; index < notasalidadetalle.length; index++) {
        let detalle = notasalidadetalle[index];
        let element = defaultNotaSalidaDetalle( index, state, detalle );
        array = [ ...array, element];
    }
    return array;
};

function defaultNotaSalidaDetalle( index = 0, state = initialState, detalle = null ) {
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

        fkidsucursalingreso: detalle ? detalle.fkidsucursalingreso : state.fkidsucursalingreso,
        sucursalingreso: detalle ? detalle.sucursalingreso : state.sucursalingreso,

        fkidsucursalsalida: detalle ? detalle.fkidsucursalsalida : state.fkidsucursalsalida,
        sucursalsalida: detalle ? detalle.sucursalsalida : state.sucursalsalida,

        fkidalmaceningreso: detalle ? detalle.fkidalmaceningreso : state.fkidalmaceningreso,
        almaceningreso: detalle ? detalle.almaceningreso : state.almaceningreso,

        fkidalmacensalida: detalle ? detalle.fkidalmacensalida : state.fkidalmacensalida,
        almacensalida: detalle ? detalle.almacensalida : state.almacensalida,

        stockactualanterior: detalle ? detalle.stockactualanterior : "",
        cantidad: detalle ? detalle.cantidad : "",
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

        fkidnotatraspasoproducto: detalle ? detalle.fkidnotatraspasoproducto : null,
        idnotatraspasoproductodetalle: detalle ? detalle.idnotatraspasoproductodetalle : null,
        fkidalmacenproductodetalleingreso: detalle ? detalle.fkidalmacenproductodetalleingreso : null,
        fkidalmacenproductodetallesalida: detalle ? detalle.fkidalmacenproductodetallesalida : null,

        visible_producto: false,
        visible_sucursalingreso: false,
        visible_sucursalsalida: false,
        visible_almaceningreso: false,
        visible_almacensalida: false,
        errorcantidad: false,
        errorcostounitario: false,
    };
}
