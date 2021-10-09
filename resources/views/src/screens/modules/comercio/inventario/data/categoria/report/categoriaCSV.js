
import React from 'react';
import PropTypes from 'prop-types';

import { CSVLink } from "react-csv";

const CategoriaCSV = ( props ) => {

    const { categoria } = props;

    let headers = [
        { label: "NRO",         key: "nro", },
        { label: "BREVE",       key: "abreviatura", },
        { label: "DESCRIPCIÓN", key: "descripcion", },
    ];

    const viewers = [];
    for (let index = 0; index < categoria.arrayCategoria.length; index++) {
        const element = categoria.arrayCategoria[index];
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
                filename={"categoria.csv"} id={'buttoncategoria_csv'}
            >
                Download
            </CSVLink>
        </>
    );
};

CategoriaCSV.propTypes = {
    categoria: PropTypes.object,
};

CategoriaCSV.defaultProps = {
};


export default CategoriaCSV;
