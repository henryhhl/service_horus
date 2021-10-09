
import React from 'react';
import PropTypes from 'prop-types';

import { CSVLink } from "react-csv";

const ProductoSubGrupoCSV = ( props ) => {

    const { productoSubGrupo } = props;

    let headers = [
        { label: "NRO",         key: "nro", },
        { label: "BREVE",       key: "abreviatura", },
        { label: "DESCRIPCIÓN", key: "descripcion", },
        { label: "GRUPO",       key: "productogrupo", },
    ];

    const viewers = [];
    for (let index = 0; index < productoSubGrupo.arrayProductoSubGrupo.length; index++) {
        const element = productoSubGrupo.arrayProductoGrupo[index];
        viewers.push( {
            nro:           index + 1,
            abreviatura:   element.abreviatura,
            descripcion:   element.descripcion,
            productogrupo: element.productogrupo,
        } );
    }
    
    return (
        <>
            <CSVLink style={{ display: 'none', }}
                data={viewers} headers={headers} separator={";"}
                filename={"productoSubGrupo.csv"} id={'buttonproductosubgrupo_csv'}
            >
                Download
            </CSVLink>
        </>
    );
};

ProductoSubGrupoCSV.propTypes = {
    productoSubGrupo: PropTypes.object,
};

ProductoSubGrupoCSV.defaultProps = {
};


export default ProductoSubGrupoCSV;
