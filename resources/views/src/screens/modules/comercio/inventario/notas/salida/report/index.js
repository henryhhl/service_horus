
import React from 'react';
import PropTypes from 'prop-types';

import NotaSalidaCSV from './notaSalidaCSV';
import NotaSalidaPrint from './notaSalidaPrint';
import NotaSalidaXLS from './notaSalidaXLS';
import NotaSalidaXLSX from './notaSalidaXLSX';

const NotaSalidaReport = ( props ) => {

    const { archivo, notaSalida, option } = props;

    function componentReportPrint() {
        if ( option.checked.impresora ) return null;
        return (
            <>
                <NotaSalidaPrint
                    notaSalida={notaSalida} 
                />
            </>
        );
    }

    function componentReportXLS() {
        if ( !archivo.checked.xls ) return null;
        return (
            <NotaSalidaXLS 
                notaSalida={notaSalida}
            />
        );
    }

    function componentReportXLSX() {
        if ( !archivo.checked.xlsx ) return null;
        return (
            <NotaSalidaXLSX 
                notaSalida={ notaSalida }
            />
        );
    }

    function componentReportCSV() {
        if ( !archivo.checked.csv ) return null;
        return (
            <NotaSalidaCSV 
                notaSalida={ notaSalida }
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

NotaSalidaReport.propTypes = {
    notaSalida: PropTypes.object,
    archivo:     PropTypes.object,
    option:      PropTypes.object,
};

NotaSalidaReport.defaultProps = {
};

export default NotaSalidaReport;