
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { C_Confirm, C_Footer, C_Loading, C_Message, C_ModalDraggable } from '../../../../../../components';

import M_ListadoUnionSucursal from './modal/listado';
import C_Form from './components/form';

import { unionSucursalActions } from '../../../../../../redux/actions/comercio/venta/unionSucursalActions';

import { disabledActions } from '../../../../../../redux/actions/config/disabledActions';
import { printOptionActions } from '../../../../../../redux/actions/config/printOptionActions';
import { archivoOptionActions } from '../../../../../../redux/actions/config/archivoActions';

import ArchivoUnionSucursal from './components/archivo';
import OptionUnionSucursal from './components/option';

import UnionSucursalReport from './report';
import UnionSucursalPDF from './report/unionSucursalPDF';

function IndexUnionSucursal( props ) {
    const { archivo, unionSucursal, disabled, option, paginations } = props;
    
    const [ visible_pdf, setVisiblePDF ] = useState( false );
    const [ visible_action, setVisibleAction ] = useState( false );

    useEffect( () => {
        props.initData();
        // return () => { };
    }, [] );

    function existValue() {
        if ( unionSucursal.idunionsucursal ) {
            return ( unionSucursal.idunionsucursal.toString().trim().length > 0 );
        };
        return false;
    }

    function onGrabarData() {
        if( unionSucursal.update )  props.onUpdate( unionSucursal );
        else props.onGrabar( unionSucursal )
    };

    function onConfirmarDelete() {
        if ( !existValue() ) {
            C_Message( "error", "Unión Sucursal no seleccionado" );
            return;
        };
        let ondelete = () => props.onDelete(unionSucursal);
        C_Confirm( { title: "Eliminar Unión Sucursal", onOk: ondelete } );
    };

    function onPressEnterID() {
        if ( existValue() )  props.onSearchData( unionSucursal );
        else setVisibleAction(true);
    };

    function componentUnionSucursal() {
        if ( !visible_action ) return null;
        return (
            <M_ListadoUnionSucursal
                visible={visible_action}
                onClose={ () => setVisibleAction(false) }
                value={unionSucursal.idunionsucursal}
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
                    document.getElementById("unionsucursal_print").click();
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
            <OptionUnionSucursal 
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
                    document.getElementById('buttonunionsucursal_xls').click();
                }, 1000);
                return;
            }
            if ( archivo.checked.xlsx && result.response == 1 ) {
                setTimeout(() => {
                    document.getElementById('buttonunionsucursal_xlsx').click();
                }, 1000);
                return;
            }
            if ( archivo.checked.csv && result.response == 1 ) {
                setTimeout(() => {
                    document.getElementById('buttonunionsucursal_csv').click();
                }, 1000);
                return;
            }
        } );
    };

    function componentArchivo() {
        return (
            <ArchivoUnionSucursal 
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
                    title={ "REPORTE UNIÓN SUCURSAL" }
                    bodyStyle={{ padding: '5px 4px', }}
                    style={{ top: 10, }}
                >
                    <UnionSucursalPDF 
                        unionSucursal={unionSucursal.reporte}
                    />
                </C_ModalDraggable>
            </>
        );
    };

    return (
        <>
            <C_Loading visible={ props.loading } />

            { componentUnionSucursal() }
            { componentOption() }
            { componentArchivo() }
            { componentPDF() }

            <UnionSucursalReport
                unionSucursal={ unionSucursal.reporte }
                archivo={ archivo }
                option={ option }
            />

            <div className="pt-2 pb-3" style={{ flexGrow: 1, width: "100%", }}>
                <C_Form 
                    unionSucursal={ unionSucursal }
                    onChange={props.onChange}
                    disabled={disabled}
                    onPressEnter={onPressEnterID}
                />
            </div>
            <C_Footer 
                disabled={disabled}

                onCreate={props.onCreate}
                onGrabar={onGrabarData}
                onUpdate={ () => props.onEditar( unionSucursal ) }
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

IndexUnionSucursal.propTypes = {
    onClose:    PropTypes.func,
}

IndexUnionSucursal.defaultProps = {
    onClose: () => {},
}

const mapStateToProps = ( state ) => ( {
    unionSucursal: state.unionSucursal,

    visible:     state.visible,
    disabled:    state.disabled,
    loading:     state.loading.visible,
    paginations: state.paginations,
    option:      state.printOption,
    archivo:     state.archivoOption,
} );

const mapDispatchToProps = {
    initData:     unionSucursalActions.initData,
    onChangePage: unionSucursalActions.onChangePage,

    onChange:   unionSucursalActions.onChange,
    onSetState: unionSucursalActions.setState,

    onCreate:   unionSucursalActions.onCreate,
    onGrabar:   unionSucursalActions.onGrabar,
    onEditar:   unionSucursalActions.onEditar,
    onUpdate:   unionSucursalActions.onUpdate,
    onDelete:   unionSucursalActions.onDelete,
    onImprimir: unionSucursalActions.onImprimir,

    onSearch:     unionSucursalActions.onSearch,
    onSearchData: unionSucursalActions.onSearchData,

    onCancelar: unionSucursalActions.onCancelar,

    onDisabledEvent: disabledActions.onAction,

    setPrintOption:    printOptionActions.setData,
    resetPrintOption:  printOptionActions.reset,

    setArchivoOption: archivoOptionActions.setData,
};

export default connect( mapStateToProps, mapDispatchToProps )( IndexUnionSucursal );
