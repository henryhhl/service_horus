
import React from 'react';
import PropTypes from 'prop-types';

import ReactHTMLTableToExcel from 'react-html-table-to-excel';

const ProductoSubGrupoXLS = ( props ) => {
    
    const { productoSubGrupo } = props;

    return (
        <>
            <div style={{ display: 'none', }}>
                <ReactHTMLTableToExcel
                    id="buttonproductosubgrupo_xls"
                    className=""
                    table="productosubgrupo_xls"
                    filename={"subGrupoProducto"}
                    sheet="hoja 1"
                    buttonText=""
                />
                <table border="1" id="productosubgrupo_xls">
                    <thead>
                        <tr>
                            <th colSpan={"4"} style={{ fontWeight: 'bolder', padding: 10, fontSize: 20, }}>
                                SUB GRUPO DE GRUPO
                            </th>
                        </tr>
                    </thead>
                    <thead>
                        <tr>
                            <th style={{ fontWeight: 'bolder', }}>NRO</th>
                            <th style={{ fontWeight: 'bolder', }}>BREVE</th>
                            <th style={{ fontWeight: 'bolder', }}>DESCRIPCIÓN</th>
                            <th style={{ fontWeight: 'bolder', }}>GRUPO</th>
                        </tr>
                    </thead>
                    <tbody>
                        { productoSubGrupo.arrayProductoSubGrupo.map(
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
                                    <td style={{ padding: "5px" }}>
                                        { item.productogrupo }
                                    </td>
                                </tr>
                            )
                        )}
                        <tr>
                            <td colSpan="4"></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
};

ProductoSubGrupoXLS.propTypes = {
    productoSubGrupo: PropTypes.object,
};

ProductoSubGrupoXLS.defaultProps = {
};

export default ProductoSubGrupoXLS;
