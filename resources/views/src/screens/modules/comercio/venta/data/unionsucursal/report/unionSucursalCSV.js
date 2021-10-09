
import React from 'react';
import PropTypes from 'prop-types';

import { CSVLink } from "react-csv";

const UnionSucursalCSV = ( props ) => {

    const { unionSucursal } = props;

    let headers = [
        { label: "NRO",         key: "nro", },
        { label: "DESCRIPCIÓN", key: "descripcion", },
    ];

    const viewers = [];
    for (let index = 0; index < unionSucursal.arrayUnionSucursal.length; index++) {
        const element = unionSucursal.arrayUnionSucursal[index];
        viewers.push( {
            nro:         index + 1,
            descripcion: element.descripcion,
        } );
    }
    
    return (
        <>
            <CSVLink style={{ display: 'none', }}
                data={viewers} headers={headers} separator={";"}
                filename={"unionsucursal.csv"} id={'buttonunionsucursal_csv'}
            >
                Download
            </CSVLink>
        </>
    );
};

UnionSucursalCSV.propTypes = {
    unionSucursal: PropTypes.object,
};

UnionSucursalCSV.defaultProps = {
};


export default UnionSucursalCSV;
