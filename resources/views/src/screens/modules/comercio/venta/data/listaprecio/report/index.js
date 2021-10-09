
import React from 'react';
import PropTypes from 'prop-types';

import ListaPrecioCSV from './listaPrecioCSV';
import ListaPrecioPrint from './listaPrecioPrint';
import ListaPrecioXLS from './listaPrecioXLS';
import ListaPrecioXLSX from './listaPrecioXLSX';

const ListaPrecioReport = ( props ) => {

    const { archivo, listaPrecio, option } = props;

    function componentReportPrint() {
        if ( option.checked.impresora ) return null;
        return (
            <>
                <ListaPrecioPrint
                    listaPrecio={listaPrecio} 
                />
            </>
        );
    }

    function componentReportXLS() {
        if ( !archivo.checked.xls ) return null;
        return (
            <ListaPrecioXLS 
                listaPrecio={listaPrecio}
            />
        );
    }

    function componentReportXLSX() {
        if ( !archivo.checked.xlsx ) return null;
        return (
            <ListaPrecioXLSX 
                listaPrecio={ listaPrecio }
            />
        );
    }

    function componentReportCSV() {
        if ( !archivo.checked.csv ) return null;
        return (
            <ListaPrecioCSV 
                listaPrecio={ listaPrecio }
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

ListaPrecioReport.propTypes = {
    listaPrecio: PropTypes.object,
    archivo:       PropTypes.object,
    option:        PropTypes.object,
};

ListaPrecioReport.defaultProps = {
};

export default ListaPrecioReport;