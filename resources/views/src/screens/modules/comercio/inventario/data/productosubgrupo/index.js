
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { C_Confirm, C_Footer, C_Loading, C_Message, C_ModalDraggable } from '../../../../../../components';

import M_ListadoProductoSubGrupo from './modal/listado';
import C_Form from './components/form';

import { productoSubGrupoActions } from '../../../../../../redux/actions/comercio/inventario/productoSubGrupoActions';

import { disabledActions } from '../../../../../../redux/actions/config/disabledActions';
import { printOptionActions } from '../../../../../../redux/actions/config/printOptionActions';
import { archivoOptionActions } from '../../../../../../redux/actions/config/archivoActions';

import ArchivoProductoSubGrupo from './components/archivo';
import OptionProductoSubGrupo from './components/option';

import ProductoSubGrupoReport from './report';
import ProductoSubGrupoPDF from './report/productoSubGrupoPDF';

function IndexProductoSubGrupo( props ) {
    const { archivo, productoSubGrupo, disabled, option, paginations, visible } = props;
    
    const [ visible_pdf, setVisiblePDF ] = useState( false );
    const [ visible_action, setVisibleAction ] = useState( false );

    useEffect( () => {
        props.initData();
        // return () => { };
    }, [] );

    function existValue() {
        if ( productoSubGrupo.idproductosubgrupo ) {
            return ( productoSubGrupo.idproductosubgrupo.toString().trim().length > 0 );
        };
        return false;
    }

    function onGrabarData() {
        if( productoSubGrupo.update )  props.onUpdate( productoSubGrupo );
        else props.onGrabar( productoSubGrupo )
    };

    function onConfirmarDelete() {
        if ( !existValue() ) {
            C_Message( "error", "Grupo no seleccionado" );
            return;
        };
        let ondelete = () => props.onDelete(productoSubGrupo);
        C_Confirm( { title: "Eliminar Sub Grupo", onOk: ondelete } );
    };

    function onPressEnterID() {
        if ( existValue() )  props.onSearchData( productoSubGrupo );
        else setVisibleAction(true);
    };

    function componentProductoSubGrupo() {
        if ( !visible_action ) return null;
        return (
            <M_ListadoProductoSubGrupo
                visible={visible_action}
                onClose={ () => setVisibleAction(false) }
                value={productoSubGrupo.idproductosubgrupo}
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
                    document.getElementById("productosubgrupo_print").click();
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
            <OptionProductoSubGrupo 
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
                    document.getElementById('buttonproductosubgrupo_xls').click();
                }, 1000);
                return;
            }
            if ( archivo.checked.xlsx && result.response == 1 ) {
                setTimeout(() => {
                    document.getElementById('buttonproductosubgrupo_xlsx').click();
                }, 1000);
                return;
            }
            if ( archivo.checked.csv && result.response == 1 ) {
                setTimeout(() => {
                    document.getElementById('buttonproductosubgrupo_csv').click();
                }, 1000);
                return;
            }
        } );
    };

    function componentArchivo() {
        return (
            <ArchivoProductoSubGrupo 
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
                    title={ "REPORTE SUB GRUPO DE PRODUCTO" }
                    bodyStyle={{ padding: '5px 4px', }}
                    style={{ top: 10, }}
                >
                    <ProductoSubGrupoPDF 
                        productoSubGrupo={productoSubGrupo.reporte}
                    />
                </C_ModalDraggable>
            </>
        );
    };

    return (
        <>
            <C_Loading visible={ props.loading } />

            { componentProductoSubGrupo() }
            { componentOption() }
            { componentArchivo() }
            { componentPDF() }

            <ProductoSubGrupoReport
                productoSubGrupo={ productoSubGrupo.reporte }
                archivo={ archivo }
                option={ option }
            />

            <div className="pt-2 pb-3 pl-1 pr-1" style={{ flexGrow: 1, width: "100%", }}>
                <C_Form 
                    productoSubGrupo={ productoSubGrupo }
                    onChange={props.onChange}
                    disabled={disabled}
                    onPressEnter={onPressEnterID}
                />
            </div>
            <C_Footer 
                disabled={disabled}

                onCreate={props.onCreate}
                onGrabar={onGrabarData}
                onUpdate={ () => props.onEditar( productoSubGrupo ) }
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

IndexProductoSubGrupo.propTypes = {
    onClose:    PropTypes.func,
}

IndexProductoSubGrupo.defaultProps = {
    onClose: () => {},
}

const mapStateToProps = ( state ) => ( {
    productoSubGrupo: state.productoSubGrupo,

    visible:     state.visible,
    disabled:    state.disabled,
    loading:     state.loading.visible,
    paginations: state.paginations,
    option:      state.printOption,
    archivo:     state.archivoOption,
} );

const mapDispatchToProps = {
    initData:     productoSubGrupoActions.initData,
    onChangePage: productoSubGrupoActions.onChangePage,

    onChange:   productoSubGrupoActions.onChange,
    onSetState: productoSubGrupoActions.setState,

    onCreate:   productoSubGrupoActions.onCreate,
    onGrabar:   productoSubGrupoActions.onGrabar,
    onEditar:   productoSubGrupoActions.onEditar,
    onUpdate:   productoSubGrupoActions.onUpdate,
    onDelete:   productoSubGrupoActions.onDelete,
    onImprimir: productoSubGrupoActions.onImprimir,

    onSearch:     productoSubGrupoActions.onSearch,
    onSearchData: productoSubGrupoActions.onSearchData,

    onCancelar: productoSubGrupoActions.onCancelar,

    onDisabledEvent: disabledActions.onAction,

    setPrintOption:    printOptionActions.setData,
    resetPrintOption:  printOptionActions.reset,

    setArchivoOption: archivoOptionActions.setData,
};

export default connect( mapStateToProps, mapDispatchToProps )( IndexProductoSubGrupo );
