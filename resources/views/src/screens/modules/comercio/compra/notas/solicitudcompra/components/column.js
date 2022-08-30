
import React from 'react';

import { Popconfirm, Popover, Tooltip } from "antd";
import { DeleteOutlined, ExclamationOutlined, FileSearchOutlined, PlusOutlined, StopOutlined } from "@ant-design/icons";

import { C_Confirm, C_Date, C_Input } from '../../../../../../../components';
import { Functions } from '../../../../../../../utils/functions';

export const columns = ( detalle, disabled = { data: false, }, onChangeDetalle = () => {}, onVisibleProducto = () => {} ) => {

    function updateTotales() {
        let cantidadsolicitadatotal = 0;
        let montototal = 0;
        detalle.arraySolicitudCompraDetalle.map( (item) => {
            if ( item.fkidproducto !== null ) {
                cantidadsolicitadatotal += parseInt(item.cantidadsolicitada);
                montototal += parseFloat(item.costosubtotal);
            }
        } );
        detalle.cantidadsolicitadatotal = parseInt(cantidadsolicitadatotal);
        detalle.montototal = parseFloat(montototal).toFixed(2);
    };

    function onAddRowDetalle() {
        const element = {
            key: detalle.arraySolicitudCompraDetalle.length,

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

            fkidsucursal: detalle.fkidsucursal,
            sucursal: detalle.sucursal,

            fkidalmacen: detalle.fkidalmacen,
            almacen: detalle.almacen,

            fkidproveedor: detalle.fkidproveedor,
            proveedor: detalle.proveedor,

            fkidseccioninventario: detalle.fkidseccioninventario,
            seccioninventario: detalle.seccioninventario,

            stockactual: "",
            cantidadpendiente: "",
            cantidadsolicitada: "",

            costobase: "",
            costounitario: "",
            costosubtotal: "",

            fechafinalizada: null,
            ffinalizada: null,

            fechasolicitada: null,
            fsolicitada: null,
            
            nota: null,
            isordencompra: "N",

            idsolicitudcompradetalle: null,
            visible_producto: false,
            errorcantidad: false,
            errorcostounitario: false,
        };
        detalle.arraySolicitudCompraDetalle = [ ...detalle.arraySolicitudCompraDetalle, element ];
        onChangeDetalle( detalle );
    };

    function onDeleteRowDetalle( data, index ) {
        detalle.arraySolicitudCompraDetalle = detalle.arraySolicitudCompraDetalle.filter( (item, key) => key !== index );

        for (let index = 0; index < detalle.arraySolicitudCompraDetalle.length; index++) {
            let element = detalle.arraySolicitudCompraDetalle[index];
            element.key = index;
        }

        if ( data.idsolicitudcompradetalle != null ) {
            detalle.arrayDeleteSolicitudCompraDetalle = [ ...detalle.arrayDeleteSolicitudCompraDetalle, data.idsolicitudcompradetalle ];
        }

        updateTotales();
        onChangeDetalle( detalle );
    };

    return ( [
        {
            title: <span style={{ fontSize: 11, }}> { 'Nro.' } </span>,
            width: 20,
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
            width: 60,
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
            key: 'producto', width: 80,
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
            width: 25,
            dataIndex: 'stockactual',
            key: 'stockactual',
            render: ( text, data, index ) => (
                <span style={{ fontSize: 10, display: 'flex', }}>
                    <label> 
                        { data.stockactual }
                    </label>
                </span>
            ),
        },
        { 
            title: <span style={{ fontSize: 11, }}> { 'Cantidad' } </span>, 
            dataIndex: 'cantidadsolicitada', key: 'cantidadsolicitada', width: 25,
            render: ( text, data, index ) => (
                <span style={{ fontSize: 10, display: 'flex', }}>
                    { ( typeof data.cantidadsolicitada != "number" ) ?
                        "" : 
                        disabled.data ?
                        <label style={{ cursor: 'pointer', }}> 
                            {data.cantidadsolicitada}
                        </label> : 
                        <Popover title={"Cantidad"} trigger="click"
                            content={
                                <div>
                                    <C_Input 
                                        style={{ width: 120, marginTop: -10, }}
                                        value={data.cantidadsolicitada}
                                        onChange={ (value) => {
                                            if ( disabled.data ) return;
                                            if ( value == "" ) value = 0;
                                            if ( !isNaN( value ) ) {
                                                data.error = false;
                                                data.cantidadsolicitada = parseInt(value);
                                                data.costosubtotal = parseFloat( data.cantidadsolicitada * data.costounitario ).toFixed(2);
                                                updateTotales();
                                                onChangeDetalle(detalle);
                                            }
                                        } }
                                        suffix={
                                            <i className="fa fa-plus icon-table-horus"
                                                onClick={ () => {
                                                    if ( disabled.data ) return;
                                                    data.error = false;
                                                    data.cantidadsolicitada = parseInt(data.cantidadsolicitada) + 1;
                                                    data.costosubtotal = parseFloat( data.cantidadsolicitada * data.costounitario ).toFixed(2);
                                                    updateTotales();
                                                    onChangeDetalle(detalle);
                                                } }
                                            ></i>
                                        }
                                        prefix={
                                            <i className="fa fa-minus icon-table-horus"
                                                onClick={ () => {
                                                    if ( disabled.data ) return;
                                                    if ( parseInt( data.cantidadsolicitada ) > 0 ) {
                                                        data.error = false;
                                                        data.cantidadsolicitada = parseInt(data.cantidadsolicitada) - 1;
                                                        data.costosubtotal = parseFloat( data.cantidadsolicitada * data.costounitario ).toFixed(2);
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
                                {data.cantidadsolicitada} { data.errorcantidad === true && 
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
            width: 40,
            dataIndex: 'costobase',
            key: 'costobase',
            render: ( text, data, index ) => (
                <span style={{ fontSize: 10, display: 'flex', }}>
                    <label> 
                        { data.costobase }
                    </label>
                </span>
            ),
        },
        { 
            title: <span style={{ fontSize: 11, }}> { 'Costo Unit.' } </span>, 
            dataIndex: 'costounitario', key: 'costounitario', width: 40,
            render: ( text, data, index ) => (
                <span style={{ fontSize: 10, display: 'flex', }}>
                    { ( data.costounitario.toString().length == 0 ) ?
                        "" : 
                        disabled.data ? 
                        <label style={{ cursor: 'pointer', }}> 
                            {data.costounitario}
                        </label> : 
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
                                                    data.costosubtotal = parseFloat( data.cantidadsolicitada * data.costounitario ).toFixed(2);
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
                                                    data.costosubtotal = parseFloat( data.cantidadsolicitada * data.costounitario ).toFixed(2);
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
                                                    data.costosubtotal = parseFloat( data.cantidadsolicitada * data.costounitario ).toFixed(2);
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
                                {data.costounitario} { data.errorcostounitario === true && 
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
            title: <span style={{ fontSize: 11, }}> { 'Costo Total' } </span>, 
            dataIndex: 'costosubtotal', key: 'costosubtotal', width: 45,
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
            title: <span style={{ fontSize: 11, }}> { 'Sección Inv.' } </span>, 
            dataIndex: 'seccioninventario', key: 'seccioninventario', width: 60,
            render: ( text, data, index ) => (
                <span style={{ fontSize: 10, display: 'flex', }}>
                    { ( data.seccioninventario == null ) ?
                        "" : 
                        <label> 
                            {data.seccioninventario}
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
            title: <span style={{ fontSize: 11, }}> { 'Nota' } </span>,
            dataIndex: 'nota', key: 'nota', width: 150,
            render: ( text, data, index ) => (
                <span style={{ fontSize: 10, display: 'flex', }}>
                    { disabled.data ?
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
            width: 30,
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