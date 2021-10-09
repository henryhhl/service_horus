
import React from 'react';

import { Popconfirm, Popover, Tooltip } from "antd";
import { DeleteOutlined, FileSearchOutlined } from "@ant-design/icons";

import { C_Input } from '../../../../../../../components';
import { Functions } from '../../../../../../../utils/functions';

export const columns = ( detalle, disabled = { data: false, }, onChangeDetalle = () => {} ) => {

    function updateTotales() {
        let cantidadtotal = 0;
        let montototal = 0;
        detalle.arrayDevolucionCompraDetalle.map( (item) => {
            if ( item.fkidproducto !== null ) {
                cantidadtotal += parseInt(item.cantidad);
                montototal += parseFloat(item.costosubtotal);
            }
        } );
        detalle.cantidadtotal = parseInt(cantidadtotal);
        detalle.montosubtotal = parseFloat(montototal).toFixed(2);
        let montosubtotal = parseFloat(detalle.montosubtotal);
        let montodescuento = parseFloat(detalle.montodescuento);
        detalle.montototal = parseFloat(montosubtotal - montodescuento).toFixed(2);
    };

    function onDeleteRowDetalle( index ) {
        detalle.arrayDevolucionCompraDetalle = detalle.arrayDevolucionCompraDetalle.filter( (item, key) => key !== index );
        updateTotales();
        onChangeDetalle( detalle );
    };

    return ( [
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
            width: 80,
            dataIndex: 'codigo',
            key: 'codigo',
            fixed: 'left',
            render: ( text, data, index ) => (
                <span style={{ fontSize: 10, display: 'flex', }}>
                    <label> 
                        { ( data.codigo == "" || data.codigo == null ) ?
                            "" : data.codigo
                        }
                    </label>
                </span>
            ),
        },
        { 
            title: <span style={{ fontSize: 11, }}> { 'Producto' } </span>, 
            dataIndex: 'producto', 
            key: 'producto', width: 120,
            render: ( text, data, index ) => (
                <span style={{ fontSize: 10, display: 'flex', }}>
                    <label> 
                        { ( data.producto.toString().length == 0 ) ?
                            "" : data.producto
                        }
                    </label>
                </span>
            ),
        },
        {
            title: <span style={{ fontSize: 11, }}> { 'Origen' } </span>,
            width: 70,
            dataIndex: 'ciudadorigen',
            key: 'ciudadorigen',
            render: ( text, data, index ) => (
                <span style={{ fontSize: 10, display: 'flex', }}>
                    <label> 
                        { data.ciudadorigen }
                    </label>
                </span>
            ),
        },
        {
            title: <span style={{ fontSize: 11, }}> { 'Und.' } </span>,
            width: 60,
            dataIndex: 'unidadmedidaproducto',
            key: 'unidadmedidaproducto',
            render: ( text, data, index ) => (
                <span style={{ fontSize: 10, display: 'flex', }}>
                    { ( data.unidadmedidaproducto.toString().length == 0 ) ? "" :
                        <label style={{ color: '#387DFF', cursor: 'pointer', borderBottom: '1px dashed #387DFF', }}
                        > 
                            { data.unidadmedidaproducto }
                        </label>
                    }
                </span>
            ),
        },
        { 
            title: <span style={{ fontSize: 11, }}> { 'Cant.' } </span>, 
            dataIndex: 'cantidad', key: 'cantidad', width: 70,
            render: ( text, data, index ) => (
                <span style={{ fontSize: 10, display: 'flex', }}>
                    { ( data.cantidad.toString().length == 0 ) ?
                        "" : 
                        <Popover title={"Cantidad"} trigger="click"
                            content={
                                <div>
                                    <C_Input 
                                        style={{ width: 120, marginTop: -10, }}
                                        value={data.cantidad}
                                        onChange={ (value) => {
                                            if ( disabled.data ) return;
                                            if ( value == "" ) value = 0;
                                            if ( !isNaN( value ) ) {
                                                data.cantidad = parseInt(value);
                                                data.costosubtotal = parseFloat( data.cantidad * data.costounitario ).toFixed(2);
                                                data.pesosubtotal = parseFloat( data.cantidad * data.peso ).toFixed(2);
                                                data.volumensubtotal = parseFloat( data.cantidad * data.volumen ).toFixed(2);
                                                updateTotales();
                                                onChangeDetalle(detalle);
                                            }
                                        } }
                                        suffix={
                                            <i className="fa fa-plus icon-table-horus"
                                                onClick={ () => {
                                                    if ( disabled.data ) return;
                                                    data.cantidad = parseInt(data.cantidad) + 1;
                                                    data.costosubtotal = parseFloat( data.cantidad * data.costounitario ).toFixed(2);
                                                    data.pesosubtotal = parseFloat( data.cantidad * data.peso ).toFixed(2);
                                                    data.volumensubtotal = parseFloat( data.cantidad * data.volumen ).toFixed(2);
                                                    updateTotales();
                                                    onChangeDetalle(detalle);
                                                } }
                                            ></i>
                                        }
                                        prefix={
                                            <i className="fa fa-minus icon-table-horus"
                                                onClick={ () => {
                                                    if ( disabled.data ) return;
                                                    if ( parseInt( data.cantidad ) > 0 ) {
                                                        data.cantidad = parseInt(data.cantidad) - 1;
                                                        data.costosubtotal = parseFloat( data.cantidad * data.costounitario ).toFixed(2);
                                                        data.pesosubtotal = parseFloat( data.cantidad * data.peso ).toFixed(2);
                                                        data.volumensubtotal = parseFloat( data.cantidad * data.volumen ).toFixed(2);
                                                        updateTotales();
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
                                {data.cantidad}
                            </label>
                        </Popover>
                    }
                </span>
            ),
        },
        { 
            title: <span style={{ fontSize: 11, }}> { 'Cant. comp.' } </span>, 
            dataIndex: 'cantidadcomprada', key: 'cantidadcomprada', width: 70,
            render: ( text, data, index ) => (
                <span style={{ fontSize: 10, display: 'flex', }}>
                    { ( data.cantidadcomprada.toString().length == 0 ) ?
                        "" : 
                        <label> 
                            {data.cantidadcomprada}
                        </label>
                    }
                </span>
            ),
        },
        { 
            title: <span style={{ fontSize: 11, }}> { 'Costo Unit.' } </span>, 
            dataIndex: 'costounitario', key: 'costounitario', width: 80,
            render: ( text, data, index ) => (
                <span style={{ fontSize: 10, display: 'flex', }}>
                    { ( data.costounitario.toString().length == 0 ) ?
                        "" : 
                        <Popover title={"Costo Unitario"} trigger="click"
                            content={
                                <div>
                                    <C_Input 
                                        style={{ width: 200, marginTop: -10, }}
                                        value={data.costounitario}
                                        onChange={ (value) => {
                                            if ( disabled.data ) return;
                                            if ( value == "" ) value = 0;
                                            if ( !isNaN( value ) ) {
                                                if ( Functions.esDecimal( value, 2 ) ) {
                                                    data.costounitario = Functions.onChangeNumberDecimal(value);
                                                    data.costosubtotal = parseFloat( data.cantidad * data.costounitario ).toFixed(2);
                                                    updateTotales();
                                                    onChangeDetalle( detalle );
                                                }
                                            };
                                        } }
                                        suffix={
                                            <i className="fa fa-plus icon-table-horus"
                                                onClick={ () => {
                                                    if ( disabled.data ) return;
                                                    data.costounitario = Functions.onIncrementarNumberDecimal(data.costounitario);
                                                    data.costosubtotal = parseFloat( data.cantidad * data.costounitario ).toFixed(2);
                                                    updateTotales();
                                                    onChangeDetalle(detalle);
                                                } }
                                            ></i>
                                        }
                                        prefix={
                                            <i className="fa fa-minus icon-table-horus"
                                                onClick={ () => {
                                                    if ( disabled.data ) return;
                                                    data.costounitario = Functions.onDecrementarNumberDecimal(data.costounitario);
                                                    data.costosubtotal = parseFloat( data.cantidad * data.costounitario ).toFixed(2);
                                                    updateTotales();
                                                    onChangeDetalle(detalle);
                                                } }
                                            ></i>
                                        }
                                    />
                                </div>
                            }
                        >
                            <label style={{ color: '#387DFF', cursor: 'pointer', borderBottom: '1px dashed #387DFF', }}> 
                                {data.costounitario}
                            </label>
                        </Popover>
                    }
                </span>
            ),
        },
        { 
            title: <span style={{ fontSize: 11, }}> { 'Costo subtotal' } </span>, 
            dataIndex: 'costosubtotal', key: 'costosubtotal', width: 90,
            render: ( text, data, index ) => (
                <span style={{ fontSize: 10, display: 'flex', }}>
                    { ( data.costosubtotal.toString().length == 0 ) ?
                        "" : 
                        <label> 
                            {data.costosubtotal}
                        </label>
                    }
                </span>
            ),
        },
        { 
            title: <span style={{ fontSize: 11, }}> { 'Peso' } </span>, 
            dataIndex: 'peso', key: 'peso', width: 60,
            render: ( text, data, index ) => (
                <span style={{ fontSize: 10, display: 'flex', }}>
                    { ( data.peso.toString().length == 0 ) ?
                        "" : 
                        <label> 
                            {data.peso}
                        </label>
                    }
                </span>
            ),
        },
        { 
            title: <span style={{ fontSize: 11, }}> { 'T. Peso' } </span>, 
            dataIndex: 'pesosubtotal', key: 'pesosubtotal', width: 60,
            render: ( text, data, index ) => (
                <span style={{ fontSize: 10, display: 'flex', }}>
                    { ( data.pesosubtotal.toString().length == 0 ) ?
                        "" : 
                        <label> 
                            {data.pesosubtotal}
                        </label>
                    }
                </span>
            ),
        },
        { 
            title: <span style={{ fontSize: 11, }}> { 'Volumen' } </span>, 
            dataIndex: 'volumen', key: 'volumen', width: 60,
            render: ( text, data, index ) => (
                <span style={{ fontSize: 10, display: 'flex', }}>
                    { ( data.volumen.toString().length == 0 ) ?
                        "" : 
                        <label> 
                            {data.volumen}
                        </label>
                    }
                </span>
            ),
        },
        { 
            title: <span style={{ fontSize: 11, }}> { 'T. Volumen' } </span>, 
            dataIndex: 'volumensubtotal', key: 'volumensubtotal', width: 70,
            render: ( text, data, index ) => (
                <span style={{ fontSize: 10, display: 'flex', }}>
                    { ( data.volumensubtotal.toString().length == 0 ) ?
                        "" : 
                        <label> 
                            {data.volumensubtotal}
                        </label>
                    }
                </span>
            ),
        },
        { 
            title: <span style={{ fontSize: 11, }}> { 'Nro. Lote' } </span>, 
            dataIndex: 'nrolote', key: 'nrolote', width: 80,
            render: ( text, data, index ) => (
                <span style={{ fontSize: 10, display: 'flex', }}>
                    { ( parseFloat(data.nrolote) == 0 ) ?
                        "" : 
                        <label> 
                            { parseFloat(data.nrolote).toFixed(2) }
                        </label>
                    }
                </span>
            ),
        },
        { 
            title: <span style={{ fontSize: 11, }}> { 'Nro. Fab.' } </span>, 
            dataIndex: 'nrofabrica', key: 'nrofabrica', width: 80,
            render: ( text, data, index ) => (
                <span style={{ fontSize: 10, display: 'flex', }}>
                    { ( parseFloat(data.nrofabrica) == 0 ) ?
                        "" : 
                        <label> 
                            { parseFloat(data.nrofabrica).toFixed(2) }
                        </label>
                    }
                </span>
            ),
        },
        { 
            title: <span style={{ fontSize: 11, }}> { 'Marca' } </span>, 
            dataIndex: 'productomarca', key: 'productomarca', width: 90,
            render: ( text, data, index ) => (
                <span style={{ fontSize: 10, display: 'flex', }}>
                    { ( data.productomarca.toString().length == 0 ) ?
                        "" : 
                        <label> 
                            {data.productomarca}
                        </label>
                    }
                </span>
            ),
        },
        { 
            title: <span style={{ fontSize: 11, }}> { 'Vcmto.' } </span>, 
            dataIndex: 'fvencimiento', key: 'fvencimiento', width: 60,
            render: ( text, data, index ) => (
                <span style={{ fontSize: 10, display: 'flex', }}>
                    { ( data.fvencimiento.toString().length == 0 ) ?
                        "__/__/__" : 
                        <label> 
                            {data.fvencimiento}
                        </label>
                    }
                </span>
            ),
        },
        { 
            title: <span style={{ fontSize: 11, }}> { 'Nota' } </span>,
            dataIndex: 'nota', key: 'nota', width: 180,
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
            title: <span style={{ fontSize: 11, }}> 
                { 'OP' }
            </span>,
            key: 'accion',
            fixed: 'right',
            width: 50,
            render: ( text, data, index ) => (
                <Popconfirm title={"Estas seguro de quitar la fila?"}
                    onConfirm={ () => {
                        if ( disabled.data ) return;
                        onDeleteRowDetalle(index);
                    } }
                >
                    <Tooltip title="ELIMINAR" placement="left" color={'#2db7f5'}>
                        <DeleteOutlined className="icon-table-horus" 
                            // onClick={ () => {
                            //     if ( disabled.data ) return;
                            //     onDeleteRowDetalle(index);
                            // } }
                        />
                    </Tooltip>
                </Popconfirm>
            ),
        },
    ] ); 
};