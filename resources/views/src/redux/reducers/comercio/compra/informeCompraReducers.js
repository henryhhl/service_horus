
import { Functions } from '../../../../utils/functions';
import { Strings } from '../../../constants';

const { cleanObejct, dateToString, initDate } = Functions;

const initialState = {

    imprimir: false,
    loading:  false,

    fechainicio: "",
    fechafinal: "",

    fkidmoneda: "",
    moneda: "",

    fkidalmacen: "",
    almacen: "",

    fkidsucursal: "",
    sucursal: "",

    fkidproveedor: "",
    proveedor: "",

    fkidconceptocompra: "",
    conceptocompra: "",

    fkidcategoria: "",
    categoria: "",

    fkidproductogrupo: "",
    productogrupo: "",

    fkidproductosubgrupo: "",
    productosubgrupo: "",

    fkidproductomarca: "",
    productomarca: "",

    fkidproducto: "",
    producto: "",

    formato: "PN",
    tipoinforme: "",
    tipocompra: "",
    rangoimporte: {
        init: "",
        finish: "",
    },

    reporte: {
        arrayInformeCompra: [],
        fecha: "",
        hora:  "",
    },
};

export const InformeCompraReducer = ( state = initialState, action = { payload, type} ) => {

    switch ( action.type ) {

        case Strings.informecompra_onChange:
            state = Object.assign( {}, action.payload );
            return state;

        case Strings.informecompra_setInit:
            cleanObejct( state );
            state.fechainicio = initDate();
            state.fechafinal  = dateToString();
            state.fkidmoneda = 1;
            state.moneda = "Bolivianos";
            state.tipoinforme = "N";
            state.tipocompra = "T";
            state.formato = "PN";
            state = Object.assign( {}, state );
            return state;

        case Strings.informecompra_setLoad:
            cleanObejct( state );
            state.loading = true;
            state = Object.assign( {}, state );
            return state;

        case Strings.informecompra_setLimpiar:
            cleanObejct( state );
            state = Object.assign( {}, state );
            return state;

        case Strings.informecompra_setImprimir: 
            return {
                ...state,
                reporte: action.payload,
            };
    
        default:
            return state;
    }
};
