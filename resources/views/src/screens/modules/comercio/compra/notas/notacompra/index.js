
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { C_Confirm, C_Footer, C_Loading, C_Message, C_ModalDraggable } from '../../../../../../components';

import M_ListadoNotaCompra from './modal/listado';
import C_Form from './components/form';

import { NotaCompraActions } from '../../../../../../redux/actions/comercio/compra/notaCompraActions';

import { disabledActions } from '../../../../../../redux/actions/config/disabledActions';
import { printOptionActions } from '../../../../../../redux/actions/config/printOptionActions';
import { archivoOptionActions } from '../../../../../../redux/actions/config/archivoActions';

import ArchivoNotaCompra from './components/archivo';
import OptionNotaCompra from './components/option';

import NotaCompraReport from './report';
import NotaCompraPDF from './report/notaCompraPDF';

function IndexNotaCompra( props ) {
    const { archivo, notaCompra, disabled, option, paginations } = props;
    
    const [ visible_pdf, setVisiblePDF ] = useState( false );
    const [ visible_action, setVisibleAction ] = useState( false );

    useEffect( () => {
        props.initData();
        // return () => { };
    }, [] );

    function existValue() {
        if ( notaCompra.idnotacompra ) {
            return ( notaCompra.idnotacompra.toString().trim().length > 0 );
        };
        return false;
    }

    function onGrabarData() {
        if( notaCompra.update ) {
            props.onUpdate( notaCompra );
        } else {
            let ongrabar = () => props.onGrabar( notaCompra );
            C_Confirm( { 
                title: "Registrar Nota Compra", onOk: ongrabar, 
                okType: "primary", content: "Estás seguro de registrar información?", 
            } );
        }
    };

    function onConfirmarDelete() {
        if ( !existValue() ) {
            C_Message( "error", "NOTA COMPRA no seleccionado" );
            return;
        };
        let ondelete = () => props.onDelete(notaCompra);
        C_Confirm( { title: "Eliminar NOTA COMPRA", onOk: ondelete } );
    };

    function onPressEnterID() {
        if ( existValue() )  props.onSearchData( notaCompra );
        else setVisibleAction(true);
    };

    function componentNotaCompra() {
        if ( !visible_action ) return null;
        return (
            <M_ListadoNotaCompra
                visible={visible_action}
                onClose={ () => setVisibleAction(false) }
                value={notaCompra.idnotacompra}
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
                    document.getElementById("notacompra_print").click();
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
            <OptionNotaCompra 
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
                    document.getElementById('buttonnotacompra_xls').click();
                }, 1000);
                return;
            }
            if ( archivo.checked.xlsx && result.response == 1 ) {
                setTimeout(() => {
                    document.getElementById('buttonnotacompra_xlsx').click();
                }, 1000);
                return;
            }
            if ( archivo.checked.csv && result.response == 1 ) {
                setTimeout(() => {
                    document.getElementById('buttonnotacompra_csv').click();
                }, 1000);
                return;
            }
        } );
    };

    function componentArchivo() {
        return (
            <ArchivoNotaCompra 
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
                    width={"95%"}  zIndex={ 1200 }  
                    title={ "REPORTE NOTA COMPRA" }
                    bodyStyle={{ padding: '5px 4px', }}
                    style={{ top: 10, }}
                >
                    <NotaCompraPDF 
                        notaCompra={notaCompra.reporte}
                    />
                </C_ModalDraggable>
            </>
        );
    };

    return (
        <>
            <C_Loading visible={ props.loading } />

            { componentNotaCompra() }
            { componentOption() }
            { componentArchivo() }
            { componentPDF() }

            <NotaCompraReport
                notaCompra={ notaCompra.reporte }
                archivo={ archivo }
                option={ option }
            />

            <div className="pt-2 pb-3 pl-4 pr-4" style={{ flexGrow: 1, width: "100%", }}>
                <C_Form 
                    notaCompra={ notaCompra }
                    onChange={props.onChange}
                    disabled={disabled}
                    onPressEnter={onPressEnterID}
                />
            </div>
            <C_Footer 
                disabled={disabled}

                onCreate={props.onCreate}
                onGrabar={onGrabarData}
                // onUpdate={ () => props.onEditar( notaCompra ) }
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

IndexNotaCompra.propTypes = {
    onClose:    PropTypes.func,
}

IndexNotaCompra.defaultProps = {
    onClose: () => {},
}

const mapStateToProps = ( state ) => ( {
    notaCompra: state.notaCompra,

    disabled:    state.disabled,
    loading:     state.loading.visible,
    paginations: state.paginations,
    option:      state.printOption,
    archivo:     state.archivoOption,
} );

const mapDispatchToProps = {
    initData:     NotaCompraActions.initData,
    onChangePage: NotaCompraActions.onChangePage,

    onChange:   NotaCompraActions.onChange,
    onSetState: NotaCompraActions.setState,

    onCreate:   NotaCompraActions.onCreate,
    onGrabar:   NotaCompraActions.onGrabar,
    onEditar:   NotaCompraActions.onEditar,
    onUpdate:   NotaCompraActions.onUpdate,
    onDelete:   NotaCompraActions.onDelete,
    onImprimir: NotaCompraActions.onImprimir,

    onSearch:     NotaCompraActions.onSearch,
    onSearchData: NotaCompraActions.onSearchData,

    onCancelar: NotaCompraActions.onCancelar,

    onDisabledEvent: disabledActions.onAction,

    setPrintOption:    printOptionActions.setData,
    resetPrintOption:  printOptionActions.reset,

    setArchivoOption: archivoOptionActions.setData,
};

export default connect( mapStateToProps, mapDispatchToProps )( IndexNotaCompra );
