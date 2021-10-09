
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { C_Confirm, C_Footer, C_Loading, C_Message, C_ModalDraggable } from '../../../../../../components';

import M_ListadoProductoGrupo from './modal/listado';
import C_Form from './components/form';

import { productoGrupoActions } from '../../../../../../redux/actions/comercio/inventario/productoGrupoActions';

import { disabledActions } from '../../../../../../redux/actions/config/disabledActions';
import { printOptionActions } from '../../../../../../redux/actions/config/printOptionActions';
import { archivoOptionActions } from '../../../../../../redux/actions/config/archivoActions';

import ArchivoProductoGrupo from './components/archivo';
import OptionProductoGrupo from './components/option';

import ProductoGrupoReport from './report';
import ProductoGrupoPDF from './report/productoGrupoPDF';

function IndexProductoGrupo( props ) {
    const { archivo, productoGrupo, disabled, option, paginations, visible } = props;
    
    const [ visible_pdf, setVisiblePDF ] = useState( false );
    const [ visible_action, setVisibleAction ] = useState( false );

    useEffect( () => {
        props.initData();
        // return () => { };
    }, [] );

    function existValue() {
        if ( productoGrupo.idproductogrupo ) {
            return ( productoGrupo.idproductogrupo.toString().trim().length > 0 );
        };
        return false;
    }

    function onGrabarData() {
        if( productoGrupo.update )  props.onUpdate( productoGrupo );
        else props.onGrabar( productoGrupo )
    };

    function onConfirmarDelete() {
        if ( !existValue() ) {
            C_Message( "error", "Grupo no seleccionado" );
            return;
        };
        let ondelete = () => props.onDelete(productoGrupo);
        C_Confirm( { title: "Eliminar Grupo", onOk: ondelete } );
    };

    function onPressEnterID() {
        if ( existValue() )  props.onSearchData( productoGrupo );
        else setVisibleAction(true);
    };

    function componentProductoGrupo() {
        if ( !visible_action ) return null;
        return (
            <M_ListadoProductoGrupo
                visible={visible_action}
                onClose={ () => setVisibleAction(false) }
                value={productoGrupo.idproductogrupo}
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
                    document.getElementById("productogrupo_print").click();
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
            <OptionProductoGrupo 
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
                    document.getElementById('buttonproductogrupo_xls').click();
                }, 1000);
                return;
            }
            if ( archivo.checked.xlsx && result.response == 1 ) {
                setTimeout(() => {
                    document.getElementById('buttonproductogrupo_xlsx').click();
                }, 1000);
                return;
            }
            if ( archivo.checked.csv && result.response == 1 ) {
                setTimeout(() => {
                    document.getElementById('buttonproductogrupo_csv').click();
                }, 1000);
                return;
            }
        } );
    };

    function componentArchivo() {
        return (
            <ArchivoProductoGrupo 
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
                    title={ "REPORTE GRUPO DE PRODUCTO" }
                    bodyStyle={{ padding: '5px 4px', }}
                    style={{ top: 10, }}
                >
                    <ProductoGrupoPDF 
                        productoGrupo={productoGrupo.reporte}
                    />
                </C_ModalDraggable>
            </>
        );
    };

    return (
        <>
            <C_Loading visible={ props.loading } />

            { componentProductoGrupo() }
            { componentOption() }
            { componentArchivo() }
            { componentPDF() }

            <ProductoGrupoReport
                productoGrupo={ productoGrupo.reporte }
                archivo={ archivo }
                option={ option }
            />

            <div className="pt-2 pb-3" style={{ flexGrow: 1, width: "100%", }}>
                <C_Form 
                    productoGrupo={ productoGrupo }
                    onChange={props.onChange}
                    disabled={disabled}
                    onPressEnter={onPressEnterID}
                />
            </div>
            <C_Footer 
                disabled={disabled}

                onCreate={props.onCreate}
                onGrabar={onGrabarData}
                onUpdate={ () => props.onEditar( productoGrupo ) }
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

IndexProductoGrupo.propTypes = {
    onClose:    PropTypes.func,
}

IndexProductoGrupo.defaultProps = {
    onClose: () => {},
}

const mapStateToProps = ( state ) => ( {
    productoGrupo: state.productoGrupo,

    visible:     state.visible,
    disabled:    state.disabled,
    loading:     state.loading.visible,
    paginations: state.paginations,
    option:      state.printOption,
    archivo:     state.archivoOption,
} );

const mapDispatchToProps = {
    initData:     productoGrupoActions.initData,
    onChangePage: productoGrupoActions.onChangePage,

    onChange:   productoGrupoActions.onChange,
    onSetState: productoGrupoActions.setState,

    onCreate:   productoGrupoActions.onCreate,
    onGrabar:   productoGrupoActions.onGrabar,
    onEditar:   productoGrupoActions.onEditar,
    onUpdate:   productoGrupoActions.onUpdate,
    onDelete:   productoGrupoActions.onDelete,
    onImprimir: productoGrupoActions.onImprimir,

    onSearch:     productoGrupoActions.onSearch,
    onSearchData: productoGrupoActions.onSearchData,

    onCancelar: productoGrupoActions.onCancelar,

    onDisabledEvent: disabledActions.onAction,

    setPrintOption:    printOptionActions.setData,
    resetPrintOption:  printOptionActions.reset,

    setArchivoOption: archivoOptionActions.setData,
};

export default connect( mapStateToProps, mapDispatchToProps )( IndexProductoGrupo );