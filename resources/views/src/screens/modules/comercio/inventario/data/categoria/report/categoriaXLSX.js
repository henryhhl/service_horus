
import React from 'react';
import PropTypes from 'prop-types';

import ReactExport from 'react-data-export';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

const CategoriaXLSX = ( props ) => {

    const { categoria } = props;

    const DataSet = [
        {
            columns: [
                { title: "NRO",         style: { font: { sz: "12", bold: true, } }, },
                { title: "BREVE",       style: { font: { sz: "12", bold: true, } }, },
                { title: "DESCRIPCIÓN", style: { font: { sz: "12", bold: true, } }, },
            ],
            data: categoria.arrayCategoria.map( ( element, key ) => [
                { value: ( key + 1 ),         style: { font: { sz: "10", } } },
                { value: element.abreviatura ? element.abreviatura : "", style: { font: { sz: "10", } } },
                { value: element.descripcion, style: { font: { sz: "10", } } },
            ] ),
        },
    ];

    return (
        <ExcelFile 
            filename="categoria" 
            element={
                <button type="button" id="buttoncategoria_xlsx" style={ {display: 'none', } } 
                >
                    Export Data
                </button>
            }
        >
            <ExcelSheet dataSet={DataSet} name="Categoría Reporte"/>
        </ExcelFile>
    );

};

CategoriaXLSX.propTypes = {
    categoria: PropTypes.object,
};

CategoriaXLSX.defaultProps = {
};

export default CategoriaXLSX;
