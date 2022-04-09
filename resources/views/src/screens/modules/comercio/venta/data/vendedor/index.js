
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { C_Confirm, C_Footer, C_Loading, C_Message, C_ModalDraggable } from '../../../../../../components';

import M_ListadoVendedor from './modal/listado';

import C_Form from './components/form';
import C_Archivo from './components/archivo';
import C_Option from './components/option';

import { vendedorActions } from '../../../../../../redux/actions/comercio/venta/vendedorActions';

import { disabledActions } from '../../../../../../redux/actions/config/disabledActions';
import { printOptionActions } from '../../../../../../redux/actions/config/printOptionActions';
import { archivoOptionActions } from '../../../../../../redux/actions/config/archivoActions';


import VendedorReport from './report';
import VendedorPDF from './report/vendedorPDF';

function IndexVendedor( props ) {
    const { archivo, vendedor, disabled, option, paginations } = props;

    const [ visible_pdf, setVisiblePDF ] = useState( false );
    const [ visible_action, setVisibleAction ] = useState( false );

    useEffect( () => {
        props.initData();
        // return () => { };
    }, [] );

    function existValue() {
        if ( vendedor.idvendedor ) {
            return ( vendedor.idvendedor.toString().trim().length > 0 );
        };
        return false;
    }

    function onGrabarData() {
        if( vendedor.update ) {
            let onUpdate = () => props.onUpdate( vendedor );
            C_Confirm( {
                title: "Editar Vendedor", onOk: onUpdate,
                okType: "primary", content: "Estás seguro de actualizar información?",
            } );
        } else {
            let ongrabar = () => props.onGrabar( vendedor );
            C_Confirm( {
                title: "Registrar Vendedor", onOk: ongrabar,
                okType: "primary", content: "Estás seguro de registrar información?",
            } );
        }
    };

    function onConfirmarDelete() {
        if ( !existValue() ) {
            C_Message( "error", "Vendedor no seleccionado" );
            return;
        };
        let ondelete = () => props.onDelete(vendedor);
        C_Confirm( { title: "Eliminar Vendedor", onOk: ondelete } );
    };

    function onPressEnterID() {
        if ( existValue() )  props.onSearchData( vendedor );
        else setVisibleAction(true);
    };

    function componentVendedor() {
        if ( !visible_action ) return null;
        return (
            <M_ListadoVendedor
                visible={visible_action}
                onClose={ () => setVisibleAction(false) }
                value={vendedor.idvendedor}
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
                    document.getElementById("vendedor_print").click();
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
                    document.getElementById('buttonvendedor_xls').click();
                }, 1000);
                return;
            }
            if ( archivo.checked.xlsx && result.response == 1 ) {
                setTimeout(() => {
                    document.getElementById('buttonvendedor_xlsx').click();
                }, 1000);
                return;
            }
            if ( archivo.checked.csv && result.response == 1 ) {
                setTimeout(() => {
                    document.getElementById('buttonvendedor_csv').click();
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
                    title={ "REPORTE Vendedor" }
                    bodyStyle={{ padding: '5px 4px', }}
                    style={{ top: 10, }}
                >
                    <VendedorPDF
                        vendedor={vendedor.reporte}
                    />
                </C_ModalDraggable>
            </>
        );
    };

    return (
        <>
            <C_Loading visible={ props.loading } />

            { componentVendedor() }
            { componentOption() }
            { componentArchivo() }
            { componentPDF() }

            <VendedorReport
                vendedor={ vendedor.reporte }
                archivo={ archivo }
                option={ option }
            />

            <div className="pt-2 pb-3" style={{ flexGrow: 1, width: "100%", }}>
                <C_Form
                    vendedor={ vendedor }
                    onChange={props.onChange}
                    disabled={disabled}
                    onPressEnter={onPressEnterID}
                />
            </div>
            <C_Footer
                disabled={disabled}

                onCreate={props.onCreate}
                onGrabar={onGrabarData}
                onUpdate={ () => props.onEditar( vendedor ) }
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

IndexVendedor.propTypes = {
    onClose:    PropTypes.func,
}

IndexVendedor.defaultProps = {
    onClose: () => {},
}

const mapStateToProps = ( state ) => ( {
    vendedor: state.vendedor,

    disabled:    state.disabled,
    loading:     state.loading.visible,
    paginations: state.paginations,
    option:      state.printOption,
    archivo:     state.archivoOption,
} );

const mapDispatchToProps = {
    initData:     vendedorActions.initData,
    onChangePage: vendedorActions.onChangePage,

    onChange:   vendedorActions.onChange,
    onSetState: vendedorActions.setState,

    onCreate:   vendedorActions.onCreate,
    onGrabar:   vendedorActions.onGrabar,
    onEditar:   vendedorActions.onEditar,
    onUpdate:   vendedorActions.onUpdate,
    onDelete:   vendedorActions.onDelete,
    onImprimir: vendedorActions.onImprimir,

    onSearch:     vendedorActions.onSearch,
    onSearchData: vendedorActions.onSearchData,

    onCancelar: vendedorActions.onCancelar,

    onDisabledEvent: disabledActions.onAction,

    setPrintOption:    printOptionActions.setData,
    resetPrintOption:  printOptionActions.reset,

    setArchivoOption: archivoOptionActions.setData,
};

export default connect( mapStateToProps, mapDispatchToProps )( IndexVendedor );
