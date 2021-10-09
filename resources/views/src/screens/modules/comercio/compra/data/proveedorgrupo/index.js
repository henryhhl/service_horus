
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { C_Confirm, C_Footer, C_Loading, C_Message, C_ModalDraggable } from '../../../../../../components';

import M_ListadoProveedorGrupo from './modal/listado';
import C_Form from './components/form';

import { proveedorGrupoActions } from '../../../../../../redux/actions/comercio/compra/proveedorGrupoActions';

import { disabledActions } from '../../../../../../redux/actions/config/disabledActions';
import { printOptionActions } from '../../../../../../redux/actions/config/printOptionActions';
import { archivoOptionActions } from '../../../../../../redux/actions/config/archivoActions';

import ArchivoProveedorGrupo from './components/archivo';
import OptionProveedorGrupo from './components/option';

import ProveedorGrupoReport from './report';
import ProveedorGrupoPDF from './report/proveedorGrupoPDF';

function IndexProveedorGrupo( props ) {
    const { archivo, proveedorGrupo, disabled, option, paginations } = props;
    
    const [ visible_pdf, setVisiblePDF ] = useState( false );
    const [ visible_action, setVisibleAction ] = useState( false );

    useEffect( () => {
        props.initData();
        // return () => { };
    }, [] );

    function existValue() {
        if ( proveedorGrupo.idproveedorgrupo ) {
            return ( proveedorGrupo.idproveedorgrupo.toString().trim().length > 0 );
        };
        return false;
    }

    function onGrabarData() {
        if( proveedorGrupo.update )  props.onUpdate( proveedorGrupo );
        else props.onGrabar( proveedorGrupo )
    };

    function onConfirmarDelete() {
        if ( !existValue() ) {
            C_Message( "error", "GRUPO PROVEEDOR no seleccionado" );
            return;
        };
        let ondelete = () => props.onDelete(proveedorGrupo);
        C_Confirm( { title: "Eliminar GRUPO PROVEEDOR", onOk: ondelete } );
    };

    function onPressEnterID() {
        if ( existValue() )  props.onSearchData( proveedorGrupo );
        else setVisibleAction(true);
    };

    function componentProveedorGrupo() {
        if ( !visible_action ) return null;
        return (
            <M_ListadoProveedorGrupo
                visible={visible_action}
                onClose={ () => setVisibleAction(false) }
                value={proveedorGrupo.idproveedorgrupo}
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
                    document.getElementById("proveedorgrupo_print").click();
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
            <OptionProveedorGrupo 
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
                    document.getElementById('buttonproveedorgrupo_xls').click();
                }, 1000);
                return;
            }
            if ( archivo.checked.xlsx && result.response == 1 ) {
                setTimeout(() => {
                    document.getElementById('buttonproveedorgrupo_xlsx').click();
                }, 1000);
                return;
            }
            if ( archivo.checked.csv && result.response == 1 ) {
                setTimeout(() => {
                    document.getElementById('buttonproveedorgrupo_csv').click();
                }, 1000);
                return;
            }
        } );
    };

    function componentArchivo() {
        return (
            <ArchivoProveedorGrupo 
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
                    title={ "REPORTE GRUPO PROVEEDOR" }
                    bodyStyle={{ padding: '5px 4px', }}
                    style={{ top: 10, }}
                >
                    <ProveedorGrupoPDF 
                        proveedorGrupo={proveedorGrupo.reporte}
                    />
                </C_ModalDraggable>
            </>
        );
    };

    return (
        <>
            <C_Loading visible={ props.loading } />

            { componentProveedorGrupo() }
            { componentOption() }
            { componentArchivo() }
            { componentPDF() }

            <ProveedorGrupoReport
                proveedorGrupo={ proveedorGrupo.reporte }
                archivo={ archivo }
                option={ option }
            />

            <div className="pt-2 pb-3" style={{ flexGrow: 1, width: "100%", }}>
                <C_Form 
                    proveedorGrupo={ proveedorGrupo }
                    onChange={props.onChange}
                    disabled={disabled}
                    onPressEnter={onPressEnterID}
                />
            </div>
            <C_Footer 
                disabled={disabled}

                onCreate={props.onCreate}
                onGrabar={onGrabarData}
                onUpdate={ () => props.onEditar( proveedorGrupo ) }
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

IndexProveedorGrupo.propTypes = {
    onClose:    PropTypes.func,
}

IndexProveedorGrupo.defaultProps = {
    onClose: () => {},
}

const mapStateToProps = ( state ) => ( {
    proveedorGrupo: state.proveedorGrupo,

    disabled:    state.disabled,
    loading:     state.loading.visible,
    paginations: state.paginations,
    option:      state.printOption,
    archivo:     state.archivoOption,
} );

const mapDispatchToProps = {
    initData:     proveedorGrupoActions.initData,
    onChangePage: proveedorGrupoActions.onChangePage,

    onChange:   proveedorGrupoActions.onChange,
    onSetState: proveedorGrupoActions.setState,

    onCreate:   proveedorGrupoActions.onCreate,
    onGrabar:   proveedorGrupoActions.onGrabar,
    onEditar:   proveedorGrupoActions.onEditar,
    onUpdate:   proveedorGrupoActions.onUpdate,
    onDelete:   proveedorGrupoActions.onDelete,
    onImprimir: proveedorGrupoActions.onImprimir,

    onSearch:     proveedorGrupoActions.onSearch,
    onSearchData: proveedorGrupoActions.onSearchData,

    onCancelar: proveedorGrupoActions.onCancelar,

    onDisabledEvent: disabledActions.onAction,

    setPrintOption:    printOptionActions.setData,
    resetPrintOption:  printOptionActions.reset,

    setArchivoOption: archivoOptionActions.setData,
};

export default connect( mapStateToProps, mapDispatchToProps )( IndexProveedorGrupo );
