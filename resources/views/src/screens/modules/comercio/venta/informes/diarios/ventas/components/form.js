
import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Col, Row } from 'antd';

import { informeVentaActions } from '../../../../../../../../redux/actions/comercio/inventario/informeVentaActions';

import { C_Date, C_Radio, C_Input, C_Select, C_Button } from '../../../../../../../../components';
import M_ListadoAlmacen from '../../../../../inventario/data/almacen/modal/listado';
import M_ListadoCliente from '../../../../../venta/data/cliente/modal/listado';
import M_ListadoConceptoVenta from '../../../../data/conceptoventa/modal/listado';
import M_ListadoSucursal from '../../../../data/sucursal/modal/listado';
import M_TreeCiudad from '../../../../../inventario/data/ciudad/modal/listado';
import M_ListadoVendedor from '../../../../data/vendedor/modal/listado';
import M_ListadoCategoria from '../../../../../inventario/data/categoria/modal/listado';
import M_ListadoProductoGrupo from '../../../../../inventario/data/productogrupo/modal/listado';
import M_ListadoProductoSubGrupo from '../../../../../inventario/data/productosubgrupo/modal/listado';
import M_ListadoProductoTipo from '../../../../../inventario/data/productotipo/modal/listado';
import M_ListadoProductoMarca from '../../../../../inventario/data/productomarca/modal/listado';
import M_ListadoProducto from '../../../../../inventario/data/producto/modal/listado';


