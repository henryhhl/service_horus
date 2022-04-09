
import React from 'react';
import PropTypes from 'prop-types';

import ComisionVentaCSV from './comisionVentaCSV';
import ComisionVentaPrint from './comisionVentaPrint';
import ComisionVentaXLS from './comisionVentaXLS';
import ComisionVentaXLSX from './comisionVentaXLSX';

const ComisionVentaReport = ( props ) => {

    const { archivo, comisionVenta, option } = props;

    function componentReportPrint() {
        if ( option.checked.impresora ) return null;
        return (
            <>
                <ComisionVentaPrint
                    comisionVenta={comisionVenta}
                />
            </>
        );
    }

    function componentReportXLS() {
        if ( !archivo.checked.xls ) return null;
        return (
            <ComisionVentaXLS
                comisionVenta={comisionVenta}
            />
        );
    }

    function componentReportXLSX() {
        if ( !archivo.checked.xlsx ) return null;
        return (
            <ComisionVentaXLSX
                comisionVenta={ comisionVenta }
            />
        );
    }

    function componentReportCSV() {
        if ( !archivo.checked.csv ) return null;
        return (
            <ComisionVentaCSV
                comisionVenta={ comisionVenta }
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

ComisionVentaReport.propTypes = {
    comisionVenta: PropTypes.object,
    archivo: PropTypes.object,
    option:  PropTypes.object,
};

ComisionVentaReport.defaultProps = {
};

export default ComisionVentaReport;
