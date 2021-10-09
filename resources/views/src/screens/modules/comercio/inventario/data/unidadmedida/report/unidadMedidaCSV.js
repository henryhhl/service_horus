
import React from 'react';
import PropTypes from 'prop-types';

import { CSVLink } from "react-csv";

const UnidadMedidaCSV = ( props ) => {

    const { unidadMedida } = props;

    let headers = [
        { label: "NRO",         key: "nro", },
        { label: "BREVE",       key: "abreviatura", },
        { label: "DESCRIPCIÓN", key: "descripcion", },
    ];

    const viewers = [];
    for (let index = 0; index < unidadMedida.arrayUnidadMedida.length; index++) {
        const element = unidadMedida.arrayUnidadMedida[index];
        viewers.push( {
            nro:         index + 1,
            abreviatura: element.abreviatura,
            descripcion: element.descripcion,
        } );
    }
    
    return (
        <>
            <CSVLink style={{ display: 'none', }}
                data={viewers} headers={headers} separator={";"}
                filename={"unidadMedida.csv"} id={'buttonunidadmedida_csv'}
            >
                Download
            </CSVLink>
        </>
    );
};

UnidadMedidaCSV.propTypes = {
    unidadMedida: PropTypes.object,
};

UnidadMedidaCSV.defaultProps = {
};


export default UnidadMedidaCSV;
