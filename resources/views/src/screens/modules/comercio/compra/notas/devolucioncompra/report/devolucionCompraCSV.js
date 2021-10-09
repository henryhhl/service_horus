
import React from 'react';
import PropTypes from 'prop-types';

import { CSVLink } from "react-csv";
import { Functions } from '../../../../../../../utils/functions';

const DevolucionCompraCSV = ( props ) => {

    const { devolucionCompra } = props;

    let headers = [
        { label: "NRO",    key: "nro", },
        { label: "NRO FACTURA", key: "nrofactura", },
        { label: "FECHA", key: "fechadevolucioncompra", },
        { label: "SUCURSAL",  key: "sucursal", },
        { label: "ÁLMACEN",   key: "almacen", },
        { label: "PROVEEDOR", key: "proveedor", },
        { label: "CONCEPTO",  key: "conceptocompra", },
        { label: "TIPO",      key: "tipocompra", },
        { label: "MONEDA",    key: "moneda", },
        { label: "CANTIDAD TOTAL",  key: "cantidadtotal", },
        { label: "MONTO SUB TOTAL",  key: "montosubtotal", },
        { label: "DESCUENTO",  key: "descuento", },
        { label: "MONTO DESCUENTO",  key: "montodescuento", },
        { label: "MONTO TOTAL",  key: "montototal", },
        { label: "NOTA",      key: "nota", },
    ];

    const viewers = [];
    for (let index = 0; index < devolucionCompra.arrayDevolucionCompra.length; index++) {
        const element = devolucionCompra.arrayDevolucionCompra[index];
        viewers.push( {
            nro:  index + 1,
            nrofactura: element.nrofactura ? item.nrofactura : "",
            fechadevolucioncompra: Functions.convertYMDToDMY(element.fechadevolucioncompra),
            sucursal: element.sucursal,
            almacen: element.almacen,
            proveedor: element.proveedor,
            conceptocompra: element.conceptocompra,
            tipocompra: element.tipocompra === "L" ? "Local" : "Exterior",
            moneda: element.moneda,
            cantidadtotal: element.cantidadtotal,
            montosubtotal: parseFloat(element.montosubtotal).toFixed(2),
            descuento: parseInt(element.descuento),
            montodescuento: parseFloat(element.montodescuento).toFixed(2),
            montototal: parseFloat(element.montototal).toFixed(2),
            nota: element.nota ? item.nota : "",
        } );
    }
    
    return (
        <>
            <CSVLink style={{ display: 'none', }}
                data={viewers} headers={headers} separator={";"}
                filename={"devolucioncompra.csv"} id={'buttondevolucioncompra_csv'}
            >
                Download
            </CSVLink>
        </>
    );
};

DevolucionCompraCSV.propTypes = {
    devolucionCompra: PropTypes.object,
};

DevolucionCompraCSV.defaultProps = {
};


export default DevolucionCompraCSV;
