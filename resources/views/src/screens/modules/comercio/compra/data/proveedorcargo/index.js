
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { C_Confirm, C_Footer, C_Loading, C_Message, C_ModalDraggable } from '../../../../../../components';

import M_ListadoProveedorCargo from './modal/listado';

import C_Form from './components/form';
import C_Archivo from './components/archivo';
import C_Option from './components/option';

import { proveedorCargoActions } from '../../../../../../redux/actions/comercio/compra/proveedorCargoActions';

import { disabledActions } from '../../../../../../redux/actions/config/disabledActions';
import { printOptionActions } from '../../../../../../redux/actions/config/printOptionActions';
import { archivoOptionActions } from '../../../../../../redux/actions/config/archivoActions';


import ProveedorCargoReport from './report';
import ProveedorCargoPDF from './report/proveedorCargoPDF';

function IndexProveedorCargo( props ) {
    const { archivo, proveedorCargo, disabled, option, paginations } = props;
    
    const [ visible_pdf, setVisiblePDF ] = useState( false );
    const [ visible_action, setVisibleAction ] = useState( false );

    useEffect( () => {
        props.initData();
        // return () => { };
    }, [] );

    function existValue() {
        if ( proveedorCargo.idproveedorcargo ) {
            return ( proveedorCargo.idproveedorcargo.toString().trim().length > 0 );
        };
        return false;
    }

    function onGrabarData() {
        if( proveedorCargo.update )  props.onUpdate( proveedorCargo );
        else props.onGrabar( proveedorCargo )
    };

    function onConfirmarDelete() {
        if ( !existValue() ) {
            C_Message( "error", "CARGO PROVEEDOR no seleccionado" );
            return;
        };
        let ondelete = () => props.onDelete(proveedorCargo);
        C_Confirm( { title: "Eliminar CARGO PROVEEDOR", onOk: ondelete } );
    };

    function onPressEnterID() {
        if ( existValue() )  props.onSearchData( proveedorCargo );
        else setVisibleAction(true);
    };

    function componentProveedorCargo() {
        if ( !visible_action ) return null;
        return (
            <M_ListadoProveedorCargo
                visible={visible_action}
                onClose={ () => setVisibleAction(false) }
                value={proveedorCargo.idproveedorcargo}
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
                    document.getElementById("proveedorcargo_print").click();
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
                    document.getElementById('buttonproveedorcargo_xls').click();
                }, 1000);
                return;
            }
            if ( archivo.checked.xlsx && result.response == 1 ) {
                setTimeout(() => {
                    document.getElementById('buttonproveedorcargo_xlsx').click();
                }, 1000);
                return;
            }
            if ( archivo.checked.csv && result.response == 1 ) {
                setTimeout(() => {
                    document.getElementById('buttonproveedorcargo_csv').click();
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
                    title={ "REPORTE CARGO PROVEEDOR" }
                    bodyStyle={{ padding: '5px 4px', }}
                    style={{ top: 10, }}
                >
                    <ProveedorCargoPDF 
                        proveedorCargo={proveedorCargo.reporte}
                    />
                </C_ModalDraggable>
            </>
        );
    };

    return (
        <>
            <C_Loading visible={ props.loading } />

            { componentProveedorCargo() }
            { componentOption() }
            { componentArchivo() }
            { componentPDF() }

            <ProveedorCargoReport
                proveedorCargo={ proveedorCargo.reporte }
                archivo={ archivo }
                option={ option }
            />

            <div className="pt-2 pb-3" style={{ flexGrow: 1, width: "100%", }}>
                <C_Form 
                    proveedorCargo={ proveedorCargo }
                    onChange={props.onChange}
                    disabled={disabled}
                    onPressEnter={onPressEnterID}
                />
            </div>
            <C_Footer 
                disabled={disabled}

                onCreate={props.onCreate}
                onGrabar={onGrabarData}
                onUpdate={ () => props.onEditar( proveedorCargo ) }
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

IndexProveedorCargo.propTypes = {
    onClose:    PropTypes.func,
}

IndexProveedorCargo.defaultProps = {
    onClose: () => {},
}

const mapStateToProps = ( state ) => ( {
    proveedorCargo: state.proveedorCargo,

    disabled:    state.disabled,
    loading:     state.loading.visible,
    paginations: state.paginations,
    option:      state.printOption,
    archivo:     state.archivoOption,
} );

const mapDispatchToProps = {
    initData:     proveedorCargoActions.initData,
    onChangePage: proveedorCargoActions.onChangePage,

    onChange:   proveedorCargoActions.onChange,
    onSetState: proveedorCargoActions.setState,

    onCreate:   proveedorCargoActions.onCreate,
    onGrabar:   proveedorCargoActions.onGrabar,
    onEditar:   proveedorCargoActions.onEditar,
    onUpdate:   proveedorCargoActions.onUpdate,
    onDelete:   proveedorCargoActions.onDelete,
    onImprimir: proveedorCargoActions.onImprimir,

    onSearch:     proveedorCargoActions.onSearch,
    onSearchData: proveedorCargoActions.onSearchData,

    onCancelar: proveedorCargoActions.onCancelar,

    onDisabledEvent: disabledActions.onAction,

    setPrintOption:    printOptionActions.setData,
    resetPrintOption:  printOptionActions.reset,

    setArchivoOption: archivoOptionActions.setData,
};

export default connect( mapStateToProps, mapDispatchToProps )( IndexProveedorCargo );
