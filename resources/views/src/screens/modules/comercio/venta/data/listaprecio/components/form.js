
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Resizable } from 'react-resizable';

import { Col, Row, Table } from 'antd';
import { C_Date, C_Input, C_Table } from '../../../../../../../components';
import { Functions } from '../../../../../../../utils/functions';
import { columns } from './column';
import M_ListadoProducto from '../../../../inventario/data/producto/modal/listado';

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
    const { nombre, fechainicio, idlistaprecio } = listaPrecio;
    const { focusInput, error, message } = listaPrecio;

    const [ visible_producto, setVisibleProducto ] = useState( false );
    const [ indexdetalle, setIndexDetalle ] = useState( null );

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

    function onChangeFechaInicio( value ) {
        listaPrecio.fechainicio = value;
        onChange( listaPrecio );
    };

    function onChangeAbreviatura( value ) {
        listaPrecio.abreviatura        = value;
        listaPrecio.error.abreviatura  = false;
        listaPrecio.message.abreviatura = "";
        onChange( listaPrecio );
    };

    function onChangeNombre( value ) {
        listaPrecio.nombre        = value;
        listaPrecio.error.nombre  = false;
        listaPrecio.message.nombre = "";
        onChange( listaPrecio );
    };

    function onChangeNota( value ) {
        listaPrecio.nota = value;
        onChange( listaPrecio );
    };

    function onShowVisibleProducto( detalle, index, visible) {
        setIndexDetalle(index);
        setVisibleProducto(visible);
    };

    function onChangeDetalle( detalle, index ) {
        console.log(listaPrecio)
        listaPrecio.listapreciodetalle[index].codigo = "codigo";
        onChange( listaPrecio );
        console.log(index)
        console.log(detalle)
    };

    function onHiddenProducto() {
        setVisibleProducto(false);
        setIndexDetalle(null);
    };

    function componentProducto() {
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
                <Col sm={{ span: 12, }}></Col>
                <Col xs={{ span: 24, }} sm={{ span: 4, }}>
                    <C_Input 
                        label={"Tipo Cambio"}
                        value={ listaPrecio.tipocambio }
                        onChange={ onChangeTipoCambio }
                        disabled={ disabled.data }
                    />
                </Col>
                <Col xs={{ span: 24, }} sm={{ span: 4, }}>
                    <C_Date 
                        label={"Fecha"}
                        value={ fechainicio }
                        onChange={ onChangeFechaInicio }
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
                <Col xs={{ span: 24, }} sm={{ span: 12, }}>
                    <C_Input
                        label={ "Nombre"}
                        placeholder={ "INGRESAR NOMBRE..." }
                        value={ nombre }
                        onChange={ onChangeNombre }
                        disabled={ disabled.data }
                        error={error.nombre}
                        message={message.nombre}
                    />
                </Col>
            </Row>
            <div className="main-card card mb-3 mt-3 pl-1 pr-1 pb-1">
                <Table 
                    pagination={false} bordered size={"small"}
                    style={{ width: "100%", minWidth: "100%", maxWidth: "100%", }}
                    columns={ columns( onChangeDetalle, onShowVisibleProducto ) } dataSource={listaPrecio.listapreciodetalle}
                    scroll={{ x: 1200, y: 200 }}
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
