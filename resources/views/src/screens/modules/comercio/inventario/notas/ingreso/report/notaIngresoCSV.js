
import React from 'react';
import PropTypes from 'prop-types';

import { CSVLink } from "react-csv";
import { Functions } from '../../../../../../../utils/functions';

const NotaIngresoCSV = ( props ) => {

    const { notaIngreso } = props;

    let headers = [
        { label: "NRO",     key: "nro", },
        { label: "CÓDIGO",  key: "codigo", },
        { label: "FECHA",   key: "fecha", },
        { label: "ÁLMACEN", key: "almacen", },
        { label: "SUCURSAL", key: "sucursal", },
        { label: "CONCEPTO", key: "concepto", },
        { label: "CANTIDAD TOTAL", key: "cantidadtotal", },
        { label: "MONTO TOTAL", key: "montototal", },
        { label: "PESO TOTAL", key: "pesototal", },
        { label: "VOLUMEN TOTAL", key: "volumentotal", },
        { label: "NRO CAJAS TOTAL", key: "nrocajastotal", },
        { label: "NOTA", key: "nota", },
    ];

    const viewers = [];
    for (let index = 0; index < notaIngreso.arrayNotaIngreso.length; index++) {
        const element = notaIngreso.arrayNotaIngreso[index];
        viewers.push( {
            nro: index + 1,
            codigo: element.codigo ? element.codigo : "",
            fecha: Functions.convertYMDToDMY(element.fechanotaingreso),
            almacen: element.almacen,
            sucursal: element.sucursal,
            concepto: element.conceptoinventario,
            cantidadtotal: element.cantidadtotal,
            montototal: parseFloat(element.montototal).toFixed(2),
            pesototal: parseFloat(element.pesototal).toFixed(2),
            volumentotal: parseFloat(element.volumentotal).toFixed(2),
            nrocajastotal: parseFloat(element.nrocajastotal).toFixed(2),
            nota: element.nota ? element.nota : "",
        } );
    }
    
    return (
        <>
            <CSVLink style={{ display: 'none', }}
                data={viewers} headers={headers} separator={";"}
                filename={"notaingreso.csv"} id={'buttonnotaingreso_csv'}
            >
                Download
            </CSVLink>
        </>
    );
};

NotaIngresoCSV.propTypes = {
    notaIngreso: PropTypes.object,
};

NotaIngresoCSV.defaultProps = {
};


export default NotaIngresoCSV;
