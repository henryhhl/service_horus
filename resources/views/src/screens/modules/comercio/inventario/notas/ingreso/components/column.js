
import React from 'react';

import { Popover, Tooltip } from "antd";
import { DeleteOutlined, FileSearchOutlined, PlusOutlined, StopOutlined } from "@ant-design/icons";

import { C_Confirm, C_Date, C_Input } from '../../../../../../../components';
import { Functions } from '../../../../../../../utils/functions';

export const columns = ( notaIngreso, disabled, onVisibleProducto = () => {}, onChangeDetalle = () => {} ) => {

    function updateTotales() {
        let cantidadtotal = 0;
        let montototal = 0;
        let nrocajastotal = 0;
        let pesototal = 0;
        let volumentotal = 0;
        notaIngreso.arrayNotaIngresoDetalle.map( (item) => {
            if ( item.fkidproducto !== null ) {
                cantidadtotal += parseInt(item.cantidad);
                montototal += parseFloat(item.costosubtotal);
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
            fkidproducto: null,
            unidadmedida: "",

            fkidciudadorigen: null,
            ciudadorigen: "",

            fkidproductomarca: null,
            productomarca: "",

            fkidproductotipo: null,
            productotipo: "",

            fkidsucursal: notaIngreso.fkidsucursal,
            sucursal: notaIngreso.sucursal,

            fkidalmacen: notaIngreso.fkidalmacen,
            almacen: notaIngreso.almacen,

            stockactualanterior: "",
            cantidad: "",
            nrocajas: "",

            descuento: "",
            montodescuento: "",

            costobase: "",
            costounitario: "",
            costosubtotal: "",
            costopromedio: "",

            peso: "",
            pesosubtotal: "",

            volumen: "",
            volumensubtotal: "",

            fechavencimiento: null,
            fvencimiento: null,
            nota: null,

            nrolote: "",
            nrofabrica: "",

            fkidnotaingreso: null,
            idnotaingresodetalle: null,
            fkidalmacenproductodetalle: null,

            visible_producto: false,
            visible_sucursal: false,
            visible_almacen: false,
            errorcantidad: false,
            errorcostounitario: false,
        };
        notaIngreso.arrayNotaIngresoDetalle = [ ...notaIngreso.arrayNotaIngresoDetalle, element ];
        onChangeDetalle( notaIngreso );
    };

    function onDeleteRowDetalle( data, index ) {
        notaIngreso.arrayNotaIngresoDetalle = notaIngreso.arrayNotaIngresoDetalle.filter( (item, key) => key !== index );

        for (let index = 0; index < notaIngreso.arrayNotaIngresoDetalle.length; index++) {
            let element = notaIngreso.arrayNotaIngresoDetalle[index];
            element.key = index;
        }

        if ( data.idnotaingresodetalle != null ) {
            notaIngreso.arrayDeleteNotaIngresoDetalle = [ ...notaIngreso.arrayDeleteNotaIngresoDetalle, data.idnotaingresodetalle ];
        }

        updateTotales();
        onChangeDetalle( notaIngreso );
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
                    <label style={{ cursor: 'pointer', }} > 
                        { parseInt( index ) + 1 }
                    </label>
                </span>
            ),
        },
        {
            title: <span style={{ fontSize: 11, }}> { 'Código' } </span>,
            width: 90,
            dataIndex: 'codigo',
            key: 'codigo',
            fixed: 'left',
            render: ( text, data, index ) => (
                disabled.data ? 
                <span style={{ fontSize: 10, display: 'flex', }}>
                    <label style={{ cursor: 'pointer', }}> 
                        { data.codigo != null && data.codigo }
                    </label>
                </span> : 
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
            key: 'producto', width: 140,
            render: ( text, data, index ) => (
                disabled.data ?
                <span style={{ fontSize: 10, display: 'flex', }}>
                    <label style={{ cursor: 'pointer', }}> 
                        { data.producto != null && <> <span style={{ color: 'black', }}> {data.unidadmedida} </span> { data.producto }  </> }
                    </label>
                </span> : 
                <span style={{ fontSize: 10, display: 'flex', }}>
                    <FileSearchOutlined 
                        className="icon-table-horus" style={{ padding: 2, marginRight: 2, height: 16, }}
                        onClick={ () => ( !disabled.data ) && onVisibleProducto(data, index) }
                    />
                    <label style={{ color: '#387DFF', cursor: 'pointer', borderBottom: '1px dashed #387DFF', }}
                        onClick={ () => ( !disabled.data ) && onVisibleProducto(data, index) }
                    > 
                        { ( data.producto == null || data.producto == "" ) ?
                            "SELECCIONAR" : <> <span style={{ color: 'black', }}> {data.unidadmedida} </span> { data.producto }  </>
                        }
                    </label>
                </span>
            ),
        },
        { 
            title: <span style={{ fontSize: 11, }}> { 'Stock' } </span>, 
            dataIndex: 'stockactualanterior', key: 'stockactualanterior', width: 50,
            render: ( text, data, index ) => (
                <span style={{ fontSize: 10, display: 'flex', }}>
                    { ( typeof parseFloat(data.stockactualanterior) != "number" ) ?
                        "" : 
                        <label> 
                            {data.stockactualanterior}
                        </label>
                    }
                </span>
            ),
        },
        { 
            title: <span style={{ fontSize: 11, }}> { 'Cantidad' } </span>, 
            dataIndex: 'cantidad', key: 'cantidad', width: 60,
            render: ( text, data, index ) => (
                <span style={{ fontSize: 10, display: 'flex', }}>
                    { ( typeof parseInt(data.cantidad) != "number" ) ?
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
                                                onChangeDetalle(notaIngreso);
                                            }
                                        } }
                                        suffix={
                                            <i className="fa fa-plus icon-table-horus"
                                                onClick={ () => {
                                                    if ( disabled.data ) return;
                                                    data.cantidad = parseInt(data.cantidad) + 1;
                                                    data.costosubtotal = parseFloat( data.cantidad * data.costounitario ).toFixed(2);
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
                                                        data.costosubtotal = parseFloat( data.cantidad * data.costounitario ).toFixed(2);
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
            title: <span style={{ fontSize: 11, }}> { 'Costo Base' } </span>, 
            dataIndex: 'costobase', key: 'costobase', width: 80,
            render: ( text, data, index ) => (
                <span style={{ fontSize: 10, display: 'flex', }}>
                    { ( typeof parseFloat(data.costobase) != "number" ) ?
                        "" : 
                        <label> 
                            {data.costobase}
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
                    { ( typeof parseFloat(data.costounitario) != "number" ) ?
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
                                                    onChangeDetalle( notaIngreso );
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
                                                    onChangeDetalle(notaIngreso);
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
            dataIndex: 'costosubtotal', key: 'costosubtotal', width: 90,
            render: ( text, data, index ) => (
                <span style={{ fontSize: 10, display: 'flex', }}>
                    { ( typeof parseFloat(data.costosubtotal) != "number" ) ?
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
            dataIndex: 'sucursal', key: 'sucursal', width: 90,
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
            dataIndex: 'almacen', key: 'almacen', width: 80,
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
            title: <span style={{ fontSize: 11, }}> { 'Marca' } </span>, 
            dataIndex: 'productomarca', key: 'productomarca', width: 70,
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
            dataIndex: 'ciudadorigen', key: 'ciudadorigen', width: 70,
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
            title: <span style={{ fontSize: 11, }}> { 'Nro. Cajas' } </span>, 
            dataIndex: 'nrocajas', key: 'nrocajas', width: 70,
            render: ( text, data, index ) => (
                <span style={{ fontSize: 10, display: 'flex', }}>
                    { ( typeof parseFloat(data.nrocajas) != "number" ) ?
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
                    { ( typeof parseFloat(data.peso) != "number" ) ?
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
                    { ( typeof parseFloat(data.pesosubtotal) != "number" ) ?
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
                    { ( typeof parseFloat(data.volumen) != "number" ) ?
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
                    { ( typeof parseFloat(data.volumensubtotal) != "number" ) ?
                        "" : 
                        <label> 
                            {data.volumensubtotal}
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
                    { ( typeof parseFloat(data.nrolote) != "number" ) ?
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
                    { ( typeof parseFloat(data.nrofabrica) != "number" ) ?
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
            title: <span style={{ fontSize: 11, }}> { 'Nota' } </span>,
            dataIndex: 'nota', key: 'nota', width: 150,
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