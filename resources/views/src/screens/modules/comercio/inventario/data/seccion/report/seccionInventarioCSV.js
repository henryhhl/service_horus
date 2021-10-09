
import React from 'react';
import PropTypes from 'prop-types';

import { CSVLink } from "react-csv";

const SeccionInventarioCSV = ( props ) => {

    const { seccionInventario } = props;

    let headers = [
        { label: "NRO",         key: "nro", },
        { label: "DESCRIPCIÓN", key: "descripcion", },
    ];

    const viewers = [];
    for (let index = 0; index < seccionInventario.arraySeccionInventario.length; index++) {
        const element = seccionInventario.arraySeccionInventario[index];
        viewers.push( {
            nro:         index + 1,
            descripcion: element.descripcion,
        } );
    }
    
    return (
        <>
            <CSVLink style={{ display: 'none', }}
                data={viewers} headers={headers} separator={";"}
                filename={"seccioninventario.csv"} id={'buttonseccioninventario_csv'}
            >
                Download
            </CSVLink>
        </>
    );
};

SeccionInventarioCSV.propTypes = {
    seccionInventario: PropTypes.object,
};

SeccionInventarioCSV.defaultProps = {
};


export default SeccionInventarioCSV;
