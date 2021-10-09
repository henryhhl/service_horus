
import React from 'react';
import PropTypes from 'prop-types';

import ProductoGrupoCSV from './productoGrupoCSV';
import ProductoGrupoPrint from './productoGrupoPrint';
import ProductoGrupoXLS from './productoGrupoXLS';
import ProductoGrupoXLSX from './productoGrupoXLSX';


const ProductoGrupoReport = ( props ) => {

    const { archivo, productoGrupo, option } = props;

    function componentReportPrint() {
        if ( option.checked.impresora ) return null;
        return (
            <>
                <ProductoGrupoPrint
                    productoGrupo={productoGrupo} 
                />
            </>
        );
    }

    function componentReportXLS() {
        if ( !archivo.checked.xls ) return null;
        return (
            <ProductoGrupoXLS 
                productoGrupo={productoGrupo}
            />
        );
    }

    function componentReportXLSX() {
        if ( !archivo.checked.xlsx ) return null;
        return (
            <ProductoGrupoXLSX 
                productoGrupo={ productoGrupo }
            />
        );
    }

    function componentReportCSV() {
        if ( !archivo.checked.csv ) return null;
        return (
            <ProductoGrupoCSV 
                productoGrupo={ productoGrupo }
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

ProductoGrupoReport.propTypes = {
    productoGrupo: PropTypes.object,
    archivo:       PropTypes.object,
    option:        PropTypes.object,
};

ProductoGrupoReport.defaultProps = {
};

export default ProductoGrupoReport;