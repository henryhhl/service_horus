
import React from 'react';
import PropTypes from 'prop-types';

import ClienteCSV from './clienteCSV';
import ClientePrint from './clientePrint';
import ClienteXLS from './clienteXLS';
import ClienteXLSX from './clienteXLSX';

const ClienteReport = ( props ) => {

    const { archivo, cliente, option } = props;

    function componentReportPrint() {
        if ( option.checked.impresora ) return null;
        return (
            <>
                <ClientePrint
                    cliente={cliente}
                />
            </>
        );
    }

    function componentReportXLS() {
        if ( !archivo.checked.xls ) return null;
        return (
            <ClienteXLS
                cliente={cliente}
            />
        );
    }

    function componentReportXLSX() {
        if ( !archivo.checked.xlsx ) return null;
        return (
            <ClienteXLSX
                cliente={ cliente }
            />
        );
    }

    function componentReportCSV() {
        if ( !archivo.checked.csv ) return null;
        return (
            <ClienteCSV
                cliente={ cliente }
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

ClienteReport.propTypes = {
    cliente: PropTypes.object,
    archivo: PropTypes.object,
    option:  PropTypes.object,
};

ClienteReport.defaultProps = {
};

export default ClienteReport;
