
import React from 'react';
import PropTypes from 'prop-types';

import { CSVLink } from "react-csv";

const CiudadClasificacionCSV = ( props ) => {

    const { ciudadClasificacion } = props;

    let headers = [
        { label: "NRO",         key: "nro", },
        { label: "DESCRIPCIÓN", key: "descripcion", },
    ];

    const viewers = [];
    for (let index = 0; index < ciudadClasificacion.arrayCiudadClasificacion.length; index++) {
        const element = ciudadClasificacion.arrayCiudadClasificacion[index];
        viewers.push( {
            nro:         index + 1,
            descripcion: element.descripcion,
        } );
    }
    
    return (
        <>
            <CSVLink style={{ display: 'none', }}
                data={viewers} headers={headers} separator={";"}
                filename={"ciudadclasificacion.csv"} id={'buttonciudadclasificacion_csv'}
            >
                Download
            </CSVLink>
        </>
    );
};

CiudadClasificacionCSV.propTypes = {
    ciudadClasificacion: PropTypes.object,
};

CiudadClasificacionCSV.defaultProps = {
};


export default CiudadClasificacionCSV;
