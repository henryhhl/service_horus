
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { C_Confirm, C_Footer, C_Loading, C_Message, C_ModalDraggable } from '../../../../../../components';

import M_ListadoCategoria from './modal/listado';
import C_Form from './components/form';

import { categoriaActions } from '../../../../../../redux/actions/comercio/inventario/categoriaActions';

import { disabledActions } from '../../../../../../redux/actions/config/disabledActions';
import { printOptionActions } from '../../../../../../redux/actions/config/printOptionActions';
import { archivoOptionActions } from '../../../../../../redux/actions/config/archivoActions';

import ArchivoCategoria from './components/archivo';
import OptionCategoria from './components/option';

import CategoriaReport from './report';
import CategoriaPDF from './report/categoriaPDF';

function IndexCategoria( props ) {
    const { archivo, categoria, disabled, option, paginations, visible } = props;
    
    const [ visible_pdf, setVisiblePDF ] = useState( false );
    const [ visible_action, setVisibleAction ] = useState( false );

    useEffect( () => {
        props.initData();
        // return () => { };
    }, [] );

    function existValue() {
        if ( categoria.idcategoria ) {
            return ( categoria.idcategoria.toString().trim().length > 0 );
        };
        return false;
    }

    function onGrabarData() {
        if( categoria.update )  props.onUpdate( categoria );
        else props.onGrabar( categoria )
    };

    function onConfirmarDelete() {
        if ( !existValue() ) {
            C_Message( "error", "Categoría no seleccionado" );
            return;
        };
        let ondelete = () => props.onDelete(categoria);
        C_Confirm( { title: "Eliminar Categoría", onOk: ondelete } );
    };

    function onPressEnterID() {
        if ( existValue() )  props.onSearchData( categoria );
        else setVisibleAction(true);
    };

    function componentCategoria() {
        if ( !visible_action ) return null;
        return (
            <M_ListadoCategoria
                visible={visible_action}
                onClose={ () => setVisibleAction(false) }
                value={categoria.idcategoria}
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
                    document.getElementById("categoria_print").click();
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
            <OptionCategoria 
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
                    document.getElementById('buttoncategoria_xls').click();
                }, 1000);
                return;
            }
            if ( archivo.checked.xlsx && result.response == 1 ) {
                setTimeout(() => {
                    document.getElementById('buttoncategoria_xlsx').click();
                }, 1000);
                return;
            }
            if ( archivo.checked.csv && result.response == 1 ) {
                setTimeout(() => {
                    document.getElementById('buttoncategoria_csv').click();
                }, 1000);
                return;
            }
        } );
    };

    function componentArchivo() {
        return (
            <ArchivoCategoria 
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
                    title={ "REPORTE CATEGORÍA" }
                    bodyStyle={{ padding: '5px 4px', }}
                    style={{ top: 10, }}
                >
                    <CategoriaPDF 
                        categoria={categoria.reporte}
                    />
                </C_ModalDraggable>
            </>
        );
    };

    return (
        <>
            <C_Loading visible={ props.loading } />

            { componentCategoria() }
            { componentOption() }
            { componentArchivo() }
            { componentPDF() }

            <CategoriaReport
                categoria={ categoria.reporte }
                archivo={ archivo }
                option={ option }
            />

            <div className="pt-2 pb-3" style={{ flexGrow: 1, width: "100%", }}>
                <C_Form 
                    categoria={ categoria }
                    onChange={props.onChange}
                    disabled={disabled}
                    onPressEnter={onPressEnterID}
                />
            </div>
            <C_Footer 
                disabled={disabled}

                onCreate={props.onCreate}
                onGrabar={onGrabarData}
                onUpdate={ () => props.onEditar( categoria ) }
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

IndexCategoria.propTypes = {
    onClose:    PropTypes.func,
}

IndexCategoria.defaultProps = {
    onClose: () => {},
}

const mapStateToProps = ( state ) => ( {
    categoria: state.categoria,

    visible:     state.visible,
    disabled:    state.disabled,
    loading:     state.loading.visible,
    paginations: state.paginations,
    option:      state.printOption,
    archivo:     state.archivoOption,
} );

const mapDispatchToProps = {
    initData:     categoriaActions.initData,
    onChangePage: categoriaActions.onChangePage,

    onChange:   categoriaActions.onChange,
    onSetState: categoriaActions.setState,

    onCreate:   categoriaActions.onCreate,
    onGrabar:   categoriaActions.onGrabar,
    onEditar:   categoriaActions.onEditar,
    onUpdate:   categoriaActions.onUpdate,
    onDelete:   categoriaActions.onDelete,
    onImprimir: categoriaActions.onImprimir,

    onSearch:     categoriaActions.onSearch,
    onSearchData: categoriaActions.onSearchData,

    onCancelar: categoriaActions.onCancelar,

    onDisabledEvent: disabledActions.onAction,

    setPrintOption:    printOptionActions.setData,
    resetPrintOption:  printOptionActions.reset,

    setArchivoOption: archivoOptionActions.setData,
};

export default connect( mapStateToProps, mapDispatchToProps )( IndexCategoria);
