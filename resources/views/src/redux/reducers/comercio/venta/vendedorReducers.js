
import { Functions } from '../../../../utils/functions';
import { Strings } from '../../../constants';

const { cleanObejct } = Functions;

const initialState = {

    focusInput: false,
    update: false,
    imprimir: false,
    loading:  false,

    idvendedor: "",
    x_idusuario: "",

    fkidciudadpais: "",
    ciudadpais: "",

    fkidciudad: "",
    ciudad: "",

    fkidcomisionventa: "",
    comisionventa: "",

    codigo: "",
    ci: "",
    nombre: "",
    apellido: "",
    direccion: "",

    fax: "",
    telefono: "",
    celular: "",
    email: "",
    fechanacimiento: "",
    genero: "",
    estadocivil: "",

    imagen: "",
    extension: "",

    estado: "",
    fecha: "",
    hora: "",

    error: {
        idvendedor: false,

        fkidciudadpais: false,
        fkidciudad: false,
        fkidcomisionventa: false,

        codigo: false,
        ci: false,
        nombre: false,
        apellido: false,

        email: false,
        fechanacimiento: false,
        genero: false,
        estadocivil: false,
    },
    message: {
        idvendedor: "",

        fkidciudadpais: "",
        fkidciudad: "",
        fkidcomisionventa: "",

        codigo: "",
        ci: "",
        nombre: "",
        apellido: "",

        email: "",
        fechanacimiento: "",
        genero: "",
        estadocivil: "",
    },

    reporte: {
        arrayVendedor: [],
        fecha: "",
        hora:  "",
    },
};

export const VendedorReducer = ( state = initialState, action = { payload, type} ) => {

    switch ( action.type ) {

        case Strings.vendedor_onChange:
            state = Object.assign( {}, action.payload );
            return state;

        case Strings.vendedor_onCreate:
            cleanObejct( state );
            state.idvendedor = action.payload.idvendedor;
            state.genero = "N";
            state.estadocivil = "N";
            state.estado = "A";
            state.loading = false;
            state = Object.assign( {}, state );
            return state;

        case Strings.vendedor_onEditar:
            onSetData( state, action.payload.vendedor );
            state.loading = false;
            state = Object.assign( {}, state );
            return state;

        case Strings.vendedor_onShow:
            onSetData( state, action.payload.vendedor );
            state.loading = false;
            state = Object.assign( {}, state );
            return state;

        case Strings.vendedor_setLoad:
            cleanObejct( state );
            state.loading = true;
            state = Object.assign( {}, state );
            return state;

        case Strings.vendedor_setLimpiar:
            cleanObejct( state );
            state = Object.assign( {}, state );
            return state;

        case Strings.vendedor_setState:
            cleanObejct( state );
            onSetData( state, action.payload );
            state = Object.assign( {}, state );
            return state;

        case Strings.vendedor_setImprimir:
            return {
                ...state,
                reporte: action.payload,
            };

        case Strings.vendedor_onFocus:
            state.focusInput = true;
            state = Object.assign( {}, state );
            return state;

        case Strings.vendedor_offFocus:
            state.focusInput = false;
            state = Object.assign( {}, state );
            return state;

        default:
            return state;
    };
};

function onSetData( state, payload ) {

    state.idvendedor = payload.idvendedor;
    state.x_idusuario = payload.x_idusuario;

    state.fkidciudadpais = payload.fkidciudadpais;
    state.ciudadpais = payload.ciudadpais;

    state.fkidciudad = payload.fkidciudad;
    state.ciudad = payload.ciudad;

    state.fkidcomisionventa = payload.fkidcomisionventa;
    state.comisionventa = payload.comisionventa;

    state.codigo = payload.codigo;
    state.ci = payload.ci;
    state.nombre = payload.nombre;
    state.apellido = payload.apellido;
    state.direccion = payload.direccion;

    state.fax = payload.fax;
    state.telefono = payload.telefono;
    state.celular = payload.celular;
    state.email = payload.email;
    state.fechanacimiento = Functions.convertYMDToDMY(payload.fechanacimiento);
    state.genero = payload.genero;
    state.estadocivil = payload.estadocivil;

    state.imagen = payload.imagen;
    state.extension = payload.extension;

    state.estado = payload.estado;
    state.fecha = payload.fecha;
    state.hora = payload.hora;
}

