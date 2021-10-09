
import React from 'react';
import PropTypes from 'prop-types';

import { CSVLink } from "react-csv";

const ProveedorGrupoCSV = ( props ) => {

    const { proveedorGrupo } = props;

    let headers = [
        { label: "NRO",         key: "nro", },
        { label: "DESCRIPCIÓN", key: "descripcion", },
    ];

    const viewers = [];
    for (let index = 0; index < proveedorGrupo.arrayProveedorGrupo.length; index++) {
        const element = proveedorGrupo.arrayProveedorGrupo[index];
        viewers.push( {
            nro:         index + 1,
            descripcion: element.descripcion,
        } );
    }
    
    return (
        <>
            <CSVLink style={{ display: 'none', }}
                data={viewers} headers={headers} separator={";"}
                filename={"proveedorgrupo.csv"} id={'buttonproveedorgrupo_csv'}
            >
                Download
            </CSVLink>
        </>
    );
};

ProveedorGrupoCSV.propTypes = {
    proveedorGrupo: PropTypes.object,
};

ProveedorGrupoCSV.defaultProps = {
};


export default ProveedorGrupoCSV;
