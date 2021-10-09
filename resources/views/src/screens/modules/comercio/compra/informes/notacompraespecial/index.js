
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { C_Loading } from '../../../../../../components';
import C_Form from './components/form';

import { informeCompraActions } from '../../../../../../redux/actions/comercio/compra/informeCompraActions';
import { printOptionActions } from '../../../../../../redux/actions/config/printOptionActions';

import C_Archivo from './components/archivo';
import C_Option from './components/option';

function IndexInformeGeneralNotacompraEspecial( props ) {

    const { archivo, informeCompra, loading, onChange, option } = props;

    useEffect( ( ) => {
        if ( props.initData ) {
            props.initData();
        };
        // return () => { };
    }, [] );

    function componentOption() {
        return (
            <C_Option 
                option={option}
                onChange={props.setPrintOption}
                // onSubmit={ onSubmitOption }
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

    return (
        <>
            <C_Loading visible={ loading } />

            { componentOption() }
            { componentArchivo() }

            <div className="pt-2 pb-3 pl-4 pr-4" style={{ flexGrow: 1, width: "100%", }}>
                <C_Form 
                    informeCompra={informeCompra}
                    onChange={onChange}
                    onImprimir={ () => {
                        option.visible = true;
                        props.setPrintOption(option);
                    } }
                />
            </div>
        </>
    );
};

IndexInformeGeneralNotacompraEspecial.propTypes = {
    onClose:    PropTypes.func,
}

IndexInformeGeneralNotacompraEspecial.defaultProps = {
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
    // onImprimir: conceptoCompraActions.onImprimir,

    setPrintOption:    printOptionActions.setData,
    // resetPrintOption:  printOptionActions.reset,

    // setArchivoOption: archivoOptionActions.setData,
};

export default connect( mapStateToProps, mapDispatchToProps )( IndexInformeGeneralNotacompraEspecial );