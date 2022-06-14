
import React from 'react';
import PropTypes from 'prop-types';

import { C_ModalDraggable } from '../../../../../../../components';
import C_ListadoOrdenCompra from '../components/listado';

function M_ListadoOrdenCompra( props ) {

    const { create, value } = props;

    function onChecked( data ) {
        if ( props.onChange ) {
            props.onChange( data );
        }
    }

    return (
        <C_ModalDraggable
            visible={ props.visible } onClose={ props.onClose }
            // maskStyle={{ background: "transparent", }}
            width={props.width}  zIndex={ props.zIndex }  
            title={ props.title }
        >
            <C_ListadoOrdenCompra
                onChecked={ onChecked }
                value={ value }
                create={ create }
                iscompra={props.iscompra}
                // onCreate={ props.onCreate }
            />
        </C_ModalDraggable>
    );

};

M_ListadoOrdenCompra.propTypes = {
    visible: PropTypes.bool,
    create:  PropTypes.bool,

    value: PropTypes.any,

    width:  PropTypes.any,
    zIndex: PropTypes.number,

    title:    PropTypes.string,
    iscompra: PropTypes.string,
    onClose:  PropTypes.func,
    onCreate: PropTypes.func,
    onChange: PropTypes.func,
}


M_ListadoOrdenCompra.defaultProps = {
    visible: false,
    create: false,

    value: null,

    width: "90%",
    zIndex: 1200,

    title: "ORDEN COMPRA",
    iscompra: null,
}

export default M_ListadoOrdenCompra;
