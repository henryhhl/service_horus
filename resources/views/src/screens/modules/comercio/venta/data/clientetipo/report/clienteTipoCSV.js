
import React from 'react';
import PropTypes from 'prop-types';

import { CSVLink } from "react-csv";

const ClienteTipoCSV = ( props ) => {

    const { clienteTipo } = props;

    let headers = [
        { label: "NRO",         key: "nro", },
        { label: "DESCRIPCIÓN", key: "descripcion", },
    ];

    const viewers = [];
    for (let index = 0; index < clienteTipo.arrayClienteTipo.length; index++) {
        const element = clienteTipo.arrayClienteTipo[index];
        viewers.push( {
            nro:         index + 1,
            descripcion: element.descripcion,
        } );
    }
    
    return (
        <>
            <CSVLink style={{ display: 'none', }}
                data={viewers} headers={headers} separator={";"}
                filename={"clientetipo.csv"} id={'buttonclientetipo_csv'}
            >
                Download
            </CSVLink>
        </>
    );
};

ClienteTipoCSV.propTypes = {
    clienteTipo: PropTypes.object,
};

ClienteTipoCSV.defaultProps = {
};


export default ClienteTipoCSV;
