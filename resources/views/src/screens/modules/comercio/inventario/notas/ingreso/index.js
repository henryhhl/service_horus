
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { C_Confirm, C_Footer, C_Loading, C_Message, C_ModalDraggable } from '../../../../../../components';

import M_ListadoNotaIngreso from './modal/listado';
import C_Form from './components/form';

import { notaIngresoActions } from '../../../../../../redux/actions/comercio/inventario/notaIngresoActions';

import { disabledActions } from '../../../../../../redux/actions/config/disabledActions';
import { printOptionActions } from '../../../../../../redux/actions/config/printOptionActions';
import { archivoOptionActions } from '../../../../../../redux/actions/config/archivoActions';

import ArchivoNotaIngreso from './components/archivo';
import OptionNotaIngreso from './components/option';

import NotaIngresoReport from './report';
import NotaIngresoPDF from './report/notaIngresoPDF';

function IndexNotaIngreso( props ) {
    const { archivo, notaIngreso, disabled, option, paginations } = props;
    
    const [ visible_pdf, setVisiblePDF ] = useState( false );
    const [ visible_action, setVisibleAction ] = useState( false );

    useEffect( () => {
        props.initData();
        // return () => { };
    }, [] );

    function existValue() {
        if ( notaIngreso.idnotaingreso ) {
            return ( notaIngreso.idnotaingreso.toString().trim().length > 0 );
        };
        return false;
    }

    function onGrabarData() {
        if( notaIngreso.update )  props.onUpdate( notaIngreso );
        else props.onGrabar( notaIngreso )
    };

    function onConfirmarDelete() {
        if ( !existValue() ) {
            C_Message( "error", "Nota Ingreso no seleccionado" );
            return;
        };
        let ondelete = () => props.onDelete(notaIngreso);
        C_Confirm( { title: "Eliminar Nota Ingreso", onOk: ondelete } );
    };

    function onPressEnterID() {
        if ( existValue() )  props.onSearchData( notaIngreso );
        else setVisibleAction(true);
    };

    function componentNotaIngreso() {
        if ( !visible_action ) return null;
        return (
            <M_ListadoNotaIngreso
                visible={visible_action}
                onClose={ () => setVisibleAction(false) }
                value={notaIngreso.idnotaingreso}
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
                    document.getElementById("notaingreso_print").click();
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
            <OptionNotaIngreso 
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
                    document.getElementById('buttonnotaingreso_xls').click();
                }, 1000);
                return;
            }
            if ( archivo.checked.xlsx && result.response == 1 ) {
                setTimeout(() => {
                    document.getElementById('buttonnotaingreso_xlsx').click();
                }, 1000);
                return;
            }
            if ( archivo.checked.csv && result.response == 1 ) {
                setTimeout(() => {
                    document.getElementById('buttonnotaingreso_csv').click();
                }, 1000);
                return;
            }
        } );
    };

    function componentArchivo() {
        return (
            <ArchivoNotaIngreso 
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
                    title={ "REPORTE NOTA INGRESO" }
                    bodyStyle={{ padding: '5px 4px', }}
                    style={{ top: 10, }}
                >
                    <NotaIngresoPDF 
                        notaIngreso={notaIngreso.reporte}
                    />
                </C_ModalDraggable>
            </>
        );
    };

    return (
        <>
            <C_Loading visible={ props.loading } />

            { componentNotaIngreso() }
            { componentOption() }
            { componentArchivo() }
            { componentPDF() }

            <NotaIngresoReport
                notaIngreso={ notaIngreso.reporte }
                archivo={ archivo }
                option={ option }
            />

            <div className="pt-2 pb-3 pl-4 pr-4" style={{ flexGrow: 1, width: "100%", }}>
                <C_Form 
                    notaIngreso={ notaIngreso }
                    onChange={props.onChange}
                    disabled={disabled}
                    onPressEnter={onPressEnterID}
                />
            </div>
            <C_Footer 
                disabled={disabled}

                onCreate={props.onCreate}
                onGrabar={onGrabarData}
                // onUpdate={ () => props.onEditar( notaIngreso ) }
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

IndexNotaIngreso.propTypes = {
    onClose:    PropTypes.func,
}

IndexNotaIngreso.defaultProps = {
    onClose: () => {},
}

const mapStateToProps = ( state ) => ( {
    notaIngreso: state.notaIngreso,

    visible:     state.visible,
    disabled:    state.disabled,
    loading:     state.loading.visible,
    paginations: state.paginations,
    option:      state.printOption,
    archivo:     state.archivoOption,
} );

const mapDispatchToProps = {
    initData:     notaIngresoActions.initData,
    onChangePage: notaIngresoActions.onChangePage,

    onChange:   notaIngresoActions.onChange,
    onSetState: notaIngresoActions.setState,

    onCreate:   notaIngresoActions.onCreate,
    onGrabar:   notaIngresoActions.onGrabar,
    onEditar:   notaIngresoActions.onEditar,
    onUpdate:   notaIngresoActions.onUpdate,
    onDelete:   notaIngresoActions.onDelete,
    onImprimir: notaIngresoActions.onImprimir,

    onSearch:     notaIngresoActions.onSearch,
    onSearchData: notaIngresoActions.onSearchData,

    onCancelar: notaIngresoActions.onCancelar,

    onDisabledEvent: disabledActions.onAction,

    setPrintOption:    printOptionActions.setData,
    resetPrintOption:  printOptionActions.reset,

    setArchivoOption: archivoOptionActions.setData,
};

export default connect( mapStateToProps, mapDispatchToProps )( IndexNotaIngreso );
