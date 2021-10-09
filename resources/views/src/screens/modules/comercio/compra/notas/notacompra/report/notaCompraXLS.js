
import React from 'react';
import PropTypes from 'prop-types';

import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { Functions } from '../../../../../../../utils/functions';

const NotaCompraXLS = ( props ) => {
    
    const { notaCompra } = props;

    return (
        <>
            <div style={{ display: 'none', }}>
                <ReactHTMLTableToExcel
                    id="buttonnotacompra_xls"
                    className=""
                    table="notacompra_xls"
                    filename={"notacompra"}
                    sheet="NOTA COMPRA"
                    buttonText=""
                />
                <table border="1" id="notacompra_xls">
                    <thead>
                        <tr>
                            <th colSpan={"18"} style={{ fontWeight: 'bolder', padding: 10, fontSize: 20, }}>
                                NOTA COMPRA
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
                            <th style={{ fontWeight: 'bolder', }}>FLETES</th>
                            <th style={{ fontWeight: 'bolder', }}>INTERNACIÓN</th>
                            <th style={{ fontWeight: 'bolder', }}>OTROS GASTOS</th>
                            <th style={{ fontWeight: 'bolder', }}>MONTO TOTAL</th>
                            <th style={{ fontWeight: 'bolder', }}>NOTA</th>
                        </tr>
                    </thead>
                    <tbody>
                        { notaCompra.arrayNotaCompra.map(
                            ( item, key) => (
                                <tr key={key}>
                                    <td style={{ padding: "5px" }}>
                                        { key + 1 }
                                    </td>
                                    <td style={{ padding: "5px" }}>
                                        { item.nrofactura ? item.nrofactura : "" }
                                    </td>
                                    <td style={{ padding: "5px" }}>
                                        { Functions.convertYMDToDMY(item.fechanotacompra) }
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
                                        { parseFloat(item.fletes).toFixed(2) }
                                    </td>
                                    <td style={{ padding: "5px" }}>
                                        { parseFloat(item.internacion).toFixed(2) }
                                    </td>
                                    <td style={{ padding: "5px" }}>
                                        { parseFloat(item.otrosgastos).toFixed(2) }
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
                            <td colSpan="18"></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
};

NotaCompraXLS.propTypes = {
    notaCompra: PropTypes.object,
};

NotaCompraXLS.defaultProps = {
};

export default NotaCompraXLS;
