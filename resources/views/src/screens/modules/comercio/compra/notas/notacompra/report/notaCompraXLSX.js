
import React from 'react';
import PropTypes from 'prop-types';

import ReactExport from 'react-data-export';
import { Functions } from '../../../../../../../utils/functions';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

const NotaCompraXLSX = ( props ) => {

    const { notaCompra } = props;

    const DataSet = [
        {
            columns: [
                { title: "NRO",         style: { font: { sz: "12", bold: true, } }, },
                { title: "NRO FACTURA", style: { font: { sz: "12", bold: true, } }, },
                { title: "FECHA", style: { font: { sz: "12", bold: true, } }, },
                { title: "SUCURSAL", style: { font: { sz: "12", bold: true, } }, },
                { title: "ÁLMACEN", style: { font: { sz: "12", bold: true, } }, },
                { title: "PROVEEDOR", style: { font: { sz: "12", bold: true, } }, },
                { title: "CONCEPTO", style: { font: { sz: "12", bold: true, } }, },
                { title: "TIPO", style: { font: { sz: "12", bold: true, } }, },
                { title: "MONEDA", style: { font: { sz: "12", bold: true, } }, },
                { title: "CANTIDAD TOTAL", style: { font: { sz: "12", bold: true, } }, },
                { title: "MONTO SUB TOTAL", style: { font: { sz: "12", bold: true, } }, },
                { title: "DESCUENTO", style: { font: { sz: "12", bold: true, } }, },
                { title: "MONTO DESCUENTO", style: { font: { sz: "12", bold: true, } }, },
                { title: "FLETES", style: { font: { sz: "12", bold: true, } }, },
                { title: "INTERNACIÓN", style: { font: { sz: "12", bold: true, } }, },
                { title: "OTROS GASTOS", style: { font: { sz: "12", bold: true, } }, },
                { title: "MONTO TOTAL", style: { font: { sz: "12", bold: true, } }, },
                { title: "NOTA", style: { font: { sz: "12", bold: true, } }, },
            ],
            data: notaCompra.arrayNotaCompra.map( ( element, key ) => [
                { value: ( key + 1 ),         style: { font: { sz: "10", } } },
                { value: element.nrofactura ? element.nrofactura : "", style: { font: { sz: "10", } } },
                { value: Functions.convertYMDToDMY(element.fechanotacompra), style: { font: { sz: "10", } } },
                { value: element.sucursal, style: { font: { sz: "10", } } },
                { value: element.almacen, style: { font: { sz: "10", } } },
                { value: element.proveedor, style: { font: { sz: "10", } } },
                { value: element.conceptocompra, style: { font: { sz: "10", } } },
                { value: element.tipocompra == "L" ? "Local" : "Exterior", style: { font: { sz: "10", } } },
                { value: element.moneda, style: { font: { sz: "10", } } },
                { value: element.cantidadtotal, style: { font: { sz: "10", } } },
                { value: parseFloat(element.montosubtotal).toFixed(2), style: { font: { sz: "10", } } },
                { value: parseInt(element.descuento), style: { font: { sz: "10", } } },
                { value: parseFloat(element.montodescuento).toFixed(2), style: { font: { sz: "10", } } },
                { value: parseFloat(element.fletes).toFixed(2), style: { font: { sz: "10", } } },
                { value: parseFloat(element.internacion).toFixed(2), style: { font: { sz: "10", } } },
                { value: parseFloat(element.otrosgastos).toFixed(2), style: { font: { sz: "10", } } },
                { value: parseFloat(element.montototal).toFixed(2), style: { font: { sz: "10", } } },
                { value: element.nota ? element.nota : "", style: { font: { sz: "10", } } },
            ] ),
        },
    ];

    return (
        <ExcelFile 
            filename="notacompra" 
            element={
                <button type="button" id="buttonnotacompra_xlsx" style={ {display: 'none', } } 
                >
                    Export Data
                </button>
            }
        >
            <ExcelSheet dataSet={DataSet} name="NOTA COMPRA"/>
        </ExcelFile>
    );

};

NotaCompraXLSX.propTypes = {
    notaCompra: PropTypes.object,
};

NotaCompraXLSX.defaultProps = {
};

export default NotaCompraXLSX;
