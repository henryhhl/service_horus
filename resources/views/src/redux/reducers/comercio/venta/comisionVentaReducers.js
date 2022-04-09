
import { Functions } from '../../../../utils/functions';
import { Strings } from '../../../constants';

const { cleanObejct } = Functions;

const initialState = {

    focusInput: false,
    update: false,
    imprimir: false,
    loading:  false,

    idcomisionventa: "",
    x_idusuario: "",

    codigo: "",
    descripcion: "",
    valor: "",

    imagen: "",
    extension: "",

    estado: "",
    fecha: "",
    hora: "",

    error: {
        idcomisionventa: false,

        codigo: false,
        descripcion: false,
        valor: false,
    },
    message: {
        idcomisionventa: "",

        codigo: "",
        descripcion: "",
        valor: "",
    },

    reporte: {
        arrayComisionVenta: [],
        fecha: "",
        hora:  "",
    },
};

export const ComisionVentaReducer = ( state = initialState, action = { payload, type} ) => {

    switch ( action.type ) {

        case Strings.comisionventa_onChange:
            state = Object.assign( {}, action.payload );
            return state;

        case Strings.comisionventa_onCreate:
            cleanObejct( state );
            state.idcomisionventa = action.payload.idcomisionventa;
            state.estado = "A";
            state.valor = 0;
            state.loading = false;
            state = Object.assign( {}, state );
            return state;

        case Strings.comisionventa_onEditar:
            onSetData( state, action.payload.comisionventa );
            state.loading = false;
            state = Object.assign( {}, state );
            return state;

        case Strings.comisionventa_onShow:
            onSetData( state, action.payload.comisionventa );
            state.loading = false;
            state = Object.assign( {}, state );
            return state;

        case Strings.comisionventa_setLoad:
            cleanObejct( state );
            state.loading = true;
            state = Object.assign( {}, state );
            return state;

        case Strings.comisionventa_setLimpiar:
            cleanObejct( state );
            state = Object.assign( {}, state );
            return state;

        case Strings.comisionventa_setState:
            cleanObejct( state );
            onSetData( state, action.payload );
            state = Object.assign( {}, state );
            return state;

        case Strings.comisionventa_setImprimir:
            return {
                ...state,
                reporte: action.payload,
            };

        case Strings.comisionventa_onFocus:
            state.focusInput = true;
            state = Object.assign( {}, state );
            return state;

        case Strings.comisionventa_offFocus:
            state.focusInput = false;
            state = Object.assign( {}, state );
            return state;

        default:
            return state;
    };
};

function onSetData( state, payload ) {

    state.idcomisionventa = payload.idcomisionventa;
    state.x_idusuario = payload.x_idusuario;

    state.codigo = payload.codigo;
    state.descripcion = payload.descripcion;
    state.valor = parseFloat(payload.valor).toFixed(2);

    state.imagen = payload.imagen;
    state.extension = payload.extension;

    state.estado = payload.estado;
    state.fecha = payload.fecha;
    state.hora = payload.hora;
}

