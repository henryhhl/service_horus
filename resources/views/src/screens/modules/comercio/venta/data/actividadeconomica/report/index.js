
import React from 'react';
import PropTypes from 'prop-types';

import ActividadEconomicaCSV from './actividadEconomicaCSV';
import ActividadEconomicaPrint from './actividadEconomicaPrint';
import ActividadEconomicaXLS from './actividadEconomicaXLS';
import ActividadEconomicaXLSX from './actividadEconomicaXLSX';

const ActividadEconomicaReport = ( props ) => {

    const { archivo, actividadEconomica, option } = props;

    function componentReportPrint() {
        if ( option.checked.impresora ) return null;
        return (
            <>
                <ActividadEconomicaPrint
                    actividadEconomica={actividadEconomica}
                />
            </>
        );
    }

    function componentReportXLS() {
        if ( !archivo.checked.xls ) return null;
        return (
            <ActividadEconomicaXLS
                actividadEconomica={actividadEconomica}
            />
        );
    }

    function componentReportXLSX() {
        if ( !archivo.checked.xlsx ) return null;
        return (
            <ActividadEconomicaXLSX
                actividadEconomica={ actividadEconomica }
            />
        );
    }

    function componentReportCSV() {
        if ( !archivo.checked.csv ) return null;
        return (
            <ActividadEconomicaCSV
                actividadEconomica={ actividadEconomica }
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

ActividadEconomicaReport.propTypes = {
    actividadEconomica: PropTypes.object,
    archivo: PropTypes.object,
    option:  PropTypes.object,
};

ActividadEconomicaReport.defaultProps = {
};

export default ActividadEconomicaReport;
