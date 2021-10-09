
import React from 'react';
import PropTypes from 'prop-types';

import ReactExport from 'react-data-export';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

const ProveedorGrupoXLSX = ( props ) => {

    const { proveedorGrupo } = props;

    const DataSet = [
        {
            columns: [
                { title: "NRO",         style: { font: { sz: "12", bold: true, } }, },
                { title: "DESCRIPCIÓN", style: { font: { sz: "12", bold: true, } }, },
            ],
            data: proveedorGrupo.arrayProveedorGrupo.map( ( element, key ) => [
                { value: ( key + 1 ),          style: { font: { sz: "10", } } },
                { value: element.descripcion,  style: { font: { sz: "10", } } },
            ] ),
        },
    ];

    return (
        <ExcelFile 
            filename="proveedorgrupo" 
            element={
                <button type="button" id="buttonproveedorgrupo_xlsx" style={ {display: 'none', } } 
                >
                    Export Data
                </button>
            }
        >
            <ExcelSheet dataSet={DataSet} name="GRUPO PROVEEDOR"/>
        </ExcelFile>
    );

};

ProveedorGrupoXLSX.propTypes = {
    proveedorGrupo: PropTypes.object,
};

ProveedorGrupoXLSX.defaultProps = {
};

export default ProveedorGrupoXLSX;
