
import React from 'react';
import PropTypes from 'prop-types';

import ReactHTMLTableToExcel from 'react-html-table-to-excel';

const ConceptoCompraXLS = ( props ) => {
    
    const { conceptoCompra } = props;

    return (
        <>
            <div style={{ display: 'none', }}>
                <ReactHTMLTableToExcel
                    id="buttonconceptocompra_xls"
                    className=""
                    table="conceptocompra_xls"
                    filename={"conceptocompra"}
                    sheet="hoja 1"
                    buttonText=""
                />
                <table border="1" id="conceptocompra_xls">
                    <thead>
                        <tr>
                            <th colSpan={"2"} style={{ fontWeight: 'bolder', padding: 10, fontSize: 20, }}>
                                CONCEPTO COMPRA
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
                        { conceptoCompra.arrayConceptoCompra.map(
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

ConceptoCompraXLS.propTypes = {
    conceptoCompra: PropTypes.object,
};

ConceptoCompraXLS.defaultProps = {
};

export default ConceptoCompraXLS;