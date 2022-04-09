
import React from 'react';
import PropTypes from 'prop-types';

import DosificacionCSV from './dosificacionCSV';
import DosificacionPrint from './dosificacionPrint';
import DosificacionXLS from './dosificacionXLS';
import DosificacionXLSX from './dosificacionXLSX';

const DosificacionReport = ( props ) => {

    const { archivo, dosificacion, option } = props;

    function componentReportPrint() {
        if ( option.checked.impresora ) return null;
        return (
            <>
                <DosificacionPrint
                    dosificacion={dosificacion}
                />
            </>
        );
    }

    function componentReportXLS() {
        if ( !archivo.checked.xls ) return null;
        return (
            <DosificacionXLS
                dosificacion={dosificacion}
            />
        );
    }

    function componentReportXLSX() {
        if ( !archivo.checked.xlsx ) return null;
        return (
            <DosificacionXLSX
                dosificacion={ dosificacion }
            />
        );
    }

    function componentReportCSV() {
        if ( !archivo.checked.csv ) return null;
        return (
            <DosificacionCSV
                dosificacion={ dosificacion }
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

DosificacionReport.propTypes = {
    dosificacion: PropTypes.object,
    archivo: PropTypes.object,
    option:  PropTypes.object,
};

DosificacionReport.defaultProps = {
};

export default DosificacionReport;
