
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { C_Confirm, C_Footer, C_Loading, C_Message, C_ModalDraggable } from '../../../../../../components';

import M_ListadoSolicitudCompra from './modal/listado';
import C_Form from './components/form';

import { SolicitudCompraActions } from '../../../../../../redux/actions/comercio/compra/solicitudCompraActions';

import { disabledActions } from '../../../../../../redux/actions/config/disabledActions';
import { printOptionActions } from '../../../../../../redux/actions/config/printOptionActions';
import { archivoOptionActions } from '../../../../../../redux/actions/config/archivoActions';

import ArchivoSolicitudCompra from './components/archivo';
import OptionSolicitudCompra from './components/option';

import SolicitudCompraReport from './report';
import SolicitudCompraPDF from './report/solicitudCompraPDF';

function IndexSolicitudCompra( props ) {
    const { archivo, solicitudCompra, disabled, option, paginations } = props;
    
    const [ visible_pdf, setVisiblePDF ] = useState( false );
    const [ visible_action, setVisibleAction ] = useState( false );

    useEffect( () => {
        props.initData();
        // return () => { };
    }, [] );

    function existValue() {
        if ( solicitudCompra.idsolicitudcompra ) {
            return ( solicitudCompra.idsolicitudcompra.toString().trim().length > 0 );
        };
        return false;
    }

    function onGrabarData() {
        if( solicitudCompra.update ) {
            props.onUpdate( solicitudCompra );
        } else {
            let ongrabar = () => props.onGrabar( solicitudCompra );
            C_Confirm( { 
                title: "Registrar Solicitud Compra", onOk: ongrabar, 
                okType: "primary", content: "Estás seguro de registrar información?", 
            } );
        }
    };

    function onConfirmarDelete() {
        if ( !existValue() ) {
            C_Message( "error", "SOLICITUD COMPRA no seleccionado" );
            return;
        };
        let ondelete = () => props.onDelete(solicitudCompra);
        C_Confirm( { title: "Eliminar SOLICITUD COMPRA", onOk: ondelete } );
    };

    function onPressEnterID() {
        if ( existValue() )  props.onSearchData( solicitudCompra );
        else setVisibleAction(true);
    };

    function componentSolicitudCompra() {
        if ( !visible_action ) return null;
        return (
            <M_ListadoSolicitudCompra
                visible={visible_action}
                onClose={ () => setVisibleAction(false) }
                value={solicitudCompra.idsolicitudcompra}
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
                    document.getElementById("solicitudcompra_print").click();
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
            <OptionSolicitudCompra 
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
                    document.getElementById('buttonsolicitudcompra_xls').click();
                }, 1000);
                return;
            }
            if ( archivo.checked.xlsx && result.response == 1 ) {
                setTimeout(() => {
                    document.getElementById('buttonsolicitudcompra_xlsx').click();
                }, 1000);
                return;
            }
            if ( archivo.checked.csv && result.response == 1 ) {
                setTimeout(() => {
                    document.getElementById('buttonsolicitudcompra_csv').click();
                }, 1000);
                return;
            }
        } );
    };

    function componentArchivo() {
        return (
            <ArchivoSolicitudCompra 
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
                    title={ "REPORTE SOLICITUD COMPRA" }
                    bodyStyle={{ padding: '5px 4px', }}
                    style={{ top: 10, }}
                >
                    <SolicitudCompraPDF 
                        solicitudCompra={solicitudCompra.reporte}
                    />
                </C_ModalDraggable>
            </>
        );
    };

    return (
        <>
            <C_Loading visible={ props.loading } />

            { componentSolicitudCompra() }
            { componentOption() }
            { componentArchivo() }
            { componentPDF() }

            <SolicitudCompraReport
                solicitudCompra={ solicitudCompra.reporte }
                archivo={ archivo }
                option={ option }
            />

            <div className="pt-2 pb-3 pl-4 pr-4" style={{ flexGrow: 1, width: "100%", }}>
                <C_Form 
                    solicitudCompra={ solicitudCompra }
                    onChange={props.onChange}
                    disabled={disabled}
                    onPressEnter={onPressEnterID}
                />
            </div>
            <C_Footer 
                disabled={disabled}

                onCreate={props.onCreate}
                onGrabar={onGrabarData}
                // onUpdate={ () => props.onEditar( solicitudCompra ) }
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

IndexSolicitudCompra.propTypes = {
    onClose:    PropTypes.func,
}

IndexSolicitudCompra.defaultProps = {
    onClose: () => {},
}

const mapStateToProps = ( state ) => ( {
    solicitudCompra: state.solicitudCompra,

    disabled:    state.disabled,
    loading:     state.loading.visible,
    paginations: state.paginations,
    option:      state.printOption,
    archivo:     state.archivoOption,
} );

const mapDispatchToProps = {
    initData:     SolicitudCompraActions.initData,
    onChangePage: SolicitudCompraActions.onChangePage,

    onChange:   SolicitudCompraActions.onChange,
    onSetState: SolicitudCompraActions.setState,

    onCreate:   SolicitudCompraActions.onCreate,
    onGrabar:   SolicitudCompraActions.onGrabar,
    onEditar:   SolicitudCompraActions.onEditar,
    onUpdate:   SolicitudCompraActions.onUpdate,
    onDelete:   SolicitudCompraActions.onDelete,
    onImprimir: SolicitudCompraActions.onImprimir,

    onSearch:     SolicitudCompraActions.onSearch,
    onSearchData: SolicitudCompraActions.onSearchData,

    onCancelar: SolicitudCompraActions.onCancelar,

    onDisabledEvent: disabledActions.onAction,

    setPrintOption:    printOptionActions.setData,
    resetPrintOption:  printOptionActions.reset,

    setArchivoOption: archivoOptionActions.setData,
};

export default connect( mapStateToProps, mapDispatchToProps )( IndexSolicitudCompra );
