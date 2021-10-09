
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { C_Confirm, C_Footer, C_Loading, C_Message, C_ModalDraggable } from '../../../../../../components';

import M_ListadoUnidadMedida from './modal/listado';
import C_Form from './components/form';

import { unidadMedidaActions } from '../../../../../../redux/actions/comercio/inventario/unidadMedidaActions';

import { disabledActions } from '../../../../../../redux/actions/config/disabledActions';
import { printOptionActions } from '../../../../../../redux/actions/config/printOptionActions';
import { archivoOptionActions } from '../../../../../../redux/actions/config/archivoActions';

import ArchivoUnidadMedida from './components/archivo';
import OptionUnidadMedida from './components/option';

import UnidadMedidaReport from './report';
import UnidadMedidaPDF from './report/unidadMedidaPDF';

function IndexUnidadMedida( props ) {
    const { archivo, unidadMedida, disabled, option, paginations, visible } = props;
    
    const [ visible_pdf, setVisiblePDF ] = useState( false );
    const [ visible_unidadmedida, setVisibleUnidadMedida ] = useState( false );

    useEffect( () => {
        props.initData();
        // return () => { };
    }, [] );

    function existValue() {
        if ( unidadMedida.idunidadmedida ) {
            return ( unidadMedida.idunidadmedida.toString().trim().length > 0 );
        };
        return false;
    }

    function onGrabarData() {
        if( unidadMedida.update )  props.onUpdate( unidadMedida );
        else props.onGrabar( unidadMedida )
    };

    function onConfirmarDelete() {
        if ( !existValue() ) {
            C_Message( "error", "Unidad Medida no seleccionado" );
            return;
        };
        let ondelete = () => props.onDelete(unidadMedida);
        C_Confirm( { title: "Eliminar Unidad Medida", onOk: ondelete } );
    };

    function onPressEnterID() {
        if ( existValue() )  props.onSearchData( unidadMedida );
        else setVisibleUnidadMedida(true);
    };

    function componentUnidadMedida() {
        if ( !visible_unidadmedida ) return null;
        return (
            <M_ListadoUnidadMedida
                visible={visible_unidadmedida}
                onClose={ () => setVisibleUnidadMedida(false) }
                value={unidadMedida.idunidadmedida}
                onChange={ async ( data ) => {
                    await props.onSetState(data);
                    setVisibleUnidadMedida(false);
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
                    document.getElementById("unidadmedida_print").click();
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
            <OptionUnidadMedida 
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
                    document.getElementById('buttonunidadmedida_xls').click();
                }, 1000);
                return;
            }
            if ( archivo.checked.xlsx && result.response == 1 ) {
                setTimeout(() => {
                    document.getElementById('buttonunidadmedida_xlsx').click();
                }, 1000);
                return;
            }
            if ( archivo.checked.csv && result.response == 1 ) {
                setTimeout(() => {
                    document.getElementById('buttonunidadmedida_csv').click();
                }, 1000);
                return;
            }
        } );
    };

    function componentArchivo() {
        return (
            <ArchivoUnidadMedida 
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
                    title={ "REPORTE UNIDAD MEDIDA" }
                    bodyStyle={{ padding: '5px 4px', }}
                    style={{ top: 10, }}
                >
                    <UnidadMedidaPDF 
                        unidadMedida={unidadMedida.reporte}
                    />
                </C_ModalDraggable>
            </>
        );
    };

    return (
        <>
            <C_Loading visible={ props.loading } />

            { componentUnidadMedida() }
            { componentOption() }
            { componentArchivo() }
            { componentPDF() }

            <UnidadMedidaReport
                unidadMedida={ unidadMedida.reporte }
                archivo={ archivo }
                option={ option }
            />

            <div className="pt-2 pb-3" style={{ flexGrow: 1, width: "100%", }}>
                <C_Form 
                    unidadMedida={ unidadMedida }
                    onChange={props.onChange}
                    disabled={disabled}
                    onPressEnter={onPressEnterID}
                />
            </div>
            <C_Footer 
                disabled={disabled}

                onCreate={props.onCreate}
                onGrabar={onGrabarData}
                onUpdate={ () => props.onEditar( unidadMedida ) }
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

IndexUnidadMedida.propTypes = {
    onClose:    PropTypes.func,
}

IndexUnidadMedida.defaultProps = {
    onClose: () => {},
}

const mapStateToProps = ( state ) => ( {
    unidadMedida: state.unidadMedida,

    visible:     state.visible,
    disabled:    state.disabled,
    loading:     state.loading.visible,
    paginations: state.paginations,
    option:      state.printOption,
    archivo:     state.archivoOption,
} );

const mapDispatchToProps = {
    initData:     unidadMedidaActions.initData,
    onChangePage: unidadMedidaActions.onChangePage,

    onChange:   unidadMedidaActions.onChange,
    onSetState: unidadMedidaActions.setState,

    onCreate:   unidadMedidaActions.onCreate,
    onGrabar:   unidadMedidaActions.onGrabar,
    onEditar:   unidadMedidaActions.onEditar,
    onUpdate:   unidadMedidaActions.onUpdate,
    onDelete:   unidadMedidaActions.onDelete,
    onImprimir: unidadMedidaActions.onImprimir,

    onSearch:     unidadMedidaActions.onSearch,
    onSearchData: unidadMedidaActions.onSearchData,

    onCancelar: unidadMedidaActions.onCancelar,

    onDisabledEvent: disabledActions.onAction,

    setPrintOption:    printOptionActions.setData,
    resetPrintOption:  printOptionActions.reset,

    setArchivoOption: archivoOptionActions.setData,
};

export default connect( mapStateToProps, mapDispatchToProps )( IndexUnidadMedida );
