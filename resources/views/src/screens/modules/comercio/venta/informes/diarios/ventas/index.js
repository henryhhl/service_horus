
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { C_Loading, C_ModalDraggable } from '../../../../../../../components';
import C_Form from './components/form';

import { printOptionActions } from '../../../../../../../redux/actions/config/printOptionActions';
import { informeVentaActions } from '../../../../../../../redux/actions/comercio/inventario/informeVentaActions';

// import C_Archivo from './components/archivo';
import C_Option from './components/option';

function IndexInformeDiarioGeneralVenta( props ) {

    const { archivo, informeVenta, loading, option } = props;

    useEffect( ( ) => {
        if ( props.initData ) {
            props.initData();
        };
        // return () => { };
    }, [] );

    async function onSubmitOption() {
        // if ( option.checked.archivo ) {
        //     await props.resetPrintOption();
        //     archivo.visible = true;
        //     await props.setArchivoOption(archivo);
        //     return;
        // }
        props.onImprimir(informeVenta).then( async (result) => {
            if ( result.response == 1 ) {
                await props.resetPrintOption();
                setTimeout(() => {
                    informeVenta.visible_pdf = true;
                    props.onChange(informeVenta);
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

    // function componentArchivo() {
    //     return (
    //         <C_Archivo 
    //             archivo={archivo}
    //             onChange={props.setArchivoOption}
    //             // onSubmit={ onSubmitArchivo }
    //         />
    //     );
    // };

    function componentPDF() {
        if ( !informeVenta.visible_pdf ) return null;
        return (
            <>
                <C_ModalDraggable
                    visible={ informeVenta.visible_pdf } 
                    onClose={ () => {
                        informeVenta.visible_pdf = false;
                        props.onChange(informeVenta);
                    } }
                    width={"98%"}  zIndex={ 1200 }
                    title={ "INFORME NOTA VENTA" }
                    bodyStyle={{ padding: '5px 4px', }}
                    style={{ top: 10, }}
                >
                    {/* <InformeCompraPDF 
                        informeCompra={informeCompra.reporte}
                        formato={informeCompra.formato}
                    /> */}
                </C_ModalDraggable>
            </>
        );
    }

    return (
        <>
            <C_Loading visible={ loading } />

            { componentOption() }
            {/* { componentArchivo() } */}
            { componentPDF() }

            <div className="pt-2 pb-3 pl-4 pr-4" style={{ flexGrow: 1, width: "100%", }}>
                <C_Form 
                    informeVenta={informeVenta}
                    onLimpiar={props.onLimpiar}
                    onImprimir={ () => {
                        option.visible = true;
                        props.setPrintOption(option);
                    } }
                    onClose={props.onClose}
                />
            </div>
        </>
    );
};

IndexInformeDiarioGeneralVenta.propTypes = {
    onClose: PropTypes.func,
}

IndexInformeDiarioGeneralVenta.defaultProps = {
    onClose: () => {},
}


const mapStateToProps = ( state ) => ( {
    informeVenta: state.informeVenta,
    loading:      state.loading.visible,
    option:       state.printOption,
    archivo:      state.archivoOption,
} );

const mapDispatchToProps = {
    initData:   informeVentaActions.initData,
    onLimpiar:   informeVentaActions.onLimpiar,
    onImprimir: informeVentaActions.onImprimir,
    onChange: informeVentaActions.onChange,

    setPrintOption:    printOptionActions.setData,
    resetPrintOption:  printOptionActions.reset,
    // setArchivoOption: archivoOptionActions.setData,
};

export default connect( mapStateToProps, mapDispatchToProps )( IndexInformeDiarioGeneralVenta );