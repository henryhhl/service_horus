
import React from 'react';

import { Popconfirm, Popover, Tooltip } from "antd";
import { DeleteOutlined, ExclamationOutlined, FileSearchOutlined, PlusOutlined } from "@ant-design/icons";

import { C_Date, C_Input } from '../../../../../../../components';
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
            ciudadorigen: "",

            fkidunidadmedidaproducto: null,
            unidadmedidaproducto: "",

            stockactual: "",
            cantidadsolicitada: "",
            costounitario: "",
            costosubtotal: "",
            productomarca: "",

            fechasolicitada: null,
            fsolicitada: null,
            
            nota: null,

            visible_producto: false,
            fkidproducto: null,
            idsolicitudcompradetalle: null,
            error: false,
        };
        detalle.arraySolicitudCompraDetalle = [ ...detalle.arraySolicitudCompraDetalle, element ];
        onChangeDetalle( detalle );
    };

    function onDeleteRowDetalle( index ) {
        detalle.arraySolicitudCompraDetalle = detalle.arraySolicitudCompraDetalle.filter( (item, key) => key !== index );
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
                    <label style={{ color: '#387DFF', cursor: 'pointer', }} > 
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
            width: 50,
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
            width: 55,
            dataIndex: 'unidadmedidaproducto',
            key: 'unidadmedidaproducto',
            render: ( text, data, index ) => (
                <span style={{ fontSize: 10, display: 'flex', }}>
                    { ( data.unidadmedidaproducto.toString().length == 0 ) ? "" :
                        <label> 
                            { data.unidadmedidaproducto }
                        </label>
                    }
                </span>
            ),
        },
        { 
            title: <span style={{ fontSize: 11, }}> { 'Cant.' } </span>, 
            dataIndex: 'cantidadsolicitada', key: 'cantidadsolicitada', width: 50,
            render: ( text, data, index ) => (
                <span style={{ fontSize: 10, display: 'flex', }}>
                    { ( data.cantidadsolicitada.toString().length == 0 ) ?
                        "" : 
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
                                {data.cantidadsolicitada} { data.error === true && 
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
            title: <span style={{ fontSize: 11, }}> { 'Stock' } </span>,
            width: 40,
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
            title: <span style={{ fontSize: 11, }}> { 'Costo Unit.' } </span>, 
            dataIndex: 'costounitario', key: 'costounitario', width: 50,
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
                                {data.costounitario}
                            </label>
                        </Popover>
                    }
                </span>
            ),
        },
        { 
            title: <span style={{ fontSize: 11, }}> { 'Costo Total' } </span>, 
            dataIndex: 'costosubtotal', key: 'costosubtotal', width: 60,
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
            title: <span style={{ fontSize: 11, }}> { 'Marca' } </span>, 
            dataIndex: 'productomarca', key: 'productomarca', width: 80,
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
        // { 
        //     title: <span style={{ fontSize: 11, }}> { 'Fecha Sol.' } </span>, 
        //     dataIndex: 'fsolicitada', key: 'fsolicitada', width: 60,
        //     render: ( text, data, index ) => (
        //         <span style={{ fontSize: 10, display: 'flex', }}>
        //             <Popover title={"Fecha Solicitada"} trigger="click"
        //                 content={
        //                     <div style={{ width: 200, }}>
        //                         <C_Date
        //                             style={{ marginTop: -15, marginBottom: 10, }}
        //                             value={data.fsolicitada}
        //                             onChange={ (value) => {
        //                                 if ( disabled.data ) return;
        //                                 data.fsolicitada = value;
        //                                 data.fechasolicitada = Functions.convertDMYToYMD(value);
        //                                 onChangeDetalle( detalle );
        //                             } }
        //                         />
        //                     </div>
        //                 }
        //             >
        //                 <label style={{ color: '#387DFF', cursor: 'pointer', borderBottom: '1px dashed #387DFF', }}> 
        //                     { data.fsolicitada ? data.fsolicitada : "__/__/__" }
        //                 </label>
        //             </Popover>
        //         </span>
        //     ),
        // },
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
            render: ( text, data, index ) => (
                <Popconfirm title={"Estas seguro de quitar la fila?"}
                    onConfirm={ () => {
                        if ( disabled.data ) return;
                        onDeleteRowDetalle(index);
                    } }
                >
                    <Tooltip title="ELIMINAR" placement="top" color={'#2db7f5'}>
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