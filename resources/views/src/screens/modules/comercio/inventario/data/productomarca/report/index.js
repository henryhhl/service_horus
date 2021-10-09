
import React from 'react';
import PropTypes from 'prop-types';

import ProductoMarcaPrint from './productoMarcaPrint';
import ProductoMarcaXLS from './productoMarcaXLS';
import ProductoMarcaXLSX from './productoMarcaXLSX';
import ProductoMarcaCSV from './productoMarcaCSV';

const ProductoMarcaReport = ( props ) => {

    const { archivo, productoMarca, option } = props;

    function componentReportPrint() {
        if ( option.checked.impresora ) return null;
        return (
            <>
                <ProductoMarcaPrint
                    productoMarca={productoMarca} 
                />
            </>
        );
    }

    function componentReportXLS() {
        if ( !archivo.checked.xls ) return null;
        return (
            <ProductoMarcaXLS 
                productoMarca={productoMarca}
            />
        );
    }

    function componentReportXLSX() {
        if ( !archivo.checked.xlsx ) return null;
        return (
            <ProductoMarcaXLSX 
                productoMarca={ productoMarca }
            />
        );
    }

    function componentReportCSV() {
        if ( !archivo.checked.csv ) return null;
        return (
            <ProductoMarcaCSV 
                productoMarca={ productoMarca }
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

ProductoMarcaReport.propTypes = {
    productoMarca: PropTypes.object,
    archivo:       PropTypes.object,
    option:        PropTypes.object,
};

ProductoMarcaReport.defaultProps = {
};

export default ProductoMarcaReport;