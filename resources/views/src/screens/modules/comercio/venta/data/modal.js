
import React from 'react';
import PropTypes from 'prop-types';

import { C_ModalDraggable } from '../../../../../components';

import IndexUnionSucursal from './unionsucursal';
import IndexSucursal from './sucursal';
import IndexListaPrecio from './listaprecio';
import IndexClienteTipo from './clientetipo';
import IndexCliente from './cliente';
import IndexConceptoVenta from './conceptoventa';

function ModalDatoGeneral( props ) {
    const { arrayMenu, visible, onClose } = props;

    function onValidarMenu() {
        let array = arrayMenu;
        let submenu = array.pop();
        switch ( submenu ) {

            case "listaprecio":
                return (
                    <C_ModalDraggable
                        visible={visible}
                        onClose={onClose}
                        title="LISTA PRECIO"
                        width={"85%"} style={{ top: 40, }}
                    >
                        <IndexListaPrecio
                            onClose={ onClose }
                        />
                    </C_ModalDraggable>
                );

            case "conceptoventa":
                return (
                    <C_ModalDraggable
                        visible={visible}
                        onClose={onClose}
                        title="CONCEPTO VENTA"
                        width={650}
                    >
                        <IndexConceptoVenta
                            onClose={ onClose }
                        />
                    </C_ModalDraggable>
                );

            case "cliente":
                return (
                    <C_ModalDraggable
                        visible={visible}
                        onClose={onClose}
                        title="CLIENTE"
                        width={'95%'} style={{ top: 5, }}
                        bodyStyle={{ paddingLeft: 12, paddingRight: 12, }}
                    >
                        <IndexCliente
                            onClose={ onClose }
                        />
                    </C_ModalDraggable>
                );

            case "clientetipo":
                return (
                    <C_ModalDraggable
                        visible={visible}
                        onClose={onClose}
                        title="TIPO CLIENTE"
                        width={650}
                    >
                        <IndexClienteTipo
                            onClose={ onClose }
                        />
                    </C_ModalDraggable>
                );

            case "sucursal":
                return (
                    <C_ModalDraggable
                        visible={visible}
                        onClose={onClose}
                        title="SUCURSAL"
                        width={800}
                    >
                        <IndexSucursal
                            onClose={ onClose }
                        />
                    </C_ModalDraggable>
                );

            case "unionsucursal":
                return (
                    <C_ModalDraggable
                        visible={visible}
                        onClose={onClose}
                        title="UNIÓN SUCURSAL"
                        width={650}
                    >
                        <IndexUnionSucursal
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

ModalDatoGeneral.propTypes = {
    visible:    PropTypes.bool,
    onClose:    PropTypes.func,
    arrayMenu:  PropTypes.array,
}

ModalDatoGeneral.defaultProps = {
    visible: false,
    onClose: () => {},
    arrayMenu: [],
}

export default React.memo( ModalDatoGeneral );
