
import React from 'react';
import PropTypes from 'prop-types';

import DevolucionCompraCSV from './devolucionCompraCSV';
import DevolucionCompraPrint from './devolucionCompraPrint';
import DevolucionCompraXLS from './devolucionCompraXLS';
import DevolucionCompraXLSX from './devolucionCompraXLSX';

const DevolucionCompraReport = ( props ) => {

    const { archivo, devolucionCompra, option } = props;

    function componentReportPrint() {
        if ( option.checked.impresora ) return null;
        return (
            <>
                <DevolucionCompraPrint
                    devolucionCompra={devolucionCompra} 
                />
            </>
        );
    }

    function componentReportXLS() {
        if ( !archivo.checked.xls ) return null;
        return (
            <DevolucionCompraXLS 
                devolucionCompra={devolucionCompra}
            />
        );
    }

    function componentReportXLSX() {
        if ( !archivo.checked.xlsx ) return null;
        return (
            <DevolucionCompraXLSX 
                devolucionCompra={ devolucionCompra }
            />
        );
    }

    function componentReportCSV() {
        if ( !archivo.checked.csv ) return null;
        return (
            <DevolucionCompraCSV 
                devolucionCompra={ devolucionCompra }
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

DevolucionCompraReport.propTypes = {
    devolucionCompra: PropTypes.object,
    archivo:   PropTypes.object,
    option:    PropTypes.object,
};

DevolucionCompraReport.defaultProps = {
};

export default DevolucionCompraReport;