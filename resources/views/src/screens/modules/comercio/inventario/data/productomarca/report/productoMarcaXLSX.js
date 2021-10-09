
import React from 'react';
import PropTypes from 'prop-types';

import ReactExport from 'react-data-export';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

const ProductoMarcaXLSX = ( props ) => {

    const { productoMarca } = props;

    const DataSet = [
        {
            columns: [
                { title: "NRO",         style: { font: { sz: "12", bold: true, } }, },
                { title: "BREVE",       style: { font: { sz: "12", bold: true, } }, },
                { title: "DESCRIPCIÓN", style: { font: { sz: "12", bold: true, } }, },
            ],
            data: productoMarca.arrayProductoMarca.map( ( element, key ) => [
                { value: ( key + 1 ),         style: { font: { sz: "10", } } },
                { value: element.abreviatura ? element.abreviatura : "", style: { font: { sz: "10", } } },
                { value: element.descripcion, style: { font: { sz: "10", } } },
            ] ),
        },
    ];

    return (
        <ExcelFile 
            filename="marca" 
            element={
                <button type="button" id="buttonproductomarca_xlsx" style={ {display: 'none', } } 
                >
                    Export Data
                </button>
            }
        >
            <ExcelSheet dataSet={DataSet} name="Marca Reporte"/>
        </ExcelFile>
    );

};

ProductoMarcaXLSX.propTypes = {
    productoMarca: PropTypes.object,
};

ProductoMarcaXLSX.defaultProps = {
};

export default ProductoMarcaXLSX;
