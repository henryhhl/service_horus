
import React from 'react';
import PropTypes from 'prop-types';

import ReactHTMLTableToExcel from 'react-html-table-to-excel';

const SeccionInventarioXLS = ( props ) => {
    
    const { seccionInventario } = props;

    return (
        <>
            <div style={{ display: 'none', }}>
                <ReactHTMLTableToExcel
                    id="buttonseccioninventario_xls"
                    className=""
                    table="seccioninventario_xls"
                    filename={"seccioninventario"}
                    sheet="SECCIÓN INVENTARIO"
                    buttonText=""
                />
                <table border="1" id="seccioninventario_xls">
                    <thead>
                        <tr>
                            <th colSpan={"2"} style={{ fontWeight: 'bolder', padding: 10, fontSize: 20, }}>
                                SECCIÓN INVENTARIO
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
                        { seccionInventario.arraySeccionInventario.map(
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

SeccionInventarioXLS.propTypes = {
    seccionInventario: PropTypes.object,
};

SeccionInventarioXLS.defaultProps = {
};

export default SeccionInventarioXLS;
