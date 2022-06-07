
import React from 'react';

import { DeleteOutlined, ExclamationOutlined, StopOutlined } from "@ant-design/icons";
import { Popover, Tooltip } from "antd";
import { C_Confirm, C_Input } from '../../../../../../../components';

export const column = ( detalle, disabled = { data: false, }, onChangeDetalle = () => {} ) => {

    function onDeleteRowDetalle( data, index ) {
        detalle.devolucionnotaventadetalle = detalle.devolucionnotaventadetalle.filter( (item, key) => key !== index );

        for (let index = 0; index < detalle.devolucionnotaventadetalle.length; index++) {
            let element = detalle.devolucionnotaventadetalle[index];
            element.key = index;
        }

        if ( data.iddevolucionnotaventadetalle != null ) {
            detalle.devolucionnotaventadetalledelete = [ ...detalle.devolucionnotaventadetalledelete, data.iddevolucionnotaventadetalle ];
        }
        updateTotales();
        onChangeDetalle( detalle );
    }

    function updateTotales() {
        let cantidadtotal = 0;
        let montototal = 0;
        detalle.devolucionnotaventadetalle.map( (item) => {
            if ( item.fkidproducto !== null ) {
                cantidadtotal += parseInt(item.cantidad);
                montototal    += parseFloat(item.preciosubtotal);
            }
        } );
        detalle.cantidadtotal = parseInt(cantidadtotal);
        detalle.montosubtotal = parseFloat(montototal).toFixed(2);
        let montosubtotal = parseFloat(detalle.montosubtotal);
        let montodescuento = parseFloat(detalle.montodescuento);

        detalle.montototal = parseFloat(montosubtotal - montodescuento ).toFixed(2);
    };

    return ( [
        {
            title: <span style={{ fontSize: 11, }}> { 'Nro.' } </span>,
            width: 30,
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
            width: 80,
            dataIndex: 'codigo',
            key: 'codigo',
            render: ( text, data, index ) => (
                <span style={{ fontSize: 10, display: 'flex', }}>
                    {
                        ( typeof data.fkidalmacen == "number" ) && ( typeof data.fkidlistaprecio == "number" ) &&
                        <>
                            {
                                <>
                                    <label style={{ cursor: 'pointer', }}>
                                        { ( !data.codigo ) ?
                                            "" : data.codigo
                                        }
                                    </label>
                                </> 
                            }
                        </>
                    }
                </span>
            ),
        },
        {
            title: <span style={{ fontSize: 11, }}> { 'Producto' } </span>,
            dataIndex: 'producto',
            key: 'producto', width: 120,
            render: ( text, data, index ) => (
                <span style={{ fontSize: 10, display: 'flex', }}>
                    {
                        ( typeof data.fkidalmacen == "number" ) && ( typeof data.fkidlistaprecio == "number" ) &&
                        <>
                            {
                                <>
                                    <label style={{ cursor: 'pointer', }}>
                                        {data.unidadmedida} {data.producto}
                                    </label>
                                </> 
                            }
                        </>
                    }
                </span>
            ),
        },
        {
            title: <span style={{ fontSize: 11, }}> { 'Cant. Vendida' } </span>,
            dataIndex: 'cantidadvendida', key: 'cantidadvendida', width: 70,
            render: ( text, data, index ) => (
                <span style={{ fontSize: 10, display: 'flex', }}>
                    { ( data.cantidadvendida == null ) ?
                        "" :
                        <label style={{ cursor: 'pointer', }}>
                            {data.cantidadvendida}
                        </label>
                    }
                </span>
            ),
        },
        { 
            title: <span style={{ fontSize: 11, }}> { 'Cantidad' } </span>, 
            dataIndex: 'cantidad', key: 'cantidad', width: 50,
            render: ( text, data, index ) => (
                <span style={{ fontSize: 10, display: 'flex', }}>
                    { ( data.cantidad == null ) ?
                        "" :  disabled.data ? 
                        <label style={{ cursor: 'pointer', }}> 
                            { data.cantidad }
                        </label> :
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
                                                data.preciosubtotal = parseFloat( data.cantidad * data.preciounitario ).toFixed(2);
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
                                                    data.preciosubtotal = parseFloat( data.cantidad * data.preciounitario ).toFixed(2);
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
                                                        data.preciosubtotal = parseFloat( data.cantidad * data.preciounitario ).toFixed(2);
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
            title: <span style={{ fontSize: 11, }}> { 'Precio Unit.' } </span>, 
            dataIndex: 'preciounitario', key: 'preciounitario', width: 65,
            render: ( text, data, index ) => (
                <span style={{ fontSize: 10, display: 'flex', }}>
                    { ( data.preciounitario == null ) ?
                        "" :  
                        <label style={{ cursor: 'pointer', }}> 
                            {data.preciounitario} 
                        </label> 
                    }
                </span>
            ),
        },
        { 
            title: <span style={{ fontSize: 11, }}> { 'SubTotal' } </span>, 
            dataIndex: 'preciosubtotal', key: 'preciosubtotal', width: 70,
            render: ( text, data, index ) => (
                <span style={{ fontSize: 10, display: 'flex', }}>
                    { ( data.preciosubtotal == null ) ?
                        "" : 
                        <label> 
                            {data.preciosubtotal}
                        </label>
                    }
                </span>
            ),
        },
        {
            title: <span style={{ fontSize: 11, }}> { 'Lista Precio' } </span>,
            dataIndex: 'listaprecio',
            key: 'listaprecio', width: 90,
            render: ( text, data, index ) => (
                <span style={{ fontSize: 10, display: 'flex', }}>
                    {
                        ( typeof data.fkidlistaprecio == "number" ) &&
                            <label style={{ cursor: 'pointer', }} >
                                <span> {data.listaprecio} </span>
                            </label> 
                    }
                </span>
            ),
        },
        {
            title: <span style={{ fontSize: 11, }}> { 'Álmacen' } </span>,
            dataIndex: 'almacen',
            key: 'almacen', width: 80,
            render: ( text, data, index ) => (
                <span style={{ fontSize: 10, display: 'flex', }}>
                    {
                        ( typeof data.fkidalmacen == "number" ) &&
                        <label style={{ cursor: 'pointer', }} >
                            <span> {data.almacen} </span>
                        </label> 
                    }
                </span>
            ),
        },
        { 
            title: <span style={{ fontSize: 11, }}> { 'Marca' } </span>, 
            dataIndex: 'productomarca', key: 'productomarca', width: 50,
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
            dataIndex: 'productociudad', key: 'productociudad', width: 50,
            render: ( text, data, index ) => (
                <span style={{ fontSize: 10, display: 'flex', }}>
                    { ( data.productociudad == null ) ?
                        "" : 
                        <label> 
                            {data.productociudad}
                        </label>
                    }
                </span>
            ),
        },
        { 
            title: <span style={{ fontSize: 11, }}> { 'Tipo' } </span>, 
            dataIndex: 'productotipo', key: 'productotipo', width: 50,
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
            title: <span style={{ fontSize: 11, }}> { 'Nro. Lote' } </span>, 
            dataIndex: 'nrolote', key: 'nrolote', width: 50,
            render: ( text, data, index ) => (
                <span style={{ fontSize: 10, display: 'flex', }}>
                    { ( data.nrolote == null ) ?
                        "" : 
                        <label style={{ cursor: 'pointer', }}> 
                            {data.nrolote}
                        </label> 
                    }
                </span>
            ),
        },
        { 
            title: <span style={{ fontSize: 11, }}> { 'Nro. Fab.' } </span>, 
            dataIndex: 'nrofabrica', key: 'nrofabrica', width: 50,
            render: ( text, data, index ) => (
                <span style={{ fontSize: 10, display: 'flex', }}>
                    { ( data.nrofabrica == null ) ?
                        "" : 
                        <label style={{ cursor: 'pointer', }}> 
                            {data.nrofabrica}
                        </label>
                    }
                </span>
            ),
        },
        { 
            title: <span style={{ fontSize: 11, }}> { 'F. Vcmto.' } </span>, 
            dataIndex: 'fvencimiento', key: 'fvencimiento', width: 60,
            render: ( text, data, index ) => (
                <span style={{ fontSize: 10, display: 'flex', }}>
                    <label style={{ cursor: 'pointer', }}> 
                        { data.fvencimiento ? data.fvencimiento : "__/__/__" }
                    </label>
                </span>
            ),
        },
        {
            title: <span style={{ fontSize: 11, }}> { 'Nota' } </span>,
            dataIndex: 'nota', key: 'nota', width: 200,
            render: ( text, data, index ) => (
                <span style={{ fontSize: 10, display: 'flex', }}>
                    {   disabled.data ? 
                        <label style={{ cursor: 'pointer', }}>
                            { data.nota ? data.nota : "" }
                        </label> : 
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
                    }
                </span>
            ),
        },
        {
            title: (
                <span style={{ fontSize: 11, }}>
                    { 'OP' }
                </span>
            ),
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
