
import React from 'react';
import PropTypes from 'prop-types';

import { CSVLink } from "react-csv";

const ConceptoInventarioCSV = ( props ) => {

    const { conceptoInventario } = props;

    let headers = [
        { label: "NRO",         key: "nro", },
        { label: "DESCRIPCIÓN", key: "descripcion", },
    ];

    const viewers = [];
    for (let index = 0; index < conceptoInventario.arrayConceptoInventario.length; index++) {
        const element = conceptoInventario.arrayConceptoInventario[index];
        viewers.push( {
            nro:         index + 1,
            descripcion: element.descripcion,
        } );
    }
    
    return (
        <>
            <CSVLink style={{ display: 'none', }}
                data={viewers} headers={headers} separator={";"}
                filename={"conceptoinventario.csv"} id={'buttonconceptoinventario_csv'}
            >
                Download
            </CSVLink>
        </>
    );
};

ConceptoInventarioCSV.propTypes = {
    conceptoInventario: PropTypes.object,
};

ConceptoInventarioCSV.defaultProps = {
};


export default ConceptoInventarioCSV;
