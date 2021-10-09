
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { C_Confirm, C_Footer, C_Loading, C_Message, C_ModalDraggable } from '../../../../../../components';

import M_ListadoDevolucionCompra from './modal/listado';
import C_Form from './components/form';

import { DevolucionCompraActions } from '../../../../../../redux/actions/comercio/compra/devolucionCompraActions';

import { disabledActions } from '../../../../../../redux/actions/config/disabledActions';
import { printOptionActions } from '../../../../../../redux/actions/config/printOptionActions';
import { archivoOptionActions } from '../../../../../../redux/actions/config/archivoActions';

import ArchivoDevolucionCompra from './components/archivo';
import OptionDevolucionCompra from './components/option';

import DevolucionCompraReport from './report';
import DevolucionCompraPDF from './report/devolucionCompraPDF';

function IndexDevolucionCompra( props ) {
    const { archivo, devolucionCompra, disabled, option, paginations } = props;
    
    const [ visible_pdf, setVisiblePDF ] = useState( false );
    const [ visible_action, setVisibleAction ] = useState( false );

    useEffect( () => {
        props.initData();
        // return () => { };
    }, [] );

    function existValue() {
        if ( devolucionCompra.iddevolucioncompra ) {
            return ( devolucionCompra.iddevolucioncompra.toString().trim().length > 0 );
        };
        return false;
    }

    function onGrabarData() {
        if( devolucionCompra.update ) {
            props.onUpdate( devolucionCompra );
        } else {
            let ongrabar = () => props.onGrabar( devolucionCompra );
            C_Confirm( { 
                title: "Registrar Devolución Compra", onOk: ongrabar, 
                okType: "primary", content: "Estás seguro de registrar información?", 
            } );
        }
    };

    function onConfirmarDelete() {
        if ( !existValue() ) {
            C_Message( "error", "DEVOLUCIÓN COMPRA no seleccionado" );
            return;
        };
        let ondelete = () => props.onDelete(devolucionCompra);
        C_Confirm( { title: "Eliminar DEVOLUCIÓN COMPRA", onOk: ondelete } );
    };

    function onPressEnterID() {
        if ( existValue() )  props.onSearchData( devolucionCompra );
        else setVisibleAction(true);
    };

    function componentDevolucionCompra() {
        if ( !visible_action ) return null;
        return (
            <M_ListadoDevolucionCompra
                visible={visible_action}
                onClose={ () => setVisibleAction(false) }
                value={devolucionCompra.iddevolucioncompra}
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
                    document.getElementById("devolucioncompra_print").click();
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
            <OptionDevolucionCompra 
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
                    document.getElementById('buttondevolucioncompra_xls').click();
                }, 1000);
                return;
            }
            if ( archivo.checked.xlsx && result.response == 1 ) {
                setTimeout(() => {
                    document.getElementById('buttondevolucioncompra_xlsx').click();
                }, 1000);
                return;
            }
            if ( archivo.checked.csv && result.response == 1 ) {
                setTimeout(() => {
                    document.getElementById('buttondevolucioncompra_csv').click();
                }, 1000);
                return;
            }
        } );
    };

    function componentArchivo() {
        return (
            <ArchivoDevolucionCompra 
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
                    title={ "REPORTE DEVOLUCIÓN COMPRA" }
                    bodyStyle={{ padding: '5px 4px', }}
                    style={{ top: 10, }}
                >
                    <DevolucionCompraPDF 
                        devolucionCompra={devolucionCompra.reporte}
                    />
                </C_ModalDraggable>
            </>
        );
    };

    return (
        <>
            <C_Loading visible={ props.loading } />

            { componentDevolucionCompra() }
            { componentOption() }
            { componentArchivo() }
            { componentPDF() }

            <DevolucionCompraReport
                devolucionCompra={ devolucionCompra.reporte }
                archivo={ archivo }
                option={ option }
            />

            <div className="pt-2 pb-3 pl-4 pr-4" style={{ flexGrow: 1, width: "100%", }}>
                <C_Form 
                    devolucionCompra={ devolucionCompra }
                    onChange={props.onChange}
                    disabled={disabled}
                    onPressEnter={onPressEnterID}
                />
            </div>
            <C_Footer 
                disabled={disabled}

                onCreate={props.onCreate}
                onGrabar={onGrabarData}
                // onUpdate={ () => props.onEditar( devolucionCompra ) }
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

IndexDevolucionCompra.propTypes = {
    onClose:    PropTypes.func,
}

IndexDevolucionCompra.defaultProps = {
    onClose: () => {},
}

const mapStateToProps = ( state ) => ( {
    devolucionCompra: state.devolucionCompra,

    disabled:    state.disabled,
    loading:     state.loading.visible,
    paginations: state.paginations,
    option:      state.printOption,
    archivo:     state.archivoOption,
} );

const mapDispatchToProps = {
    initData:     DevolucionCompraActions.initData,
    onChangePage: DevolucionCompraActions.onChangePage,

    onChange:   DevolucionCompraActions.onChange,
    onSetState: DevolucionCompraActions.setState,

    onCreate:   DevolucionCompraActions.onCreate,
    onGrabar:   DevolucionCompraActions.onGrabar,
    onEditar:   DevolucionCompraActions.onEditar,
    onUpdate:   DevolucionCompraActions.onUpdate,
    onDelete:   DevolucionCompraActions.onDelete,
    onImprimir: DevolucionCompraActions.onImprimir,

    onSearch:     DevolucionCompraActions.onSearch,
    onSearchData: DevolucionCompraActions.onSearchData,

    onCancelar: DevolucionCompraActions.onCancelar,

    onDisabledEvent: disabledActions.onAction,

    setPrintOption:    printOptionActions.setData,
    resetPrintOption:  printOptionActions.reset,

    setArchivoOption: archivoOptionActions.setData,
};

export default connect( mapStateToProps, mapDispatchToProps )( IndexDevolucionCompra );
