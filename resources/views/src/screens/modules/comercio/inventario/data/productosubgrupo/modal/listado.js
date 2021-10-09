
import React from 'react';
import PropTypes from 'prop-types';

import { C_ModalDraggable } from '../../../../../../../components';
import C_ListadoProductoSubGrupo from '../components/listado';

function M_ListadoProductoSubGrupo( props ) {

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
            <C_ListadoProductoSubGrupo
                onChecked={ onChecked }
                value={ value }
                create={ create }
                fkidproductogrupo={props.fkidproductogrupo}
                // onCreate={ props.onCreate }
            />
        </C_ModalDraggable>
    );

};

M_ListadoProductoSubGrupo.propTypes = {
    visible: PropTypes.bool,
    create:  PropTypes.bool,

    value: PropTypes.any,
    fkidproductogrupo: PropTypes.any,

    width:  PropTypes.number,
    zIndex: PropTypes.number,

    title:    PropTypes.string,
    onClose:  PropTypes.func,
    onCreate: PropTypes.func,
    onChange: PropTypes.func,
}


M_ListadoProductoSubGrupo.defaultProps = {
    visible: false,
    create: false,

    value: null,
    fkidproductogrupo: null,

    width: 400,
    zIndex: 1200,

    title: "SUB GRUPO DE PRODUCTO",
}

export default M_ListadoProductoSubGrupo;
