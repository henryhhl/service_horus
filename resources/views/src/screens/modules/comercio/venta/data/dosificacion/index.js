
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { C_Confirm, C_Footer, C_Loading, C_Message, C_ModalDraggable } from '../../../../../../components';

import M_ListadoDosificacion from './modal/listado';

import C_Form from './components/form';
import C_Archivo from './components/archivo';
import C_Option from './components/option';

import { dosificacionActions } from '../../../../../../redux/actions/comercio/venta/dosificacionActions';

import { disabledActions } from '../../../../../../redux/actions/config/disabledActions';
import { printOptionActions } from '../../../../../../redux/actions/config/printOptionActions';
import { archivoOptionActions } from '../../../../../../redux/actions/config/archivoActions';


import DosificacionReport from './report';
import DosificacionPDF from './report/dosificacionPDF';

function IndexDosificacion( props ) {
    const { archivo, dosificacion, disabled, option, paginations } = props;

    const [ visible_pdf, setVisiblePDF ] = useState( false );
    const [ visible_action, setVisibleAction ] = useState( false );

    useEffect( () => {
        props.initData();
        // return () => { };
    }, [] );

    function existValue() {
        if ( dosificacion.iddosificacion ) {
            return ( dosificacion.iddosificacion.toString().trim().length > 0 );
        };
        return false;
    }

    function onGrabarData() {
        if( dosificacion.update ) {
            let onUpdate = () => props.onUpdate( dosificacion );
            C_Confirm( {
                title: "Editar Dosificación", onOk: onUpdate,
                okType: "primary", content: "Estás seguro de actualizar información?",
            } );
        } else {
            let ongrabar = () => props.onGrabar( dosificacion );
            C_Confirm( {
                title: "Registrar Dosificación", onOk: ongrabar,
                okType: "primary", content: "Estás seguro de registrar información?",
            } );
        }
    };

    function onConfirmarDelete() {
        if ( !existValue() ) {
            C_Message( "error", "Dosificación no seleccionado" );
            return;
        };
        let ondelete = () => props.onDelete(dosificacion);
        C_Confirm( { title: "Eliminar Dosificación", onOk: ondelete } );
    };

    function onPressEnterID() {
        if ( existValue() )  props.onSearchData( dosificacion );
        else setVisibleAction(true);
    };

    function componentDosificacion() {
        if ( !visible_action ) return null;
        return (
            <M_ListadoDosificacion
                visible={visible_action}
                onClose={ () => setVisibleAction(false) }
                value={dosificacion.iddosificacion}
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
                    document.getElementById("dosificacion_print").click();
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
                    document.getElementById('buttondosificacion_xls').click();
                }, 1000);
                return;
            }
            if ( archivo.checked.xlsx && result.response == 1 ) {
                setTimeout(() => {
                    document.getElementById('buttondosificacion_xlsx').click();
                }, 1000);
                return;
            }
            if ( archivo.checked.csv && result.response == 1 ) {
                setTimeout(() => {
                    document.getElementById('buttondosificacion_csv').click();
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
                    width={"98%"}  zIndex={ 1200 }
                    title={ "REPORTE Dosificación" }
                    bodyStyle={{ padding: '5px 4px', }}
                    style={{ top: 10, }}
                >
                    <DosificacionPDF
                        dosificacion={dosificacion.reporte}
                    />
                </C_ModalDraggable>
            </>
        );
    };

    return (
        <>
            <C_Loading visible={ props.loading } />

            { componentDosificacion() }
            { componentOption() }
            { componentArchivo() }
            { componentPDF() }

            <DosificacionReport
                dosificacion={ dosificacion.reporte }
                archivo={ archivo }
                option={ option }
            />

            <div className="pt-2 pb-3" style={{ flexGrow: 1, width: "100%", }}>
                <C_Form
                    dosificacion={ dosificacion }
                    onChange={props.onChange}
                    disabled={disabled}
                    onPressEnter={onPressEnterID}
                />
            </div>
            <C_Footer
                disabled={disabled}

                onCreate={props.onCreate}
                onGrabar={onGrabarData}
                onUpdate={ () => props.onEditar( dosificacion ) }
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

IndexDosificacion.propTypes = {
    onClose:    PropTypes.func,
}

IndexDosificacion.defaultProps = {
    onClose: () => {},
}

const mapStateToProps = ( state ) => ( {
    dosificacion: state.dosificacion,

    disabled:    state.disabled,
    loading:     state.loading.visible,
    paginations: state.paginations,
    option:      state.printOption,
    archivo:     state.archivoOption,
} );

const mapDispatchToProps = {
    initData:     dosificacionActions.initData,
    onChangePage: dosificacionActions.onChangePage,

    onChange:   dosificacionActions.onChange,
    onSetState: dosificacionActions.setState,

    onCreate:   dosificacionActions.onCreate,
    onGrabar:   dosificacionActions.onGrabar,
    onEditar:   dosificacionActions.onEditar,
    onUpdate:   dosificacionActions.onUpdate,
    onDelete:   dosificacionActions.onDelete,
    onImprimir: dosificacionActions.onImprimir,

    onSearch:     dosificacionActions.onSearch,
    onSearchData: dosificacionActions.onSearchData,

    onCancelar: dosificacionActions.onCancelar,

    onDisabledEvent: disabledActions.onAction,

    setPrintOption:    printOptionActions.setData,
    resetPrintOption:  printOptionActions.reset,

    setArchivoOption: archivoOptionActions.setData,
};

export default connect( mapStateToProps, mapDispatchToProps )( IndexDosificacion );
