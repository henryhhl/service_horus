
import React from 'react';
import PropTypes from 'prop-types';

import { C_ModalDraggable } from '../../../../../../../components';
import C_ListadoCiudadClasificacion from '../components/listado';

function M_ListadoCiudadClasificacion( props ) {

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
            <C_ListadoCiudadClasificacion
                onChecked={ onChecked }
                value={ value }
                create={ create }
                // onCreate={ props.onCreate }
            />
        </C_ModalDraggable>
    );

};

M_ListadoCiudadClasificacion.propTypes = {
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


M_ListadoCiudadClasificacion.defaultProps = {
    visible: false,
    create: false,

    value: null,

    width: 400,
    zIndex: 1200,

    title: "CIUDAD CLASIFICACIÓN",
}

export default M_ListadoCiudadClasificacion;
