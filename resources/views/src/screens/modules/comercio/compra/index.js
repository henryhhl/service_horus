
import React from 'react';
import PropTypes from 'prop-types';

import ModalDatoGeneral from './data/modal';
import ModalCompraNota from './notas/modal';
import ModalCompraInforme from './informes/modal';

function IndexModuleCompra( props ) {
    const { arrayMenu, visible, onClose } = props;

    function onValidarModule() {
        let array = arrayMenu;
        let submenu = array.pop();
        switch ( submenu ) {
            case "NOTAS":
                return (
                    <ModalCompraNota 
                        visible={ visible }
                        onClose={ onClose }
                        arrayMenu={ array }
                    />
                );

            case "DATO_GENERAL":
                return (
                    <ModalDatoGeneral 
                        visible={ visible }
                        onClose={ onClose }
                        arrayMenu={ array }
                    />
                );

            case "INFORMES":
                return (
                    <ModalCompraInforme 
                        visible={ visible }
                        onClose={ onClose }
                        arrayMenu={ array }
                    />
                );
        
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

IndexModuleCompra.propTypes = {
    visible:    PropTypes.bool,
    onClose:    PropTypes.func,
    arrayMenu:  PropTypes.array,
}

IndexModuleCompra.defaultProps = {
    visible: false,
    onClose: () => {},
    arrayMenu: [],
}

export default React.memo( IndexModuleCompra );
