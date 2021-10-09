
import React from 'react';
import PropTypes from 'prop-types';

import ProductoTipoPrint from './productoTipoPrint';
import ProductoTipoXLS from './productoTipoXLS';
import ProductoTipoXLSX from './productoTipoXLSX';
import ProductoTipoCSV from './productoTipoCSV';

const ProductoTipoReport = ( props ) => {

    const { archivo, productoTipo, option } = props;

    function componentReportPrint() {
        if ( option.checked.impresora ) return null;
        return (
            <>
                <ProductoTipoPrint
                    productoTipo={productoTipo} 
                />
            </>
        );
    }

    function componentReportXLS() {
        if ( !archivo.checked.xls ) return null;
        return (
            <ProductoTipoXLS 
                productoTipo={ productoTipo }
            />
        );
    }

    function componentReportXLSX() {
        if ( !archivo.checked.xlsx ) return null;
        return (
            <ProductoTipoXLSX 
                productoTipo={ productoTipo }
            />
        );
    }

    function componentReportCSV() {
        if ( !archivo.checked.csv ) return null;
        return (
            <ProductoTipoCSV 
                productoTipo={ productoTipo }
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

ProductoTipoReport.propTypes = {
    productoTipo: PropTypes.object,
    archivo:             PropTypes.object,
    option:              PropTypes.object,
};

ProductoTipoReport.defaultProps = {
};

export default ProductoTipoReport;