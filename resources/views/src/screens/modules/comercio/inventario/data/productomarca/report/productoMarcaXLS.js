
import React from 'react';
import PropTypes from 'prop-types';

import ReactHTMLTableToExcel from 'react-html-table-to-excel';

const ProductoMarcaXLS = ( props ) => {
    
    const { productoMarca } = props;

    return (
        <>
            <div style={{ display: 'none', }}>
                <ReactHTMLTableToExcel
                    id="buttonproductomarca_xls"
                    className=""
                    table="productomarca_xls"
                    filename={"marca"}
                    sheet="hoja 1"
                    buttonText=""
                />
                <table border="1" id="productomarca_xls">
                    <thead>
                        <tr>
                            <th colSpan={"3"} style={{ fontWeight: 'bolder', padding: 10, fontSize: 20, }}>
                                MARCA
                            </th>
                        </tr>
                    </thead>
                    <thead>
                        <tr>
                            <th style={{ fontWeight: 'bolder', }}>NRO</th>
                            <th style={{ fontWeight: 'bolder', }}>BREVE</th>
                            <th style={{ fontWeight: 'bolder', }}>DESCRIPCIÓN</th>
                        </tr>
                    </thead>
                    <tbody>
                        { productoMarca.arrayProductoMarca.map(
                            ( item, key) => (
                                <tr key={key}>
                                    <td style={{ padding: "5px" }}>
                                        { key + 1 }
                                    </td>
                                    <td style={{ padding: "5px" }}>
                                        { item.abreviatura }
                                    </td>
                                    <td style={{ padding: "5px" }}>
                                        { item.descripcion }
                                    </td>
                                </tr>
                            )
                        )}
                        <tr>
                            <td colSpan="3"></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
};

ProductoMarcaXLS.propTypes = {
    productoMarca: PropTypes.object,
};

ProductoMarcaXLS.defaultProps = {
};

export default ProductoMarcaXLS;
