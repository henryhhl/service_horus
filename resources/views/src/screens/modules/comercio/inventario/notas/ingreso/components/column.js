
import React from 'react';

import { Popover, Tooltip } from "antd";
import { DeleteOutlined, FileSearchOutlined, PlusOutlined } from "@ant-design/icons";

import { C_Date, C_Input } from '../../../../../../../components';
import { Functions } from '../../../../../../../utils/functions';

export const columns = ( onVisibleProducto = () => {}, onVisibleUnidadMedidaProducto = () => {}, onChangeDetalle = () => {}, notaIngreso, disabled ) => {

    function updateTotales() {
        let cantidadtotal = 0;
        let montototal = 0;
        let nrocajastotal = 0;
        let pesototal = 0;
        let volumentotal = 0;
        notaIngreso.arrayNotaIngresoDetalle.map( (item) => {
            if ( item.fkidproducto !== null ) {
                cantidadtotal += parseInt(item.cantidad);
                montototal += parseFloat(item.costototal);
                nrocajastotal += parseFloat(item.nrocajas);
                pesototal += parseFloat(item.pesosubtotal);
                volumentotal += parseFloat(item.volumensubtotal);
            }
        } );
        notaIngreso.cantidadtotal = parseInt(cantidadtotal);
        notaIngreso.montototal = parseFloat(montototal).toFixed(2);
        notaIngreso.nrocajastotal = parseFloat(nrocajastotal).toFixed(2);
        notaIngreso.pesototal = parseFloat(pesototal).toFixed(2);
        notaIngreso.volumentotal = parseFloat(volumentotal).toFixed(2);
    };

    function onAddRowDetalle() {
        const element = {
            key: notaIngreso.arrayNotaIngresoDetalle.length,
            codigo: "",
            producto: "",
            ciudadorigen: "",
            cantidad: "",
            costounitario: "",
            costototal: "",
            nrocajas: "",
            peso: "",
            pesosubtotal: "",
            volumen: "",
            volumensubtotal: "",
            productomarca: "",
            fechavencimiento: null,
            vencimiento: null,
            nrolote: "",
            nrofabrica: "",
            precio: "",
            nota: null,
            unidadmedidaproducto: "",

            visible_producto: false,
            visible_unidadmedida: false,

            array_unidadmedidaproducto: [],
            array_unidadmedida: [],

            fkidproducto: null,
            fkidunidadmedidaproducto: null,
            idnotaingresodetalle: null,
        };
        notaIngreso.arrayNotaIngresoDetalle = [ ...notaIngreso.arrayNotaIngresoDetalle, element ];
        onChangeDetalle( notaIngreso );
    };

    function onDeleteRowDetalle( index ) {
        notaIngreso.arrayNotaIngresoDetalle = notaIngreso.arrayNotaIngresoDetalle.filter( (item, key) => key !== index );
        updateTotales();
        onChangeDetalle( notaIngreso );
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
            width: 120,
            dataIndex: 'codigo',
            key: 'codigo',
            fixed: 'left',
            render: ( text, data, index ) => (
                <span style={{ fontSize: 10, display: 'flex', }}>
                    <FileSearchOutlined 
                        className="icon-table-horus" style={{ padding: 2, marginRight: 2, height: 16, }}
                        onClick={ () => ( !disabled.data ) && onVisibleProducto(data, index) }
                    />
                    <label style={{ color: '#387DFF', cursor: 'pointer', borderBottom: '1px dashed #387DFF', }}
                        onClick={ () => ( !disabled.data ) && onVisibleProducto(data, index) }
                    > 
                        { ( data.codigo == "" || data.codigo == null ) ?
                            "SELECCIONAR" : data.codigo
                        }
                    </label>
                </span>
            ),
        },
        { 
            title: <span style={{ fontSize: 11, }}> { 'Producto' } </span>, 
            dataIndex: 'producto', 
            key: 'producto', width: 180,
            render: ( text, data, index ) => (
                <span style={{ fontSize: 10, display: 'flex', }}>
                    <FileSearchOutlined 
                        className="icon-table-horus" style={{ padding: 2, marginRight: 2, height: 16, }}
                        onClick={ () => ( !disabled.data ) && onVisibleProducto(data, index) }
                    />
                    <label style={{ color: '#387DFF', cursor: 'pointer', borderBottom: '1px dashed #387DFF', }}
                        onClick={ () => ( !disabled.data ) && onVisibleProducto(data, index) }
                    > 
                        { ( data.producto.toString().length == 0 ) ?
                            "SELECCIONAR" : data.producto
                        }
                    </label>
                </span>
            ),
        },
        {
            title: <span style={{ fontSize: 11, }}> { 'Origen' } </span>,
            width: 100,
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
                            onClick={ () => ( !disabled.data ) && onVisibleUnidadMedidaProducto(data, index) }
                        > 
                            { data.unidadmedidaproducto }
                        </label>
                    }
                </span>
            ),
        },
        { 
            title: <span style={{ fontSize: 11, }}> { 'Cantidad' } </span>, 
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
                                                data.costototal = parseFloat( data.cantidad * data.costounitario ).toFixed(2);
                                                data.pesosubtotal = parseFloat( data.cantidad * data.peso ).toFixed(2);
                                                data.volumensubtotal = parseFloat( data.cantidad * data.volumen ).toFixed(2);
                                                updateTotales();
                                                onChangeDetalle(notaIngreso);
                                            }
                                        } }
                                        suffix={
                                            <i className="fa fa-plus icon-table-horus"
                                                onClick={ () => {
                                                    if ( disabled.data ) return;
                                                    data.cantidad = parseInt(data.cantidad) + 1;
                                                    data.costototal = parseFloat( data.cantidad * data.costounitario ).toFixed(2);
                                                    updateTotales();
                                                    onChangeDetalle(notaIngreso);
                                                } }
                                            ></i>
                                        }
                                        prefix={
                                            <i className="fa fa-minus icon-table-horus"
                                                onClick={ () => {
                                                    if ( disabled.data ) return;
                                                    if ( parseInt( data.cantidad ) > 0 ) {
                                                        data.cantidad = parseInt(data.cantidad) - 1;
                                                        data.costototal = parseFloat( data.cantidad * data.costounitario ).toFixed(2);
                                                        updateTotales();
                                                        onChangeDetalle(notaIngreso);
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
            title: <span style={{ fontSize: 11, }}> { 'Costo Unit.' } </span>, 
            dataIndex: 'costounitario', key: 'costounitario', width: 100,
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
                                                    data.costototal = parseFloat( data.cantidad * data.costounitario ).toFixed(2);
                                                    updateTotales();
                                                    onChangeDetalle( notaIngreso );
                                                }
                                            };
                                        } }
                                        suffix={
                                            <i className="fa fa-plus icon-table-horus"
                                                onClick={ () => {
                                                    if ( disabled.data ) return;
                                                    data.costounitario = Functions.onIncrementarNumberDecimal(data.costounitario);
                                                    data.costototal = parseFloat( data.cantidad * data.costounitario ).toFixed(2);
                                                    updateTotales();
                                                    onChangeDetalle(notaIngreso);
                                                } }
                                            ></i>
                                        }
                                        prefix={
                                            <i className="fa fa-minus icon-table-horus"
                                                onClick={ () => {
                                                    if ( disabled.data ) return;
                                                    data.costounitario = Functions.onDecrementarNumberDecimal(data.costounitario);
                                                    data.costototal = parseFloat( data.cantidad * data.costounitario ).toFixed(2);
                                                    updateTotales();
                                                    onChangeDetalle(notaIngreso);
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
            title: <span style={{ fontSize: 11, }}> { 'Costo Total' } </span>, 
            dataIndex: 'costototal', key: 'costototal', width: 120,
            render: ( text, data, index ) => (
                <span style={{ fontSize: 10, display: 'flex', }}>
                    { ( data.costototal.toString().length == 0 ) ?
                        "" : 
                        <label> 
                            {data.costototal}
                        </label>
                    }
                </span>
            ),
        },
        { 
            title: <span style={{ fontSize: 11, }}> { 'Nro. Cajas' } </span>, 
            dataIndex: 'nrocajas', key: 'nrocajas', width: 70,
            render: ( text, data, index ) => (
                <span style={{ fontSize: 10, display: 'flex', }}>
                    { ( data.nrocajas.toString().length == 0 ) ?
                        "" : 
                        <Popover title={"Nro Cajas"} trigger="click"
                            content={
                                <div>
                                    <C_Input 
                                        style={{ width: 120, marginTop: -10, }}
                                        value={data.nrocajas}
                                        onChange={ (value) => {
                                            if ( disabled.data ) return;
                                            if ( value == "" ) value = 0;
                                            if ( !isNaN( value ) ) {
                                                data.nrocajas = parseInt(value);
                                                updateTotales();
                                                onChangeDetalle(notaIngreso);
                                            }
                                        } }
                                        suffix={
                                            <i className="fa fa-plus icon-table-horus"
                                                onClick={ () => {
                                                    if ( disabled.data ) return;
                                                    data.nrocajas = parseInt(data.nrocajas) + 1;
                                                    updateTotales();
                                                    onChangeDetalle(notaIngreso);
                                                } }
                                            ></i>
                                        }
                                        prefix={
                                            <i className="fa fa-minus icon-table-horus"
                                                onClick={ () => {
                                                    if ( disabled.data ) return;
                                                    if ( parseInt( data.nrocajas ) > 0 ) {
                                                        data.nrocajas = parseInt(data.nrocajas) - 1;
                                                        updateTotales();
                                                        onChangeDetalle(notaIngreso);
                                                    }
                                                } }
                                            ></i>
                                        }
                                    />
                                </div>
                            }
                        >
                            <label style={{ color: '#387DFF', cursor: 'pointer', borderBottom: '1px dashed #387DFF', }}> 
                                {data.nrocajas}
                            </label>
                        </Popover>
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
            dataIndex: 'vencimiento', key: 'vencimiento', width: 60,
            render: ( text, data, index ) => (
                <span style={{ fontSize: 10, display: 'flex', }}>
                    <Popover title={"Vcmto"} trigger="click"
                        content={
                            <div style={{ width: 150, }}>
                                <C_Date
                                    style={{ marginTop: -10 }}
                                    value={data.vencimiento}
                                    onChange={ (value) => {
                                        if ( disabled.data ) return;
                                        data.vencimiento = value;
                                        data.fechavencimiento = Functions.convertDMYToYMD(value);
                                        onChangeDetalle( notaIngreso );
                                    } }
                                />
                            </div>
                        }
                    >
                        <label style={{ color: '#387DFF', cursor: 'pointer', borderBottom: '1px dashed #387DFF', }}> 
                            { data.vencimiento ? data.vencimiento : "__/__/__" }
                        </label>
                    </Popover>
                </span>
            ),
        },
        { 
            title: <span style={{ fontSize: 11, }}> { 'Nro. Lote' } </span>, 
            dataIndex: 'nrolote', key: 'nrolote', width: 80,
            render: ( text, data, index ) => (
                <span style={{ fontSize: 10, display: 'flex', }}>
                    { ( data.nrolote.toString().length == 0 ) ?
                        "" : 
                        <Popover title={"Nro. Lote"} trigger="click"
                            content={
                                <div>
                                    <C_Input 
                                        style={{ width: 200, marginTop: -10, }}
                                        value={data.nrolote}
                                        onChange={ (value) => {
                                            if ( disabled.data ) return;
                                            if ( value == "" ) value = 0;
                                            if ( !isNaN( value ) ) {
                                                if ( Functions.esDecimal( value, 2 ) ) {
                                                    data.nrolote = Functions.onChangeNumberDecimal(value);
                                                    onChangeDetalle( notaIngreso );
                                                }
                                            };
                                        } }
                                        suffix={
                                            <i className="fa fa-plus icon-table-horus"
                                                onClick={ () => {
                                                    if ( disabled.data ) return;
                                                    data.nrolote = Functions.onIncrementarNumberDecimal(data.nrolote);
                                                    onChangeDetalle(notaIngreso);
                                                } }
                                            ></i>
                                        }
                                        prefix={
                                            <i className="fa fa-minus icon-table-horus"
                                                onClick={ () => {
                                                    if ( disabled.data ) return;
                                                    data.nrolote = Functions.onDecrementarNumberDecimal(data.nrolote);
                                                    onChangeDetalle(notaIngreso);
                                                } }
                                            ></i>
                                        }
                                    />
                                </div>
                            }
                        >
                            <label style={{ color: '#387DFF', cursor: 'pointer', borderBottom: '1px dashed #387DFF', }}> 
                                {data.nrolote}
                            </label>
                        </Popover>
                    }
                </span>
            ),
        },
        { 
            title: <span style={{ fontSize: 11, }}> { 'Nro. Fab.' } </span>, 
            dataIndex: 'nrofabrica', key: 'nrofabrica', width: 80,
            render: ( text, data, index ) => (
                <span style={{ fontSize: 10, display: 'flex', }}>
                    { ( data.nrofabrica.toString().length == 0 ) ?
                        "" : 
                        <Popover title={"Nro. Fabrica"} trigger="click"
                            content={
                                <div>
                                    <C_Input 
                                        style={{ width: 200, marginTop: -10, }}
                                        value={data.nrofabrica}
                                        onChange={ (value) => {
                                            if ( disabled.data ) return;
                                            if ( value == "" ) value = 0;
                                            if ( !isNaN( value ) ) {
                                                if ( Functions.esDecimal( value, 2 ) ) {
                                                    data.nrofabrica = Functions.onChangeNumberDecimal(value);
                                                    onChangeDetalle( notaIngreso );
                                                }
                                            };
                                        } }
                                        suffix={
                                            <i className="fa fa-plus icon-table-horus"
                                                onClick={ () => {
                                                    if ( disabled.data ) return;
                                                    data.nrofabrica = Functions.onIncrementarNumberDecimal(data.nrofabrica);
                                                    onChangeDetalle(notaIngreso);
                                                } }
                                            ></i>
                                        }
                                        prefix={
                                            <i className="fa fa-minus icon-table-horus"
                                                onClick={ () => {
                                                    if ( disabled.data ) return;
                                                    data.nrofabrica = Functions.onDecrementarNumberDecimal(data.nrofabrica);
                                                    onChangeDetalle(notaIngreso);
                                                } }
                                            ></i>
                                        }
                                    />
                                </div>
                            }
                        >
                            <label style={{ color: '#387DFF', cursor: 'pointer', borderBottom: '1px dashed #387DFF', }}> 
                                {data.nrofabrica}
                            </label>
                        </Popover>
                    }
                </span>
            ),
        },
        { 
            title: <span style={{ fontSize: 11, }}> { 'Precio' } </span>, 
            dataIndex: 'precio', key: 'precio', width: 90,
            render: ( text, data, index ) => (
                <span style={{ fontSize: 10, display: 'flex', }}>
                    { ( data.precio.toString().length == 0 ) ?
                        "" : 
                        <Popover title={"Precio"} trigger="click"
                            content={
                                <div>
                                    <C_Input 
                                        style={{ width: 200, marginTop: -10, }}
                                        value={data.precio}
                                        onChange={ (value) => {
                                            if ( disabled.data ) return;
                                            if ( value == "" ) value = 0;
                                            if ( !isNaN( value ) ) {
                                                if ( Functions.esDecimal( value, 2 ) ) {
                                                    data.precio = Functions.onChangeNumberDecimal(value);
                                                    onChangeDetalle( notaIngreso );
                                                }
                                            };
                                        } }
                                        suffix={
                                            <i className="fa fa-plus icon-table-horus"
                                                onClick={ () => {
                                                    if ( disabled.data ) return;
                                                    data.precio = Functions.onIncrementarNumberDecimal(data.precio);
                                                    onChangeDetalle(notaIngreso);
                                                } }
                                            ></i>
                                        }
                                        prefix={
                                            <i className="fa fa-minus icon-table-horus"
                                                onClick={ () => {
                                                    if ( disabled.data ) return;
                                                    data.precio = Functions.onDecrementarNumberDecimal(data.precio);
                                                    onChangeDetalle(notaIngreso);
                                                } }
                                            ></i>
                                        }
                                    />
                                </div>
                            }
                        >
                            <label style={{ color: '#387DFF', cursor: 'pointer', borderBottom: '1px dashed #387DFF', }}> 
                                {data.precio}
                            </label>
                        </Popover>
                    }
                </span>
            ),
        },
        { 
            title: <span style={{ fontSize: 11, }}> { 'Nota' } </span>,
            dataIndex: 'nota', key: 'nota', width: 200,
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
                                        onChangeDetalle( notaIngreso );
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
            </span>,
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
                                if ( disabled.data ) return;
                                onDeleteRowDetalle(index);
                            } }
                        />
                    </Tooltip>
                // </Popconfirm>
            ),
        },
    ] ); 
};