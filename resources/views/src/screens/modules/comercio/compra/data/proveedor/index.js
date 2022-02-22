
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { C_Confirm, C_Footer, C_Loading, C_Message, C_ModalDraggable } from '../../../../../../components';

import M_ListadoProveedor from './modal/listado';
import C_Form from './components/form';

import { proveedorActions } from '../../../../../../redux/actions/comercio/compra/proveedorActions';

import { disabledActions } from '../../../../../../redux/actions/config/disabledActions';
import { printOptionActions } from '../../../../../../redux/actions/config/printOptionActions';
import { archivoOptionActions } from '../../../../../../redux/actions/config/archivoActions';

import ArchivoProveedor from './components/archivo';
import OptionProveedor from './components/option';

import ProveedorReport from './report';
import ProveedorPDF from './report/proveedorPDF';

function IndexProveedor( props ) {
    const { archivo, proveedor, disabled, option, paginations } = props;

    const [ visible_pdf, setVisiblePDF ] = useState( false );
    const [ visible_action, setVisibleAction ] = useState( false );

    useEffect( () => {
        props.initData();
        // return () => { };
    }, [] );

    function existValue() {
        if ( proveedor.idproveedor ) {
            return ( proveedor.idproveedor.toString().trim().length > 0 );
        };
        return false;
    }

    function onGrabarData() {
        if( proveedor.update ) {
            let onUpdate = () => props.onUpdate( proveedor );
            C_Confirm( {
                title: "Editar Proveedor", onOk: onUpdate,
                okType: "primary", content: "Estás seguro de actualizar información?",
            } );
        } else {
            let ongrabar = () => props.onGrabar( proveedor );
            C_Confirm( {
                title: "Registrar Proveedor", onOk: ongrabar,
                okType: "primary", content: "Estás seguro de registrar información?",
            } );
        }
    };

    function onConfirmarDelete() {
        if ( !existValue() ) {
            C_Message( "error", " PROVEEDOR no seleccionado" );
            return;
        };
        let ondelete = () => props.onDelete(proveedor);
        C_Confirm( { title: "Eliminar  PROVEEDOR", onOk: ondelete } );
    };

    function onPressEnterID() {
        if ( existValue() )  props.onSearchData( proveedor );
        else setVisibleAction(true);
    };

    function componentProveedor() {
        if ( !visible_action ) return null;
        return (
            <M_ListadoProveedor
                visible={visible_action}
                onClose={ () => setVisibleAction(false) }
                value={proveedor.idproveedor}
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
                    document.getElementById("proveedor_print").click();
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
            <OptionProveedor
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
                    document.getElementById('buttonproveedor_xls').click();
                }, 1000);
                return;
            }
            if ( archivo.checked.xlsx && result.response == 1 ) {
                setTimeout(() => {
                    document.getElementById('buttonproveedor_xlsx').click();
                }, 1000);
                return;
            }
            if ( archivo.checked.csv && result.response == 1 ) {
                setTimeout(() => {
                    document.getElementById('buttonproveedor_csv').click();
                }, 1000);
                return;
            }
        } );
    };

    function componentArchivo() {
        return (
            <ArchivoProveedor
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
                    title={ "REPORTE PROVEEDOR" }
                    bodyStyle={{ padding: '5px 4px', }}
                    style={{ top: 10, }}
                >
                    <ProveedorPDF
                        proveedor={proveedor.reporte}
                    />
                </C_ModalDraggable>
            </>
        );
    };

    return (
        <>
            <C_Loading visible={ props.loading } />

            { componentProveedor() }
            { componentOption() }
            { componentArchivo() }
            { componentPDF() }

            <ProveedorReport
                proveedor={ proveedor.reporte }
                archivo={ archivo }
                option={ option }
            />

            <div className="pt-2 pb-3 pl-4 pr-4" style={{ flexGrow: 1, width: "100%", }}>
                <C_Form
                    proveedor={ proveedor }
                    onChange={props.onChange}
                    disabled={disabled}
                    onPressEnter={onPressEnterID}
                />
            </div>
            <C_Footer
                disabled={disabled}

                onCreate={props.onCreate}
                onGrabar={onGrabarData}
                onUpdate={ () => props.onEditar( proveedor ) }
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

IndexProveedor.propTypes = {
    onClose:    PropTypes.func,
}

IndexProveedor.defaultProps = {
    onClose: () => {},
}

const mapStateToProps = ( state ) => ( {
    proveedor: state.proveedor,

    disabled:    state.disabled,
    loading:     state.loading.visible,
    paginations: state.paginations,
    option:      state.printOption,
    archivo:     state.archivoOption,
} );

const mapDispatchToProps = {
    initData:     proveedorActions.initData,
    onChangePage: proveedorActions.onChangePage,

    onChange:   proveedorActions.onChange,
    onSetState: proveedorActions.setState,

    onCreate:   proveedorActions.onCreate,
    onGrabar:   proveedorActions.onGrabar,
    onEditar:   proveedorActions.onEditar,
    onUpdate:   proveedorActions.onUpdate,
    onDelete:   proveedorActions.onDelete,
    onImprimir: proveedorActions.onImprimir,

    onSearch:     proveedorActions.onSearch,
    onSearchData: proveedorActions.onSearchData,

    onCancelar: proveedorActions.onCancelar,

    onDisabledEvent: disabledActions.onAction,

    setPrintOption:    printOptionActions.setData,
    resetPrintOption:  printOptionActions.reset,

    setArchivoOption: archivoOptionActions.setData,
};

export default connect( mapStateToProps, mapDispatchToProps )( IndexProveedor );
