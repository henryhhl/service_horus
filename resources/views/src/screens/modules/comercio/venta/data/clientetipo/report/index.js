
import React from 'react';
import PropTypes from 'prop-types';

import ClienteTipoCSV from './clienteTipoCSV';
import ClienteTipoPrint from './clienteTipoPrint';
import ClienteTipoXLS from './clienteTipoXLS';
import ClienteTipoXLSX from './clienteTipoXLSX';

const ClienteTipoReport = ( props ) => {

    const { archivo, clienteTipo, option } = props;

    function componentReportPrint() {
        if ( option.checked.impresora ) return null;
        return (
            <>
                <ClienteTipoPrint
                    clienteTipo={clienteTipo} 
                />
            </>
        );
    }

    function componentReportXLS() {
        if ( !archivo.checked.xls ) return null;
        return (
            <ClienteTipoXLS 
                clienteTipo={clienteTipo}
            />
        );
    }

    function componentReportXLSX() {
        if ( !archivo.checked.xlsx ) return null;
        return (
            <ClienteTipoXLSX 
                clienteTipo={ clienteTipo }
            />
        );
    }

    function componentReportCSV() {
        if ( !archivo.checked.csv ) return null;
        return (
            <ClienteTipoCSV 
                clienteTipo={ clienteTipo }
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

ClienteTipoReport.propTypes = {
    clienteTipo: PropTypes.object,
    archivo: PropTypes.object,
    option:  PropTypes.object,
};

ClienteTipoReport.defaultProps = {
};

export default ClienteTipoReport;