
import React from 'react';
import PropTypes from 'prop-types';

import AlmacenCSV from './almacenCSV';
import AlmacenPrint from './almacenPrint';
import AlmacenXLS from './almacenXLS';
import AlmacenXLSX from './almacenXLSX';

const AlmacenReport = ( props ) => {

    const { archivo, almacen, option } = props;

    function componentReportPrint() {
        if ( option.checked.impresora ) return null;
        return (
            <>
                <AlmacenPrint
                    almacen={almacen} 
                />
            </>
        );
    }

    function componentReportXLS() {
        if ( !archivo.checked.xls ) return null;
        return (
            <AlmacenXLS 
                almacen={almacen}
            />
        );
    }

    function componentReportXLSX() {
        if ( !archivo.checked.xlsx ) return null;
        return (
            <AlmacenXLSX 
                almacen={ almacen }
            />
        );
    }

    function componentReportCSV() {
        if ( !archivo.checked.csv ) return null;
        return (
            <AlmacenCSV 
                almacen={ almacen }
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

AlmacenReport.propTypes = {
    almacen: PropTypes.object,
    archivo: PropTypes.object,
    option:  PropTypes.object,
};

AlmacenReport.defaultProps = {
};

export default AlmacenReport;