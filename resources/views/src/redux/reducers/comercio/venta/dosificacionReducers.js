
import { Functions } from '../../../../utils/functions';
import { Strings } from '../../../constants';

const { cleanObejct, dateToString } = Functions;

const initialState = {

    focusInput: false,
    update: false,
    imprimir: false,
    loading:  false,

    iddosificacion: "",

    fkidsucursal: "",
    sucursal: "",

    fkidactividadeconomica: "",
    actividadeconomica: "",

    codigo: "",
    abreviatura: "",
    descripcion: "",

    tiposucursal: "",
    tipodosificacion: "",
    tipoempresa: "",

    nit: "",
    nroautorizacion: "",
    llave: "",
    lugaremision: "",
    direccionfiscal: "",
    telefonofiscal: "",

    numerocorrelativo: "",
    numfacturainicial: "",
    numfacturasiguiente: "",
    rangofacturainicial: "",
    rangofacturafinal: "",

    fechaactivacion: "",
    fechalimiteemision: "",

    imagen: "",
    extension: "",

    estado: "",
    fecha: "",
    hora: "",

    error: {
        fkidsucursal: false,
        fkidactividadeconomica: false,

        codigo:  false,
        abreviatura:  false,
        descripcion:  false,

        tiposucursal: false,
        tipodosificacion: false,
        tipoempresa: false,

        nit: false,
        nroautorizacion: false,
        llave: false,
        lugaremision: false,
        direccionfiscal: false,
        telefonofiscal: false,

        numerocorrelativo: false,
        numfacturainicial: false,
        numfacturasiguiente: false,
        rangofacturainicial: false,
        rangofacturafinal: false,

        fechaactivacion: false,
        fechalimiteemision: false,
    },
    message: {
        fkidsucursal: "",
        fkidactividadeconomica: "",

        codigo:  "",
        abreviatura:  "",
        descripcion:  "",

        tiposucursal: "",
        tipodosificacion: "",
        tipoempresa: "",

        nit: "",
        nroautorizacion: "",
        llave: "",
        lugaremision: "",
        direccionfiscal: "",
        telefonofiscal: "",

        numerocorrelativo: "",
        numfacturainicial: "",
        numfacturasiguiente: "",
        rangofacturainicial: "",
        rangofacturafinal: "",

        fechaactivacion: "",
        fechalimiteemision: "",
    },

    reporte: {
        arrayDosificacion: [],
        fecha: "",
        hora:  "",
    },
};

export const DosificacionReducer = ( state = initialState, action = { payload, type} ) => {

    switch ( action.type ) {

        case Strings.dosificacion_onChange:
            state = Object.assign( {}, action.payload );
            return state;

        case Strings.dosificacion_onCreate:
            cleanObejct( state );
            let fechaactual = new Date();
            fechaactual.setMonth( fechaactual.getMonth() + 1 );
            state.iddosificacion = action.payload.iddosificacion;
            state.loading = false;

            state.tiposucursal = 'M';
            state.tipodosificacion = 'A';
            state.tipoempresa = 'N';

            state.fechaactivacion = dateToString( new Date() );
            state.fechalimiteemision = dateToString( fechaactual );

            state.numerocorrelativo = 0;
            state.numfacturainicial = 1;
            state.numfacturasiguiente = 1;
            state.rangofacturainicial = 0;
            state.rangofacturafinal = 0;

            state.estado = 'A';

            state = Object.assign( {}, state );
            return state;

        case Strings.dosificacion_onEditar:
            onSetData( state, action.payload.dosificacion );
            state.loading = false;
            state = Object.assign( {}, state );
            return state;

        case Strings.dosificacion_onShow:
            onSetData( state, action.payload.dosificacion );
            state.loading = false;
            state = Object.assign( {}, state );
            return state;

        case Strings.dosificacion_setLoad:
            cleanObejct( state );
            state.loading = true;
            state = Object.assign( {}, state );
            return state;

        case Strings.dosificacion_setLimpiar:
            cleanObejct( state );
            state = Object.assign( {}, state );
            return state;

        case Strings.dosificacion_setState:
            cleanObejct( state );
            onSetData( state, action.payload );
            state = Object.assign( {}, state );
            return state;

        case Strings.dosificacion_setImprimir:
            return {
                ...state,
                reporte: action.payload,
            };

        case Strings.dosificacion_onFocus:
            state.focusInput = true;
            state = Object.assign( {}, state );
            return state;

        case Strings.dosificacion_offFocus:
            state.focusInput = false;
            state = Object.assign( {}, state );
            return state;

        default:
            return state;
    }
};

function onSetData( state, payload ) {
    state.iddosificacion = payload.iddosificacion;

    state.fkidsucursal = payload.fkidsucursal;
    state.sucursal = payload.sucursal;

    state.fkidactividadeconomica = payload.fkidactividadeconomica;
    state.actividadeconomica = payload.actividadeconomica;

    state.codigo = payload.codigo;
    state.abreviatura = payload.abreviatura;
    state.descripcion = payload.descripcion;

    state.tiposucursal = payload.tiposucursal;
    state.tipodosificacion = payload.tipodosificacion;
    state.tipoempresa = payload.tipoempresa;

    state.nit = payload.nit;
    state.nroautorizacion = payload.nroautorizacion;
    state.llave = payload.llave;
    state.lugaremision = payload.lugaremision;
    state.direccionfiscal = payload.direccionfiscal;
    state.telefonofiscal = payload.telefonofiscal;

    state.numerocorrelativo = payload.numerocorrelativo;
    state.numfacturainicial = payload.numfacturainicial;
    state.numfacturasiguiente = payload.numfacturasiguiente;
    state.rangofacturainicial = payload.rangofacturainicial;
    state.rangofacturafinal = payload.rangofacturafinal;

    state.fechaactivacion = Functions.convertYMDToDMY( payload.fechaactivacion );
    state.fechalimiteemision = Functions.convertYMDToDMY( payload.fechalimiteemision );

    state.imagen = payload.imagen;
    state.extension = payload.extension;

    state.estado = payload.estado;
    state.fecha = payload.fecha;
    state.hora = payload.hora;
}
