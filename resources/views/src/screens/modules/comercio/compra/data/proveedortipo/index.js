
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { C_Confirm, C_Footer, C_Loading, C_Message, C_ModalDraggable } from '../../../../../../components';

import M_ListadoProveedorTipo from './modal/listado';
import C_Form from './components/form';

import { proveedorTipoActions } from '../../../../../../redux/actions/comercio/compra/proveedorTipoActions';

import { disabledActions } from '../../../../../../redux/actions/config/disabledActions';
import { printOptionActions } from '../../../../../../redux/actions/config/printOptionActions';
import { archivoOptionActions } from '../../../../../../redux/actions/config/archivoActions';

import ArchivoProveedorTipo from './components/archivo';
import OptionProveedorTipo from './components/option';

import ProveedorTipoReport from './report';
import ProveedorTipoPDF from './report/proveedorTipoPDF';

function IndexProveedorTipo( props ) {
    const { archivo, proveedorTipo, disabled, option, paginations } = props;
    
    const [ visible_pdf, setVisiblePDF ] = useState( false );
    const [ visible_action, setVisibleAction ] = useState( false );

    useEffect( () => {
        props.initData();
        // return () => { };
    }, [] );

    function existValue() {
        if ( proveedorTipo.idproveedortipo ) {
            return ( proveedorTipo.idproveedortipo.toString().trim().length > 0 );
        };
        return false;
    }

    function onGrabarData() {
        if( proveedorTipo.update )  props.onUpdate( proveedorTipo );
        else props.onGrabar( proveedorTipo )
    };

    function onConfirmarDelete() {
        if ( !existValue() ) {
            C_Message( "error", "TIPO PROVEEDOR no seleccionado" );
            return;
        };
        let ondelete = () => props.onDelete(proveedorTipo);
        C_Confirm( { title: "Eliminar TIPO PROVEEDOR", onOk: ondelete } );
    };

    function onPressEnterID() {
        if ( existValue() )  props.onSearchData( proveedorTipo );
        else setVisibleAction(true);
    };

    function componentProveedorTipo() {
        if ( !visible_action ) return null;
        return (
            <M_ListadoProveedorTipo
                visible={visible_action}
                onClose={ () => setVisibleAction(false) }
                value={proveedorTipo.idproveedortipo}
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
                    document.getElementById("proveedortipo_print").click();
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
            <OptionProveedorTipo 
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
                    document.getElementById('buttonproveedortipo_xls').click();
                }, 1000);
                return;
            }
            if ( archivo.checked.xlsx && result.response == 1 ) {
                setTimeout(() => {
                    document.getElementById('buttonproveedortipo_xlsx').click();
                }, 1000);
                return;
            }
            if ( archivo.checked.csv && result.response == 1 ) {
                setTimeout(() => {
                    document.getElementById('buttonproveedortipo_csv').click();
                }, 1000);
                return;
            }
        } );
    };

    function componentArchivo() {
        return (
            <ArchivoProveedorTipo 
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
                    title={ "REPORTE TIPO PROVEEDOR" }
                    bodyStyle={{ padding: '5px 4px', }}
                    style={{ top: 10, }}
                >
                    <ProveedorTipoPDF 
                        proveedorTipo={proveedorTipo.reporte}
                    />
                </C_ModalDraggable>
            </>
        );
    };

    return (
        <>
            <C_Loading visible={ props.loading } />

            { componentProveedorTipo() }
            { componentOption() }
            { componentArchivo() }
            { componentPDF() }

            <ProveedorTipoReport
                proveedorTipo={ proveedorTipo.reporte }
                archivo={ archivo }
                option={ option }
            />

            <div className="pt-2 pb-3" style={{ flexGrow: 1, width: "100%", }}>
                <C_Form 
                    proveedorTipo={ proveedorTipo }
                    onChange={props.onChange}
                    disabled={disabled}
                    onPressEnter={onPressEnterID}
                />
            </div>
            <C_Footer 
                disabled={disabled}

                onCreate={props.onCreate}
                onGrabar={onGrabarData}
                onUpdate={ () => props.onEditar( proveedorTipo ) }
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

IndexProveedorTipo.propTypes = {
    onClose:    PropTypes.func,
}

IndexProveedorTipo.defaultProps = {
    onClose: () => {},
}

const mapStateToProps = ( state ) => ( {
    proveedorTipo: state.proveedorTipo,

    disabled:    state.disabled,
    loading:     state.loading.visible,
    paginations: state.paginations,
    option:      state.printOption,
    archivo:     state.archivoOption,
} );

const mapDispatchToProps = {
    initData:     proveedorTipoActions.initData,
    onChangePage: proveedorTipoActions.onChangePage,

    onChange:   proveedorTipoActions.onChange,
    onSetState: proveedorTipoActions.setState,

    onCreate:   proveedorTipoActions.onCreate,
    onGrabar:   proveedorTipoActions.onGrabar,
    onEditar:   proveedorTipoActions.onEditar,
    onUpdate:   proveedorTipoActions.onUpdate,
    onDelete:   proveedorTipoActions.onDelete,
    onImprimir: proveedorTipoActions.onImprimir,

    onSearch:     proveedorTipoActions.onSearch,
    onSearchData: proveedorTipoActions.onSearchData,

    onCancelar: proveedorTipoActions.onCancelar,

    onDisabledEvent: disabledActions.onAction,

    setPrintOption:    printOptionActions.setData,
    resetPrintOption:  printOptionActions.reset,

    setArchivoOption: archivoOptionActions.setData,
};

export default connect( mapStateToProps, mapDispatchToProps )( IndexProveedorTipo );
