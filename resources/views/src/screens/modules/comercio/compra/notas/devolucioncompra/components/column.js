
import React from 'react';

import { Popconfirm, Popover, Tooltip } from "antd";
import { DeleteOutlined, ExclamationOutlined, FileSearchOutlined, StopOutlined } from "@ant-design/icons";

import { C_Confirm, C_Input } from '../../../../../../../components';
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

    function onDeleteRowDetalle( data, index ) {
        detalle.arrayDevolucionCompraDetalle = detalle.arrayDevolucionCompraDetalle.filter( (item, key) => key !== index );

        for (let index = 0; index < detalle.arrayDevolucionCompraDetalle.length; index++) {
            let element = detalle.arrayDevolucionCompraDetalle[index];
            element.key = index;
        }

        if ( data.iddevolucioncompradetalle != null ) {
            detalle.arrayDeleteDevolucionCompraDetalle = [ ...detalle.arrayDeleteDevolucionCompraDetalle, data.iddevolucioncompradetalle ];
        }

        updateTotales();
        onChangeDetalle( detalle );
    };

    return ( [
        {
            title: <span style={{ fontSize: 11, }}> { 'Nro.' } </span>,
            width: 30,
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
                        { ( data.producto != null ) && <> <span style={{ color: 'black', }}> {data.unidadmedida} </span> { data.producto }  </> }
                    </label>
                </span>
            ),
        },
        { 
            title: <span style={{ fontSize: 11, }}> { 'Cant. comp.' } </span>, 
            dataIndex: 'cantidadcomprada', key: 'cantidadcomprada', width: 70,
            render: ( text, data, index ) => (
                <span style={{ fontSize: 10, display: 'flex', }}>
                    { ( data.cantidadcomprada == null || data.cantidadcomprada == "" ) ?
                        "" : 
                        <label> 
                            {data.cantidadcomprada}
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
                    { ( typeof data.cantidad != "number" ) ?
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
                                                data.errorcantidad = false;
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
                                                    data.errorcantidad = false;
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
                                                        data.errorcantidad = false;
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
                                {data.cantidad} { data.errorcantidad === true && 
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
            title: <span style={{ fontSize: 11, }}> { 'Costo Base' } </span>,
            width: 50,
            dataIndex: 'costobase',
            key: 'costobase',
            render: ( text, data, index ) => (
                <span style={{ fontSize: 10, display: 'flex', }}>
                    <label> 
                        { ( data.costobase == null || data.costobase == "") ? "" : data.costobase }
                    </label>
                </span>
            ),
        },
        { 
            title: <span style={{ fontSize: 11, }}> { 'Costo Unit.' } </span>, 
            dataIndex: 'costounitario', key: 'costounitario', width: 80,
            render: ( text, data, index ) => (
                <span style={{ fontSize: 10, display: 'flex', }}>
                    { ( data.costounitario == "" || data.costounitario == null ) ?
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
                    { ( data.costosubtotal == null || data.costosubtotal == "" ) ?
                        "" : 
                        <label> 
                            {data.costosubtotal}
                        </label>
                    }
                </span>
            ),
        },
        { 
            title: <span style={{ fontSize: 11, }}> { 'Sucursal' } </span>, 
            dataIndex: 'sucursal', key: 'sucursal', width: 60,
            render: ( text, data, index ) => (
                <span style={{ fontSize: 10, display: 'flex', }}>
                    { ( data.sucursal == null ) ?
                        "" : 
                        <label> 
                            {data.sucursal}
                        </label>
                    }
                </span>
            ),
        },
        { 
            title: <span style={{ fontSize: 11, }}> { 'Álmacen' } </span>, 
            dataIndex: 'almacen', key: 'almacen', width: 60,
            render: ( text, data, index ) => (
                <span style={{ fontSize: 10, display: 'flex', }}>
                    { ( data.almacen == null ) ?
                        "" : 
                        <label> 
                            {data.almacen}
                        </label>
                    }
                </span>
            ),
        },
        { 
            title: <span style={{ fontSize: 11, }}> { 'Proveedor' } </span>, 
            dataIndex: 'proveedor', key: 'proveedor', width: 80,
            render: ( text, data, index ) => (
                <span style={{ fontSize: 10, display: 'flex', }}>
                    { ( data.proveedor == null ) ?
                        "" : 
                        <label> 
                            {data.proveedor}
                        </label>
                    }
                </span>
            ),
        },
        { 
            title: <span style={{ fontSize: 11, }}> { 'Marca' } </span>, 
            dataIndex: 'productomarca', key: 'productomarca', width: 60,
            render: ( text, data, index ) => (
                <span style={{ fontSize: 10, display: 'flex', }}>
                    { ( data.productomarca == null ) ?
                        "" : 
                        <label> 
                            {data.productomarca}
                        </label>
                    }
                </span>
            ),
        },
        { 
            title: <span style={{ fontSize: 11, }}> { 'Origen' } </span>, 
            dataIndex: 'ciudadorigen', key: 'ciudadorigen', width: 60,
            render: ( text, data, index ) => (
                <span style={{ fontSize: 10, display: 'flex', }}>
                    { ( data.ciudadorigen == null ) ?
                        "" : 
                        <label> 
                            {data.ciudadorigen}
                        </label>
                    }
                </span>
            ),
        },
        { 
            title: <span style={{ fontSize: 11, }}> { 'Tipo' } </span>, 
            dataIndex: 'productotipo', key: 'productotipo', width: 60,
            render: ( text, data, index ) => (
                <span style={{ fontSize: 10, display: 'flex', }}>
                    { ( data.productotipo == null ) ?
                        "" : 
                        <label> 
                            {data.productotipo}
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
                    { ( data.peso == null || data.peso == "" ) ?
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
                    { ( data.pesosubtotal == null || data.pesosubtotal == "" ) ?
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
                    { ( data.volumen == null ) ?
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
                    { ( data.volumensubtotal == null ) ?
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
                    { ( data.nrolote == null ) ?
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
                    { ( data.nrofabrica == null ) ?
                        "" : 
                        <label> 
                            { parseFloat(data.nrofabrica).toFixed(2) }
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
                    { ( data.fvencimiento == null ) ?
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
                            { data.nota == null ? data.nota : "AGREGAR NOTA" }
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
            width: 35,
            render: ( text, data, index ) => !disabled.data ? (
                <Tooltip title="ELIMINAR" placement="top" color={'#2db7f5'}>
                    <DeleteOutlined className="icon-table-horus"
                        onClick={ () => {
                            let onDeleteRowDetalles = () => onDeleteRowDetalle( data, index );
                            C_Confirm( {
                                title: "Quitar Producto", onOk: onDeleteRowDetalles,
                                okType: "primary", content: "Estás seguro de realizar acción.?",
                            } );
                        } }
                    />
                </Tooltip>
            ) : (
                <StopOutlined className="icon-table-horus" style={{ color: 'red', }} /> 
            ),
        },
    ] ); 
};