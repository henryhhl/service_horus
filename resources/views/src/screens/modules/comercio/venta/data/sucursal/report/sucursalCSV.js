
import React from 'react';
import PropTypes from 'prop-types';

import { CSVLink } from "react-csv";

const SucursalCSV = ( props ) => {

    const { sucursal } = props;

    let headers = [
        { label: "NRO",            key: "nro", },
        { label: "DESCRIPCIÓN",    key: "descripcion", },
        { label: "DIRECCIÓN",      key: "direccion", },
        { label: "CIUDAD",         key: "ciudad", },
        { label: "UNIÓN SUCURSAL", key: "unionsucursal", },
    ];

    const viewers = [];
    for (let index = 0; index < sucursal.arraySucursal.length; index++) {
        const element = sucursal.arraySucursal[index];
        viewers.push( {
            nro:           index + 1,
            descripcion:   element.descripcion,
            direccion:     element.direccion,
            ciudad:        element.ciudad,
            unionsucursal: element.unionsucursal,
        } );
    }
    
    return (
        <>
            <CSVLink style={{ display: 'none', }}
                data={viewers} headers={headers} separator={";"}
                filename={"sucursal.csv"} id={'buttonsucursal_csv'}
            >
                Download
            </CSVLink>
        </>
    );
};

SucursalCSV.propTypes = {
    sucursal: PropTypes.object,
};

SucursalCSV.defaultProps = {
};


export default SucursalCSV;
