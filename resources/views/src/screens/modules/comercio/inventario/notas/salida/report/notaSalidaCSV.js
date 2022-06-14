
import React from 'react';
import PropTypes from 'prop-types';

import { CSVLink } from "react-csv";
import { Functions } from '../../../../../../../utils/functions';

const NotaSalidaCSV = ( props ) => {

    const { notaSalida } = props;

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
    for (let index = 0; index < notaSalida.arrayNotaSalida.length; index++) {
        const element = notaSalida.arrayNotaSalida[index];
        viewers.push( {
            nro: index + 1,
            codigo: element.codigo ? element.codigo : "",
            fecha: Functions.convertYMDToDMY(element.fechanotasalida),
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
                filename={"notasalida.csv"} id={'buttonnotasalida_csv'}
            >
                Download
            </CSVLink>
        </>
    );
};

NotaSalidaCSV.propTypes = {
    notaSalida: PropTypes.object,
};

NotaSalidaCSV.defaultProps = {
};


export default NotaSalidaCSV;
