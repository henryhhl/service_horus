
import React from 'react';
import PropTypes from 'prop-types';

import { C_ModalDraggable } from '../../../../../../../components';
import C_ListadoCategoria from '../components/listado';

function M_ListadoCategoria( props ) {

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
            <C_ListadoCategoria
                onChecked={ onChecked }
                value={ value }
                create={ create }
                // onCreate={ props.onCreate }
            />
        </C_ModalDraggable>
    );

};

M_ListadoCategoria.propTypes = {
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


M_ListadoCategoria.defaultProps = {
    visible: false,
    create: false,

    value: null,

    width: 400,
    zIndex: 1200,

    title: "CATEGORÍA",
}

export default M_ListadoCategoria;
