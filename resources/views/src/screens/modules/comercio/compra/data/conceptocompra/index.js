
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { C_Confirm, C_Footer, C_Loading, C_Message, C_ModalDraggable } from '../../../../../../components';

import M_ListadoConceptoCompra from './modal/listado';
import C_Form from './components/form';

import { conceptoCompraActions } from '../../../../../../redux/actions/comercio/compra/conceptoCompraActions';

import { disabledActions } from '../../../../../../redux/actions/config/disabledActions';
import { printOptionActions } from '../../../../../../redux/actions/config/printOptionActions';
import { archivoOptionActions } from '../../../../../../redux/actions/config/archivoActions';

import ArchivoConceptoCompra from './components/archivo';
import OptionConceptoCompra from './components/option';

import ConceptoCompraReport from './report';
import ConceptoCompraPDF from './report/conceptoCompraPDF';

function IndexConceptoCompra( props ) {
    const { archivo, conceptoCompra, disabled, option, paginations } = props;
    
    const [ visible_pdf, setVisiblePDF ] = useState( false );
    const [ visible_action, setVisibleAction ] = useState( false );

    useEffect( () => {
        props.initData();
        // return () => { };
    }, [] );

    function existValue() {
        if ( conceptoCompra.idconceptocompra ) {
            return ( conceptoCompra.idconceptocompra.toString().trim().length > 0 );
        };
        return false;
    }

    function onGrabarData() {
        if( conceptoCompra.update )  props.onUpdate( conceptoCompra );
        else props.onGrabar( conceptoCompra )
    };

    function onConfirmarDelete() {
        if ( !existValue() ) {
            C_Message( "error", "CONCEPTO COMPRA no seleccionado" );
            return;
        };
        let ondelete = () => props.onDelete(conceptoCompra);
        C_Confirm( { title: "Eliminar CONCEPTO COMPRA", onOk: ondelete } );
    };

    function onPressEnterID() {
        if ( existValue() )  props.onSearchData( conceptoCompra );
        else setVisibleAction(true);
    };

    function componentConceptoCompra() {
        if ( !visible_action ) return null;
        return (
            <M_ListadoConceptoCompra
                visible={visible_action}
                onClose={ () => setVisibleAction(false) }
                value={conceptoCompra.idconceptocompra}
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
                    document.getElementById("conceptocompra_print").click();
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
            <OptionConceptoCompra 
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
                    document.getElementById('buttonconceptocompra_xls').click();
                }, 1000);
                return;
            }
            if ( archivo.checked.xlsx && result.response == 1 ) {
                setTimeout(() => {
                    document.getElementById('buttonconceptocompra_xlsx').click();
                }, 1000);
                return;
            }
            if ( archivo.checked.csv && result.response == 1 ) {
                setTimeout(() => {
                    document.getElementById('buttonconceptocompra_csv').click();
                }, 1000);
                return;
            }
        } );
    };

    function componentArchivo() {
        return (
            <ArchivoConceptoCompra 
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
                    title={ "REPORTE CONCEPTO COMPRA" }
                    bodyStyle={{ padding: '5px 4px', }}
                    style={{ top: 10, }}
                >
                    <ConceptoCompraPDF 
                        conceptoCompra={conceptoCompra.reporte}
                    />
                </C_ModalDraggable>
            </>
        );
    };

    return (
        <>
            <C_Loading visible={ props.loading } />

            { componentConceptoCompra() }
            { componentOption() }
            { componentArchivo() }
            { componentPDF() }

            <ConceptoCompraReport
                conceptoCompra={ conceptoCompra.reporte }
                archivo={ archivo }
                option={ option }
            />

            <div className="pt-2 pb-3" style={{ flexGrow: 1, width: "100%", }}>
                <C_Form 
                    conceptoCompra={ conceptoCompra }
                    onChange={props.onChange}
                    disabled={disabled}
                    onPressEnter={onPressEnterID}
                />
            </div>
            <C_Footer 
                disabled={disabled}

                onCreate={props.onCreate}
                onGrabar={onGrabarData}
                onUpdate={ () => props.onEditar( conceptoCompra ) }
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

IndexConceptoCompra.propTypes = {
    onClose:    PropTypes.func,
}

IndexConceptoCompra.defaultProps = {
    onClose: () => {},
}

const mapStateToProps = ( state ) => ( {
    conceptoCompra: state.conceptoCompra,

    disabled:    state.disabled,
    loading:     state.loading.visible,
    paginations: state.paginations,
    option:      state.printOption,
    archivo:     state.archivoOption,
} );

const mapDispatchToProps = {
    initData:     conceptoCompraActions.initData,
    onChangePage: conceptoCompraActions.onChangePage,

    onChange:   conceptoCompraActions.onChange,
    onSetState: conceptoCompraActions.setState,

    onCreate:   conceptoCompraActions.onCreate,
    onGrabar:   conceptoCompraActions.onGrabar,
    onEditar:   conceptoCompraActions.onEditar,
    onUpdate:   conceptoCompraActions.onUpdate,
    onDelete:   conceptoCompraActions.onDelete,
    onImprimir: conceptoCompraActions.onImprimir,

    onSearch:     conceptoCompraActions.onSearch,
    onSearchData: conceptoCompraActions.onSearchData,

    onCancelar: conceptoCompraActions.onCancelar,

    onDisabledEvent: disabledActions.onAction,

    setPrintOption:    printOptionActions.setData,
    resetPrintOption:  printOptionActions.reset,

    setArchivoOption: archivoOptionActions.setData,
};

export default connect( mapStateToProps, mapDispatchToProps )( IndexConceptoCompra );
