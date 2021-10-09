

import React from 'react';
import PropTypes from 'prop-types';

import ReactExport from 'react-data-export';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

const CiudadClasificacionXLSX = ( props ) => {

    const { ciudadClasificacion } = props;

    const DataSet = [
        {
            columns: [
                { title: "NRO",         style: { font: { sz: "12", bold: true, } }, width: { wpx: 50, } },
                { title: "DESCRIPCIÓN", style: { font: { sz: "12", bold: true, } }, width: { wpx: 120, } },
            ],
            data: ciudadClasificacion.arrayCiudadClasificacion.map( ( element, key ) => [
                { value: ( key + 1 ),         style: { font: { sz: "10", } } },
                { value: element.descripcion, style: { font: { sz: "10", } } },
            ] ),
        },
    ];

    return (
        <ExcelFile 
            filename="ciudadclasificacion" 
            element={
                <button type="button" id="buttonciudadclasificacion_xlsx" style={ {display: 'none', } } 
                >
                    Export Data
                </button>
            }
        >
            <ExcelSheet dataSet={DataSet} name="Ciudad Clasificación Reporte"/>
        </ExcelFile>
    );

};

CiudadClasificacionXLSX.propTypes = {
    ciudadClasificacion: PropTypes.object,
};

CiudadClasificacionXLSX.defaultProps = {
};

export default CiudadClasificacionXLSX;
