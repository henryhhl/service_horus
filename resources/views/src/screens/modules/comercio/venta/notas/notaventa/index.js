
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { C_Confirm, C_Footer, C_Loading, C_Message, C_ModalDraggable } from '../../../../../../components';

import M_ListadoNotaVenta from './modal/listado';

import C_Form from './components/form';
import C_Archivo from './components/archivo';
import C_Option from './components/option';

import { notaVentaActions } from '../../../../../../redux/actions/comercio/venta/notaVentaActions';

import { disabledActions } from '../../../../../../redux/actions/config/disabledActions';
import { printOptionActions } from '../../../../../../redux/actions/config/printOptionActions';
import { archivoOptionActions } from '../../../../../../redux/actions/config/archivoActions';


import NotaVentaReport from './report';
import NotaVentaPDF from './report/notaVentaPDF';

function IndexNotaVenta( props ) {
    const { archivo, notaVenta, disabled, option, paginations } = props;

    const [ visible_pdf, setVisiblePDF ] = useState( false );
    const [ visible_action, setVisibleAction ] = useState( false );

    useEffect( () => {
        props.initData();
        // return () => { };
    }, [] );

    function existValue() {
        if ( notaVenta.idnotaventa ) {
            return ( notaVenta.idnotaventa.toString().trim().length > 0 );
        };
        return false;
    }

    function onGrabarData() {
        if( notaVenta.update ) {
            let onUpdate = () => props.onUpdate( notaVenta );
            C_Confirm( {
                title: "Editar Nota Venta", onOk: onUpdate,
                okType: "primary", content: "Estás seguro de actualizar información?",
            } );
        } else {
            let ongrabar = () => props.onGrabar( notaVenta );
            C_Confirm( {
                title: "Registrar Nota Venta", onOk: ongrabar,
                okType: "primary", content: "Estás seguro de registrar información?",
            } );
        }
    };

    function onConfirmarDelete() {
        if ( !existValue() ) {
            C_Message( "error", "Nota Venta no seleccionado" );
            return;
        };
        let ondelete = () => props.onDelete(notaVenta);
        C_Confirm( { title: "Eliminar Nota Venta", onOk: ondelete } );
    };

    function onPressEnterID() {
        if ( existValue() )  props.onSearchData( notaVenta );
        else setVisibleAction(true);
    };

    function componentNotaVenta() {
        if ( !visible_action ) return null;
        return (
            <M_ListadoNotaVenta
                visible={visible_action}
                onClose={ () => setVisibleAction(false) }
                value={notaVenta.idnotaventa}
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
                    document.getElementById("notaventa_print").click();
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
                    document.getElementById('buttonnotaventa_xls').click();
                }, 1000);
                return;
            }
            if ( archivo.checked.xlsx && result.response == 1 ) {
                setTimeout(() => {
                    document.getElementById('buttonnotaventa_xlsx').click();
                }, 1000);
                return;
            }
            if ( archivo.checked.csv && result.response == 1 ) {
                setTimeout(() => {
                    document.getElementById('buttonnotaventa_csv').click();
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
                    title={ "REPORTE Nota Venta" }
                    bodyStyle={{ padding: '5px 4px', }}
                    style={{ top: 10, }}
                >
                    <NotaVentaPDF
                        notaVenta={notaVenta.reporte}
                    />
                </C_ModalDraggable>
            </>
        );
    };

    return (
        <>
            <C_Loading visible={ props.loading } />

            { componentNotaVenta() }
            { componentOption() }
            { componentArchivo() }
            { componentPDF() }

            <NotaVentaReport
                notaVenta={ notaVenta.reporte }
                archivo={ archivo }
                option={ option }
            />

            <div className="pt-2 pb-3" style={{ flexGrow: 1, width: "100%", }}>
                <C_Form
                    notaVenta={ notaVenta }
                    onChange={props.onChange}
                    disabled={disabled}
                    onPressEnter={onPressEnterID}
                />
            </div>
            <C_Footer
                disabled={disabled}

                onCreate={props.onCreate}
                onGrabar={onGrabarData}
                onUpdate={ () => props.onEditar( notaVenta ) }
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

IndexNotaVenta.propTypes = {
    onClose:    PropTypes.func,
}

IndexNotaVenta.defaultProps = {
    onClose: () => {},
}

const mapStateToProps = ( state ) => ( {
    notaVenta: state.notaVenta,

    disabled:    state.disabled,
    loading:     state.loading.visible,
    paginations: state.paginations,
    option:      state.printOption,
    archivo:     state.archivoOption,
} );

const mapDispatchToProps = {
    initData:     notaVentaActions.initData,
    onChangePage: notaVentaActions.onChangePage,

    onChange:   notaVentaActions.onChange,
    onSetState: notaVentaActions.setState,

    onCreate:   notaVentaActions.onCreate,
    onGrabar:   notaVentaActions.onGrabar,
    onEditar:   notaVentaActions.onEditar,
    onUpdate:   notaVentaActions.onUpdate,
    onDelete:   notaVentaActions.onDelete,
    onImprimir: notaVentaActions.onImprimir,

    onSearch:     notaVentaActions.onSearch,
    onSearchData: notaVentaActions.onSearchData,

    onCancelar: notaVentaActions.onCancelar,

    onDisabledEvent: disabledActions.onAction,

    setPrintOption:    printOptionActions.setData,
    resetPrintOption:  printOptionActions.reset,

    setArchivoOption: archivoOptionActions.setData,
};

export default connect( mapStateToProps, mapDispatchToProps )( IndexNotaVenta );
