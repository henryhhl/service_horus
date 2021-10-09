
import React from 'react';
import PropTypes from "prop-types";

import C_Checkbox from '../checkbox';
import C_Button from '../button';

function C_PrintOption( props ) {
    const { checked } = props;

    function onCheckedPantalla() {
        let checked       = props.checked;
        checked.pantalla  = true;
        checked.impresora = false;
        checked.archivo   = false;
        if ( props.onChange ) {
            props.onChange( checked );
        }
    }
    function onCheckedImpresora() {
        let checked       = props.checked;
        checked.pantalla  = false;
        checked.impresora = true;
        checked.archivo   = false;
        if ( props.onChange ) {
            props.onChange( checked );
        }
    }
    function onCheckedArchivo() {
        let checked       = props.checked;
        checked.pantalla  = false;
        checked.impresora = false;
        checked.archivo   = true;
        if ( props.onChange ) {
            props.onChange( checked );
        }
    }

    return (
        <div className='form-group pt-2 mb-0 pb-0'>
            <div className="col-sm-12 mb-1">
                <C_Checkbox 
                    checked={checked.pantalla}
                    titleText={'Pantalla'}
                    onChange={ onCheckedPantalla }
                />
            </div>
            <div className="col-sm-12 mb-1">
                <C_Checkbox 
                    checked={checked.impresora}
                    titleText={'Impresora'}
                    onChange={ onCheckedImpresora }
                />
            </div>
            <div className="col-sm-12 mb-1">
                <C_Checkbox 
                    checked={checked.archivo}
                    titleText={'Archivo'}
                    onChange={ onCheckedArchivo }
                />
            </div>
            <div className="col-sm-12 mt-2 border-top pt-2 d-flex justify-content-center">
                <C_Button 
                    onClick={ props.onSubmit }
                >
                    Aceptar
                </C_Button>
            </div>
        </div>
    );
};

C_PrintOption.propTypes = {
    checked: PropTypes.object,

    onChange: PropTypes.func,
    onSubmit: PropTypes.func,
};

C_PrintOption.defaultProps = {
    checked: {
        pantalla:  false,
        impresora: false,
        archivo:   false,
    },
};

export default C_PrintOption;
