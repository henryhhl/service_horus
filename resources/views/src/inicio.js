
import React, { useState } from 'react';
import * as XLSX from 'xlsx';

import * as FileSaver from 'file-saver';

const Inicio = ( props ) => {

    const {} = props;
    const [ arrayHojaInicio, setFileInicio ] = useState( [] );
    const [ arrayHojaFinal, setFileFinal ] = useState( [] );

    function exportToXLSX(array_data, fileName) {

        const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        const fileExtension = '.xlsx';

        const ws = XLSX.utils.json_to_sheet( array_data );
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };

        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array', sheet: 'Hoja 1', cellStyles: true, });

        const data = new Blob([excelBuffer], {type: fileType,});

        FileSaver.saveAs(data, fileName + fileExtension);

    }

    function generarResultadoExcel(evt) {
        console.log(arrayHojaInicio)
        console.log(arrayHojaFinal)
        for (let index = 0; index < arrayHojaFinal.length; index++) {
            const element = arrayHojaFinal[index];
            let bandera = false;
            let cantidad = 0;
            for (let pos = 0; pos < arrayHojaInicio.length; pos++) {
                let item = arrayHojaInicio[pos];
                if ( parseInt( item.Registro ) === parseInt( element.Registro ) ) {
                    bandera = true;
                    cantidad++;
                }
            }
            let contador = 0;
            for (let pos = 0; pos < arrayHojaFinal.length; pos++) {
                let item = arrayHojaFinal[pos];
                if ( parseInt( item.Registro ) === parseInt( element.Registro ) ) {
                    contador++;
                }
            }
            if ( bandera ) {
                element.Habilitado = "OK";
            } else {
                element.Habilitado = "Observado";
            }
            element.cantidadRegistrado = cantidad;
            element.cantidadPadronEstudiantil = contador;
            console.log("exito")
            if ( index === ( arrayHojaFinal.length - 1 ) ) {
                console.log( "Final de proceso" )
                console.log( arrayHojaFinal )
                exportToXLSX( arrayHojaFinal, "ConsolidadoHabilitadoObservado" );
            }
        }
    }

    function handleInputFileFinal(evt) {
        let files = evt.target.files;
        let target = evt.target;
        let hojas = [];

        let reader = new FileReader();
        reader.readAsArrayBuffer( target.files[0] );
        
        reader.onload = async ( e ) => {
            let bufferArray =  e.target.result;
            let workbook = XLSX.read( bufferArray, { type: "buffer" } );

            let arrayHojasTotal = [];

            await workbook.SheetNames.forEach( function ( sheetName ) {
                // let XL_row_object = XLSX.utils.sheet_to_row_object_array( workbook.Sheets[sheetName] );
                let XL_row_object = XLSX.utils.sheet_to_json( workbook.Sheets[sheetName] );

                hojas.push( {
                    data: XL_row_object,
                    sheetName,
                } );



            } );
            console.log(hojas)

            for (let index = 0; index < hojas.length; index++) {
                const element = hojas[index];
                for (let pos = 0; pos < element.data.length; pos++) {
                    const item = element.data[pos];
                    arrayHojasTotal.push( item );
                }
            }

            setFileFinal( arrayHojasTotal )
        };
    }

    async function handleInputFileInicio(evt) {
        let files = evt.target.files;
        let target = evt.target;
        let hojas = [];

        let reader = new FileReader();
        reader.readAsArrayBuffer( target.files[0] );
        
        reader.onload = async ( e ) => {
            let bufferArray =  e.target.result;
            let workbook = XLSX.read( bufferArray, { type: "buffer" } );

            let arrayHojasTotal = [];

            await workbook.SheetNames.forEach( function ( sheetName ) {
                // let XL_row_object = XLSX.utils.sheet_to_row_object_array( workbook.Sheets[sheetName] );
                let XL_row_object = XLSX.utils.sheet_to_json( workbook.Sheets[sheetName] );

                hojas.push( {
                    data: XL_row_object,
                    sheetName,
                } );



            } );
            console.log(hojas)

            for (let index = 0; index < hojas.length; index++) {
                const element = hojas[index];
                for (let pos = 0; pos < element.data.length; pos++) {
                    const item = element.data[pos];
                    arrayHojasTotal.push( item );
                }
            }

            setFileInicio( arrayHojasTotal )
        };

    }

    return (
        <>
            <div className="main-card mb-3 card">
                <div className="card-header pr-3 pl-3">
                    <div className="row no-gutters align-items-center w-100">
                        HORUS S.R.L
                    </div>
                </div>
                <div className="card-body">
                    <h5 className="card-title"></h5>
                    <div className="form-row"></div>
                    {/* <div className="form-row">
                        <input type={"file"} onChange={handleInputFileInicio} placeholder={"Archivo Excel"} />
                    </div>
                    <div className="form-row">
                        <input type={"file"} onChange={handleInputFileFinal} placeholder={"Archivo Excel"} />
                    </div>
                    <div className="row">
                        <button className="btn btn-primary" onClick={ generarResultadoExcel }>Generar</button>
                    </div> */}
                </div>
            </div>
        </>
    );

};

export default Inicio;
