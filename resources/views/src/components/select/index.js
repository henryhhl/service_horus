
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { Select } from 'antd';
const { Option } = Select;
import './css/select.css';
import { Functions } from '../../utils/functions';

export default function C_Select( props ) {
    const {} = props;
    const [focus, setFocus] = React.useState(false);

    function onFocus(event) {
        if ( !Functions.esBoolean( props.disabled ) ) {
            setFocus(true);
        }
    };

    function onBlur() {
        setFocus(false);
    };

    function onComponent() {
        let label = "lbls-select active";
        // label = ( focus ) ? 'lbls-select active' : ( props.value?.toString().length > 0 ) ? "lbls-select active" : "lbls-select";
        let value = props.value;
        value = (value == null || value == "") ? undefined : value;
        return (
            <div className={ props.column } style={{ paddingTop: 12, position: 'relative', }}>
                {
                    props.label && 
                    <label className={ label } htmlFor={"idSelect"}
                        // onClick={ () => {
                        //     document.getElementById("idSelect").click();
                        // } }
                    >
                        { props.label }
                    </label>
                }
                <Select
                    id={"idSelect"}
                    value={ value }
                    onChange={props.onChange}
                    style={ { 
                        width: '100%', minWidth: '100%', maxWidth: '100%', fontWeight: '400',
                        fontSize: 13, color: 'rgba(0, 0, 0, 0.87)',
                    } }
                    size={props.size}
                    placeholder={props.placeholder}
                    autoFocus={props.autoFocus}
                    allowClear={props.allowClear}
                    disabled={props.disabled}
                    dropdownStyle={ { zIndex: 9999, }}
                    className={ Functions.esBoolean( props.error ) ? "border-danger-error" : "" }
                    onFocus={onFocus}
                    onBlur={onBlur}
                    // ref={ ( value ) => {
                    //     if ( value != null && focus ) {
                    //         value.focus();
                    //     }
                    // } }
                >
                    { Array.isArray( props.data ) && 
                        props.data.map( ( item, key ) => {
                            return (
                                <Option key={key} value={ item[props.option.value] } disabled={ item.disabled === true }>
                                    { item[props.option.title] }
                                </Option>
                            );
                        } )
                    }
                </Select>
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
}

C_Select.propTypes = {
    size:       PropTypes.string,
    allowClear: PropTypes.bool,
    disabled:   PropTypes.bool,
    autoFocus:  PropTypes.bool,
    error:      PropTypes.bool,

    placeholder: PropTypes.string,
    column:      PropTypes.string,
    label:       PropTypes.node,
    value:       PropTypes.any,

    onChange:     PropTypes.func,
    onPressEnter: PropTypes.func,

    data: PropTypes.array,
    option: PropTypes.object,

    prefix:  PropTypes.node,
    suffix:  PropTypes.node,
    message: PropTypes.node,
};

C_Select.defaultProps = {
    size:       "small",
    placeholder: "",
    column:      "",
    message:     "Campo requerido",

    data: [],
    option: {
        title: "title",
        value: "value",
    },

    allowClear: false,
    disabled:   false,
    autoFocus:  false,
    error:      false,
};

