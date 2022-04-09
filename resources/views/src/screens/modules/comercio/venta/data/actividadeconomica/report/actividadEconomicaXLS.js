
import React from 'react';
import PropTypes from 'prop-types';

import ReactHTMLTableToExcel from 'react-html-table-to-excel';

const ActividadEconomicaXLS = ( props ) => {

    const { actividadEconomica } = props;

    return (
        <>
            <div style={{ display: 'none', }}>
                <ReactHTMLTableToExcel
                    id="buttonactividadeconomica_xls"
                    className=""
                    table="actividadeconomica_xls"
                    filename={"actividadeconomica"}
                    sheet="ACTIVIDAD ECONÓMICA"
                    buttonText=""
                />
                <table border="1" id="actividadeconomica_xls">
                    <thead>
                        <tr>
                            <th colSpan={"2"} style={{ fontWeight: 'bolder', padding: 10, fontSize: 20, }}>
                                ACTIVIDAD ECONÓMICA
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
                        { actividadEconomica.arrayActividadEconomica.map(
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

ActividadEconomicaXLS.propTypes = {
    actividadEconomica: PropTypes.object,
};

ActividadEconomicaXLS.defaultProps = {
};

export default ActividadEconomicaXLS;
