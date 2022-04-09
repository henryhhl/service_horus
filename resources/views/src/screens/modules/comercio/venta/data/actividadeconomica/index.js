
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { C_Confirm, C_Footer, C_Loading, C_Message, C_ModalDraggable } from '../../../../../../components';

import M_ListadoActividadEconomica from './modal/listado';

import C_Form from './components/form';
import C_Archivo from './components/archivo';
import C_Option from './components/option';

import { actividadEconomicaActions } from '../../../../../../redux/actions/comercio/venta/actividadEconomicaActions';

import { disabledActions } from '../../../../../../redux/actions/config/disabledActions';
import { printOptionActions } from '../../../../../../redux/actions/config/printOptionActions';
import { archivoOptionActions } from '../../../../../../redux/actions/config/archivoActions';


import ActividadEconomicaReport from './report';
import ActividadEconomicaPDF from './report/actividadEconomicaPDF';

function IndexActividadEconomica( props ) {
    const { archivo, actividadEconomica, disabled, option, paginations } = props;

    const [ visible_pdf, setVisiblePDF ] = useState( false );
    const [ visible_action, setVisibleAction ] = useState( false );

    useEffect( () => {
        props.initData();
        // return () => { };
    }, [] );

    function existValue() {
        if ( actividadEconomica.idactividadeconomica ) {
            return ( actividadEconomica.idactividadeconomica.toString().trim().length > 0 );
        };
        return false;
    }

    function onGrabarData() {
        if( actividadEconomica.update ) {
            let onUpdate = () => props.onUpdate( actividadEconomica );
            C_Confirm( {
                title: "Editar Actividad Económica", onOk: onUpdate,
                okType: "primary", content: "Estás seguro de actualizar información?",
            } );
        } else {
            let ongrabar = () => props.onGrabar( actividadEconomica );
            C_Confirm( {
                title: "Registrar Actividad Económica", onOk: ongrabar,
                okType: "primary", content: "Estás seguro de registrar información?",
            } );
        }
    };

    function onConfirmarDelete() {
        if ( !existValue() ) {
            C_Message( "error", "Actividad Económica no seleccionado" );
            return;
        };
        let ondelete = () => props.onDelete(actividadEconomica);
        C_Confirm( { title: "Eliminar Actividad Económica", onOk: ondelete } );
    };

    function onPressEnterID() {
        if ( existValue() )  props.onSearchData( actividadEconomica );
        else setVisibleAction(true);
    };

    function componentActividadEconomica() {
        if ( !visible_action ) return null;
        return (
            <M_ListadoActividadEconomica
                visible={visible_action}
                onClose={ () => setVisibleAction(false) }
                value={actividadEconomica.idactividadeconomica}
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
                    document.getElementById("actividadeconomica_print").click();
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
            <C_Option
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
                    document.getElementById('buttonactividadeconomica_xls').click();
                }, 1000);
                return;
            }
            if ( archivo.checked.xlsx && result.response == 1 ) {
                setTimeout(() => {
                    document.getElementById('buttonactividadeconomica_xlsx').click();
                }, 1000);
                return;
            }
            if ( archivo.checked.csv && result.response == 1 ) {
                setTimeout(() => {
                    document.getElementById('buttonactividadeconomica_csv').click();
                }, 1000);
                return;
            }
        } );
    };

    function componentArchivo() {
        return (
            <C_Archivo
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
                    title={ "REPORTE Actividad Económica" }
                    bodyStyle={{ padding: '5px 4px', }}
                    style={{ top: 10, }}
                >
                    <ActividadEconomicaPDF
                        actividadEconomica={actividadEconomica.reporte}
                    />
                </C_ModalDraggable>
            </>
        );
    };

    return (
        <>
            <C_Loading visible={ props.loading } />

            { componentActividadEconomica() }
            { componentOption() }
            { componentArchivo() }
            { componentPDF() }

            <ActividadEconomicaReport
                actividadEconomica={ actividadEconomica.reporte }
                archivo={ archivo }
                option={ option }
            />

            <div className="pt-2 pb-3" style={{ flexGrow: 1, width: "100%", }}>
                <C_Form
                    actividadEconomica={ actividadEconomica }
                    onChange={props.onChange}
                    disabled={disabled}
                    onPressEnter={onPressEnterID}
                />
            </div>
            <C_Footer
                disabled={disabled}

                onCreate={props.onCreate}
                onGrabar={onGrabarData}
                onUpdate={ () => props.onEditar( actividadEconomica ) }
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

IndexActividadEconomica.propTypes = {
    onClose:    PropTypes.func,
}

IndexActividadEconomica.defaultProps = {
    onClose: () => {},
}

const mapStateToProps = ( state ) => ( {
    actividadEconomica: state.actividadEconomica,

    disabled:    state.disabled,
    loading:     state.loading.visible,
    paginations: state.paginations,
    option:      state.printOption,
    archivo:     state.archivoOption,
} );

const mapDispatchToProps = {
    initData:     actividadEconomicaActions.initData,
    onChangePage: actividadEconomicaActions.onChangePage,

    onChange:   actividadEconomicaActions.onChange,
    onSetState: actividadEconomicaActions.setState,

    onCreate:   actividadEconomicaActions.onCreate,
    onGrabar:   actividadEconomicaActions.onGrabar,
    onEditar:   actividadEconomicaActions.onEditar,
    onUpdate:   actividadEconomicaActions.onUpdate,
    onDelete:   actividadEconomicaActions.onDelete,
    onImprimir: actividadEconomicaActions.onImprimir,

    onSearch:     actividadEconomicaActions.onSearch,
    onSearchData: actividadEconomicaActions.onSearchData,

    onCancelar: actividadEconomicaActions.onCancelar,

    onDisabledEvent: disabledActions.onAction,

    setPrintOption:    printOptionActions.setData,
    resetPrintOption:  printOptionActions.reset,

    setArchivoOption: archivoOptionActions.setData,
};

export default connect( mapStateToProps, mapDispatchToProps )( IndexActividadEconomica );
