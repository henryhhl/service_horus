
import React from 'react';
import PropTypes from 'prop-types';

import { CSVLink } from "react-csv";
import { Functions } from '../../../../../../../utils/functions';

const NotaCompraCSV = ( props ) => {

    const { notaCompra } = props;

    let headers = [
        { label: "NRO",    key: "nro", },
        { label: "NRO FACTURA", key: "nrofactura", },
        { label: "FECHA", key: "fechanotacompra", },
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
        { label: "FLETES",  key: "fletes", },
        { label: "INTERNACIÓN",  key: "internacion", },
        { label: "OTROS GASTOS",  key: "otrosgastos", },
        { label: "MONTO TOTAL",  key: "montototal", },
        { label: "NOTA",      key: "nota", },
    ];

    const viewers = [];
    for (let index = 0; index < notaCompra.arrayNotaCompra.length; index++) {
        const element = notaCompra.arrayNotaCompra[index];
        viewers.push( {
            nro:    index + 1,
            nrofactura: element.nrofactura ? item.nrofactura : "",
            fechanotacompra: Functions.convertYMDToDMY(element.fechanotacompra),
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
            fletes: parseFloat(element.fletes).toFixed(2),
            internacion: parseFloat(element.internacion).toFixed(2),
            otrosgastos: parseFloat(element.otrosgastos).toFixed(2),
            montototal: parseFloat(element.montototal).toFixed(2),
            nota: element.nota ? item.nota : "",
        } );
    }
    
    return (
        <>
            <CSVLink style={{ display: 'none', }}
                data={viewers} headers={headers} separator={";"}
                filename={"notacompra.csv"} id={'buttonnotacompra_csv'}
            >
                Download
            </CSVLink>
        </>
    );
};

NotaCompraCSV.propTypes = {
    notaCompra: PropTypes.object,
};

NotaCompraCSV.defaultProps = {
};


export default NotaCompraCSV;
