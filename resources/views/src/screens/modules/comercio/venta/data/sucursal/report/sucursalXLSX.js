
import React from 'react';
import PropTypes from 'prop-types';

import ReactExport from 'react-data-export';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

const SucursalXLSX = ( props ) => {

    const { sucursal } = props;

    const DataSet = [
        {
            columns: [
                { title: "NRO",            style: { font: { sz: "12", bold: true, } }, },
                { title: "DESCRIPCIÓN",    style: { font: { sz: "12", bold: true, } }, },
                { title: "DIRECCIÓN",      style: { font: { sz: "12", bold: true, } }, },
                { title: "CIUDAD",         style: { font: { sz: "12", bold: true, } }, },
                { title: "UNIÓN SUCURSAL", style: { font: { sz: "12", bold: true, } }, },
            ],
            data: unionSucursal.arrayUnionSucursal.map( ( element, key ) => [
                { value: ( key + 1 ),         style: { font: { sz: "10", } } },
                { value: element.descripcion, style: { font: { sz: "10", } } },
                { value: element.direccion,   style: { font: { sz: "10", } } },
                { value: element.ciudad,      style: { font: { sz: "10", } } },
                { value: element.unionsucursal, style: { font: { sz: "10", } } },
            ] ),
        },
    ];

    return (
        <ExcelFile 
            filename="sucursal" 
            element={
                <button type="button" id="buttonsucursal_xlsx" style={ {display: 'none', } } 
                >
                    Export Data
                </button>
            }
        >
            <ExcelSheet dataSet={DataSet} name="sucursal"/>
        </ExcelFile>
    );

};

SucursalXLSX.propTypes = {
    sucursal: PropTypes.object,
};

SucursalXLSX.defaultProps = {
};

export default SucursalXLSX;
