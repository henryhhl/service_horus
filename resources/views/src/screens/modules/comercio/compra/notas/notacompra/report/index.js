
import React from 'react';
import PropTypes from 'prop-types';

import NotaCompraCSV from './notaCompraCSV';
import NotaCompraPrint from './notaCompraPrint';
import NotaCompraXLS from './notaCompraXLS';
import NotaCompraXLSX from './notaCompraXLSX';

const NotaCompraReport = ( props ) => {

    const { archivo, notaCompra, option } = props;

    function componentReportPrint() {
        if ( option.checked.impresora ) return null;
        return (
            <>
                <NotaCompraPrint
                    notaCompra={notaCompra} 
                />
            </>
        );
    }

    function componentReportXLS() {
        if ( !archivo.checked.xls ) return null;
        return (
            <NotaCompraXLS 
                notaCompra={notaCompra}
            />
        );
    }

    function componentReportXLSX() {
        if ( !archivo.checked.xlsx ) return null;
        return (
            <NotaCompraXLSX 
                notaCompra={ notaCompra }
            />
        );
    }

    function componentReportCSV() {
        if ( !archivo.checked.csv ) return null;
        return (
            <NotaCompraCSV 
                notaCompra={ notaCompra }
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

NotaCompraReport.propTypes = {
    notaCompra: PropTypes.object,
    archivo:   PropTypes.object,
    option:    PropTypes.object,
};

NotaCompraReport.defaultProps = {
};

export default NotaCompraReport;