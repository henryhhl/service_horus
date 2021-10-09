
import React from 'react';
import PropTypes from 'prop-types';

import ReactHTMLTableToExcel from 'react-html-table-to-excel';

const ProveedorCargoXLS = ( props ) => {
    
    const { proveedorCargo } = props;

    return (
        <>
            <div style={{ display: 'none', }}>
                <ReactHTMLTableToExcel
                    id="buttonproveedorcargo_xls"
                    className=""
                    table="proveedorcargo_xls"
                    filename={"proveedorcargo"}
                    sheet="CARGO PROVEEDOR"
                    buttonText=""
                />
                <table border="1" id="proveedorcargo_xls">
                    <thead>
                        <tr>
                            <th colSpan={"2"} style={{ fontWeight: 'bolder', padding: 10, fontSize: 20, }}>
                                CARGO PROVEEDOR
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
                        { proveedorCargo.arrayProveedorCargo.map(
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

ProveedorCargoXLS.propTypes = {
    proveedorCargo: PropTypes.object,
};

ProveedorCargoXLS.defaultProps = {
};

export default ProveedorCargoXLS;
