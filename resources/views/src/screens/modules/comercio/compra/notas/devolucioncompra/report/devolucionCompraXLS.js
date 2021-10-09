
import React from 'react';
import PropTypes from 'prop-types';

import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { Functions } from '../../../../../../../utils/functions';

const DevolucionCompraXLS = ( props ) => {
    
    const { devolucionCompra } = props;

    return (
        <>
            <div style={{ display: 'none', }}>
                <ReactHTMLTableToExcel
                    id="buttondevolucioncompra_xls"
                    className=""
                    table="devolucioncompra_xls"
                    filename={"devolucioncompra"}
                    sheet="DEVOLUCIÓN COMPRA"
                    buttonText=""
                />
                <table border="1" id="devolucioncompra_xls">
                    <thead>
                        <tr>
                            <th colSpan={"15"} style={{ fontWeight: 'bolder', padding: 10, fontSize: 20, }}>
                                DEVOLUCIÓN COMPRA
                            </th>
                        </tr>
                    </thead>
                    <thead>
                        <tr>
                            <th style={{ fontWeight: 'bolder', }}>NRO</th>
                            <th style={{ fontWeight: 'bolder', }}>NRO FACTURA</th>
                            <th style={{ fontWeight: 'bolder', }}>FECHA</th>
                            <th style={{ fontWeight: 'bolder', }}>SUCURSAL</th>
                            <th style={{ fontWeight: 'bolder', }}>ÁLMACEN</th>
                            <th style={{ fontWeight: 'bolder', }}>PROVEEDOR</th>
                            <th style={{ fontWeight: 'bolder', }}>CONCEPTO</th>
                            <th style={{ fontWeight: 'bolder', }}>TIPO</th>
                            <th style={{ fontWeight: 'bolder', }}>MONEDA</th>
                            <th style={{ fontWeight: 'bolder', }}>CANTIDAD TOTAL</th>
                            <th style={{ fontWeight: 'bolder', }}>MONTO SUB TOTAL</th>
                            <th style={{ fontWeight: 'bolder', }}>DESCUENTO</th>
                            <th style={{ fontWeight: 'bolder', }}>MONTO DESCUENTO</th>
                            <th style={{ fontWeight: 'bolder', }}>MONTO TOTAL</th>
                            <th style={{ fontWeight: 'bolder', }}>NOTA</th>
                        </tr>
                    </thead>
                    <tbody>
                        { devolucionCompra.arrayDevolucionCompra.map(
                            ( item, key) => (
                                <tr key={key}>
                                    <td style={{ padding: "5px" }}>
                                        { key + 1 }
                                    </td>
                                    <td style={{ padding: "5px" }}>
                                        { item.nrofactura ? item.nrofactura : "" }
                                    </td>
                                    <td style={{ padding: "5px" }}>
                                        { Functions.convertYMDToDMY(item.fechadevolucioncompra) }
                                    </td>
                                    <td style={{ padding: "5px" }}>
                                        { item.sucursal }
                                    </td>
                                    <td style={{ padding: "5px" }}>
                                        { item.almacen }
                                    </td>
                                    <td style={{ padding: "5px" }}>
                                        { item.proveedor }
                                    </td>
                                    <td style={{ padding: "5px" }}>
                                        { item.conceptocompra }
                                    </td>
                                    <td style={{ padding: "5px" }}>
                                        { item.tipocompra == "L" ? "Local" : "Exterior" }
                                    </td>
                                    <td style={{ padding: "5px" }}>
                                        { item.moneda }
                                    </td>
                                    <td style={{ padding: "5px" }}>
                                        { item.cantidadtotal }
                                    </td>
                                    <td style={{ padding: "5px" }}>
                                        { parseFloat(item.montosubtotal).toFixed(2) }
                                    </td>
                                    <td style={{ padding: "5px" }}>
                                        { parseInt(item.descuento) }
                                    </td>
                                    <td style={{ padding: "5px" }}>
                                        { parseFloat(item.montodescuento).toFixed(2) }
                                    </td>
                                    <td style={{ padding: "5px" }}>
                                        { parseFloat(item.montototal).toFixed(2) }
                                    </td>
                                    <td style={{ padding: "5px" }}>
                                        { item.nota ? item.nota : "" }
                                    </td>
                                </tr>
                            )
                        )}
                        <tr>
                            <td colSpan="15"></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
};

DevolucionCompraXLS.propTypes = {
    devolucionCompra: PropTypes.object,
};

DevolucionCompraXLS.defaultProps = {
};

export default DevolucionCompraXLS;
