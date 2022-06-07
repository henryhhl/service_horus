
import React from 'react';
import PropTypes from 'prop-types';

import ReactExport from 'react-data-export';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

const DevolucionNotaVentaXLSX = ( props ) => {

    const { devolucionNotaVenta } = props;

    const DataSet = [
        {
            columns: [
                { title: "NRO",         style: { font: { sz: "12", bold: true, } }, },
                { title: "SUCURSAL", style: { font: { sz: "12", bold: true, } }, },
                { title: "ÁLMACEN", style: { font: { sz: "12", bold: true, } }, },
                { title: "LISTA PRECIO", style: { font: { sz: "12", bold: true, } }, },
                { title: "MONEDA", style: { font: { sz: "12", bold: true, } }, },
                { title: "TIPO CAMBIO", style: { font: { sz: "12", bold: true, } }, },
                { title: "CONCEPTO", style: { font: { sz: "12", bold: true, } }, },
                { title: "VENDEDOR", style: { font: { sz: "12", bold: true, } }, },
                { title: "CLIENTE", style: { font: { sz: "12", bold: true, } }, },
                { title: "NIT", style: { font: { sz: "12", bold: true, } }, },
                { title: "SUB TOTAL", style: { font: { sz: "12", bold: true, } }, },
                { title: "DESCUENTO", style: { font: { sz: "12", bold: true, } }, },
                { title: "MONTO DESCUENTO", style: { font: { sz: "12", bold: true, } }, },
                { title: "MONTO TOTAL", style: { font: { sz: "12", bold: true, } }, },
                { title: "CANTIDAD TOTAL", style: { font: { sz: "12", bold: true, } }, },
            ],
            data: devolucionNotaVenta.arrayDevolucionNotaVenta.map( ( element, key ) => [
                { value: ( key + 1 ),          style: { font: { sz: "10", } } },
                { value: element.sucursal,  style: { font: { sz: "10", } } },
                { value: element.almacen,  style: { font: { sz: "10", } } },
                { value: element.listaprecio,  style: { font: { sz: "10", } } },
                { value: element.moneda,  style: { font: { sz: "10", } } },
                { value: parseFloat(element.tipocambio).toFixed(2),  style: { font: { sz: "10", } } },
                { value: element.conceptoventa,  style: { font: { sz: "10", } } },
                { value: element.vendedor,  style: { font: { sz: "10", } } },
                { value: element.cliente,  style: { font: { sz: "10", } } },
                { value: element.nit ? element.nit : "",  style: { font: { sz: "10", } } },
                { value: parseFloat(element.montosubtotal).toFixed(2),  style: { font: { sz: "10", } } },
                { value: parseFloat(element.descuento).toFixed(2),  style: { font: { sz: "10", } } },
                { value: parseFloat(element.montodescuento).toFixed(2),  style: { font: { sz: "10", } } },
                { value: parseFloat(element.montototal).toFixed(2),  style: { font: { sz: "10", } } },
                { value: parseFloat(element.cantidadtotal).toFixed(2),  style: { font: { sz: "10", } } },
            ] ),
        },
    ];

    return (
        <ExcelFile
            filename="devolucionnotaventa"
            element={
                <button type="button" id="buttondevolucionnotaventa_xlsx" style={ {display: 'none', } }
                >
                    Export Data
                </button>
            }
        >
            <ExcelSheet dataSet={DataSet} name="DEVOLUCIÓN NOTA VENTA"/>
        </ExcelFile>
    );

};

DevolucionNotaVentaXLSX.propTypes = {
    devolucionNotaVenta: PropTypes.object,
};

DevolucionNotaVentaXLSX.defaultProps = {
};

export default DevolucionNotaVentaXLSX;
