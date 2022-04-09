
import React from 'react';
import PropTypes from 'prop-types';

import { CSVLink } from "react-csv";

const ActividadEconomicaCSV = ( props ) => {

    const { actividadEconomica } = props;

    let headers = [
        { label: "NRO",         key: "nro", },
        { label: "DESCRIPCIÓN", key: "descripcion", },
    ];

    const viewers = [];
    for (let index = 0; index < actividadEconomica.arrayActividadEconomica.length; index++) {
        const element = actividadEconomica.arrayActividadEconomica[index];
        viewers.push( {
            nro:         index + 1,
            descripcion: element.descripcion,
        } );
    }

    return (
        <>
            <CSVLink style={{ display: 'none', }}
                data={viewers} headers={headers} separator={";"}
                filename={"actividadeconomica.csv"} id={'buttonactividadeconomica_csv'}
            >
                Download
            </CSVLink>
        </>
    );
};

ActividadEconomicaCSV.propTypes = {
    actividadEconomica: PropTypes.object,
};

ActividadEconomicaCSV.defaultProps = {
};


export default ActividadEconomicaCSV;
