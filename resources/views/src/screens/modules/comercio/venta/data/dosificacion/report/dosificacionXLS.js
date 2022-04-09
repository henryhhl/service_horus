
import React from 'react';
import PropTypes from 'prop-types';

import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { Functions } from '../../../../../../../utils/functions';

const DosificacionXLS = ( props ) => {

    const { dosificacion } = props;

    return (
        <>
            <div style={{ display: 'none', }}>
                <ReactHTMLTableToExcel
                    id="buttondosificacion_xls"
                    className=""
                    table="dosificacion_xls"
                    filename={"dosificacion"}
                    sheet="DOSIFICACIÓN"
                    buttonText=""
                />
                <table border="1" id="dosificacion_xls">
                    <thead>
                        <tr>
                            <th colSpan={"20"} style={{ fontWeight: 'bolder', padding: 10, fontSize: 20, }}>
                                DOSIFICACIÓN
                            </th>
                        </tr>
                    </thead>
                    <thead>
                        <tr>
                            <th style={{ fontWeight: 'bolder', }}>NRO</th>
                            <th style={{ fontWeight: 'bolder', }}>SUCURSAL</th>
                            <th style={{ fontWeight: 'bolder', }}>ACTIVIDAD ECONÓMICA</th>
                            <th style={{ fontWeight: 'bolder', }}>DESCRIPCIÓN</th>
                            <th style={{ fontWeight: 'bolder', }}>TIPO SUCURSAL</th>
                            <th style={{ fontWeight: 'bolder', }}>TIPO DOSIFICACIÓN</th>
                            <th style={{ fontWeight: 'bolder', }}>TIPO EMPRESA</th>
                            <th style={{ fontWeight: 'bolder', }}>NIT</th>
                            <th style={{ fontWeight: 'bolder', }}>NRO. AUTORIZACIÓN</th>
                            <th style={{ fontWeight: 'bolder', }}>LLAVE</th>
                            <th style={{ fontWeight: 'bolder', }}>LUGAR EMISIÓN</th>
                            <th style={{ fontWeight: 'bolder', }}>DIRECCIÓN FISCAL</th>
                            <th style={{ fontWeight: 'bolder', }}>TELÉFONO FISCAL</th>
                            <th style={{ fontWeight: 'bolder', }}>NRO. FACTURA INICIAL</th>
                            <th style={{ fontWeight: 'bolder', }}>NRO. FACTURA SIGUIENTE</th>
                            <th style={{ fontWeight: 'bolder', }}>FECHA ACTIVACIÓN</th>
                            <th style={{ fontWeight: 'bolder', }}>FECHA LIMITE EMISIÓN</th>
                            <th style={{ fontWeight: 'bolder', }}>RANGO FACTURA INICIAL</th>
                            <th style={{ fontWeight: 'bolder', }}>RANGO FACTURA FINAL</th>
                            <th style={{ fontWeight: 'bolder', }}>ESTADO</th>
                        </tr>
                    </thead>
                    <tbody>
                        { dosificacion.arrayDosificacion.map(
                            ( item, key) => (
                                <tr key={key}>
                                    <td style={{ padding: "5px" }}>
                                        { key + 1 }
                                    </td>
                                    <td style={{ padding: "5px" }}>
                                        { item.sucursal }
                                    </td>
                                    <td style={{ padding: "5px" }}>
                                        { item.actividadeconomica }
                                    </td>
                                    <td style={{ padding: "5px" }}>
                                        { item.descripcion }
                                    </td>
                                    <td style={{ padding: "5px" }}>
                                        { item.tiposucursal === "S" ? "Sucursal" : "Casa Matriz" }
                                    </td>
                                    <td style={{ padding: "5px" }}>
                                        { item.tipodoisificacion === "A" ? "Automático" : "Manual" }
                                    </td>
                                    <td style={{ padding: "5px" }}>
                                        { item.tipoempresa === "N" ? "Natura" : "Jurídico" }
                                    </td>
                                    <td style={{ padding: "5px" }}>
                                        { item.nit }
                                    </td>
                                    <td style={{ padding: "5px" }}>
                                        { item.nroautorizacion }
                                    </td>
                                    <td style={{ padding: "5px" }}>
                                        { item.llave }
                                    </td>
                                    <td style={{ padding: "5px" }}>
                                        { item.lugaremision }
                                    </td>
                                    <td style={{ padding: "5px" }}>
                                        { item.direccionfiscal }
                                    </td>
                                    <td style={{ padding: "5px" }}>
                                        { item.telefonofiscal }
                                    </td>
                                    <td style={{ padding: "5px" }}>
                                        { item.numfacturainicial }
                                    </td>
                                    <td style={{ padding: "5px" }}>
                                        { item.numfacturasiguiente }
                                    </td>
                                    <td style={{ padding: "5px" }}>
                                        { Functions.convertYMDToDMY( item.fechaactivicacion ) }
                                    </td>
                                    <td style={{ padding: "5px" }}>
                                        { Functions.convertYMDToDMY( item.fechalimiteemision ) }
                                    </td>
                                    <td style={{ padding: "5px" }}>
                                        { item.rangofacturainicial }
                                    </td>
                                    <td style={{ padding: "5px" }}>
                                        { item.rangofacturafinal }
                                    </td>
                                    <td style={{ padding: "5px" }}>
                                        { item.estado === "A" ? "Activo" : "Cerrado" }
                                    </td>
                                </tr>
                            )
                        )}
                        <tr>
                            <td colSpan="20"></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
};

DosificacionXLS.propTypes = {
    dosificacion: PropTypes.object,
};

DosificacionXLS.defaultProps = {
};

export default DosificacionXLS;
