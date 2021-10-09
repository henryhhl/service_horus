
import React from 'react';
import PropTypes from 'prop-types';

import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { Functions } from '../../../../../../../utils/functions';

const SolicitudCompraXLS = ( props ) => {
    
    const { solicitudCompra } = props;

    return (
        <>
            <div style={{ display: 'none', }}>
                <ReactHTMLTableToExcel
                    id="buttonsolicitudcompra_xls"
                    className=""
                    table="solicitudcompra_xls"
                    filename={"solicitudcompra"}
                    sheet="hoja 1"
                    buttonText=""
                />
                <table border="1" id="solicitudcompra_xls">
                    <thead>
                        <tr>
                            <th colSpan={"14"} style={{ fontWeight: 'bolder', padding: 10, fontSize: 20, }}>
                                SOLICITUD COMPRA
                            </th>
                        </tr>
                    </thead>
                    <thead>
                        <tr>
                            <th style={{ fontWeight: 'bolder', }}>NRO</th>
                            <th style={{ fontWeight: 'bolder', }}>CÓDIGO</th>
                            <th style={{ fontWeight: 'bolder', }}>FECHA SOLICITADA</th>
                            <th style={{ fontWeight: 'bolder', }}>FECHA REALIZADA</th>
                            <th style={{ fontWeight: 'bolder', }}>SUCURSAL</th>
                            <th style={{ fontWeight: 'bolder', }}>ÁLMACEN</th>
                            <th style={{ fontWeight: 'bolder', }}>PROVEEDOR</th>
                            <th style={{ fontWeight: 'bolder', }}>CONCEPTO</th>
                            <th style={{ fontWeight: 'bolder', }}>SECCIÓN</th>
                            <th style={{ fontWeight: 'bolder', }}>TIPO</th>
                            <th style={{ fontWeight: 'bolder', }}>MONEDA</th>
                            <th style={{ fontWeight: 'bolder', }}>CANTIDAD TOTAL</th>
                            <th style={{ fontWeight: 'bolder', }}>MONTO TOTAL</th>
                            <th style={{ fontWeight: 'bolder', }}>NOTA</th>
                        </tr>
                    </thead>
                    <tbody>
                        { solicitudCompra.arraySolicitudCompra.map(
                            ( item, key) => (
                                <tr key={key}>
                                    <td style={{ padding: "5px" }}>
                                        { key + 1 }
                                    </td>
                                    <td style={{ padding: "5px" }}>
                                        { item.codigo ? item.codigo : "" }
                                    </td>
                                    <td style={{ padding: "5px" }}>
                                        { Functions.convertYMDToDMY(item.fechasolicitada) }
                                    </td>
                                    <td style={{ padding: "5px" }}>
                                        { Functions.convertYMDToDMY(item.fechafinalizada) }
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
                                        { item.cantidadsolicitadatotal }
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
                            <td colSpan="14"></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
};

SolicitudCompraXLS.propTypes = {
    solicitudCompra: PropTypes.object,
};

SolicitudCompraXLS.defaultProps = {
};

export default SolicitudCompraXLS;
