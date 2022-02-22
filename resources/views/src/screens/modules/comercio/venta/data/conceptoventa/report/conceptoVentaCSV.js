
import React from 'react';
import PropTypes from 'prop-types';

import { CSVLink } from "react-csv";

const ConceptoVentaCSV = ( props ) => {

    const { conceptoVenta } = props;

    let headers = [
        { label: "NRO",         key: "nro", },
        { label: "DESCRIPCIÓN", key: "descripcion", },
    ];

    const viewers = [];
    for (let index = 0; index < conceptoVenta.arrayConceptoVenta.length; index++) {
        const element = conceptoVenta.arrayConceptoVenta[index];
        viewers.push( {
            nro:         index + 1,
            descripcion: element.descripcion,
        } );
    }

    return (
        <>
            <CSVLink style={{ display: 'none', }}
                data={viewers} headers={headers} separator={";"}
                filename={"conceptoventa.csv"} id={'buttonconceptoventa_csv'}
            >
                Download
            </CSVLink>
        </>
    );
};

ConceptoVentaCSV.propTypes = {
    conceptoVenta: PropTypes.object,
};

ConceptoVentaCSV.defaultProps = {
};


export default ConceptoVentaCSV;
