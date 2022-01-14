
import React from 'react';
import PropTypes from 'prop-types';

import ReactHTMLTableToExcel from 'react-html-table-to-excel';

const ClienteTipoXLS = ( props ) => {
    
    const { clienteTipo } = props;

    return (
        <>
            <div style={{ display: 'none', }}>
                <ReactHTMLTableToExcel
                    id="buttonclientetipo_xls"
                    className=""
                    table="clientetipo_xls"
                    filename={"clientetipo"}
                    sheet="TIPO CLIENTE"
                    buttonText=""
                />
                <table border="1" id="clientetipo_xls">
                    <thead>
                        <tr>
                            <th colSpan={"2"} style={{ fontWeight: 'bolder', padding: 10, fontSize: 20, }}>
                                TIPO CLIENTE
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
                        { clienteTipo.arrayClienteTipo.map(
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

ClienteTipoXLS.propTypes = {
    clienteTipo: PropTypes.object,
};

ClienteTipoXLS.defaultProps = {
};

export default ClienteTipoXLS;
