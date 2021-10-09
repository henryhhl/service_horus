
import React from 'react';
import PropTypes from 'prop-types';

import ProductoCSV from './productoCSV';
import ProductoPrint from './productoPrint';
import ProductoXLS from './productoXLS';
import ProductoXLSX from './productoXLSX';

const ProductoReport = ( props ) => {

    const { archivo, producto, option } = props;

    function componentReportPrint() {
        if ( option.checked.impresora ) return null;
        return (
            <>
                <ProductoPrint
                    producto={producto} 
                />
            </>
        );
    }

    function componentReportXLS() {
        if ( !archivo.checked.xls ) return null;
        return (
            <ProductoXLS 
                producto={producto}
            />
        );
    }

    function componentReportXLSX() {
        if ( !archivo.checked.xlsx ) return null;
        return (
            <ProductoXLSX 
                producto={ producto }
            />
        );
    }

    function componentReportCSV() {
        if ( !archivo.checked.csv ) return null;
        return (
            <ProductoCSV 
                producto={ producto }
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

ProductoReport.propTypes = {
    producto: PropTypes.object,
    archivo: PropTypes.object,
    option:  PropTypes.object,
};

ProductoReport.defaultProps = {
};

export default ProductoReport;