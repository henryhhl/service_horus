
import React from 'react';
import PropTypes from 'prop-types';

import ReactHTMLTableToExcel from 'react-html-table-to-excel';

const ConceptoInventarioXLS = ( props ) => {
    
    const { conceptoInventario } = props;

    return (
        <>
            <div style={{ display: 'none', }}>
                <ReactHTMLTableToExcel
                    id="buttonconceptoinventario_xls"
                    className=""
                    table="conceptoinventario_xls"
                    filename={"conceptoinventario"}
                    sheet="hoja 1"
                    buttonText=""
                />
                <table border="1" id="conceptoinventario_xls">
                    <thead>
                        <tr>
                            <th colSpan={"2"} style={{ fontWeight: 'bolder', padding: 10, fontSize: 20, }}>
                                CONCEPTO INVENTARIO
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
                        { conceptoInventario.arrayConceptoInventario.map(
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

ConceptoInventarioXLS.propTypes = {
    conceptoInventario: PropTypes.object,
};

ConceptoInventarioXLS.defaultProps = {
};

export default ConceptoInventarioXLS;
