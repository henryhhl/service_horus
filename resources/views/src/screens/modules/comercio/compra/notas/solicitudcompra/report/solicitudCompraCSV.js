
import React from 'react';
import PropTypes from 'prop-types';

import { CSVLink } from "react-csv";
import { Functions } from '../../../../../../../utils/functions';

const SolicitudCompraCSV = ( props ) => {

    const { solicitudCompra } = props;

    let headers = [
        { label: "NRO",    key: "nro", },
        { label: "CÓDIGO", key: "codigo", },
        { label: "FECHA SOLICITADA", key: "fechasolicitada", },
        { label: "FECHA REALIZADA",  key: "fechafinalizada", },
        { label: "SUCURSAL",  key: "sucursal", },
        { label: "ÁLMACEN",   key: "almacen", },
        { label: "PROVEEDOR", key: "proveedor", },
        { label: "CONCEPTO",  key: "conceptocompra", },
        { label: "SECCIÓN",   key: "seccioninventario", },
        { label: "TIPO",      key: "tiposolicitud", },
        { label: "MONEDA",    key: "moneda", },
        { label: "CANTIDAD TOTAL",  key: "cantidadsolicitadatotal", },
        { label: "MONTO TOTAL",  key: "montototal", },
        { label: "NOTA",      key: "nota", },
    ];

    const viewers = [];
    for (let index = 0; index < solicitudCompra.arraySolicitudCompra.length; index++) {
        const element = solicitudCompra.arraySolicitudCompra[index];
        viewers.push( {
            nro:    index + 1,
            codigo: element.codigo ? item.codigo : "",
            fechasolicitada: Functions.convertYMDToDMY(element.fechasolicitada),
            fechafinalizada: Functions.convertYMDToDMY(element.fechafinalizada),
            sucursal: element.sucursal,
            almacen: element.almacen,
            proveedor: element.proveedor,
            conceptocompra: element.conceptocompra,
            seccioninventario: element.seccioninventario,
            tiposolicitud: element.tiposolicitud === "L" ? "Local" : "Exterior",
            moneda: element.moneda,
            cantidadsolicitadatotal: element.cantidadsolicitadatotal,
            montototal: parseFloat(element.montototal).toFixed(2),
            nota: element.nota ? item.nota : "",
        } );
    }
    
    return (
        <>
            <CSVLink style={{ display: 'none', }}
                data={viewers} headers={headers} separator={";"}
                filename={"solicitudcompra.csv"} id={'buttonsolicitudcompra_csv'}
            >
                Download
            </CSVLink>
        </>
    );
};

SolicitudCompraCSV.propTypes = {
    solicitudCompra: PropTypes.object,
};

SolicitudCompraCSV.defaultProps = {
};


export default SolicitudCompraCSV;
