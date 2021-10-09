
import React from 'react';

import { DeleteOutlined, FileSearchOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";

export const columns = ( onChangeDetalle = () => {}, onShowVisibleProducto = () => {} ) => ( [
    {
        title: <span style={{ fontSize: 11, }}> { 'Nro.' } </span>,
        width: 50,
        dataIndex: 'nro',
        key: 'nro',
        fixed: 'left',
        render: ( text, data, index ) => (
            <span style={{ fontSize: 11, }}>
                <label style={{ color: '#387DFF', cursor: 'pointer', }} > 
                    { parseInt( index ) + 1 }
                </label>
            </span>
        ),
    },
    {
        title: <span style={{ fontSize: 11, }}> { 'Código' } </span>,
        width: 120,
        dataIndex: 'codigo',
        key: 'codigo',
        fixed: 'left',
        render: ( text, data, index ) => (
            <span style={{ fontSize: 10, display: 'flex', }}>
                <FileSearchOutlined 
                    className="icon-table-horus" style={{ padding: 2, marginRight: 2, height: 16, }}
                    onClick={ () => onShowVisibleProducto(data, index, true) }
                />
                <label style={{ color: '#387DFF', cursor: 'pointer', borderBottom: '1px dashed #387DFF', }}
                    onClick={() => onShowVisibleProducto(data, index, true) }
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
        key: 'producto', width: 160,
        render: ( text, data, index ) => (
            <span style={{ fontSize: 10, display: 'flex', }}>
                <FileSearchOutlined 
                    className="icon-table-horus" style={{ padding: 2, marginRight: 2, height: 16, }}
                    onClick={ () => onShowVisibleProducto(data, index, true) }
                />
                <label style={{ color: '#387DFF', cursor: 'pointer', borderBottom: '1px dashed #387DFF', }}
                    onClick={() => onShowVisibleProducto(data, index, true) }
                > 
                    { ( data.producto.toString().length == 0 ) ?
                        "SELECCIONAR" : data.producto
                    }
                </label>
            </span>
        ),
    },
    { 
        title: <span style={{ fontSize: 11, }}> { 'P. Base' } </span>, 
        dataIndex: 'preciobase', key: 'preciobase', width: 100,
        render: ( text, data, index ) => (
            <span style={{ fontSize: 10, display: 'flex', }}>
                { ( data.preciobase.toString().length == 0 ) ?
                    "" : 
                    <label style={{ color: '#387DFF', cursor: 'pointer', borderBottom: '1px dashed #387DFF', }}> 
                        {data.preciobase}
                    </label>
                }
            </span>
        ),
    },
    { 
        title: <span style={{ fontSize: 11, }}> { 'Mon.' } </span>, 
        dataIndex: 'fkidmoneda', key: 'fkidmoneda', width: 100,
    },
    { 
        title: <span style={{ fontSize: 11, }}> { 'P. Pivote' } </span>, 
        dataIndex: 'preciopivote', key: 'preciopivote', width: 100,
    },
    { 
        title: <span style={{ fontSize: 11, }}> { 'Desc(%)' } </span>, 
        dataIndex: 'descuento', key: 'descuento', width: 100,
    },
    { 
        title: <span style={{ fontSize: 11, }}> { 'Mon. Desc.' } </span>, 
        dataIndex: 'montodescuento', key: 'montodescuento', width: 100,
    },
    { 
        title: <span style={{ fontSize: 11, }}> { 'P. venta' } </span>, 
        dataIndex: 'precioventa', key: 'precioventa', width: 100,
    },
    { 
        title: <span style={{ fontSize: 11, }}> { 'Nota' } </span>,
        dataIndex: 'nota', key: 'nota', width: 250,
    },
    {
        title: <span style={{ fontSize: 11, }}> { 'OP' } </span>,
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
                            onChangeDetalle( data, index );
                        } }
                    />
                </Tooltip>
            // </Popconfirm>
        ),
    },
] );