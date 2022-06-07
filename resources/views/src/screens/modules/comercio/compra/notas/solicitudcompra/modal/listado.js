
import React from 'react';
import PropTypes from 'prop-types';

import { C_ModalDraggable } from '../../../../../../../components';
import C_ListadoSolicitudCompra from '../components/listado';

function M_ListadoSolicitudCompra( props ) {

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
            <C_ListadoSolicitudCompra
                onChecked={ onChecked }
                value={ value }
                create={ create }
                isordencompra={props.isordencompra}
                // onCreate={ props.onCreate }
            />
        </C_ModalDraggable>
    );

};

M_ListadoSolicitudCompra.propTypes = {
    visible: PropTypes.bool,
    create:  PropTypes.bool,

    value: PropTypes.any,

    width:  PropTypes.any,
    zIndex: PropTypes.number,

    title:    PropTypes.string,
    isordencompra: PropTypes.bool,

    onClose:  PropTypes.func,
    onCreate: PropTypes.func,
    onChange: PropTypes.func,
}


M_ListadoSolicitudCompra.defaultProps = {
    visible: false,
    create: false,

    value: null,

    width: "88%",
    zIndex: 1200,

    title: "SOLICITUD COMPRA",
    isordencompra: false,
}

export default M_ListadoSolicitudCompra;
