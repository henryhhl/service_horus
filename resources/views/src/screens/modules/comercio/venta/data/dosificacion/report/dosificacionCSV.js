
import React from 'react';
import PropTypes from 'prop-types';

import { CSVLink } from "react-csv";
import { Functions } from '../../../../../../../utils/functions';

const DosificacionCSV = ( props ) => {

    const { dosificacion } = props;

    let headers = [
        { label: "NRO", key: "nro", },
        { label: "SUCURSAL", key: "sucursal", },
        { label: "ACTIVIDAD ECONÓMICA", key: "actividadeconomica", },
        { label: "DESCRIPCIÓN", key: "descripcion", },
        { label: "TIPO SUCURSAL", key: "tiposucursal", },
        { label: "TIPO DOSIFICACIÓN", key: "tipodosificacion", },
        { label: "TIPO EMPRESA", key: "tipoempresa", },
        { label: "NIT", key: "nit", },
        { label: "NRO. AUTORIZACIÓN", key: "nroautorizacion", },
        { label: "LLAVE", key: "llave", },
        { label: "LUGAR EMISIÓN", key: "lugaremision", },
        { label: "DIRECCIÓN FISCAL", key: "direccionfiscal", },
        { label: "TELÉFONO FISCAL", key: "telefonofiscal", },
        { label: "NRO. FACTURA INICIAL", key: "numfacturainicial", },
        { label: "NRO. FACTURA SIGUIENTE", key: "numfacturasiguiente", },
        { label: "FECHA ACTIVACIÓN", key: "fechaactivicacion", },
        { label: "FECHA LIMITE EMISIÓN", key: "fechalimiteemision", },
        { label: "RANGO FACTURA INICIAL", key: "rangofacturainicial", },
        { label: "RANGO FACTURA FINAL", key: "rangofacturafinal", },
        { label: "ESTADO", key: "estado", },
    ];

    const viewers = [];
    for (let index = 0; index < dosificacion.arrayDosificacion.length; index++) {
        const element = dosificacion.arrayDosificacion[index];
        viewers.push( {
            nro: index + 1,
            sucursal: element.sucursal,
            actividadeconomica: element.actividadeconomica,
            descripcion: element.descripcion,
            tiposucursal: element.tiposucursal === "S" ? "Sucursal" : "Casa Matriz",
            tipodosificacion: element.tipodosificacion === "A" ? "Automático" : "Manual",
            tipoempresa: element.tipoempresa === "N" ? "Natural" : "Jurídico",
            nit: element.nit,
            nroautorizacion: element.nroautorizacion,
            llave: element.llave,
            lugaremision: element.lugaremision,
            direccionfiscal: element.direccionfiscal,
            telefonofiscal: element.telefonofiscal,
            numfacturainicial: element.numfacturainicial,
            numfacturasiguiente: element.numfacturasiguiente,
            fechaactivicacion: Functions.convertYMDToDMY(element.fechaactivicacion),
            fechalimiteemision: Functions.convertYMDToDMY(element.fechalimiteemision),
            rangofacturainicial: element.rangofacturainicial,
            rangofacturafinal: element.rangofacturafinal,
            estado: element.estado === "A" ? "Activo" : "Cerrado",
        } );
    }

    return (
        <>
            <CSVLink style={{ display: 'none', }}
                data={viewers} headers={headers} separator={";"}
                filename={"dosificacion.csv"} id={'buttondosificacion_csv'}
            >
                Download
            </CSVLink>
        </>
    );
};

DosificacionCSV.propTypes = {
    dosificacion: PropTypes.object,
};

DosificacionCSV.defaultProps = {
};


export default DosificacionCSV;
