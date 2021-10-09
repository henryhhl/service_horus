
import React from 'react';
import PropTypes from 'prop-types';

import ReactHTMLTableToExcel from 'react-html-table-to-excel';

const UnionSucursalXLS = ( props ) => {
    
    const { unionSucursal } = props;

    return (
        <>
            <div style={{ display: 'none', }}>
                <ReactHTMLTableToExcel
                    id="buttonunionsucursal_xls"
                    className=""
                    table="unionsucursal_xls"
                    filename={"unionsucursal"}
                    sheet="hoja 1"
                    buttonText=""
                />
                <table border="1" id="unionsucursal_xls">
                    <thead>
                        <tr>
                            <th colSpan={"2"} style={{ fontWeight: 'bolder', padding: 10, fontSize: 20, }}>
                                UNIÓN SUCURSAL
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
                        { unionSucursal.arrayUnionSucursal.map(
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

UnionSucursalXLS.propTypes = {
    unionSucursal: PropTypes.object,
};

UnionSucursalXLS.defaultProps = {
};

export default UnionSucursalXLS;