
import React from 'react';
import PropTypes from 'prop-types';

import CategoriaXLSX from './categoriaXLSX';
import CategoriaXLS from './categoriaXLS';
import CategoriaPrint from './categoriaPrint';
import CategoriaCSV from './categoriaCSV';

const CategoriaReport = ( props ) => {

    const { archivo, categoria, option } = props;

    function componentReportPrint() {
        if ( option.checked.impresora ) return null;
        return (
            <>
                <CategoriaPrint
                    categoria={categoria} 
                />
            </>
        );
    }

    function componentReportXLS() {
        if ( !archivo.checked.xls ) return null;
        return (
            <CategoriaXLS 
                categoria={categoria}
            />
        );
    }

    function componentReportXLSX() {
        if ( !archivo.checked.xlsx ) return null;
        return (
            <CategoriaXLSX 
                categoria={ categoria }
            />
        );
    }

    function componentReportCSV() {
        if ( !archivo.checked.csv ) return null;
        return (
            <CategoriaCSV 
                categoria={ categoria }
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

CategoriaReport.propTypes = {
    categoria: PropTypes.object,
    archivo:   PropTypes.object,
    option:    PropTypes.object,
};

CategoriaReport.defaultProps = {
};

export default CategoriaReport;