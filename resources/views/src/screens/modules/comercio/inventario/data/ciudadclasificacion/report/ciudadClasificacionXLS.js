
import React from 'react';
import PropTypes from 'prop-types';

import ReactHTMLTableToExcel from 'react-html-table-to-excel';

const CiudadClasificacionXLS = ( props ) => {
    
    const { ciudadClasificacion } = props;

    return (
        <>
            <div style={{ display: 'none', }}>
                <ReactHTMLTableToExcel
                    id="buttonciudadclasificacion_xls"
                    className=""
                    table="ciudadclasificacion_xls"
                    filename={"ciudadclasificacion"}
                    sheet="hoja 1"
                    buttonText=""
                />
                <table border="1" id="ciudadclasificacion_xls">
                    <thead>
                        <tr>
                            <th colSpan={"2"} style={{ fontWeight: 'bolder', padding: 10, fontSize: 20, }}>
                                CIUDAD CLASIFICACIÓN
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
                        { ciudadClasificacion.arrayCiudadClasificacion.map(
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

CiudadClasificacionXLS.propTypes = {
    ciudadClasificacion: PropTypes.object,
};

CiudadClasificacionXLS.defaultProps = {
};

export default CiudadClasificacionXLS;
