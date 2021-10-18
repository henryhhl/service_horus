
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { C_Loading, C_ModalDraggable } from '../../../../../../components';
import C_Form from './components/form';

import { informeCompraActions } from '../../../../../../redux/actions/comercio/compra/informeCompraActions';
import { archivoOptionActions } from '../../../../../../redux/actions/config/archivoActions';
import { printOptionActions } from '../../../../../../redux/actions/config/printOptionActions';

import C_Archivo from './components/archivo';
import C_Option from './components/option';
import InformeCompraPDF from './report/informeCompraPDF';

function IndexInformeGeneralNotacompra( props ) {

    const { archivo, informeCompra, loading, onChange, option } = props;
    const [ visible_pdf, setVisiblePDF ] = useState( false );

    useEffect( ( ) => {
        if ( props.initData ) {
            props.initData();
        };
        // return () => { };
    }, [] );

    async function onSubmitOption() {
        if ( option.checked.archivo ) {
            await props.resetPrintOption();
            archivo.visible = true;
            await props.setArchivoOption(archivo);
            return;
        }
        props.onImprimir(informeCompra).then( async (result) => {
            // if ( option.checked.impresora && result.response == 1 ) {
            //     props.resetPrintOption();
            //     setTimeout( () => {
            //         document.getElementById("notacompra_print").click();
            //     }, 1000);
            //     return;
            // }
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

    function componentArchivo() {
        return (
            <C_Archivo 
                archivo={archivo}
                onChange={props.setArchivoOption}
                // onSubmit={ onSubmitArchivo }
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
                    width={"98%"}  zIndex={ 1200 }  
                    title={ "INOFRME NOTA COMPRA" }
                    bodyStyle={{ padding: '5px 4px', }}
                    style={{ top: 10, }}
                >
                    <InformeCompraPDF 
                        informeCompra={informeCompra.reporte}
                        formato={informeCompra.formato}
                    />
                </C_ModalDraggable>
            </>
        );
    };

    return (
        <>
            <C_Loading visible={ loading } />

            { componentOption() }
            { componentArchivo() }
            { componentPDF() }

            <div className="pt-2 pb-3 pl-4 pr-4" style={{ flexGrow: 1, width: "100%", }}>
                <C_Form 
                    informeCompra={informeCompra}
                    onChange={onChange}
                    // onImprimir={ () => {
                    //     option.visible = true;
                    //     props.setPrintOption(option);
                    // } }
                    onImprimir={ onSubmitOption }
                    onLimpiar={props.initData}
                />
            </div>
        </>
    );
};

IndexInformeGeneralNotacompra.propTypes = {
    onClose:    PropTypes.func,
}

IndexInformeGeneralNotacompra.defaultProps = {
    onClose: () => {},
}


const mapStateToProps = ( state ) => ( {
    informeCompra: state.informeCompra,

    loading:     state.loading.visible,
    option:      state.printOption,
    archivo:     state.archivoOption,
} );

const mapDispatchToProps = {
    initData:   informeCompraActions.initData,
    onChange:   informeCompraActions.onChange,
    onImprimir: informeCompraActions.onImprimir,

    setPrintOption:    printOptionActions.setData,
    resetPrintOption:  printOptionActions.reset,

    setArchivoOption: archivoOptionActions.setData,
};

export default connect( mapStateToProps, mapDispatchToProps )( IndexInformeGeneralNotacompra );