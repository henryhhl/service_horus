
import React from 'react';
import PropTypes from 'prop-types';

import { C_ModalDraggable } from '../../../../../../../components';
import C_ListadoListaPrecio from '../components/listado';

function M_ListadoListaPrecio( props ) {

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
            <C_ListadoListaPrecio
                onChecked={ onChecked }
                value={ value }
                create={ create }
                // onCreate={ props.onCreate }
            />
        </C_ModalDraggable>
    );

};

M_ListadoListaPrecio.propTypes = {
    visible: PropTypes.bool,
    create:  PropTypes.bool,

    value: PropTypes.any,

    width:  PropTypes.any,
    zIndex: PropTypes.number,

    title:    PropTypes.string,
    onClose:  PropTypes.func,
    onCreate: PropTypes.func,
    onChange: PropTypes.func,
}


M_ListadoListaPrecio.defaultProps = {
    visible: false,
    create: false,

    value: null,

    width: '70%',
    zIndex: 1200,

    title: "LISTA PRECIO",
}

export default M_ListadoListaPrecio;
