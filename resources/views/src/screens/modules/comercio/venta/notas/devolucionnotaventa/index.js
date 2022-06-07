
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { C_Confirm, C_Footer, C_Loading, C_Message, C_ModalDraggable } from '../../../../../../components';

import M_ListadoDevolucionNotaVenta from './modal/listado';

import C_Form from './components/form';
import C_Archivo from './components/archivo';
import C_Option from './components/option';

import { devolucionNotaVentaActions } from '../../../../../../redux/actions/comercio/venta/devolucionNotaVentaActions';

import { disabledActions } from '../../../../../../redux/actions/config/disabledActions';
import { printOptionActions } from '../../../../../../redux/actions/config/printOptionActions';
import { archivoOptionActions } from '../../../../../../redux/actions/config/archivoActions';


import DevolucionNotaVentaReport from './report';
import DevolucionNotaVentaPDF from './report/devolucionNotaVentaPDF';

function IndexDevolucionNotaVenta( props ) {
    const { archivo, devolucionNotaVenta, disabled, option, paginations } = props;

    const [ visible_pdf, setVisiblePDF ] = useState( false );
    const [ visible_action, setVisibleAction ] = useState( false );

    useEffect( () => {
        props.initData();
        // return () => { };
    }, [] );

    function existValue() {
        if ( devolucionNotaVenta.iddevolucionnotaventa ) {
            return ( devolucionNotaVenta.iddevolucionnotaventa.toString().trim().length > 0 );
        };
        return false;
    }

    function onGrabarData() {
        if( devolucionNotaVenta.update ) {
            let onUpdate = () => props.onUpdate( devolucionNotaVenta );
            C_Confirm( {
                title: "Editar Devolución Nota Venta", onOk: onUpdate,
                okType: "primary", content: "Estás seguro de actualizar información?",
            } );
        } else {
            let ongrabar = () => props.onGrabar( devolucionNotaVenta );
            C_Confirm( {
                title: "Registrar Devolución Nota Venta", onOk: ongrabar,
                okType: "primary", content: "Estás seguro de registrar información?",
            } );
        }
    };

    function onConfirmarDelete() {
        if ( !existValue() ) {
            C_Message( "error", "Devolución Nota Venta no seleccionado" );
            return;
        };
        let ondelete = () => props.onDelete(devolucionNotaVenta);
        C_Confirm( { title: "Eliminar Devolución Nota Venta", onOk: ondelete } );
    };

    function onPressEnterID() {
        if ( existValue() )  props.onSearchData( devolucionNotaVenta );
        else setVisibleAction(true);
    };

    function componentDevolucionNotaVenta() {
        if ( !visible_action ) return null;
        return (
            <M_ListadoDevolucionNotaVenta
                visible={visible_action}
                onClose={ () => setVisibleAction(false) }
                value={devolucionNotaVenta.iddevolucionnotaventa}
                onChange={ async ( data ) => {
                    await props.onSetState(data);
                    setVisibleAction(false);
                    await props.onDisabledEvent();
                } }
            />
        );
    };

    async function onSubmitOption() {
        if ( option.checked.archivo ) {
            await props.resetPrintOption();
            archivo.visible = true;
            await props.setArchivoOption(archivo);
            return;
        }
        props.onImprimir().then( async (result) => {
            if ( option.checked.impresora && result.response == 1 ) {
                props.resetPrintOption();
                setTimeout( () => {
                    document.getElementById("devolucionnotaventa_print").click();
                }, 1000);
                return;
            }
            if ( option.checked.pantalla && result.response == 1 ) {
                await props.resetPrintOption();
                setTimeout(() => {
                    setVisiblePDF( true );
                }, 1000);
                return;
            }
        } );
    }

    function componentOption() {
        return (
            <C_Option
                option={option}
                onChange={props.setPrintOption}
                onSubmit={ onSubmitOption }
            />
        );
    };

    function onSubmitArchivo() {
        props.onImprimir().then( (result) => {
            if ( archivo.checked.xls && result.response == 1 ) {
                setTimeout(() => {
                    document.getElementById('buttondevolucionnotaventa_xls').click();
                }, 1000);
                return;
            }
            if ( archivo.checked.xlsx && result.response == 1 ) {
                setTimeout(() => {
                    document.getElementById('buttondevolucionnotaventa_xlsx').click();
                }, 1000);
                return;
            }
            if ( archivo.checked.csv && result.response == 1 ) {
                setTimeout(() => {
                    document.getElementById('buttondevolucionnotaventa_csv').click();
                }, 1000);
                return;
            }
        } );
    };

    function componentArchivo() {
        return (
            <C_Archivo
                archivo={archivo}
                onChange={props.setArchivoOption}
                onSubmit={ onSubmitArchivo }
            />
        );
    };

    function componentPDF() {
        if ( !visible_pdf ) return null;
        return (
            <>
                <C_ModalDraggable
                    visible={ visible_pdf }
                    onClose={ () => {
                        setVisiblePDF( false );
                    } }
                    maskStyle={{ background: "transparent", }}
                    width={"90%"}  zIndex={ 1200 }
                    title={ "REPORTE DEVOLUCIÓN NOTA VENTA" }
                    bodyStyle={{ padding: '5px 4px', }}
                    style={{ top: 10, }}
                >
                    <DevolucionNotaVentaPDF
                        devolucionNotaVenta={devolucionNotaVenta.reporte}
                    />
                </C_ModalDraggable>
            </>
        );
    };

    return (
        <>
            <C_Loading visible={ props.loading } />

            { componentDevolucionNotaVenta() }
            { componentOption() }
            { componentArchivo() }
            { componentPDF() }

            <DevolucionNotaVentaReport
                devolucionNotaVenta={ devolucionNotaVenta.reporte }
                archivo={ archivo }
                option={ option }
            />

            <div className="pt-2 pb-3" style={{ flexGrow: 1, width: "100%", }}>
                <C_Form
                    devolucionNotaVenta={ devolucionNotaVenta }
                    onChange={props.onChange}
                    disabled={disabled}
                    onPressEnter={onPressEnterID}
                />
            </div>
            <C_Footer
                disabled={disabled}

                onCreate={props.onCreate}
                onGrabar={onGrabarData}
                onUpdate={ () => props.onEditar( devolucionNotaVenta ) }
                onDelete={ onConfirmarDelete }
                onSearch={ props.onSearch }

                onCancelar={props.onCancelar}
                onClose={ props.onClose }

                onImprimir={ () => {
                    option.visible = true;
                    props.setPrintOption(option);
                } }

                pagination={ paginations.pagination }
                pagina={ paginations.pagina }
                onChangePage={props.onChangePage}
            />
        </>
    );
};

