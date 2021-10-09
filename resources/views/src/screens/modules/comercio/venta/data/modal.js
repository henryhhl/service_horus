
import React from 'react';
import PropTypes from 'prop-types';

import { C_ModalDraggable } from '../../../../../components';

import IndexUnionSucursal from './unionsucursal';
import IndexSucursal from './sucursal';
import IndexListaPrecio from './listaprecio';

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

            case "sucursal":
                return (
                    <C_ModalDraggable
                        visible={visible}
                        onClose={onClose}
                        title="SUCURSAL"
                        width={650}
                    >
                        <IndexSucursal 
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
