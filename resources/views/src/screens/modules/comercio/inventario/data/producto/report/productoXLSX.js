
import React from 'react';
import PropTypes from 'prop-types';

import ReactExport from 'react-data-export';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

const ProductoXLSX = ( props ) => {

    const { producto } = props;

    const DataSet = [
        {
            columns: [
                { title: "NRO",         style: { font: { sz: "12", bold: true, } }, },
                { title: "CÓDIGO", style: { font: { sz: "12", bold: true, } }, },
                { title: "NOMBRE", style: { font: { sz: "12", bold: true, } }, },
                { title: "NIVEL", style: { font: { sz: "12", bold: true, } }, },
                { title: "TIPO", style: { font: { sz: "12", bold: true, } }, },
                { title: "ORIGEN", style: { font: { sz: "12", bold: true, } }, },
                { title: "CATEGORÍA", style: { font: { sz: "12", bold: true, } }, },
                { title: "MARCA", style: { font: { sz: "12", bold: true, } }, },
                { title: "GRUPO", style: { font: { sz: "12", bold: true, } }, },
                { title: "SUB GRUPO", style: { font: { sz: "12", bold: true, } }, },
                { title: "DESCRIPCIÓN", style: { font: { sz: "12", bold: true, } }, },
            ],
            data: producto.arrayProducto.map( ( element, key ) => [
                { value: ( key + 1 ),          style: { font: { sz: "10", } } },
                { value: element.codigo ? item.codigo : "",  style: { font: { sz: "10", } } },
                { value: element.nombre,  style: { font: { sz: "10", } } },
                { value: element.nivel,  style: { font: { sz: "10", } } },
                { value: element.productotipo,  style: { font: { sz: "10", } } },
                { value: element.ciudadorigen,  style: { font: { sz: "10", } } },
                { value: element.categoria,  style: { font: { sz: "10", } } },
                { value: element.productomarca,  style: { font: { sz: "10", } } },
                { value: element.productogrupo,  style: { font: { sz: "10", } } },
                { value: element.productosubgrupo,  style: { font: { sz: "10", } } },
                { value: element.descripcion ? item.descripcion : "",  style: { font: { sz: "10", } } },
            ] ),
        },
    ];

    return (
        <ExcelFile 
            filename="producto" 
            element={
                <button type="button" id="buttonproducto_xlsx" style={ {display: 'none', } } 
                >
                    Export Data
                </button>
            }
        >
            <ExcelSheet dataSet={DataSet} name="PRODUCTO"/>
        </ExcelFile>
    );

};

ProductoXLSX.propTypes = {
    producto: PropTypes.object,
};

ProductoXLSX.defaultProps = {
};

export default ProductoXLSX;
