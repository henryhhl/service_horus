
import React from 'react';
import PropTypes from 'prop-types';

import ProveedorCSV from './proveedorCSV';
import ProveedorPrint from './proveedorPrint';
import ProveedorXLS from './proveedorXLS';
import ProveedorXLSX from './proveedorXLSX';

const ProveedorReport = ( props ) => {

    const { archivo, proveedor, option } = props;

    function componentReportPrint() {
        if ( option.checked.impresora ) return null;
        return (
            <>
                <ProveedorPrint
                    proveedor={proveedor} 
                />
            </>
        );
    }

    function componentReportXLS() {
        if ( !archivo.checked.xls ) return null;
        return (
            <ProveedorXLS 
                proveedor={proveedor}
            />
        );
    }

    function componentReportXLSX() {
        if ( !archivo.checked.xlsx ) return null;
        return (
            <ProveedorXLSX 
                proveedor={ proveedor }
            />
        );
    }

    function componentReportCSV() {
        if ( !archivo.checked.csv ) return null;
        return (
            <ProveedorCSV 
                proveedor={ proveedor }
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

ProveedorReport.propTypes = {
    proveedor: PropTypes.object,
    archivo: PropTypes.object,
    option:  PropTypes.object,
};

ProveedorReport.defaultProps = {
};

export default ProveedorReport;