
import React from 'react';
import PropTypes from 'prop-types';

import UnionSucursalCSV from './unionSucursalCSV';
import UnionSucursalPrint from './unionSucursalPrint';
import UnionSucursalXLS from './unionSucursalXLS';
import UnionSucursalXLSX from './unionSucursalXLSX';


const UnionSucursalReport = ( props ) => {

    const { archivo, unionSucursal, option } = props;

    function componentReportPrint() {
        if ( option.checked.impresora ) return null;
        return (
            <>
                <UnionSucursalPrint
                    unionSucursal={unionSucursal} 
                />
            </>
        );
    }

    function componentReportXLS() {
        if ( !archivo.checked.xls ) return null;
        return (
            <UnionSucursalXLS 
                unionSucursal={unionSucursal}
            />
        );
    }

    function componentReportXLSX() {
        if ( !archivo.checked.xlsx ) return null;
        return (
            <UnionSucursalXLSX 
                unionSucursal={ unionSucursal }
            />
        );
    }

    function componentReportCSV() {
        if ( !archivo.checked.csv ) return null;
        return (
            <UnionSucursalCSV 
                unionSucursal={ unionSucursal }
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

UnionSucursalReport.propTypes = {
    unionSucursal: PropTypes.object,
    archivo:       PropTypes.object,
    option:        PropTypes.object,
};

UnionSucursalReport.defaultProps = {
};

export default UnionSucursalReport;