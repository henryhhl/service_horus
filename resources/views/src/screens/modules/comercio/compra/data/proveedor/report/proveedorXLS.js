
import React from 'react';
import PropTypes from 'prop-types';

import ReactHTMLTableToExcel from 'react-html-table-to-excel';

const ProveedorXLS = ( props ) => {
    
    const { proveedor } = props;

    return (
        <>
            <div style={{ display: 'none', }}>
                <ReactHTMLTableToExcel
                    id="buttonproveedor_xls"
                    className=""
                    table="proveedor_xls"
                    filename={"proveedor"}
                    sheet="hoja 1"
                    buttonText=""
                />
                <table border="1" id="proveedor_xls">
                    <thead>
                        <tr>
                            <th colSpan={"17"} style={{ fontWeight: 'bolder', padding: 10, fontSize: 20, }}>
                                PROVEEDOR
                            </th>
                        </tr>
                    </thead>
                    <thead>
                        <tr>
                            <th style={{ fontWeight: 'bolder', }}>NRO</th>
                            <th style={{ fontWeight: 'bolder', }}>NOMBRE</th>
                            <th style={{ fontWeight: 'bolder', }}>PERSONERIA</th>
                            <th style={{ fontWeight: 'bolder', }}>GRUPO</th>
                            <th style={{ fontWeight: 'bolder', }}>TIPO</th>
                            <th style={{ fontWeight: 'bolder', }}>NIT</th>
                            <th style={{ fontWeight: 'bolder', }}>PAIS</th>
                            <th style={{ fontWeight: 'bolder', }}>CIUDAD</th>
                            <th style={{ fontWeight: 'bolder', }}>DIRECCIÓN</th>
                            <th style={{ fontWeight: 'bolder', }}>TELÉFONO</th>
                            <th style={{ fontWeight: 'bolder', }}>CELULAR</th>
                            <th style={{ fontWeight: 'bolder', }}>FAX</th>
                            <th style={{ fontWeight: 'bolder', }}>EMAIL</th>
                            <th style={{ fontWeight: 'bolder', }}>SITIO WEB</th>
                            <th style={{ fontWeight: 'bolder', }}>NRO ORDEN</th>
                            <th style={{ fontWeight: 'bolder', }}>FECHA ALTA</th>
                            <th style={{ fontWeight: 'bolder', }}>FECHA BAJA</th>
                        </tr>
                    </thead>
                    <tbody>
                        { proveedor.arrayProveedor.map(
                            ( item, key) => (
                                <tr key={key}>
                                    <td style={{ padding: "5px" }}>
                                        { key + 1 }
                                    </td>
                                    <td style={{ padding: "5px" }}>
                                        { item.nombre }
                                    </td>
                                    <td style={{ padding: "5px" }}>
                                        { item.tipopersoneria == "N" ? "Natural" : "Juridico" }
                                    </td>
                                    <td style={{ padding: "5px" }}>
                                        { item.proveedorgrupo }
                                    </td>
                                    <td style={{ padding: "5px" }}>
                                        { item.proveedortipo }
                                    </td>
                                    <td style={{ padding: "5px" }}>
                                        { item.nite && item.nit }
                                    </td>
                                    <td style={{ padding: "5px" }}>
                                        { item.ciudadpais }
                                    </td>
                                    <td style={{ padding: "5px" }}>
                                        { item.ciudad }
                                    </td>
                                    <td style={{ padding: "5px" }}>
                                        { item.direccion && item.direccion }
                                    </td>
                                    <td style={{ padding: "5px" }}>
                                        { item.telefono && item.telefono }
                                    </td>
                                    <td style={{ padding: "5px" }}>
                                        { item.celular && item.celular }
                                    </td>
                                    <td style={{ padding: "5px" }}>
                                        { item.fax && item.fax }
                                    </td>
                                    <td style={{ padding: "5px" }}>
                                        { item.email && item.email }
                                    </td>
                                    <td style={{ padding: "5px" }}>
                                        { item.sitioweb && item.sitioweb }
                                    </td>
                                    <td style={{ padding: "5px" }}>
                                        { item.nroorden }
                                    </td>
                                    <td style={{ padding: "5px" }}>
                                        { item.fechaalta && item.fechaalta }
                                    </td>
                                    <td style={{ padding: "5px" }}>
                                        { item.fechabaja && item.fechabaja }
                                    </td>
                                </tr>
                            )
                        )}
                        <tr>
                            <td colSpan="17"></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
};

ProveedorXLS.propTypes = {
    proveedor: PropTypes.object,
};

ProveedorXLS.defaultProps = {
};

export default ProveedorXLS;
