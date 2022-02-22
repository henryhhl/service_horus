
import React from 'react';
import PropTypes from 'prop-types';

import ReactHTMLTableToExcel from 'react-html-table-to-excel';

const ConceptoVentaXLS = ( props ) => {

    const { conceptoVenta } = props;

    return (
        <>
            <div style={{ display: 'none', }}>
                <ReactHTMLTableToExcel
                    id="buttonconceptoventa_xls"
                    className=""
                    table="conceptoventa_xls"
                    filename={"conceptoventa"}
                    sheet="CONCEPTO VENTA"
                    buttonText=""
                />
                <table border="1" id="conceptoventa_xls">
                    <thead>
                        <tr>
                            <th colSpan={"2"} style={{ fontWeight: 'bolder', padding: 10, fontSize: 20, }}>
                                CONCEPTO VENTA
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
                        { conceptoVenta.arrayConceptoVenta.map(
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

ConceptoVentaXLS.propTypes = {
    conceptoVenta: PropTypes.object,
};

ConceptoVentaXLS.defaultProps = {
};

export default ConceptoVentaXLS;
