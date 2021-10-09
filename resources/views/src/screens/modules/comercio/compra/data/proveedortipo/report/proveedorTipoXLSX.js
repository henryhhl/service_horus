
import React from 'react';
import PropTypes from 'prop-types';

import ReactExport from 'react-data-export';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

const ProveedorTipoXLSX = ( props ) => {

    const { proveedorTipo } = props;

    const DataSet = [
        {
            columns: [
                { title: "NRO",         style: { font: { sz: "12", bold: true, } }, },
                { title: "DESCRIPCIÓN", style: { font: { sz: "12", bold: true, } }, },
            ],
            data: proveedorTipo.arrayProveedorTipo.map( ( element, key ) => [
                { value: ( key + 1 ),          style: { font: { sz: "10", } } },
                { value: element.descripcion,  style: { font: { sz: "10", } } },
            ] ),
        },
    ];

    return (
        <ExcelFile 
            filename="proveedortipo" 
            element={
                <button type="button" id="buttonproveedortipo_xlsx" style={ {display: 'none', } } 
                >
                    Export Data
                </button>
            }
        >
            <ExcelSheet dataSet={DataSet} name="TIPO PROVEEDOR"/>
        </ExcelFile>
    );

};

ProveedorTipoXLSX.propTypes = {
    proveedorTipo: PropTypes.object,
};

ProveedorTipoXLSX.defaultProps = {
};

export default ProveedorTipoXLSX;
