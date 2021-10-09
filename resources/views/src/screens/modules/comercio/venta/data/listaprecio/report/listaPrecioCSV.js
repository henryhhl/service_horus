
import React from 'react';
import PropTypes from 'prop-types';

import { CSVLink } from "react-csv";

const ListaPrecioCSV = ( props ) => {

    const { listaPrecio } = props;

    let headers = [
        { label: "NRO",    key: "nro", },
        { label: "BREVE",  key: "abreviatura", },
        { label: "NOMBRE", key: "nombre", },
        { label: "FECHA",  key: "fechainicio", },
        { label: "NOTA",   key: "nota", },
    ];

    const viewers = [];
    for (let index = 0; index < listaPrecio.arrayListaPrecio.length; index++) {
        const element = listaPrecio.arrayListaPrecio[index];
        viewers.push( {
            nro:         index + 1,
            abreviatura: element.abreviatura && item.abreviatura,
            nombre:      element.nombre,
            fechainicio: element.fechainicio,
            nota:        element.nota && item.nota,
        } );
    }
    
    return (
        <>
            <CSVLink style={{ display: 'none', }}
                data={viewers} headers={headers} separator={";"}
                filename={"listaprecio.csv"} id={'buttonlistaprecio_csv'}
            >
                Download
            </CSVLink>
        </>
    );
};

ListaPrecioCSV.propTypes = {
    listaPrecio: PropTypes.object,
};

ListaPrecioCSV.defaultProps = {
};


export default ListaPrecioCSV;
