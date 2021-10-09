
import React from 'react';
import PropTypes from 'prop-types';

import ReactHTMLTableToExcel from 'react-html-table-to-excel';

const ProductoTipoXLS = ( props ) => {
    
    const { productoTipo } = props;

    return (
        <>
            <div style={{ display: 'none', }}>
                <ReactHTMLTableToExcel
                    id="buttonproductotipo_xls"
                    className=""
                    table="productotipo_xls"
                    filename={"productotipo"}
                    sheet="hoja 1"
                    buttonText=""
                />
                <table border="1" id="productotipo_xls">
                    <thead>
                        <tr>
                            <th colSpan={"3"} style={{ fontWeight: 'bolder', padding: 10, fontSize: 20, }}>
                                TIPO PRODUCTO
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
                        { productoTipo.arrayProductoTipo.map(
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

ProductoTipoXLS.propTypes = {
    productoTipo: PropTypes.object,
};

ProductoTipoXLS.defaultProps = {
};

export default ProductoTipoXLS;
