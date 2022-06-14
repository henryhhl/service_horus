
import React from 'react';
import PropTypes from 'prop-types';

import { C_ModalDraggable } from '../../../../../components';

import IndexSolicitudCompra from './solicitudcompra';
import IndexOrdenCompra from './ordencompra';
import IndexNotaCompra from './notacompra';
import IndexDevolucionCompra from './devolucioncompra';

function ModalCompraNota( props ) {
    const { arrayMenu, visible, onClose } = props;

    function onValidarMenu() {
        let array = arrayMenu;
        let submenu = array.pop();
        switch ( submenu ) {

            case "solicitudcompra":
                return (
                    <C_ModalDraggable
                        visible={visible}
                        onClose={onClose}
                        title="SOLICITUD COMPRA"
                        width={"98%"} style={{ top: 30, }}
                    >
                        <IndexSolicitudCompra
                            onClose={ onClose }
                        />
                    </C_ModalDraggable>
                );

            case "ordencompra":
                return (
                    <C_ModalDraggable
                        visible={visible}
                        onClose={onClose}
                        title="ORDEN COMPRA"
                        width={"98%"} style={{ top: 5, }}
                    >
                        <IndexOrdenCompra
                            onClose={ onClose }
                        />
                    </C_ModalDraggable>
                );

            case "notacompra":
                return (
                    <C_ModalDraggable
                        visible={visible}
                        onClose={onClose}
                        title="NOTA COMPRA"
                        width={"98%"} style={{ top: 5, }}
                    >
                        <IndexNotaCompra
                            onClose={ onClose }
                        />
                    </C_ModalDraggable>
                );

            case "devolucioncompra":
                return (
                    <C_ModalDraggable
                        visible={visible}
                        onClose={onClose}
                        title="DEVOLUCIÓN COMPRA"
                        width={"98%"} style={{ top: 20, }}
                    >
                        <IndexDevolucionCompra
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

ModalCompraNota.propTypes = {
    visible:    PropTypes.bool,
    onClose:    PropTypes.func,
    arrayMenu:  PropTypes.array,
}

ModalCompraNota.defaultProps = {
    visible: false,
    onClose: () => {},
    arrayMenu: [],
}

export default React.memo( ModalCompraNota );
