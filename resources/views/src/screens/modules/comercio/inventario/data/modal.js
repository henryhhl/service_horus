
import React from 'react';
import PropTypes from 'prop-types';

import { C_ModalDraggable } from '../../../../../components';

import IndexCiudadClasificacion from './ciudadclasificacion';
import IndexUnidadMedida from './unidadmedida';
import IndexCategoria from './categoria';

import IndexProductoMarca from './productomarca';
import IndexProductoGrupo from './productogrupo';
import IndexProductoSubGrupo from './productosubgrupo';
import IndexProductoTipo from './productotipo';
import IndexCiudad from './ciudad';
import IndexAlmacen from './almacen';
import IndexConceptoInventario from './conceptoinventario';
import IndexProducto from './producto';
import IndexSeccionInventario from './seccion';

function ModalDatoGeneral( props ) {
    const { arrayMenu, visible, onClose } = props;

    function onValidarMenu() {
        let array = arrayMenu;
        let submenu = array.pop();
        switch ( submenu ) {

            case "almacen":
                return (
                    <C_ModalDraggable
                        visible={visible}
                        onClose={onClose}
                        title="ÁLMACEN"
                        width={650}
                    >
                        <IndexAlmacen 
                            onClose={ onClose }
                        />
                    </C_ModalDraggable>
                );

            case "producto":
                return (
                    <C_ModalDraggable
                        visible={visible}
                        onClose={onClose}
                        title="PRODUCTO"
                        width={"98%"} style={{ top: 10, }}
                    >
                        <IndexProducto
                            onClose={ onClose }
                        />
                    </C_ModalDraggable>
                );

            case "conceptoinventario":
                return (
                    <C_ModalDraggable
                        visible={visible}
                        onClose={onClose}
                        title="CONCEPTO INVENTARIO"
                        width={650}
                    >
                        <IndexConceptoInventario 
                            onClose={ onClose }
                        />
                    </C_ModalDraggable>
                );

            case "categoria":
                return (
                    <C_ModalDraggable
                        visible={visible}
                        onClose={onClose}
                        title="CATEGORÍA"
                        width={650}
                    >
                        <IndexCategoria 
                            onClose={ onClose }
                        />
                    </C_ModalDraggable>
                );

            case "marca":
                return (
                    <C_ModalDraggable
                        visible={visible}
                        onClose={onClose}
                        title="MARCA"
                        width={650}
                    >
                        <IndexProductoMarca 
                            onClose={ onClose }
                        />
                    </C_ModalDraggable>
                );

            case "productotipo":
                return (
                    <C_ModalDraggable
                        visible={visible}
                        onClose={onClose}
                        title="TIPO PRODUCTO"
                        width={650}
                    >
                        <IndexProductoTipo 
                            onClose={ onClose }
                        />
                    </C_ModalDraggable>
                );

            case "unidadmedida":
                return (
                    <C_ModalDraggable
                        visible={visible}
                        onClose={onClose}
                        title="UNIDAD MEDIDA"
                        width={650}
                    >
                        <IndexUnidadMedida 
                            onClose={ onClose }
                        />
                    </C_ModalDraggable>
                );

            case "productogrupo":
                return (
                    <C_ModalDraggable
                        visible={visible}
                        onClose={onClose}
                        title="GRUPO PRODUCTO"
                        width={650}
                    >
                        <IndexProductoGrupo 
                            onClose={ onClose }
                        />
                    </C_ModalDraggable>
                );

            case "productosubgrupo":
                return (
                    <C_ModalDraggable
                        visible={visible}
                        onClose={onClose}
                        title="SUB GRUPO DE PRODUCTO"
                        width={650}
                    >
                        <IndexProductoSubGrupo 
                            onClose={ onClose }
                        />
                    </C_ModalDraggable>
                );

            case "ciudad":
                return (
                    <C_ModalDraggable
                        visible={visible}
                        onClose={onClose}
                        title="CIUDAD"
                        width={650}
                    >
                        <IndexCiudad 
                            onClose={ onClose }
                        />
                    </C_ModalDraggable>
                );

            case "ciudadclasificacion":
                return (
                    <C_ModalDraggable
                        visible={visible}
                        onClose={onClose}
                        title="CIUDAD CLASIFICACIÓN"
                        width={650}
                    >
                        <IndexCiudadClasificacion 
                            onClose={ onClose }
                        />
                    </C_ModalDraggable>
                );

            case "seccioninventario":
                return (
                    <C_ModalDraggable
                        visible={visible}
                        onClose={onClose}
                        title="SECCIÓN INVENTARIO"
                        width={650}
                    >
                        <IndexSeccionInventario 
                            onClose={ onClose }
                        />
                    </C_ModalDraggable>
                );
        
            default:
                return null;
        }
    };

    return (
        <>
            { onValidarMenu() }
        </>
    );

};

ModalDatoGeneral.propTypes = {
    visible:    PropTypes.bool,
    onClose:    PropTypes.func,
    arrayMenu:  PropTypes.array,
}

ModalDatoGeneral.defaultProps = {
    visible: false,
    onClose: () => {},
    arrayMenu: [],
}

export default React.memo( ModalDatoGeneral );
