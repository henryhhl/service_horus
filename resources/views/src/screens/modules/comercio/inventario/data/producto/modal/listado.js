
import React from 'react';
import PropTypes from 'prop-types';

import { C_ModalDraggable } from '../../../../../../../components';
import C_ListadoProducto from '../components/listado';

function M_ListadoProducto( props ) {

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
            <C_ListadoProducto
                onChecked={ onChecked }
                value={ value }
                create={ create }
                fkidalmacen={props.fkidalmacen}
                arrayFKIDProducto={props.arrayFKIDProducto}
                // onCreate={ props.onCreate }
            />
        </C_ModalDraggable>
    );

};

M_ListadoProducto.propTypes = {
    visible: PropTypes.bool,
    create:  PropTypes.bool,

    value: PropTypes.any,
    fkidalmacen: PropTypes.any,
    arrayFKIDProducto: PropTypes.array,

    width:  PropTypes.any,
    zIndex: PropTypes.number,

    title:    PropTypes.string,
    onClose:  PropTypes.func,
    onCreate: PropTypes.func,
    onChange: PropTypes.func,
}


M_ListadoProducto.defaultProps = {
    visible: false,
    create: false,

    value: null,
    fkidalmacen: null,
    arrayFKIDProducto: [],

    width: "85%",
    zIndex: 1200,

    title: "PRODUCTO",
}

export default M_ListadoProducto;
