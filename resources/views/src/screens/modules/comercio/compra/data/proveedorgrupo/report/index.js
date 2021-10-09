
import React from 'react';
import PropTypes from 'prop-types';

import ProveedorGrupoCSV from './proveedorGrupoCSV';
import ProveedorGrupoPrint from './proveedorGrupoPrint';
import ProveedorGrupoXLS from './proveedorGrupoXLS';
import ProveedorGrupoXLSX from './proveedorGrupoXLSX';

const ProveedorGrupoReport = ( props ) => {

    const { archivo, proveedorGrupo, option } = props;

    function componentReportPrint() {
        if ( option.checked.impresora ) return null;
        return (
            <>
                <ProveedorGrupoPrint
                    proveedorGrupo={proveedorGrupo} 
                />
            </>
        );
    }

    function componentReportXLS() {
        if ( !archivo.checked.xls ) return null;
        return (
            <ProveedorGrupoXLS 
                proveedorGrupo={proveedorGrupo}
            />
        );
    }

    function componentReportXLSX() {
        if ( !archivo.checked.xlsx ) return null;
        return (
            <ProveedorGrupoXLSX 
                proveedorGrupo={ proveedorGrupo }
            />
        );
    }

    function componentReportCSV() {
        if ( !archivo.checked.csv ) return null;
        return (
            <ProveedorGrupoCSV 
                proveedorGrupo={ proveedorGrupo }
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

ProveedorGrupoReport.propTypes = {
    proveedorGrupo: PropTypes.object,
    archivo: PropTypes.object,
    option:  PropTypes.object,
};

ProveedorGrupoReport.defaultProps = {
};

export default ProveedorGrupoReport;