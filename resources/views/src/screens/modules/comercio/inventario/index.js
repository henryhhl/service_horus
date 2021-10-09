
import React from 'react';
import PropTypes from 'prop-types';

import ModalDatoGeneral from './data/modal';
import ModalInventarioNota from './notas/modal';

function IndexModuleInventario( props ) {
    const { arrayMenu, visible, onClose } = props;

    function onValidarModule() {
        let array = arrayMenu;
        let submenu = array.pop();
        switch ( submenu ) {
            case "NOTAS":
                return (
                <ModalInventarioNota 
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

IndexModuleInventario.propTypes = {
    visible:    PropTypes.bool,
    onClose:    PropTypes.func,
    arrayMenu:  PropTypes.array,
}

IndexModuleInventario.defaultProps = {
    visible: false,
    onClose: () => {},
    arrayMenu: [],
}

export default React.memo( IndexModuleInventario );
