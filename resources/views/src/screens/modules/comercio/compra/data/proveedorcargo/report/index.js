
import React from 'react';
import PropTypes from 'prop-types';

import ProveedorCargoCSV from './proveedorCargoCSV';
import ProveedorCargoPrint from './proveedorCargoPrint';
import ProveedorCargoXLS from './proveedorCargoXLS';
import ProveedorCargoXLSX from './proveedorCargoXLSX';

const ProveedorCargoReport = ( props ) => {

    const { archivo, proveedorCargo, option } = props;

    function componentReportPrint() {
        if ( option.checked.impresora ) return null;
        return (
            <>
                <ProveedorCargoPrint
                    proveedorCargo={proveedorCargo} 
                />
            </>
        );
    }

    function componentReportXLS() {
        if ( !archivo.checked.xls ) return null;
        return (
            <ProveedorCargoXLS 
                proveedorCargo={proveedorCargo}
            />
        );
    }

    function componentReportXLSX() {
        if ( !archivo.checked.xlsx ) return null;
        return (
            <ProveedorCargoXLSX 
                proveedorCargo={ proveedorCargo }
            />
        );
    }

    function componentReportCSV() {
        if ( !archivo.checked.csv ) return null;
        return (
            <ProveedorCargoCSV 
                proveedorCargo={ proveedorCargo }
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

ProveedorCargoReport.propTypes = {
    proveedorCargo: PropTypes.object,
    archivo: PropTypes.object,
    option:  PropTypes.object,
};

ProveedorCargoReport.defaultProps = {
};

export default ProveedorCargoReport;