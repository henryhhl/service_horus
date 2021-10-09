
import React from 'react';
import PropTypes from 'prop-types';

import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { Functions } from '../../../../../../../utils/functions';

const OrdenCompraXLS = ( props ) => {
    
    const { ordenCompra } = props;

    return (
        <>
            <div style={{ display: 'none', }}>
                <ReactHTMLTableToExcel
                    id="buttonordencompra_xls"
                    className=""
                    table="ordencompra_xls"
                    filename={"ordencompra"}
                    sheet="ORDEN COMPRA"
                    buttonText=""
                />
                <table border="1" id="ordencompra_xls">
                    <thead>
                        <tr>
                            <th colSpan={"17"} style={{ fontWeight: 'bolder', padding: 10, fontSize: 20, }}>
                                ORDEN COMPRA
                            </th>
                        </tr>
                    </thead>
                    <thead>
                        <tr>
                            <th style={{ fontWeight: 'bolder', }}>NRO</th>
                            <th style={{ fontWeight: 'bolder', }}>NRO FACTURA</th>
                            <th style={{ fontWeight: 'bolder', }}>FECHA SOLICITADA</th>
                            <th style={{ fontWeight: 'bolder', }}>SUCURSAL</th>
                            <th style={{ fontWeight: 'bolder', }}>ÁLMACEN</th>
                            <th style={{ fontWeight: 'bolder', }}>PROVEEDOR</th>
                            <th style={{ fontWeight: 'bolder', }}>CONCEPTO</th>
                            <th style={{ fontWeight: 'bolder', }}>SECCIÓN</th>
                            <th style={{ fontWeight: 'bolder', }}>TIPO</th>
                            <th style={{ fontWeight: 'bolder', }}>MONEDA</th>
                            <th style={{ fontWeight: 'bolder', }}>CANTIDAD TOTAL</th>
                            <th style={{ fontWeight: 'bolder', }}>MONTO SUB TOTAL</th>
                            <th style={{ fontWeight: 'bolder', }}>FLETES</th>
                            <th style={{ fontWeight: 'bolder', }}>INTERNACIÓN</th>
                            <th style={{ fontWeight: 'bolder', }}>OTROS GASTOS</th>
                            <th style={{ fontWeight: 'bolder', }}>MONTO TOTAL</th>
                            <th style={{ fontWeight: 'bolder', }}>NOTA</th>
                        </tr>
                    </thead>
                    <tbody>
                        { ordenCompra.arrayOrdenCompra.map(
                            ( item, key) => (
                                <tr key={key}>
                                    <td style={{ padding: "5px" }}>
                                        { key + 1 }
                                    </td>
                                    <td style={{ padding: "5px" }}>
                                        { item.nrofactura ? item.nrofactura : "" }
                                    </td>
                                    <td style={{ padding: "5px" }}>
                                        { Functions.convertYMDToDMY(item.fechasolicitada) }
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
                                        { item.seccioninventario }
                                    </td>
                                    <td style={{ padding: "5px" }}>
                                        { item.tiposolicitud == "L" ? "Local" : "Exterior" }
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
                            <td colSpan="17"></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
};

OrdenCompraXLS.propTypes = {
    ordenCompra: PropTypes.object,
};

OrdenCompraXLS.defaultProps = {
};

export default OrdenCompraXLS;
