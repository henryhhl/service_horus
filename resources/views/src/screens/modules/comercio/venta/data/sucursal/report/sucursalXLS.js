
import React from 'react';
import PropTypes from 'prop-types';

import ReactHTMLTableToExcel from 'react-html-table-to-excel';

const SucursalXLS = ( props ) => {
    
    const { sucursal } = props;

    return (
        <>
            <div style={{ display: 'none', }}>
                <ReactHTMLTableToExcel
                    id="buttonsucursal_xls"
                    className=""
                    table="sucursal_xls"
                    filename={"sucursal"}
                    sheet="hoja 1"
                    buttonText=""
                />
                <table border="1" id="sucursal_xls">
                    <thead>
                        <tr>
                            <th colSpan={"5"} style={{ fontWeight: 'bolder', padding: 10, fontSize: 20, }}>
                                SUCURSAL
                            </th>
                        </tr>
                    </thead>
                    <thead>
                        <tr>
                            <th style={{ fontWeight: 'bolder', }}>NRO</th>
                            <th style={{ fontWeight: 'bolder', }}>DESCRIPCIÓN</th>
                            <th style={{ fontWeight: 'bolder', }}>DIRECCIÓN</th>
                            <th style={{ fontWeight: 'bolder', }}>CIUDAD</th>
                            <th style={{ fontWeight: 'bolder', }}>UNIÓN SUCURSAL</th>
                        </tr>
                    </thead>
                    <tbody>
                        { sucursal.arraySucursal.map(
                            ( item, key) => (
                                <tr key={key}>
                                    <td style={{ padding: "5px" }}>
                                        { key + 1 }
                                    </td>
                                    <td style={{ padding: "5px" }}>
                                        { item.descripcion }
                                    </td>
                                    <td style={{ padding: "5px" }}>
                                        { item.direccion }
                                    </td>
                                    <td style={{ padding: "5px" }}>
                                        { item.ciudad }
                                    </td>
                                    <td style={{ padding: "5px" }}>
                                        { item.unionsucursal }
                                    </td>
                                </tr>
                            )
                        )}
                        <tr>
                            <td colSpan="5"></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
};

SucursalXLS.propTypes = {
    sucursal: PropTypes.object,
};

SucursalXLS.defaultProps = {
};

export default SucursalXLS;
