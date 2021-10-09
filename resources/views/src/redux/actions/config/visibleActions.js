
import { Strings } from "../../constants";

const showNotaIngreso = ( ) => ( {
    type: Strings.showNotaIngreso,
} );
const hideNotaIngreso = ( ) => ( {
    type: Strings.hideNotaIngreso,
} );


const showNotaSalida = ( ) => ( {
    type: Strings.showNotaSalida,
} );
const hideNotaSalida = ( ) => ( {
    type: Strings.hideNotaSalida,
} );


const showNotaTraspaso = ( ) => ( {
    type: Strings.showNotaTraspaso,
} );
const hideNotaTraspaso = ( ) => ( {
    type: Strings.hideNotaTraspaso,
} );


const showMarca = ( ) => ( {
    type: Strings.showMarca,
} );
const hideMarca = ( ) => ( {
    type: Strings.hideMarca,
} );


const showProducto = ( ) => ( {
    type: Strings.showProducto,
} );
const hideProducto = ( ) => ( {
    type: Strings.hideProducto,
} );


const showCiudad = ( ) => ( {
    type: Strings.showCiudad,
} );
const hideCiudad = ( ) => ( {
    type: Strings.hideCiudad,
} );


const showCiudadClasificacion = ( ) => ( {
    type: Strings.showCiudadClasificacion,
} );
const hideCiudadClasificacion = ( ) => ( {
    type: Strings.hideCiudadClasificacion,
} );

export const visibleActions = {
    showNotaIngreso,
    hideNotaIngreso,

    showNotaSalida,
    hideNotaSalida,

    showNotaTraspaso,
    hideNotaTraspaso,

    showMarca,
    hideMarca,

    showProducto,
    hideProducto,

    showCiudad,
    hideCiudad,

    showCiudadClasificacion,
    hideCiudadClasificacion,
};


