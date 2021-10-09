
import React from 'react';
import PropTypes from 'prop-types';

import { CSVLink } from "react-csv";

const ProductoTipoCSV = ( props ) => {

    const { productoTipo } = props;

    let headers = [
        { label: "NRO",         key: "nro", },
        { label: "BREVE",       key: "abreviatura", },
        { label: "DESCRIPCIÓN", key: "descripcion", },
    ];

    const viewers = [];
    for (let index = 0; index < productoTipo.arrayProductoTipo.length; index++) {
        const element = productoTipo.arrayProductoTipo[index];
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
                filename={"productoTipo.csv"} id={'buttonproductotipo_csv'}
            >
                Download
            </CSVLink>
        </>
    );
};

ProductoTipoCSV.propTypes = {
    productoTipo: PropTypes.object,
};

ProductoTipoCSV.defaultProps = {
};


export default ProductoTipoCSV;
