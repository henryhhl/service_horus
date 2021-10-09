
import React from 'react';
import PropTypes from 'prop-types';

import { CSVLink } from "react-csv";

const AlmacenCSV = ( props ) => {

    const { almacen } = props;

    let headers = [
        { label: "NRO",         key: "nro", },
        { label: "BREVE",       key: "abreviatura", },
        { label: "DESCRIPCIÓN", key: "descripcion", },
        { label: "DIRECCIÓN",   key: "direccion", },
        { label: "SUCURSAL",    key: "sucursal", },
    ];

    const viewers = [];
    for (let index = 0; index < almacen.arrayAlmacen.length; index++) {
        const element = almacen.arrayAlmacen[index];
        viewers.push( {
            nro:         index + 1,
            abreviatura: element.abreviatura,
            descripcion: element.descripcion,
            direccion:   element.direccion,
            sucursal:    element.sucursal,
        } );
    }
    
    return (
        <>
            <CSVLink style={{ display: 'none', }}
                data={viewers} headers={headers} separator={";"}
                filename={"almacen.csv"} id={'buttonalmacen_csv'}
            >
                Download
            </CSVLink>
        </>
    );
};

AlmacenCSV.propTypes = {
    almacen: PropTypes.object,
};

AlmacenCSV.defaultProps = {
};


export default AlmacenCSV;
