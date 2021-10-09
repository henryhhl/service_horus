
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { C_Confirm, C_Footer, C_Loading, C_Message, C_ModalDraggable } from '../../../../../../components';

import M_ListadoSeccionInventario from './modal/listado';

import C_Form from './components/form';
import C_Archivo from './components/archivo';
import C_Option from './components/option';

import { seccionInventarioActions } from '../../../../../../redux/actions/comercio/inventario/seccionInventarioActions';

import { disabledActions } from '../../../../../../redux/actions/config/disabledActions';
import { printOptionActions } from '../../../../../../redux/actions/config/printOptionActions';
import { archivoOptionActions } from '../../../../../../redux/actions/config/archivoActions';


import SeccionInventarioReport from './report';
import SeccionInventarioPDF from './report/seccionInventarioPDF';

function IndexSeccionInventario( props ) {
    const { archivo, seccionInventario, disabled, option, paginations } = props;
    
    const [ visible_pdf, setVisiblePDF ] = useState( false );
    const [ visible_action, setVisibleAction ] = useState( false );

    useEffect( () => {
        props.initData();
        // return () => { };
    }, [] );

    function existValue() {
        if ( seccionInventario.idseccioninventario ) {
            return ( seccionInventario.idseccioninventario.toString().trim().length > 0 );
        };
        return false;
    }

    function onGrabarData() {
        if( seccionInventario.update )  props.onUpdate( seccionInventario );
        else props.onGrabar( seccionInventario )
    };

    function onConfirmarDelete() {
        if ( !existValue() ) {
            C_Message( "error", "SECCIÓN INVENTARIO no seleccionado" );
            return;
        };
        let ondelete = () => props.onDelete(seccionInventario);
        C_Confirm( { title: "Eliminar SECCIÓN INVENTARIO", onOk: ondelete } );
    };

    function onPressEnterID() {
        if ( existValue() )  props.onSearchData( seccionInventario );
        else setVisibleAction(true);
    };

    function componentSeccionInventario() {
        if ( !visible_action ) return null;
        return (
            <M_ListadoSeccionInventario
                visible={visible_action}
                onClose={ () => setVisibleAction(false) }
                value={seccionInventario.idseccioninventario}
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
                    document.getElementById("seccioninventario_print").click();
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
                    document.getElementById('buttonseccioninventario_xls').click();
                }, 1000);
                return;
            }
            if ( archivo.checked.xlsx && result.response == 1 ) {
                setTimeout(() => {
                    document.getElementById('buttonseccioninventario_xlsx').click();
                }, 1000);
                return;
            }
            if ( archivo.checked.csv && result.response == 1 ) {
                setTimeout(() => {
                    document.getElementById('buttonseccioninventario_csv').click();
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
                    title={ "REPORTE SECCIÓN INVENTARIO" }
                    bodyStyle={{ padding: '5px 4px', }}
                    style={{ top: 10, }}
                >
                    <SeccionInventarioPDF 
                        seccionInventario={seccionInventario.reporte}
                    />
                </C_ModalDraggable>
            </>
        );
    };

    return (
        <>
            <C_Loading visible={ props.loading } />

            { componentSeccionInventario() }
            { componentOption() }
            { componentArchivo() }
            { componentPDF() }

            <SeccionInventarioReport
                seccionInventario={ seccionInventario.reporte }
                archivo={ archivo }
                option={ option }
            />

            <div className="pt-2 pb-3" style={{ flexGrow: 1, width: "100%", }}>
                <C_Form 
                    seccionInventario={ seccionInventario }
                    onChange={props.onChange}
                    disabled={disabled}
                    onPressEnter={onPressEnterID}
                />
            </div>
            <C_Footer 
                disabled={disabled}

                onCreate={props.onCreate}
                onGrabar={onGrabarData}
                onUpdate={ () => props.onEditar( seccionInventario ) }
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

IndexSeccionInventario.propTypes = {
    onClose:    PropTypes.func,
}

IndexSeccionInventario.defaultProps = {
    onClose: () => {},
}

const mapStateToProps = ( state ) => ( {
    seccionInventario: state.seccionInventario,

    disabled:    state.disabled,
    loading:     state.loading.visible,
    paginations: state.paginations,
    option:      state.printOption,
    archivo:     state.archivoOption,
} );

const mapDispatchToProps = {
    initData:     seccionInventarioActions.initData,
    onChangePage: seccionInventarioActions.onChangePage,

    onChange:   seccionInventarioActions.onChange,
    onSetState: seccionInventarioActions.setState,

    onCreate:   seccionInventarioActions.onCreate,
    onGrabar:   seccionInventarioActions.onGrabar,
    onEditar:   seccionInventarioActions.onEditar,
    onUpdate:   seccionInventarioActions.onUpdate,
    onDelete:   seccionInventarioActions.onDelete,
    onImprimir: seccionInventarioActions.onImprimir,

    onSearch:     seccionInventarioActions.onSearch,
    onSearchData: seccionInventarioActions.onSearchData,

    onCancelar: seccionInventarioActions.onCancelar,

    onDisabledEvent: disabledActions.onAction,

    setPrintOption:    printOptionActions.setData,
    resetPrintOption:  printOptionActions.reset,

    setArchivoOption: archivoOptionActions.setData,
};

export default connect( mapStateToProps, mapDispatchToProps )( IndexSeccionInventario );
