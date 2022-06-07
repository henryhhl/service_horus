
import React from 'react';
import PropTypes from 'prop-types';

import { C_ModalDraggable } from '../../../../../components';

import IndexNotaVenta from './notaventa';
import IndexDevolucionNotaVenta from './devolucionnotaventa';

function ModalVentaNota( props ) {
    const { arrayMenu, visible, onClose } = props;

    function onValidarMenu() {
        let array = arrayMenu;
        let submenu = array.pop();
        switch ( submenu ) {

            case "notaventa":
                return (
                    <C_ModalDraggable
                        visible={visible}
                        onClose={onClose}
                        title="NOTA VENTA"
                        width={"98%"} style={{ top: 10, }}
                    >
                        <IndexNotaVenta
                            onClose={ onClose }
                        />
                    </C_ModalDraggable>
                );

            case "devolucionnotaventa":
                return (
                    <C_ModalDraggable
                        visible={visible}
                        onClose={onClose}
                        title="DEVOLUCIÓN NOTA VENTA"
                        width={"98%"} style={{ top: 10, }}
                    >
                        <IndexDevolucionNotaVenta
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

ModalVentaNota.propTypes = {
    visible:    PropTypes.bool,
    onClose:    PropTypes.func,
    arrayMenu:  PropTypes.array,
}

ModalVentaNota.defaultProps = {
    visible: false,
    onClose: () => {},
    arrayMenu: [],
}

export default React.memo( ModalVentaNota );
