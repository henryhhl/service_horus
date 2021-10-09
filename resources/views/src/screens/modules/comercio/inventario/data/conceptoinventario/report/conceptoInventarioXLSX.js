
import React from 'react';
import PropTypes from 'prop-types';

import ReactExport from 'react-data-export';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

const ConceptoInventarioXLSX = ( props ) => {

    const { conceptoInventario } = props;

    const DataSet = [
        {
            columns: [
                { title: "NRO",         style: { font: { sz: "12", bold: true, } }, },
                { title: "DESCRIPCIÓN", style: { font: { sz: "12", bold: true, } }, },
            ],
            data: conceptoInventario.arrayConceptoInventario.map( ( element, key ) => [
                { value: ( key + 1 ),          style: { font: { sz: "10", } } },
                { value: element.descripcion,  style: { font: { sz: "10", } } },
            ] ),
        },
    ];

    return (
        <ExcelFile 
            filename="conceptoinventario" 
            element={
                <button type="button" id="buttonconceptoinventario_xlsx" style={ {display: 'none', } } 
                >
                    Export Data
                </button>
            }
        >
            <ExcelSheet dataSet={DataSet} name="CONCEPTO INVENTARIO"/>
        </ExcelFile>
    );

};

ConceptoInventarioXLSX.propTypes = {
    conceptoInventario: PropTypes.object,
};

ConceptoInventarioXLSX.defaultProps = {
};

export default ConceptoInventarioXLSX;
