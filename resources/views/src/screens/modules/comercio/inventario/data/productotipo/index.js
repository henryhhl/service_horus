
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { C_Confirm, C_Footer, C_Loading, C_Message, C_ModalDraggable } from '../../../../../../components';

import { productoTipoActions } from '../../../../../../redux/actions/comercio/inventario/productoTipoActions';
import { visibleActions } from '../../../../../../redux/actions/config/visibleActions';

import M_ListadoProductoTipo from './modal/listado';
import C_Form from './components/form';

import { disabledActions } from '../../../../../../redux/actions/config/disabledActions';
import { printOptionActions } from '../../../../../../redux/actions/config/printOptionActions';
import { archivoOptionActions } from '../../../../../../redux/actions/config/archivoActions';

import ArchivoProductoTipo from './components/archivo';
import OptionProductoTipo from './components/option';

import ProductoTipoReport from './report';
import ProductoTipoPDF from './report/productoTipoPDF';

function IndexProductoTipo( props ) {
    const { archivo, productoTipo, disabled, option, paginations, visible } = props;
    
    const [ visible_pdf, setVisiblePDF ] = useState( false );
    const [ visible_productotipo, setVisibleProductoTipo ] = useState( false );

    useEffect( () => {
        props.initData();
        // return () => { };
    }, [] );

    function existValue() {
        if ( productoTipo.idproductotipo ) {
            return ( productoTipo.idproductotipo.toString().trim().length > 0 );
        };
        return false;
    }

    function onGrabarData() {
        if( productoTipo.update )  props.onUpdate( productoTipo );
        else props.onGrabar( productoTipo )
    };

    function onConfirmarDelete() {
        if ( !existValue() ) {
            C_Message( "error", "Tipo Producto no seleccionado" );
            return;
        };
        let ondelete = () => props.onDelete(productoTipo);
        C_Confirm( { title: "Eliminar Tipo Producto", onOk: ondelete } );
    };

    function onPressEnterID() {
        if ( existValue() )  props.onSearchData( productoTipo );
        else setVisibleProductoTipo(true);
    };

    function componentProductoTipo() {
        if ( !visible_productotipo ) return null;
        return (
            <M_ListadoProductoTipo
                visible={visible_productotipo}
                onClose={ () => setVisibleProductoTipo(false) }
                value={productoTipo.idproductotipo}
                onChange={ async ( data ) => {
                    await props.onSetState(data);
                    setVisibleProductoTipo(false);
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
                    document.getElementById("productotipo_print").click();
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
            <OptionProductoTipo 
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
                    document.getElementById('buttonproductotipo_xls').click();
                }, 1000);
                return;
            }
            if ( archivo.checked.xlsx && result.response == 1 ) {
                setTimeout(() => {
                    document.getElementById('buttonproductotipo_xlsx').click();
                }, 1000);
                return;
            }
            if ( archivo.checked.csv && result.response == 1 ) {
                setTimeout(() => {
                    document.getElementById('buttonproductotipo_csv').click();
                }, 1000);
                return;
            }
        } );
    };

    function componentArchivo() {
        return (
            <ArchivoProductoTipo 
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
                    title={ "REPORTE TIPO PRODUCTO" }
                    bodyStyle={{ padding: '5px 4px', }}
                    style={{ top: 10, }}
                >
                    <ProductoTipoPDF 
                        productoTipo={productoTipo.reporte}
                    />
                </C_ModalDraggable>
            </>
        );
    };

    return (
        <>
            <C_Loading visible={ props.loading } />

            { componentProductoTipo() }
            { componentOption() }
            { componentArchivo() }
            { componentPDF() }

            <ProductoTipoReport
                productoTipo={ productoTipo.reporte }
                archivo={ archivo }
                option={ option }
            />

            <div className="pt-2 pb-3" style={{ flexGrow: 1, width: "100%", }}>
                <C_Form 
                    productoTipo={ productoTipo }
                    onChange={props.onChange}
                    disabled={disabled}
                    onPressEnter={onPressEnterID}
                />
            </div>
            <C_Footer 
                disabled={disabled}

                onCreate={props.onCreate}
                onGrabar={onGrabarData}
                onUpdate={ () => props.onEditar( productoTipo ) }
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

IndexProductoTipo.propTypes = {
    onClose:    PropTypes.func,
}

IndexProductoTipo.defaultProps = {
    onClose: () => {},
}

const mapStateToProps = ( state ) => ( {
    productoTipo: state.productoTipo,

    visible:     state.visible,
    disabled:    state.disabled,
    loading:     state.loading.visible,
    paginations: state.paginations,
    option:      state.printOption,
    archivo:     state.archivoOption,
} );

const mapDispatchToProps = {
    initData:     productoTipoActions.initData,
    onChangePage: productoTipoActions.onChangePage,

    onChange:   productoTipoActions.onChange,
    onSetState: productoTipoActions.setState,

    onCreate:   productoTipoActions.onCreate,
    onGrabar:   productoTipoActions.onGrabar,
    onEditar:   productoTipoActions.onEditar,
    onUpdate:   productoTipoActions.onUpdate,
    onDelete:   productoTipoActions.onDelete,
    onImprimir: productoTipoActions.onImprimir,

    onSearch:     productoTipoActions.onSearch,
    onSearchData: productoTipoActions.onSearchData,

    onCancelar: productoTipoActions.onCancelar,

    onShowCiudadClasificacion: visibleActions.showCiudadClasificacion,
    onHideCiudadClasificacion: visibleActions.hideCiudadClasificacion,

    onDisabledEvent: disabledActions.onAction,

    setPrintOption:    printOptionActions.setData,
    resetPrintOption:  printOptionActions.reset,

    setArchivoOption: archivoOptionActions.setData,
};

export default connect( mapStateToProps, mapDispatchToProps )(IndexProductoTipo);
