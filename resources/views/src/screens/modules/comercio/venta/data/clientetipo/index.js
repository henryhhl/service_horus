
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { C_Confirm, C_Footer, C_Loading, C_Message, C_ModalDraggable } from '../../../../../../components';

import M_ListadoClienteTipo from './modal/listado';

import C_Form from './components/form';
import C_Archivo from './components/archivo';
import C_Option from './components/option';

import { clienteTipoActions } from '../../../../../../redux/actions/comercio/venta/clienteTipoActions';

import { disabledActions } from '../../../../../../redux/actions/config/disabledActions';
import { printOptionActions } from '../../../../../../redux/actions/config/printOptionActions';
import { archivoOptionActions } from '../../../../../../redux/actions/config/archivoActions';


import ClienteTipoReport from './report';
import ClienteTipoPDF from './report/clienteTipoPDF';

function IndexClienteTipo( props ) {
    const { archivo, clienteTipo, disabled, option, paginations } = props;
    
    const [ visible_pdf, setVisiblePDF ] = useState( false );
    const [ visible_action, setVisibleAction ] = useState( false );

    useEffect( () => {
        props.initData();
        // return () => { };
    }, [] );

    function existValue() {
        if ( clienteTipo.idclientetipo ) {
            return ( clienteTipo.idclientetipo.toString().trim().length > 0 );
        };
        return false;
    }

    function onGrabarData() {
        if( clienteTipo.update )  props.onUpdate( clienteTipo );
        else props.onGrabar( clienteTipo )
    };

    function onConfirmarDelete() {
        if ( !existValue() ) {
            C_Message( "error", "TIPO CLIENTE no seleccionado" );
            return;
        };
        let ondelete = () => props.onDelete(clienteTipo);
        C_Confirm( { title: "Eliminar TIPO CLIENTE", onOk: ondelete } );
    };

    function onPressEnterID() {
        if ( existValue() )  props.onSearchData( clienteTipo );
        else setVisibleAction(true);
    };

    function componentClienteTipo() {
        if ( !visible_action ) return null;
        return (
            <M_ListadoClienteTipo
                visible={visible_action}
                onClose={ () => setVisibleAction(false) }
                value={clienteTipo.idclientetipo}
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
                    document.getElementById("clientetipo_print").click();
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
                    document.getElementById('buttonclientetipo_xls').click();
                }, 1000);
                return;
            }
            if ( archivo.checked.xlsx && result.response == 1 ) {
                setTimeout(() => {
                    document.getElementById('buttonclientetipo_xlsx').click();
                }, 1000);
                return;
            }
            if ( archivo.checked.csv && result.response == 1 ) {
                setTimeout(() => {
                    document.getElementById('buttonclientetipo_csv').click();
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
                    title={ "REPORTE TIPO CLIENTE" }
                    bodyStyle={{ padding: '5px 4px', }}
                    style={{ top: 10, }}
                >
                    <ClienteTipoPDF 
                        clienteTipo={clienteTipo.reporte}
                    />
                </C_ModalDraggable>
            </>
        );
    };

    return (
        <>
            <C_Loading visible={ props.loading } />

            { componentClienteTipo() }
            { componentOption() }
            { componentArchivo() }
            { componentPDF() }

            <ClienteTipoReport
                clienteTipo={ clienteTipo.reporte }
                archivo={ archivo }
                option={ option }
            />

            <div className="pt-2 pb-3" style={{ flexGrow: 1, width: "100%", }}>
                <C_Form 
                    clienteTipo={ clienteTipo }
                    onChange={props.onChange}
                    disabled={disabled}
                    onPressEnter={onPressEnterID}
                />
            </div>
            <C_Footer 
                disabled={disabled}

                onCreate={props.onCreate}
                onGrabar={onGrabarData}
                onUpdate={ () => props.onEditar( clienteTipo ) }
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

IndexClienteTipo.propTypes = {
    onClose:    PropTypes.func,
}

IndexClienteTipo.defaultProps = {
    onClose: () => {},
}

const mapStateToProps = ( state ) => ( {
    clienteTipo: state.clienteTipo,

    disabled:    state.disabled,
    loading:     state.loading.visible,
    paginations: state.paginations,
    option:      state.printOption,
    archivo:     state.archivoOption,
} );

const mapDispatchToProps = {
    initData:     clienteTipoActions.initData,
    onChangePage: clienteTipoActions.onChangePage,

    onChange:   clienteTipoActions.onChange,
    onSetState: clienteTipoActions.setState,

    onCreate:   clienteTipoActions.onCreate,
    onGrabar:   clienteTipoActions.onGrabar,
    onEditar:   clienteTipoActions.onEditar,
    onUpdate:   clienteTipoActions.onUpdate,
    onDelete:   clienteTipoActions.onDelete,
    onImprimir: clienteTipoActions.onImprimir,

    onSearch:     clienteTipoActions.onSearch,
    onSearchData: clienteTipoActions.onSearchData,

    onCancelar: clienteTipoActions.onCancelar,

    onDisabledEvent: disabledActions.onAction,

    setPrintOption:    printOptionActions.setData,
    resetPrintOption:  printOptionActions.reset,

    setArchivoOption: archivoOptionActions.setData,
};

export default connect( mapStateToProps, mapDispatchToProps )( IndexClienteTipo );
