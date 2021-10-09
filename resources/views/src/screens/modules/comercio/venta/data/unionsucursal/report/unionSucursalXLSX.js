
import React from 'react';
import PropTypes from 'prop-types';

import ReactExport from 'react-data-export';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

const UnionSucursalXLSX = ( props ) => {

    const { unionSucursal } = props;

    const DataSet = [
        {
            columns: [
                { title: "NRO",         style: { font: { sz: "12", bold: true, } }, },
                { title: "DESCRIPCIÓN", style: { font: { sz: "12", bold: true, } }, },
            ],
            data: unionSucursal.arrayUnionSucursal.map( ( element, key ) => [
                { value: ( key + 1 ),         style: { font: { sz: "10", } } },
                { value: element.descripcion, style: { font: { sz: "10", } } },
            ] ),
        },
    ];

    return (
        <ExcelFile 
            filename="unionsucursal" 
            element={
                <button type="button" id="buttonunionsucursal_xlsx" style={ {display: 'none', } } 
                >
                    Export Data
                </button>
            }
        >
            <ExcelSheet dataSet={DataSet} name="Unión Sucursal"/>
        </ExcelFile>
    );

};

UnionSucursalXLSX.propTypes = {
    unionSucursal: PropTypes.object,
};

UnionSucursalXLSX.defaultProps = {
};

export default UnionSucursalXLSX;
