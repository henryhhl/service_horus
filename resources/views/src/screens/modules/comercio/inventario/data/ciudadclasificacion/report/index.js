
import React from 'react';
import PropTypes from 'prop-types';

import CiudadClasificacionPrint from './ciudadClasificacionPrint';
import CiudadClasificacionXLS from './ciudadClasificacionXLS';
import CiudadClasificacionXLSX from './ciudadClasificacionXLSX';
import CiudadClasificacionCSV from './ciudadClasificacionCSV';

const CiudadClasificacionReport = ( props ) => {

    const { archivo, ciudadClasificacion, option } = props;

    function componentReportPrint() {
        if ( option.checked.impresora ) return null;
        return (
            <>
                <CiudadClasificacionPrint
                    ciudadClasificacion={ciudadClasificacion} 
                />
            </>
        );
    }

    function componentReportXLS() {
        if ( !archivo.checked.xls ) return null;
        return (
            <CiudadClasificacionXLS 
                ciudadClasificacion={ ciudadClasificacion }
            />
        );
    }

    function componentReportXLSX() {
        if ( !archivo.checked.xlsx ) return null;
        return (
            <CiudadClasificacionXLSX 
                ciudadClasificacion={ ciudadClasificacion }
            />
        );
    }

    function componentReportCSV() {
        if ( !archivo.checked.csv ) return null;
        return (
            <CiudadClasificacionCSV 
                ciudadClasificacion={ ciudadClasificacion }
            />
        );
    }

    return (
        <>
            { componentReportPrint() }
            { componentReportXLS() }
            { componentReportXLSX() }
            { componentReportCSV() }
        </>
    );

};

CiudadClasificacionReport.propTypes = {
    ciudadClasificacion: PropTypes.object,
    archivo:             PropTypes.object,
    option:              PropTypes.object,
};

CiudadClasificacionReport.defaultProps = {
};

export default CiudadClasificacionReport;