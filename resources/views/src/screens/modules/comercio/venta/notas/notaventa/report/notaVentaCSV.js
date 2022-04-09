
import React from 'react';
import PropTypes from 'prop-types';

import { CSVLink } from "react-csv";

const NotaVentaCSV = ( props ) => {

    const { notaVenta } = props;

    let headers = [
        { label: "NRO",     key: "nro", },
        { label: "SUCURSAL", key: "sucursal", },
        { label: "ÁLMACEN", key: "almacen", },
        { label: "VENDEDOR", key: "vendedor", },
        { label: "CLIENTE", key: "cliente", },
        { label: "NIT", key: "nit", },
        { label: "LISTA PRECIO", key: "listaprecio", },
        { label: "CONCEPTO VENTA", key: "conceptoventa", },
        { label: "MONEDA", key: "moneda", },
        { label: "TIPO CAMBIO", key: "tipocambio", },
        { label: "SUB TOTAL", key: "montosubtotal", },
        { label: "DESCUENTO", key: "descuento", },
        { label: "MONTO DESCUENTO", key: "montodescuento", },
        { label: "MONTO TOTAL", key: "montototal", },
    ];

    const viewers = [];
    for (let index = 0; index < notaVenta.arrayNotaVenta.length; index++) {
        const element = notaVenta.arrayNotaVenta[index];
        viewers.push( {
            nro:         index + 1,
            sucursal: element.sucursal,
            almacen: element.almacen,
            vendedor: element.vendedor,
            cliente: element.cliente,
            nit: element.nit ? element.nit : "",
            listaprecio: element.listaprecio,
            conceptoventa: element.conceptoventa,
            moneda: element.moneda,
            tipocambio: parseFloat(element.tipocambio).toFixed(2),
            montosubtotal: parseFloat(element.montosubtotal).toFixed(2),
            descuento: parseFloat(element.descuento).toFixed(2),
            montodescuento: parseFloat(element.montodescuento).toFixed(2),
            montototal: parseFloat(element.montototal).toFixed(2),
        } );
    }

    return (
        <>
            <CSVLink style={{ display: 'none', }}
                data={viewers} headers={headers} separator={";"}
                filename={"notaventa.csv"} id={'buttonnotaventa_csv'}
            >
                Download
            </CSVLink>
        </>
    );
};

NotaVentaCSV.propTypes = {
    notaVenta: PropTypes.object,
};

NotaVentaCSV.defaultProps = {
};


export default NotaVentaCSV;
