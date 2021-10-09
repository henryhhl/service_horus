
import React from 'react';
import PropTypes from 'prop-types';

import ReactHTMLTableToExcel from 'react-html-table-to-excel';

const ListaPrecioXLS = ( props ) => {
    
    const { listaPrecio } = props;

    return (
        <>
            <div style={{ display: 'none', }}>
                <ReactHTMLTableToExcel
                    id="buttonlistaprecio_xls"
                    className=""
                    table="listaprecio_xls"
                    filename={"listaprecio"}
                    sheet="hoja 1"
                    buttonText=""
                />
                <table border="1" id="listaprecio_xls">
                    <thead>
                        <tr>
                            <th colSpan={"5"} style={{ fontWeight: 'bolder', padding: 10, fontSize: 20, }}>
                                LISTA PRECIO
                            </th>
                        </tr>
                    </thead>
                    <thead>
                        <tr>
                            <th style={{ fontWeight: 'bolder', }}>NRO</th>
                            <th style={{ fontWeight: 'bolder', }}>BREVE</th>
                            <th style={{ fontWeight: 'bolder', }}>FECHA</th>
                            <th style={{ fontWeight: 'bolder', }}>NOMBRE</th>
                            <th style={{ fontWeight: 'bolder', }}>NOTA</th>
                        </tr>
                    </thead>
                    <tbody>
                        { listaPrecio.arrayListaPrecio.map(
                            ( item, key) => (
                                <tr key={key}>
                                    <td style={{ padding: "5px" }}>
                                        { key + 1 }
                                    </td>
                                    <td style={{ padding: "5px" }}>
                                        { item.abreviatura && item.abreviatura }
                                    </td>
                                    <td style={{ padding: "5px" }}>
                                        { item.fechainicio }
                                    </td>
                                    <td style={{ padding: "5px" }}>
                                        { item.nombre }
                                    </td>
                                    <td style={{ padding: "5px" }}>
                                        { item.nota && item.nota }
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

ListaPrecioXLS.propTypes = {
    listaPrecio: PropTypes.object,
};

ListaPrecioXLS.defaultProps = {
};

export default ListaPrecioXLS;
