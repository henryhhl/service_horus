
import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Col, Row } from 'antd';
import { C_Button, C_Date, C_Input, C_Message, C_Radio, C_Select } from '../../../../../../../components';
import { Functions } from '../../../../../../../utils/functions';

import M_ListadoSucursal from '../../../../venta/data/sucursal/modal/listado';
import M_ListadoAlmacen from '../../../../inventario/data/almacen/modal/listado';
import M_ListadoConceptoCompra from '../../../data/conceptocompra/modal/listado';
import M_ListadoProveedor from '../../../data/proveedor/modal/listado';

import M_ListadoCategoria from '../../../../inventario/data/categoria/modal/listado';
import M_ListadoProductoMarca from '../../../../inventario/data/productomarca/modal/listado';
import M_ListadoProductoGrupo from '../../../../inventario/data/productogrupo/modal/listado';
import M_ListadoProductoSubGrupo from '../../../../inventario/data/productosubgrupo/modal/listado';
import M_ListadoProducto from '../../../../inventario/data/producto/modal/listado';
import M_ListadoUnidadMedidaProducto from '../../../../inventario/data/unidadmedidaproducto/modal/listado';

function C_Form( props ) {

    const { informeCompra, onChange } = props;
    const [ visible_sucursal, setVisibleSucursal ] = useState(false);
    const [ visible_almacen, setVisibleAlmacen ] = useState(false);
    const [ visible_proveedor, setVisibleProveedor ] = useState(false);
    const [ visible_concepto, setVisibleConcepto ] = useState(false);
    const [ visible_categoria, setVisibleCategoria ] = useState(false);
    const [ visible_grupo, setVisibleGrupo ] = useState(false);
    const [ visible_subgrupo, setVisibleSubGrupo ] = useState(false);
    const [ visible_marca, setVisibleMarca ] = useState(false);
    const [ visible_producto, setVisibleProducto ] = useState(false);

    function onChangeFechaInicio( value ) {
        let fechainicio = Functions.convertDMYToYMD(value);
        let fechafinal  = Functions.convertDMYToYMD(informeCompra.fechafinal);
        if ( fechainicio <= fechafinal ) {
            informeCompra.fechainicio = value;
            onChange(informeCompra);
        } else {
            C_Message("warning", "Fecha Inicio debe ser menor a Fecha Final");
        }
    };

    function onChangeFechaFinal( value ) {
        let fechainicio = Functions.convertDMYToYMD(informeCompra.fechainicio);
        let fechafinal  = Functions.convertDMYToYMD(value);
        if ( fechafinal >= fechainicio ) {
            informeCompra.fechafinal = value;
            onChange(informeCompra);
        } else {
            C_Message("warning", "Fecha Final debe ser mayor a Fecha Inicio");
        }
    };

    function onChangePorNotas( value ) {
        informeCompra.tipoinforme = "N";
        informeCompra.formato = "PN";
        onChange(informeCompra)
    };

    function onChangePorProductos( value ) {
        informeCompra.tipoinforme = "P";
        informeCompra.formato = "LD";
        onChange(informeCompra);
    };

    function onChangeFormato( value ) {
        informeCompra.formato = value;
        onChange(informeCompra);
    };

    function onShowSucursal() {
        setVisibleSucursal(true);
    };

    function onChangeFKIDSucursal( data ) {
        informeCompra.fkidsucursal  = data.idsucursal;
        informeCompra.sucursal      = data.descripcion;
        onChange( informeCompra );
        setVisibleSucursal(false);
    };

    function componentSucursal() {
        if ( !visible_sucursal ) return null;
        return (
            <M_ListadoSucursal
                visible={visible_sucursal}
                onClose={ () => setVisibleSucursal(false) }
                value={informeCompra.fkidsucursal}
                onChange={onChangeFKIDSucursal}
            />
        );
    };

    function onShowAlmacen() {
        if ( typeof informeCompra.fkidsucursal === "number" ) setVisibleAlmacen(true);
    };

    function onChangeFKIDAlmacen( data ) {
        informeCompra.fkidalmacen  = data.idalmacen;
        informeCompra.almacen      = data.descripcion;
        onChange( informeCompra );
        setVisibleAlmacen(false);
    };

    function componentAlmacen() {
        if ( !visible_almacen ) return null;
        return (
            <M_ListadoAlmacen
                visible={visible_almacen}
                onClose={ () => setVisibleAlmacen(false) }
                value={informeCompra.fkidalmacen}
                onChange={onChangeFKIDAlmacen}
                fkidsucursal={informeCompra.fkidsucursal}
            />
        );
    };

    function onShowConcepto() {
        setVisibleConcepto(true);
    };

    function onChangeFKIDConceptoCompra( data ) {
        informeCompra.fkidconceptocompra  = data.idconceptocompra;
        informeCompra.conceptocompra      = data.descripcion;
        onChange( informeCompra );
        setVisibleConcepto(false);
    };

    function componentConcepto() {
        if ( !visible_concepto ) return null;
        return (
            <M_ListadoConceptoCompra
                visible={visible_concepto}
                onClose={ () => setVisibleConcepto(false) }
                value={informeCompra.fkidconceptocompra}
                onChange={onChangeFKIDConceptoCompra}
            />
        );
    };

    function onShowProveedor() {
        setVisibleProveedor(true);
    };

    function onChangeFKIDProveedor( data ) {
        informeCompra.fkidproveedor  = data.idproveedor;
        informeCompra.proveedor      = data.nombre;
        onChange( informeCompra );
        setVisibleProveedor(false);
    };

    function componentProveedor() {
        if ( !visible_proveedor ) return null;
        return (
            <M_ListadoProveedor
                visible={visible_proveedor}
                onClose={ () => setVisibleProveedor(false) }
                value={informeCompra.fkidproveedor}
                onChange={onChangeFKIDProveedor}
            />
        );
    };

    function onShowCategoria() {
        setVisibleCategoria(true);
    };

    function onChangeFKIDCategoria( data ) {
        informeCompra.fkidcategoria  = data.idcategoria;
        informeCompra.categoria      = data.descripcion;
        onChange( informeCompra );
        setVisibleCategoria(false);
    };

    function componentCategoria() {
        if ( !visible_categoria ) return null;
        return (
            <M_ListadoCategoria
                visible={visible_categoria}
                onClose={ () => setVisibleCategoria(false) }
                value={informeCompra.fkidcategoria}
                onChange={onChangeFKIDCategoria}
            />
        );
    };

    function onShowMarca() {
        setVisibleMarca(true);
    };

    function onChangeFKIDMarca( data ) {
        informeCompra.fkidproductomarca  = data.idproductomarca;
        informeCompra.productomarca      = data.descripcion;
        onChange( informeCompra );
        setVisibleMarca(false);
    };

    function componentMarca() {
        if ( !visible_marca ) return null;
        return (
            <M_ListadoProductoMarca
                visible={visible_marca}
                onClose={ () => setVisibleMarca(false) }
                value={informeCompra.fkidproductomarca}
                onChange={onChangeFKIDMarca}
            />
        );
    };

    function onShowGrupo() {
        setVisibleGrupo(true);
    };

    function onChangeFKIDGrupo( data ) {
        informeCompra.fkidproductogrupo  = data.idproductogrupo;
        informeCompra.productogrupo      = data.descripcion;
        onChange( informeCompra );
        setVisibleGrupo(false);
    };

    function componentGrupo() {
        if ( !visible_grupo ) return null;
        return (
            <M_ListadoProductoGrupo
                visible={visible_grupo}
                onClose={ () => setVisibleGrupo(false) }
                value={informeCompra.fkidproductogrupo}
                onChange={onChangeFKIDGrupo}
            />
        );
    };

    function onShowSubGrupo() {
        if ( typeof informeCompra.fkidproductogrupo === "number" ) setVisibleSubGrupo(true);
    };

    function onChangeFKIDSubGrupo( data ) {
        informeCompra.fkidproductosubgrupo  = data.idproductosubgrupo;
        informeCompra.productosubgrupo      = data.descripcion;
        onChange( informeCompra );
        setVisibleSubGrupo(false);
    };

    function componentSubGrupo() {
        if ( !visible_subgrupo ) return null;
        return (
            <M_ListadoProductoSubGrupo
                visible={visible_subgrupo}
                onClose={ () => setVisibleSubGrupo(false) }
                value={informeCompra.fkidproductosubgrupo}
                onChange={onChangeFKIDSubGrupo}
                fkidproductogrupo={ ( typeof informeCompra.fkidproductogrupo === "number" ) ? informeCompra.fkidproductogrupo : null } 
            />
        );
    };

    function onShowProducto() {
        setVisibleProducto(true);
    };

    function onChangeFKIDProducto( data ) {
        console.log(data)
        informeCompra.fkidproducto  = data.idproducto;
        informeCompra.producto      = `${parseFloat(data.peso).toFixed(2)}${data.abreviatura} ${data.producto}`;
        onChange( informeCompra );
        setVisibleProducto(false);
    };

    function componentProducto() {
        if ( !visible_producto ) return null;
        return (
            <M_ListadoUnidadMedidaProducto
                visible={visible_producto}
                onClose={ () =>  setVisibleProducto(false) }
                value={informeCompra.fkidproducto}
                onChange={onChangeFKIDProducto}
            />
        );
    };

    return (
        <>

            { componentSucursal() }
            { componentAlmacen() }
            { componentConcepto() }
            { componentProveedor() }

            { componentCategoria() }
            { componentMarca() }
            { componentGrupo() }
            { componentSubGrupo() }

            { componentProducto() }

            <Row gutter={ [12, 8] }>
                <Col xs={{ span: 24, }} sm={{ span: 12, }}>
                    <div className="main-card mb-2 card mt-1">
                        <div className="card-header card-subtitle" style={{ height: "2.2rem" }}>
                            Periodo
                        </div>
                        <div className="card-body pb-2 pt-0">
                            <Row gutter={ [12, 8] } style={{ marginTop: -12, }}>
                                <Col xs={{ span: 24, }} sm={{ span: 12, }}>
                                    <C_Date 
                                        label={"Inicio"}
                                        value={ informeCompra.fechainicio }
                                        onChange={ onChangeFechaInicio }
                                        allowClear={false}
                                    />
                                </Col>
                                <Col xs={{ span: 24, }} sm={{ span: 12, }}>
                                    <C_Date 
                                        label={"Final"}
                                        value={ informeCompra.fechafinal }
                                        onChange={ onChangeFechaFinal }
                                        allowClear={false}
                                    />
                                </Col>
                            </Row>
                        </div>
                    </div>
                </Col>
                <Col xs={{ span: 24, }} sm={{ span: 12, }}>
                    <div className="main-card mb-2 card mt-1">
                        <div className="card-header card-subtitle" style={{ height: "2.2rem" }}>
                            Moneda
                        </div>
                        <div className="card-body pb-2 pt-0">
                            <Row gutter={ [12, 8] } style={{ marginTop: -12, }}>
                                <Col xs={{ span: 24, }} sm={{ span: 16, }}>
                                    <C_Input 
                                        value={ informeCompra.moneda }
                                        disabled
                                    />
                                </Col>
                            </Row>
                        </div>
                    </div>
                </Col>
            </Row>
            <Row gutter={ [12, 8] }>
                <Col xs={{ span: 24, }} sm={{ span: 12, }}>
                    <div className="main-card mb-2 card mt-1">
                        <div className="card-header card-subtitle" style={{ height: "2.2rem" }}>
                            Tipo Informe
                        </div>
                        <div className="card-body pb-3 pt-2">
                            <Row gutter={ [12, 8] }>
                                <Col xs={{ span: 24, }} sm={{ span: 12, }}>
                                    <C_Radio 
                                        title={"Por Notas"}
                                        checked={informeCompra.tipoinforme == "N"}
                                        onChange={onChangePorNotas}
                                    />
                                </Col>
                                <Col xs={{ span: 24, }} sm={{ span: 12, }}>
                                    <C_Radio 
                                        title={"Por Productos"}
                                        checked={informeCompra.tipoinforme == "P"}
                                        onChange={onChangePorProductos}
                                    />
                                </Col>
                            </Row>
                        </div>
                    </div>
                </Col>
                <Col xs={{ span: 24, }} sm={{ span: 12, }}>
                    <div className="main-card mb-2 card mt-1">
                        <div className="card-header card-subtitle" style={{ height: "2.2rem" }}>
                            Formato de impresión
                        </div>
                        <div className="card-body pb-2 pt-0">
                            <Row gutter={ [12, 8] } style={{ marginTop: -12, }}>
                                <Col xs={{ span: 24, }} sm={{ span: 16, }}>
                                    <C_Select
                                        value={ informeCompra.formato }
                                        onChange={ onChangeFormato }
                                        data={ 
                                            informeCompra.tipoinforme == "N" ?
                                            [
                                                { title: "Proveedor y Notas", value: "PN" },
                                                { title: "Álmacen y Notas", value: "AN" },
                                                { title: "Concepto y Notas", value: "CN" },
                                                { title: "Correlativo por Notas", value: "CPN" },
                                            ] : 
                                            [
                                                { title: "Libro Diario", value: "LD" },
                                                { title: "Libro Mayor", value: "LM" },
                                                { title: "Proveedor y Producto", value: "PP" },
                                            ] 
                                        }
                                    />
                                </Col>
                            </Row>
                        </div>
                    </div>
                </Col>
            </Row>
            <Row gutter={ [12, 8] }>
                <Col xs={{ span: 24, }} sm={{ span: 24, }}>
                    <div className="main-card mb-2 card mt-1">
                        <div className="card-header card-subtitle" style={{ height: "2.2rem" }}>
                            Datos para filtrar
                        </div>
                        <div className="card-body pb-2 pt-0">
                            <Row gutter={ [12, 8] } style={{ marginTop: -12, }}>
                                <Col xs={{ span: 24, }} sm={{ span: 8, }}>
                                    <C_Input
                                        label={"Sucursal"}
                                        placeholder={ "SELECCIONAR SUCURSAL..." }
                                        value={ informeCompra.sucursal }
                                        onClick={onShowSucursal}
                                        select={true}
                                    />
                                </Col>
                                <Col xs={{ span: 24, }} sm={{ span: 8, }}>
                                    <C_Input
                                        label={"Álmacen"}
                                        placeholder={ "SELECCIONAR ÁLMACEN..." }
                                        value={ informeCompra.almacen }
                                        onClick={onShowAlmacen}
                                        disabled={ ( typeof informeCompra.fkidsucursal !== 'number' ) }
                                        select={true}
                                    />
                                </Col>
                                <Col xs={{ span: 24, }} sm={{ span: 8, }}>
                                    <C_Input
                                        label={"Concepto"}
                                        placeholder={ "SELECCIONAR CONCEPTO..." }
                                        value={ informeCompra.conceptocompra }
                                        onClick={onShowConcepto}
                                        select={true}
                                    />
                                </Col>
                            </Row>
                            <Row gutter={ [12, 8] }>
                                <Col xs={{ span: 24, }} sm={{ span: 16, }}>
                                    <C_Input
                                        label={"Proveedor"}
                                        placeholder={ "SELECCIONAR PROVEEDOR..." }
                                        value={ informeCompra.proveedor }
                                        onClick={onShowProveedor}
                                        select={true}
                                    />
                                </Col>
                            </Row>
                            <Row gutter={ [12, 8] }>
                                <Col xs={{ span: 24, }} sm={{ span: 6, }}>
                                    <C_Input
                                        label={"Categoría"}
                                        placeholder={ "SELECCIONAR CATEGORÍA..." }
                                        value={ informeCompra.categoria }
                                        onClick={onShowCategoria}
                                        select={true}
                                    />
                                </Col>
                                <Col xs={{ span: 24, }} sm={{ span: 6, }}>
                                    <C_Input
                                        label={"Marca"}
                                        placeholder={ "SELECCIONAR MARCA..." }
                                        value={ informeCompra.productomarca }
                                        onClick={onShowMarca}
                                        select={true}
                                    />
                                </Col>
                                <Col xs={{ span: 24, }} sm={{ span: 6, }}>
                                    <C_Input
                                        label={"Grupo"}
                                        placeholder={ "SELECCIONAR GRUPO..." }
                                        value={ informeCompra.productogrupo }
                                        onClick={onShowGrupo}
                                        select={true}
                                    />
                                </Col>
                                <Col xs={{ span: 24, }} sm={{ span: 6, }}>
                                    <C_Input
                                        label={"Sub Grupo"}
                                        placeholder={ "SELECCIONAR SUB GRUPO..." }
                                        value={ informeCompra.productosubgrupo }
                                        onClick={onShowSubGrupo}
                                        disabled={ (typeof informeCompra.fkidproductogrupo !== "number") }
                                        select={true}
                                    />
                                </Col>
                            </Row>
                            <Row gutter={ [12, 8] }>
                                <Col xs={{ span: 24, }} sm={{ span: 24, }}>
                                    <C_Input
                                        label={"Producto"}
                                        placeholder={ "SELECCIONAR PRODUCTO..." }
                                        value={ informeCompra.producto }
                                        onClick={onShowProducto}
                                        select={true}
                                    />
                                </Col>
                            </Row>
                            <Row gutter={ [12, 8] } className="pt-2">
                                <Col xs={{ span: 24, }} sm={{ span: 4, }}>
                                    <h5 className="card-title" style={{ paddingTop: 2, }}>
                                        Tipo compra
                                    </h5>
                                </Col>
                                <Col xs={{ span: 24, }} sm={{ span: 3, }}>
                                    <C_Radio 
                                        title={"Local"}
                                        checked={informeCompra.tipocompra == "L"}
                                        onChange={ () => {
                                            informeCompra.tipocompra = "L";
                                            onChange(informeCompra);
                                        } }
                                    />
                                </Col>
                                <Col xs={{ span: 24, }} sm={{ span: 3, }}>
                                    <C_Radio 
                                        title={"Exterior"}
                                        checked={informeCompra.tipocompra == "E"}
                                        onChange={ () => {
                                            informeCompra.tipocompra = "E";
                                            onChange(informeCompra);
                                        } }
                                    />
                                </Col>
                                <Col xs={{ span: 24, }} sm={{ span: 3, }}>
                                    <C_Radio 
                                        title={"Todos"}
                                        checked={informeCompra.tipocompra == "T"}
                                        onChange={ () => {
                                            informeCompra.tipocompra = "T";
                                            onChange(informeCompra);
                                        } }
                                    />
                                </Col>
                            </Row>
                        </div>
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
                                    // onClick={props.onCreate}
                                >
                                    Terminar
                                </C_Button>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </>
    );
};

C_Form.propTypes = {
    onClose:  PropTypes.func,
    onChange: PropTypes.func,
    onImprimir: PropTypes.func,
    onLimpiar: PropTypes.func,
    informeCompra: PropTypes.object,
}

C_Form.defaultProps = {
    onClose:  () => {},
    onChange: ( ev ) => {},
}

export default C_Form;