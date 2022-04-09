
import React from 'react';
import PropTypes from 'prop-types';

import ReactHTMLTableToExcel from 'react-html-table-to-excel';

const VendedorXLS = ( props ) => {

    const { vendedor } = props;

    return (
        <>
            <div style={{ display: 'none', }}>
                <ReactHTMLTableToExcel
                    id="buttonvendedor_xls"
                    className=""
                    table="vendedor_xls"
                    filename={"vendedor"}
                    sheet="VENDEDOR"
                    buttonText=""
                />
                <table border="1" id="vendedor_xls">
                    <thead>
                        <tr>
                            <th colSpan={"14"} style={{ fontWeight: 'bolder', padding: 10, fontSize: 20, }}>
                                VENDEDOR
                            </th>
                        </tr>
                    </thead>
                    <thead>
                        <tr>
                            <th style={{ fontWeight: 'bolder', }}>
                                NRO
                            </th>
                            <th style={{ fontWeight: 'bolder', }}>
                                CI
                            </th>
                            <th style={{ fontWeight: 'bolder', }}>
                                NOMBRE
                            </th>
                            <th style={{ fontWeight: 'bolder', }}>
                                APELLIDO
                            </th>
                            <th style={{ fontWeight: 'bolder', }}>
                                COMISIÓN VENTA
                            </th>
                            <th style={{ fontWeight: 'bolder', }}>
                                CIUDAD
                            </th>
                            <th style={{ fontWeight: 'bolder', }}>
                                DIRECCIÓN
                            </th>
                            <th style={{ fontWeight: 'bolder', }}>
                                FAX
                            </th>
                            <th style={{ fontWeight: 'bolder', }}>
                                TELÉFONO
                            </th>
                            <th style={{ fontWeight: 'bolder', }}>
                                CELULAR
                            </th>
                            <th style={{ fontWeight: 'bolder', }}>
                                EMAIL
                            </th>
                            <th style={{ fontWeight: 'bolder', }}>
                                FECHA NACIMIENTO
                            </th>
                            <th style={{ fontWeight: 'bolder', }}>
                                GÉNERO
                            </th>
                            <th style={{ fontWeight: 'bolder', }}>
                                ESTADO CIVIL
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        { vendedor.arrayVendedor.map(
                            ( item, key) => (
                                <tr key={key}>
                                    <td style={{ padding: "5px" }}>
                                        { key + 1 }
                                    </td>
                                    <td style={{ padding: "5px" }}>
                                        { item.ci }
                                    </td>
                                    <td style={{ padding: "5px" }}>
                                        { item.nombre }
                                    </td>
                                    <td style={{ padding: "5px" }}>
                                        { item.apellido }
                                    </td>
                                    <td style={{ padding: "5px" }}>
                                        { parseFloat(item.valor).toFixed(2) }%
                                    </td>
                                    <td style={{ padding: "5px" }}>
                                        { item.ciudadpais } { item.ciudad }
                                    </td>
                                    <td style={{ padding: "5px" }}>
                                        { item.direccion ? item.direccion : '' }
                                    </td>
                                    <td style={{ padding: "5px" }}>
                                        { item.fax ? item.fax : '' }
                                    </td>
                                    <td style={{ padding: "5px" }}>
                                        { item.telefono ? item.telefono : '' }
                                    </td>
                                    <td style={{ padding: "5px" }}>
                                        { item.celular ? item.celular : '' }
                                    </td>
                                    <td style={{ padding: "5px" }}>
                                        { item.email ? item.email : '' }
                                    </td>
                                    <td style={{ padding: "5px" }}>
                                        { item.fechanacimiento ? item.fechanacimiento : '' }
                                    </td>
                                    <td style={{ padding: "5px" }}>
                                        { item.genero == 'F' ? 'Femenino': item.genero == 'M' ? 'Masculino' : 'Ninguno' }
                                    </td>
                                    <td style={{ padding: "5px" }}>
                                        { item.estadocivil == 'S' ? 'Solter@' : item.estadocivil == 'C' ? 'Casad@' : item.estadocivil == 'D' ? 'Divorciad@' : item.estadocivil == 'V' ? 'Viud@' : 'Ninguno' }
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

VendedorXLS.propTypes = {
    vendedor: PropTypes.object,
};

VendedorXLS.defaultProps = {
};

export default VendedorXLS;
