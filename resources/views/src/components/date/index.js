
import React from 'react';
import PropTypes from 'prop-types';

import { DatePicker } from 'antd';
import moment from 'moment';
import { Functions } from '../../utils/functions';

import './css/date.css';

function C_Date( props ) {
    const {} = props;

    function onComponent() {
        let label = "lbls-date active";
        let style = { width: '100%', minWidth: '100%', };
        style = Object.assign( style,  props.style );
        return (
            <div className={ props.column } style={{ paddingTop: 12, position: 'relative', }}>
                {
                    props.label &&
                    <label className={ label }
                    >
                        { props.label }
                    </label>
                }
                <DatePicker
                    size={props.size}
                    popupStyle={{ zIndex: 9999, }}
                    style={ style }
                    placeholder={props.placeholder}
                    format={props.format}
                    allowClear={props.allowClear}
                    picker={props.picker}
                    disabled={props.disabled}
                    value={ ( props.value != null && props.value != "" && props.value != undefined ) ? moment( props.value, props.format ) : undefined }
                    onChange={ ( date, dateString ) => {
                        if ( props.onChange ) {
                            props.onChange( dateString );
                        }
                    } }
                    className={ Functions.esBoolean( props.error ) ? "border-danger-error" : "" }
                />
                { Functions.esBoolean( props.error ) &&
                    <div className="ant-form-item-explain ant-form-item-explain-error">
                        <div role="alert" style={{ fontSize: 10, }}>
                            {props.message}
                        </div>
                    </div>
                }
            </div>
        );
    };

    return (
        <>
            { onComponent() }
        </>
    );
};


C_Date.propTypes = {
    size:        PropTypes.string,
    placeholder: PropTypes.string,
    column:      PropTypes.string,
    format:      PropTypes.string,
    picker:      PropTypes.string,

    error:      PropTypes.bool,
    allowClear: PropTypes.bool,
    disabled:   PropTypes.bool,

    message: PropTypes.node,
    label:   PropTypes.node,

    style: PropTypes.object,
};

C_Date.defaultProps = {
    size:        "small",
    placeholder: "SELECCIONAR FECHA",
    column:      "",
    format:      "DD/MM/YYYY",
    picker:      "date",

    error:      false,
    allowClear: true,
    disabled:   false,
};

export default C_Date;
