
import React from 'react';
import PropTypes from 'prop-types';

import { MenuItem, TextField } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';

import { Functions } from '../../utils/functions';
const { existeData } = Functions;

import './css/input.css';

function C_Input( props ) {

    const { } = props;

    function onComponent() {

        let label = existeData( props.label ) ? props.label : "";

        let style = { width: '100%', minWidth: '100%', };
        style = Object.assign( style,  props.style );

        if ( props.disabled ) {
            style = Object.assign( style, { background: '#f5f5f5', } );
        }

        let value = props.value;
        value = existeData( value ) ? value : "";

        return (
            <div className={ props.column } style={{ paddingTop: 12, position: 'relative', display: 'flex', alignItems: 'center', }}>
                <TextField
                    label={label}
                    id={props.id}
                    name={props.name}
                    type={props.type}

                    style={style}
                    variant={props.variant}
                    size={props.size}
                    color={props.color}
                    className={ props.multiline ? "" : "componentInputReact" }
                    placeholder={ props.placeholder }
                    value={value}
                    error={props.error}
                    helperText={props.message}
                    required={props.required}
                    autoFocus={props.autoFocus}
                    disabled={props.disabled}

                    multiline={props.multiline}
                    maxRows={props.maxRows}
                    minRows={props.minRows}
                    
                    fullWidth={true}
                    onChange={ ( event ) => {
                        if ( props.onChange ) {
                            props.onChange( event.target.value );
                        }
                    } }
                    onClick={ props.onClick }
                    onKeyPress={ ( event ) => {
                        if ( event.key == "Enter" ) {
                            if ( props.onPressEnter ) {
                                props.onPressEnter();
                            }
                        }
                    } }
                    onFocus={ ( event ) => {
                        if ( props.onFocus ) props.onFocus( event );
                        if ( props.select ) return;
                        event.target.setSelectionRange( 0, value.toString().length );
                    } }
                    onBlur={props.onBlur}
                    select={props.select}
                    InputProps={ { 
                        readOnly: ( props.readOnly || props.select ),
                        endAdornment: (
                            ( ( !existeData( props.suffix ) || Functions.esBoolean(props.select) ) ? null :
                                <InputAdornment position="end">
                                    { props.suffix }
                                </InputAdornment>
                            )
                        ),
                        startAdornment: (
                            ( ( !existeData( props.prefix ) ) ? null :
                                <InputAdornment position="start">
                                    { props.prefix }
                                </InputAdornment>
                            )
                        ),
                        // draggable: true,
                        onDrag: ( event ) => {  },
                        onDragEnd: ( event ) => {  },
                        inputRef: (value) => {
                            if (value != null) {
                                if ( props.focus ) {
                                    value.focus();
                                }
                            }
                        },
                    } }
                >
                    {
                        ( ( !props.select ) ? null : 
                            <MenuItem key={0} value={ value }>
                                { value }
                            </MenuItem>
                        )
                    }
                </TextField>
                { (existeData( props.suffix ) && Functions.esBoolean( props.select ) ) && 
                    <span style={{ position: 'relative', left: -28, }}>
                        { props.suffix }
                    </span> 
                }
            </div>
        );
    }

    return (
        <>
            { onComponent() }
        </>
    );

};

C_Input.propTypes = {
    column:      PropTypes.string,
    placeholder: PropTypes.string,
    variant:     PropTypes.string,
    size:        PropTypes.string,
    id:          PropTypes.string,
    color:       PropTypes.string,
    name:        PropTypes.string,
    type:        PropTypes.string,
    
    style: PropTypes.object,
    
    error:       PropTypes.bool,
    required:    PropTypes.bool,
    autoFocus:   PropTypes.bool,
    readOnly:    PropTypes.bool,
    focus:       PropTypes.bool,
    select:      PropTypes.bool,
    disabled:    PropTypes.bool,
    multiline:   PropTypes.bool,
    
    value:   PropTypes.any,
    maxRows: PropTypes.any,
    minRows: PropTypes.any,
    
    message: PropTypes.node,
    prefix:  PropTypes.node,
    suffix:  PropTypes.node,
    label:   PropTypes.node,

    onClick:      PropTypes.func,
    onChange:     PropTypes.func,
    onPressEnter: PropTypes.func,
    onFocus:      PropTypes.func,
    onBlur:       PropTypes.func,
}


C_Input.defaultProps = {

    column:      "",
    placeholder: "",
    message:     "",
    value:       "",
    variant:     "outlined", // filled, standard
    size:        "small",    // medium
    color:       "primary",  // secondary
    type:        "text",
    
    style: {},
    
    error:       false,
    required:    false,
    autoFocus:   false,
    readOnly:    false,
    focus:       false,
    select:      false,
    disabled:    false,
    multiline:   false,
    
    titleText: null,
    prefix:    null,
    suffix:    null,

}

export default C_Input;
