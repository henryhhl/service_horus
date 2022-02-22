
import { Functions } from '../../../../utils/functions';
import { Strings } from '../../../constants';

const { cleanObejct } = Functions;

const initialState = {

    focusInput: false,
    update: false,
    imprimir: false,
    loading:  false,

    idcliente: "",
    x_idusuario: "",

    fkidciudadpais: "",
    ciudadpais: "",
    fkidciudad: "",
    ciudad: "",
    fkidclientetipo: "",
    clientetipo: "",
    fkidlistaprecio: "",
    fkidconceptoventa: "",
    fkidsucursal: "",

    codigo: "",
    nombre: "",
    apellido: "",
    razonsocial: "",

    nit: "",
    email: "",
    casilla: "",
    fax: "",
    telefono: "",
    celular: "",
    contacto: "",
    direccion: "",

    diascredito: "",
    limitecredito: "",

    descuento: "",
    cantidaditems: "",
    descuentoxcantidaditems: "",
    descuentoinicial: "",
    descuentofinal: "",

    montototaladeudado: "",
    fechaultimopago: "",
    montototaladeudadoultimopago: "",
    fechaultimaventa: "",
    montototalultimaventa: "",

    tipopersoneria: "",
    imagen: "",
    extension: "",

    estado: "",
    fecha: "",
    hora: "",

    error: {
        idcliente: false,

        fkidciudadpais: false,
        fkidciudad: false,
        fkidclientetipo: false,
        fkidlistaprecio: false,
        fkidconceptoventa: false,
        fkidsucursal: false,

        codigo: false,
        nombre: false,
        apellido: false,
        razonsocial: false,
        email: false,

        diascredito: false,
        limitecredito: false,

        descuento: false,
        cantidaditems: false,
        descuentoxcantidaditems: false,
        descuentoinicial: false,
        descuentofinal: false,

        montototaladeudado: false,
        fechaultimopago: false,
        montototaladeudadoultimopago: false,
        fechaultimaventa: false,
        montototalultimaventa: false,

        tipopersoneria: false,
    },
    message: {
        idcliente: "",

        fkidciudadpais: "",
        fkidciudad: "",
        fkidclientetipo: "",
        fkidlistaprecio: "",
        fkidconceptoventa: "",
        fkidsucursal: "",

        codigo: "",
        nombre: "",
        apellido: "",
        razonsocial: "",
        email: "",

        diascredito: "",
        limitecredito: "",

        descuento: "",
        cantidaditems: "",
        descuentoxcantidaditems: "",
        descuentoinicial: "",
        descuentofinal: "",

        montototaladeudado: "",
        fechaultimopago: "",
        montototaladeudadoultimopago: "",
        fechaultimaventa: "",
        montototalultimaventa: "",

        tipopersoneria: "",
    },

    reporte: {
        arrayCliente: [],
        fecha: "",
        hora:  "",
    },
};

export const ClienteReducer = ( state = initialState, action = { payload, type} ) => {

    switch ( action.type ) {

        case Strings.cliente_onChange:
            state = Object.assign( {}, action.payload );
            return state;

        case Strings.cliente_onCreate:
            cleanObejct( state );
            state.idcliente = action.payload.idcliente;
            state.tipopersoneria = "S";
            state.estado = "A";
            state.diascredito = 0;
            state.limitecredito = 0;
            state.descuento = 0;
            state.cantidaditems = 0;
            state.descuentoxcantidaditems = 0;
            state.descuentoinicial = 0;
            state.descuentofinal = 0;
            state.montototaladeudado = 0;
            state.montototaladeudadoultimopago = 0;
            state.montototalultimaventa = 0;
            state.loading = false;
            state = Object.assign( {}, state );
            return state;

        case Strings.cliente_onEditar:
            onSetData( state, action.payload.cliente );
            state.loading = false;
            state = Object.assign( {}, state );
            return state;

        case Strings.cliente_onShow:
            onSetData( state, action.payload.cliente );
            state.loading = false;
            state = Object.assign( {}, state );
            return state;

        case Strings.cliente_setLoad:
            cleanObejct( state );
            state.loading = true;
            state = Object.assign( {}, state );
            return state;

        case Strings.cliente_setLimpiar:
            cleanObejct( state );
            state = Object.assign( {}, state );
            return state;

        case Strings.cliente_setState:
            cleanObejct( state );
            onSetData( state, action.payload );
            state = Object.assign( {}, state );
            return state;

        case Strings.cliente_setImprimir:
            return {
                ...state,
                reporte: action.payload,
            };

        case Strings.cliente_onFocus:
            state.focusInput = true;
            state = Object.assign( {}, state );
            return state;

        case Strings.cliente_offFocus:
            state.focusInput = false;
            state = Object.assign( {}, state );
            return state;

        default:
            return state;
    };
};

function onSetData( state, payload ) {

    state.idcliente = payload.idcliente;
    state.x_idusuario = payload.x_idusuario;

    state.fkidciudadpais = payload.fkidciudadpais;
    state.ciudadpais = payload.ciudadpais;

    state.fkidciudad = payload.fkidciudad;
    state.ciudad = payload.ciudad;

    state.fkidclientetipo = payload.fkidclientetipo;
    state.clientetipo = payload.tipocliente;

    state.fkidlistaprecio = payload.fkidlistaprecio;
    state.fkidconceptoventa = payload.fkidconceptoventa;
    state.fkidsucursal = payload.fkidsucursal;

    state.codigo = payload.codigo;
    state.nombre = payload.nombre;
    state.apellido = payload.apellido;
    state.razonsocial = payload.razonsocial;

    state.nit = payload.nit;
    state.email = payload.email;
    state.casilla = payload.casilla;
    state.fax = payload.fax;
    state.telefono = payload.telefono;
    state.celular = payload.celular;
    state.contacto = payload.contacto;
    state.direccion = payload.direccion;

    state.diascredito = payload.diascredito;
    state.limitecredito = parseFloat(payload.limitecredito).toFixed(2);

    state.descuento = payload.descuento;
    state.cantidaditems = payload.cantidaditems;
    state.descuentoxcantidaditems = payload.descuentoxcantidaditems;
    state.descuentoinicial = payload.descuentoinicial;
    state.descuentofinal = payload.descuentofinal;

    state.montototaladeudado = parseFloat(payload.montototaladeudado).toFixed(2);
    state.fechaultimopago = payload.fechaultimopago;
    state.montototaladeudadoultimopago = parseFloat(payload.montototaladeudadoultimopago).toFixed(2);
    state.fechaultimaventa = payload.fechaultimaventa;
    state.montototalultimaventa = parseFloat(payload.montototalultimaventa).toFixed(2);

    state.tipopersoneria = payload.tipopersoneria;
    state.imagen = payload.imagen;
    state.extension = payload.extension;

    state.estado = payload.estado;
    state.fecha = payload.fecha;
    state.hora = payload.hora;
}

