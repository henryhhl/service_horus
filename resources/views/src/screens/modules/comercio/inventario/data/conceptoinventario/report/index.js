
import React from 'react';
import PropTypes from 'prop-types';

import ConceptoInventarioCSV from './conceptoInventarioCSV';
import ConceptoInventarioPrint from './conceptoInventarioPrint';
import ConceptoInventarioXLS from './conceptoInventarioXLS';
import ConceptoInventarioXLSX from './conceptoInventarioXLSX';

const ConceptoInventarioReport = ( props ) => {

    const { archivo, conceptoInventario, option } = props;

    function componentReportPrint() {
        if ( option.checked.impresora ) return null;
        return (
            <>
                <ConceptoInventarioPrint
                    conceptoInventario={conceptoInventario} 
                />
            </>
        );
    }

    function componentReportXLS() {
        if ( !archivo.checked.xls ) return null;
        return (
            <ConceptoInventarioXLS 
                conceptoInventario={conceptoInventario}
            />
        );
    }

    function componentReportXLSX() {
        if ( !archivo.checked.xlsx ) return null;
        return (
            <ConceptoInventarioXLSX 
                conceptoInventario={ conceptoInventario }
            />
        );
    }

    function componentReportCSV() {
        if ( !archivo.checked.csv ) return null;
        return (
            <ConceptoInventarioCSV 
                conceptoInventario={ conceptoInventario }
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

ConceptoInventarioReport.propTypes = {
    conceptoInventario: PropTypes.object,
    archivo: PropTypes.object,
    option:  PropTypes.object,
};

ConceptoInventarioReport.defaultProps = {
};

export default ConceptoInventarioReport;