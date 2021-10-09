
import React from 'react';
import PropTypes from 'prop-types';

import { CSVLink } from "react-csv";

const ConceptoCompraCSV = ( props ) => {

    const { conceptoCompra } = props;

    let headers = [
        { label: "NRO",         key: "nro", },
        { label: "DESCRIPCIÓN", key: "descripcion", },
    ];

    const viewers = [];
    for (let index = 0; index < conceptoCompra.arrayConceptoCompra.length; index++) {
        const element = conceptoCompra.arrayConceptoCompra[index];
        viewers.push( {
            nro:         index + 1,
            descripcion: element.descripcion,
        } );
    }
    
    return (
        <>
            <CSVLink style={{ display: 'none', }}
                data={viewers} headers={headers} separator={";"}
                filename={"conceptocompra.csv"} id={'buttonconceptocompra_csv'}
            >
                Download
            </CSVLink>
        </>
    );
};

ConceptoCompraCSV.propTypes = {
    conceptoCompra: PropTypes.object,
};

ConceptoCompraCSV.defaultProps = {
};


export default ConceptoCompraCSV;
