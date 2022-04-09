
import React from 'react';
import PropTypes from 'prop-types';

import ReactExport from 'react-data-export';
import { Functions } from '../../../../../../../utils/functions';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

const DosificacionXLSX = ( props ) => {

    const { dosificacion } = props;

    const DataSet = [
        {
            columns: [
                { title: "NRO",         style: { font: { sz: "12", bold: true, } }, },
                { title: "SUCURSAL", style: { font: { sz: "12", bold: true, } }, },
                { title: "ACTIVIDAD ECONÓMICA", style: { font: { sz: "12", bold: true, } }, },
                { title: "DESCRIPCIÓN", style: { font: { sz: "12", bold: true, } }, },
                { title: "TIPO SUCURSAL", style: { font: { sz: "12", bold: true, } }, },
                { title: "TIPO DOSIFICACIÓN", style: { font: { sz: "12", bold: true, } }, },
                { title: "TIPO EMPRESA", style: { font: { sz: "12", bold: true, } }, },
                { title: "NIT", style: { font: { sz: "12", bold: true, } }, },
                { title: "NRO. AUTORIZACIÓN", style: { font: { sz: "12", bold: true, } }, },
                { title: "LLAVE", style: { font: { sz: "12", bold: true, } }, },
                { title: "LUGAR EMISIÓN", style: { font: { sz: "12", bold: true, } }, },
                { title: "DIRECCIÓN FISCAL", style: { font: { sz: "12", bold: true, } }, },
                { title: "TELÉFONO FISCAL", style: { font: { sz: "12", bold: true, } }, },
                { title: "NRO. FACTURA INICIAL", style: { font: { sz: "12", bold: true, } }, },
                { title: "NRO. FACTURA SIGUIENTE", style: { font: { sz: "12", bold: true, } }, },
                { title: "FECHA ACTIVACIÓN", style: { font: { sz: "12", bold: true, } }, },
                { title: "FECHA LIMITE EMISIÓN", style: { font: { sz: "12", bold: true, } }, },
                { title: "RANGO FACTURA INICIAL", style: { font: { sz: "12", bold: true, } }, },
                { title: "RANGO FACTURA FINAL", style: { font: { sz: "12", bold: true, } }, },
                { title: "ESTADO", style: { font: { sz: "12", bold: true, } }, },
            ],
            data: dosificacion.arrayDosificacion.map( ( element, key ) => [
                { value: ( key + 1 ),          style: { font: { sz: "10", } } },
                { value: element.sucursal,  style: { font: { sz: "10", } } },
                { value: element.actividadeconomica,  style: { font: { sz: "10", } } },
                { value: element.descripcion,  style: { font: { sz: "10", } } },
                { value: element.tiposucursal === "S" ? "Sucursal" : "Casa Matriz",  style: { font: { sz: "10", } } },
                { value: element.tipodosificacion === "A" ? "Automático" : "Manual",  style: { font: { sz: "10", } } },
                { value: element.tipoempresa === "N" ? "Natural" : "Jurídico",  style: { font: { sz: "10", } } },
                { value: element.nit,  style: { font: { sz: "10", } } },
                { value: element.nroautorizacion,  style: { font: { sz: "10", } } },
                { value: element.llave,  style: { font: { sz: "10", } } },
                { value: element.lugaremision,  style: { font: { sz: "10", } } },
                { value: element.direccionfiscal,  style: { font: { sz: "10", } } },
                { value: element.telefonofiscal,  style: { font: { sz: "10", } } },
                { value: element.numfacturainicial,  style: { font: { sz: "10", } } },
                { value: element.numfacturasiguiente,  style: { font: { sz: "10", } } },
                { value: Functions.convertYMDToDMY( element.fechaactivicacion ),  style: { font: { sz: "10", } } },
                { value: Functions.convertYMDToDMY( element.fechalimiteemision ),  style: { font: { sz: "10", } } },
                { value: element.rangofacturainicial,  style: { font: { sz: "10", } } },
                { value: element.rangofacturafinal,  style: { font: { sz: "10", } } },
                { value: element.estado === "A" ? "Activo" : "Cerrado",  style: { font: { sz: "10", } } },
            ] ),
        },
    ];

    return (
        <ExcelFile
            filename="dosificacion"
            element={
                <button type="button" id="buttondosificacion_xlsx" style={ {display: 'none', } }
                >
                    Export Data
                </button>
            }
        >
            <ExcelSheet dataSet={DataSet} name="ACTIVIDAD ECONÓMICA"/>
        </ExcelFile>
    );

};

DosificacionXLSX.propTypes = {
    dosificacion: PropTypes.object,
};

DosificacionXLSX.defaultProps = {
};

export default DosificacionXLSX;
