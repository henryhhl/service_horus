
import React from 'react';

import { DeleteOutlined, FileSearchOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";

export const listaPrecioColumns = ( onChange = () => {} ) => ( [
    {
        title: <span style={{ fontSize: 11, }}> { 'Nro.' } </span>,
        width: 30,
        dataIndex: 'nro',
        key: 'nro',
        fixed: 'left',
        render: ( text, data, index ) => (
            <span style={{ fontSize: 10, }}>
                <label style={{ color: '#387DFF', cursor: 'pointer', }} > 
                    { parseInt( index ) + 1 }
                </label>
            </span>
        ),
    },
    { 
        title: <span style={{ fontSize: 11, }}> { 'P. Base' } </span>, 
        dataIndex: 'preciobase', key: 'preciobase', width: 60, fixed: 'left',
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
        dataIndex: 'preciopivote', key: 'preciopivote', width: 60,
        render: ( text, data, index ) => (
            <span style={{ fontSize: 10, display: 'flex', }}>
                <label style={{ color: '#387DFF', cursor: 'pointer', borderBottom: '1px dashed #387DFF', }}> 
                    {data.preciopivote}
                </label>
            </span>
        ),
    },
    { 
        title: <span style={{ fontSize: 11, }}> { 'Desc(%)' } </span>, 
        dataIndex: 'descuento', key: 'descuento', width: 40,
        render: ( text, data, index ) => (
            <span style={{ fontSize: 10, display: 'flex', }}>
                <label style={{ color: '#387DFF', cursor: 'pointer', borderBottom: '1px dashed #387DFF', }}> 
                    {data.descuento}
                </label>
            </span>
        ),
    },
    { 
        title: <span style={{ fontSize: 11, }}> { 'Mon. Desc.' } </span>, 
        dataIndex: 'montodescuento', key: 'montodescuento', width: 60,
        render: ( text, data, index ) => (
            <span style={{ fontSize: 10, display: 'flex', }}>
                <label style={{ color: '#387DFF', cursor: 'pointer', borderBottom: '1px dashed #387DFF', }}> 
                    {data.montodescuento}
                </label>
            </span>
        ),
    },
    { 
        title: <span style={{ fontSize: 11, }}> { 'P. venta' } </span>, 
        dataIndex: 'precioventa', key: 'precioventa', width: 60,
        render: ( text, data, index ) => (
            <span style={{ fontSize: 10, display: 'flex', }}>
                <label style={{ color: '#387DFF', cursor: 'pointer', borderBottom: '1px dashed #387DFF', }}> 
                    {data.precioventa}
                </label>
            </span>
        ),
    },
    { 
        title: <span style={{ fontSize: 11, }}> { 'Nota' } </span>,
        dataIndex: 'nota', key: 'nota', width: 250,
    },
] );