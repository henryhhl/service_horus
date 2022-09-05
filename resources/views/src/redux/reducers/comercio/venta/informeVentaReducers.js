
import { Functions } from '../../../../utils/functions';
import { Strings } from '../../../constants';

const { cleanObejct, dateToString, initDate } = Functions;

const initialState = {
    focusInput: false,
    imprimir: false,
    loading:  false,
    visible_pdf: false,

    fechainicio: "",
    fechafinal: "",

    tipomoneda: "",
    tipoinforme: "",
    tipoformato: "",
    tiponota: "",

    fkidmoneda: null,
    moneda: "",

    visible_sucursal: false,
    fkidsucursal: null,
    sucursal: "",

    visible_almacen: false,
    fkidalmacen: null,
    almacen: "",

    visible_conceptoventa: false,
    fkidconceptoventa: null,
    conceptoventa: "",

    visible_cliente: false,
    fkidcliente: null,
    cliente: "",

    visible_ciudad: false,
    fkidciudad: null,
    ciudad: "",

    visible_vendedor: false,
    fkidvendedor: null,
    vendedor: "",

    visible_categoria: false,
    fkidcategoria: null,
    categoria: "",

    visible_grupo: false,
    fkidgrupo: null,
    grupo: "",

    visible_subgrupo: false,
    fkidsubgrupo: null,
    subgrupo: "",

    visible_tipoproducto: false,
    fkidtipoproducto: null,
    tipoproducto: "",

    visible_marca: false,
    fkidmarca: null,
    marca: "",

    visible_producto: false,
    fkidproducto: null,
    producto: "",

    visible_usuario: false,
    fkidusuario: null,
    usuario: "",

    reporte: {
        arrayInformeVenta: [],
        fecha: "",
        hora:  "",
    },
}

export const InformeVentaReducer = ( state = initialState, action = { payload, type } ) => {
    const { payload, type} = action;
    switch ( type ) {
        case Strings.informeVenta_setInit:
            cleanObejct( state );
            state.fechainicio = initDate();
            state.fechafinal  = dateToString();
            state.tipoinforme = 'N';
            state = Object.assign( {}, state );
            return state;

        case Strings.informeVenta_onChange:
            state = Object.assign( {}, payload );
            return state;

        default:
            return state;
    };
};
