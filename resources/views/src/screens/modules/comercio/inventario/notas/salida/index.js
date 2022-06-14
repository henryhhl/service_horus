
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { C_Confirm, C_Footer, C_Loading, C_Message, C_ModalDraggable } from '../../../../../../components';

import M_ListadoNotaSalida from './modal/listado';
import C_Form from './components/form';

import { NotaSalidaActions } from '../../../../../../redux/actions/comercio/inventario/notaSalidaActions';

import { disabledActions } from '../../../../../../redux/actions/config/disabledActions';
import { printOptionActions } from '../../../../../../redux/actions/config/printOptionActions';
import { archivoOptionActions } from '../../../../../../redux/actions/config/archivoActions';

import ArchivoNotaSalida from './components/archivo';
import OptionNotaSalida from './components/option';

import NotaSalidaReport from './report';
import NotaSalidaPDF from './report/notaSalidaPDF';

function IndexNotaSalida( props ) {
    const { archivo, notaSalida, disabled, option, paginations } = props;
    
    const [ visible_pdf, setVisiblePDF ] = useState( false );
    const [ visible_action, setVisibleAction ] = useState( false );

    useEffect( () => {
        props.initData();
        // return () => { };
    }, [] );

    function existValue() {
        if ( notaSalida.idnotasalida ) {
            return ( notaSalida.idnotasalida.toString().trim().length > 0 );
        };
        return false;
    }

    function onGrabarData() {
        if( notaSalida.update ) { 
            let onUpdate = () => props.onUpdate( notaSalida );
            C_Confirm( { 
                title: "Editar Nota Salida", onOk: onUpdate, 
                okType: "primary", content: "Estás seguro de actualizar información?", 
            } );
        } else {
            let ongrabar = () => props.onGrabar( notaSalida );
            C_Confirm( { 
                title: "Registrar Nota Salida", onOk: ongrabar, 
                okType: "primary", content: "Estás seguro de registrar información?", 
            } );
        }
    };

    function onConfirmarDelete() {
        if ( !existValue() ) {
            C_Message( "error", "Nota Salida no seleccionado" );
            return;
        };
        let ondelete = () => props.onDelete(notaSalida);
        C_Confirm( { title: "Eliminar Nota Salida", onOk: ondelete } );
    };

    function onPressEnterID() {
        if ( existValue() )  props.onSearchData( notaSalida );
        else setVisibleAction(true);
    };

    function componentNotaSalida() {
        if ( !visible_action ) return null;
        return (
            <M_ListadoNotaSalida
                visible={visible_action}
                onClose={ () => setVisibleAction(false) }
                value={notaSalida.idnotasalida}
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
                    document.getElementById("notasalida_print").click();
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
            <OptionNotaSalida 
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
                    document.getElementById('buttonnotasalida_xls').click();
                }, 1000);
                return;
            }
            if ( archivo.checked.xlsx && result.response == 1 ) {
                setTimeout(() => {
                    document.getElementById('buttonnotasalida_xlsx').click();
                }, 1000);
                return;
            }
            if ( archivo.checked.csv && result.response == 1 ) {
                setTimeout(() => {
                    document.getElementById('buttonnotasalida_csv').click();
                }, 1000);
                return;
            }
        } );
    };

    function componentArchivo() {
        return (
            <ArchivoNotaSalida 
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
                    title={ "REPORTE NOTA SALIDA" }
                    bodyStyle={{ padding: '5px 4px', }}
                    style={{ top: 10, }}
                >
                    <NotaSalidaPDF 
                        notaSalida={notaSalida.reporte}
                    />
                </C_ModalDraggable>
            </>
        );
    };

    return (
        <>
            <C_Loading visible={ props.loading } />

            { componentNotaSalida() }
            { componentOption() }
            { componentArchivo() }
            { componentPDF() }

            <NotaSalidaReport
                notaSalida={ notaSalida.reporte }
                archivo={ archivo }
                option={ option }
            />

            <div className="pt-2 pb-3 pl-4 pr-4" style={{ flexGrow: 1, width: "100%", }}>
                <C_Form 
                    notaSalida={ notaSalida }
                    onChange={props.onChange}
                    disabled={disabled}
                    onPressEnter={onPressEnterID}
                />
            </div>
            <C_Footer 
                disabled={disabled}

                onCreate={props.onCreate}
                onGrabar={onGrabarData}
                onUpdate={ () => props.onEditar( notaSalida ) }
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

IndexNotaSalida.propTypes = {
    onClose:    PropTypes.func,
}

IndexNotaSalida.defaultProps = {
    onClose: () => {},
}

const mapStateToProps = ( state ) => ( {
    notaSalida: state.notaSalida,

    visible:     state.visible,
    disabled:    state.disabled,
    loading:     state.loading.visible,
    paginations: state.paginations,
    option:      state.printOption,
    archivo:     state.archivoOption,
} );

const mapDispatchToProps = {
    initData:     NotaSalidaActions.initData,
    onChangePage: NotaSalidaActions.onChangePage,

    onChange:   NotaSalidaActions.onChange,
    onSetState: NotaSalidaActions.setState,

    onCreate:   NotaSalidaActions.onCreate,
    onGrabar:   NotaSalidaActions.onGrabar,
    onEditar:   NotaSalidaActions.onEditar,
    onUpdate:   NotaSalidaActions.onUpdate,
    onDelete:   NotaSalidaActions.onDelete,
    onImprimir: NotaSalidaActions.onImprimir,

    onSearch:     NotaSalidaActions.onSearch,
    onSearchData: NotaSalidaActions.onSearchData,

    onCancelar: NotaSalidaActions.onCancelar,

    onDisabledEvent: disabledActions.onAction,

    setPrintOption:    printOptionActions.setData,
    resetPrintOption:  printOptionActions.reset,

    setArchivoOption: archivoOptionActions.setData,
};

export default connect( mapStateToProps, mapDispatchToProps )( IndexNotaSalida );