function C_Form( props ) {
    const { informeVenta } = props;

    function componentAlmacen() {
        if ( !informeVenta.visible_almacen ) return null;
        return (
            <M_ListadoAlmacen
                visible={informeVenta.visible_almacen}
                onClose={ () => props.setVisibleAlmacen(informeVenta) }
                value={informeVenta.fkidalmacen}
                onChange={ (almacen)  => props.setAlmacen(informeVenta, almacen) }
            />
        );
    };

    function componentCliente() {
        if ( !informeVenta.visible_cliente ) return null;
        return (
            <M_ListadoCliente 
                visible={informeVenta.visible_cliente}
                onClose={ () => props.setVisibleCliente(informeVenta) }
                value={informeVenta.fkidcliente}
                onChange={ (cliente) => props.setCliente(informeVenta, cliente) }
            />
        );
    }

    function componentConceptoVenta() {
        if ( !informeVenta.visible_conceptoventa ) return null;
        return (
            <M_ListadoConceptoVenta 
                visible={informeVenta.visible_conceptoventa}
                onClose={ () => props.setVisibleConceptoVenta(informeVenta) }
                value={informeVenta.fkidconceptoventa}
                onChange={ (conceptoventa) => props.setConceptoVenta(informeVenta, conceptoventa) }
            />
        );
    }

    function componentSucursal() {
        if ( !informeVenta.visible_sucursal ) return null;
        return (
            <M_ListadoSucursal 
                visible={informeVenta.visible_sucursal}
                onClose={ () => props.setVisibleSucursal(informeVenta) }
                value={informeVenta.fkidsucursal}
                onChange={ (sucursal) => props.setSucursal(informeVenta, sucursal) }
            />
        );
    }

    function componentCiudad() {
        if ( !informeVenta.visible_ciudad ) return null;
        return (
            <M_TreeCiudad 
                visible={informeVenta.visible_ciudad}
                onClose={ () => props.setVisibleCiudad(informeVenta) }
                onSelect={ (ciudad) => props.setCiudad(informeVenta, ciudad) }
                expanded={true}
            />
        );
    }

    function componentVendedor() {
        if ( !informeVenta.visible_vendedor ) return null;
        return (
            <M_ListadoVendedor 
                visible={informeVenta.visible_vendedor}
                onClose={ () => props.setVisibleVendedor(informeVenta) }
                value={informeVenta.fkidvendedor}
                onChange={ (vendedor) => props.setVendedor(informeVenta, vendedor) }
            />
        );
    }

    function componentCategoria() {
        if ( !informeVenta.visible_categoria ) return null;
        return (
            <M_ListadoCategoria 
                visible={informeVenta.visible_categoria}
                onClose={ () => props.setVisibleCategoria(informeVenta) }
                value={informeVenta.fkidcategoria}
                onChange={ (categoria) => props.setCategoria(informeVenta, categoria) }
            />
        );
    }

    function componentGrupo() {
        if ( !informeVenta.visible_grupo ) return null;
        return (
            <M_ListadoProductoGrupo 
                visible={informeVenta.visible_grupo}
                onClose={ () => props.setVisibleGrupo(informeVenta) }
                value={informeVenta.fkidgrupo}
                onChange={ (grupo) => props.setGrupo(informeVenta, grupo) }
            />
        );
    }

    function componentSubGrupo() {
        if ( !informeVenta.visible_subgrupo ) return null;
        return (
            <M_ListadoProductoSubGrupo 
                visible={informeVenta.visible_subgrupo}
                onClose={ () => props.setVisibleSubGrupo(informeVenta) }
                value={informeVenta.fkidsubgrupo}
                onChange={ (subgrupo) => props.setSubGrupo(informeVenta, subgrupo) }
            />
        );
    }

    function componentTipoProducto() {
        if ( !informeVenta.visible_tipoproducto ) return null;
        return (
            <M_ListadoProductoTipo 
                visible={informeVenta.visible_tipoproducto}
                onClose={ () => props.setVisibleTipoProducto(informeVenta) }
                value={informeVenta.fkidtipoproducto}
                onChange={ (tipoproducto) => props.setTipoProducto(informeVenta, tipoproducto) }
            />
        );
    }

    function componentMarca() {
        if ( !informeVenta.visible_marca ) return null;
        return (
            <M_ListadoProductoMarca 
                visible={informeVenta.visible_marca}
                onClose={ () => props.setVisibleMarca(informeVenta) }
                value={informeVenta.fkidmarca}
                onChange={ (marca) => props.setMarca(informeVenta, marca) }
            />
        );
    }

    function componentProducto() {
        if ( !informeVenta.visible_producto ) return null;
        return (
            <M_ListadoProducto 
                visible={informeVenta.visible_producto}
                onClose={ () => props.setVisibleProducto(informeVenta) }
                value={informeVenta.fkidproducto}
                onChange={ (producto) => props.setProducto(informeVenta, producto) }
            />
        );
    }

    return (
        <>
            { componentAlmacen() }
            { componentCliente() }
            { componentConceptoVenta() }

            { componentSucursal() }
            { componentCiudad() }
            { componentVendedor() }

            { componentCategoria() }
            { componentGrupo() }
            { componentSubGrupo() }
            { componentTipoProducto() }

            { componentMarca() }
            { componentProducto() }

            <Row gutter={ [12, 8] }>
                <Col xs={{ span: 24, }} sm={{ span: 12, }}>
                    <Row gutter={ [12, 8] }>
                        <Col xs={{ span: 24, }} sm={{ span: 24, }}>
                            <div className="main-card mb-2 card mt-1">
                                <div className="card-header card-subtitle" style={{ height: "2.2rem" }}>
                                    Periodo
                                </div>
                                <div className="card-body pb-2 pt-0">
                                    <Row gutter={ [12, 8] }>
                                        <Col xs={{ span: 24, }} sm={{ span: 12, }}>
                                            <C_Date 
                                                label={"Inicio"}
                                                value={ informeVenta.fechainicio }
                                                onChange={ (date) => props.setFechaInicio(informeVenta, date) }
                                                allowClear={false}
                                            />
                                        </Col>
                                        <Col xs={{ span: 24, }} sm={{ span: 12, }}>
                                            <C_Date 
                                                label={"Final"}
                                                value={ informeVenta.fechafinal }
                                                onChange={ (date) => props.setFechaFinal(informeVenta, date) }
                                                allowClear={false}
                                            />
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        </Col>
                        <Col xs={{ span: 24, }} sm={{ span: 24, }}>
                            <div className="main-card mb-2 card mt-1">
                                <div className="card-header card-subtitle" style={{ height: "2.2rem" }}>
                                    Tipo Informe
                                </div>
                                <div className="card-body pb-3 pt-0">
                                    <Row gutter={ [12, 8] }>
                                        <Col xs={{ span: 24, }} sm={{ span: 12, }}>
                                            <C_Radio 
                                                title={"Por Notas"}
                                                checked={informeVenta.tipoinforme == "N"}
                                                onChange={ () => props.setTipoInforme(informeVenta) }
                                            />
                                        </Col>
                                        <Col xs={{ span: 24, }} sm={{ span: 12, }}>
                                            <C_Radio 
                                                title={"Por Productos"}
                                                checked={informeVenta.tipoinforme == "P"}
                                                onChange={ () => props.setTipoInforme(informeVenta) }
                                            />
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Col>
                <Col xs={{ span: 24, }} sm={{ span: 12, }}>
                    <Row gutter={ [12, 8] }>
                        <Col xs={{ span: 24, }} sm={{ span: 24, }}>
                            <div className="main-card mb-2 card mt-1">
                                <div className="card-header card-subtitle" style={{ height: "2.2rem" }}>
                                    Moneda
                                </div>
                                <div className="card-body pb-2 pt-0">
                                    <Row gutter={ [12, 8] }>
                                        <Col xs={{ span: 24, }} sm={{ span: 4, }}></Col>
                                        <Col xs={{ span: 24, }} sm={{ span: 16, }}>
                                            <C_Select
                                                label={ ""}
                                                placeholder={ "SELECCIONAR MONEDA" }
                                                value={ informeVenta.tipomoneda }
                                                onChange={ (tipomoneda) => props.setTipoMoneda(informeVenta, tipomoneda) }
                                                data={ [
                                                    { title: "", value: "" },
                                                    { title: "Moneda Extranjera", value: "E" },
                                                    { title: "Moneda Local", value: "L" },
                                                ] }
                                            />
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row gutter={ [12, 8] }>
                <Col xs={{ span: 24, }}>
                    <div className="main-card mb-2 card mt-1">
                        <div className="card-header card-subtitle" style={{ height: "2.2rem" }}>
                            Datos para Filtrar
                        </div>
                        <div className="card-body pb-2 pt-0">
                            <Row gutter={ [12, 8] }>
                                <Col xs={{ span: 24, }} sm={{ span: 8, }}>
                                    <C_Input
                                        label={"Álmacen"}
                                        placeholder={ "SELECCIONAR ÁLMACEN..." }
                                        value={ informeVenta.almacen }
                                        onClick={ () => props.setVisibleAlmacen(informeVenta) }
                                        select={true}
                                    />
                                </Col>
                                <Col xs={{ span: 24, }} sm={{ span: 8, }}>
                                    <C_Input
                                        label={"Cliente"}
                                        placeholder={ "SELECCIONAR CLIENTE..." }
                                        value={ informeVenta.cliente }
                                        onClick={ () => props.setVisibleCliente(informeVenta) }
                                        select={true}
                                    />
                                </Col>
                                <Col xs={{ span: 24, }} sm={{ span: 8, }}>
                                    <C_Input
                                        label={"Concepto Venta"}
                                        placeholder={ "SELECCIONAR CONCEPTO VENTA..." }
                                        value={ informeVenta.conceptoventa }
                                        onClick={ () => props.setVisibleConceptoVenta(informeVenta) }
                                        select={true}
                                    />
                                </Col>
                            </Row>
                            <Row gutter={ [12, 8] }>
                                <Col xs={{ span: 24, }} sm={{ span: 8, }}>
                                    <C_Input
                                        label={"Sucursal"}
                                        placeholder={ "SELECCIONAR SUCURSAL..." }
                                        value={ informeVenta.sucursal }
                                        onClick={ () => props.setVisibleSucursal(informeVenta) }
                                        select={true}
                                    />
                                </Col>
                                <Col xs={{ span: 24, }} sm={{ span: 8, }}>
                                    <C_Input
                                        label={"Ciudad"}
                                        placeholder={ "SELECCIONAR CIUDAD..." }
                                        value={ informeVenta.ciudad }
                                        onClick={ () => props.setVisibleCiudad(informeVenta) }
                                        select={true}
                                    />
                                </Col>
                                <Col xs={{ span: 24, }} sm={{ span: 8, }}>
                                    <C_Input
                                        label={"Vendedor"}
                                        placeholder={ "SELECCIONAR VENDEDOR..." }
                                        value={ informeVenta.vendedor }
                                        onClick={ () => props.setVisibleVendedor(informeVenta) }
                                        select={true}
                                    />
                                </Col>
                            </Row>
                            <Row gutter={ [12, 8] }>
                                <Col xs={{ span: 24, }} sm={{ span: 6, }}>
                                    <C_Input
                                        label={"Categoría"}
                                        placeholder={ "SELECCIONAR CATEGORÍA..." }
                                        value={ informeVenta.categoria }
                                        onClick={ () => props.setVisibleCategoria(informeVenta) }
                                        select={true}
                                    />
                                </Col>
                                <Col xs={{ span: 24, }} sm={{ span: 6, }}>
                                    <C_Input
                                        label={"Grupo"}
                                        placeholder={ "SELECCIONAR GRUPO..." }
                                        value={ informeVenta.grupo }
                                        onClick={ () => props.setVisibleGrupo(informeVenta) }
                                        select={true}
                                    />
                                </Col>
                                <Col xs={{ span: 24, }} sm={{ span: 6, }}>
                                    <C_Input
                                        label={"Sub Grupo"}
                                        placeholder={ "SELECCIONAR SUB GRUPO..." }
                                        value={ informeVenta.subgrupo }
                                        onClick={ () => props.setVisibleSubGrupo(informeVenta) }
                                        select={true}
                                    />
                                </Col>
                                <Col xs={{ span: 24, }} sm={{ span: 6, }}>
                                    <C_Input
                                        label={"Tipo Producto"}
                                        placeholder={ "SELECCIONAR TIPO PRODUCTO..." }
                                        value={ informeVenta.tipoproducto }
                                        onClick={ () => props.setVisibleTipoProducto(informeVenta) }
                                        select={true}
                                    />
                                </Col>
                            </Row>
                            <Row gutter={ [12, 8] }>
                                <Col xs={{ span: 24, }} sm={{ span: 6, }}>
                                    <C_Input
                                        label={"Marca"}
                                        placeholder={ "SELECCIONAR MARCA..." }
                                        value={ informeVenta.marca }
                                        onClick={ () => props.setVisibleMarca(informeVenta) }
                                        select={true}
                                    />
                                </Col>
                                <Col xs={{ span: 24, }} sm={{ span: 8, }}>
                                    <C_Input
                                        label={"Producto"}
                                        placeholder={ "SELECCIONAR PRODUCTO..." }
                                        value={ informeVenta.producto }
                                        onClick={ () => props.setVisibleProducto(informeVenta) }
                                        select={true}
                                    />
                                </Col>
                            </Row>
                            <div className="d-block text-right card-footer">
                                <div className="form-row d-flex justify-content-end">
                                    <C_Button
                                        outline={true}
                                        onClick={props.onLimpiar}
                                    >
                                        Limpiar
                                    </C_Button>
                                    <C_Button
                                        outline={true}
                                        onClick={props.onImprimir}
                                    >
                                        Imprimir
                                    </C_Button>
                                    <C_Button
                                        outline={true}
                                        onClick={props.onClose}
                                    >
                                        Terminar
                                    </C_Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </>
    );
};

