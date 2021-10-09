
import React from 'react';
import PropTypes from 'prop-types';

import { CSVLink } from "react-csv";

const ProductoCSV = ( props ) => {

    const { producto } = props;

    let headers = [
        { label: "NRO",         key: "nro", },
        { label: "CÓDIGO",      key: "codigo", },
        { label: "NOMBRE",      key: "nombre", },
        { label: "NIVEL",       key: "nivel", },
        { label: "TIPO",        key: "productotipo", },
        { label: "ORIGEN",      key: "ciudadorigen", },
        { label: "CATEGORÍA",   key: "categoria", },
        { label: "MARCA",       key: "productomarca", },
        { label: "GRUPO",       key: "productogrupo", },
        { label: "SUB GRUPO",   key: "productosubgrupo", },
        { label: "DESCRIPCIÓN", key: "descripcion", },
    ];

    const viewers = [];
    for (let index = 0; index < producto.arrayProducto.length; index++) {
        const element = producto.arrayProducto[index];
        viewers.push( {
            nro:  index + 1,
            codigo: element.codigo ? element.codigo : "",
            nombre: element.nombre,
            nivel: element.nivel,
            productotipo: element.productotipo,
            ciudadorigen: element.ciudadorigen,
            categoria: element.categoria,
            productomarca: element.productomarca,
            productogrupo: element.productogrupo,
            productosubgrupo: element.productosubgrupo,
            descripcion: element.descripcion ? element.descripcion : "",
        } );
    }
    
    return (
        <>
            <CSVLink style={{ display: 'none', }}
                data={viewers} headers={headers} separator={";"}
                filename={"producto.csv"} id={'buttonproducto_csv'}
            >
                Download
            </CSVLink>
        </>
    );
};

ProductoCSV.propTypes = {
    producto: PropTypes.object,
};

ProductoCSV.defaultProps = {
};


export default ProductoCSV;
