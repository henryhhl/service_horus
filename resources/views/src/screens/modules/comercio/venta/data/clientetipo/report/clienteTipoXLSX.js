
import React from 'react';
import PropTypes from 'prop-types';

import ReactExport from 'react-data-export';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

const ClienteTipoXLSX = ( props ) => {

    const { clienteTipo } = props;

    const DataSet = [
        {
            columns: [
                { title: "NRO",         style: { font: { sz: "12", bold: true, } }, },
                { title: "DESCRIPCIÓN", style: { font: { sz: "12", bold: true, } }, },
            ],
            data: clienteTipo.arrayClienteTipo.map( ( element, key ) => [
                { value: ( key + 1 ),          style: { font: { sz: "10", } } },
                { value: element.descripcion,  style: { font: { sz: "10", } } },
            ] ),
        },
    ];

    return (
        <ExcelFile 
            filename="clientetipo" 
            element={
                <button type="button" id="buttonclientetipo_xlsx" style={ {display: 'none', } } 
                >
                    Export Data
                </button>
            }
        >
            <ExcelSheet dataSet={DataSet} name="TIPO CLIENTE"/>
        </ExcelFile>
    );

};

ClienteTipoXLSX.propTypes = {
    clienteTipo: PropTypes.object,
};

ClienteTipoXLSX.defaultProps = {
};

export default ClienteTipoXLSX;
