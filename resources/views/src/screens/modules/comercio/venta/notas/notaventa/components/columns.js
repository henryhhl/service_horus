
import React from 'react';

import { DeleteOutlined, ExclamationOutlined, FileSearchOutlined, PlusOutlined, StopOutlined } from "@ant-design/icons";
import { Popover, Tooltip } from "antd";
import { Functions } from '../../../../../../../utils/functions';
import { C_Confirm, C_Date, C_Input } from '../../../../../../../components';

export const columns = ( detalle, disabled = { data: false, }, onChangeDetalle = () => {}, onShowVisibleProducto = () => {}, onShowVisibleAlmacen = () => {}, onShowVisibleListaPrecio = () => {} ) => {

    function onAddRowDetalle() {
        const element = {
            key: detalle.notaventadetalle.length,
            codigo: "",
            fkidproducto: null,
            fkidalmacenproductodetalle: null,
            producto: "",

            cantidadsolicitada: "",
            cantidad: "",
            unidadmedida: "",

            fkidlistaprecio: detalle.fkidlistaprecio,
            fkidlistapreciodetalle: null,
            listaprecio: detalle.listaprecio,

            preciobase: "",
            preciounitario: "",
            preciosubtotal: "",

            descuento: "",
            montodescuento: "",

            fkidsucursal: detalle.fkidsucursal,
            fkidalmacen: detalle.fkidalmacen,
            almacen: detalle.almacen,

            nrolote: "",
            nrofabrica: "",
            fvencimiento: null,
            fechavencimiento: null,

            fkidproductotipo: null,
            productotipo: "",

            fkidproductomarca: null,
            productomarca: "",

            fkidciudad: null,
            productociudad: "",

            fkidvendedor: null,
            vendedor: "",
            nota: "",

            isdevolucionventa: "N",
            estadoproceso: "F",
            tipoentrega: "L",

            fkidalmacenunidadmedidaproducto: null,
            fkidunidadmedidaproducto: null,
            idnotaventadetalle: null,
            fkidnotaventa: null,
            visible_producto: false,
            visible_almacen: false,
            visible_listaprecio: false,
            errorcantidad: false,
            errorpreciounitario: false,
        };
        detalle.notaventadetalle = [ ...detalle.notaventadetalle, element ];
        onChangeDetalle( detalle );
    };

    function onDeleteRowDetalle( data, index ) {
        detalle.notaventadetalle = detalle.notaventadetalle.filter( (item, key) => key !== index );

        for (let index = 0; index < detalle.notaventadetalle.length; index++) {
            let element = detalle.notaventadetalle[index];
            element.key = index;
        }

        if ( data.idnotaventadetalle != null ) {
            detalle.notaventadetalledelete = [ ...detalle.notaventadetalledelete, data.idnotaventadetalle ];
        }
        updateTotales();
        onChangeDetalle( detalle );
    }

    function updateTotales() {
        let cantidadtotal = 0;
        let montototal = 0;
        detalle.notaventadetalle.map( (item) => {
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
                                disabled.data ?
                                <>
                                    <label style={{ cursor: 'pointer', }}>
                                        { ( !data.codigo ) ?
                                            "" : data.codigo
                                        }
                                    </label>
                                </> : 
                                <>
                                    <FileSearchOutlined
                                        className="icon-table-horus" style={{ padding: 2, marginRight: 2, height: 16, }}
                                        onClick={ () => ( !disabled.data ) && onShowVisibleProducto( data, index ) }
                                    />
                                    <label style={{ color: '#387DFF', cursor: 'pointer', borderBottom: '1px dashed #387DFF', }}
                                        onClick={() => ( !disabled.data ) && onShowVisibleProducto( data, index ) }
                                    >
                                        { ( data.codigo.toString().length == 0 ) ?
                                            "SELECCIONAR" : data.codigo
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
                                disabled.data ?
                                <>
                                    <label style={{ cursor: 'pointer', }}>
                                        {data.unidadmedida} {data.producto}
                                    </label>
                                </> : 
                                <>
                                    <FileSearchOutlined
                                        className="icon-table-horus" style={{ padding: 2, marginRight: 2, height: 16, }}
                                        onClick={ () => ( !disabled.data ) && onShowVisibleProducto(data, index, true) }
                                    />
                                    <label style={{ color: '#387DFF', cursor: 'pointer', borderBottom: '1px dashed #387DFF', }}
                                        onClick={() => ( !disabled.data ) && onShowVisibleProducto(data, index, true) }
                                    >
                                        { ( data.producto.toString().length == 0 ) ?
                                            "SELECCIONAR" : <> <span style={{ color: 'black', }}> {data.unidadmedida} </span> {data.producto} </>
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
            title: <span style={{ fontSize: 11, }}> { 'Solicitado' } </span>,
            dataIndex: 'cantidadsolicitada', key: 'cantidadsolicitada', width: 50,
            render: ( text, data, index ) => (
                <span style={{ fontSize: 10, display: 'flex', }}>
                    { ( data.cantidadsolicitada == null ) ?
                        "" :
                        <label style={{ cursor: 'pointer', }}>
                            {data.cantidadsolicitada}
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
                                                data.preciosubtotal = parseFloat( data.cantidad * data.preciounitario - data.cantidad * data.montodescuento ).toFixed(2);
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
                                                    data.preciosubtotal = parseFloat( data.cantidad * data.preciounitario - data.cantidad * data.montodescuento ).toFixed(2);
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
                                                        data.preciosubtotal = parseFloat( data.cantidad * data.preciounitario - data.cantidad * data.montodescuento ).toFixed(2);
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
            title: <span style={{ fontSize: 11, }}> { 'Precio Base' } </span>,
            dataIndex: 'preciobase', key: 'preciobase', width: 70,
            render: ( text, data, index ) => (
                <span style={{ fontSize: 10, display: 'flex', }}>
                    { ( data.preciobase == null ) ?
                        "" :
                        <label style={{ cursor: 'pointer', }}>
                            {data.preciobase}
                        </label>
                    }
                </span>
            ),
        },
        {
            title: <span style={{ fontSize: 11, }}> { 'Desc(%)' } </span>,
            dataIndex: 'descuento', key: 'descuento', width: 50,
            render: ( text, data, index ) => (
                <span style={{ fontSize: 10, display: 'flex', }}>
                    { ( data.descuento == null ) ?
                        "" :
                        disabled.data ?
                        <label style={{ cursor: 'pointer', }}>
                            {data.descuento}
                        </label> :
                        <Popover title={"Descuento"} trigger="click"
                            content={
                                <div>
                                    <C_Input
                                        style={{ width: 120, marginTop: -10, }}
                                        value={data.descuento}
                                        onChange={ (value) => {
                                            if ( disabled.data ) return;
                                            if ( value == "" ) value = 0;
                                            if ( !isNaN( value ) ) {
                                                if ( parseInt( value ) >= 0 && parseInt( value ) <= 100 ) {
                                                    data.descuento = parseInt(value);
                                                    data.montodescuento = parseFloat( ( data.descuento*1/100 ) * data.preciounitario ).toFixed(2);
                                                    data.preciosubtotal = parseFloat( data.preciounitario*data.cantidad - data.montodescuento*data.cantidad ).toFixed(2);
                                                    updateTotales();
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
                                                        data.montodescuento = parseFloat( ( data.descuento*1/100 ) * data.preciounitario ).toFixed(2);
                                                        data.preciosubtotal = parseFloat( data.preciounitario*data.cantidad - data.montodescuento*data.cantidad ).toFixed(2);
                                                        updateTotales();
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
                                                        data.montodescuento = parseFloat( ( data.descuento*1/100 ) * data.preciounitario ).toFixed(2);
                                                        data.preciosubtotal = parseFloat( data.preciounitario*data.cantidad - data.montodescuento*data.cantidad ).toFixed(2);
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
                                {data.descuento}
                            </label>
                        </Popover>
                    }
                </span>
            ),
        },
        {
            title: <span style={{ fontSize: 11, }}> { 'Mto. Desc.' } </span>,
            dataIndex: 'montodescuento', key: 'montodescuento', width: 55,
            render: ( text, data, index ) => (
                <span style={{ fontSize: 10, display: 'flex', }}>
                    { ( data.montodescuento == null ) ?
                        "" : disabled.data ?
                        <label style={{ cursor: 'pointer', }}>
                            {data.montodescuento}
                        </label> : 
                        <Popover title={"Monto Descuento"} trigger="click"
                            content={
                                <div>
                                    <C_Input
                                        style={{ width: 120, marginTop: -10, }}
                                        value={data.montodescuento}
                                        onChange={ (value) => {
                                            if ( disabled.data ) return;
                                            if ( value == "" ) value = 0;
                                            if ( !isNaN( value ) ) {
                                                if ( parseFloat( value ) <= parseFloat(data.preciounitario)  ) {
                                                    data.montodescuento = Functions.onChangeNumberDecimal(value);
                                                    data.descuento = parseInt( (data.montodescuento / data.preciounitario) * 100 );
                                                    data.preciosubtotal = parseFloat( data.preciounitario*data.cantidad - data.montodescuento*data.cantidad ).toFixed(2);
                                                    updateTotales();
                                                    onChangeDetalle(detalle);
                                                }
                                            }
                                        } }
                                        suffix={
                                            <i className="fa fa-plus icon-table-horus"
                                                onClick={ () => {
                                                    if ( disabled.data ) return;
                                                    data.montodescuento = Functions.onIncrementarNumberDecimal(data.montodescuento);
                                                    if ( parseFloat( data.montodescuento ) <= parseFloat( data.preciounitario ) ) {
                                                        data.descuento = parseInt( (data.montodescuento / data.preciounitario) * 100 );
                                                        data.preciosubtotal = parseFloat( data.preciounitario*data.cantidad - data.montodescuento*data.cantidad ).toFixed(2);
                                                        updateTotales();
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
                                                        data.descuento = parseInt( (data.montodescuento / data.preciounitario) * 100 );
                                                        data.preciosubtotal = parseFloat( data.preciounitario*data.cantidad - data.montodescuento*data.cantidad ).toFixed(2);
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
                                {data.montodescuento}
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
                        "" :  disabled.data ?
                        <label style={{ cursor: 'pointer', }}> 
                            {data.preciounitario} 
                        </label> : 
                        <Popover title={"Precio Unitario"} trigger="click"
                            content={
                                <div>
                                    <C_Input 
                                        style={{ width: 200, marginTop: -10, }}
                                        value={data.preciounitario}
                                        onChange={ (value) => {
                                            if ( disabled.data ) return;
                                            if ( value == "" ) value = 0;
                                            if ( !isNaN( value ) ) {
                                                if ( Functions.esDecimal( value, 2 ) ) {
                                                    data.errorpreciounitario = false;
                                                    data.preciounitario = Functions.onChangeNumberDecimal(value);
                                                    data.montodescuento = parseFloat( ( data.descuento*1/100 ) * data.preciounitario ).toFixed(2);
                                                    data.preciosubtotal = parseFloat( data.cantidad*data.preciounitario - data.montodescuento*data.cantidad ).toFixed(2);
                                                    updateTotales();
                                                    onChangeDetalle( detalle );
                                                }
                                            };
                                        } }
                                        suffix={
                                            <i className="fa fa-plus icon-table-horus"
                                                onClick={ () => {
                                                    if ( disabled.data ) return;
                                                    data.errorpreciounitario = false;
                                                    data.preciounitario = Functions.onIncrementarNumberDecimal(data.preciounitario);
                                                    data.montodescuento = parseFloat( ( data.descuento*1/100 ) * data.preciounitario ).toFixed(2);
                                                    data.preciosubtotal = parseFloat( data.cantidad*data.preciounitario - data.montodescuento*data.cantidad ).toFixed(2);
                                                    updateTotales();
                                                    onChangeDetalle(detalle);
                                                } }
                                            ></i>
                                        }
                                        prefix={
                                            <i className="fa fa-minus icon-table-horus"
                                                onClick={ () => {
                                                    if ( disabled.data ) return;
                                                    data.errorpreciounitario = false;
                                                    data.preciounitario = Functions.onDecrementarNumberDecimal(data.preciounitario);
                                                    data.montodescuento = parseFloat( ( data.descuento*1/100 ) * data.preciounitario ).toFixed(2);
                                                    data.preciosubtotal = parseFloat( data.cantidad*data.preciounitario - data.montodescuento*data.cantidad ).toFixed(2);
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
                                {data.preciounitario} { data.errorpreciounitario === true && 
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
                            disabled.data ? 
                            <label style={{ cursor: 'pointer', }} >
                                <span> {data.listaprecio} </span>
                            </label> : 
                            <label style={{ color: '#387DFF', cursor: 'pointer', borderBottom: '1px dashed #387DFF', }}
                                onClick={ () => ( !disabled.data ) && onShowVisibleListaPrecio( data, index ) }
                            >
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
                        disabled.data ? 
                        <label style={{ cursor: 'pointer', }} >
                            <span> {data.almacen} </span>
                        </label> : 
                        <label style={{ color: '#387DFF', cursor: 'pointer', borderBottom: '1px dashed #387DFF', }}
                            onClick={ () => ( !disabled.data ) && onShowVisibleAlmacen( data, index ) }
                        >
                            <span> {data.almacen} </span>
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
            dataIndex: 'productociudad', key: 'productociudad', width: 60,
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
            title: <span style={{ fontSize: 11, }}> { 'Nro. Lote' } </span>, 
            dataIndex: 'nrolote', key: 'nrolote', width: 50,
            render: ( text, data, index ) => (
                <span style={{ fontSize: 10, display: 'flex', }}>
                    { ( data.nrolote == null ) ?
                        "" : 
                        disabled.data ?
                        <label style={{ cursor: 'pointer', }}> 
                            {data.nrolote}
                        </label> : 
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
                                                    onChangeDetalle( detalle );
                                                }
                                            };
                                        } }
                                        suffix={
                                            <i className="fa fa-plus icon-table-horus"
                                                onClick={ () => {
                                                    if ( disabled.data ) return;
                                                    data.nrolote = Functions.onIncrementarNumberDecimal(data.nrolote);
                                                    onChangeDetalle(detalle);
                                                } }
                                            ></i>
                                        }
                                        prefix={
                                            <i className="fa fa-minus icon-table-horus"
                                                onClick={ () => {
                                                    if ( disabled.data ) return;
                                                    data.nrolote = Functions.onDecrementarNumberDecimal(data.nrolote);
                                                    onChangeDetalle(detalle);
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
            dataIndex: 'nrofabrica', key: 'nrofabrica', width: 50,
            render: ( text, data, index ) => (
                <span style={{ fontSize: 10, display: 'flex', }}>
                    { ( data.nrofabrica == null ) ?
                        "" : 
                        disabled.data ? 
                        <label style={{ cursor: 'pointer', }}> 
                            {data.nrofabrica}
                        </label> : 
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
                                                    onChangeDetalle( detalle );
                                                }
                                            };
                                        } }
                                        suffix={
                                            <i className="fa fa-plus icon-table-horus"
                                                onClick={ () => {
                                                    if ( disabled.data ) return;
                                                    data.nrofabrica = Functions.onIncrementarNumberDecimal(data.nrofabrica);
                                                    onChangeDetalle(detalle);
                                                } }
                                            ></i>
                                        }
                                        prefix={
                                            <i className="fa fa-minus icon-table-horus"
                                                onClick={ () => {
                                                    if ( disabled.data ) return;
                                                    data.nrofabrica = Functions.onDecrementarNumberDecimal(data.nrofabrica);
                                                    onChangeDetalle(detalle);
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
            title: <span style={{ fontSize: 11, }}> { 'F. Vcmto.' } </span>, 
            dataIndex: 'fvencimiento', key: 'fvencimiento', width: 60,
            render: ( text, data, index ) => (
                <span style={{ fontSize: 10, display: 'flex', }}>
                    {   disabled.data ? 
                        <label style={{ cursor: 'pointer', }}> 
                            { data.fvencimiento ? data.fvencimiento : "__/__/__" }
                        </label> : 
                        <Popover title={"Fecha"} trigger="click"
                            content={
                                <div style={{ width: 200, }}>
                                    <C_Date
                                        style={{ marginTop: -15, marginBottom: 10, }}
                                        value={data.fvencimiento}
                                        onChange={ (value) => {
                                            if ( disabled.data ) return;
                                            data.fvencimiento = value;
                                            data.fechavencimiento = Functions.convertDMYToYMD(value);
                                            onChangeDetalle( detalle );
                                        } }
                                    />
                                </div>
                            }
                        >
                            <label style={{ color: '#387DFF', cursor: 'pointer', borderBottom: '1px dashed #387DFF', }}> 
                                { data.fvencimiento ? data.fvencimiento : "__/__/__" }
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
