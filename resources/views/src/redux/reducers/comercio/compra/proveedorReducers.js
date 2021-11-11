
import { Functions } from '../../../../utils/functions';
import { Strings } from '../../../constants';

const { cleanObejct } = Functions;

const initialState = {

    focusInput: false,
    update: false,
    imprimir: false,
    loading:  false,

    idproveedor: "",

    fkidciudadpais: "",
    ciudadpais: "",

    fkidciudad: "",
    ciudad: "",

    fkidproveedortipo: "",
    proveedortipo: "",

    fkidproveedorgrupo: "",
    proveedorgrupo: "",

    codigo: "",
    nombre: "",
    direccion: "",
    nit: "",

    telefono: "",
    celular: "",
    fax: "",
    email: "",
    contacto: "",
    sitioweb: "",
    nroorden: "",

    diascredito: "",
    formadepago: "",

    tipopersoneria: "",

    imagen: "",
    extension: "",

    fechaalta: "",
    fechabaja: "",

    estado: "",
    fecha: "",
    hora: "",

    arrayProductoTipo: [],
    arrayDeleteProductoTipo: [],

    arrayProveedorPersonal: [],
    arrayDeleteProveedorPersonal: [],

    arrayProducto: [],
    arrayDeleteProducto: [],

    error: {
        nombre:  false,
        fkidciudad: false,
        fkidciudadpais: false,
        fkidproveedorgrupo: false,
        fkidproveedortipo: false,
        direccion: false,
        nit: false,
        telefono: false,
        celular: false,
        fax: false,
        email: false,
    },
    message: {
        nombre:  "",
        fkidciudadpais: "",
        fkidciudad: "",
        fkidproveedortipo: "",
        fkidproveedorgrupo: "",
        direccion: "",
        nit :"",
        telefono: "",
        celular: "",
        fax: "",
        email: "",
    },

    reporte: {
        arrayProveedor: [],
        fecha: "",
        hora:  "",
    },
};

export const ProveedorReducer = ( state = initialState, action = { payload, type} ) => {

    switch ( action.type ) {

        case Strings.proveedor_onChange:
            state = Object.assign( {}, action.payload );
            return state;

        case Strings.proveedor_onCreate:
            cleanObejct( state );
            state.idproveedor = action.payload.idproveedor;
            state.tipopersoneria = "J";
            state.nroorden = "0";
            state.diascredito = "0";

            state.arrayProductoTipo = loadProductoTipo();
            state.arrayProveedorPersonal = loadProveedorPersonal();
            state.arrayProducto = loadProducto();

            let arrayProductoTipo = action.payload.arrayProductoTipo;
            state.arrayProductoTipo[0].fkidproductotipo = arrayProductoTipo.length == 0 ? null : arrayProductoTipo[0].idproductotipo;
            state.arrayProductoTipo[0].productotipo = arrayProductoTipo.length == 0 ? "" : arrayProductoTipo[0].descripcion;

            state.loading = false;
            state = Object.assign( {}, state );
            return state;

        case Strings.proveedor_onEditar:
            onSetData( state, action.payload.proveedor );
            state.loading = false;
            state = Object.assign( {}, state );
            return state;

        case Strings.proveedor_onShow:
            onSetData( state, action.payload.proveedor );
            state.loading = false;
            state = Object.assign( {}, state );
            return state;

        case Strings.proveedor_setLoad:
            cleanObejct( state );
            state.loading = true;
            state = Object.assign( {}, state );
            return state;

        case Strings.proveedor_setLimpiar:
            cleanObejct( state );
            state.arrayProductoTipo = loadProductoTipo();
            state.arrayProveedorPersonal = loadProveedorPersonal();
            state = Object.assign( {}, state );
            return state;

        case Strings.proveedor_setState:
            cleanObejct( state );
            onSetData( state, action.payload );
            state = Object.assign( {}, state );
            return state;

        case Strings.proveedor_setImprimir: 
            return {
                ...state,
                reporte: action.payload,
            };

        case Strings.proveedor_onFocus:
            state.focusInput = true;
            state = Object.assign( {}, state );
            return state;

        case Strings.proveedor_offFocus:
            state.focusInput = false;
            state = Object.assign( {}, state );
            return state;
    
        default:
            return state;
    }
};

