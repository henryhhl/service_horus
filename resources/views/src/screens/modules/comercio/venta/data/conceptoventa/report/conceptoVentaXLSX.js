
import React from 'react';
import PropTypes from 'prop-types';

import ReactExport from 'react-data-export';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

const ConceptoVentaXLSX = ( props ) => {

    const { conceptoVenta } = props;

    const DataSet = [
        {
            columns: [
                { title: "NRO",         style: { font: { sz: "12", bold: true, } }, },
                { title: "DESCRIPCIÓN", style: { font: { sz: "12", bold: true, } }, },
            ],
            data: conceptoVenta.arrayConceptoVenta.map( ( element, key ) => [
                { value: ( key + 1 ),          style: { font: { sz: "10", } } },
                { value: element.descripcion,  style: { font: { sz: "10", } } },
            ] ),
        },
    ];

    return (
        <ExcelFile
            filename="conceptoventa"
            element={
                <button type="button" id="buttonconceptoventa_xlsx" style={ {display: 'none', } }
                >
                    Export Data
                </button>
            }
        >
            <ExcelSheet dataSet={DataSet} name="CONCEPTO VENTA"/>
        </ExcelFile>
    );

};

ConceptoVentaXLSX.propTypes = {
    conceptoVenta: PropTypes.object,
};

ConceptoVentaXLSX.defaultProps = {
};

export default ConceptoVentaXLSX;
