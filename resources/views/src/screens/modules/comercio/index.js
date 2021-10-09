
import React from 'react';
import PropTypes from 'prop-types';

import IndexModuleInventario from './inventario';
import IndexModuleVenta from './venta';
import IndexModuleCompra from './compra';

function IndexComercio( props ) {
    console.log("Index Comercio")
    const { arrayMenu, visible, onClose } = props;

    function onValidarModule() {
        let array = arrayMenu;
        let submenu = array.pop();
        switch ( submenu ) {
            case "INVENTARIO":
                return (
                    <IndexModuleInventario 
                        visible={ visible }
                        onClose={ onClose }
                        arrayMenu={ array }
                    />
                );

            case "COMPRA":
                return (
                    <IndexModuleCompra 
                        visible={ visible }
                        onClose={ onClose }
                        arrayMenu={ array }
                    />
                );

            case "VENTA":
                return (
                    <IndexModuleVenta 
                        visible={ visible }
                        onClose={ onClose }
                        arrayMenu={ array }
                    />
                );

            case "PRODUCCION":
                return null;

            case "CONFIGURACION":
                return null;
        
            default:
                return null;
        }
    };

    return (
        <>
            { onValidarModule() }
        </>
    );

};

IndexComercio.propTypes = {
    visible:    PropTypes.bool,
    onClose:    PropTypes.func,
    arrayMenu:  PropTypes.array,
}

IndexComercio.defaultProps = {
    visible: false,
    onClose: () => {},
    arrayMenu: [],
}

export default React.memo( IndexComercio );
