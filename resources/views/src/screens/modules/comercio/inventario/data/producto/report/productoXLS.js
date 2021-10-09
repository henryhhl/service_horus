
import React from 'react';
import PropTypes from 'prop-types';

import ReactHTMLTableToExcel from 'react-html-table-to-excel';

const ProductoXLS = ( props ) => {
    
    const { producto } = props;

    return (
        <>
            <div style={{ display: 'none', }}>
                <ReactHTMLTableToExcel
                    id="buttonproducto_xls"
                    className=""
                    table="producto_xls"
                    filename={"producto"}
                    sheet="hoja 1"
                    buttonText=""
                />
                <table border="1" id="producto_xls">
                    <thead>
                        <tr>
                            <th colSpan={"11"} style={{ fontWeight: 'bolder', padding: 10, fontSize: 20, }}>
                                PRODUCTO
                            </th>
                        </tr>
                    </thead>
                    <thead>
                        <tr>
                            <th style={{ fontWeight: 'bolder', }}>NRO</th>
                            <th style={{ fontWeight: 'bolder', }}>CÓDIGO</th>
                            <th style={{ fontWeight: 'bolder', }}>NOMBRE</th>
                            <th style={{ fontWeight: 'bolder', }}>NIVEL</th>
                            <th style={{ fontWeight: 'bolder', }}>TIPO</th>
                            <th style={{ fontWeight: 'bolder', }}>ORIGEN</th>
                            <th style={{ fontWeight: 'bolder', }}>CATEGORÍA</th>
                            <th style={{ fontWeight: 'bolder', }}>MARCA</th>
                            <th style={{ fontWeight: 'bolder', }}>GRUPO</th>
                            <th style={{ fontWeight: 'bolder', }}>SUB GRUPO</th>
                            <th style={{ fontWeight: 'bolder', }}>DESCRIPCIÓN</th>
                        </tr>
                    </thead>
                    <tbody>
                        { producto.arrayProducto.map(
                            ( item, key) => (
                                <tr key={key}>
                                    <td style={{ padding: "5px" }}>
                                        { key + 1 }
                                    </td>
                                    <td style={{ padding: "5px" }}>
                                        { item.codigo ? item.codigo : "" }
                                    </td>
                                    <td style={{ padding: "5px" }}>
                                        { item.nombre }
                                    </td>
                                    <td style={{ padding: "5px" }}>
                                        { item.nivel }
                                    </td>
                                    <td style={{ padding: "5px" }}>
                                        { item.productotipo }
                                    </td>
                                    <td style={{ padding: "5px" }}>
                                        { item.ciudadorigen }
                                    </td>
                                    <td style={{ padding: "5px" }}>
                                        { item.categoria }
                                    </td>
                                    <td style={{ padding: "5px" }}>
                                        { item.productomarca }
                                    </td>
                                    <td style={{ padding: "5px" }}>
                                        { item.productogrupo }
                                    </td>
                                    <td style={{ padding: "5px" }}>
                                        { item.productosubgrupo }
                                    </td>
                                    <td style={{ padding: "5px" }}>
                                        { item.descripcion ? item.descripcion : "" }
                                    </td>
                                </tr>
                            )
                        )}
                        <tr>
                            <td colSpan="11"></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
};

ProductoXLS.propTypes = {
    producto: PropTypes.object,
};

ProductoXLS.defaultProps = {
};

export default ProductoXLS;
