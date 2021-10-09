
import React from 'react';
import PropTypes from 'prop-types';

import { CSVLink } from "react-csv";

const ProductoMarcaCSV = ( props ) => {

    const { productoMarca } = props;

    let headers = [
        { label: "NRO",         key: "nro", },
        { label: "BREVE",       key: "abreviatura", },
        { label: "DESCRIPCIÓN", key: "descripcion", },
    ];

    const viewers = [];
    for (let index = 0; index < productoMarca.arrayProductoMarca.length; index++) {
        const element = productoMarca.arrayProductoMarca[index];
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
                filename={"marca.csv"} id={'buttonproductomarca_csv'}
            >
                Download
            </CSVLink>
        </>
    );
};

ProductoMarcaCSV.propTypes = {
    productoMarca: PropTypes.object,
};

ProductoMarcaCSV.defaultProps = {
};


export default ProductoMarcaCSV;
