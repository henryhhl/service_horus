
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { C_Confirm, C_Footer, C_Loading, C_Message, C_ModalDraggable } from '../../../../../../components';

import M_ListadoListaPrecio from './modal/listado';
import C_Form from './components/form';

import { listaPrecioActions } from '../../../../../../redux/actions/comercio/venta/listaPrecioActions';

import { disabledActions } from '../../../../../../redux/actions/config/disabledActions';
import { printOptionActions } from '../../../../../../redux/actions/config/printOptionActions';
import { archivoOptionActions } from '../../../../../../redux/actions/config/archivoActions';

import ArchivoListaPrecio from './components/archivo';
import OptionListaPrecio from './components/option';

import ListaPrecioReport from './report';
import ListaPrecioPDF from './report/listaPrecioPDF';

function IndexListaPrecio( props ) {
    const { archivo, listaPrecio, disabled, option, paginations } = props;
    
    const [ visible_pdf, setVisiblePDF ] = useState( false );
    const [ visible_action, setVisibleAction ] = useState( false );

    useEffect( () => {
        props.initData();
        // return () => { };
    }, [] );

    function existValue() {
        if ( listaPrecio.idlistaprecio ) {
            return ( listaPrecio.idlistaprecio.toString().trim().length > 0 );
        };
        return false;
    }

    function onGrabarData() {
        if( listaPrecio.update )  props.onUpdate( listaPrecio );
        else props.onGrabar( listaPrecio )
    };

    function onConfirmarDelete() {
        if ( !existValue() ) {
            C_Message( "error", "Lista Precio no seleccionado" );
            return;
        };
        let ondelete = () => props.onDelete(listaPrecio);
        C_Confirm( { title: "Eliminar Lista Precio", onOk: ondelete } );
    };

    function onPressEnterID() {
        if ( existValue() )  props.onSearchData( listaPrecio );
        else setVisibleAction(true);
    };

    function componentListaPrecio() {
        if ( !visible_action ) return null;
        return (
            <M_ListadoListaPrecio
                visible={visible_action}
                onClose={ () => setVisibleAction(false) }
                value={listaPrecio.idlistaprecio}
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
                    document.getElementById("listaprecio_print").click();
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
            <OptionListaPrecio 
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
                    document.getElementById('buttonlistaprecio_xls').click();
                }, 1000);
                return;
            }
            if ( archivo.checked.xlsx && result.response == 1 ) {
                setTimeout(() => {
                    document.getElementById('buttonlistaprecio_xlsx').click();
                }, 1000);
                return;
            }
            if ( archivo.checked.csv && result.response == 1 ) {
                setTimeout(() => {
                    document.getElementById('buttonlistaprecio_csv').click();
                }, 1000);
                return;
            }
        } );
    };

    function componentArchivo() {
        return (
            <ArchivoListaPrecio 
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
                    title={ "REPORTE LISTA PRECIO" }
                    bodyStyle={{ padding: '5px 4px', }}
                    style={{ top: 10, }}
                >
                    <ListaPrecioPDF 
                        listaPrecio={listaPrecio.reporte}
                    />
                </C_ModalDraggable>
            </>
        );
    };

    return (
        <>
            <C_Loading visible={ props.loading } />

            { componentListaPrecio() }
            { componentOption() }
            { componentArchivo() }
            { componentPDF() }

            <ListaPrecioReport
                listaPrecio={ listaPrecio.reporte }
                archivo={ archivo }
                option={ option }
            />

            <div className="pt-2 pb-3 pl-4 pr-4" style={{ flexGrow: 1, width: "100%", }}>
                <C_Form 
                    listaPrecio={ listaPrecio }
                    onChange={props.onChange}
                    disabled={disabled}
                    onPressEnter={onPressEnterID}
                />
            </div>
            <C_Footer 
                disabled={disabled}

                onCreate={props.onCreate}
                onGrabar={onGrabarData}
                onUpdate={ () => props.onEditar( listaPrecio ) }
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

IndexListaPrecio.propTypes = {
    onClose:    PropTypes.func,
}

IndexListaPrecio.defaultProps = {
    onClose: () => {},
}

const mapStateToProps = ( state ) => ( {
    listaPrecio: state.listaPrecio,

    visible:     state.visible,
    disabled:    state.disabled,
    loading:     state.loading.visible,
    paginations: state.paginations,
    option:      state.printOption,
    archivo:     state.archivoOption,
} );

const mapDispatchToProps = {
    initData:     listaPrecioActions.initData,
    onChangePage: listaPrecioActions.onChangePage,

    onChange:   listaPrecioActions.onChange,
    onSetState: listaPrecioActions.setState,

    onCreate:   listaPrecioActions.onCreate,
    onGrabar:   listaPrecioActions.onGrabar,
    onEditar:   listaPrecioActions.onEditar,
    onUpdate:   listaPrecioActions.onUpdate,
    onDelete:   listaPrecioActions.onDelete,
    onImprimir: listaPrecioActions.onImprimir,

    onSearch:     listaPrecioActions.onSearch,
    onSearchData: listaPrecioActions.onSearchData,

    onCancelar: listaPrecioActions.onCancelar,

    onDisabledEvent: disabledActions.onAction,

    setPrintOption:    printOptionActions.setData,
    resetPrintOption:  printOptionActions.reset,

    setArchivoOption: archivoOptionActions.setData,
};

export default connect( mapStateToProps, mapDispatchToProps )( IndexListaPrecio );
