
import React from 'react';
import PropTypes from 'prop-types';

import ReactExport from 'react-data-export';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

const ActividadEconomicaXLSX = ( props ) => {

    const { actividadEconomica } = props;

    const DataSet = [
        {
            columns: [
                { title: "NRO",         style: { font: { sz: "12", bold: true, } }, },
                { title: "DESCRIPCIÓN", style: { font: { sz: "12", bold: true, } }, },
            ],
            data: actividadEconomica.arrayActividadEconomica.map( ( element, key ) => [
                { value: ( key + 1 ),          style: { font: { sz: "10", } } },
                { value: element.descripcion,  style: { font: { sz: "10", } } },
            ] ),
        },
    ];

    return (
        <ExcelFile
            filename="actividadeconomica"
            element={
                <button type="button" id="buttonactividadeconomica_xlsx" style={ {display: 'none', } }
                >
                    Export Data
                </button>
            }
        >
            <ExcelSheet dataSet={DataSet} name="ACTIVIDAD ECONÓMICA"/>
        </ExcelFile>
    );

};

ActividadEconomicaXLSX.propTypes = {
    actividadEconomica: PropTypes.object,
};

ActividadEconomicaXLSX.defaultProps = {
};

export default ActividadEconomicaXLSX;
