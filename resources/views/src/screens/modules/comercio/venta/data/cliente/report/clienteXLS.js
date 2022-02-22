
import React from 'react';
import PropTypes from 'prop-types';

import ReactHTMLTableToExcel from 'react-html-table-to-excel';

const ClienteXLS = ( props ) => {

    const { cliente } = props;

    return (
        <>
            <div style={{ display: 'none', }}>
                <ReactHTMLTableToExcel
                    id="buttoncliente_xls"
                    className=""
                    table="cliente_xls"
                    filename={"cliente"}
                    sheet="CLIENTE"
                    buttonText=""
                />
                <table border="1" id="cliente_xls">
                    <thead>
                        <tr>
                            <th colSpan={"26"} style={{ fontWeight: 'bolder', padding: 10, fontSize: 20, }}>
                                CLIENTE
                            </th>
                        </tr>
                    </thead>
                    <thead>
                        <tr>
                            <th style={{ fontWeight: 'bolder', }}>NRO</th>
                            <th style={{ fontWeight: 'bolder', }}>PAIS</th>
                            <th style={{ fontWeight: 'bolder', }}>CIUDAD</th>
                            <th style={{ fontWeight: 'bolder', }}>TIPO</th>
                            <th style={{ fontWeight: 'bolder', }}>NOMBRE</th>
                            <th style={{ fontWeight: 'bolder', }}>APELLIDO</th>
                            <th style={{ fontWeight: 'bolder', }}>RAZON SOCIAL</th>
                            <th style={{ fontWeight: 'bolder', }}>NIT</th>
                            <th style={{ fontWeight: 'bolder', }}>EMAIL</th>
                            <th style={{ fontWeight: 'bolder', }}>CASILLA</th>
                            <th style={{ fontWeight: 'bolder', }}>TELÉFONO</th>
                            <th style={{ fontWeight: 'bolder', }}>CELULAR</th>
                            <th style={{ fontWeight: 'bolder', }}>CONTACTO</th>
                            <th style={{ fontWeight: 'bolder', }}>DIRECCIÓN</th>
                            <th style={{ fontWeight: 'bolder', }}>DÍAS CRÉDITO</th>
                            <th style={{ fontWeight: 'bolder', }}>LIMIE CRÉDITO</th>
                            <th style={{ fontWeight: 'bolder', }}>DESCUENTO</th>
                            <th style={{ fontWeight: 'bolder', }}>CANTIDAD ITEMS</th>
                            <th style={{ fontWeight: 'bolder', }}>DESCUENTO X CANTIDAD ITEMS</th>
                            <th style={{ fontWeight: 'bolder', }}>DESCUENTO INICIAL</th>
                            <th style={{ fontWeight: 'bolder', }}>DESCUENTO FINAL</th>
                            <th style={{ fontWeight: 'bolder', }}>MONTO TOTAL ADEUDADO</th>
                            <th style={{ fontWeight: 'bolder', }}>FECHA ÚLTIMO PAGO</th>
                            <th style={{ fontWeight: 'bolder', }}>MONTO ADEUDADO ÚLTIMO PAGO</th>
                            <th style={{ fontWeight: 'bolder', }}>FECHA ÚLTIMA VENTA</th>
                            <th style={{ fontWeight: 'bolder', }}>MONTO ÚLTIMA VENTA</th>
                        </tr>
                    </thead>
                    <tbody>
                        { cliente.arrayCliente.map(
                            ( item, key) => (
                                <tr key={key}>
                                    <td style={{ padding: "5px" }}>
                                        { key + 1 }
                                    </td>
                                    <td style={{ padding: "5px" }}>
                                        { item.ciudadpais }
                                    </td>
                                    <td style={{ padding: "5px" }}>
                                        { item.ciudad }
                                    </td>
                                    <td style={{ padding: "5px" }}>
                                        { item.tipocliente }
                                    </td>
                                    <td style={{ padding: "5px" }}>
                                        { item.nombre }
                                    </td>
                                    <td style={{ padding: "5px" }}>
                                        { item.apellido }
                                    </td>
                                    <td style={{ padding: "5px" }}>
                                        { item.razonsocial }
                                    </td>
                                    <td style={{ padding: "5px" }}>
                                        { item.nit ? item.nit : "" }
                                    </td>
                                    <td style={{ padding: "5px" }}>
                                        { item.email ? item.email : "" }
                                    </td>
                                    <td style={{ padding: "5px" }}>
                                        { item.casilla ? item.casilla : "" }
                                    </td>
                                    <td style={{ padding: "5px" }}>
                                        { item.telefono ? item.telefono : "" }
                                    </td>
                                    <td style={{ padding: "5px" }}>
                                        { item.celular ? item.celular : "" }
                                    </td>
                                    <td style={{ padding: "5px" }}>
                                        { item.contacto ? item.contacto : "" }
                                    </td>
                                    <td style={{ padding: "5px" }}>
                                        { item.direccion ? item.direccion : "" }
                                    </td>
                                    <td style={{ padding: "5px" }}>
                                        { item.diascredito }
                                    </td>
                                    <td style={{ padding: "5px" }}>
                                        { item.limitecredito }
                                    </td>
                                    <td style={{ padding: "5px" }}>
                                        { item.descuento }
                                    </td>
                                    <td style={{ padding: "5px" }}>
                                        { item.cantidaditems }
                                    </td>
                                    <td style={{ padding: "5px" }}>
                                        { item.descuentoxcantidaditems }
                                    </td>
                                    <td style={{ padding: "5px" }}>
                                        { item.descuentoinicial }
                                    </td>
                                    <td style={{ padding: "5px" }}>
                                        { item.descuentofinal }
                                    </td>
                                    <td style={{ padding: "5px" }}>
                                        { item.montototaladeudado }
                                    </td>
                                    <td style={{ padding: "5px" }}>
                                        { item.fechaultimopago }
                                    </td>
                                    <td style={{ padding: "5px" }}>
                                        { item.montototaladeudadoultimopago }
                                    </td>
                                    <td style={{ padding: "5px" }}>
                                        { item.fechaultimaventa }
                                    </td>
                                    <td style={{ padding: "5px" }}>
                                        { item.montototalultimaventa }
                                    </td>
                                </tr>
                            )
                        )}
                        <tr>
                            <td colSpan="26"></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
};

ClienteXLS.propTypes = {
    cliente: PropTypes.object,
};

ClienteXLS.defaultProps = {
};

export default ClienteXLS;
