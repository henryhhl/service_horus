
import React from 'react';
import PropTypes from 'prop-types';

import ReactExport from 'react-data-export';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

const ProductoSubGrupoXLSX = ( props ) => {

    const { productoSubGrupo } = props;

    const DataSet = [
        {
            columns: [
                { title: "NRO",         style: { font: { sz: "12", bold: true, } }, },
                { title: "BREVE",       style: { font: { sz: "12", bold: true, } }, },
                { title: "DESCRIPCIÓN", style: { font: { sz: "12", bold: true, } }, },
                { title: "GRUPO",       style: { font: { sz: "12", bold: true, } }, },
            ],
            data: productoSubGrupo.arrayProductoSubGrupo.map( ( element, key ) => [
                { value: ( key + 1 ),           style: { font: { sz: "10", } } },
                { value: element.abreviatura ? element.abreviatura : "", style: { font: { sz: "10", } } },
                { value: element.descripcion,   style: { font: { sz: "10", } } },
                { value: element.productogrupo, style: { font: { sz: "10", } } },
            ] ),
        },
    ];

    return (
        <ExcelFile 
            filename="subGrupoProducto" 
            element={
                <button type="button" id="buttonproductosubgrupo_xlsx" style={ {display: 'none', } } 
                >
                    Export Data
                </button>
            }
        >
            <ExcelSheet dataSet={DataSet} name="Sub Grupo de Producto"/>
        </ExcelFile>
    );

};

ProductoSubGrupoXLSX.propTypes = {
    productoSubGrupo: PropTypes.object,
};

ProductoSubGrupoXLSX.defaultProps = {
};

export default ProductoSubGrupoXLSX;
