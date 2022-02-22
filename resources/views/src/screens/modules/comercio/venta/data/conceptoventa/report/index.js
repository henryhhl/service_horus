
import React from 'react';
import PropTypes from 'prop-types';

import ConceptoVentaCSV from './conceptoVentaCSV';
import ConceptoVentaPrint from './conceptoVentaPrint';
import ConceptoVentaXLS from './conceptoVentaXLS';
import ConceptoVentaXLSX from './conceptoVentaXLSX';

const ConceptoVentaReport = ( props ) => {

    const { archivo, conceptoVenta, option } = props;

    function componentReportPrint() {
        if ( option.checked.impresora ) return null;
        return (
            <>
                <ConceptoVentaPrint
                    conceptoVenta={conceptoVenta}
                />
            </>
        );
    }

    function componentReportXLS() {
        if ( !archivo.checked.xls ) return null;
        return (
            <ConceptoVentaXLS
                conceptoVenta={conceptoVenta}
            />
        );
    }

    function componentReportXLSX() {
        if ( !archivo.checked.xlsx ) return null;
        return (
            <ConceptoVentaXLSX
                conceptoVenta={ conceptoVenta }
            />
        );
    }

    function componentReportCSV() {
        if ( !archivo.checked.csv ) return null;
        return (
            <ConceptoVentaCSV
                conceptoVenta={ conceptoVenta }
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

ConceptoVentaReport.propTypes = {
    conceptoVenta: PropTypes.object,
    archivo: PropTypes.object,
    option:  PropTypes.object,
};

ConceptoVentaReport.defaultProps = {
};

export default ConceptoVentaReport;
