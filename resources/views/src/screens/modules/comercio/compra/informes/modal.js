
import React from 'react';
import PropTypes from 'prop-types';

import { C_ModalDraggable } from '../../../../../components';

import IndexInformeGeneralNotacompra from './notacomprageneral';
import IndexInformeOrdenCompraPlanilla from './ordencompraplanilla';
import IndexInformeSolicitudCompraPlanilla from './solicitudcompraplanilla';
import IndexInformeGeneralNotacompraEspecial from './notacompraespecial';

function ModalCompraInforme( props ) {
    const { arrayMenu, visible, onClose } = props;

    function onValidarMenu() {
        let array = arrayMenu;
        let submenu = array.pop();
        switch ( submenu ) {

            case "informegeneralnotacompra":
                return (
                    <C_ModalDraggable
                        visible={visible}
                        onClose={onClose}
                        title="INFORME GENERAL NOTA COMPRA"
                        width={850} style={{ top: 30, }}
                    >
                        <IndexInformeGeneralNotacompra
                            onClose={ onClose }
                        />
                    </C_ModalDraggable>
                );

            case "planillaordenesnotacompra":
                return (
                    <C_ModalDraggable
                        visible={visible}
                        onClose={onClose}
                        title="INFORME GENERAL ORDEN COMPRA"
                        width={850} style={{ top: 30, }}
                    >
                        <IndexInformeOrdenCompraPlanilla
                            onClose={ onClose }
                        />
                    </C_ModalDraggable>
                );

            case "planillasolicitudcompra":
                return (
                    <C_ModalDraggable
                        visible={visible}
                        onClose={onClose}
                        title="INFORME GENERAL SOLICITUD COMPRA"
                        width={850} style={{ top: 30, }}
                    >
                        <IndexInformeSolicitudCompraPlanilla
                            onClose={ onClose }
                        />
                    </C_ModalDraggable>
                );

            case "informecompraespecial":
                return (
                    <C_ModalDraggable
                        visible={visible}
                        onClose={onClose}
                        title="INFORME NOTA COMPRA ESPECIAL"
                        width={850} style={{ top: 30, }}
                    >
                        <IndexInformeGeneralNotacompraEspecial
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

ModalCompraInforme.propTypes = {
    visible:    PropTypes.bool,
    onClose:    PropTypes.func,
    arrayMenu:  PropTypes.array,
}

ModalCompraInforme.defaultProps = {
    visible: false,
    onClose: () => {},
    arrayMenu: [],
}

export default React.memo( ModalCompraInforme );
