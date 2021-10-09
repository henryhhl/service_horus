
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { C_Confirm, C_Footer, C_Loading, C_Message, C_ModalDraggable } from '../../../../../../components';

import M_ListadoOrdenCompra from './modal/listado';
import C_Form from './components/form';

import { OrdenCompraActions } from '../../../../../../redux/actions/comercio/compra/ordenCompraActions';

import { disabledActions } from '../../../../../../redux/actions/config/disabledActions';
import { printOptionActions } from '../../../../../../redux/actions/config/printOptionActions';
import { archivoOptionActions } from '../../../../../../redux/actions/config/archivoActions';

import ArchivoOrdenCompra from './components/archivo';
import OptionOrdenCompra from './components/option';

import OrdenCompraReport from './report';
import OrdenCompraPDF from './report/ordenCompraPDF';

function IndexOrdenCompra( props ) {
    const { archivo, ordenCompra, disabled, option, paginations } = props;
    
    const [ visible_pdf, setVisiblePDF ] = useState( false );
    const [ visible_action, setVisibleAction ] = useState( false );

    useEffect( () => {
        props.initData();
        // return () => { };
    }, [] );

    function existValue() {
        if ( ordenCompra.idordencompra ) {
            return ( ordenCompra.idordencompra.toString().trim().length > 0 );
        };
        return false;
    }

    function onGrabarData() {
        if( ordenCompra.update ) {
            props.onUpdate( ordenCompra );
        } else {
            let ongrabar = () => props.onGrabar( ordenCompra );
            C_Confirm( { 
                title: "Registrar Orden Compra", onOk: ongrabar, 
                okType: "primary", content: "Estás seguro de registrar información?", 
            } );
        }
    };

    function onConfirmarDelete() {
        if ( !existValue() ) {
            C_Message( "error", "ORDEN COMPRA no seleccionado" );
            return;
        };
        let ondelete = () => props.onDelete(ordenCompra);
        C_Confirm( { title: "Eliminar ORDEN COMPRA", onOk: ondelete } );
    };

    function onPressEnterID() {
        if ( existValue() )  props.onSearchData( ordenCompra );
        else setVisibleAction(true);
    };

    function componentOrdenCompra() {
        if ( !visible_action ) return null;
        return (
            <M_ListadoOrdenCompra
                visible={visible_action}
                onClose={ () => setVisibleAction(false) }
                value={ordenCompra.idordencompra}
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
                    document.getElementById("ordencompra_print").click();
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
            <OptionOrdenCompra 
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
                    document.getElementById('buttonordencompra_xls').click();
                }, 1000);
                return;
            }
            if ( archivo.checked.xlsx && result.response == 1 ) {
                setTimeout(() => {
                    document.getElementById('buttonordencompra_xlsx').click();
                }, 1000);
                return;
            }
            if ( archivo.checked.csv && result.response == 1 ) {
                setTimeout(() => {
                    document.getElementById('buttonordencompra_csv').click();
                }, 1000);
                return;
            }
        } );
    };

    function componentArchivo() {
        return (
            <ArchivoOrdenCompra 
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
                    title={ "REPORTE ORDEN COMPRA" }
                    bodyStyle={{ padding: '5px 4px', }}
                    style={{ top: 10, }}
                >
                    <OrdenCompraPDF 
                        ordenCompra={ordenCompra.reporte}
                    />
                </C_ModalDraggable>
            </>
        );
    };

    return (
        <>
            <C_Loading visible={ props.loading } />

            { componentOrdenCompra() }
            { componentOption() }
            { componentArchivo() }
            { componentPDF() }

            <OrdenCompraReport
                ordenCompra={ ordenCompra.reporte }
                archivo={ archivo }
                option={ option }
            />

            <div className="pt-2 pb-3 pl-4 pr-4" style={{ flexGrow: 1, width: "100%", }}>
                <C_Form 
                    ordenCompra={ ordenCompra }
                    onChange={props.onChange}
                    disabled={disabled}
                    onPressEnter={onPressEnterID}
                />
            </div>
            <C_Footer 
                disabled={disabled}

                onCreate={props.onCreate}
                onGrabar={onGrabarData}
                // onUpdate={ () => props.onEditar( ordenCompra ) }
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

IndexOrdenCompra.propTypes = {
    onClose:    PropTypes.func,
}

IndexOrdenCompra.defaultProps = {
    onClose: () => {},
}

const mapStateToProps = ( state ) => ( {
    ordenCompra: state.ordenCompra,

    disabled:    state.disabled,
    loading:     state.loading.visible,
    paginations: state.paginations,
    option:      state.printOption,
    archivo:     state.archivoOption,
} );

const mapDispatchToProps = {
    initData:     OrdenCompraActions.initData,
    onChangePage: OrdenCompraActions.onChangePage,

    onChange:   OrdenCompraActions.onChange,
    onSetState: OrdenCompraActions.setState,

    onCreate:   OrdenCompraActions.onCreate,
    onGrabar:   OrdenCompraActions.onGrabar,
    onEditar:   OrdenCompraActions.onEditar,
    onUpdate:   OrdenCompraActions.onUpdate,
    onDelete:   OrdenCompraActions.onDelete,
    onImprimir: OrdenCompraActions.onImprimir,

    onSearch:     OrdenCompraActions.onSearch,
    onSearchData: OrdenCompraActions.onSearchData,

    onCancelar: OrdenCompraActions.onCancelar,

    onDisabledEvent: disabledActions.onAction,

    setPrintOption:    printOptionActions.setData,
    resetPrintOption:  printOptionActions.reset,

    setArchivoOption: archivoOptionActions.setData,
};

export default connect( mapStateToProps, mapDispatchToProps )( IndexOrdenCompra );
