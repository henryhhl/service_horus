
import React from 'react';
import PropTypes from 'prop-types';

import { C_ModalDraggable } from '../../../../../../../components';
import C_ListadoNotaIngreso from '../components/listado';

function M_ListadoNotaIngreso( props ) {

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
            <C_ListadoNotaIngreso
                onChecked={ onChecked }
                value={ value }
                create={ create }
                // onCreate={ props.onCreate }
            />
        </C_ModalDraggable>
    );

};

M_ListadoNotaIngreso.propTypes = {
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


M_ListadoNotaIngreso.defaultProps = {
    visible: false,
    create: false,

    value: null,

    width: "85%",
    zIndex: 1200,

    title: "NOTA INGRESO",
}

export default M_ListadoNotaIngreso;
