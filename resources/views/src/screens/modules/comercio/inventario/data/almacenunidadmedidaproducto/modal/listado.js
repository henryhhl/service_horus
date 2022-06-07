
import React from 'react';
import PropTypes from 'prop-types';

import { C_ModalDraggable } from '../../../../../../../components';
import C_ListadoAlmacenUnidadMedidaProducto from '../components/listado';

function M_ListadoAlmacenUnidadMedidaProducto( props ) {

    const { value } = props;

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
            title={ props.title } keyboard maskClosable
        >
            <C_ListadoAlmacenUnidadMedidaProducto
                onChecked={ onChecked }
                value={ value }
                data={props.data}
                isventa={props.isventa}
                fkidalmacen={props.fkidalmacen}
                estado={props.estado}
                // onCreate={ props.onCreate }
            />
        </C_ModalDraggable>
    );

};

M_ListadoAlmacenUnidadMedidaProducto.propTypes = {
    visible: PropTypes.bool,

    value: PropTypes.any,

    width:  PropTypes.any,
    zIndex: PropTypes.number,

    data: PropTypes.array,

    title:    PropTypes.string,
    isventa:  PropTypes.string,
    estado:  PropTypes.string,
    fkidalmacen:  PropTypes.number,
    onClose:  PropTypes.func,
    onChange: PropTypes.func,
}


M_ListadoAlmacenUnidadMedidaProducto.defaultProps = {
    visible: false,
    value: null,

    width: "95%",
    zIndex: 1200,

    data: [],

    title: "LISTADO DE PRODUCTOS",
    isventa: "T",
    estado: null,
    fkidalmacen: null,
}

export default M_ListadoAlmacenUnidadMedidaProducto;
