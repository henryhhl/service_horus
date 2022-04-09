
import React from 'react';
import PropTypes from 'prop-types';

import ModalDatoGeneral from './data/modal';
import ModalVentaNota from './notas/modal';

function IndexModuleVenta( props ) {
    const { arrayMenu, visible, onClose } = props;

    function onValidarModule() {
        let array = arrayMenu;
        let submenu = array.pop();
        switch ( submenu ) {
            case "NOTAS":
                return (
                    <ModalVentaNota
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

IndexModuleVenta.propTypes = {
    visible:    PropTypes.bool,
    onClose:    PropTypes.func,
    arrayMenu:  PropTypes.array,
}

IndexModuleVenta.defaultProps = {
    visible: false,
    onClose: () => {},
    arrayMenu: [],
}

export default React.memo( IndexModuleVenta );
