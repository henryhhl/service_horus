
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { C_Confirm, C_Footer, C_Loading, C_Message, C_ModalDraggable } from '../../../../../../components';

import M_ListadoComisionVenta from './modal/listado';

import C_Form from './components/form';
import C_Archivo from './components/archivo';
import C_Option from './components/option';

import { comisionVentaActions } from '../../../../../../redux/actions/comercio/venta/comisionVentaActions';

import { disabledActions } from '../../../../../../redux/actions/config/disabledActions';
import { printOptionActions } from '../../../../../../redux/actions/config/printOptionActions';
import { archivoOptionActions } from '../../../../../../redux/actions/config/archivoActions';


import ComisionVentaReport from './report';
import ComisionVentaPDF from './report/comisionVentaPDF';

function IndexComisionVenta( props ) {
    const { archivo, comisionVenta, disabled, option, paginations } = props;

    const [ visible_pdf, setVisiblePDF ] = useState( false );
    const [ visible_action, setVisibleAction ] = useState( false );

    useEffect( () => {
        props.initData();
        // return () => { };
    }, [] );

    function existValue() {
        if ( comisionVenta.idcomisionventa ) {
            return ( comisionVenta.idcomisionventa.toString().trim().length > 0 );
        };
        return false;
    }

    function onGrabarData() {
        if( comisionVenta.update ) {
            let onUpdate = () => props.onUpdate( comisionVenta );
            C_Confirm( {
                title: "Editar Comisión Venta", onOk: onUpdate,
                okType: "primary", content: "Estás seguro de actualizar información?",
            } );
        } else {
            let ongrabar = () => props.onGrabar( comisionVenta );
            C_Confirm( {
                title: "Registrar Comisión Venta", onOk: ongrabar,
                okType: "primary", content: "Estás seguro de registrar información?",
            } );
        }
    };

    function onConfirmarDelete() {
        if ( !existValue() ) {
            C_Message( "error", "Comisión Venta no seleccionado" );
            return;
        };
        let ondelete = () => props.onDelete(comisionVenta);
        C_Confirm( { title: "Eliminar Comisión Venta", onOk: ondelete } );
    };

    function onPressEnterID() {
        if ( existValue() )  props.onSearchData( comisionVenta );
        else setVisibleAction(true);
    };

    function componentComisionVenta() {
        if ( !visible_action ) return null;
        return (
            <M_ListadoComisionVenta
                visible={visible_action}
                onClose={ () => setVisibleAction(false) }
                value={comisionVenta.idcomisionventa}
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
                    document.getElementById("comisionventa_print").click();
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
                    document.getElementById('buttoncomisionventa_xls').click();
                }, 1000);
                return;
            }
            if ( archivo.checked.xlsx && result.response == 1 ) {
                setTimeout(() => {
                    document.getElementById('buttoncomisionventa_xlsx').click();
                }, 1000);
                return;
            }
            if ( archivo.checked.csv && result.response == 1 ) {
                setTimeout(() => {
                    document.getElementById('buttoncomisionventa_csv').click();
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
                    title={ "REPORTE Comisión Venta" }
                    bodyStyle={{ padding: '5px 4px', }}
                    style={{ top: 10, }}
                >
                    <ComisionVentaPDF
                        comisionVenta={comisionVenta.reporte}
                    />
                </C_ModalDraggable>
            </>
        );
    };

    return (
        <>
            <C_Loading visible={ props.loading } />

            { componentComisionVenta() }
            { componentOption() }
            { componentArchivo() }
            { componentPDF() }

            <ComisionVentaReport
                comisionVenta={ comisionVenta.reporte }
                archivo={ archivo }
                option={ option }
            />

            <div className="pt-2 pb-3" style={{ flexGrow: 1, width: "100%", }}>
                <C_Form
                    comisionVenta={ comisionVenta }
                    onChange={props.onChange}
                    disabled={disabled}
                    onPressEnter={onPressEnterID}
                />
            </div>
            <C_Footer
                disabled={disabled}

                onCreate={props.onCreate}
                onGrabar={onGrabarData}
                onUpdate={ () => props.onEditar( comisionVenta ) }
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

IndexComisionVenta.propTypes = {
    onClose:    PropTypes.func,
}

IndexComisionVenta.defaultProps = {
    onClose: () => {},
}

const mapStateToProps = ( state ) => ( {
    comisionVenta: state.comisionVenta,

    disabled:    state.disabled,
    loading:     state.loading.visible,
    paginations: state.paginations,
    option:      state.printOption,
    archivo:     state.archivoOption,
} );

const mapDispatchToProps = {
    initData:     comisionVentaActions.initData,
    onChangePage: comisionVentaActions.onChangePage,

    onChange:   comisionVentaActions.onChange,
    onSetState: comisionVentaActions.setState,

    onCreate:   comisionVentaActions.onCreate,
    onGrabar:   comisionVentaActions.onGrabar,
    onEditar:   comisionVentaActions.onEditar,
    onUpdate:   comisionVentaActions.onUpdate,
    onDelete:   comisionVentaActions.onDelete,
    onImprimir: comisionVentaActions.onImprimir,

    onSearch:     comisionVentaActions.onSearch,
    onSearchData: comisionVentaActions.onSearchData,

    onCancelar: comisionVentaActions.onCancelar,

    onDisabledEvent: disabledActions.onAction,

    setPrintOption:    printOptionActions.setData,
    resetPrintOption:  printOptionActions.reset,

    setArchivoOption: archivoOptionActions.setData,
};

export default connect( mapStateToProps, mapDispatchToProps )( IndexComisionVenta );
