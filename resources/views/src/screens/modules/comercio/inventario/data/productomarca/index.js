
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { C_Confirm, C_Footer, C_Loading, C_Message, C_ModalDraggable } from '../../../../../../components';

import M_ListadoProductoMarca from './modal/listado';
import C_Form from './components/form';

import { productoMarcaActions } from '../../../../../../redux/actions/comercio/inventario/productoMarcaActions';

import { disabledActions } from '../../../../../../redux/actions/config/disabledActions';
import { printOptionActions } from '../../../../../../redux/actions/config/printOptionActions';
import { archivoOptionActions } from '../../../../../../redux/actions/config/archivoActions';

import ArchivoProductoMarca from './components/archivo';
import OptionProductoMarca from './components/option';

import ProductoMarcaReport from './report';
import ProductoMarcaPDF from './report/productoMarcaPDF';

function IndexProductoMarca( props ) {
    const { archivo, productoMarca, disabled, option, paginations, visible } = props;
    
    const [ visible_pdf, setVisiblePDF ] = useState( false );
    const [ visible_action, setVisibleAction ] = useState( false );

    useEffect( () => {
        props.initData();
        // return () => { };
    }, [] );

    function existValue() {
        if ( productoMarca.idproductomarca ) {
            return ( productoMarca.idproductomarca.toString().trim().length > 0 );
        };
        return false;
    }

    function onGrabarData() {
        if( productoMarca.update )  props.onUpdate( productoMarca );
        else props.onGrabar( productoMarca )
    };

    function onConfirmarDelete() {
        if ( !existValue() ) {
            C_Message( "error", "Marca no seleccionado" );
            return;
        };
        let ondelete = () => props.onDelete(productoMarca);
        C_Confirm( { title: "Eliminar Marca", onOk: ondelete } );
    };

    function onPressEnterID() {
        if ( existValue() )  props.onSearchData( productoMarca );
        else setVisibleAction(true);
    };

    function componentProductoMarca() {
        if ( !visible_action ) return null;
        return (
            <M_ListadoProductoMarca
                visible={visible_action}
                onClose={ () => setVisibleAction(false) }
                value={productoMarca.idproductomarca}
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
                    document.getElementById("productomarca_print").click();
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
            <OptionProductoMarca 
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
                    document.getElementById('buttonproductomarca_xls').click();
                }, 1000);
                return;
            }
            if ( archivo.checked.xlsx && result.response == 1 ) {
                setTimeout(() => {
                    document.getElementById('buttonproductomarca_xlsx').click();
                }, 1000);
                return;
            }
            if ( archivo.checked.csv && result.response == 1 ) {
                setTimeout(() => {
                    document.getElementById('buttonproductomarca_csv').click();
                }, 1000);
                return;
            }
        } );
    };

    function componentArchivo() {
        return (
            <ArchivoProductoMarca 
                archivo={archivo}
                onChange={props.setArchivoOption}
                onSubmit={ onSubmitArchivo }
            />
        );
    };

    function componentPDF() {
        // if ( !visible_pdf ) return null;
        return (
            <>
                <C_ModalDraggable
                    visible={ visible_pdf } 
                    onClose={ () => {
                        setVisiblePDF( false );
                    } }
                    maskStyle={{ background: "transparent", }}
                    width={"90%"}  zIndex={ 1200 }  
                    title={ "REPORTE MARCA" }
                    bodyStyle={{ padding: '5px 4px', }}
                    style={{ top: 10, }}
                >
                    <ProductoMarcaPDF 
                        productoMarca={productoMarca.reporte}
                    />
                </C_ModalDraggable>
            </>
        );
    };

    return (
        <>
            <C_Loading visible={ props.loading } />

            { componentProductoMarca() }
            { componentOption() }
            { componentArchivo() }
            { componentPDF() }

            <ProductoMarcaReport
                productoMarca={ productoMarca.reporte }
                archivo={ archivo }
                option={ option }
            />

            <div className="pt-2 pb-3" style={{ flexGrow: 1, width: "100%", }}>
                <C_Form 
                    productoMarca={ productoMarca }
                    onChange={props.onChange}
                    disabled={disabled}
                    onPressEnter={onPressEnterID}
                />
            </div>
            <C_Footer 
                disabled={disabled}

                onCreate={props.onCreate}
                onGrabar={onGrabarData}
                onUpdate={ () => props.onEditar( productoMarca ) }
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

IndexProductoMarca.propTypes = {
    onClose:    PropTypes.func,
}

IndexProductoMarca.defaultProps = {
    onClose: () => {},
}

const mapStateToProps = ( state ) => ( {
    productoMarca: state.productoMarca,

    visible:     state.visible,
    disabled:    state.disabled,
    loading:     state.loading.visible,
    paginations: state.paginations,
    option:      state.printOption,
    archivo:     state.archivoOption,
} );

const mapDispatchToProps = {
    initData:     productoMarcaActions.initData,
    onChangePage: productoMarcaActions.onChangePage,

    onChange:   productoMarcaActions.onChange,
    onSetState: productoMarcaActions.setState,

    onCreate:   productoMarcaActions.onCreate,
    onGrabar:   productoMarcaActions.onGrabar,
    onEditar:   productoMarcaActions.onEditar,
    onUpdate:   productoMarcaActions.onUpdate,
    onDelete:   productoMarcaActions.onDelete,
    onImprimir: productoMarcaActions.onImprimir,

    onSearch:     productoMarcaActions.onSearch,
    onSearchData: productoMarcaActions.onSearchData,

    onCancelar: productoMarcaActions.onCancelar,

    onDisabledEvent: disabledActions.onAction,

    setPrintOption:    printOptionActions.setData,
    resetPrintOption:  printOptionActions.reset,

    setArchivoOption: archivoOptionActions.setData,
};

export default connect( mapStateToProps, mapDispatchToProps )( IndexProductoMarca );
