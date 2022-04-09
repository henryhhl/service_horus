
import React from 'react';
import PropTypes from 'prop-types';

import ReactHTMLTableToExcel from 'react-html-table-to-excel';

const ComisionVentaXLS = ( props ) => {

    const { comisionVenta } = props;

    return (
        <>
            <div style={{ display: 'none', }}>
                <ReactHTMLTableToExcel
                    id="buttoncomisionventa_xls"
                    className=""
                    table="comisionventa_xls"
                    filename={"comisionventa"}
                    sheet="COMISIÓN VENTA"
                    buttonText=""
                />
                <table border="1" id="comisionventa_xls">
                    <thead>
                        <tr>
                            <th colSpan={"2"} style={{ fontWeight: 'bolder', padding: 10, fontSize: 20, }}>
                                COMISIÓN VENTA
                            </th>
                        </tr>
                    </thead>
                    <thead>
                        <tr>
                            <th style={{ fontWeight: 'bolder', }}>NRO</th>
                            <th style={{ fontWeight: 'bolder', }}>DESCRIPCIÓN</th>
                        </tr>
                    </thead>
                    <tbody>
                        { comisionVenta.arrayComisionVenta.map(
                            ( item, key) => (
                                <tr key={key}>
                                    <td style={{ padding: "5px" }}>
                                        { key + 1 }
                                    </td>
                                    <td style={{ padding: "5px" }}>
                                        { item.descripcion }
                                    </td>
                                </tr>
                            )
                        )}
                        <tr>
                            <td colSpan="2"></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
};

ComisionVentaXLS.propTypes = {
    comisionVenta: PropTypes.object,
};

ComisionVentaXLS.defaultProps = {
};

export default ComisionVentaXLS;
