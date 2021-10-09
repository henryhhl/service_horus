
import React from 'react';
import PropTypes from 'prop-types';

import ReactExport from 'react-data-export';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

const ConceptoCompraXLSX = ( props ) => {

    const { conceptoCompra } = props;

    const DataSet = [
        {
            columns: [
                { title: "NRO",         style: { font: { sz: "12", bold: true, } }, },
                { title: "DESCRIPCIÓN", style: { font: { sz: "12", bold: true, } }, },
            ],
            data: conceptoCompra.arrayConceptoCompra.map( ( element, key ) => [
                { value: ( key + 1 ),          style: { font: { sz: "10", } } },
                { value: element.descripcion,  style: { font: { sz: "10", } } },
            ] ),
        },
    ];

    return (
        <ExcelFile 
            filename="conceptocompra" 
            element={
                <button type="button" id="buttonconceptocompra_xlsx" style={ {display: 'none', } } 
                >
                    Export Data
                </button>
            }
        >
            <ExcelSheet dataSet={DataSet} name="CONCEPTO COMPRA"/>
        </ExcelFile>
    );

};

ConceptoCompraXLSX.propTypes = {
    conceptoCompra: PropTypes.object,
};

ConceptoCompraXLSX.defaultProps = {
};

export default ConceptoCompraXLSX;
