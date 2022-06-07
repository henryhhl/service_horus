
import React from 'react';
import PropTypes from 'prop-types';

import { C_ModalDraggable } from '../../../../../../../components';
import C_ListadoUnidadMedidaProducto from '../components/listado';

function M_ListadoUnidadMedidaProducto( props ) {

    const { value } = props;

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
            title={ props.title } keyboard maskClosable
        >
            <C_ListadoUnidadMedidaProducto
                onChecked={ onChecked }
                value={ value }
                data={props.data}
                isventa={props.isventa}
                // onCreate={ props.onCreate }
            />
        </C_ModalDraggable>
    );

};

M_ListadoUnidadMedidaProducto.propTypes = {
    visible: PropTypes.bool,

    value: PropTypes.any,

    width:  PropTypes.any,
    zIndex: PropTypes.number,

    data: PropTypes.array,

    title:    PropTypes.string,
    isventa:  PropTypes.string,
    onClose:  PropTypes.func,
    onChange: PropTypes.func,
}


M_ListadoUnidadMedidaProducto.defaultProps = {
    visible: false,
    value: null,

    width: "90%",
    zIndex: 1200,

    data: [],

    title: "LISTADO DE PRODUCTO",
    isventa: "T",
}

export default M_ListadoUnidadMedidaProducto;
