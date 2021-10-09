
import React from 'react';
import PropTypes from 'prop-types';

import { CSVLink } from "react-csv";

const ProveedorCSV = ( props ) => {

    const { proveedor } = props;

    let headers = [
        { label: "NRO",         key: "nro", },
        { label: "NOMBRE", key: "nombre", },
        { label: "PERSONERIA", key: "tipopersoneria", },
        { label: "GRUPO", key: "proveedorgrupo", },
        { label: "TIPO", key: "proveedortipo", },
        { label: "NIT", key: "nit", },
        { label: "PAIS", key: "ciudadpais", },
        { label: "CIUDAD", key: "ciudad", },
        { label: "DIRECCIÓN", key: "direccion", },
        { label: "TELÉFONO", key: "telefono", },
        { label: "CELULAR", key: "celular", },
        { label: "FAX", key: "fax", },
        { label: "EMAIL", key: "email", },
        { label: "SITIO WEB", key: "sitioweb", },
        { label: "NRO ORDEN", key: "nroorden", },
        { label: "FECHA ALTA", key: "fechaalta", },
        { label: "FECHA BAJA", key: "fechabaja", },
    ];

    const viewers = [];
    for (let index = 0; index < proveedor.arrayProveedor.length; index++) {
        const element = proveedor.arrayProveedor[index];
        viewers.push( {
            nro:         index + 1,
            nombre: element.nombre,
            tipopersoneria: element.tipopersoneria == "N" ? "Natural" : "Juridico",
            proveedorgrupo: element.proveedorgrupo,
            proveedortipo: element.proveedortipo,
            nit: element.nit,
            ciudadpais: element.ciudadpais,
            ciudad: element.ciudad,
            direccion: element.direccion,
            telefono: element.telefono,
            celular: element.celular,
            fax: element.fax,
            email: element.email,
            sitioweb: element.sitioweb,
            nroorden: element.nroorden,
            fechaalta: element.fechaalta,
            fechabaja: element.fechabaja,
        } );
    }
    
    return (
        <>
            <CSVLink style={{ display: 'none', }}
                data={viewers} headers={headers} separator={";"}
                filename={"proveedor.csv"} id={'buttonproveedor_csv'}
            >
                Download
            </CSVLink>
        </>
    );
};

ProveedorCSV.propTypes = {
    proveedor: PropTypes.object,
};

ProveedorCSV.defaultProps = {
};


export default ProveedorCSV;
