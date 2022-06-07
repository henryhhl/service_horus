
import React from 'react';

import { DeleteOutlined, ExclamationOutlined, FileSearchOutlined, PlusOutlined } from "@ant-design/icons";
import { Popover, Tooltip } from "antd";
import { Functions } from '../../../../../../../utils/functions';
import { C_Confirm, C_Input } from '../../../../../../../components';

export const columns = ( detalle, disabled = { data: false, }, onChangeDetalle = () => {}, onShowVisibleProducto = () => {} ) => {

    function onAddRowDetalle() {
        const element = {
            key: detalle.listapreciodetalle.length,
            idlistapreciodetalle: null,
            codigo: "",
            producto: "",
            fkidproducto: null,
            fkidlistaprecio: null,
            fkidmoneda: null,
            preciobase: "",
            preciopivote: "",
            descuento: "",
            montodescuento: "",
            precioventa: "",
            nota: "",
        };
        detalle.listapreciodetalle = [ ...detalle.listapreciodetalle, element ];
        onChangeDetalle( detalle );
    };

    function onDeleteRowDetalle( data, index ) {
        detalle.listapreciodetalle = detalle.listapreciodetalle.filter( (item, key) => key !== index );
        if ( data.idlistapreciodetalle != null ) {
            detalle.listapreciodetalledelete = [ ...detalle.listapreciodetalledelete, data.idlistapreciodetalle ];
        }
        onChangeDetalle( detalle );
    };

    return ( [
        {
            title: <span style={{ fontSize: 11, }}> { 'Nro.' } </span>,
            width: 40,
            dataIndex: 'nro',
            key: 'nro',
            fixed: 'left',
            render: ( text, data, index ) => (
                <span style={{ fontSize: 11, }}>
                    <label style={{ cursor: 'pointer', }} >
                        { parseInt( index ) + 1 }
                    </label>
                </span>
            ),
        },
        {
            title: <span style={{ fontSize: 11, }}> { 'Código Producto' } </span>,
            width: 110,
            dataIndex: 'codigo',
            key: 'codigo',
            fixed: 'left',
            render: ( text, data, index ) => (
                <span style={{ fontSize: 10, display: 'flex', }}>
                    <FileSearchOutlined
                        className="icon-table-horus" style={{ padding: 2, marginRight: 2, height: 16, }}
                        onClick={ () => ( !disabled.data ) && onShowVisibleProducto( data, index ) }
                    />
                    <label style={{ color: '#387DFF', cursor: 'pointer', borderBottom: '1px dashed #387DFF', }}
                        onClick={() => ( !disabled.data ) && onShowVisibleProducto( data, index ) }
                    >
                        { ( data.codigo.toString().length == 0 ) ?
                            "SELECCIONAR" : data.codigo
                        }
                    </label>
                </span>
            ),
        },
        {
            title: <span style={{ fontSize: 11, }}> { 'Producto' } </span>,
            dataIndex: 'producto',
            key: 'producto', width: 170,
            render: ( text, data, index ) => (
                <span style={{ fontSize: 10, display: 'flex', }}>
                    <FileSearchOutlined
                        className="icon-table-horus" style={{ padding: 2, marginRight: 2, height: 16, }}
                        onClick={ () => ( !disabled.data ) && onShowVisibleProducto(data, index, true) }
                    />
                    <label style={{ color: '#387DFF', cursor: 'pointer', borderBottom: '1px dashed #387DFF', }}
                        onClick={() => ( !disabled.data ) && onShowVisibleProducto(data, index, true) }
                    >
                        { ( data.producto.toString().length == 0 ) ?
                            "SELECCIONAR" : data.producto
                        }
                    </label>
                </span>
            ),
        },
        {
            title: <span style={{ fontSize: 11, }}> { 'Prec. Base' } </span>,
            dataIndex: 'preciobase', key: 'preciobase', width: 100,
            render: ( text, data, index ) => (
                <span style={{ fontSize: 10, display: 'flex', }}>
                    { ( data.preciobase.toString().length == 0 ) ?
                        "" :
                        <label style={{ cursor: 'pointer', }}>
                            {data.preciobase}
                        </label>
                    }
                </span>
            ),
        },
        {
            title: <span style={{ fontSize: 11, }}> { 'Prec. Pivote' } </span>,
            dataIndex: 'preciopivote', key: 'preciopivote', width: 100,
            render: ( text, data, index ) => (
                <span style={{ fontSize: 10, display: 'flex', }}>
                    { ( data.preciopivote.toString().length == 0 ) ?
                        "" :
                        <Popover title={"Precio Pivote"} trigger="click"
                            content={
                                <div>
                                    <C_Input
                                        style={{ width: 200, marginTop: -10, }}
                                        value={data.preciopivote}
                                        onChange={ (value) => {
                                            if ( disabled.data ) return;
                                            if ( value == "" ) value = 0;
                                            if ( !isNaN( value ) ) {
                                                if ( Functions.esDecimal( value, 2 ) ) {
                                                    data.preciopivote = Functions.onChangeNumberDecimal(value);
                                                    data.montodescuento = parseFloat( ( data.descuento*1/100 ) * data.preciopivote ).toFixed(2);
                                                    data.precioventa = parseFloat( data.preciopivote*1 - data.montodescuento*1 ).toFixed(2);
                                                    onChangeDetalle( detalle );
                                                }
                                            };
                                        } }
                                        suffix={
                                            <i className="fa fa-plus icon-table-horus"
                                                onClick={ () => {
                                                    if ( disabled.data ) return;
                                                    data.preciopivote = Functions.onIncrementarNumberDecimal(data.preciopivote);
                                                    data.montodescuento = parseFloat( ( data.descuento*1/100 ) * data.preciopivote ).toFixed(2);
                                                    data.precioventa = parseFloat( data.preciopivote*1 - data.montodescuento*1 ).toFixed(2);
                                                    onChangeDetalle(detalle);
                                                } }
                                            ></i>
                                        }
                                        prefix={
                                            <i className="fa fa-minus icon-table-horus"
                                                onClick={ () => {
                                                    if ( disabled.data ) return;
                                                    data.preciopivote = Functions.onDecrementarNumberDecimal(data.preciopivote);
                                                    data.montodescuento = parseFloat( ( data.descuento*1/100 ) * data.preciopivote ).toFixed(2);
                                                    data.precioventa = parseFloat( data.preciopivote*1 - data.montodescuento*1 ).toFixed(2);;
                                                    onChangeDetalle(detalle);
                                                } }
                                            ></i>
                                        }
                                    />
                                </div>
                            }
                        >
                            <label style={{ color: '#387DFF', cursor: 'pointer', borderBottom: '1px dashed #387DFF', }}>
                                {data.preciopivote} { data.errorcosto === true &&
                                    <ExclamationOutlined
                                        style={{ position: 'relative', top: -2, padding: 4, borderRadius: 30, color: 'white', backgroundColor: 'red', }}
                                    />
                                }
                            </label>
                        </Popover>
                    }
                </span>
            ),
        },
        {
            title: <span style={{ fontSize: 11, }}> { 'Desc/Inc(%)' } </span>,
            dataIndex: 'descuento', key: 'descuento', width: 70,
            render: ( text, data, index ) => (
                <span style={{ fontSize: 10, display: 'flex', }}>
                    { ( data.descuento.toString().length == 0 ) ?
                        "" :
                        <Popover title={"Descuento"} trigger="click"
                            content={
                                <div>
                                    <C_Input
                                        style={{ width: 120, marginTop: -10, }}
                                        value={data.descuento}
                                        onChange={ (value) => {
                                            if ( disabled.data ) return;
                                            if ( value == "" ) value = 0;
                                            if ( !isNaN( value ) ) {
                                                if ( parseInt( value ) >= 0 && parseInt( value ) <= 100 ) {
                                                    data.descuento = parseInt(value);
                                                    data.montodescuento = parseFloat( ( data.descuento*1/100 ) * data.preciopivote ).toFixed(2);
                                                    data.precioventa = parseFloat( data.preciopivote*1 - data.montodescuento*1 ).toFixed(2);
                                                    onChangeDetalle(detalle);
                                                }
                                            }
                                        } }
                                        suffix={
                                            <i className="fa fa-plus icon-table-horus"
                                                onClick={ () => {
                                                    if ( disabled.data ) return;
                                                    data.descuento = parseInt(data.descuento) + 1;
                                                    if ( parseInt( data.descuento ) <= 100 ) {
                                                        data.montodescuento = parseFloat( ( data.descuento*1/100 ) * data.preciopivote ).toFixed(2);
                                                        data.precioventa = parseFloat( data.preciopivote*1 - data.montodescuento*1 ).toFixed(2);
                                                        onChangeDetalle(detalle);
                                                    }
                                                } }
                                            ></i>
                                        }
                                        prefix={
                                            <i className="fa fa-minus icon-table-horus"
                                                onClick={ () => {
                                                    if ( disabled.data ) return;
                                                    if ( parseInt( data.descuento ) > 0 ) {
                                                        data.descuento = parseInt(data.descuento) - 1;
                                                        data.montodescuento = parseFloat( ( data.descuento*1/100 ) * data.preciopivote ).toFixed(2);
                                                        data.precioventa = parseFloat( data.preciopivote*1 - data.montodescuento*1 ).toFixed(2);
                                                        onChangeDetalle(detalle);
                                                    }
                                                } }
                                            ></i>
                                        }
                                    />
                                </div>
                            }
                        >
                            <label style={{ color: '#387DFF', cursor: 'pointer', borderBottom: '1px dashed #387DFF', }}>
                                {data.descuento}
                            </label>
                        </Popover>
                    }
                </span>
            ),
        },
        {
            title: <span style={{ fontSize: 11, }}> { 'Mto. Desc/Inc' } </span>,
            dataIndex: 'montodescuento', key: 'montodescuento', width: 80,
            render: ( text, data, index ) => (
                <span style={{ fontSize: 10, display: 'flex', }}>
                    { ( data.descuento.toString().length == 0 ) ?
                        "" :
                        <Popover title={"Monto Descuento"} trigger="click"
                            content={
                                <div>
                                    <C_Input
                                        style={{ width: 120, marginTop: -10, }}
                                        value={data.montodescuento}
                                        onChange={ (value) => {
                                            if ( disabled.data ) return;
                                            if ( value == "" ) value = 0;
                                            if ( !isNaN( value ) ) {
                                                if ( parseFloat( value ) <= parseFloat(data.preciopivote)  ) {
                                                    data.montodescuento = Functions.onChangeNumberDecimal(value);
                                                    data.precioventa = parseFloat( data.preciopivote*1 - data.montodescuento*1 ).toFixed(2);
                                                    data.descuento = parseInt( (data.montodescuento / data.preciopivote) * 100 );
                                                    onChangeDetalle(detalle);
                                                }
                                            }
                                        } }
                                        suffix={
                                            <i className="fa fa-plus icon-table-horus"
                                                onClick={ () => {
                                                    if ( disabled.data ) return;
                                                    data.montodescuento = Functions.onIncrementarNumberDecimal(data.montodescuento);
                                                    if ( parseFloat( data.montodescuento ) <= parseFloat( data.preciopivote ) ) {
                                                        data.descuento = parseInt( (data.montodescuento / data.preciopivote) * 100 );
                                                        data.precioventa = parseFloat( data.preciopivote*1 - data.montodescuento*1 ).toFixed(2);
                                                        onChangeDetalle(detalle);
                                                    }
                                                } }
                                            ></i>
                                        }
                                        prefix={
                                            <i className="fa fa-minus icon-table-horus"
                                                onClick={ () => {
                                                    if ( disabled.data ) return;
                                                    if ( parseInt( data.montodescuento ) > 0 ) {
                                                        data.montodescuento = Functions.onDecrementarNumberDecimal(data.montodescuento);
                                                        data.descuento = parseInt( (data.montodescuento / data.preciopivote) * 100 );
                                                        data.precioventa = parseFloat( data.preciopivote*1 - data.montodescuento*1 ).toFixed(2);
                                                        onChangeDetalle(detalle);
                                                    }
                                                } }
                                            ></i>
                                        }
                                    />
                                </div>
                            }
                        >
                            <label style={{ color: '#387DFF', cursor: 'pointer', borderBottom: '1px dashed #387DFF', }}>
                                {data.montodescuento}
                            </label>
                        </Popover>
                    }
                </span>
            ),
        },
        {
            title: <span style={{ fontSize: 11, }}> { 'Prec. venta' } </span>,
            dataIndex: 'precioventa', key: 'precioventa', width: 100,
        },
        {
            title: <span style={{ fontSize: 11, }}> { 'Nota' } </span>,
            dataIndex: 'nota', key: 'nota', width: 250,
            render: ( text, data, index ) => (
                <span style={{ fontSize: 10, display: 'flex', }}>
                    <Popover title={"Nota"} trigger="click"
                        content={
                            <div style={{ width: 300, }}>
                                <C_Input
                                    style={{ marginTop: -10 }}
                                    value={data.nota} multiline
                                    maxRows={3} minRows={2}
                                    onChange={ (value) => {
                                        if ( disabled.data ) return;
                                        data.nota = value;
                                        onChangeDetalle( detalle );
                                    } }
                                />
                            </div>
                        }
                    >
                        <label style={{ color: '#387DFF', cursor: 'pointer', borderBottom: '1px dashed #387DFF', }}>
                            { data.nota ? data.nota : "AGREGAR NOTA" }
                        </label>
                    </Popover>
                </span>
            ),
        },
        {
            title: (
                <span style={{ fontSize: 11, }}>
                    { 'OP' }
                    { ( !disabled.data ) &&
                        <Tooltip title="AGREGAR" placement="top" color={'#2db7f5'}>
                            <PlusOutlined className="icon-table-horus" style={{ position: 'relative', left: 4, top: -2, }}
                                onClick={ () => {
                                    if ( disabled.data ) return;
                                    onAddRowDetalle();
                                } }
                            />
                        </Tooltip>
                    }
                </span>
            ),
            key: 'accion',
            fixed: 'right',
            width: 50,
            render: ( text, data, index ) => (
                // <Popconfirm title={"Estas seguro de eliminar?"}
                //     onConfirm={() => onDeleteRowDetalle(data)}
                // >
                    <Tooltip title="ELIMINAR" placement="top" color={'#2db7f5'}>
                        <DeleteOutlined className="icon-table-horus"
                            onClick={ () => {
                                let onDeleteRowDetalles = () => onDeleteRowDetalle( data, index );
                                C_Confirm( {
                                    title: "Quitar Producto", onOk: onDeleteRowDetalles,
                                    okType: "primary", content: "Estás seguro de realizar acción.?",
                                } );
                                // onChangeDetalle( data, index );
                            } }
                        />
                    </Tooltip>
                // </Popconfirm>
            ),
        },
    ] );
};
