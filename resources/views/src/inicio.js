
import React, { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';

import * as FileSaver from 'file-saver';
import { httpRequest } from './utils/httpRequest';
import webservices from './utils/webservices';
import { C_Message } from './components';

const Inicio = (props) => {

    const { } = props;
    const [arrayHojaInicio, setFileInicio] = useState([]);
    const [arrayHojaFinal, setFileFinal] = useState([]);
    const [arrayTipoTransaccion, setArrayTipoTransaccion] = useState([]);

    useEffect(() => {
        get_data();
        //   return () => {}
    }, []);

    function resultData(result) {
        if (result.response == -5) {
            C_Message("error", "Problemas con la url no encontrado.");
        }
        if (result.response == -4) {
            C_Message("error", "Hubo problemas de conexión de servidor.");
        }
        if (result.response == -1) {
            C_Message("warning", result.message);
        }
    };

    function get_data() {
        httpRequest('post', webservices.wsinicio, {})
            .then((result) => {
                console.log(result)
                resultData(result);
                if (result.response == 1) {
                    C_Message("success", "Servicio realizado exitosamente.");
                    setArrayTipoTransaccion(result.arrayTipoTransaccion);
                }
            });
    }

    function getCantidadRealizadaNotaTransaccion(index = -1) {
        if (index > -1 && index <= arrayTipoTransaccion.length) {
            let tipotransaccion = arrayTipoTransaccion[index];
            if (tipotransaccion) {
                return tipotransaccion.cantidadrealizada;
            }
        }
        return "";
    }

    function getCantidadCanceladaNotaTransaccion(index = -1) {
        if (index > -1 && index <= arrayTipoTransaccion.length) {
            let tipotransaccion = arrayTipoTransaccion[index];
            if (tipotransaccion) {
                return tipotransaccion.cantidadcancelada;
            }
        }
        return "";
    }


    function exportToXLSX(array_data, fileName) {

        const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        const fileExtension = '.xlsx';

        const ws = XLSX.utils.json_to_sheet(array_data);
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };

        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array', sheet: 'Hoja 1', cellStyles: true, });

        const data = new Blob([excelBuffer], { type: fileType, });

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
                if (parseInt(item.Registro) === parseInt(element.Registro)) {
                    bandera = true;
                    cantidad++;
                }
            }
            let contador = 0;
            for (let pos = 0; pos < arrayHojaFinal.length; pos++) {
                let item = arrayHojaFinal[pos];
                if (parseInt(item.Registro) === parseInt(element.Registro)) {
                    contador++;
                }
            }
            if (bandera) {
                element.Habilitado = "OK";
            } else {
                element.Habilitado = "Observado";
            }
            element.cantidadRegistrado = cantidad;
            element.cantidadPadronEstudiantil = contador;
            console.log("exito")
            if (index === (arrayHojaFinal.length - 1)) {
                console.log("Final de proceso")
                console.log(arrayHojaFinal)
                exportToXLSX(arrayHojaFinal, "ConsolidadoHabilitadoObservado");
            }
        }
    }

    function handleInputFileFinal(evt) {
        let files = evt.target.files;
        let target = evt.target;
        let hojas = [];

        let reader = new FileReader();
        reader.readAsArrayBuffer(target.files[0]);

        reader.onload = async (e) => {
            let bufferArray = e.target.result;
            let workbook = XLSX.read(bufferArray, { type: "buffer" });

            let arrayHojasTotal = [];

            await workbook.SheetNames.forEach(function (sheetName) {
                // let XL_row_object = XLSX.utils.sheet_to_row_object_array( workbook.Sheets[sheetName] );
                let XL_row_object = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

                hojas.push({
                    data: XL_row_object,
                    sheetName,
                });



            });
            console.log(hojas)

            for (let index = 0; index < hojas.length; index++) {
                const element = hojas[index];
                for (let pos = 0; pos < element.data.length; pos++) {
                    const item = element.data[pos];
                    arrayHojasTotal.push(item);
                }
            }

            setFileFinal(arrayHojasTotal)
        };
    }

    async function handleInputFileInicio(evt) {
        let files = evt.target.files;
        let target = evt.target;
        let hojas = [];

        let reader = new FileReader();
        reader.readAsArrayBuffer(target.files[0]);

        reader.onload = async (e) => {
            let bufferArray = e.target.result;
            let workbook = XLSX.read(bufferArray, { type: "buffer" });

            let arrayHojasTotal = [];

            await workbook.SheetNames.forEach(function (sheetName) {
                // let XL_row_object = XLSX.utils.sheet_to_row_object_array( workbook.Sheets[sheetName] );
                let XL_row_object = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

                hojas.push({
                    data: XL_row_object,
                    sheetName,
                });



            });
            console.log(hojas)

            for (let index = 0; index < hojas.length; index++) {
                const element = hojas[index];
                for (let pos = 0; pos < element.data.length; pos++) {
                    const item = element.data[pos];
                    arrayHojasTotal.push(item);
                }
            }

            setFileInicio(arrayHojasTotal)
        };

    }

    return (
        <>
            <div className="main-card mb-3 card p-0">
                <div className="card-header pr-3 pl-3">
                    <div className="row no-gutters align-items-center w-100">
                        HORUS S.R.L
                    </div>
                </div>
                <div className="card-body">
                    <h5 className="card-title"></h5>
                    <div className='card-hover-shadow-2x mb-2 card'>
                        <div className="row">
                            <div className="col-sm-12 col-lg-4">
                                <ul className="list-group list-group-flush">
                                    <li className="bg-transparent list-group-item">
                                        <div className="widget-content p-0">
                                            <div className="widget-content-outer">
                                                <div className="widget-content-wrapper">
                                                    <div className="widget-content-left">
                                                        <div className="widget-heading"><font style={{ "verticalAlign": "inherit" }}>
                                                            <font style={{ "verticalAlign": "inherit" }}>NOTAS DE INGRESOS</font></font>
                                                        </div>
                                                        <div className="widget-subheading">
                                                            <font style={{ "verticalAlign": "inherit" }}><font style={{ "verticalAlign": "inherit" }}>cantidad de notas de ingresos realizados</font></font>
                                                        </div>
                                                    </div>
                                                    <div className="widget-content-right">
                                                        <div className="widget-numbers text-info">
                                                            <font style={{ "verticalAlign": "inherit" }}>
                                                                <font style={{ "verticalAlign": "inherit" }}>
                                                                    {getCantidadRealizadaNotaTransaccion(0)}
                                                                </font>
                                                            </font>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="bg-transparent list-group-item">
                                        <div className="widget-content p-0">
                                            <div className="widget-content-outer">
                                                <div className="widget-content-wrapper">
                                                    <div className="widget-content-left">
                                                        <div className="widget-heading text-danger">
                                                            <font style={{ "verticalAlign": "inherit" }}><font style={{ "verticalAlign": "inherit" }}>NOTA DE INGRESOS ANULADOS</font></font>
                                                        </div>
                                                        <div className="widget-subheading">
                                                            <font style={{ "verticalAlign": "inherit" }}><font style={{ "verticalAlign": "inherit" }}>cantidad de notas de ingresos anulados realizados</font></font>
                                                        </div>
                                                    </div>
                                                    <div className="widget-content-right">
                                                        <div className="widget-numbers text-danger">
                                                            <font style={{ "verticalAlign": "inherit" }}>
                                                                <font style={{ "verticalAlign": "inherit" }}>
                                                                    {getCantidadCanceladaNotaTransaccion(0)}
                                                                </font>
                                                            </font>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="bg-transparent list-group-item">
                                        <div className="widget-content p-0">
                                            <div className="widget-content-outer">
                                                <div className="widget-content-wrapper">
                                                    <div className="widget-content-left">
                                                        <div className="widget-heading text-success">
                                                            <font style={{ "verticalAlign": "inherit" }}><font style={{ "verticalAlign": "inherit" }}>TOTAL NOTA DE INGRESOS</font></font>
                                                        </div>
                                                    </div>
                                                    <div className="widget-content-right">
                                                        <div className="widget-numbers text-success">
                                                            <font style={{ "verticalAlign": "inherit" }}>
                                                                <font style={{ "verticalAlign": "inherit" }}>
                                                                    { getCantidadRealizadaNotaTransaccion(0) - getCantidadCanceladaNotaTransaccion(0) }
                                                                </font>
                                                            </font>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-sm-12 col-lg-4">
                                <ul className="list-group list-group-flush">
                                    <li className="bg-transparent list-group-item">
                                        <div className="widget-content p-0">
                                            <div className="widget-content-outer">
                                                <div className="widget-content-wrapper">
                                                    <div className="widget-content-left">
                                                        <div className="widget-heading">
                                                            <font style={{ "verticalAlign": "inherit" }}><font style={{ "verticalAlign": "inherit" }}>NOTA DE COMPRAS</font></font>
                                                        </div>
                                                        <div className="widget-subheading">
                                                            <font style={{ "verticalAlign": "inherit" }}><font style={{ "verticalAlign": "inherit" }}>cantidad de notas de compras realizados</font></font>
                                                        </div>
                                                    </div>
                                                    <div className="widget-content-right">
                                                        <div className="widget-numbers text-primary">
                                                            <font style={{ "verticalAlign": "inherit" }}>
                                                                <font style={{ "verticalAlign": "inherit" }}>
                                                                    {getCantidadRealizadaNotaTransaccion(5)}
                                                                </font>
                                                            </font>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="bg-transparent list-group-item">
                                        <div className="widget-content p-0">
                                            <div className="widget-content-outer">
                                                <div className="widget-content-wrapper">
                                                    <div className="widget-content-left">
                                                        <div className="widget-heading text-danger">
                                                            <font style={{ "verticalAlign": "inherit" }}><font style={{ "verticalAlign": "inherit" }}>NOTA DE COMPRAS ANULADOS</font></font>
                                                        </div>
                                                        <div className="widget-subheading">
                                                            <font style={{ "verticalAlign": "inherit" }}><font style={{ "verticalAlign": "inherit" }}>cantidad de notas de compras anulados realizados</font></font>
                                                        </div>
                                                    </div>
                                                    <div className="widget-content-right">
                                                        <div className="widget-numbers text-danger">
                                                            <font style={{ "verticalAlign": "inherit" }}>
                                                                <font style={{ "verticalAlign": "inherit" }}>
                                                                    {getCantidadCanceladaNotaTransaccion(5)}
                                                                </font>
                                                            </font>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="bg-transparent list-group-item">
                                        <div className="widget-content p-0">
                                            <div className="widget-content-outer">
                                                <div className="widget-content-wrapper">
                                                    <div className="widget-content-left">
                                                        <div className="widget-heading text-success">
                                                            <font style={{ "verticalAlign": "inherit" }}><font style={{ "verticalAlign": "inherit" }}>TOTAL NOTA DE COMPRAS</font></font>
                                                        </div>
                                                    </div>
                                                    <div className="widget-content-right">
                                                        <div className="widget-numbers text-success">
                                                            <font style={{ "verticalAlign": "inherit" }}>
                                                                <font style={{ "verticalAlign": "inherit" }}>
                                                                    { getCantidadRealizadaNotaTransaccion(5) - getCantidadCanceladaNotaTransaccion(5) }
                                                                </font>
                                                            </font>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-sm-12 col-lg-4">
                                <ul className="list-group list-group-flush">
                                    <li className="bg-transparent list-group-item">
                                        <div className="widget-content p-0">
                                            <div className="widget-content-outer">
                                                <div className="widget-content-wrapper">
                                                    <div className="widget-content-left">
                                                        <div className="widget-heading">
                                                            <font style={{ "verticalAlign": "inherit" }}><font style={{ "verticalAlign": "inherit" }}>NOTA DE VENTAS</font></font>
                                                        </div>
                                                        <div className="widget-subheading">
                                                            <font style={{ "verticalAlign": "inherit" }}><font style={{ "verticalAlign": "inherit" }}>cantidad de notas de ventas realizados</font></font>
                                                        </div>
                                                    </div>
                                                    <div className="widget-content-right">
                                                        <div className="widget-numbers text-success">
                                                            <font style={{ "verticalAlign": "inherit" }}>
                                                                <font style={{ "verticalAlign": "inherit" }}>
                                                                    {getCantidadRealizadaNotaTransaccion(7)}
                                                                </font>
                                                            </font>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="bg-transparent list-group-item">
                                        <div className="widget-content p-0">
                                            <div className="widget-content-outer">
                                                <div className="widget-content-wrapper">
                                                    <div className="widget-content-left">
                                                        <div className="widget-heading text-danger">
                                                            <font style={{ "verticalAlign": "inherit" }}><font style={{ "verticalAlign": "inherit" }}>NOTA DE VENTA ANULADO</font></font>
                                                        </div>
                                                        <div className="widget-subheading">
                                                            <font style={{ "verticalAlign": "inherit" }}><font style={{ "verticalAlign": "inherit" }}>cantidad de notas de ventas anulados realizados</font></font>
                                                        </div>
                                                    </div>
                                                    <div className="widget-content-right">
                                                        <div className="widget-numbers text-danger">
                                                            <font style={{ "verticalAlign": "inherit" }}>
                                                                <font style={{ "verticalAlign": "inherit" }}>
                                                                    {getCantidadCanceladaNotaTransaccion(7)}
                                                                </font>
                                                            </font>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="bg-transparent list-group-item">
                                        <div className="widget-content p-0">
                                            <div className="widget-content-outer">
                                                <div className="widget-content-wrapper">
                                                    <div className="widget-content-left">
                                                        <div className="widget-heading text-success">
                                                            <font style={{ "verticalAlign": "inherit" }}><font style={{ "verticalAlign": "inherit" }}>TOTAL NOTA DE VENTAS</font></font>
                                                        </div>
                                                    </div>
                                                    <div className="widget-content-right">
                                                        <div className="widget-numbers text-success">
                                                            <font style={{ "verticalAlign": "inherit" }}>
                                                                <font style={{ "verticalAlign": "inherit" }}>
                                                                    { getCantidadRealizadaNotaTransaccion(7) - getCantidadCanceladaNotaTransaccion(7) }
                                                                </font>
                                                            </font>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="row card-hover-shadow-2x pt-3">
                        <div className="col-sm-12 col-lg-4">
                            <div className="card-hover-shadow-2x mb-3 card">
                                <div className="card-header-tab card-header">
                                    <div className="card-header-title font-size-lg text-capitalize font-weight-normal">
                                        <i className="header-icon lnr-database icon-gradient bg-malibu-beach"> </i>Lista Productos
                                    </div>
                                    <div className="btn-actions-pane-right text-capitalize actions-icon-btn">
                                        <div className="btn-group dropdown">
                                            <button type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" className="btn-icon btn-icon-only btn btn-link">
                                                <i className="pe-7s-menu btn-icon-wrapper"></i>
                                            </button>
                                            <div tabIndex="-1" role="menu" aria-hidden="true" className="dropdown-menu-right rm-pointers dropdown-menu-shadow dropdown-menu-hover-link dropdown-menu">
                                                <h6 tabIndex="-1" className="dropdown-header">Header</h6>
                                                <button type="button" tabIndex="0" className="dropdown-item">
                                                    <i className="dropdown-icon lnr-inbox"> </i><span>Menus</span>
                                                </button>
                                                <button type="button" tabIndex="0" className="dropdown-item">
                                                    <i className="dropdown-icon lnr-file-empty"> </i><span>Settings</span>
                                                </button>
                                                <button type="button" tabIndex="0" className="dropdown-item">
                                                    <i className="dropdown-icon lnr-book"> </i><span>Actions</span>
                                                </button>
                                                <div tabIndex="-1" className="dropdown-divider"></div>
                                                <div className="p-3 text-right">
                                                    <button className="mr-2 btn-shadow btn-sm btn btn-link">View Details</button>
                                                    <button className="mr-2 btn-shadow btn-sm btn btn-primary">Action</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="scroll-area-lg">
                                    <div className="scrollbar-container ps ps--active-y">
                                        <div className="p-2">
                                            <ul className="todo-list-wrapper list-group list-group-flush">
                                                <li className="list-group-item">
                                                    <div className="todo-indicator bg-warning"></div>
                                                    <div className="widget-content p-0">
                                                        <div className="widget-content-wrapper">
                                                            <div className="widget-content-left mr-2">
                                                                <div className="custom-checkbox custom-control">
                                                                    <input type="checkbox" id="exampleCustomCheckbox12" className="custom-control-input" />
                                                                        <label className="custom-control-label" for="exampleCustomCheckbox12">&nbsp;</label>
                                                                </div>
                                                            </div>
                                                            <div className="widget-content-left">
                                                                <div className="widget-heading">Wash the car
                                                                    <div className="badge badge-danger ml-2">Rejected</div>
                                                                </div>
                                                                <div className="widget-subheading"><i>Written by Bob</i></div>
                                                            </div>
                                                            <div className="widget-content-right widget-content-actions">
                                                                <button className="border-0 btn-transition btn btn-outline-success">
                                                                    <i className="fa fa-check"></i>
                                                                </button>
                                                                <button className="border-0 btn-transition btn btn-outline-danger">
                                                                    <i className="fa fa-trash-alt"></i>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className="list-group-item">
                                                    <div className="todo-indicator bg-focus"></div>
                                                    <div className="widget-content p-0">
                                                        <div className="widget-content-wrapper">
                                                            <div className="widget-content-left mr-2">
                                                                <div className="custom-checkbox custom-control">
                                                                    <input type="checkbox" id="exampleCustomCheckbox1" className="custom-control-input" />
                                                                        <label className="custom-control-label" for="exampleCustomCheckbox1">&nbsp;</label>
                                                                </div>
                                                            </div>
                                                            <div className="widget-content-left">
                                                                <div className="widget-heading">Task with dropdown menu</div>
                                                                <div className="widget-subheading">
                                                                    <div>By Johnny
                                                                        <div className="badge badge-pill badge-info ml-2">NEW</div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="widget-content-right widget-content-actions">
                                                                <div className="d-inline-block dropdown">
                                                                    <button type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" className="border-0 btn-transition btn btn-link">
                                                                        <i className="fa fa-ellipsis-h"></i>
                                                                    </button>
                                                                    <div tabIndex="-1" role="menu" aria-hidden="true" className="dropdown-menu dropdown-menu-right">
                                                                        <h6 tabIndex="-1" className="dropdown-header">Header</h6>
                                                                        <button type="button" disabled="" tabIndex="-1" className="disabled dropdown-item">Action</button>
                                                                        <button type="button" tabIndex="0" className="dropdown-item">Another Action</button>
                                                                        <div tabIndex="-1" className="dropdown-divider"></div>
                                                                        <button type="button" tabIndex="0" className="dropdown-item">Another Action</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className="list-group-item">
                                                    <div className="todo-indicator bg-primary"></div>
                                                    <div className="widget-content p-0">
                                                        <div className="widget-content-wrapper">
                                                            <div className="widget-content-left mr-2">
                                                                <div className="custom-checkbox custom-control">
                                                                    <input type="checkbox" id="exampleCustomCheckbox4" className="custom-control-input" />
                                                                        <label className="custom-control-label" for="exampleCustomCheckbox4">&nbsp;</label>
                                                                </div>
                                                            </div>
                                                            <div className="widget-content-left flex2">
                                                                <div className="widget-heading">Badge on the right task</div>
                                                                <div className="widget-subheading">This task has show on hover actions!</div>
                                                            </div>
                                                            <div className="widget-content-right widget-content-actions">
                                                                <button className="border-0 btn-transition btn btn-outline-success">
                                                                    <i className="fa fa-check"></i>
                                                                </button>
                                                            </div>
                                                            <div className="widget-content-right ml-3">
                                                                <div className="badge badge-pill badge-success">Latest Task</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className="list-group-item">
                                                    <div className="todo-indicator bg-info"></div>
                                                    <div className="widget-content p-0">
                                                        <div className="widget-content-wrapper">
                                                            <div className="widget-content-left mr-2">
                                                                <div className="custom-checkbox custom-control">
                                                                    <input type="checkbox" id="exampleCustomCheckbox2" className="custom-control-input" />
                                                                        <label className="custom-control-label" for="exampleCustomCheckbox2">&nbsp;</label>
                                                                </div>
                                                            </div>
                                                            <div className="widget-content-left mr-3">
                                                                <div className="widget-content-left">
                                                                    <img width="42" className="rounded" src="assets/images/avatars/1.jpg" alt="" />
                                                                </div>
                                                            </div>
                                                            <div className="widget-content-left">
                                                                <div className="widget-heading">Go grocery shopping</div>
                                                                <div className="widget-subheading">A short description for this todo item</div>
                                                            </div>
                                                            <div className="widget-content-right widget-content-actions">
                                                                <button className="border-0 btn-transition btn btn-outline-success">
                                                                    <i className="fa fa-check"></i>
                                                                </button>
                                                                <button className="border-0 btn-transition btn btn-outline-danger">
                                                                    <i className="fa fa-trash-alt"></i>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className="list-group-item">
                                                    <div className="todo-indicator bg-success"></div>
                                                    <div className="widget-content p-0">
                                                        <div className="widget-content-wrapper">
                                                            <div className="widget-content-left mr-2">
                                                                <div className="custom-checkbox custom-control">
                                                                    <input type="checkbox" id="exampleCustomCheckbox3" className="custom-control-input" />
                                                                        <label className="custom-control-label" for="exampleCustomCheckbox3">&nbsp;</label>
                                                                </div>
                                                            </div>
                                                            <div className="widget-content-left flex2">
                                                                <div className="widget-heading">Development Task</div>
                                                                <div className="widget-subheading">Finish React ToDo List App</div>
                                                            </div>
                                                            <div className="widget-content-right">
                                                                <div className="badge badge-warning mr-2">69</div>
                                                            </div>
                                                            <div className="widget-content-right">
                                                                <button className="border-0 btn-transition btn btn-outline-success">
                                                                    <i className="fa fa-check"></i>
                                                                </button>
                                                                <button className="border-0 btn-transition btn btn-outline-danger">
                                                                    <i className="fa fa-trash-alt"></i>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className="list-group-item">
                                                    <div className="todo-indicator bg-warning"></div>
                                                    <div className="widget-content p-0">
                                                        <div className="widget-content-wrapper">
                                                            <div className="widget-content-left mr-2">
                                                                <div className="custom-checkbox custom-control">
                                                                    <input type="checkbox" id="exampleCustomCheckbox12" className="custom-control-input" />
                                                                        <label className="custom-control-label" for="exampleCustomCheckbox12">&nbsp;</label>
                                                                </div>
                                                            </div>
                                                            <div className="widget-content-left">
                                                                <div className="widget-heading">Wash the car
                                                                    <div className="badge badge-danger ml-2">Rejected</div>
                                                                </div>
                                                                <div className="widget-subheading"><i>Written by Bob</i></div>
                                                            </div>
                                                            <div className="widget-content-right widget-content-actions">
                                                                <button className="border-0 btn-transition btn btn-outline-success">
                                                                    <i className="fa fa-check"></i>
                                                                </button>
                                                                <button className="border-0 btn-transition btn btn-outline-danger">
                                                                    <i className="fa fa-trash-alt"></i>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className="list-group-item">
                                                    <div className="todo-indicator bg-focus"></div>
                                                    <div className="widget-content p-0">
                                                        <div className="widget-content-wrapper">
                                                            <div className="widget-content-left mr-2">
                                                                <div className="custom-checkbox custom-control">
                                                                    <input type="checkbox" id="exampleCustomCheckbox1" className="custom-control-input" />
                                                                        <label className="custom-control-label" for="exampleCustomCheckbox1">&nbsp;</label>
                                                                </div>
                                                            </div>
                                                            <div className="widget-content-left">
                                                                <div className="widget-heading">Task with dropdown menu</div>
                                                                <div className="widget-subheading">
                                                                    <div>By Johnny
                                                                        <div className="badge badge-pill badge-info ml-2">NEW</div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="widget-content-right widget-content-actions">
                                                                <div className="d-inline-block dropdown">
                                                                    <button type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" className="border-0 btn-transition btn btn-link">
                                                                        <i className="fa fa-ellipsis-h"></i>
                                                                    </button>
                                                                    <div tabIndex="-1" role="menu" aria-hidden="true" className="dropdown-menu dropdown-menu-right">
                                                                        <h6 tabIndex="-1" className="dropdown-header">Header</h6>
                                                                        <button type="button" disabled="" tabIndex="-1" className="disabled dropdown-item">Action</button>
                                                                        <button type="button" tabIndex="0" className="dropdown-item">Another Action</button>
                                                                        <div tabIndex="-1" className="dropdown-divider"></div>
                                                                        <button type="button" tabIndex="0" className="dropdown-item">Another Action</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className="list-group-item">
                                                    <div className="todo-indicator bg-primary"></div>
                                                    <div className="widget-content p-0">
                                                        <div className="widget-content-wrapper">
                                                            <div className="widget-content-left mr-2">
                                                                <div className="custom-checkbox custom-control">
                                                                    <input type="checkbox" id="exampleCustomCheckbox4" className="custom-control-input" />
                                                                        <label className="custom-control-label" for="exampleCustomCheckbox4">&nbsp;</label>
                                                                </div>
                                                            </div>
                                                            <div className="widget-content-left flex2">
                                                                <div className="widget-heading">Badge on the right task</div>
                                                                <div className="widget-subheading">This task has show on hover actions!</div>
                                                            </div>
                                                            <div className="widget-content-right widget-content-actions">
                                                                <button className="border-0 btn-transition btn btn-outline-success">
                                                                    <i className="fa fa-check"></i>
                                                                </button>
                                                            </div>
                                                            <div className="widget-content-right ml-3">
                                                                <div className="badge badge-pill badge-success">Latest Task</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className="list-group-item">
                                                    <div className="todo-indicator bg-info"></div>
                                                    <div className="widget-content p-0">
                                                        <div className="widget-content-wrapper">
                                                            <div className="widget-content-left mr-2">
                                                                <div className="custom-checkbox custom-control">
                                                                    <input type="checkbox" id="exampleCustomCheckbox2" className="custom-control-input" />
                                                                        <label className="custom-control-label" for="exampleCustomCheckbox2">&nbsp;</label>
                                                                </div>
                                                            </div>
                                                            <div className="widget-content-left mr-3">
                                                                <div className="widget-content-left">
                                                                    <img width="42" className="rounded" src="assets/images/avatars/1.jpg" alt="" />
                                                                </div>
                                                            </div>
                                                            <div className="widget-content-left">
                                                                <div className="widget-heading">Go grocery shopping</div>
                                                                <div className="widget-subheading">A short description for this todo item</div>
                                                            </div>
                                                            <div className="widget-content-right widget-content-actions">
                                                                <button className="border-0 btn-transition btn btn-outline-success">
                                                                    <i className="fa fa-check"></i>
                                                                </button>
                                                                <button className="border-0 btn-transition btn btn-outline-danger">
                                                                    <i className="fa fa-trash-alt"></i>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className="list-group-item">
                                                    <div className="todo-indicator bg-success"></div>
                                                    <div className="widget-content p-0">
                                                        <div className="widget-content-wrapper">
                                                            <div className="widget-content-left mr-2">
                                                                <div className="custom-checkbox custom-control">
                                                                    <input type="checkbox" id="exampleCustomCheckbox3" className="custom-control-input" />
                                                                        <label className="custom-control-label" for="exampleCustomCheckbox3">&nbsp;</label>
                                                                </div>
                                                            </div>
                                                            <div className="widget-content-left flex2">
                                                                <div className="widget-heading">Development Task</div>
                                                                <div className="widget-subheading">Finish React ToDo List App</div>
                                                            </div>
                                                            <div className="widget-content-right">
                                                                <div className="badge badge-warning mr-2">69</div>
                                                            </div>
                                                            <div className="widget-content-right">
                                                                <button className="border-0 btn-transition btn btn-outline-success">
                                                                    <i className="fa fa-check"></i>
                                                                </button>
                                                                <button className="border-0 btn-transition btn btn-outline-danger">
                                                                    <i className="fa fa-trash-alt"></i>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="ps__rail-x" style={{ left: 0, bottom: 0, }}>
                                            <div className="ps__thumb-x" tabIndex="0" style={{ left: 0, width: 0, }}></div>
                                        </div>
                                        <div className="ps__rail-y" style={{ top: 0, height: 400, right: 0, }}>
                                            <div className="ps__thumb-y" tabIndex="0" style={{ top: 0, height: 206, }}></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-block text-right card-footer">
                                    <button className="mr-2 btn btn-link btn-sm">Cancel</button>
                                    <button className="btn btn-primary">Add Task</button>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-12 col-lg-4">
                            <div className="card-hover-shadow-2x mb-3 card">
                                <div className="card-header-tab card-header">
                                    <div className="card-header-title font-size-lg text-capitalize font-weight-normal">
                                        <i className="header-icon lnr-database icon-gradient bg-malibu-beach"> </i>Tasks List
                                    </div>
                                    <div className="btn-actions-pane-right text-capitalize actions-icon-btn">
                                        <div className="btn-group dropdown">
                                            <button type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" className="btn-icon btn-icon-only btn btn-link">
                                                <i className="pe-7s-menu btn-icon-wrapper"></i>
                                            </button>
                                            <div tabIndex="-1" role="menu" aria-hidden="true" className="dropdown-menu-right rm-pointers dropdown-menu-shadow dropdown-menu-hover-link dropdown-menu">
                                                <h6 tabIndex="-1" className="dropdown-header">Header</h6>
                                                <button type="button" tabIndex="0" className="dropdown-item">
                                                    <i className="dropdown-icon lnr-inbox"> </i><span>Menus</span>
                                                </button>
                                                <button type="button" tabIndex="0" className="dropdown-item">
                                                    <i className="dropdown-icon lnr-file-empty"> </i><span>Settings</span>
                                                </button>
                                                <button type="button" tabIndex="0" className="dropdown-item">
                                                    <i className="dropdown-icon lnr-book"> </i><span>Actions</span>
                                                </button>
                                                <div tabIndex="-1" className="dropdown-divider"></div>
                                                <div className="p-3 text-right">
                                                    <button className="mr-2 btn-shadow btn-sm btn btn-link">View Details</button>
                                                    <button className="mr-2 btn-shadow btn-sm btn btn-primary">Action</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="scroll-area-lg">
                                    <div className="scrollbar-container ps ps--active-y">
                                        <div className="p-2">
                                            <ul className="todo-list-wrapper list-group list-group-flush">
                                                <li className="list-group-item">
                                                    <div className="todo-indicator bg-warning"></div>
                                                    <div className="widget-content p-0">
                                                        <div className="widget-content-wrapper">
                                                            <div className="widget-content-left mr-2">
                                                                <div className="custom-checkbox custom-control">
                                                                    <input type="checkbox" id="exampleCustomCheckbox12" className="custom-control-input" />
                                                                        <label className="custom-control-label" for="exampleCustomCheckbox12">&nbsp;</label>
                                                                </div>
                                                            </div>
                                                            <div className="widget-content-left">
                                                                <div className="widget-heading">Wash the car
                                                                    <div className="badge badge-danger ml-2">Rejected</div>
                                                                </div>
                                                                <div className="widget-subheading"><i>Written by Bob</i></div>
                                                            </div>
                                                            <div className="widget-content-right widget-content-actions">
                                                                <button className="border-0 btn-transition btn btn-outline-success">
                                                                    <i className="fa fa-check"></i>
                                                                </button>
                                                                <button className="border-0 btn-transition btn btn-outline-danger">
                                                                    <i className="fa fa-trash-alt"></i>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className="list-group-item">
                                                    <div className="todo-indicator bg-focus"></div>
                                                    <div className="widget-content p-0">
                                                        <div className="widget-content-wrapper">
                                                            <div className="widget-content-left mr-2">
                                                                <div className="custom-checkbox custom-control">
                                                                    <input type="checkbox" id="exampleCustomCheckbox1" className="custom-control-input" />
                                                                        <label className="custom-control-label" for="exampleCustomCheckbox1">&nbsp;</label>
                                                                </div>
                                                            </div>
                                                            <div className="widget-content-left">
                                                                <div className="widget-heading">Task with dropdown menu</div>
                                                                <div className="widget-subheading">
                                                                    <div>By Johnny
                                                                        <div className="badge badge-pill badge-info ml-2">NEW</div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="widget-content-right widget-content-actions">
                                                                <div className="d-inline-block dropdown">
                                                                    <button type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" className="border-0 btn-transition btn btn-link">
                                                                        <i className="fa fa-ellipsis-h"></i>
                                                                    </button>
                                                                    <div tabIndex="-1" role="menu" aria-hidden="true" className="dropdown-menu dropdown-menu-right">
                                                                        <h6 tabIndex="-1" className="dropdown-header">Header</h6>
                                                                        <button type="button" disabled="" tabIndex="-1" className="disabled dropdown-item">Action</button>
                                                                        <button type="button" tabIndex="0" className="dropdown-item">Another Action</button>
                                                                        <div tabIndex="-1" className="dropdown-divider"></div>
                                                                        <button type="button" tabIndex="0" className="dropdown-item">Another Action</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className="list-group-item">
                                                    <div className="todo-indicator bg-primary"></div>
                                                    <div className="widget-content p-0">
                                                        <div className="widget-content-wrapper">
                                                            <div className="widget-content-left mr-2">
                                                                <div className="custom-checkbox custom-control">
                                                                    <input type="checkbox" id="exampleCustomCheckbox4" className="custom-control-input" />
                                                                        <label className="custom-control-label" for="exampleCustomCheckbox4">&nbsp;</label>
                                                                </div>
                                                            </div>
                                                            <div className="widget-content-left flex2">
                                                                <div className="widget-heading">Badge on the right task</div>
                                                                <div className="widget-subheading">This task has show on hover actions!</div>
                                                            </div>
                                                            <div className="widget-content-right widget-content-actions">
                                                                <button className="border-0 btn-transition btn btn-outline-success">
                                                                    <i className="fa fa-check"></i>
                                                                </button>
                                                            </div>
                                                            <div className="widget-content-right ml-3">
                                                                <div className="badge badge-pill badge-success">Latest Task</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className="list-group-item">
                                                    <div className="todo-indicator bg-info"></div>
                                                    <div className="widget-content p-0">
                                                        <div className="widget-content-wrapper">
                                                            <div className="widget-content-left mr-2">
                                                                <div className="custom-checkbox custom-control">
                                                                    <input type="checkbox" id="exampleCustomCheckbox2" className="custom-control-input" />
                                                                        <label className="custom-control-label" for="exampleCustomCheckbox2">&nbsp;</label>
                                                                </div>
                                                            </div>
                                                            <div className="widget-content-left mr-3">
                                                                <div className="widget-content-left">
                                                                    <img width="42" className="rounded" src="assets/images/avatars/1.jpg" alt="" />
                                                                </div>
                                                            </div>
                                                            <div className="widget-content-left">
                                                                <div className="widget-heading">Go grocery shopping</div>
                                                                <div className="widget-subheading">A short description for this todo item</div>
                                                            </div>
                                                            <div className="widget-content-right widget-content-actions">
                                                                <button className="border-0 btn-transition btn btn-outline-success">
                                                                    <i className="fa fa-check"></i>
                                                                </button>
                                                                <button className="border-0 btn-transition btn btn-outline-danger">
                                                                    <i className="fa fa-trash-alt"></i>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className="list-group-item">
                                                    <div className="todo-indicator bg-success"></div>
                                                    <div className="widget-content p-0">
                                                        <div className="widget-content-wrapper">
                                                            <div className="widget-content-left mr-2">
                                                                <div className="custom-checkbox custom-control">
                                                                    <input type="checkbox" id="exampleCustomCheckbox3" className="custom-control-input" />
                                                                        <label className="custom-control-label" for="exampleCustomCheckbox3">&nbsp;</label>
                                                                </div>
                                                            </div>
                                                            <div className="widget-content-left flex2">
                                                                <div className="widget-heading">Development Task</div>
                                                                <div className="widget-subheading">Finish React ToDo List App</div>
                                                            </div>
                                                            <div className="widget-content-right">
                                                                <div className="badge badge-warning mr-2">69</div>
                                                            </div>
                                                            <div className="widget-content-right">
                                                                <button className="border-0 btn-transition btn btn-outline-success">
                                                                    <i className="fa fa-check"></i>
                                                                </button>
                                                                <button className="border-0 btn-transition btn btn-outline-danger">
                                                                    <i className="fa fa-trash-alt"></i>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className="list-group-item">
                                                    <div className="todo-indicator bg-warning"></div>
                                                    <div className="widget-content p-0">
                                                        <div className="widget-content-wrapper">
                                                            <div className="widget-content-left mr-2">
                                                                <div className="custom-checkbox custom-control">
                                                                    <input type="checkbox" id="exampleCustomCheckbox12" className="custom-control-input" />
                                                                        <label className="custom-control-label" for="exampleCustomCheckbox12">&nbsp;</label>
                                                                </div>
                                                            </div>
                                                            <div className="widget-content-left">
                                                                <div className="widget-heading">Wash the car
                                                                    <div className="badge badge-danger ml-2">Rejected</div>
                                                                </div>
                                                                <div className="widget-subheading"><i>Written by Bob</i></div>
                                                            </div>
                                                            <div className="widget-content-right widget-content-actions">
                                                                <button className="border-0 btn-transition btn btn-outline-success">
                                                                    <i className="fa fa-check"></i>
                                                                </button>
                                                                <button className="border-0 btn-transition btn btn-outline-danger">
                                                                    <i className="fa fa-trash-alt"></i>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className="list-group-item">
                                                    <div className="todo-indicator bg-focus"></div>
                                                    <div className="widget-content p-0">
                                                        <div className="widget-content-wrapper">
                                                            <div className="widget-content-left mr-2">
                                                                <div className="custom-checkbox custom-control">
                                                                    <input type="checkbox" id="exampleCustomCheckbox1" className="custom-control-input" />
                                                                        <label className="custom-control-label" for="exampleCustomCheckbox1">&nbsp;</label>
                                                                </div>
                                                            </div>
                                                            <div className="widget-content-left">
                                                                <div className="widget-heading">Task with dropdown menu</div>
                                                                <div className="widget-subheading">
                                                                    <div>By Johnny
                                                                        <div className="badge badge-pill badge-info ml-2">NEW</div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="widget-content-right widget-content-actions">
                                                                <div className="d-inline-block dropdown">
                                                                    <button type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" className="border-0 btn-transition btn btn-link">
                                                                        <i className="fa fa-ellipsis-h"></i>
                                                                    </button>
                                                                    <div tabIndex="-1" role="menu" aria-hidden="true" className="dropdown-menu dropdown-menu-right">
                                                                        <h6 tabIndex="-1" className="dropdown-header">Header</h6>
                                                                        <button type="button" disabled="" tabIndex="-1" className="disabled dropdown-item">Action</button>
                                                                        <button type="button" tabIndex="0" className="dropdown-item">Another Action</button>
                                                                        <div tabIndex="-1" className="dropdown-divider"></div>
                                                                        <button type="button" tabIndex="0" className="dropdown-item">Another Action</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className="list-group-item">
                                                    <div className="todo-indicator bg-primary"></div>
                                                    <div className="widget-content p-0">
                                                        <div className="widget-content-wrapper">
                                                            <div className="widget-content-left mr-2">
                                                                <div className="custom-checkbox custom-control">
                                                                    <input type="checkbox" id="exampleCustomCheckbox4" className="custom-control-input" />
                                                                        <label className="custom-control-label" for="exampleCustomCheckbox4">&nbsp;</label>
                                                                </div>
                                                            </div>
                                                            <div className="widget-content-left flex2">
                                                                <div className="widget-heading">Badge on the right task</div>
                                                                <div className="widget-subheading">This task has show on hover actions!</div>
                                                            </div>
                                                            <div className="widget-content-right widget-content-actions">
                                                                <button className="border-0 btn-transition btn btn-outline-success">
                                                                    <i className="fa fa-check"></i>
                                                                </button>
                                                            </div>
                                                            <div className="widget-content-right ml-3">
                                                                <div className="badge badge-pill badge-success">Latest Task</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className="list-group-item">
                                                    <div className="todo-indicator bg-info"></div>
                                                    <div className="widget-content p-0">
                                                        <div className="widget-content-wrapper">
                                                            <div className="widget-content-left mr-2">
                                                                <div className="custom-checkbox custom-control">
                                                                    <input type="checkbox" id="exampleCustomCheckbox2" className="custom-control-input" />
                                                                        <label className="custom-control-label" for="exampleCustomCheckbox2">&nbsp;</label>
                                                                </div>
                                                            </div>
                                                            <div className="widget-content-left mr-3">
                                                                <div className="widget-content-left">
                                                                    <img width="42" className="rounded" src="assets/images/avatars/1.jpg" alt="" />
                                                                </div>
                                                            </div>
                                                            <div className="widget-content-left">
                                                                <div className="widget-heading">Go grocery shopping</div>
                                                                <div className="widget-subheading">A short description for this todo item</div>
                                                            </div>
                                                            <div className="widget-content-right widget-content-actions">
                                                                <button className="border-0 btn-transition btn btn-outline-success">
                                                                    <i className="fa fa-check"></i>
                                                                </button>
                                                                <button className="border-0 btn-transition btn btn-outline-danger">
                                                                    <i className="fa fa-trash-alt"></i>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className="list-group-item">
                                                    <div className="todo-indicator bg-success"></div>
                                                    <div className="widget-content p-0">
                                                        <div className="widget-content-wrapper">
                                                            <div className="widget-content-left mr-2">
                                                                <div className="custom-checkbox custom-control">
                                                                    <input type="checkbox" id="exampleCustomCheckbox3" className="custom-control-input" />
                                                                        <label className="custom-control-label" for="exampleCustomCheckbox3">&nbsp;</label>
                                                                </div>
                                                            </div>
                                                            <div className="widget-content-left flex2">
                                                                <div className="widget-heading">Development Task</div>
                                                                <div className="widget-subheading">Finish React ToDo List App</div>
                                                            </div>
                                                            <div className="widget-content-right">
                                                                <div className="badge badge-warning mr-2">69</div>
                                                            </div>
                                                            <div className="widget-content-right">
                                                                <button className="border-0 btn-transition btn btn-outline-success">
                                                                    <i className="fa fa-check"></i>
                                                                </button>
                                                                <button className="border-0 btn-transition btn btn-outline-danger">
                                                                    <i className="fa fa-trash-alt"></i>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="ps__rail-x" style={{ left: 0, bottom: 0, }}>
                                            <div className="ps__thumb-x" tabIndex="0" style={{ left: 0, width: 0, }}></div>
                                        </div>
                                        <div className="ps__rail-y" style={{ top: 0, height: 400, right: 0, }}>
                                            <div className="ps__thumb-y" tabIndex="0" style={{ top: 0, height: 206, }}></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-block text-right card-footer">
                                    <button className="mr-2 btn btn-link btn-sm">Cancel</button>
                                    <button className="btn btn-primary">Add Task</button>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-12 col-lg-4">
                            <div className="card-hover-shadow-2x mb-3 card">
                                <div className="card-header-tab card-header">
                                    <div className="card-header-title font-size-lg text-capitalize font-weight-normal">
                                        <i className="header-icon lnr-database icon-gradient bg-malibu-beach"> </i>Tasks List
                                    </div>
                                    <div className="btn-actions-pane-right text-capitalize actions-icon-btn">
                                        <div className="btn-group dropdown">
                                            <button type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" className="btn-icon btn-icon-only btn btn-link">
                                                <i className="pe-7s-menu btn-icon-wrapper"></i>
                                            </button>
                                            <div tabIndex="-1" role="menu" aria-hidden="true" className="dropdown-menu-right rm-pointers dropdown-menu-shadow dropdown-menu-hover-link dropdown-menu">
                                                <h6 tabIndex="-1" className="dropdown-header">Header</h6>
                                                <button type="button" tabIndex="0" className="dropdown-item">
                                                    <i className="dropdown-icon lnr-inbox"> </i><span>Menus</span>
                                                </button>
                                                <button type="button" tabIndex="0" className="dropdown-item">
                                                    <i className="dropdown-icon lnr-file-empty"> </i><span>Settings</span>
                                                </button>
                                                <button type="button" tabIndex="0" className="dropdown-item">
                                                    <i className="dropdown-icon lnr-book"> </i><span>Actions</span>
                                                </button>
                                                <div tabIndex="-1" className="dropdown-divider"></div>
                                                <div className="p-3 text-right">
                                                    <button className="mr-2 btn-shadow btn-sm btn btn-link">View Details</button>
                                                    <button className="mr-2 btn-shadow btn-sm btn btn-primary">Action</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="scroll-area-lg">
                                    <div className="scrollbar-container ps ps--active-y">
                                        <div className="p-2">
                                            <ul className="todo-list-wrapper list-group list-group-flush">
                                                <li className="list-group-item">
                                                    <div className="todo-indicator bg-warning"></div>
                                                    <div className="widget-content p-0">
                                                        <div className="widget-content-wrapper">
                                                            <div className="widget-content-left mr-2">
                                                                <div className="custom-checkbox custom-control">
                                                                    <input type="checkbox" id="exampleCustomCheckbox12" className="custom-control-input" />
                                                                        <label className="custom-control-label" for="exampleCustomCheckbox12">&nbsp;</label>
                                                                </div>
                                                            </div>
                                                            <div className="widget-content-left">
                                                                <div className="widget-heading">Wash the car
                                                                    <div className="badge badge-danger ml-2">Rejected</div>
                                                                </div>
                                                                <div className="widget-subheading"><i>Written by Bob</i></div>
                                                            </div>
                                                            <div className="widget-content-right widget-content-actions">
                                                                <button className="border-0 btn-transition btn btn-outline-success">
                                                                    <i className="fa fa-check"></i>
                                                                </button>
                                                                <button className="border-0 btn-transition btn btn-outline-danger">
                                                                    <i className="fa fa-trash-alt"></i>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className="list-group-item">
                                                    <div className="todo-indicator bg-focus"></div>
                                                    <div className="widget-content p-0">
                                                        <div className="widget-content-wrapper">
                                                            <div className="widget-content-left mr-2">
                                                                <div className="custom-checkbox custom-control">
                                                                    <input type="checkbox" id="exampleCustomCheckbox1" className="custom-control-input" />
                                                                        <label className="custom-control-label" for="exampleCustomCheckbox1">&nbsp;</label>
                                                                </div>
                                                            </div>
                                                            <div className="widget-content-left">
                                                                <div className="widget-heading">Task with dropdown menu</div>
                                                                <div className="widget-subheading">
                                                                    <div>By Johnny
                                                                        <div className="badge badge-pill badge-info ml-2">NEW</div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="widget-content-right widget-content-actions">
                                                                <div className="d-inline-block dropdown">
                                                                    <button type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" className="border-0 btn-transition btn btn-link">
                                                                        <i className="fa fa-ellipsis-h"></i>
                                                                    </button>
                                                                    <div tabIndex="-1" role="menu" aria-hidden="true" className="dropdown-menu dropdown-menu-right">
                                                                        <h6 tabIndex="-1" className="dropdown-header">Header</h6>
                                                                        <button type="button" disabled="" tabIndex="-1" className="disabled dropdown-item">Action</button>
                                                                        <button type="button" tabIndex="0" className="dropdown-item">Another Action</button>
                                                                        <div tabIndex="-1" className="dropdown-divider"></div>
                                                                        <button type="button" tabIndex="0" className="dropdown-item">Another Action</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className="list-group-item">
                                                    <div className="todo-indicator bg-primary"></div>
                                                    <div className="widget-content p-0">
                                                        <div className="widget-content-wrapper">
                                                            <div className="widget-content-left mr-2">
                                                                <div className="custom-checkbox custom-control">
                                                                    <input type="checkbox" id="exampleCustomCheckbox4" className="custom-control-input" />
                                                                        <label className="custom-control-label" for="exampleCustomCheckbox4">&nbsp;</label>
                                                                </div>
                                                            </div>
                                                            <div className="widget-content-left flex2">
                                                                <div className="widget-heading">Badge on the right task</div>
                                                                <div className="widget-subheading">This task has show on hover actions!</div>
                                                            </div>
                                                            <div className="widget-content-right widget-content-actions">
                                                                <button className="border-0 btn-transition btn btn-outline-success">
                                                                    <i className="fa fa-check"></i>
                                                                </button>
                                                            </div>
                                                            <div className="widget-content-right ml-3">
                                                                <div className="badge badge-pill badge-success">Latest Task</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className="list-group-item">
                                                    <div className="todo-indicator bg-info"></div>
                                                    <div className="widget-content p-0">
                                                        <div className="widget-content-wrapper">
                                                            <div className="widget-content-left mr-2">
                                                                <div className="custom-checkbox custom-control">
                                                                    <input type="checkbox" id="exampleCustomCheckbox2" className="custom-control-input" />
                                                                        <label className="custom-control-label" for="exampleCustomCheckbox2">&nbsp;</label>
                                                                </div>
                                                            </div>
                                                            <div className="widget-content-left mr-3">
                                                                <div className="widget-content-left">
                                                                    <img width="42" className="rounded" src="assets/images/avatars/1.jpg" alt="" />
                                                                </div>
                                                            </div>
                                                            <div className="widget-content-left">
                                                                <div className="widget-heading">Go grocery shopping</div>
                                                                <div className="widget-subheading">A short description for this todo item</div>
                                                            </div>
                                                            <div className="widget-content-right widget-content-actions">
                                                                <button className="border-0 btn-transition btn btn-outline-success">
                                                                    <i className="fa fa-check"></i>
                                                                </button>
                                                                <button className="border-0 btn-transition btn btn-outline-danger">
                                                                    <i className="fa fa-trash-alt"></i>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className="list-group-item">
                                                    <div className="todo-indicator bg-success"></div>
                                                    <div className="widget-content p-0">
                                                        <div className="widget-content-wrapper">
                                                            <div className="widget-content-left mr-2">
                                                                <div className="custom-checkbox custom-control">
                                                                    <input type="checkbox" id="exampleCustomCheckbox3" className="custom-control-input" />
                                                                        <label className="custom-control-label" for="exampleCustomCheckbox3">&nbsp;</label>
                                                                </div>
                                                            </div>
                                                            <div className="widget-content-left flex2">
                                                                <div className="widget-heading">Development Task</div>
                                                                <div className="widget-subheading">Finish React ToDo List App</div>
                                                            </div>
                                                            <div className="widget-content-right">
                                                                <div className="badge badge-warning mr-2">69</div>
                                                            </div>
                                                            <div className="widget-content-right">
                                                                <button className="border-0 btn-transition btn btn-outline-success">
                                                                    <i className="fa fa-check"></i>
                                                                </button>
                                                                <button className="border-0 btn-transition btn btn-outline-danger">
                                                                    <i className="fa fa-trash-alt"></i>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className="list-group-item">
                                                    <div className="todo-indicator bg-warning"></div>
                                                    <div className="widget-content p-0">
                                                        <div className="widget-content-wrapper">
                                                            <div className="widget-content-left mr-2">
                                                                <div className="custom-checkbox custom-control">
                                                                    <input type="checkbox" id="exampleCustomCheckbox12" className="custom-control-input" />
                                                                        <label className="custom-control-label" for="exampleCustomCheckbox12">&nbsp;</label>
                                                                </div>
                                                            </div>
                                                            <div className="widget-content-left">
                                                                <div className="widget-heading">Wash the car
                                                                    <div className="badge badge-danger ml-2">Rejected</div>
                                                                </div>
                                                                <div className="widget-subheading"><i>Written by Bob</i></div>
                                                            </div>
                                                            <div className="widget-content-right widget-content-actions">
                                                                <button className="border-0 btn-transition btn btn-outline-success">
                                                                    <i className="fa fa-check"></i>
                                                                </button>
                                                                <button className="border-0 btn-transition btn btn-outline-danger">
                                                                    <i className="fa fa-trash-alt"></i>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className="list-group-item">
                                                    <div className="todo-indicator bg-focus"></div>
                                                    <div className="widget-content p-0">
                                                        <div className="widget-content-wrapper">
                                                            <div className="widget-content-left mr-2">
                                                                <div className="custom-checkbox custom-control">
                                                                    <input type="checkbox" id="exampleCustomCheckbox1" className="custom-control-input" />
                                                                        <label className="custom-control-label" for="exampleCustomCheckbox1">&nbsp;</label>
                                                                </div>
                                                            </div>
                                                            <div className="widget-content-left">
                                                                <div className="widget-heading">Task with dropdown menu</div>
                                                                <div className="widget-subheading">
                                                                    <div>By Johnny
                                                                        <div className="badge badge-pill badge-info ml-2">NEW</div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="widget-content-right widget-content-actions">
                                                                <div className="d-inline-block dropdown">
                                                                    <button type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" className="border-0 btn-transition btn btn-link">
                                                                        <i className="fa fa-ellipsis-h"></i>
                                                                    </button>
                                                                    <div tabIndex="-1" role="menu" aria-hidden="true" className="dropdown-menu dropdown-menu-right">
                                                                        <h6 tabIndex="-1" className="dropdown-header">Header</h6>
                                                                        <button type="button" disabled="" tabIndex="-1" className="disabled dropdown-item">Action</button>
                                                                        <button type="button" tabIndex="0" className="dropdown-item">Another Action</button>
                                                                        <div tabIndex="-1" className="dropdown-divider"></div>
                                                                        <button type="button" tabIndex="0" className="dropdown-item">Another Action</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className="list-group-item">
                                                    <div className="todo-indicator bg-primary"></div>
                                                    <div className="widget-content p-0">
                                                        <div className="widget-content-wrapper">
                                                            <div className="widget-content-left mr-2">
                                                                <div className="custom-checkbox custom-control">
                                                                    <input type="checkbox" id="exampleCustomCheckbox4" className="custom-control-input" />
                                                                        <label className="custom-control-label" for="exampleCustomCheckbox4">&nbsp;</label>
                                                                </div>
                                                            </div>
                                                            <div className="widget-content-left flex2">
                                                                <div className="widget-heading">Badge on the right task</div>
                                                                <div className="widget-subheading">This task has show on hover actions!</div>
                                                            </div>
                                                            <div className="widget-content-right widget-content-actions">
                                                                <button className="border-0 btn-transition btn btn-outline-success">
                                                                    <i className="fa fa-check"></i>
                                                                </button>
                                                            </div>
                                                            <div className="widget-content-right ml-3">
                                                                <div className="badge badge-pill badge-success">Latest Task</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className="list-group-item">
                                                    <div className="todo-indicator bg-info"></div>
                                                    <div className="widget-content p-0">
                                                        <div className="widget-content-wrapper">
                                                            <div className="widget-content-left mr-2">
                                                                <div className="custom-checkbox custom-control">
                                                                    <input type="checkbox" id="exampleCustomCheckbox2" className="custom-control-input" />
                                                                        <label className="custom-control-label" for="exampleCustomCheckbox2">&nbsp;</label>
                                                                </div>
                                                            </div>
                                                            <div className="widget-content-left mr-3">
                                                                <div className="widget-content-left">
                                                                    <img width="42" className="rounded" src="assets/images/avatars/1.jpg" alt="" />
                                                                </div>
                                                            </div>
                                                            <div className="widget-content-left">
                                                                <div className="widget-heading">Go grocery shopping</div>
                                                                <div className="widget-subheading">A short description for this todo item</div>
                                                            </div>
                                                            <div className="widget-content-right widget-content-actions">
                                                                <button className="border-0 btn-transition btn btn-outline-success">
                                                                    <i className="fa fa-check"></i>
                                                                </button>
                                                                <button className="border-0 btn-transition btn btn-outline-danger">
                                                                    <i className="fa fa-trash-alt"></i>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className="list-group-item">
                                                    <div className="todo-indicator bg-success"></div>
                                                    <div className="widget-content p-0">
                                                        <div className="widget-content-wrapper">
                                                            <div className="widget-content-left mr-2">
                                                                <div className="custom-checkbox custom-control">
                                                                    <input type="checkbox" id="exampleCustomCheckbox3" className="custom-control-input" />
                                                                        <label className="custom-control-label" for="exampleCustomCheckbox3">&nbsp;</label>
                                                                </div>
                                                            </div>
                                                            <div className="widget-content-left flex2">
                                                                <div className="widget-heading">Development Task</div>
                                                                <div className="widget-subheading">Finish React ToDo List App</div>
                                                            </div>
                                                            <div className="widget-content-right">
                                                                <div className="badge badge-warning mr-2">69</div>
                                                            </div>
                                                            <div className="widget-content-right">
                                                                <button className="border-0 btn-transition btn btn-outline-success">
                                                                    <i className="fa fa-check"></i>
                                                                </button>
                                                                <button className="border-0 btn-transition btn btn-outline-danger">
                                                                    <i className="fa fa-trash-alt"></i>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="ps__rail-x" style={{ left: 0, bottom: 0, }}>
                                            <div className="ps__thumb-x" tabIndex="0" style={{ left: 0, width: 0, }}></div>
                                        </div>
                                        <div className="ps__rail-y" style={{ top: 0, height: 400, right: 0, }}>
                                            <div className="ps__thumb-y" tabIndex="0" style={{ top: 0, height: 206, }}></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-block text-right card-footer">
                                    <button className="mr-2 btn btn-link btn-sm">Cancel</button>
                                    <button className="btn btn-primary">Add Task</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );

};

export default Inicio;
