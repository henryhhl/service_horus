
import React from 'react';
import PropTypes from 'prop-types';

import { CSVLink } from "react-csv";
import { Functions } from '../../../../../../../utils/functions';

const OrdenCompraCSV = ( props ) => {

    const { ordenCompra } = props;

    let headers = [
        { label: "NRO",    key: "nro", },
        { label: "NRO FACTURA", key: "nrofactura", },
        { label: "FECHA", key: "fechasolicitada", },
        { label: "SUCURSAL",  key: "sucursal", },
        { label: "ÁLMACEN",   key: "almacen", },
        { label: "PROVEEDOR", key: "proveedor", },
        { label: "CONCEPTO",  key: "conceptocompra", },
        { label: "SECCIÓN",   key: "seccioninventario", },
        { label: "TIPO",      key: "tiposolicitud", },
        { label: "MONEDA",    key: "moneda", },
        { label: "CANTIDAD TOTAL",  key: "cantidadtotal", },
        { label: "MONTO SUB TOTAL",  key: "montosubtotal", },
        { label: "FLETES",  key: "fletes", },
        { label: "INTERNACIÓN",  key: "internacion", },
        { label: "OTROS GASTOS",  key: "otrosgastos", },
        { label: "MONTO TOTAL",  key: "montototal", },
        { label: "NOTA",      key: "nota", },
    ];

    const viewers = [];
    for (let index = 0; index < ordenCompra.arrayOrdenCompra.length; index++) {
        const element = ordenCompra.arrayOrdenCompra[index];
        viewers.push( {
            nro:    index + 1,
            nrofactura: element.nrofactura ? item.nrofactura : "",
            fechasolicitada: Functions.convertYMDToDMY(element.fechasolicitada),
            sucursal: element.sucursal,
            almacen: element.almacen,
            proveedor: element.proveedor,
            conceptocompra: element.conceptocompra,
            seccioninventario: element.seccioninventario,
            tiposolicitud: element.tiposolicitud === "L" ? "Local" : "Exterior",
            moneda: element.moneda,
            cantidadtotal: element.cantidadtotal,
            montosubtotal: parseFloat(element.montosubtotal).toFixed(2),
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
                filename={"ordencompra.csv"} id={'buttonordencompra_csv'}
            >
                Download
            </CSVLink>
        </>
    );
};

OrdenCompraCSV.propTypes = {
    ordenCompra: PropTypes.object,
};

OrdenCompraCSV.defaultProps = {
};


export default OrdenCompraCSV;
