
import React from 'react';
import PropTypes from 'prop-types';

import { CSVLink } from "react-csv";

const VendedorCSV = ( props ) => {

    const { vendedor } = props;

    let headers = [
        { label: "NRO", key: "nro", },
        { label: "CI", key: "ci", },
        { label: "NOMBRE", key: "nombre", },
        { label: "APELLIDO", key: "apellido", },
        { label: "COMISIÓN VENTA", key: "comisionventa", },
        { label: "CIUDAD", key: "ciudad", },
        { label: "DIRECCIÓN", key: "direccion", },
        { label: "FAX", key: "fax", },
        { label: "TELÉFONO", key: "telefono", },
        { label: "CELULAR", key: "celular", },
        { label: "EMAIL", key: "email", },
        { label: "FECHA NACIMIENTO", key: "fechanacimiento", },
        { label: "GÉNERO", key: "genero", },
        { label: "ESTADO CIVIL", key: "estadocivil", },
    ];

    const viewers = [];
    for (let index = 0; index < vendedor.arrayVendedor.length; index++) {
        const element = vendedor.arrayVendedor[index];
        viewers.push( {
            nro: index + 1,
            ci: element.ci,
            nombre: element.nombre,
            apellido: element.apellido,
            comisionventa: parseFloat(element.valor).toFixed(2) + '%',
            ciudad: element.ciudadpais + ' ' + element.ciudad,
            direccion: element.direccion ? element.direccion : '',
            fax: element.fax ? element.fax : '',
            telefono: element.telefono ? element.telefono : '',
            celular: element.celular ? element.celular : '',
            email: element.email ? element.email : '',
            fechanacimiento: element.fechanacimiento ? element.fechanacimiento : '',
            genero: element.genero == 'F' ? 'Femenino': element.genero == 'M' ? 'Masculino' : 'Ninguno',
            estadocivil: element.estadocivil == 'S' ? 'Solter@' : element.estadocivil == 'C' ? 'Casad@' : element.estadocivil == 'D' ? 'Divorciad@' : element.estadocivil == 'V' ? 'Viud@' : 'Ninguno',
        } );
    }

    return (
        <>
            <CSVLink style={{ display: 'none', }}
                data={viewers} headers={headers} separator={";"}
                filename={"vendedor.csv"} id={'buttonvendedor_csv'}
            >
                Download
            </CSVLink>
        </>
    );
};

VendedorCSV.propTypes = {
    vendedor: PropTypes.object,
};

VendedorCSV.defaultProps = {
};


export default VendedorCSV;
