
import React from 'react';
import PropTypes from 'prop-types';

import NotaVentaCSV from './notaVentaCSV';
import NotaVentaPrint from './notaVentaPrint';
import NotaVentaXLS from './notaVentaXLS';
import NotaVentaXLSX from './notaVentaXLSX';

const NotaVentaReport = ( props ) => {

    const { archivo, notaVenta, option } = props;

    function componentReportPrint() {
        if ( option.checked.impresora ) return null;
        return (
            <>
                <NotaVentaPrint
                    notaVenta={notaVenta}
                />
            </>
        );
    }

    function componentReportXLS() {
        if ( !archivo.checked.xls ) return null;
        return (
            <NotaVentaXLS
                notaVenta={notaVenta}
            />
        );
    }

    function componentReportXLSX() {
        if ( !archivo.checked.xlsx ) return null;
        return (
            <NotaVentaXLSX
                notaVenta={ notaVenta }
            />
        );
    }

    function componentReportCSV() {
        if ( !archivo.checked.csv ) return null;
        return (
            <NotaVentaCSV
                notaVenta={ notaVenta }
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

NotaVentaReport.propTypes = {
    notaVenta: PropTypes.object,
    archivo: PropTypes.object,
    option:  PropTypes.object,
};

NotaVentaReport.defaultProps = {
};

export default NotaVentaReport;
