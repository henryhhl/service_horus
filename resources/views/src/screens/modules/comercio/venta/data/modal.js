
import React from 'react';
import PropTypes from 'prop-types';

import { C_ModalDraggable } from '../../../../../components';

import IndexUnionSucursal from './unionsucursal';
import IndexSucursal from './sucursal';
import IndexListaPrecio from './listaprecio';
import IndexClienteTipo from './clientetipo';
import IndexCliente from './cliente';
import IndexConceptoVenta from './conceptoventa';
import IndexComisionVenta from './comisionventa';
import IndexVendedor from './vendedor';
import IndexActividadEconomica from './actividadeconomica';
import IndexDosificacion from './dosificacion';

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
                        width={"95%"} style={{ top: 10, }}
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

            case "vendedor":
                return (
                    <C_ModalDraggable
                        visible={visible}
                        onClose={onClose}
                        title="VENDEDOR"
                        width={"95%"}
                    >
                        <IndexVendedor
                            onClose={ onClose }
                        />
                    </C_ModalDraggable>
                );

            case "comisionventa":
                return (
                    <C_ModalDraggable
                        visible={visible}
                        onClose={onClose}
                        title="COMISIÓN VENTA"
                        width={650}
                    >
                        <IndexComisionVenta
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
                        width={850}
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

            case "dosificacion":
                return (
                    <C_ModalDraggable
                        visible={visible}
                        onClose={onClose}
                        title="DOSIFICACIÓN"
                        width={"95%"} style={{ top: 10, }}
                    >
                        <IndexDosificacion
                            onClose={ onClose }
                        />
                    </C_ModalDraggable>
                );

            case "actividadeconomica":
                return (
                    <C_ModalDraggable
                        visible={visible}
                        onClose={onClose}
                        title="ACTIVIDAD ECONÓMICA"
                        width={650}
                    >
                        <IndexActividadEconomica
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
