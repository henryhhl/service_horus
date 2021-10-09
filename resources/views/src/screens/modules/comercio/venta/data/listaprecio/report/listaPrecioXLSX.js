
import React from 'react';
import PropTypes from 'prop-types';

import ReactExport from 'react-data-export';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

const ListaPrecioXLSX = ( props ) => {

    const { listaPrecio } = props;

    const DataSet = [
        {
            columns: [
                { title: "NRO",            style: { font: { sz: "12", bold: true, } }, },
                { title: "BREVE",    style: { font: { sz: "12", bold: true, } }, },
                { title: "FECHA",      style: { font: { sz: "12", bold: true, } }, },
                { title: "NOMBRE",         style: { font: { sz: "12", bold: true, } }, },
                { title: "NOTA", style: { font: { sz: "12", bold: true, } }, },
            ],
            data: listaPrecio.arrayUnionListaPrecio.map( ( element, key ) => [
                { value: ( key + 1 ),         style: { font: { sz: "10", } } },
                { value: element.abreviatura ? element.abreviatura : "", style: { font: { sz: "10", } } },
                { value: element.fechainicio,   style: { font: { sz: "10", } } },
                { value: element.nombre,      style: { font: { sz: "10", } } },
                { value: element.nota ? element.nota : "", style: { font: { sz: "10", } } },
            ] ),
        },
    ];

    return (
        <ExcelFile 
            filename="listaprecio" 
            element={
                <button type="button" id="buttonlistaprecio_xlsx" style={ {display: 'none', } } 
                >
                    Export Data
                </button>
            }
        >
            <ExcelSheet dataSet={DataSet} name="listaprecio"/>
        </ExcelFile>
    );

};

ListaPrecioXLSX.propTypes = {
    listaPrecio: PropTypes.object,
};

ListaPrecioXLSX.defaultProps = {
};

export default ListaPrecioXLSX;
