
import React from 'react';
import PropTypes from 'prop-types';

import UnidadMedidaPrint from './unidadMedidaPrint';
import UnidadMedidaXLS from './unidadMedidaXLS';
import UnidadMedidaXLSX from './unidadMedidaXLSX';
import UnidadMedidaCSV from './unidadMedidaCSV';

const UnidadMedidaReport = ( props ) => {

    const { archivo, unidadMedida, option } = props;

    function componentReportPrint() {
        if ( option.checked.impresora ) return null;
        return (
            <>
                <UnidadMedidaPrint
                    unidadMedida={unidadMedida} 
                />
            </>
        );
    }

    function componentReportXLS() {
        if ( !archivo.checked.xls ) return null;
        return (
            <UnidadMedidaXLS 
                unidadMedida={ unidadMedida }
            />
        );
    }

    function componentReportXLSX() {
        if ( !archivo.checked.xlsx ) return null;
        return (
            <UnidadMedidaXLSX 
                unidadMedida={ unidadMedida }
            />
        );
    }

    function componentReportCSV() {
        if ( !archivo.checked.csv ) return null;
        return (
            <UnidadMedidaCSV 
                unidadMedida={ unidadMedida }
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

UnidadMedidaReport.propTypes = {
    unidadMedida: PropTypes.object,
    archivo:      PropTypes.object,
    option:       PropTypes.object,
};

UnidadMedidaReport.defaultProps = {
};

export default UnidadMedidaReport;