C_Form.propTypes = {
    onClose: PropTypes.func,
    onImprimir: PropTypes.func,
    onLimpiar: PropTypes.func,
    informeVenta: PropTypes.object,
}

C_Form.defaultProps = {
    onClose:  () => {},
    onImprimir: () => {},
    onLimpiar: () => {},
    informeVenta: {},
}

const mapDispatchToProps = {
    setAlmacen:   informeVentaActions.setAlmacen,
    setCategoria:   informeVentaActions.setCategoria,
    setCliente:   informeVentaActions.setCliente,
    setCiudad:   informeVentaActions.setCiudad,
    setConceptoVenta:   informeVentaActions.setConceptoVenta,
    setGrupo:   informeVentaActions.setGrupo,
    setMarca:   informeVentaActions.setMarca,
    setProducto:   informeVentaActions.setProducto,
    setSubGrupo:   informeVentaActions.setSubGrupo,
    setSucursal:   informeVentaActions.setSucursal,
    setTipoProducto:   informeVentaActions.setTipoProducto,
    setVendedor:   informeVentaActions.setVendedor,
    setFechaInicio:   informeVentaActions.setFechaInicio,
    setFechaFinal:   informeVentaActions.setFechaFinal,
    setTipoInforme:   informeVentaActions.setTipoInforme,
    setTipoMoneda: informeVentaActions.setTipoMoneda,
    setVisibleAlmacen: informeVentaActions.setVisibleAlmacen,
    setVisibleCategoria: informeVentaActions.setVisibleCategoria,
    setVisibleCliente: informeVentaActions.setVisibleCliente,
    setVisibleCiudad: informeVentaActions.setVisibleCiudad,
    setVisibleConceptoVenta: informeVentaActions.setVisibleConceptoVenta,
    setVisibleGrupo: informeVentaActions.setVisibleGrupo,
    setVisibleMarca: informeVentaActions.setVisibleMarca,
    setVisibleProducto: informeVentaActions.setVisibleProducto,
    setVisibleSubGrupo: informeVentaActions.setVisibleSubGrupo,
    setVisibleSucursal: informeVentaActions.setVisibleSucursal,
    setVisibleTipoProducto: informeVentaActions.setVisibleTipoProducto,
    setVisibleVendedor: informeVentaActions.setVisibleVendedor,
    // onImprimir: conceptoCompraActions.onImprimir,
};

export default connect( null, mapDispatchToProps )( C_Form );

// export default C_Form;
