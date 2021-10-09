
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { C_Confirm, C_Footer, C_Loading, C_Message, C_ModalDraggable } from '../../../../../../components';

import M_ListadoSucursal from './modal/listado';
import C_Form from './components/form';

import { sucursalActions } from '../../../../../../redux/actions/comercio/venta/sucursalActions';

import { disabledActions } from '../../../../../../redux/actions/config/disabledActions';
import { printOptionActions } from '../../../../../../redux/actions/config/printOptionActions';
import { archivoOptionActions } from '../../../../../../redux/actions/config/archivoActions';

import ArchivoSucursal from './components/archivo';
import OptionSucursal from './components/option';

import SucursalReport from './report';
import SucursalPDF from './report/sucursalPDF';

function IndexSucursal( props ) {
    const { archivo, sucursal, disabled, option, paginations } = props;
    
    const [ visible_pdf, setVisiblePDF ] = useState( false );
    const [ visible_action, setVisibleAction ] = useState( false );

    useEffect( () => {
        props.initData();
        // return () => { };
    }, [] );

    function existValue() {
        if ( sucursal.idsucursal ) {
            return ( sucursal.idsucursal.toString().trim().length > 0 );
        };
        return false;
    }

    function onGrabarData() {
        if( sucursal.update )  props.onUpdate( sucursal );
        else props.onGrabar( sucursal )
    };

    function onConfirmarDelete() {
        if ( !existValue() ) {
            C_Message( "error", "Sucursal no seleccionado" );
            return;
        };
        let ondelete = () => props.onDelete(sucursal);
        C_Confirm( { title: "Eliminar Sucursal", onOk: ondelete } );
    };

    function onPressEnterID() {
        if ( existValue() )  props.onSearchData( sucursal );
        else setVisibleAction(true);
    };

    function componentSucursal() {
        if ( !visible_action ) return null;
        return (
            <M_ListadoSucursal
                visible={visible_action}
                onClose={ () => setVisibleAction(false) }
                value={sucursal.idsucursal}
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
                    document.getElementById("sucursal_print").click();
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
            <OptionSucursal 
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
                    document.getElementById('buttonsucursal_xls').click();
                }, 1000);
                return;
            }
            if ( archivo.checked.xlsx && result.response == 1 ) {
                setTimeout(() => {
                    document.getElementById('buttonsucursal_xlsx').click();
                }, 1000);
                return;
            }
            if ( archivo.checked.csv && result.response == 1 ) {
                setTimeout(() => {
                    document.getElementById('buttonsucursal_csv').click();
                }, 1000);
                return;
            }
        } );
    };

    function componentArchivo() {
        return (
            <ArchivoSucursal 
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
                    title={ "REPORTE SUCURSAL" }
                    bodyStyle={{ padding: '5px 4px', }}
                    style={{ top: 10, }}
                >
                    <SucursalPDF 
                        sucursal={sucursal.reporte}
                    />
                </C_ModalDraggable>
            </>
        );
    };

    return (
        <>
            <C_Loading visible={ props.loading } />

            { componentSucursal() }
            { componentOption() }
            { componentArchivo() }
            { componentPDF() }

            <SucursalReport
                sucursal={ sucursal.reporte }
                archivo={ archivo }
                option={ option }
            />

            <div className="pt-2 pb-3" style={{ flexGrow: 1, width: "100%", }}>
                <C_Form 
                    sucursal={ sucursal }
                    onChange={props.onChange}
                    disabled={disabled}
                    onPressEnter={onPressEnterID}
                />
            </div>
            <C_Footer 
                disabled={disabled}

                onCreate={props.onCreate}
                onGrabar={onGrabarData}
                onUpdate={ () => props.onEditar( sucursal ) }
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

IndexSucursal.propTypes = {
    onClose:    PropTypes.func,
}

IndexSucursal.defaultProps = {
    onClose: () => {},
}

const mapStateToProps = ( state ) => ( {
    sucursal: state.sucursal,

    disabled:    state.disabled,
    loading:     state.loading.visible,
    paginations: state.paginations,
    option:      state.printOption,
    archivo:     state.archivoOption,
} );

const mapDispatchToProps = {
    initData:     sucursalActions.initData,
    onChangePage: sucursalActions.onChangePage,

    onChange:   sucursalActions.onChange,
    onSetState: sucursalActions.setState,

    onCreate:   sucursalActions.onCreate,
    onGrabar:   sucursalActions.onGrabar,
    onEditar:   sucursalActions.onEditar,
    onUpdate:   sucursalActions.onUpdate,
    onDelete:   sucursalActions.onDelete,
    onImprimir: sucursalActions.onImprimir,

    onSearch:     sucursalActions.onSearch,
    onSearchData: sucursalActions.onSearchData,

    onCancelar: sucursalActions.onCancelar,

    onDisabledEvent: disabledActions.onAction,

    setPrintOption:    printOptionActions.setData,
    resetPrintOption:  printOptionActions.reset,

    setArchivoOption: archivoOptionActions.setData,
};

export default connect( mapStateToProps, mapDispatchToProps )( IndexSucursal );
