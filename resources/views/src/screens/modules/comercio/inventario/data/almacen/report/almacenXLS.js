
import React from 'react';
import PropTypes from 'prop-types';

import ReactHTMLTableToExcel from 'react-html-table-to-excel';

const AlmacenXLS = ( props ) => {
    
    const { almacen } = props;

    return (
        <>
            <div style={{ display: 'none', }}>
                <ReactHTMLTableToExcel
                    id="buttonalmacen_xls"
                    className=""
                    table="almacen_xls"
                    filename={"almacen"}
                    sheet="hoja 1"
                    buttonText=""
                />
                <table border="1" id="almacen_xls">
                    <thead>
                        <tr>
                            <th colSpan={"5"} style={{ fontWeight: 'bolder', padding: 10, fontSize: 20, }}>
                                ÁLMACEN
                            </th>
                        </tr>
                    </thead>
                    <thead>
                        <tr>
                            <th style={{ fontWeight: 'bolder', }}>NRO</th>
                            <th style={{ fontWeight: 'bolder', }}>BREVE</th>
                            <th style={{ fontWeight: 'bolder', }}>DESCRIPCIÓN</th>
                            <th style={{ fontWeight: 'bolder', }}>DIRECCIÓN</th>
                            <th style={{ fontWeight: 'bolder', }}>SUCURSAL</th>
                        </tr>
                    </thead>
                    <tbody>
                        { almacen.arrayAlmacen.map(
                            ( item, key) => (
                                <tr key={key}>
                                    <td style={{ padding: "5px" }}>
                                        { key + 1 }
                                    </td>
                                    <td style={{ padding: "5px" }}>
                                        { item.abreviatura }
                                    </td>
                                    <td style={{ padding: "5px" }}>
                                        { item.descripcion }
                                    </td>
                                    <td style={{ padding: "5px" }}>
                                        { item.direccion }
                                    </td>
                                    <td style={{ padding: "5px" }}>
                                        { item.sucursal }
                                    </td>
                                </tr>
                            )
                        )}
                        <tr>
                            <td colSpan="5"></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
};

AlmacenXLS.propTypes = {
    almacen: PropTypes.object,
};

AlmacenXLS.defaultProps = {
};

export default AlmacenXLS;
