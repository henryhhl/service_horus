
import React from 'react';
import PropTypes from 'prop-types';

import OrdenCompraCSV from './ordenCompraCSV';
import OrdenCompraPrint from './ordenCompraPrint';
import OrdenCompraXLS from './ordenCompraXLS';
import OrdenCompraXLSX from './ordenCompraXLSX';

const OrdenCompraReport = ( props ) => {

    const { archivo, ordenCompra, option } = props;

    function componentReportPrint() {
        if ( option.checked.impresora ) return null;
        return (
            <>
                <OrdenCompraPrint
                    ordenCompra={ordenCompra} 
                />
            </>
        );
    }

    function componentReportXLS() {
        if ( !archivo.checked.xls ) return null;
        return (
            <OrdenCompraXLS 
                ordenCompra={ordenCompra}
            />
        );
    }

    function componentReportXLSX() {
        if ( !archivo.checked.xlsx ) return null;
        return (
            <OrdenCompraXLSX 
                ordenCompra={ ordenCompra }
            />
        );
    }

    function componentReportCSV() {
        if ( !archivo.checked.csv ) return null;
        return (
            <OrdenCompraCSV 
                ordenCompra={ ordenCompra }
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

OrdenCompraReport.propTypes = {
    ordenCompra: PropTypes.object,
    archivo:   PropTypes.object,
    option:    PropTypes.object,
};

OrdenCompraReport.defaultProps = {
};

export default OrdenCompraReport;