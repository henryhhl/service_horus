
import React from 'react';
import PropTypes from 'prop-types';

import ReactHTMLTableToExcel from 'react-html-table-to-excel';

const DevolucionNotaVentaXLS = ( props ) => {

    const { devolucionNotaVenta } = props;

    return (
        <>
            <div style={{ display: 'none', }}>
                <ReactHTMLTableToExcel
                    id="buttondevolucionnotaventa_xls"
                    className=""
                    table="devolucionnotaventa_xls"
                    filename={"devolucionnotaventa"}
                    sheet="DEVOLUCIÓN NOTA VENTA"
                    buttonText=""
                />
                <table border="1" id="devolucionnotaventa_xls">
                    <thead>
                        <tr>
                            <th colSpan={"15"} style={{ fontWeight: 'bolder', padding: 10, fontSize: 20, }}>
                                DEVOLUCIÓN NOTA VENTA
                            </th>
                        </tr>
                    </thead>
                    <thead>
                        <tr>
                            <th style={{ fontWeight: 'bolder', }}>NRO</th>
                            <th style={{ fontWeight: 'bolder', }}>SUCURSAL</th>
                            <th style={{ fontWeight: 'bolder', }}>ÁLMACEN</th>
                            <th style={{ fontWeight: 'bolder', }}>LISTA PRECIO</th>
                            <th style={{ fontWeight: 'bolder', }}>MONEDA</th>
                            <th style={{ fontWeight: 'bolder', }}>TIPO CAMBIO</th>
                            <th style={{ fontWeight: 'bolder', }}>CONCEPTO</th>
                            <th style={{ fontWeight: 'bolder', }}>VENDEDOR</th>
                            <th style={{ fontWeight: 'bolder', }}>CLIENTE</th>
                            <th style={{ fontWeight: 'bolder', }}>NIT</th>
                            <th style={{ fontWeight: 'bolder', }}>SUB TOTAL</th>
                            <th style={{ fontWeight: 'bolder', }}>DESCUENTO</th>
                            <th style={{ fontWeight: 'bolder', }}>MONTO DESCUENTO</th>
                            <th style={{ fontWeight: 'bolder', }}>MONTO TOTAL</th>
                            <th style={{ fontWeight: 'bolder', }}>CANTIDAD TOTAL</th>
                        </tr>
                    </thead>
                    <tbody>
                        { devolucionNotaVenta.arrayDevolucionNotaVenta.map(
                            ( item, key) => (
                                <tr key={key}>
                                    <td style={{ padding: "5px" }}>
                                        { key + 1 }
                                    </td>
                                    <td style={{ padding: "5px" }}>
                                        { item.sucursal }
                                    </td>
                                    <td style={{ padding: "5px" }}>
                                        { item.almacen }
                                    </td>
                                    <td style={{ padding: "5px" }}>
                                        { item.listaprecio }
                                    </td>
                                    <td style={{ padding: "5px" }}>
                                        { item.moneda }
                                    </td>
                                    <td style={{ padding: "5px" }}>
                                        { parseFloat(item.tipocambio).toFixed(2) }
                                    </td>
                                    <td style={{ padding: "5px" }}>
                                        { item.conceptoventa }
                                    </td>
                                    <td style={{ padding: "5px" }}>
                                        { item.vendedor }
                                    </td>
                                    <td style={{ padding: "5px" }}>
                                        { item.cliente }
                                    </td>
                                    <td style={{ padding: "5px" }}>
                                        { item.nit ? item.nit : "" }
                                    </td>
                                    <td style={{ padding: "5px" }}>
                                        { parseFloat(item.montosubtotal).toFixed(2) }
                                    </td>
                                    <td style={{ padding: "5px" }}>
                                        { parseFloat(item.descuento).toFixed(2) }
                                    </td>
                                    <td style={{ padding: "5px" }}>
                                        { parseFloat(item.montodescuento).toFixed(2) }
                                    </td>
                                    <td style={{ padding: "5px" }}>
                                        { parseFloat(item.montototal).toFixed(2) }
                                    </td>
                                    <td style={{ padding: "5px" }}>
                                        { parseFloat(item.cantidadtotal).toFixed(2) }
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

DevolucionNotaVentaXLS.propTypes = {
    devolucionNotaVenta: PropTypes.object,
};

DevolucionNotaVentaXLS.defaultProps = {
};

export default DevolucionNotaVentaXLS;
