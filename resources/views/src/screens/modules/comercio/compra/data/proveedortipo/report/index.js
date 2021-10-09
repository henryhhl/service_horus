
import React from 'react';
import PropTypes from 'prop-types';

import ProveedorTipoCSV from './proveedorTipoCSV';
import ProveedorTipoPrint from './proveedorTipoPrint';
import ProveedorTipoXLS from './proveedorTipoXLS';
import ProveedorTipoXLSX from './proveedorTipoXLSX';

const ProveedorTipoReport = ( props ) => {

    const { archivo, proveedorTipo, option } = props;

    function componentReportPrint() {
        if ( option.checked.impresora ) return null;
        return (
            <>
                <ProveedorTipoPrint
                    proveedorTipo={proveedorTipo} 
                />
            </>
        );
    }

    function componentReportXLS() {
        if ( !archivo.checked.xls ) return null;
        return (
            <ProveedorTipoXLS 
                proveedorTipo={proveedorTipo}
            />
        );
    }

    function componentReportXLSX() {
        if ( !archivo.checked.xlsx ) return null;
        return (
            <ProveedorTipoXLSX 
                proveedorTipo={ proveedorTipo }
            />
        );
    }

    function componentReportCSV() {
        if ( !archivo.checked.csv ) return null;
        return (
            <ProveedorTipoCSV 
                proveedorTipo={ proveedorTipo }
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

ProveedorTipoReport.propTypes = {
    proveedorTipo: PropTypes.object,
    archivo: PropTypes.object,
    option:  PropTypes.object,
};

ProveedorTipoReport.defaultProps = {
};

export default ProveedorTipoReport;