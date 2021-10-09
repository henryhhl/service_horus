
import React from 'react';
import PropTypes from 'prop-types';

import ReactExport from 'react-data-export';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

const ProveedorXLSX = ( props ) => {

    const { proveedor } = props;

    const DataSet = [
        {
            columns: [
                { title: "NRO",        style: { font: { sz: "12", bold: true, } }, },
                { title: "NOMBRE",     style: { font: { sz: "12", bold: true, } }, },
                { title: "PERSONERIA", style: { font: { sz: "12", bold: true, } }, },
                { title: "GRUPO",      style: { font: { sz: "12", bold: true, } }, },
                { title: "TIPO",       style: { font: { sz: "12", bold: true, } }, },
                { title: "NIT",        style: { font: { sz: "12", bold: true, } }, },
                { title: "PAIS",       style: { font: { sz: "12", bold: true, } }, },
                { title: "CIUDAD",     style: { font: { sz: "12", bold: true, } }, },
                { title: "DIRECCIÓN",  style: { font: { sz: "12", bold: true, } }, },
                { title: "TELÉFONO",   style: { font: { sz: "12", bold: true, } }, },
                { title: "CELULAR",    style: { font: { sz: "12", bold: true, } }, },
                { title: "FAX",        style: { font: { sz: "12", bold: true, } }, },
                { title: "EMAIL",      style: { font: { sz: "12", bold: true, } }, },
                { title: "SITIO WEB",  style: { font: { sz: "12", bold: true, } }, },
                { title: "NRO ORDEN",  style: { font: { sz: "12", bold: true, } }, },
                { title: "FECHA ALTA", style: { font: { sz: "12", bold: true, } }, },
                { title: "FECHA BAJA", style: { font: { sz: "12", bold: true, } }, },
            ],
            data: proveedor.arrayProveedor.map( ( element, key ) => [
                { value: ( key + 1 ),          style: { font: { sz: "10", } } },
                { value: element.nombre,  style: { font: { sz: "10", } } },
                { value: element.tipopersoneria == "N" ? "Natural" : "Juridico",  style: { font: { sz: "10", } } },
                { value: element.proveedorgrupo,  style: { font: { sz: "10", } } },
                { value: element.proveedortipo,  style: { font: { sz: "10", } } },
                { value: element.nit ? element.nit : "",  style: { font: { sz: "10", } } },
                { value: element.ciudadpais,  style: { font: { sz: "10", } } },
                { value: element.ciudad,  style: { font: { sz: "10", } } },
                { value: element.direccion ? element.direccion : "",  style: { font: { sz: "10", } } },
                { value: element.telefono ? element.telefono : "",  style: { font: { sz: "10", } } },
                { value: element.celular ? element.celular : "",  style: { font: { sz: "10", } } },
                { value: element.fax ? element.fax : "",  style: { font: { sz: "10", } } },
                { value: element.email ? element.email : "",  style: { font: { sz: "10", } } },
                { value: element.sitioweb ? element.sitioweb : "",  style: { font: { sz: "10", } } },
                { value: element.nroorden ? element.nroorden : "",  style: { font: { sz: "10", } } },
                { value: element.fechaalta ? element.fechaalta : "",  style: { font: { sz: "10", } } },
                { value: element.fechabaja ? element.fechabaja : "",  style: { font: { sz: "10", } } },
            ] ),
        },
    ];

    return (
        <ExcelFile 
            filename="proveedor" 
            element={
                <button type="button" id="buttonproveedor_xlsx" style={ {display: 'none', } } 
                >
                    Export Data
                </button>
            }
        >
            <ExcelSheet dataSet={DataSet} name="PROVEEDOR"/>
        </ExcelFile>
    );

};

ProveedorXLSX.propTypes = {
    proveedor: PropTypes.object,
};

ProveedorXLSX.defaultProps = {
};

export default ProveedorXLSX;
