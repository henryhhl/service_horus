
import React from 'react';
import PropTypes from 'prop-types';

import { Checkbox } from 'antd';
import { Functions } from '../../utils/functions';

function C_Checkbox( props ) {

    function onValidateComponent() {
        if ( Functions.esBoolean( props.disabled ) ) {
            return (
                <Checkbox 
                    defaultChecked={false} disabled
                    checked={ props.checked }
                    // prefix={this.props.prefix}
                    // suffix={this.props.suffix}
                >
                    { (Functions.existeData(props.titleText)) ?
                        <span style={{ position: 'relative', left: -8, paddingLeft: 3, }}> {props.titleText} </span> : null
                    }
                </Checkbox>
            );
        }
        return (
            <div className="custom-checkbox custom-control mr-1">
                <input type="checkbox" checked={ props.checked }
                    className="custom-control-input" 
                    readOnly={props.readOnly}
                    onChange={ () => {
                        if ( Functions.existeData( props.onChange ) ) {
                            let checked = props.checked;
                            checked     = !checked;
                            props.onChange( checked );
                        }
                    } }
                />
                <label className="custom-control-label" style={{cursor: 'pointer',}}
                    onClick={ () => {
                        if ( Functions.existeData( props.onChange ) ) {
                            let checked = props.checked;
                            checked     = !checked;
                            props.onChange( checked );
                        }
                    } }
                >
                    &nbsp;
                </label>
                { ( Functions.existeData( props.titleText ) ) ?
                    <span 
                        style={{ 
                            position: 'relative', left: -7, top: -1, cursor: 'pointer', 
                            fontSize: 11, fontWeight: "bold", color: "#3f6ad8",
                        }}
                        onClick={ () => {
                            if ( Functions.existeData( props.onChange ) ) {
                                let checked = props.checked;
                                checked     = !checked;
                                props.onChange(checked);
                            }
                        } }
                    > 
                        { props.titleText } 
                    </span> : null
                }
            </div>
        );
    }

    return (
        <>
            { onValidateComponent() }
        </>
    );

};

C_Checkbox.propTypes = {
    checked: PropTypes.bool,
    readOnly: PropTypes.bool,
    disabled: PropTypes.bool,
    titleText: PropTypes.string,

    onChange: PropTypes.func,

}

C_Checkbox.defaultProps = {
    checked: false,
    readOnly: false,
    disabled: false,
    titleText: null,
}

export default C_Checkbox;
