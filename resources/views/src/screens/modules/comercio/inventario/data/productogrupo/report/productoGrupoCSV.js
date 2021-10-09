
import React from 'react';
import PropTypes from 'prop-types';

import { CSVLink } from "react-csv";

const ProductoGrupoCSV = ( props ) => {

    const { productoGrupo } = props;

    let headers = [
        { label: "NRO",         key: "nro", },
        { label: "BREVE",       key: "abreviatura", },
        { label: "DESCRIPCIÓN", key: "descripcion", },
    ];

    const viewers = [];
    for (let index = 0; index < productoGrupo.arrayProductoGrupo.length; index++) {
        const element = productoGrupo.arrayProductoGrupo[index];
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
                filename={"productoGrupo.csv"} id={'buttonproductogrupo_csv'}
            >
                Download
            </CSVLink>
        </>
    );
};

ProductoGrupoCSV.propTypes = {
    productoGrupo: PropTypes.object,
};

ProductoGrupoCSV.defaultProps = {
};


export default ProductoGrupoCSV;
