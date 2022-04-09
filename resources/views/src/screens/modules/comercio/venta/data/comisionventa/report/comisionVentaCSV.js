
import React from 'react';
import PropTypes from 'prop-types';

import { CSVLink } from "react-csv";

const ComisionVentaCSV = ( props ) => {

    const { comisionVenta } = props;

    let headers = [
        { label: "NRO",         key: "nro", },
        { label: "DESCRIPCIÓN", key: "descripcion", },
    ];

    const viewers = [];
    for (let index = 0; index < comisionVenta.arrayComisionVenta.length; index++) {
        const element = comisionVenta.arrayComisionVenta[index];
        viewers.push( {
            nro:         index + 1,
            descripcion: element.descripcion,
        } );
    }

    return (
        <>
            <CSVLink style={{ display: 'none', }}
                data={viewers} headers={headers} separator={";"}
                filename={"comisionventa.csv"} id={'buttoncomisionventa_csv'}
            >
                Download
            </CSVLink>
        </>
    );
};

ComisionVentaCSV.propTypes = {
    comisionVenta: PropTypes.object,
};

ComisionVentaCSV.defaultProps = {
};


export default ComisionVentaCSV;
