
import React from 'react';
import PropTypes from 'prop-types';

import { C_ModalDraggable } from '../../../../../components';

import IndexProveedorTipo from './proveedortipo';
import IndexProveedorGrupo from './proveedorgrupo';
import IndexConceptoCompra from './conceptocompra';
import IndexProveedorCargo from './proveedorcargo';
import IndexProveedor from './proveedor';

function ModalDatoGeneral( props ) {
    const { arrayMenu, visible, onClose } = props;

    function onValidarMenu() {
        let array = arrayMenu;
        let submenu = array.pop();
        switch ( submenu ) {

            case "proveedor":
                return (
                    <C_ModalDraggable
                        visible={visible}
                        onClose={onClose}
                        title="PROVEEDOR"
                        width={"90%"} style={{ top: 20, }}
                    >
                        <IndexProveedor 
                            onClose={ onClose }
                        />
                    </C_ModalDraggable>
                );

            case "conceptocompra":
                return (
                    <C_ModalDraggable
                        visible={visible}
                        onClose={onClose}
                        title="CONCEPTO COMPRA"
                        width={650}
                    >
                        <IndexConceptoCompra 
                            onClose={ onClose }
                        />
                    </C_ModalDraggable>
                );

            case "proveedortipo":
                return (
                    <C_ModalDraggable
                        visible={visible}
                        onClose={onClose}
                        title="TIPO PROVEEDOR"
                        width={650}
                    >
                        <IndexProveedorTipo 
                            onClose={ onClose }
                        />
                    </C_ModalDraggable>
                );

            case "proveedorgrupo":
                return (
                    <C_ModalDraggable
                        visible={visible}
                        onClose={onClose}
                        title="GRUPO PROVEEDOR"
                        width={650}
                    >
                        <IndexProveedorGrupo 
                            onClose={ onClose }
                        />
                    </C_ModalDraggable>
                );

            case "proveedorcargo":
                return (
                    <C_ModalDraggable
                        visible={visible}
                        onClose={onClose}
                        title="CARGO PROVEEDOR"
                        width={650}
                    >
                        <IndexProveedorCargo 
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
