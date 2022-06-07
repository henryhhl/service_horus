
import React from 'react';
import PropTypes from 'prop-types';

import { C_ModalDraggable } from '../../../../../../../components';
import C_ListadoAlmacenProducto from '../components/listado';

function M_ListadoAlmacenProductoDetalle( props ) {

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
            <C_ListadoAlmacenProducto
                onChecked={ onChecked }
                value={ value }
                data={props.data}
                isventa={props.isventa}
                fkidalmacen={props.fkidalmacen}
                fkidlistaprecio={props.fkidlistaprecio}
                estado={props.estado}
                // onCreate={ props.onCreate }
            />
        </C_ModalDraggable>
    );

};

M_ListadoAlmacenProductoDetalle.propTypes = {
    visible: PropTypes.bool,

    value: PropTypes.any,

    width:  PropTypes.any,
    zIndex: PropTypes.number,

    data: PropTypes.array,

    title:    PropTypes.string,
    isventa:  PropTypes.string,
    estado:  PropTypes.string,
    fkidalmacen:  PropTypes.number,
    fkidlistaprecio: PropTypes.number,
    onClose:  PropTypes.func,
    onChange: PropTypes.func,
}


M_ListadoAlmacenProductoDetalle.defaultProps = {
    visible: false,
    value: null,

    width: "95%",
    zIndex: 1200,

    data: [],

    title: "LISTADO DE PRODUCTOS",
    isventa: null,
    estado: null,
    fkidalmacen: null,
    fkidlistaprecio: null,
}

export default M_ListadoAlmacenProductoDetalle;