function onSetData( state, payload ) {
    state.idproveedor   = payload.idproveedor;
    
    state.fkidciudadpais = payload.fkidciudadpais;
    state.ciudadpais = payload.ciudadpais;

    state.fkidciudad = payload.fkidciudad;
    state.ciudad = payload.ciudad;

    state.fkidproveedortipo = payload.fkidproveedortipo;
    state.proveedortipo = payload.proveedortipo;

    state.fkidproveedorgrupo = payload.fkidproveedorgrupo;
    state.proveedorgrupo = payload.proveedorgrupo;

    state.codigo = payload.codigo;
    state.nombre = payload.nombre;
    state.direccion = payload.direccion;
    state.nit = payload.nit;

    state.telefono = payload.telefono;
    state.celular = payload.celular;
    state.fax = payload.fax;
    state.contacto = payload.contacto;
    state.email = payload.email;
    state.sitioweb = payload.sitioweb;
    state.nroorden = payload.nroorden;

    state.diascredito = payload.diascredito;
    state.formadepago = payload.formadepago;

    state.tipopersoneria = payload.tipopersoneria;

    state.imagen = payload.imagen;
    state.extension = payload.extension;

    state.fechaalta = Functions.convertYMDToDMY(payload.fechaalta);
    state.fechabaja = Functions.convertYMDToDMY(payload.fechabaja);

    let array = [];
    for ( let index = 0; index < payload.arrayproveedorproductotipo.length; index++ ) {
        const detalle = payload.arrayproveedorproductotipo[index];
        let element = {
            idproveedorproductotipo: detalle.idproveedorproductotipo,
            fkidproveedor:    detalle.fkidproveedor,
            fkidproductotipo: detalle.fkidproductotipo,
            productotipo:     detalle.productotipo,
        };
        array = [ ...array, element];
    }
    if ( array.length === 0 ) {
        let element = {
            idproveedorproductotipo: null,
            fkidproveedor: null,
            fkidproductotipo: null,
            productotipo: "",
        };
        array = [ ...array, element];
    }
    state.arrayProductoTipo = array;

    array = [];
    for ( let index = 0; index < payload.arrayproveedorpersonal.length; index++ ) {
        const detalle = payload.arrayproveedorpersonal[index];
        let element = {
            idproveedorpersonal: detalle.idproveedorpersonal,
            fkidproveedor:    detalle.fkidproveedor,

            fkidproveedorcargo: detalle.fkidproveedorcargo,
            proveedorcargo:     detalle.proveedorcargo,

            codigo:   detalle.codigo,
            nombre:   detalle.nombre,
            apellido: detalle.apellido,
            telefono: detalle.telefono,
            celular:  detalle.celular,
            email:    detalle.email,

            imagen:    detalle.imagen,
            extension: detalle.extension,

            error: {
                nombre: false,
                apellido: false,
                fkidproveedorcargo: false,
            },
            message: {
                nombre: "",
                apellido: "",
                fkidproveedorcargo: "",
            },
        };
        array = [ ...array, element];
    }
    if ( array.length === 0 ) {
        let element = {
            idproveedorpersonal: null,
            fkidproveedor: null,

            fkidproveedorcargo: null,
            proveedorcargo: "",

            codigo: "",
            nombre: "",
            apellido: "",
            telefono: "",
            celular: "",
            email: "",

            imagen: "",
            extension: "",

            error: {
                nombre: false,
                apellido: false,
                fkidproveedorcargo: false,
            },
            message: {
                nombre: "",
                apellido: "",
                fkidproveedorcargo: "",
            },
        };
        array = [ ...array, element];
    }
    state.arrayProveedorPersonal = array;

}

function loadProductoTipo( ) {
    let array = [];
    for (let index = 0; index < 3; index++) {
        const element = {
            idproveedorproductotipo: null,
            fkidproveedor: null,
            fkidproductotipo: null,
            productotipo: "",
        };
        array = [ ...array, element];
    }
    return array;
};

function loadProveedorPersonal() {
    let array = [];
    for (let index = 0; index < 2; index++) {
        const element = {
            idproveedorpersonal: null,
            fkidproveedor: null,

            fkidproveedorcargo: null,
            proveedorcargo: "",

            codigo: "",
            nombre: "",
            apellido: "",
            telefono: "",
            celular: "",
            email: "",

            imagen: "",
            extension: "",

            error: {
                nombre: false,
                apellido: false,
                fkidproveedorcargo: false,
            },
            message: {
                nombre: "",
                apellido: "",
                fkidproveedorcargo: "",
            },

        };
        array = [ ...array, element];
    }
    return array;
};

function loadProducto() {
    let array = [];
    for (let index = 0; index < 3; index++) {
        const element = {
            idproveedorproducto: null,
            fkidproveedor: null,
            fkidproducto: null,
            costounitario: '',

            error: {
                fkidproducto: false,
                costounitario: false,
            },
            message: {
                fkidproducto: "",
                costounitario: "",
            },

        };
        array = [ ...array, element];
    }
    return array;
};
