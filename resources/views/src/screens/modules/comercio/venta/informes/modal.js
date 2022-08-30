
import React from 'react';
import PropTypes from 'prop-types';

import { C_ModalDraggable } from '../../../../../components';
import IndexInformeDiarioGeneralVenta from './diarios/ventas';

function ModalVentaInforme( props ) {
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
                        <IndexInformeDiarioGeneralVenta
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

ModalVentaInforme.propTypes = {
    visible:    PropTypes.bool,
    onClose:    PropTypes.func,
    arrayMenu:  PropTypes.array,
}

ModalVentaInforme.defaultProps = {
    visible: false,
    onClose: () => {},
    arrayMenu: [],
}

export default React.memo( ModalVentaInforme );
