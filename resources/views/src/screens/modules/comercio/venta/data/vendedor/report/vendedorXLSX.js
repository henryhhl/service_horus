
import React from 'react';
import PropTypes from 'prop-types';

import ReactExport from 'react-data-export';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

const VendedorXLSX = ( props ) => {

    const { vendedor } = props;

    const DataSet = [
        {
            columns: [
                { title: "NRO", style: { font: { sz: "12", bold: true, } }, },
                { title: "CI", style: { font: { sz: "12", bold: true, } }, },
                { title: "NOMBRE", style: { font: { sz: "12", bold: true, } }, },
                { title: "APELLIDO", style: { font: { sz: "12", bold: true, } }, },
                { title: "COMISIÓN VENTA", style: { font: { sz: "12", bold: true, } }, },
                { title: "CIUDAD", style: { font: { sz: "12", bold: true, } }, },
                { title: "DIRECCIÓN", style: { font: { sz: "12", bold: true, } }, },
                { title: "FAX", style: { font: { sz: "12", bold: true, } }, },
                { title: "TELÉFONO", style: { font: { sz: "12", bold: true, } }, },
                { title: "CELULAR", style: { font: { sz: "12", bold: true, } }, },
                { title: "EMAIL", style: { font: { sz: "12", bold: true, } }, },
                { title: "FECHA NACIMIENTO", style: { font: { sz: "12", bold: true, } }, },
                { title: "GÉNERO", style: { font: { sz: "12", bold: true, } }, },
                { title: "ESTADO CIVIL", style: { font: { sz: "12", bold: true, } }, },
            ],
            data: vendedor.arrayVendedor.map( ( element, key ) => [
                { value: ( key + 1 ), style: { font: { sz: "10", } } },
                { value: element.ci, style: { font: { sz: "10", } } },
                { value: element.nombre, style: { font: { sz: "10", } } },
                { value: element.apellido, style: { font: { sz: "10", } } },
                { value: parseFloat(element.valor).toFixed(2) + '%', style: { font: { sz: "10", } } },
                { value: `${element.ciudadpais} ${element.ciudad}`, style: { font: { sz: "10", } } },
                { value: element.direccion ? element.direccion : '', style: { font: { sz: "10", } } },
                { value: element.ci, style: { font: { sz: "10", } } },
                { value: element.fax ? element.fax : '', style: { font: { sz: "10", } } },
                { value: element.telefono ? element.telefono : '', style: { font: { sz: "10", } } },
                { value: element.celular ? element.celular : '', style: { font: { sz: "10", } } },
                { value: element.email ? element.email : '', style: { font: { sz: "10", } } },
                { value: element.fechanacimiento ? element.fechanacimiento : '', style: { font: { sz: "10", } } },
                { value: element.genero == 'F' ? 'Femenino': element.genero == 'M' ? 'Masculino' : 'Ninguno', style: { font: { sz: "10", } } },
                { value: element.estadocivil == 'S' ? 'Solter@' : element.estadocivil == 'C' ? 'Casad@' : element.estadocivil == 'D' ? 'Divorciad@' : element.estadocivil == 'V' ? 'Viud@' : 'Ninguno', style: { font: { sz: "10", } } },
            ] ),
        },
    ];

    return (
        <ExcelFile
            filename="vendedor"
            element={
                <button type="button" id="buttonvendedor_xlsx" style={ {display: 'none', } }
                >
                    Export Data
                </button>
            }
        >
            <ExcelSheet dataSet={DataSet} name="VENDEDOR"/>
        </ExcelFile>
    );

};

VendedorXLSX.propTypes = {
    vendedor: PropTypes.object,
};

VendedorXLSX.defaultProps = {
};

export default VendedorXLSX;
