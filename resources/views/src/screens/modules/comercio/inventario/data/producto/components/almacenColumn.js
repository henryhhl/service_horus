
import React from 'react';
import { Popover } from "antd";

import { C_Checkbox, C_Input } from '../../../../../../../components';
import { Functions } from '../../../../../../../utils/functions';

export const almacenColumns = ( detalle, producto, onChangeDetalle = () => {} ) => ( [
    {
        title: <span style={{ fontSize: 11, }}> { 'Nro.' } </span>,
        width: 25,
        dataIndex: 'nro',
        key: 'nro',
        fixed: 'left',
        render: ( text, data, index ) => (
            <span style={{ fontSize: 10, }}>
                <label style={{  cursor: 'pointer', display: 'flex', }} >
                    <C_Checkbox
                        checked={ data.checked }
                        onChange={ ( checked ) => {
                            data.checked = checked;
                            if ( !checked ) {
                                producto.stockactual = producto.stockactual * 1 - data.stockactual * 1;
                                data.stockactual = 0;
                                data.stockminimo = 0;
                                data.stockmaximo = 0;
                            }
                            onChangeDetalle( producto );
                        } }
                        disabled={data.disabled}
                    />
                    <span style={{ position: 'relative', top: 2, left: -4, }}>
                        { parseInt( index ) + 1 }
                    </span>
                </label>
            </span>
        ),
    },
    {
        title: <span style={{ fontSize: 11, }}> { 'Álmacen' } </span>,
        dataIndex: 'almacen', key: 'almacen', width: 40,
        render: ( text, data, index ) => (
            <div style={{ display: 'block', }}>
                <span style={{ fontSize: 10, display: 'flex', }}>
                    <label style={{ cursor: 'pointer', }}>
                        {data.almacen}
                    </label>
                </span>
            </div>
        ),
    },
    {
        title: <span style={{ fontSize: 11, }}> { 'Stock' } </span>,
        dataIndex: 'stockactual', key: 'stockactual', width: 30,
        render: ( text, data, index ) => (
            <span style={{ fontSize: 10, display: 'flex', }}>
                {   ( data.checked && !data.disabled ) ?
                    <Popover title={"Stock"} trigger="click"
                        content={
                            <div>
                                <C_Input
                                    style={{ width: 120, marginTop: -10, }}
                                    value={data.stockactual}
                                    onChange={ (value) => {
                                        if ( value == "" ) value = 0;
                                        if ( !isNaN( value ) ) {
                                            if ( parseInt( value ) >= 0 ) {
                                                producto.stockactual = producto.stockactual * 1 - data.stockactual * 1;
                                                data.stockactual = parseInt(value);
                                                producto.stockactual = producto.stockactual * 1 + data.stockactual * 1;
                                                onChangeDetalle(producto);
                                            }
                                        }
                                    } }
                                    suffix={
                                        <i className="fa fa-plus icon-table-horus"
                                            onClick={ () => {
                                                producto.stockactual = producto.stockactual * 1 - data.stockactual * 1;
                                                data.stockactual = parseInt(data.stockactual) + 1;
                                                producto.stockactual = producto.stockactual * 1 + data.stockactual * 1;
                                                onChangeDetalle(producto);
                                            } }
                                        ></i>
                                    }
                                    prefix={
                                        <i className="fa fa-minus icon-table-horus"
                                            onClick={ () => {
                                                if ( disabled.data ) return;
                                                if ( parseInt( data.stockactual ) > 0 ) {
                                                    producto.stockactual = producto.stockactual * 1 - data.stockactual * 1;
                                                    data.stockactual = parseInt(data.stockactual) - 1;
                                                    producto.stockactual = producto.stockactual * 1 + data.stockactual * 1;
                                                    onChangeDetalle(producto);
                                                }
                                            } }
                                        ></i>
                                    }
                                />
                            </div>
                        }
                    >
                        <label style={{ color: '#387DFF', cursor: 'pointer', borderBottom: '1px dashed #387DFF', }}>
                            {data.stockactual}
                        </label>
                    </Popover> : 
                    <label>
                        {data.stockactual}
                    </label>
                }
            </span>
        ),
    },
    {
        title: <span style={{ fontSize: 11, }}> { 'Stock Mínimo' } </span>,
        dataIndex: 'stockminimo', key: 'stockminimo', width: 50,
        render: ( text, data, index ) => (
            <span style={{ fontSize: 10, display: 'flex', }}>
                {   ( data.checked && !data.disabled ) ? 
                    <Popover title={"Stock Mínimo"} trigger="click"
                        content={
                            <div>
                                <C_Input
                                    style={{ width: 120, marginTop: -10, }}
                                    value={data.stockminimo}
                                    onChange={ (value) => {
                                        if ( value == "" ) value = 0;
                                        if ( !isNaN( value ) ) {
                                            if ( parseInt( value ) >= 0 ) {
                                                data.stockminimo = parseInt(value);
                                                onChangeDetalle(producto);
                                            }
                                        }
                                    } }
                                    suffix={
                                        <i className="fa fa-plus icon-table-horus"
                                            onClick={ () => {
                                                data.stockminimo = parseInt(data.stockminimo) + 1;
                                                onChangeDetalle(producto);
                                            } }
                                        ></i>
                                    }
                                    prefix={
                                        <i className="fa fa-minus icon-table-horus"
                                            onClick={ () => {
                                                if ( disabled.data ) return;
                                                if ( parseInt( data.stockminimo ) > 0 ) {
                                                    data.stockminimo = parseInt(data.stockminimo) - 1;
                                                    onChangeDetalle(producto);
                                                }
                                            } }
                                        ></i>
                                    }
                                />
                            </div>
                        }
                    >
                        <label style={{ color: '#387DFF', cursor: 'pointer', borderBottom: '1px dashed #387DFF', }}>
                            {data.stockminimo}
                        </label>
                    </Popover> : 
                    <label>
                        {data.stockminimo}
                    </label>
                }
            </span>
        ),
    },
    {
        title: <span style={{ fontSize: 11, }}> { 'Stock Máximo' } </span>,
        dataIndex: 'stockmaximo', key: 'stockmaximo', width: 50,
        render: ( text, data, index ) => (
            <span style={{ fontSize: 10, display: 'flex', }}>
                {   ( data.checked && !data.disabled ) ? 
                    <Popover title={"Stock Máximo"} trigger="click"
                        content={
                            <div>
                                <C_Input
                                    style={{ width: 120, marginTop: -10, }}
                                    value={data.stockmaximo}
                                    onChange={ (value) => {
                                        if ( value == "" ) value = 0;
                                        if ( !isNaN( value ) ) {
                                            if ( parseInt( value ) >= 0 ) {
                                                data.stockmaximo = parseInt(value);
                                                onChangeDetalle(producto);
                                            }
                                        }
                                    } }
                                    suffix={
                                        <i className="fa fa-plus icon-table-horus"
                                            onClick={ () => {
                                                data.stockmaximo = parseInt(data.stockmaximo) + 1;
                                                onChangeDetalle(producto);
                                            } }
                                        ></i>
                                    }
                                    prefix={
                                        <i className="fa fa-minus icon-table-horus"
                                            onClick={ () => {
                                                if ( disabled.data ) return;
                                                if ( parseInt( data.stockmaximo ) > 0 ) {
                                                    data.stockmaximo = parseInt(data.stockmaximo) - 1;
                                                    onChangeDetalle(producto);
                                                }
                                            } }
                                        ></i>
                                    }
                                />
                            </div>
                        }
                    >
                        <label style={{ color: '#387DFF', cursor: 'pointer', borderBottom: '1px dashed #387DFF', }}>
                            {data.stockmaximo}
                        </label>
                    </Popover> : 
                    <label>
                        {data.stockmaximo}
                    </label>
                }
            </span>
        ),
    },
    {
        title: <span style={{ fontSize: 11, }}> { 'Dirección' } </span>,
        dataIndex: 'direccion', key: 'direccion', width: 100,
        render: ( text, data, index ) => (
            <div style={{ display: 'block', }}>
                <span style={{ fontSize: 10, display: 'flex', }}>
                    <label style={{ cursor: 'pointer', }}>
                        {data.direccion}
                    </label>
                </span>
            </div>
        ),
    },
] );
