
import React from 'react';
import PropTypes from 'prop-types';

import SucursalCSV from './sucursalCSV';
import SucursalPrint from './sucursalPrint';
import SucursalXLS from './sucursalXLS';
import SucursalXLSX from './sucursalXLSX';

const SucursalReport = ( props ) => {

    const { archivo, sucursal, option } = props;

    function componentReportPrint() {
        if ( option.checked.impresora ) return null;
        return (
            <>
                <SucursalPrint
                    sucursal={sucursal} 
                />
            </>
        );
    }

    function componentReportXLS() {
        if ( !archivo.checked.xls ) return null;
        return (
            <SucursalXLS 
                sucursal={sucursal}
            />
        );
    }

    function componentReportXLSX() {
        if ( !archivo.checked.xlsx ) return null;
        return (
            <SucursalXLSX 
                sucursal={ sucursal }
            />
        );
    }

    function componentReportCSV() {
        if ( !archivo.checked.csv ) return null;
        return (
            <SucursalCSV 
                sucursal={ sucursal }
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

SucursalReport.propTypes = {
    sucursal: PropTypes.object,
    archivo:       PropTypes.object,
    option:        PropTypes.object,
};

SucursalReport.defaultProps = {
};

export default SucursalReport;