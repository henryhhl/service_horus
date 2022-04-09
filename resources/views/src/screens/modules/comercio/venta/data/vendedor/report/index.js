
import React from 'react';
import PropTypes from 'prop-types';

import VendedorCSV from './vendedorCSV';
import VendedorPrint from './vendedorPrint';
import VendedorXLS from './vendedorXLS';
import VendedorXLSX from './vendedorXLSX';

const VendedorReport = ( props ) => {

    const { archivo, vendedor, option } = props;

    function componentReportPrint() {
        if ( option.checked.impresora ) return null;
        return (
            <>
                <VendedorPrint
                    vendedor={vendedor}
                />
            </>
        );
    }

    function componentReportXLS() {
        if ( !archivo.checked.xls ) return null;
        return (
            <VendedorXLS
                vendedor={vendedor}
            />
        );
    }

    function componentReportXLSX() {
        if ( !archivo.checked.xlsx ) return null;
        return (
            <VendedorXLSX
                vendedor={ vendedor }
            />
        );
    }

    function componentReportCSV() {
        if ( !archivo.checked.csv ) return null;
        return (
            <VendedorCSV
                vendedor={ vendedor }
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

VendedorReport.propTypes = {
    vendedor: PropTypes.object,
    archivo: PropTypes.object,
    option:  PropTypes.object,
};

VendedorReport.defaultProps = {
};

export default VendedorReport;
