
import React from 'react';
import PropTypes from 'prop-types';

import ProductoSubGrupoXLSX from './productoSubGrupoXLSX';
import ProductoSubGrupoCSV from './productoSubGrupoCSV';
import ProductoSubGrupoXLS from './productoSubGrupoXLS';
import ProductoSubGrupoPrint from './productoSubGrupoPrint';


const ProductoSubGrupoReport = ( props ) => {

    const { archivo, productoSubGrupo, option } = props;

    function componentReportPrint() {
        if ( option.checked.impresora ) return null;
        return (
            <>
                <ProductoSubGrupoPrint
                    productoSubGrupo={productoSubGrupo} 
                />
            </>
        );
    }

    function componentReportXLS() {
        if ( !archivo.checked.xls ) return null;
        return (
            <ProductoSubGrupoXLS 
                productoSubGrupo={productoSubGrupo}
            />
        );
    }

    function componentReportXLSX() {
        if ( !archivo.checked.xlsx ) return null;
        return (
            <ProductoSubGrupoXLSX 
                productoSubGrupo={ productoSubGrupo }
            />
        );
    }

    function componentReportCSV() {
        if ( !archivo.checked.csv ) return null;
        return (
            <ProductoSubGrupoCSV 
                productoSubGrupo={ productoSubGrupo }
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

ProductoSubGrupoReport.propTypes = {
    productoSubGrupo: PropTypes.object,
    archivo:          PropTypes.object,
    option:           PropTypes.object,
};

ProductoSubGrupoReport.defaultProps = {
};

export default ProductoSubGrupoReport;