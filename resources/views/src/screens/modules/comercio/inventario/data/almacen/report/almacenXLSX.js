
import React from 'react';
import PropTypes from 'prop-types';

import ReactExport from 'react-data-export';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

const AlmacenXLSX = ( props ) => {

    const { almacen } = props;

    const DataSet = [
        {
            columns: [
                { title: "NRO",         style: { font: { sz: "12", bold: true, } }, },
                { title: "BREVE",       style: { font: { sz: "12", bold: true, } }, },
                { title: "DESCRIPCIÓN", style: { font: { sz: "12", bold: true, } }, },
                { title: "DIRECCIÓN",   style: { font: { sz: "12", bold: true, } }, },
                { title: "SUCURSAL",    style: { font: { sz: "12", bold: true, } }, },
            ],
            data: almacen.arrayAlmacen.map( ( element, key ) => [
                { value: ( key + 1 ),          style: { font: { sz: "10", } } },
                { value: element.abreviatura ? element.abreviatura : "", style: { font: { sz: "10", } } },
                { value: element.descripcion,  style: { font: { sz: "10", } } },
                { value: element.direccion,    style: { font: { sz: "10", } } },
                { value: element.sucursal,     style: { font: { sz: "10", } } },
            ] ),
        },
    ];

    return (
        <ExcelFile 
            filename="almacen" 
            element={
                <button type="button" id="buttonalmacen_xlsx" style={ {display: 'none', } } 
                >
                    Export Data
                </button>
            }
        >
            <ExcelSheet dataSet={DataSet} name="ALMACEN"/>
        </ExcelFile>
    );

};

AlmacenXLSX.propTypes = {
    almacen: PropTypes.object,
};

AlmacenXLSX.defaultProps = {
};

export default AlmacenXLSX;
