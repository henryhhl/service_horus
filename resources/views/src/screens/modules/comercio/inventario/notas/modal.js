
import React from 'react';
import PropTypes from 'prop-types';

import { C_ModalDraggable } from '../../../../../components';

import IndexNotaIngreso from './ingreso';
import IndexNotaSalida from './salida';

function ModalInventarioNota( props ) {
    const { arrayMenu, visible, onClose } = props;

    function onValidarMenu() {
        let array = arrayMenu;
        let submenu = array.pop();
        switch ( submenu ) {

            case "notaingreso":
                return (
                    <C_ModalDraggable
                        visible={visible}
                        onClose={onClose}
                        title="NOTA INGRESO"
                        width={"98%"} style={{ top: 30, }}
                    >
                        <IndexNotaIngreso
                            onClose={ onClose }
                        />
                    </C_ModalDraggable>
                );

            case "notasalida":
                return (
                    <C_ModalDraggable
                        visible={visible}
                        onClose={onClose}
                        title="NOTA SALIDA"
                        width={"98%"} style={{ top: 30, }}
                    >
                        <IndexNotaSalida
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

ModalInventarioNota.propTypes = {
    visible:    PropTypes.bool,
    onClose:    PropTypes.func,
    arrayMenu:  PropTypes.array,
}

ModalInventarioNota.defaultProps = {
    visible: false,
    onClose: () => {},
    arrayMenu: [],
}

export default React.memo( ModalInventarioNota );
