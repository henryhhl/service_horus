
import React from 'react';
import PropTypes from 'prop-types';

import ReactExport from 'react-data-export';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

const ComisionVentaXLSX = ( props ) => {

    const { comisionVenta } = props;

    const DataSet = [
        {
            columns: [
                { title: "NRO",         style: { font: { sz: "12", bold: true, } }, },
                { title: "DESCRIPCIÓN", style: { font: { sz: "12", bold: true, } }, },
            ],
            data: comisionVenta.arrayComisionVenta.map( ( element, key ) => [
                { value: ( key + 1 ),          style: { font: { sz: "10", } } },
                { value: element.descripcion,  style: { font: { sz: "10", } } },
            ] ),
        },
    ];

    return (
        <ExcelFile
            filename="comisionventa"
            element={
                <button type="button" id="buttoncomisionventa_xlsx" style={ {display: 'none', } }
                >
                    Export Data
                </button>
            }
        >
            <ExcelSheet dataSet={DataSet} name="COMISIÓN VENTA"/>
        </ExcelFile>
    );

};

ComisionVentaXLSX.propTypes = {
    comisionVenta: PropTypes.object,
};

ComisionVentaXLSX.defaultProps = {
};

export default ComisionVentaXLSX;
