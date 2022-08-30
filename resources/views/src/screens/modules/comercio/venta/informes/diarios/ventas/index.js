
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { C_Loading } from '../../../../../../../components';
import C_Form from './components/form';

import { printOptionActions } from '../../../../../../../redux/actions/config/printOptionActions';
import { informeVentaActions } from '../../../../../../../redux/actions/comercio/inventario/informeVentaActions';

// import C_Archivo from './components/archivo';
// import C_Option from './components/option';

function IndexInformeDiarioGeneralVenta( props ) {

    const { archivo, informeVenta, loading, option } = props;

    useEffect( ( ) => {
        if ( props.initData ) {
            props.initData();
        };
        // return () => { };
    }, [] );

    // function componentOption() {
    //     return (
    //         <C_Option 
    //             option={option}
    //             onChange={props.setPrintOption}
    //             // onSubmit={ onSubmitOption }
    //         />
    //     );
    // };

    // function componentArchivo() {
    //     return (
    //         <C_Archivo 
    //             archivo={archivo}
    //             onChange={props.setArchivoOption}
    //             // onSubmit={ onSubmitArchivo }
    //         />
    //     );
    // };

    return (
        <>
            <C_Loading visible={ loading } />

            {/* { componentOption() }
            { componentArchivo() } */}

            <div className="pt-2 pb-3 pl-4 pr-4" style={{ flexGrow: 1, width: "100%", }}>
                <C_Form 
                    informeVenta={informeVenta}
                    setState={props.setState}
                    onImprimir={ () => {
                        option.visible = true;
                        props.setPrintOption(option);
                    } }
                />
            </div>
        </>
    );
};

IndexInformeDiarioGeneralVenta.propTypes = {
    onClose:    PropTypes.func,
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
    setState:   informeVentaActions,
    // onImprimir: conceptoCompraActions.onImprimir,

    setPrintOption:    printOptionActions.setData,
    // resetPrintOption:  printOptionActions.reset,

    // setArchivoOption: archivoOptionActions.setData,
};

export default connect( mapStateToProps, mapDispatchToProps )( IndexInformeDiarioGeneralVenta );