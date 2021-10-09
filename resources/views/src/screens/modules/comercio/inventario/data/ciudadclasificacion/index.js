
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { C_Confirm, C_Footer, C_Loading, C_Message, C_ModalDraggable } from '../../../../../../components';

import { ciudadClasificacionActions } from '../../../../../../redux/actions/comercio/inventario/ciudadClasificacionActions';
import { visibleActions } from '../../../../../../redux/actions/config/visibleActions';

import M_ListadoCiudadClasificacion from './modal/listado';
import C_Form from './components/form';

import { disabledActions } from '../../../../../../redux/actions/config/disabledActions';
import { printOptionActions } from '../../../../../../redux/actions/config/printOptionActions';
import { archivoOptionActions } from '../../../../../../redux/actions/config/archivoActions';

import ArchivoCiudadClasificacion from './components/archivo';
import OptionCiudadClasificacion from './components/option';

import CiudadClasificacionReport from './report';
import CiudadClasificacionPDF from './report/ciudadClasificacionPDF';

function IndexCiudadClasificacion( props ) {
    const { archivo, ciudadClasificacion, disabled, option, paginations, visible } = props;
    
    const [ visible_pdf, setVisiblePDF ] = useState( false );

    useEffect( () => {
        props.initData();
        // return () => { };
    }, [] );

    function existValue() {
        if ( ciudadClasificacion.idciudadclasificacion ) {
            return ( ciudadClasificacion.idciudadclasificacion.toString().trim().length > 0 );
        };
        return false;
    }

    function onGrabarData() {
        if( ciudadClasificacion.update )  props.onUpdate( ciudadClasificacion );
        else props.onGrabar( ciudadClasificacion )
    };

    function onConfirmarDelete() {
        if ( !existValue() ) {
            C_Message( "error", "Ciudad Clasificación no seleccionado" );
            return;
        };
        let ondelete = () => props.onDelete(ciudadClasificacion);
        C_Confirm( { title: "Eliminar Ciudad Clasificación", onOk: ondelete } );
    };

    function onPressEnterID() {
        if ( existValue() )  props.onSearchData( ciudadClasificacion );
        else props.onShowCiudadClasificacion();
    };

    function componentCiudadClasificacion() {
        if ( !visible.visible_ciudadclasificacion ) return null;
        return (
            <M_ListadoCiudadClasificacion
                visible={visible.visible_ciudadclasificacion}
                onClose={props.onHideCiudadClasificacion}
                value={ciudadClasificacion.idciudadclasificacion}
                onChange={ async ( data ) => {
                    await props.onSetState(data);
                    await props.onHideCiudadClasificacion();
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
                    document.getElementById("ciudadclasificacion_print").click();
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
            <OptionCiudadClasificacion 
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
                    document.getElementById('buttonciudadclasificacion_xls').click();
                }, 1000);
                return;
            }
            if ( archivo.checked.xlsx && result.response == 1 ) {
                setTimeout(() => {
                    document.getElementById('buttonciudadclasificacion_xlsx').click();
                }, 1000);
                return;
            }
            if ( archivo.checked.csv && result.response == 1 ) {
                setTimeout(() => {
                    document.getElementById('buttonciudadclasificacion_csv').click();
                }, 1000);
                return;
            }
        } );
    };

    function componentArchivo() {
        return (
            <ArchivoCiudadClasificacion 
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
                        // ciudadClasificacion.imprimir = false;
                        // props.onChange( ciudadClasificacion );
                        setVisiblePDF( false );
                    } }
                    maskStyle={{ background: "transparent", }}
                    width={"90%"}  zIndex={ 1200 }  
                    title={ "REPORTE CIUDAD CLASIFICACIÓN" }
                    bodyStyle={{ padding: '5px 4px', }}
                    style={{ top: 10, }}
                >
                    <CiudadClasificacionPDF 
                        ciudadClasificacion={ciudadClasificacion.reporte}
                    />
                </C_ModalDraggable>
            </>
        );
    };

    return (
        <>
            <C_Loading visible={ props.loading } />

            { componentCiudadClasificacion() }
            { componentOption() }
            { componentArchivo() }
            { componentPDF() }

            <CiudadClasificacionReport
                ciudadClasificacion={ ciudadClasificacion.reporte }
                archivo={ archivo }
                option={ option }
            />

            <div className="pt-2 pb-2" style={{ flexGrow: 1, width: "100%", }}>
                <C_Form 
                    ciudadClasificacion={ ciudadClasificacion }
                    onChange={props.onChange}
                    disabled={disabled}
                    onPressEnter={onPressEnterID}
                />
            </div>
            <C_Footer 
                disabled={disabled}

                onCreate={props.onCreate}
                onGrabar={onGrabarData}
                onUpdate={ () => props.onEditar( ciudadClasificacion ) }
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

IndexCiudadClasificacion.propTypes = {
    onClose:    PropTypes.func,
}

IndexCiudadClasificacion.defaultProps = {
    onClose: () => {},
}

const mapStateToProps = ( state ) => ( {
    ciudadClasificacion: state.ciudadClasificacion,

    visible:     state.visible,
    disabled:    state.disabled,
    loading:     state.loading.visible,
    paginations: state.paginations,
    option:      state.printOption,
    archivo:     state.archivoOption,
} );

const mapDispatchToProps = {
    initData:     ciudadClasificacionActions.initData,
    onChangePage: ciudadClasificacionActions.onChangePage,

    onChange:   ciudadClasificacionActions.onChange,
    onSetState: ciudadClasificacionActions.setState,

    onCreate:   ciudadClasificacionActions.onCreate,
    onGrabar:   ciudadClasificacionActions.onGrabar,
    onEditar:   ciudadClasificacionActions.onEditar,
    onUpdate:   ciudadClasificacionActions.onUpdate,
    onDelete:   ciudadClasificacionActions.onDelete,
    onImprimir: ciudadClasificacionActions.onImprimir,

    onSearch:     ciudadClasificacionActions.onSearch,
    onSearchData: ciudadClasificacionActions.onSearchData,

    onCancelar: ciudadClasificacionActions.onCancelar,

    onShowCiudadClasificacion: visibleActions.showCiudadClasificacion,
    onHideCiudadClasificacion: visibleActions.hideCiudadClasificacion,

    onDisabledEvent: disabledActions.onAction,

    setPrintOption:    printOptionActions.setData,
    resetPrintOption:  printOptionActions.reset,

    setArchivoOption: archivoOptionActions.setData,
};

export default connect( mapStateToProps, mapDispatchToProps )(IndexCiudadClasificacion);
