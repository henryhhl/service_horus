
import React from 'react';
import PropTypes from 'prop-types';

import ReactExport from 'react-data-export';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

const ProductoGrupoXLSX = ( props ) => {

    const { productoGrupo } = props;

    const DataSet = [
        {
            columns: [
                { title: "NRO",         style: { font: { sz: "12", bold: true, } }, },
                { title: "BREVE",       style: { font: { sz: "12", bold: true, } }, },
                { title: "DESCRIPCIÓN", style: { font: { sz: "12", bold: true, } }, },
            ],
            data: productoGrupo.arrayProductoGrupo.map( ( element, key ) => [
                { value: ( key + 1 ),         style: { font: { sz: "10", } } },
                { value: element.abreviatura ? element.abreviatura : "", style: { font: { sz: "10", } } },
                { value: element.descripcion, style: { font: { sz: "10", } } },
            ] ),
        },
    ];

    return (
        <ExcelFile 
            filename="grupoProducto" 
            element={
                <button type="button" id="buttonproductogrupo_xlsx" style={ {display: 'none', } } 
                >
                    Export Data
                </button>
            }
        >
            <ExcelSheet dataSet={DataSet} name="Grupo de Producto"/>
        </ExcelFile>
    );

};

ProductoGrupoXLSX.propTypes = {
    productoGrupo: PropTypes.object,
};

ProductoGrupoXLSX.defaultProps = {
};

export default ProductoGrupoXLSX;
