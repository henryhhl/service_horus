
import React from 'react';
import PropTypes from 'prop-types';

import SeccionInventarioCSV from './seccionInventarioCSV';
import SeccionInventarioPrint from './seccionInventarioPrint';
import SeccionInventarioXLS from './seccionInventarioXLS';
import SeccionInventarioXLSX from './seccionInventarioXLSX';

const SeccionInventarioReport = ( props ) => {

    const { archivo, seccionInventario, option } = props;

    function componentReportPrint() {
        if ( option.checked.impresora ) return null;
        return (
            <>
                <SeccionInventarioPrint
                    seccionInventario={seccionInventario} 
                />
            </>
        );
    }

    function componentReportXLS() {
        if ( !archivo.checked.xls ) return null;
        return (
            <SeccionInventarioXLS 
                seccionInventario={seccionInventario}
            />
        );
    }

    function componentReportXLSX() {
        if ( !archivo.checked.xlsx ) return null;
        return (
            <SeccionInventarioXLSX 
                seccionInventario={ seccionInventario }
            />
        );
    }

    function componentReportCSV() {
        if ( !archivo.checked.csv ) return null;
        return (
            <SeccionInventarioCSV 
                seccionInventario={ seccionInventario }
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

SeccionInventarioReport.propTypes = {
    seccionInventario: PropTypes.object,
    archivo: PropTypes.object,
    option:  PropTypes.object,
};

SeccionInventarioReport.defaultProps = {
};

export default SeccionInventarioReport;