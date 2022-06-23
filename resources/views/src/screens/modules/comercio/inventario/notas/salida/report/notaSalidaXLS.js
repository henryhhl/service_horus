
import React from 'react';
import PropTypes from 'prop-types';

import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { Functions } from '../../../../../../../utils/functions';

const NotaSalidaXLS = ( props ) => {
    
    const { notaSalida } = props;

    return (
        <>
            <div style={{ display: 'none', }}>
                <ReactHTMLTableToExcel
                    id="buttonnotasalida_xls"
                    className=""
                    table="notasalida_xls"
                    filename={"notasalida"}
                    sheet="hoja 1"
                    buttonText=""
                />
                <table border="1" id="notasalida_xls">
                    <thead>
                        <tr>
                            <th colSpan={"12"} style={{ fontWeight: 'bolder', padding: 10, fontSize: 20, }}>
                                NOTA SALIDA
                            </th>
                        </tr>
                    </thead>
                    <thead>
                        <tr>
                            <th style={{ fontWeight: 'bolder', }}>NRO</th>
                            <th style={{ fontWeight: 'bolder', }}>CÓDIGO</th>
                            <th style={{ fontWeight: 'bolder', }}>FECHA</th>
                            <th style={{ fontWeight: 'bolder', }}>ÁLMACEN</th>
                            <th style={{ fontWeight: 'bolder', }}>SUCURSAL</th>
                            <th style={{ fontWeight: 'bolder', }}>CONCEPTO</th>
                            <th style={{ fontWeight: 'bolder', }}>CANTIDAD TOTAL</th>
                            <th style={{ fontWeight: 'bolder', }}>MONTO TOTAL</th>
                            <th style={{ fontWeight: 'bolder', }}>PESO TOTAL</th>
                            <th style={{ fontWeight: 'bolder', }}>VOLUMEN TOTAL</th>
                            <th style={{ fontWeight: 'bolder', }}>NRO. CAJAS TOTAL</th>
                            <th style={{ fontWeight: 'bolder', }}>NOTA</th>
                        </tr>
                    </thead>
                    <tbody>
                        { notaSalida.arrayNotaSalida.map(
                            ( item, key) => (
                                <tr key={key}>
                                    <td style={{ padding: "5px" }}>
                                        { key + 1 }
                                    </td>
                                    <td style={{ padding: "5px" }}>
                                        { item.codigo ? item.codigo : "" }
                                    </td>
                                    <td style={{ padding: "5px" }}>
                                        { Functions.convertYMDToDMY(item.fechanotasalida) }
                                    </td>
                                    <td style={{ padding: "5px" }}>
                                        { item.almacen }
                                    </td>
                                    <td style={{ padding: "5px" }}>
                                        { item.sucursal }
                                    </td>
                                    <td style={{ padding: "5px" }}>
                                        { item.conceptoinventario }
                                    </td>
                                    <td style={{ padding: "5px" }}>
                                        { parseInt(item.cantidadtotal) }
                                    </td>
                                    <td style={{ padding: "5px" }}>
                                        { parseFloat(item.montototal).toFixed(2) }
                                    </td>
                                    <td style={{ padding: "5px" }}>
                                        { parseFloat(item.pesototal).toFixed(2) }
                                    </td>
                                    <td style={{ padding: "5px" }}>
                                        { parseFloat(item.volumentotal).toFixed(2) }
                                    </td>
                                    <td style={{ padding: "5px" }}>
                                        { parseFloat(item.nrocajastotal).toFixed(2) }
                                    </td>
                                    <td style={{ padding: "5px" }}>
                                        { item.nota ? item.nota : "" }
                                    </td>
                                </tr>
                            )
                        )}
                        <tr>
                            <td colSpan="12"></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
};

NotaSalidaXLS.propTypes = {
    notaSalida: PropTypes.object,
};

NotaSalidaXLS.defaultProps = {
};

export default NotaSalidaXLS;