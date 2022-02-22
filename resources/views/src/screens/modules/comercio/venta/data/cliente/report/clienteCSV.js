
import React from 'react';
import PropTypes from 'prop-types';

import { CSVLink } from "react-csv";

const ClienteCSV = ( props ) => {

    const { cliente } = props;

    let headers = [
        { label: "NRO",  key: "nro", },
        { label: "PAIS", key: "ciudadpais", },
        { label: "CIUDAD", key: "ciudad", },
        { label: "TIPO", key: "tipocliente", },
        { label: "NOMBRE", key: "nombre", },
        { label: "APELLIDO", key: "apellido", },
        { label: "RAZON SOCIAL", key: "razonsocial", },
        { label: "NIT", key: "nit", },
        { label: "EMAIL", key: "email", },
        { label: "CASILLA", key: "casilla", },
        { label: "TELÉFONO", key: "telefono", },
        { label: "CELULAR", key: "celular", },
        { label: "CONTACTO", key: "contacto", },
        { label: "DIRECCIÓN", key: "direccion", },
        { label: "DÍAS CRÉDITO", key: "diascredito", },
        { label: "LIMITE CRÉDITO", key: "limitecredito", },
        { label: "DESCUENTO", key: "descuento", },
        { label: "CANTIDAD ITEMS", key: "cantidaditems", },
        { label: "DESCUENTO X CANTIDAD ITEMS", key: "descuentoxcantidaditems", },
        { label: "DESCUENTO INICIAL", key: "descuentoinicial", },
        { label: "DESCUENTO FINAL", key: "descuentofinal", },
        { label: "MONTO TOTAL ADEUDADO", key: "montototaladeudado", },
        { label: "FECHA ÚLTIMO PAGO", key: "fechaultimopago", },
        { label: "MONTO ADEUDADO ÚLTIMO PAGO", key: "montototaladeudadoultimopago", },
        { label: "FECHA ÚLTIMA VENTA", key: "fechaultimaventa", },
        { label: "MONTO ÚLTIMA VENTA", key: "montototalultimaventa", },
    ];

    const viewers = [];
    for (let index = 0; index < cliente.arrayCliente.length; index++) {
        const element = cliente.arrayCliente[index];
        viewers.push( {
            nro:         index + 1,
            ciudadpais: element.ciudadpais,
            ciudad: element.ciudad,
            tipocliente: element.tipocliente,
            nombre: element.nombre,
            apellido: element.apellido,
            razonsocial: element.razonsocial,
            nit: element.nit ? element.nit : "",
            email: element.email ? element.email : "",
            casilla: element.casilla ? element.casilla : "",
            telefono: element.telefono ? element.telefono : "",
            celular: element.celular ? element.celular : "",
            contacto: element.contacto ? element.contacto : "",
            direccion: element.direccion ? element.direccion : "",
            diascredito: element.diascredito,
            limitecredito: element.limitecredito,
            descuento: element.descuento,
            cantidaditems: element.cantidaditems,
            descuentoxcantidaditems: element.descuentoxcantidaditems,
            descuentoinicial: element.descuentoinicial,
            descuentofinal: element.descuentofinal,
            montototaladeudado: element.montototaladeudado,
            fechaultimopago: element.fechaultimopago,
            montototaladeudadoultimopago: element.montototaladeudadoultimopago,
            fechaultimaventa: element.fechaultimaventa,
            montototalultimaventa: element.montototalultimaventa,
        } );
    }

    return (
        <>
            <CSVLink style={{ display: 'none', }}
                data={viewers} headers={headers} separator={";"}
                filename={"cliente.csv"} id={'buttoncliente_csv'}
            >
                Download
            </CSVLink>
        </>
    );
};

ClienteCSV.propTypes = {
    cliente: PropTypes.object,
};

ClienteCSV.defaultProps = {
};


export default ClienteCSV;
