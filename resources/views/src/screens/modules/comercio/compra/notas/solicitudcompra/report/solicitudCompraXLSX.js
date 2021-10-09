
import React from 'react';
import PropTypes from 'prop-types';

import ReactExport from 'react-data-export';
import { Functions } from '../../../../../../../utils/functions';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

const SolicitudCompraXLSX = ( props ) => {

    const { solicitudCompra } = props;

    const DataSet = [
        {
            columns: [
                { title: "NRO",         style: { font: { sz: "12", bold: true, } }, },
                { title: "CÓDIGO",       style: { font: { sz: "12", bold: true, } }, },
                { title: "FECHA SOLICITAD", style: { font: { sz: "12", bold: true, } }, },
                { title: "FECHA REALIZADA", style: { font: { sz: "12", bold: true, } }, },
                { title: "SUCURSAL", style: { font: { sz: "12", bold: true, } }, },
                { title: "ÁLMACEN", style: { font: { sz: "12", bold: true, } }, },
                { title: "PROVEEDOR", style: { font: { sz: "12", bold: true, } }, },
                { title: "CONCEPTO", style: { font: { sz: "12", bold: true, } }, },
                { title: "SECCIÓN", style: { font: { sz: "12", bold: true, } }, },
                { title: "TIPO", style: { font: { sz: "12", bold: true, } }, },
                { title: "MONEDA", style: { font: { sz: "12", bold: true, } }, },
                { title: "CANTIDAD TOTAL", style: { font: { sz: "12", bold: true, } }, },
                { title: "MONTO TOTAL", style: { font: { sz: "12", bold: true, } }, },
                { title: "NOTA", style: { font: { sz: "12", bold: true, } }, },
            ],
            data: solicitudCompra.arraySolicitudCompra.map( ( element, key ) => [
                { value: ( key + 1 ),         style: { font: { sz: "10", } } },
                { value: element.codigo ? element.codigo : "", style: { font: { sz: "10", } } },
                { value: Functions.convertYMDToDMY(element.fechasolicitada), style: { font: { sz: "10", } } },
                { value: Functions.convertYMDToDMY(element.fechafinalizada), style: { font: { sz: "10", } } },
                { value: element.sucursal, style: { font: { sz: "10", } } },
                { value: element.almacen, style: { font: { sz: "10", } } },
                { value: element.proveedor, style: { font: { sz: "10", } } },
                { value: element.conceptocompra, style: { font: { sz: "10", } } },
                { value: element.seccioninventario, style: { font: { sz: "10", } } },
                { value: element.tiposolicitud == "L" ? "Local" : "Exterior", style: { font: { sz: "10", } } },
                { value: element.moneda, style: { font: { sz: "10", } } },
                { value: element.cantidadsolicitadatotal, style: { font: { sz: "10", } } },
                { value: parseFloat(element.montototal).toFixed(2), style: { font: { sz: "10", } } },
                { value: element.nota ? element.nota : "", style: { font: { sz: "10", } } },
            ] ),
        },
    ];

    return (
        <ExcelFile 
            filename="solicitudcompra" 
            element={
                <button type="button" id="buttonsolicitudcompra_xlsx" style={ {display: 'none', } } 
                >
                    Export Data
                </button>
            }
        >
            <ExcelSheet dataSet={DataSet} name="SOLICITUD COMPRA"/>
        </ExcelFile>
    );

};

SolicitudCompraXLSX.propTypes = {
    solicitudCompra: PropTypes.object,
};

SolicitudCompraXLSX.defaultProps = {
};

export default SolicitudCompraXLSX;
