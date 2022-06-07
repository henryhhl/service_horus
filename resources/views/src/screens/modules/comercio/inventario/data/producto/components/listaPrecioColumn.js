
import React from 'react';
import { Popover } from "antd";

import { C_Input } from '../../../../../../../components';
import { Functions } from '../../../../../../../utils/functions';

export const listaPrecioColumns = ( detalle, onChangeDetalle = () => {} ) => ( [
    {
        title: <span style={{ fontSize: 11, }}> { 'Nro.' } </span>,
        width: 25,
        dataIndex: 'nro',
        key: 'nro',
        fixed: 'left',
        render: ( text, data, index ) => (
            <span style={{ fontSize: 10, }}>
                <label style={{  cursor: 'pointer', }} >
                    { parseInt( index ) + 1 }
                </label>
            </span>
        ),
    },
    {
        title: <span style={{ fontSize: 11, }}> { 'Descripción' } </span>,
        dataIndex: 'descripcion', key: 'descripcion', width: 80, fixed: 'left',
        render: ( text, data, index ) => (
            <div style={{ display: 'block', }}>
                <span style={{ fontSize: 10, display: 'flex', }}>
                    <label style={{ cursor: 'pointer', }}>
                        { data.abreviatura ? data.abreviatura : "" } - {data.descripcion}
                    </label>
                </span>
                <span style={{ fontSize: 10, display: 'flex', justifyContent: 'left', }}>
                    <strong>
                        Acción:
                    </strong>
                    <label style={{ cursor: 'pointer', marginLeft: 4, }}>
                        { data.descuento }% { data.accion == 'I' ? 'Inc.' : 'Desc.' }
                    </label>
                </span>
                <span style={{ fontSize: 10, display: 'flex', justifyContent: 'left', }}>
                    <strong>
                        Precio Base:
                    </strong>
                    <label style={{ cursor: 'pointer', marginLeft: 4, }}>
                        { data.preciobase }
                    </label>
                </span>
                <span style={{ fontSize: 10, display: 'flex', justifyContent: 'left', }}>
                    <strong>
                        Precio Unit.:
                    </strong>
                    <label style={{ cursor: 'pointer', marginLeft: 4, }}>
                        { data.precioventa }
                    </label>
                </span>
            </div>
        ),
    },
    {
        title: <span style={{ fontSize: 11, }}> { 'P. Pivote' } </span>,
        dataIndex: 'preciopivote', key: 'preciopivote', width: 50,
        render: ( text, data, index ) => (
            <span style={{ fontSize: 10, display: 'flex', }}>
                <Popover title={"Precio Pivote"} trigger="click"
                    content={
                        <div>
                            <C_Input
                                style={{ width: 200, marginTop: -10, }}
                                value={data.preciopivote}
                                onChange={ (value) => {
                                    if ( value == "" ) value = 0;
                                    if ( !isNaN( value ) ) {
                                        if ( Functions.esDecimal( value, 2 ) ) {
                                            data.preciopivote = Functions.onChangeNumberDecimal(value);
                                            data.montodescuento = parseFloat( ( data.descuento*1/100 ) * data.preciopivote ).toFixed(2);
                                            if ( data.accion == 'I' ) {
                                                data.precioventa = parseFloat( data.preciopivote*1 + data.montodescuento*1 ).toFixed(2);
                                            } else {
                                                data.precioventa = parseFloat( data.preciopivote*1 - data.montodescuento*1 ).toFixed(2);
                                            }
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
                                            if ( data.accion == 'I' ) {
                                                data.precioventa = parseFloat( data.preciopivote*1 + data.montodescuento*1 ).toFixed(2);
                                            } else {
                                                data.precioventa = parseFloat( data.preciopivote*1 - data.montodescuento*1 ).toFixed(2);
                                            }
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
                                            if ( data.accion == 'I' ) {
                                                data.precioventa = parseFloat( data.preciopivote*1 + data.montodescuento*1 ).toFixed(2);
                                            } else {
                                                data.precioventa = parseFloat( data.preciopivote*1 - data.montodescuento*1 ).toFixed(2);
                                            }
                                            onChangeDetalle(detalle);
                                        } }
                                    ></i>
                                }
                            />
                        </div>
                    }
                >
                    <label style={{ color: '#387DFF', cursor: 'pointer', borderBottom: '1px dashed #387DFF', }}>
                        {data.preciopivote}
                    </label>
                </Popover>
            </span>
        ),
    },
    {
        title: <span style={{ fontSize: 11, }}> { 'Desc/Inc(%)' } </span>,
        dataIndex: 'descuento', key: 'descuento', width: 45,
        render: ( text, data, index ) => (
            <span style={{ fontSize: 10, display: 'flex', }}>
                <Popover title={"Descuento/Incremento"} trigger="click"
                    content={
                        <div>
                            <C_Input
                                style={{ width: 120, marginTop: -10, }}
                                value={data.descuento}
                                onChange={ (value) => {
                                    if ( value == "" ) value = 0;
                                    if ( !isNaN( value ) ) {
                                        if ( parseInt( value ) >= 0 && parseInt( value ) <= 100 ) {
                                            data.descuento = parseInt(value);
                                            data.montodescuento = parseFloat( ( data.descuento*1/100 ) * data.preciopivote ).toFixed(2);
                                            if ( data.accion == 'I' ) {
                                                data.precioventa = parseFloat( data.preciopivote*1 + data.montodescuento*1 ).toFixed(2);
                                            } else {
                                                data.precioventa = parseFloat( data.preciopivote*1 - data.montodescuento*1 ).toFixed(2);
                                            }
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
                                                if ( data.accion == 'I' ) {
                                                    data.precioventa = parseFloat( data.preciopivote*1 + data.montodescuento*1 ).toFixed(2);
                                                } else {
                                                    data.precioventa = parseFloat( data.preciopivote*1 - data.montodescuento*1 ).toFixed(2);
                                                }
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
                                                if ( data.accion == 'I' ) {
                                                    data.precioventa = parseFloat( data.preciopivote*1 + data.montodescuento*1 ).toFixed(2);
                                                } else {
                                                    data.precioventa = parseFloat( data.preciopivote*1 - data.montodescuento*1 ).toFixed(2);
                                                }
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
                        {data.descuento}%
                    </label>
                </Popover>
            </span>
        ),
    },
    {
        title: <span style={{ fontSize: 11, }}> { 'Mon. Desc./Inc.' } </span>,
        dataIndex: 'montodescuento', key: 'montodescuento', width: 50,
        render: ( text, data, index ) => (
            <span style={{ fontSize: 10, display: 'flex', }}>
                <Popover title={"Monto Descuento/Incremento"} trigger="click"
                    content={
                        <div>
                            <C_Input
                                style={{ width: 120, marginTop: -10, }}
                                value={data.montodescuento}
                                onChange={ (value) => {
                                    if ( value == "" ) value = 0;
                                    if ( !isNaN( value ) ) {
                                        if ( parseFloat( value ) <= parseFloat(data.preciopivote)  ) {
                                            data.montodescuento = Functions.onChangeNumberDecimal(value);
                                            data.descuento = parseInt( (data.montodescuento / data.preciopivote) * 100 );
                                            if ( data.accion == 'I' ) {
                                                data.precioventa = parseFloat( data.preciopivote*1 + data.montodescuento*1 ).toFixed(2);
                                            } else {
                                                data.precioventa = parseFloat( data.preciopivote*1 - data.montodescuento*1 ).toFixed(2);
                                            }
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
                                                if ( data.accion == 'I' ) {
                                                    data.precioventa = parseFloat( data.preciopivote*1 + data.montodescuento*1 ).toFixed(2);
                                                } else {
                                                    data.precioventa = parseFloat( data.preciopivote*1 - data.montodescuento*1 ).toFixed(2);
                                                }
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
                                                if ( data.accion == 'I' ) {
                                                    data.precioventa = parseFloat( data.preciopivote*1 + data.montodescuento*1 ).toFixed(2);
                                                } else {
                                                    data.precioventa = parseFloat( data.preciopivote*1 - data.montodescuento*1 ).toFixed(2);
                                                }
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
            </span>
        ),
    },
    {
        title: <span style={{ fontSize: 11, }}> { 'P. venta' } </span>,
        dataIndex: 'precioventa', key: 'precioventa', width: 50,
        render: ( text, data, index ) => (
            <span style={{ fontSize: 10, display: 'flex', }}>
                <label style={{ cursor: 'pointer', }}>
                    {data.precioventa}
                </label>
            </span>
        ),
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
] );
