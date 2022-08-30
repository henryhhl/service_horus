
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
    nro: "",
    tipocambio: "",
    fechanotasalida: "",

    cantidadtotal: "",
    montototal: "",
    pesototal: "",
    volumentotal: "",
    nrocajastotal: "",
    
    nota: "",
    esingresado: "",
    esnotasalida: "",

    fkidsucursal: "",
    sucursal: "",

    fkidalmacen: "",
    almacen: "",

    fkidconceptoinventario: "",
    conceptoinventario: "",

    fkidmoneda: "",
    moneda: "",

    arrayNotaSalidaDetalle: [],
    arrayDeleteNotaSalidaDetalle: [],

    estado: "",
    fecha: "",
    hora: "",

    error: {
        codigo: false,
        fkidsucursal: false,
        fkidalmacen:  false,
        fkidconceptoinventario:  false,
        fkidmoneda:  false,
        fechanotasalida:  false,
    },
    message: {
        codigo:  "",
        fkidsucursal:  "",
        fkidalmacen:  "",
        fkidconceptoinventario:  "",
        fkidmoneda:  "",
        fechanotasalida:  "",
    },

    reporte: {
        arrayNotaSalida: [],
        fecha: "",
        hora:  "",
    },
};

export const NotaSalidaReducer = ( state = initialState, action = { payload, type} ) => {
    const { payload, type } = action;

    switch ( type ) {

        case Strings.notasalida_onChange:
            state = Object.assign( {}, action.payload );
            return state;

        case Strings.notasalida_onCreate:
            const { arrayConceptoInventario, arrayMoneda, arraySucursal } = payload;
            cleanObejct( state );
            state.idnotasalida = action.payload.idnotasalida;
            state.fechanotasalida   = dateToString( new Date() );
            state.nromanual    = "0";
            state.esingresado  = "N";
            state.esnotasalida  = "N";
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

            state.fkidsucursal = Functions.initValueServiceInArray( arraySucursal, "idsucursal" );
            state.sucursal     = Functions.initValueServiceInArray( arraySucursal, "descripcion" );
            
            let arrayAlmacen = ( Functions.esNumeric(state.fkidsucursal) ) ? arraySucursal[0].arrayalmacen : [];
            
            state.fkidalmacen = Functions.initValueServiceInArray( arrayAlmacen, "idalmacen" );
            state.almacen = Functions.initValueServiceInArray( arrayAlmacen, "descripcion" );

            state.arrayNotaSalidaDetalle = loadDetailNote( state );

            state.estado = "A";
            state.loading = false;
            state = Object.assign( {}, state );
            return state;

        case Strings.notasalida_onEditar:
            onSetData( state, action.payload.notasalida );
            state.loading = false;
            state = Object.assign( {}, state );
            return state;

        case Strings.notasalida_onShow:
            onSetData( state, action.payload.notasalida );
            state.loading = false;
            state = Object.assign( {}, state );
            return state;

        case Strings.notasalida_setLoad:
            cleanObejct( state );
            state.loading = true;
            state = Object.assign( {}, state );
            return state;

        case Strings.notasalida_setLimpiar:
            cleanObejct( state );
            state = Object.assign( {}, state );
            return state;

        case Strings.notasalida_setState:
            cleanObejct( state );
            onSetData( state, action.payload );
            state = Object.assign( {}, state );
            return state;

        case Strings.notasalida_setImprimir: 
            return {
                ...state,
                reporte: action.payload,
            };

        case Strings.notasalida_onFocus:
            state.focusInput = true;
            state = Object.assign( {}, state );
            return state;

        case Strings.notasalida_offFocus:
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
    state.fechanotasalida = Functions.convertYMDToDMY(payload.fechanotasalida);

    state.cantidadtotal = parseInt(payload.cantidadtotal);
    state.montototal = parseFloat(payload.montototal).toFixed(2);
    state.pesototal = parseFloat(payload.pesototal).toFixed(2);
    state.volumentotal = parseFloat(payload.volumentotal).toFixed(2);
    state.nrocajastotal = parseFloat(payload.nrocajastotal).toFixed(2);
    
    state.nota = payload.nota ? payload.nota : "";
    state.esingresado = payload.esingresado;

    state.fkidsucursal = payload.fkidsucursal;
    state.sucursal = payload.sucursal;

    state.fkidalmacen = payload.fkidalmacen;
    state.almacen = payload.almacen;

    state.fkidconceptoinventario = payload.fkidconceptoinventario;
    state.conceptoinventario = payload.conceptoinventario;

    state.fkidmoneda = payload.fkidmoneda;
    state.moneda = payload.moneda;

    state.arrayNotaSalidaDetalle = setStateDetailsEntryNote(payload.arraynotasalidadetalle, state);
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

        fkidsucursal: detalle ? detalle.fkidsucursal : state.fkidsucursal,
        sucursal: detalle ? detalle.sucursal : state.sucursal,

        fkidalmacen: detalle ? detalle.fkidalmacen : state.fkidalmacen,
        almacen: detalle ? detalle.almacen : state.almacen,

        stockactualanterior: detalle ? detalle.stockactualanterior : "",
        cantidad: detalle ? detalle.cantidad : "",
        nrocajas: detalle ? detalle.nrocajas : "",

        descuento: detalle ? detalle.descuento : "",
        montodescuento: detalle ? parseFloat(detalle.montodescuento).toFixed(2) : "",

        costobase: detalle ? parseFloat(detalle.costobase).toFixed(2) : "",
        costounitario: detalle ? parseFloat(detalle.costounitario).toFixed(2) : "",
        costosubtotal: detalle ? parseFloat(detalle.costosubtotal).toFixed(2) : "",
        costopromedio: detalle ? parseFloat(detalle.costopromedio).toFixed(2) : "",

        peso: detalle ? parseFloat(detalle.peso).toFixed(2) : "",
        pesosubtotal: detalle ? parseFloat(detalle.pesosubtotal).toFixed(2) : "",

        volumen: detalle ? parseFloat(detalle.volumen).toFixed(2) : "",
        volumensubtotal: detalle ? parseFloat(detalle.volumensubtotal).toFixed(2) : "",

        fechavencimiento: detalle ? detalle.fechavencimiento : null,
        fvencimiento: detalle ? Functions.convertYMDToDMY(detalle.fechavencimiento) : null,
        nota: detalle ? detalle.nota : null,

        nrolote: detalle ? parseFloat(detalle.nrolote).toFixed(2) : "",
        nrofabrica: detalle ? parseFloat(detalle.nrofabrica).toFixed(2) : "",

        fkidnotasalida: detalle ? detalle.fkidnotasalida : null,
        idnotasalidadetalle: detalle ? detalle.idnotasalidadetalle : null,
        fkidalmacenproductodetalle: detalle ? detalle.fkidalmacenproductodetalle : null,

        visible_producto: false,
        visible_sucursal: false,
        visible_almacen: false,
        errorcantidad: false,
        errorcostounitario: false,
    };
}
