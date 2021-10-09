
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { C_Confirm, C_Footer, C_Loading, C_Message, C_ModalDraggable } from '../../../../../../components';

import M_ListadoConceptoInventario from './modal/listado';
import C_Form from './components/form';

import { conceptoInventarioActions } from '../../../../../../redux/actions/comercio/inventario/conceptoInventarioActions';

import { disabledActions } from '../../../../../../redux/actions/config/disabledActions';
import { printOptionActions } from '../../../../../../redux/actions/config/printOptionActions';
import { archivoOptionActions } from '../../../../../../redux/actions/config/archivoActions';

import ArchivoConceptoInventario from './components/archivo';
import OptionConceptoInventario from './components/option';

import ConceptoInventarioReport from './report';
import ConceptoInventarioPDF from './report/conceptoInventarioPDF';

function IndexConceptoInventario( props ) {
    const { archivo, conceptoInventario, disabled, option, paginations } = props;
    
    const [ visible_pdf, setVisiblePDF ] = useState( false );
    const [ visible_action, setVisibleAction ] = useState( false );

    useEffect( () => {
        props.initData();
        // return () => { };
    }, [] );

    function existValue() {
        if ( conceptoInventario.idconceptoinventario ) {
            return ( conceptoInventario.idconceptoinventario.toString().trim().length > 0 );
        };
        return false;
    }

    function onGrabarData() {
        if( conceptoInventario.update )  props.onUpdate( conceptoInventario );
        else props.onGrabar( conceptoInventario )
    };

    function onConfirmarDelete() {
        if ( !existValue() ) {
            C_Message( "error", "Concepto Inventario no seleccionado" );
            return;
        };
        let ondelete = () => props.onDelete(conceptoInventario);
        C_Confirm( { title: "Eliminar Concepto Inventario", onOk: ondelete } );
    };

    function onPressEnterID() {
        if ( existValue() )  props.onSearchData( conceptoInventario );
        else setVisibleAction(true);
    };

    function componentConceptoInventario() {
        if ( !visible_action ) return null;
        return (
            <M_ListadoConceptoInventario
                visible={visible_action}
                onClose={ () => setVisibleAction(false) }
                value={conceptoInventario.idconceptoinventario}
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
                    document.getElementById("conceptoinventario_print").click();
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
            <OptionConceptoInventario 
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
                    document.getElementById('buttonconceptoinventario_xls').click();
                }, 1000);
                return;
            }
            if ( archivo.checked.xlsx && result.response == 1 ) {
                setTimeout(() => {
                    document.getElementById('buttonconceptoinventario_xlsx').click();
                }, 1000);
                return;
            }
            if ( archivo.checked.csv && result.response == 1 ) {
                setTimeout(() => {
                    document.getElementById('buttonconceptoinventario_csv').click();
                }, 1000);
                return;
            }
        } );
    };

    function componentArchivo() {
        return (
            <ArchivoConceptoInventario 
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
                    title={ "REPORTE CONCEPTO INVENTARIO" }
                    bodyStyle={{ padding: '5px 4px', }}
                    style={{ top: 10, }}
                >
                    <ConceptoInventarioPDF 
                        conceptoInventario={conceptoInventario.reporte}
                    />
                </C_ModalDraggable>
            </>
        );
    };

    return (
        <>
            <C_Loading visible={ props.loading } />

            { componentConceptoInventario() }
            { componentOption() }
            { componentArchivo() }
            { componentPDF() }

            <ConceptoInventarioReport
                conceptoInventario={ conceptoInventario.reporte }
                archivo={ archivo }
                option={ option }
            />

            <div className="pt-2 pb-3" style={{ flexGrow: 1, width: "100%", }}>
                <C_Form 
                    conceptoInventario={ conceptoInventario }
                    onChange={props.onChange}
                    disabled={disabled}
                    onPressEnter={onPressEnterID}
                />
            </div>
            <C_Footer 
                disabled={disabled}

                onCreate={props.onCreate}
                onGrabar={onGrabarData}
                onUpdate={ () => props.onEditar( conceptoInventario ) }
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

IndexConceptoInventario.propTypes = {
    onClose:    PropTypes.func,
}

IndexConceptoInventario.defaultProps = {
    onClose: () => {},
}

const mapStateToProps = ( state ) => ( {
    conceptoInventario: state.conceptoInventario,

    disabled:    state.disabled,
    loading:     state.loading.visible,
    paginations: state.paginations,
    option:      state.printOption,
    archivo:     state.archivoOption,
} );

const mapDispatchToProps = {
    initData:     conceptoInventarioActions.initData,
    onChangePage: conceptoInventarioActions.onChangePage,

    onChange:   conceptoInventarioActions.onChange,
    onSetState: conceptoInventarioActions.setState,

    onCreate:   conceptoInventarioActions.onCreate,
    onGrabar:   conceptoInventarioActions.onGrabar,
    onEditar:   conceptoInventarioActions.onEditar,
    onUpdate:   conceptoInventarioActions.onUpdate,
    onDelete:   conceptoInventarioActions.onDelete,
    onImprimir: conceptoInventarioActions.onImprimir,

    onSearch:     conceptoInventarioActions.onSearch,
    onSearchData: conceptoInventarioActions.onSearchData,

    onCancelar: conceptoInventarioActions.onCancelar,

    onDisabledEvent: disabledActions.onAction,

    setPrintOption:    printOptionActions.setData,
    resetPrintOption:  printOptionActions.reset,

    setArchivoOption: archivoOptionActions.setData,
};

export default connect( mapStateToProps, mapDispatchToProps )( IndexConceptoInventario );
