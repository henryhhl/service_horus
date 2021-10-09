
import React from 'react';
import PropTypes from 'prop-types';

import NotaIngresoCSV from './notaIngresoCSV';
import NotaIngresoPrint from './notaIngresoPrint';
import NotaIngresoXLS from './notaIngresoXLS';
import NotaIngresoXLSX from './notaIngresoXLSX';

const NotaIngresoReport = ( props ) => {

    const { archivo, notaIngreso, option } = props;

    function componentReportPrint() {
        if ( option.checked.impresora ) return null;
        return (
            <>
                <NotaIngresoPrint
                    notaIngreso={notaIngreso} 
                />
            </>
        );
    }

    function componentReportXLS() {
        if ( !archivo.checked.xls ) return null;
        return (
            <NotaIngresoXLS 
                notaIngreso={notaIngreso}
            />
        );
    }

    function componentReportXLSX() {
        if ( !archivo.checked.xlsx ) return null;
        return (
            <NotaIngresoXLSX 
                notaIngreso={ notaIngreso }
            />
        );
    }

    function componentReportCSV() {
        if ( !archivo.checked.csv ) return null;
        return (
            <NotaIngresoCSV 
                notaIngreso={ notaIngreso }
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

NotaIngresoReport.propTypes = {
    notaIngreso: PropTypes.object,
    archivo:     PropTypes.object,
    option:      PropTypes.object,
};

NotaIngresoReport.defaultProps = {
};

export default NotaIngresoReport;