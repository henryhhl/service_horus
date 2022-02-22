
import React from 'react';
import PropTypes from 'prop-types';

import ReactExport from 'react-data-export';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

const ClienteXLSX = ( props ) => {

    const { cliente } = props;

    const DataSet = [
        {
            columns: [
                { title: "NRO",  style: { font: { sz: "12", bold: true, } }, },
                { title: "PAIS", style: { font: { sz: "12", bold: true, } }, },
                { title: "CIUDAD", style: { font: { sz: "12", bold: true, } }, },
                { title: "TIPO", style: { font: { sz: "12", bold: true, } }, },
                { title: "NOMBRE", style: { font: { sz: "12", bold: true, } }, },
                { title: "APELLIDO", style: { font: { sz: "12", bold: true, } }, },
                { title: "RAZON SOCIAL", style: { font: { sz: "12", bold: true, } }, },
                { title: "NIT", style: { font: { sz: "12", bold: true, } }, },
                { title: "EMAIL", style: { font: { sz: "12", bold: true, } }, },
                { title: "CASILLA", style: { font: { sz: "12", bold: true, } }, },
                { title: "TELÉFONO", style: { font: { sz: "12", bold: true, } }, },
                { title: "CELULAR", style: { font: { sz: "12", bold: true, } }, },
                { title: "CONTACTO", style: { font: { sz: "12", bold: true, } }, },
                { title: "DIRECCIÓN", style: { font: { sz: "12", bold: true, } }, },
                { title: "DÍAS CRÉDITOS", style: { font: { sz: "12", bold: true, } }, },
                { title: "LIMITE CRÉDITO", style: { font: { sz: "12", bold: true, } }, },
                { title: "DESCUENTO", style: { font: { sz: "12", bold: true, } }, },
                { title: "CANTIDAD ITEMS", style: { font: { sz: "12", bold: true, } }, },
                { title: "DESCUENTO X CANTIDAD ITEMS", style: { font: { sz: "12", bold: true, } }, },
                { title: "DESCUENTO INICIAL", style: { font: { sz: "12", bold: true, } }, },
                { title: "DESCUENTO FINAL", style: { font: { sz: "12", bold: true, } }, },
                { title: "MONTO TOTAL ADEUDADO", style: { font: { sz: "12", bold: true, } }, },
                { title: "FECHA ÚLTIMO PAGO", style: { font: { sz: "12", bold: true, } }, },
                { title: "MONTO ADEUDADO ÚLTIMO PAGO", style: { font: { sz: "12", bold: true, } }, },
                { title: "FECHA ULTIMA VENTA", style: { font: { sz: "12", bold: true, } }, },
                { title: "MONTO ULTIMA VENTA", style: { font: { sz: "12", bold: true, } }, },
            ],
            data: cliente.arrayCliente.map( ( element, key ) => [
                { value: ( key + 1 ),          style: { font: { sz: "10", } } },
                { value: element.ciudadpais,  style: { font: { sz: "10", } } },
                { value: element.ciudad,  style: { font: { sz: "10", } } },
                { value: element.tipocliente,  style: { font: { sz: "10", } } },
                { value: element.nombre,  style: { font: { sz: "10", } } },
                { value: element.apellido,  style: { font: { sz: "10", } } },
                { value: element.razonsocial,  style: { font: { sz: "10", } } },
                { value: element.nit ? element.nit : "",  style: { font: { sz: "10", } } },
                { value: element.email ? element.email : "",  style: { font: { sz: "10", } } },
                { value: element.casilla ? element.casilla : "",  style: { font: { sz: "10", } } },
                { value: element.telefono ? element.telefono : "",  style: { font: { sz: "10", } } },
                { value: element.celular ? element.celular : "",  style: { font: { sz: "10", } } },
                { value: element.contacto ? element.contacto : "",  style: { font: { sz: "10", } } },
                { value: element.direccion ? element.direccion : "",  style: { font: { sz: "10", } } },
                { value: element.diascredito,  style: { font: { sz: "10", } } },
                { value: element.limitecredito,  style: { font: { sz: "10", } } },
                { value: element.descuento,  style: { font: { sz: "10", } } },
                { value: element.cantidaditems,  style: { font: { sz: "10", } } },
                { value: element.descuentoxcantidaditems,  style: { font: { sz: "10", } } },
                { value: element.descuentoinicial,  style: { font: { sz: "10", } } },
                { value: element.descuentofinal,  style: { font: { sz: "10", } } },
                { value: element.montototaladeudado,  style: { font: { sz: "10", } } },
                { value: element.fechaultimopago,  style: { font: { sz: "10", } } },
                { value: element.montototaladeudadoultimopago,  style: { font: { sz: "10", } } },
                { value: element.fechaultimaventa,  style: { font: { sz: "10", } } },
                { value: element.montototalultimaventa,  style: { font: { sz: "10", } } },
            ] ),
        },
    ];

    return (
        <ExcelFile
            filename="cliente"
            element={
                <button type="button" id="buttoncliente_xlsx" style={ {display: 'none', } }
                >
                    Export Data
                </button>
            }
        >
            <ExcelSheet dataSet={DataSet} name="CLIENTE"/>
        </ExcelFile>
    );

};

ClienteXLSX.propTypes = {
    cliente: PropTypes.object,
};

ClienteXLSX.defaultProps = {
};

export default ClienteXLSX;
