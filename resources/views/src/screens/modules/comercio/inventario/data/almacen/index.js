
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { C_Confirm, C_Footer, C_Loading, C_Message, C_ModalDraggable } from '../../../../../../components';

import M_ListadoAlmacen from './modal/listado';
import C_Form from './components/form';

import { almacenActions } from '../../../../../../redux/actions/comercio/inventario/almacenActions';

import { disabledActions } from '../../../../../../redux/actions/config/disabledActions';
import { printOptionActions } from '../../../../../../redux/actions/config/printOptionActions';
import { archivoOptionActions } from '../../../../../../redux/actions/config/archivoActions';

import ArchivoAlmacen from './components/archivo';
import OptionAlmacen from './components/option';

import AlmacenReport from './report';
import AlmacenPDF from './report/almacenPDF';

function IndexAlmacen( props ) {
    const { archivo, almacen, disabled, option, paginations } = props;
    
    const [ visible_pdf, setVisiblePDF ] = useState( false );
    const [ visible_action, setVisibleAction ] = useState( false );

    useEffect( () => {
        props.initData();
        // return () => { };
    }, [] );

    function existValue() {
        if ( almacen.idalmacen ) {
            return ( almacen.idalmacen.toString().trim().length > 0 );
        };
        return false;
    }

    function onGrabarData() {
        if( almacen.update ) {
            let onUpdate = () => props.onUpdate( almacen );
            C_Confirm( {
                title: "Actualizar Almacén", onOk: onUpdate,
                okType: "primary", content: "Estás seguro de actualizar información?",
            } );
        } else {
            let onGrabar = () => props.onGrabar( almacen );
            C_Confirm( {
                title: "Registrar Almacén", onOk: onGrabar,
                okType: "primary", content: "Estás seguro de registrar información?",
            } );
        }
    };

    function onConfirmarDelete() {
        if ( !existValue() ) {
            C_Message( "error", "Álmacen no seleccionado" );
            return;
        };
        let ondelete = () => props.onDelete(almacen);
        C_Confirm( { title: "Eliminar Álmacen", onOk: ondelete } );
    };

    function onPressEnterID() {
        if ( existValue() )  props.onSearchData( almacen );
        else setVisibleAction(true);
    };

    function componentAlmacen() {
        if ( !visible_action ) return null;
        return (
            <M_ListadoAlmacen
                visible={visible_action}
                onClose={ () => setVisibleAction(false) }
                value={almacen.idalmacen}
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
                    document.getElementById("almacen_print").click();
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
            <OptionAlmacen 
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
                    document.getElementById('buttonalmacen_xls').click();
                }, 1000);
                return;
            }
            if ( archivo.checked.xlsx && result.response == 1 ) {
                setTimeout(() => {
                    document.getElementById('buttonalmacen_xlsx').click();
                }, 1000);
                return;
            }
            if ( archivo.checked.csv && result.response == 1 ) {
                setTimeout(() => {
                    document.getElementById('buttonalmacen_csv').click();
                }, 1000);
                return;
            }
        } );
    };

    function componentArchivo() {
        return (
            <ArchivoAlmacen 
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
                    title={ "REPORTE ÁLMACEN" }
                    bodyStyle={{ padding: '5px 4px', }}
                    style={{ top: 10, }}
                >
                    <AlmacenPDF 
                        almacen={almacen.reporte}
                    />
                </C_ModalDraggable>
            </>
        );
    };

    return (
        <>
            <C_Loading visible={ props.loading } />

            { componentAlmacen() }
            { componentOption() }
            { componentArchivo() }
            { componentPDF() }

            <AlmacenReport
                almacen={ almacen.reporte }
                archivo={ archivo }
                option={ option }
            />

            <div className="pt-2 pb-3" style={{ flexGrow: 1, width: "100%", }}>
                <C_Form 
                    almacen={ almacen }
                    onChange={props.onChange}
                    disabled={disabled}
                    onPressEnter={onPressEnterID}
                />
            </div>
            <C_Footer 
                disabled={disabled}

                onCreate={props.onCreate}
                onGrabar={onGrabarData}
                onUpdate={ () => props.onEditar( almacen ) }
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

IndexAlmacen.propTypes = {
    onClose:    PropTypes.func,
}

IndexAlmacen.defaultProps = {
    onClose: () => {},
}

const mapStateToProps = ( state ) => ( {
    almacen: state.almacen,

    disabled:    state.disabled,
    loading:     state.loading.visible,
    paginations: state.paginations,
    option:      state.printOption,
    archivo:     state.archivoOption,
} );

const mapDispatchToProps = {
    initData:     almacenActions.initData,
    onChangePage: almacenActions.onChangePage,

    onChange:   almacenActions.onChange,
    onSetState: almacenActions.setState,

    onCreate:   almacenActions.onCreate,
    onGrabar:   almacenActions.onGrabar,
    onEditar:   almacenActions.onEditar,
    onUpdate:   almacenActions.onUpdate,
    onDelete:   almacenActions.onDelete,
    onImprimir: almacenActions.onImprimir,

    onSearch:     almacenActions.onSearch,
    onSearchData: almacenActions.onSearchData,

    onCancelar: almacenActions.onCancelar,

    onDisabledEvent: disabledActions.onAction,

    setPrintOption:    printOptionActions.setData,
    resetPrintOption:  printOptionActions.reset,

    setArchivoOption: archivoOptionActions.setData,
};

export default connect( mapStateToProps, mapDispatchToProps )( IndexAlmacen );
