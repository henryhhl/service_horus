
import React from 'react';
import PropTypes from 'prop-types';

import ConceptoCompraCSV from './conceptoCompraCSV';
import ConceptoCompraPrint from './conceptoCompraPrint';
import ConceptoCompraXLS from './conceptoCompraXLS';
import ConceptoCompraXLSX from './conceptoCompraXLSX';

const ConceptoCompraReport = ( props ) => {

    const { archivo, conceptoCompra, option } = props;

    function componentReportPrint() {
        if ( option.checked.impresora ) return null;
        return (
            <>
                <ConceptoCompraPrint
                    conceptoCompra={conceptoCompra} 
                />
            </>
        );
    }

    function componentReportXLS() {
        if ( !archivo.checked.xls ) return null;
        return (
            <ConceptoCompraXLS 
                conceptoCompra={conceptoCompra}
            />
        );
    }

    function componentReportXLSX() {
        if ( !archivo.checked.xlsx ) return null;
        return (
            <ConceptoCompraXLSX 
                conceptoCompra={ conceptoCompra }
            />
        );
    }

    function componentReportCSV() {
        if ( !archivo.checked.csv ) return null;
        return (
            <ConceptoCompraCSV 
                conceptoCompra={ conceptoCompra }
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

ConceptoCompraReport.propTypes = {
    conceptoCompra: PropTypes.object,
    archivo: PropTypes.object,
    option:  PropTypes.object,
};

ConceptoCompraReport.defaultProps = {
};

export default ConceptoCompraReport;