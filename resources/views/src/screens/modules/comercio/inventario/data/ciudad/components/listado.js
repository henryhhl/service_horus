
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { C_Confirm, C_ModalDraggable, C_Tree } from '../../../../../../../components';

import { ciudadActions } from '../../../../../../../redux/actions/comercio/inventario/ciudadActions';

import C_CreateCiudad from './create';
import C_EditarCiudad from './editar';
import C_ShowCiudad from './show';


function C_ListadoCiudad( props ) {
    const { } = props;

    const [ visible_create, setVisibleCreate ] = useState( false );
    const [ visible_edit, setVisibleEdit ]     = useState( false );
    const [ visible_show, setVisibleShow ]     = useState( false );
    const [ iddata, setIDData ] = useState(null);

    useEffect( () => {
        props.getData();
        // return () => { }
    }, [] );

    function componentCreateCiudad() {
        if ( !visible_create ) return null;
        return (
            <C_ModalDraggable
                visible={visible_create}
                onClose={ () => setVisibleCreate( false ) }
                title="NUEVO CIUDAD"
                width={400}
            >
                <C_CreateCiudad 
                    onClose={ () => setVisibleCreate( false ) }
                />
            </C_ModalDraggable>
        );
    };

    function componentEditCiudad() {
        if ( !visible_edit ) return null;
        return (
            <C_ModalDraggable
                visible={visible_edit}
                onClose={ () => {
                    setVisibleEdit( false );
                    setIDData(null);
                } }
                title="EDITAR CIUDAD"
                width={400}
            >
                <C_EditarCiudad 
                    onClose={ () => {
                        setVisibleEdit( false );
                        setIDData(null);
                    } }
                    idciudad={iddata}
                />
            </C_ModalDraggable>
        );
    };

    function componentShowCiudad() {
        if ( !visible_show ) return null;
        return (
            <C_ModalDraggable
                visible={visible_show}
                onClose={ () => {
                    setVisibleShow( false );
                    setIDData(null);
                } }
                title="VER CIUDAD"
                width={400}
            >
                <C_ShowCiudad 
                    onClose={ () => {
                        setVisibleShow( false );
                        setIDData(null);
                    } }
                    idciudad={iddata}
                />
            </C_ModalDraggable>
        );
    };

    function onConfirmarDelete(ciudad) {
        let ondelete = () => props.onDelete(ciudad);
        C_Confirm( { title: "Eliminar Ciudad", onOk: ondelete } );
    };

    return (
        <>
            { componentCreateCiudad() }
            { componentEditCiudad() }
            { componentShowCiudad() }
            <C_Tree 
                data={props.array_ciudad}
                option={ {
                    value: "idciudad",
                    title: "descripcion",
                    fkidpadre: "fkidciudadpadre",
                } }
                onCreate={ () => setVisibleCreate(true) }
                onShow={ (obj) => {
                    setIDData(obj.idciudad);
                    setVisibleShow(true);
                } }
                onEdit={ (obj) => {
                    setIDData(obj.idciudad);
                    setVisibleEdit(true);
                } }
                onDelete={ (obj) => onConfirmarDelete(obj) }
                onSelect={props.onSelect}
                create={props.create} 
                editar={props.editar} 
                delete={props.delete} 
                show={props.show}
                expanded={props.expanded}
                showChildren={props.showChildren}
                selectedPadre={props.selectedPadre}
                fkiddata={props.fkiddata}
            />
        </>
    );

};

C_ListadoCiudad.propTypes = {
    showChildren: PropTypes.bool,
    selectedPadre: PropTypes.bool,

    create: PropTypes.bool,
    editar: PropTypes.bool,
    delete: PropTypes.bool,
    show:   PropTypes.bool,

    expanded: PropTypes.bool,
    
    fkiddata: PropTypes.any,

    onSelect:  PropTypes.func,
}

C_ListadoCiudad.defaultProps = {
    showChildren: true,
    selectedPadre: true,
    expanded: false,

    fkiddata: null,

    create: true,
    editar: true,
    delete: true,
    show:   true,
}

const mapStateToProps = ( state ) => ( {
    array_ciudad:  state.array.array_ciudad,
} );

const mapDispatchToProps = {
    getData:    ciudadActions.getData,
    onDelete:   ciudadActions.onDelete,
};

export default connect( mapStateToProps, mapDispatchToProps )(C_ListadoCiudad);
