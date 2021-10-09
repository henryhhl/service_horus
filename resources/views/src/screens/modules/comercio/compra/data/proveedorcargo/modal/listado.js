
import React from 'react';
import PropTypes from 'prop-types';

import { C_ModalDraggable } from '../../../../../../../components';
import C_ListadoProveedorCargo from '../components/listado';

function M_ListadoProveedorCargo( props ) {

    const { create, value } = props;

    function onChecked( data ) {
        if ( props.onChange ) {
            props.onChange( data );
        }
    }

    return (
        <C_ModalDraggable
            visible={ props.visible } onClose={ props.onClose }
            maskStyle={{ background: "transparent", }}
            width={props.width}  zIndex={ props.zIndex }  
            title={ props.title }
        >
            <C_ListadoProveedorCargo
                onChecked={ onChecked }
                value={ value }
                create={ create }
                // onCreate={ props.onCreate }
            />
        </C_ModalDraggable>
    );

};

M_ListadoProveedorCargo.propTypes = {
    visible: PropTypes.bool,
    create:  PropTypes.bool,

    value: PropTypes.any,

    width:  PropTypes.number,
    zIndex: PropTypes.number,

    title:    PropTypes.string,
    onClose:  PropTypes.func,
    onCreate: PropTypes.func,
    onChange: PropTypes.func,
}


M_ListadoProveedorCargo.defaultProps = {
    visible: false,
    create: false,

    value: null,

    width: 400,
    zIndex: 1200,

    title: "CARGO PROVEEDOR",
}

export default M_ListadoProveedorCargo;
