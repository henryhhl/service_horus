
import React from 'react';
import PropTypes from "prop-types";

import C_Checkbox from '../checkbox';
import C_Button from '../button';

function C_ArchivoOption( props ) {
    const {} = props;

    function onCheckedXLS() {
        let checked  = props.checked;
        checked.xls  = true;
        checked.xlsx = false;
        checked.csv  = false;
        checked.pdf  = false;
        if ( props.onChange ) {
            props.onChange( checked );
        }
    };

    function onCheckedXLSX() {
        let checked  = props.checked;
        checked.xls  = false;
        checked.xlsx = true;
        checked.csv  = false;
        checked.pdf  = false;
        if ( props.onChange ) {
            props.onChange( checked );
        }
    };

    function onCheckedCSV() {
        let checked  = props.checked;
        checked.xls  = false;
        checked.xlsx = false;
        checked.csv  = true;
        checked.pdf  = false;
        if ( props.onChange ) {
            props.onChange( checked );
        }
    };

    function onCheckedPDF() {
        let checked  = props.checked;
        checked.xls  = false;
        checked.xlsx = false;
        checked.csv  = false;
        checked.pdf  = true;
        if ( props.onChange ) {
            props.onChange( checked );
        }
    };

    return (
        <div className='form-group pt-2'>
            <div className={"cols-sm-12 p-0"}>
                <div className="col-sm-12 mb-1">
                    <C_Checkbox 
                        checked={ props.checked.xls }
                        titleText={'XLS'}
                        onChange={ onCheckedXLS }
                    />
                </div>
                <div className="col-sm-12 mb-1">
                    <C_Checkbox 
                        checked={ props.checked.xlsx }
                        titleText={'XLSX'}
                        onChange={ onCheckedXLSX }
                    />
                </div>
                <div className="col-sm-12 mb-1">
                    <C_Checkbox 
                        checked={ props.checked.csv }
                        titleText={'CSV'}
                        onChange={ onCheckedCSV }
                    />
                </div>
            </div>
            <div className="col-sm-12 mt-2 border-top pt-2 pb-1 d-flex justify-content-center">
                <C_Button
                    onClick={ props.onSubmit }
                >
                    Aceptar
                </C_Button>
            </div>
        </div>
    );
};

C_ArchivoOption.propTypes = {
    checked:  PropTypes.object,

    onChange: PropTypes.func,
    onSubmit: PropTypes.func,
};

C_ArchivoOption.defaultProps = {
    checked: {
        xls: false,
        xlsx: false,
        csv: false,
        pdf: false,
    },
};


export default C_ArchivoOption;
