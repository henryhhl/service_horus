
import React from 'react';
import PropTypes from 'prop-types';

import ReactExport from 'react-data-export';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

const ProveedorCargoXLSX = ( props ) => {

    const { proveedorCargo } = props;

    const DataSet = [
        {
            columns: [
                { title: "NRO",         style: { font: { sz: "12", bold: true, } }, },
                { title: "DESCRIPCIÓN", style: { font: { sz: "12", bold: true, } }, },
            ],
            data: proveedorCargo.arrayProveedorCargo.map( ( element, key ) => [
                { value: ( key + 1 ),          style: { font: { sz: "10", } } },
                { value: element.descripcion,  style: { font: { sz: "10", } } },
            ] ),
        },
    ];

    return (
        <ExcelFile 
            filename="proveedorcargo" 
            element={
                <button type="button" id="buttonproveedorcargo_xlsx" style={ {display: 'none', } } 
                >
                    Export Data
                </button>
            }
        >
            <ExcelSheet dataSet={DataSet} name="CARGO PROVEEDOR"/>
        </ExcelFile>
    );

};

ProveedorCargoXLSX.propTypes = {
    proveedorCargo: PropTypes.object,
};

ProveedorCargoXLSX.defaultProps = {
};

export default ProveedorCargoXLSX;
