
import React from 'react';

import { Popconfirm, Popover, Tooltip } from "antd";
import { DeleteOutlined, ExclamationOutlined, FileSearchOutlined, PlusOutlined, StopOutlined } from "@ant-design/icons";

import { C_Confirm, C_Date, C_Input } from '../../../../../../../components';
import { Functions } from '../../../../../../../utils/functions';

export const columns = ( detalle, disabled = { data: false, }, onChangeDetalle = () => {}, onVisibleProducto = () => {} ) => {

    function updateTotales() {
        let cantidadtotal = 0;
        let montototal = 0;
        let pesototal = 0;
        let volumentotal = 0;
        let nrocajastotal = 0;
        detalle.arrayNotaCompraDetalle.map( (item) => {
            if ( item.fkidproducto !== null ) {
                cantidadtotal += parseInt(item.cantidad);
                montototal += parseFloat(item.costosubtotal);
                pesototal += parseFloat(item.pesosubtotal);
                volumentotal += parseFloat(item.volumensubtotal);
                nrocajastotal += parseFloat(item.nrocajas);
            }
        } );
        detalle.cantidadtotal = parseInt(cantidadtotal);
        detalle.montosubtotal = parseFloat(montototal).toFixed(2);
        detalle.pesototal = parseFloat(pesototal).toFixed(2);
        detalle.volumentotal = parseFloat(volumentotal).toFixed(2);
        detalle.nrocajastotal = parseInt(nrocajastotal);
        let fletes = parseFloat(detalle.fletes);
        let internacion = parseFloat(detalle.internacion);
        let otrosgastos = parseFloat(detalle.otrosgastos);
        let montosubtotal = parseFloat(detalle.montosubtotal);
        let montodescuento = parseFloat(detalle.montodescuento);
        let impuesto = parseFloat(detalle.impuesto);

        let nrofactura = detalle.nrofactura;
        let impuestototal = nrofactura > 0 ? parseFloat( (montosubtotal - montodescuento) * ( impuesto / 100 ) ) : 0;
        detalle.impuestototal = impuestototal.toFixed(2);

        detalle.montototal = parseFloat(montosubtotal + fletes + internacion + otrosgastos - montodescuento - impuestototal).toFixed(2);
    };

    function onAddRowDetalle() {
        const element = {
            key: detalle.arrayNotaCompraDetalle.length,
            codigo: "",
            producto: "",
            fkidproducto: null,
            unidadmedida: "",

            fkidciudadorigen: null,
            ciudadorigen: detalle ? detalle.ciudadorigen : "",

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

            fkidseccioninventario: null,
            seccioninventario: "",

            cantidad: "",
            cantidadsolicitada: "",
            cantidadrecibida: "",
            cantidadfaltante: "",
            cantidadsobrante: "",
            nrocajas: "",

            descuento: "",
            montodescuento: "",

            costobase: "",
            costounitario: "",
            costosubtotal: "",

            peso: "",
            pesosubtotal: "",

            volumen: "",
            volumensubtotal: "",

            fechavencimiento: null,
            fvencimiento: null,
            nota: null,

            nrolote: "",
            nrofabrica: "",

            isdevolucioncompra: "N",
            isordencompra: "N",
            issolicitudcompra: "N",

            fkidnotacompra: null,
            fkidordencompra: null,
            fkidordencompradetalle: null,
            fkidsolicitudcompradetalle: null,
            fkidsolicitudcompra: null,

            idnotacompradetalle: null,
            fkidalmacenproductodetalle: null,

            visible_producto: false,
            visible_sucursal: false,
            visible_almacen: false,
            visible_proveedor: false,
            errorcantidad: false,
            errorcostounitario: false,
        };
        detalle.arrayNotaCompraDetalle = [ ...detalle.arrayNotaCompraDetalle, element ];
        onChangeDetalle( detalle );
    };

    function onDeleteRowDetalle( data, index ) {
        detalle.arrayNotaCompraDetalle = detalle.arrayNotaCompraDetalle.filter( (item, key) => key !== index );

        for (let index = 0; index < detalle.arrayNotaCompraDetalle.length; index++) {
            let element = detalle.arrayNotaCompraDetalle[index];
            element.key = index;
        }

        if ( data.idnotacompradetalle != null ) {
            detalle.arrayDeleteNotaCompraDetalle = [ ...detalle.arrayDeleteNotaCompraDetalle, data.idnotacompradetalle ];
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
            key: 'producto', width: 120,
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
            title: <span style={{ fontSize: 11, }}> { 'Cant.' } </span>, 
            dataIndex: 'cantidad', key: 'cantidad', width: 50,
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
                        { data.costobase }
                    </label>
                </span>
            ),
        },
        { 
            title: <span style={{ fontSize: 11, }}> { 'Costo Unit.' } </span>, 
            dataIndex: 'costounitario', key: 'costounitario', width: 70,
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
                                                    data.errorcosto = false;
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
                                                    data.errorcosto = false;
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
                                                    data.errorcosto = false;
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
                                {data.costounitario} { data.errorcosto === true && 
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
            title: <span style={{ fontSize: 11, }}> { 'Costo subtotal' } </span>, 
            dataIndex: 'costosubtotal', key: 'costosubtotal', width: 80,
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
                                                onChangeDetalle(detalle);
                                            }
                                        } }
                                        suffix={
                                            <i className="fa fa-plus icon-table-horus"
                                                onClick={ () => {
                                                    if ( disabled.data ) return;
                                                    data.nrocajas = parseInt(data.nrocajas) + 1;
                                                    updateTotales();
                                                    onChangeDetalle(detalle);
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
                </span>
            ),
        },
        { 
            title: <span style={{ fontSize: 11, }}> { 'Nota' } </span>,
            dataIndex: 'nota', key: 'nota', width: 180,
            render: ( text, data, index ) => (
                disabled.data ?
                <span style={{ fontSize: 10, display: 'flex', }}>
                    <label style={{ cursor: 'pointer', }}> 
                        { data.nota == null ? "" : data.nota }
                    </label>
                </span> : 
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