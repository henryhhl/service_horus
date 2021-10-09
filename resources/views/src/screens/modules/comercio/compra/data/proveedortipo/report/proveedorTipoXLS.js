
import React from 'react';
import PropTypes from 'prop-types';

import ReactHTMLTableToExcel from 'react-html-table-to-excel';

const ProveedorTipoXLS = ( props ) => {
    
    const { proveedorTipo } = props;

    return (
        <>
            <div style={{ display: 'none', }}>
                <ReactHTMLTableToExcel
                    id="buttonproveedortipo_xls"
                    className=""
                    table="proveedortipo_xls"
                    filename={"proveedortipo"}
                    sheet="hoja 1"
                    buttonText=""
                />
                <table border="1" id="proveedortipo_xls">
                    <thead>
                        <tr>
                            <th colSpan={"2"} style={{ fontWeight: 'bolder', padding: 10, fontSize: 20, }}>
                                TIPO PROVEEDOR
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
                        { proveedorTipo.arrayProveedorTipo.map(
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

ProveedorTipoXLS.propTypes = {
    proveedorTipo: PropTypes.object,
};

ProveedorTipoXLS.defaultProps = {
};

export default ProveedorTipoXLS;
