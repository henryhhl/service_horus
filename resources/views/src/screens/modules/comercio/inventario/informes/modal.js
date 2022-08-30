
import React from 'react';
import PropTypes from 'prop-types';

import { C_ModalDraggable } from '../../../../../components';
import IndexInformeDiarioKardexProducto from './diarios/kardexproducto';

function ModalInventarioInforme( props ) {
    const { arrayMenu, visible, onClose } = props;

    function onValidarMenu() {
        let array = arrayMenu;
        let submenu = array.pop();
        switch ( submenu ) {

            case "informesdiarios":
                return (
                    <C_ModalDraggable
                        visible={visible}
                        onClose={onClose}
                        title="INFORMES DIARIOS"
                        width={"98%"} style={{ top: 20, }}
                    >
                        <IndexInformeDiarioKardexProducto
                            onClose={ onClose }
                        />
                    </C_ModalDraggable>
                );
        
            default:
                return null;
        }
    };

    return (
        <>
            { onValidarMenu() }
        </>
    );

};

ModalInventarioInforme.propTypes = {
    visible:    PropTypes.bool,
    onClose:    PropTypes.func,
    arrayMenu:  PropTypes.array,
}

ModalInventarioInforme.defaultProps = {
    visible: false,
    onClose: () => {},
    arrayMenu: [],
}

export default React.memo( ModalInventarioInforme );
