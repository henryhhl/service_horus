
import React from 'react';
import PropTypes from 'prop-types';

import { CSVLink } from "react-csv";

const ProveedorCargoCSV = ( props ) => {

    const { proveedorCargo } = props;

    let headers = [
        { label: "NRO",         key: "nro", },
        { label: "DESCRIPCIÓN", key: "descripcion", },
    ];

    const viewers = [];
    for (let index = 0; index < proveedorCargo.arrayProveedorCargo.length; index++) {
        const element = proveedorCargo.arrayProveedorCargo[index];
        viewers.push( {
            nro:         index + 1,
            descripcion: element.descripcion,
        } );
    }
    
    return (
        <>
            <CSVLink style={{ display: 'none', }}
                data={viewers} headers={headers} separator={";"}
                filename={"proveedorcargo.csv"} id={'buttonproveedorcargo_csv'}
            >
                Download
            </CSVLink>
        </>
    );
};

ProveedorCargoCSV.propTypes = {
    proveedorCargo: PropTypes.object,
};

ProveedorCargoCSV.defaultProps = {
};


export default ProveedorCargoCSV;
