
import React from 'react';
import PropTypes from 'prop-types';

import ReactHTMLTableToExcel from 'react-html-table-to-excel';

const ProductoGrupoXLS = ( props ) => {
    
    const { productoGrupo } = props;

    return (
        <>
            <div style={{ display: 'none', }}>
                <ReactHTMLTableToExcel
                    id="buttonproductogrupo_xls"
                    className=""
                    table="productogrupo_xls"
                    filename={"grupoProducto"}
                    sheet="hoja 1"
                    buttonText=""
                />
                <table border="1" id="productogrupo_xls">
                    <thead>
                        <tr>
                            <th colSpan={"3"} style={{ fontWeight: 'bolder', padding: 10, fontSize: 20, }}>
                                GRUPO DE PRODUCTO
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
                        { productoGrupo.arrayProductoGrupo.map(
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

ProductoGrupoXLS.propTypes = {
    productoGrupo: PropTypes.object,
};

ProductoGrupoXLS.defaultProps = {
};

export default ProductoGrupoXLS;
