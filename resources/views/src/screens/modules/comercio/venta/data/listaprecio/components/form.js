
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Resizable } from 'react-resizable';

import { Col, Row, Table } from 'antd';
import { C_Date, C_Input, C_Message, C_Select, C_Table } from '../../../../../../../components';
import { Functions } from '../../../../../../../utils/functions';
import { columns } from './column';

import M_ListadoProducto from '../../../../inventario/data/producto/modal/listado';
import M_ListadoUnidadMedidaProducto from '../../../../inventario/data/unidadmedidaproducto/modal/listado';

const ResizeableTitle = props => {
    const { onResize, width, ...restProps } = props;

    if ( !width ) {
      return <th {...restProps} />;
    }

    return (
      <Resizable
        width={width}
        height={0}
        onResize={onResize}
        draggableOpts={{ enableUserSelectHack: false }}
      >
        <th {...restProps} />
      </Resizable>
    );
};

function C_Form( props ) {

    const { listaPrecio, disabled, onChange } = props;
    const { descripcion, fechalistaprecio, idlistaprecio } = listaPrecio;
    const { focusInput, error, message } = listaPrecio;

    const [ visible_producto, setVisibleProducto ] = useState( false );
    const [ rowdetalle, setRowDetalle ] = useState( null );

    function onChangeID( value ) {
        listaPrecio.idlistaprecio = value;
        onChange( listaPrecio );
    };

    function onChangeTipoCambio( value ) {
        if ( value === "" ) value = 0;
        if ( !isNaN( value ) ) {
            if ( Functions.esDecimal( value, 2 ) ) {
                value += '';
                const list = value.split('.');
                listaPrecio.tipocambio = `${ parseInt( list[0] ) }${ ( list[1] ) ? `.${ list[1] }` : ( list.length > 1 ) ? '.' : '' }`;
                onChange( listaPrecio );
            }
        };
    };

    function onChangeFechaListaPrecio( value ) {
        listaPrecio.fechalistaprecio = value;
        onChange( listaPrecio );
    };

    function onChangeEstado( value ) {
        listaPrecio.estado = value;
        onChange( listaPrecio );
    };

    function onChangeAbreviatura( value ) {
        listaPrecio.abreviatura        = value;
        listaPrecio.error.abreviatura  = false;
        listaPrecio.message.abreviatura = "";
        onChange( listaPrecio );
    };

    function onChangeDescripcion( value ) {
        listaPrecio.descripcion        = value;
        listaPrecio.error.descripcion  = false;
        listaPrecio.message.descripcion = "";
        onChange( listaPrecio );
    };

    function onChangeValor( value ) {
        if ( value === "" ) value = 0;
        if ( !isNaN( value ) ) {
            if ( parseInt( value ) >= 0 && parseInt( value ) <= 100 ) {
                listaPrecio.valor        = value;
                listaPrecio.error.valor  = false;
                listaPrecio.message.valor = "";
                onChange( listaPrecio );
            }
        }
    };

    function onChangeAccion( value ) {
        if ( value === 'N' ) {
            listaPrecio.valor = 0;
        }
        listaPrecio.accion = value;
        onChange( listaPrecio );
    };

    function onChangeFechaInicio( value ) {
        if ( value === "" ) {
            listaPrecio.fechafinal = "";
        }
        listaPrecio.fechainicio = value;
        onChange( listaPrecio );
    };

    function onChangeFechaFin( value ) {
        listaPrecio.fechafinal = value;
        onChange( listaPrecio );
    };

    function onChangeNota( value ) {
        listaPrecio.nota = value;
        onChange( listaPrecio );
    };

    function onShowVisibleProducto( detalle, index ) {
        detalle.index = index;
        setRowDetalle(detalle);
        setVisibleProducto(true);
    };

    function existProducto( value ) {
        for (let index = 0; index < listaPrecio.listapreciodetalle.length; index++) {
            const element = listaPrecio.listapreciodetalle[index];
            if ( element.fkidunidadmedidaproducto === value ) return true;
        }
        return false;
    };

    function componentProducto() {
        if ( !visible_producto ) return null;
        return (
            <M_ListadoUnidadMedidaProducto
                visible={visible_producto}
                onClose={ () => {
                    setVisibleProducto(false);
                    setRowDetalle(null);
                } }
                value={rowdetalle.fkidproducto}
                onChange={ ( data ) => {
                    if ( !existProducto( data.idunidadmedidaproducto ) ) {
                        listaPrecio.listapreciodetalle[rowdetalle.index].codigo       = data.codigo;
                        listaPrecio.listapreciodetalle[rowdetalle.index].producto     = data.producto;
                        listaPrecio.listapreciodetalle[rowdetalle.index].fkidproducto = data.idproducto;
                        listaPrecio.listapreciodetalle[rowdetalle.index].fkidunidadmedidaproducto = data.idunidadmedidaproducto;
                        listaPrecio.listapreciodetalle[rowdetalle.index].fkidlistaprecio = null,
                        listaPrecio.listapreciodetalle[rowdetalle.index].fkidmoneda = null,
                        listaPrecio.listapreciodetalle[rowdetalle.index].preciobase = parseFloat(data.costo).toFixed(2),
                        listaPrecio.listapreciodetalle[rowdetalle.index].preciopivote = "0.00",
                        listaPrecio.listapreciodetalle[rowdetalle.index].descuento = "0",
                        listaPrecio.listapreciodetalle[rowdetalle.index].montodescuento = "0.00",
                        listaPrecio.listapreciodetalle[rowdetalle.index].precioventa = "0.00",
                        listaPrecio.listapreciodetalle[rowdetalle.index].nota = "",
                        onChange( listaPrecio );
                        setVisibleProducto(false);
                        setRowDetalle(null);
                    } else {
                        C_Message( "warning", "Producto ya seleccionado" );
                    }
                } }
            />
        );
    };

    function componentProductos() {
        if ( !visible_producto ) return null;
        return (
            <M_ListadoProducto
                visible={visible_producto}
                onClose={onHiddenProducto}
                // value={sucursal.fkidunionsucursal}
                onChange={ ( data ) => {
                    console.log(data)
                    listaPrecio.listapreciodetalle[indexdetalle].codigo       = data.codigo;
                    listaPrecio.listapreciodetalle[indexdetalle].producto     = data.descripcion;
                    listaPrecio.listapreciodetalle[indexdetalle].fkidproducto = data.idproducto;
                    listaPrecio.listapreciodetalle[indexdetalle].fkidlistaprecio = null,
                    listaPrecio.listapreciodetalle[indexdetalle].fkidmoneda = null,
                    listaPrecio.listapreciodetalle[indexdetalle].preciobase = "0.00",
                    listaPrecio.listapreciodetalle[indexdetalle].preciopivote = "0.00",
                    listaPrecio.listapreciodetalle[indexdetalle].descuento = "0",
                    listaPrecio.listapreciodetalle[indexdetalle].montodescuento = "0.00",
                    listaPrecio.listapreciodetalle[indexdetalle].precioventa = "0.00",
                    listaPrecio.listapreciodetalle[indexdetalle].nota = "",
                    onChange( listaPrecio );
                    onHiddenProducto();
                } }
            />
        );
    };

    return (
        <>
            { componentProducto() }

            <Row gutter={ [12, 8] }>
                <Col xs={{ span: 24, }} sm={{ span: 4, }}>
                    <C_Input
                        label={ "Código"}
                        placeholder={ "INGRESAR CÓDIGO..." }
                        value={ idlistaprecio }
                        onChange={ onChangeID }
                        disabled={ disabled.iddata }
                        onPressEnter={ props.onPressEnter }
                        autoFocus={true}
                        focus={ focusInput }
                    />
                </Col>
                <Col sm={{ span: 8, }}></Col>
                <Col xs={{ span: 24, }} sm={{ span: 4, }}>
                    <C_Date
                        label={"Fecha"}
                        value={ fechalistaprecio }
                        onChange={ onChangeFechaListaPrecio }
                        disabled={ disabled.data }
                        allowClear={false}
                    />
                </Col>
                <Col xs={{ span: 24, }} sm={{ span: 4, }}>
                    <C_Select
                        label={ "Estado"}
                        placeholder={ "SELECCIONAR ESTADO" }
                        value={ listaPrecio.estado }
                        onChange={ onChangeEstado }
                        disabled={ disabled.data }
                        data={ [
                            { title: "Activo", value: "A" },
                            { title: "Inactivo", value: "N" },
                        ] }
                    />
                </Col>
                <Col xs={{ span: 24, }} sm={{ span: 4, }}>
                    <C_Input
                        label={"Tipo Cambio"}
                        value={ listaPrecio.tipocambio }
                        onChange={ onChangeTipoCambio }
                        disabled={ disabled.data }
                    />
                </Col>
            </Row>
            <Row gutter={ [12, 8] }>
                <Col xs={{ span: 24, }} sm={{ span: 4, }}>
                    <C_Input
                        label={"Breve"}
                        placeholder={ "INGRESAR BREVE..." }
                        value={ listaPrecio.abreviatura }
                        onChange={ onChangeAbreviatura }
                        disabled={ disabled.data }
                        error={error.abreviatura}
                        message={message.abreviatura}
                    />
                </Col>
                <Col xs={{ span: 24, }} sm={{ span: 20, }}>
                    <C_Input
                        label={ "Descripción"}
                        placeholder={ "INGRESAR DESCRIPCIÓN..." }
                        value={ descripcion }
                        onChange={ onChangeDescripcion }
                        disabled={ disabled.data }
                        error={error.descripcion}
                        message={message.descripcion}
                    />
                </Col>
            </Row>
            <Row gutter={ [12, 8] }>
                <Col sm={{ span: 4, }}></Col>
                <Col xs={{ span: 24, }} sm={{ span: 4, }}>
                    <C_Input
                        label={ "Valor"}
                        placeholder={ "INGRESAR VALOR..." }
                        value={ listaPrecio.valor }
                        onChange={ onChangeValor }
                        disabled={ ( disabled.data || listaPrecio.accion === "N" ) }
                        error={error.valor}
                        message={message.valor}
                    />
                </Col>
                <Col xs={{ span: 24, }} sm={{ span: 4, }}>
                    <C_Select
                        label={ "Acción"}
                        placeholder={ "SELECCIONAR ACCIÓN" }
                        value={ listaPrecio.accion }
                        onChange={ onChangeAccion }
                        disabled={ disabled.data }
                        data={ [
                            { title: "Ninguno", value: "N" },
                            { title: "Incremento", value: "I" },
                            { title: "Descuento", value: "D" },
                        ] }
                    />
                </Col>
                <Col xs={{ span: 24, }} sm={{ span: 4, }}>
                    <C_Date
                        label={"Fecha inicio"}
                        value={ listaPrecio.fechainicio }
                        onChange={ onChangeFechaInicio }
                        disabled={ disabled.data }
                    />
                </Col>
                <Col xs={{ span: 24, }} sm={{ span: 4, }}>
                    <C_Date
                        label={"Fecha fin"}
                        value={ listaPrecio.fechafinal }
                        onChange={ onChangeFechaFin }
                        disabled={ ( disabled.data || listaPrecio.fechainicio === "" ) }
                    />
                </Col>
            </Row>
            <div className="main-card card mb-3 mt-3 pl-1 pr-1 pb-1">
                <Table
                    pagination={false} bordered size={"small"}
                    style={{ width: "100%", minWidth: "100%", maxWidth: "100%", }}
                    columns={ columns( listaPrecio, disabled, onChange, onShowVisibleProducto ) } dataSource={listaPrecio.listapreciodetalle}
                    scroll={{ x: 1500, y: 200 }}
                />
            </div>
            <Row gutter={ [12, 8] }>
                <Col xs={{ span: 24, }} sm={{ span: 24, }}>
                    <C_Input
                        label={ "Nota"}
                        placeholder={ "INGRESAR NOTA..." }
                        value={ listaPrecio.nota }
                        onChange={ onChangeNota }
                        disabled={ disabled.data }
                        multiline={true} maxRows={4} minRows={3}
                    />
                </Col>
            </Row>
        </>
    );
};

C_Form.propTypes = {
    listaPrecio: PropTypes.object,
    disabled:     PropTypes.object,

    onChange:     PropTypes.func.isRequired,
    onPressEnter: PropTypes.func,
};

C_Form.defaultProps = {
    onChange: ( evt ) => {},
};

export default C_Form;
