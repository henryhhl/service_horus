
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { C_Confirm, C_Footer, C_Loading, C_Message, C_ModalDraggable } from '../../../../../../components';

import M_ListadoConceptoVenta from './modal/listado';

import C_Form from './components/form';
import C_Archivo from './components/archivo';
import C_Option from './components/option';

import { conceptoVentaActions } from '../../../../../../redux/actions/comercio/venta/conceptoVentaActions';

import { disabledActions } from '../../../../../../redux/actions/config/disabledActions';
import { printOptionActions } from '../../../../../../redux/actions/config/printOptionActions';
import { archivoOptionActions } from '../../../../../../redux/actions/config/archivoActions';


import ConceptoVentaReport from './report';
import ConceptoVentaPDF from './report/conceptoVentaPDF';

function IndexConceptoVenta( props ) {
    const { archivo, conceptoVenta, disabled, option, paginations } = props;

    const [ visible_pdf, setVisiblePDF ] = useState( false );
    const [ visible_action, setVisibleAction ] = useState( false );

    useEffect( () => {
        props.initData();
        // return () => { };
    }, [] );

    function existValue() {
        if ( conceptoVenta.idconceptoventa ) {
            return ( conceptoVenta.idconceptoventa.toString().trim().length > 0 );
        };
        return false;
    }

    function onGrabarData() {
        if( conceptoVenta.update ) {
            let onUpdate = () => props.onUpdate( conceptoVenta );
            C_Confirm( {
                title: "Editar Concepto Venta", onOk: onUpdate,
                okType: "primary", content: "Estás seguro de actualizar información?",
            } );
        } else {
            let ongrabar = () => props.onGrabar( conceptoVenta );
            C_Confirm( {
                title: "Registrar concepto Venta", onOk: ongrabar,
                okType: "primary", content: "Estás seguro de registrar información?",
            } );
        }
    };

    function onConfirmarDelete() {
        if ( !existValue() ) {
            C_Message( "error", "CONCEPTO VENTA no seleccionado" );
            return;
        };
        let ondelete = () => props.onDelete(conceptoVenta);
        C_Confirm( { title: "Eliminar CONCEPTO VENTA", onOk: ondelete } );
    };

    function onPressEnterID() {
        if ( existValue() )  props.onSearchData( conceptoVenta );
        else setVisibleAction(true);
    };

    function componentConceptoVenta() {
        if ( !visible_action ) return null;
        return (
            <M_ListadoConceptoVenta
                visible={visible_action}
                onClose={ () => setVisibleAction(false) }
                value={conceptoVenta.idconceptoventa}
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
                    document.getElementById("conceptoventa_print").click();
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
                    document.getElementById('buttonconceptoventa_xls').click();
                }, 1000);
                return;
            }
            if ( archivo.checked.xlsx && result.response == 1 ) {
                setTimeout(() => {
                    document.getElementById('buttonconceptoventa_xlsx').click();
                }, 1000);
                return;
            }
            if ( archivo.checked.csv && result.response == 1 ) {
                setTimeout(() => {
                    document.getElementById('buttonconceptoventa_csv').click();
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
                    title={ "REPORTE CONCEPTO VENTA" }
                    bodyStyle={{ padding: '5px 4px', }}
                    style={{ top: 10, }}
                >
                    <ConceptoVentaPDF
                        conceptoVenta={conceptoVenta.reporte}
                    />
                </C_ModalDraggable>
            </>
        );
    };

    return (
        <>
            <C_Loading visible={ props.loading } />

            { componentConceptoVenta() }
            { componentOption() }
            { componentArchivo() }
            { componentPDF() }

            <ConceptoVentaReport
                conceptoVenta={ conceptoVenta.reporte }
                archivo={ archivo }
                option={ option }
            />

            <div className="pt-2 pb-3" style={{ flexGrow: 1, width: "100%", }}>
                <C_Form
                    conceptoVenta={ conceptoVenta }
                    onChange={props.onChange}
                    disabled={disabled}
                    onPressEnter={onPressEnterID}
                />
            </div>
            <C_Footer
                disabled={disabled}

                onCreate={props.onCreate}
                onGrabar={onGrabarData}
                onUpdate={ () => props.onEditar( conceptoVenta ) }
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

IndexConceptoVenta.propTypes = {
    onClose:    PropTypes.func,
}

IndexConceptoVenta.defaultProps = {
    onClose: () => {},
}

const mapStateToProps = ( state ) => ( {
    conceptoVenta: state.conceptoVenta,

    disabled:    state.disabled,
    loading:     state.loading.visible,
    paginations: state.paginations,
    option:      state.printOption,
    archivo:     state.archivoOption,
} );

const mapDispatchToProps = {
    initData:     conceptoVentaActions.initData,
    onChangePage: conceptoVentaActions.onChangePage,

    onChange:   conceptoVentaActions.onChange,
    onSetState: conceptoVentaActions.setState,

    onCreate:   conceptoVentaActions.onCreate,
    onGrabar:   conceptoVentaActions.onGrabar,
    onEditar:   conceptoVentaActions.onEditar,
    onUpdate:   conceptoVentaActions.onUpdate,
    onDelete:   conceptoVentaActions.onDelete,
    onImprimir: conceptoVentaActions.onImprimir,

    onSearch:     conceptoVentaActions.onSearch,
    onSearchData: conceptoVentaActions.onSearchData,

    onCancelar: conceptoVentaActions.onCancelar,

    onDisabledEvent: disabledActions.onAction,

    setPrintOption:    printOptionActions.setData,
    resetPrintOption:  printOptionActions.reset,

    setArchivoOption: archivoOptionActions.setData,
};

export default connect( mapStateToProps, mapDispatchToProps )( IndexConceptoVenta );
