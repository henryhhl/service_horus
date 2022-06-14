
import React from 'react';
import PropTypes from 'prop-types';

import ReactExport from 'react-data-export';
import { Functions } from '../../../../../../../utils/functions';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

const NotaSalidaXLSX = ( props ) => {

    const { notaSalida } = props;

    const DataSet = [
        {
            columns: [
                { title: "NRO",         style: { font: { sz: "12", bold: true, } }, },
                { title: "CÓDIGO", style: { font: { sz: "12", bold: true, } }, },
                { title: "FECHA", style: { font: { sz: "12", bold: true, } }, },
                { title: "ÁLMACEN", style: { font: { sz: "12", bold: true, } }, },
                { title: "SUCURSAL", style: { font: { sz: "12", bold: true, } }, },
                { title: "CONCEPTO", style: { font: { sz: "12", bold: true, } }, },
                { title: "CANTIDAD TOTAL", style: { font: { sz: "12", bold: true, } }, },
                { title: "MONTO TOTAL", style: { font: { sz: "12", bold: true, } }, },
                { title: "PESO TOTAL", style: { font: { sz: "12", bold: true, } }, },
                { title: "VOLUMEN TOTAL", style: { font: { sz: "12", bold: true, } }, },
                { title: "NRO CAJAS TOTAL", style: { font: { sz: "12", bold: true, } }, },
                { title: "NOTA", style: { font: { sz: "12", bold: true, } }, },
            ],
            data: notaSalida.arrayNotaSalida.map( ( element, key ) => [
                { value: ( key + 1 ),         style: { font: { sz: "10", } } },
                { value: element.codigo ? element.codigo : "", style: { font: { sz: "10", } } },
                { value: Functions.convertYMDToDMY(element.fechanotasalida), style: { font: { sz: "10", } } },
                { value: element.almacen, style: { font: { sz: "10", } } },
                { value: element.sucursal, style: { font: { sz: "10", } } },
                { value: element.conceptoinventario, style: { font: { sz: "10", } } },
                { value: parseInt(element.cantidadtotal), style: { font: { sz: "10", } } },
                { value: parseFloat(element.montototal).toFixed(2), style: { font: { sz: "10", } } },
                { value: parseFloat(element.pesototal).toFixed(2), style: { font: { sz: "10", } } },
                { value: parseFloat(element.volumentotal).toFixed(2), style: { font: { sz: "10", } } },
                { value: parseFloat(element.nrocajastotal).toFixed(2), style: { font: { sz: "10", } } },
                { value: element.nota ? element.nota : "", style: { font: { sz: "10", } } },
            ] ),
        },
    ];

    return (
        <ExcelFile 
            filename="notasalida" 
            element={
                <button type="button" id="buttonnotasalida_xlsx" style={ {display: 'none', } } 
                >
                    Export Data
                </button>
            }
        >
            <ExcelSheet dataSet={DataSet} name="Nota Ingreso"/>
        </ExcelFile>
    );

};

NotaSalidaXLSX.propTypes = {
    notaSalida: PropTypes.object,
};

NotaSalidaXLSX.defaultProps = {
};

export default NotaSalidaXLSX;
