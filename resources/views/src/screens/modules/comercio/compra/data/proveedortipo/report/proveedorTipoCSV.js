
import React from 'react';
import PropTypes from 'prop-types';

import { CSVLink } from "react-csv";

const ProveedorTipoCSV = ( props ) => {

    const { proveedorTipo } = props;

    let headers = [
        { label: "NRO",         key: "nro", },
        { label: "DESCRIPCIÓN", key: "descripcion", },
    ];

    const viewers = [];
    for (let index = 0; index < proveedorTipo.arrayProveedorTipo.length; index++) {
        const element = proveedorTipo.arrayProveedorTipo[index];
        viewers.push( {
            nro:         index + 1,
            descripcion: element.descripcion,
        } );
    }
    
    return (
        <>
            <CSVLink style={{ display: 'none', }}
                data={viewers} headers={headers} separator={";"}
                filename={"proveedortipo.csv"} id={'buttonproveedortipo_csv'}
            >
                Download
            </CSVLink>
        </>
    );
};

ProveedorTipoCSV.propTypes = {
    proveedorTipo: PropTypes.object,
};

ProveedorTipoCSV.defaultProps = {
};


export default ProveedorTipoCSV;
