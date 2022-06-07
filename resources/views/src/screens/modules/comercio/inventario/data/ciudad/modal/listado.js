
import React from 'react';
import PropTypes from 'prop-types';

import { C_ModalDraggable } from '../../../../../../../components';
import C_ListadoCiudad from '../components/listado';

function M_TreeCiudad( props ) {

    return (
        <C_ModalDraggable
            visible={ props.visible } onClose={ props.onClose }
            // maskStyle={{ background: "transparent", }}
            width={props.width}  zIndex={ props.zIndex }
            title={ props.title }
        >
            <C_ListadoCiudad
                onSelect={ props.onSelect }
                create={false}
                editar={false}
                delete={false}
                show={false}
                expanded={props.expanded}
                showChildren={props.showChildren}
                selectedPadre={props.selectedPadre}
                fkiddata={props.fkiddata}
                showExpanded={false}
            />
        </C_ModalDraggable>
    );

};

M_TreeCiudad.propTypes = {
    visible: PropTypes.bool,
    showChildren: PropTypes.bool,
    selectedPadre: PropTypes.bool,
    expanded: PropTypes.bool,

    fkiddata: PropTypes.any,

    width:  PropTypes.number,
    zIndex: PropTypes.number,

    title:    PropTypes.string,
    onClose:  PropTypes.func,
    onSelect: PropTypes.func,
}


M_TreeCiudad.defaultProps = {
    visible: false,
    showChildren: true,
    selectedPadre: true,
    expanded: false,

    fkiddata: null,

    width: 700,
    zIndex: 1200,

    title: "CIUDAD",
}

export default M_TreeCiudad;