IndexDevolucionNotaVenta.propTypes = {
    onClose:    PropTypes.func,
}

IndexDevolucionNotaVenta.defaultProps = {
    onClose: () => {},
}

const mapStateToProps = ( state ) => ( {
    devolucionNotaVenta: state.devolucionNotaVenta,

    disabled:    state.disabled,
    loading:     state.loading.visible,
    paginations: state.paginations,
    option:      state.printOption,
    archivo:     state.archivoOption,
} );

const mapDispatchToProps = {
    initData:     devolucionNotaVentaActions.initData,
    onChangePage: devolucionNotaVentaActions.onChangePage,

    onChange:   devolucionNotaVentaActions.onChange,
    onSetState: devolucionNotaVentaActions.setState,

    onCreate:   devolucionNotaVentaActions.onCreate,
    onGrabar:   devolucionNotaVentaActions.onGrabar,
    onEditar:   devolucionNotaVentaActions.onEditar,
    onUpdate:   devolucionNotaVentaActions.onUpdate,
    onDelete:   devolucionNotaVentaActions.onDelete,
    onImprimir: devolucionNotaVentaActions.onImprimir,

    onSearch:     devolucionNotaVentaActions.onSearch,
    onSearchData: devolucionNotaVentaActions.onSearchData,

    onCancelar: devolucionNotaVentaActions.onCancelar,

    onDisabledEvent: disabledActions.onAction,

    setPrintOption:    printOptionActions.setData,
    resetPrintOption:  printOptionActions.reset,

    setArchivoOption: archivoOptionActions.setData,
};

export default connect( mapStateToProps, mapDispatchToProps )( IndexDevolucionNotaVenta );
