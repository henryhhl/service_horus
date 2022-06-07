
import React from 'react';
import PropTypes from 'prop-types';

import DevolucionNotaVentaCSV from './devolucionNotaVentaCSV';
import DevolucionNotaVentaPrint from './devolucionNotaVentaPrint';
import DevolucionNotaVentaXLS from './devolucionNotaVentaXLSX';
import DevolucionNotaVentaXLSX from './devolucionNotaVentaXLSX';

const DevolucionNotaVentaReport = ( props ) => {

    const { archivo, devolucionNotaVenta, option } = props;

    function componentReportPrint() {
        if ( option.checked.impresora ) return null;
        return (
            <>
                <DevolucionNotaVentaPrint
                    devolucionNotaVenta={devolucionNotaVenta}
                />
            </>
        );
    }

    function componentReportXLS() {
        if ( !archivo.checked.xls ) return null;
        return (
            <DevolucionNotaVentaXLS
                devolucionNotaVenta={devolucionNotaVenta}
            />
        );
    }

    function componentReportXLSX() {
        if ( !archivo.checked.xlsx ) return null;
        return (
            <DevolucionNotaVentaXLSX
                devolucionNotaVenta={ devolucionNotaVenta }
            />
        );
    }

    function componentReportCSV() {
        if ( !archivo.checked.csv ) return null;
        return (
            <DevolucionNotaVentaCSV
                devolucionNotaVenta={ devolucionNotaVenta }
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

DevolucionNotaVentaReport.propTypes = {
    devolucionNotaVenta: PropTypes.object,
    archivo: PropTypes.object,
    option:  PropTypes.object,
};

DevolucionNotaVentaReport.defaultProps = {
};

export default DevolucionNotaVentaReport;
