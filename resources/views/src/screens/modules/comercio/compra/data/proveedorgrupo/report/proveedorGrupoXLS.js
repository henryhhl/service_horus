
import React from 'react';
import PropTypes from 'prop-types';

import ReactHTMLTableToExcel from 'react-html-table-to-excel';

const ProveedorGrupoXLS = ( props ) => {
    
    const { proveedorGrupo } = props;

    return (
        <>
            <div style={{ display: 'none', }}>
                <ReactHTMLTableToExcel
                    id="buttonproveedorgrupo_xls"
                    className=""
                    table="proveedorgrupo_xls"
                    filename={"proveedorgrupo"}
                    sheet="hoja 1"
                    buttonText=""
                />
                <table border="1" id="proveedorgrupo_xls">
                    <thead>
                        <tr>
                            <th colSpan={"2"} style={{ fontWeight: 'bolder', padding: 10, fontSize: 20, }}>
                                GRUPO PROVEEDOR
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
                        { proveedorGrupo.arrayProveedorGrupo.map(
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

ProveedorGrupoXLS.propTypes = {
    proveedorGrupo: PropTypes.object,
};

ProveedorGrupoXLS.defaultProps = {
};

export default ProveedorGrupoXLS;
