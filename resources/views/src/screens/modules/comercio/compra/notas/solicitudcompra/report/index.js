
import React from 'react';
import PropTypes from 'prop-types';

import SolicitudCompraCSV from './solicitudCompraCSV';
import SolicitudCompraPrint from './solicitudCompraPrint';
import SolicitudCompraXLS from './solicitudCompraXLS';
import SolicitudCompraXLSX from './solicitudCompraXLSX';

const SolicitudCompraReport = ( props ) => {

    const { archivo, solicitudCompra, option } = props;

    function componentReportPrint() {
        if ( option.checked.impresora ) return null;
        return (
            <>
                <SolicitudCompraPrint
                    solicitudCompra={solicitudCompra} 
                />
            </>
        );
    }

    function componentReportXLS() {
        if ( !archivo.checked.xls ) return null;
        return (
            <SolicitudCompraXLS 
                solicitudCompra={solicitudCompra}
            />
        );
    }

    function componentReportXLSX() {
        if ( !archivo.checked.xlsx ) return null;
        return (
            <SolicitudCompraXLSX 
                solicitudCompra={ solicitudCompra }
            />
        );
    }

    function componentReportCSV() {
        if ( !archivo.checked.csv ) return null;
        return (
            <SolicitudCompraCSV 
                solicitudCompra={ solicitudCompra }
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

SolicitudCompraReport.propTypes = {
    solicitudCompra: PropTypes.object,
    archivo:   PropTypes.object,
    option:    PropTypes.object,
};

SolicitudCompraReport.defaultProps = {
};

export default SolicitudCompraReport;