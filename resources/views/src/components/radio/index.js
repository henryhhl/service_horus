
import React from 'react';
import PropTypes from 'prop-types';

function C_Radio( props ) {

    const { checked, id, name } = props;

    return (
        <div className="form-check"
            onClick={ () => {
                if ( props.onChange ) {
                    props.onChange(!checked);
                }
            } }
        >
            <input 
                type="radio" name={name} id={id}
                className="form-check-input" 
                checked={checked}
                onChange={ () => {
                    if ( props.onChange ) {
                        // props.onChange(!checked);
                    }
                } }
            />
            <label className="form-check-label" htmlFor={id} style={{ cursor: "pointer", }}>
                { props.title }
            </label>
        </div>
    );
};

C_Radio.propTypes = {
    name: PropTypes.string,
    id: PropTypes.string,

    title: PropTypes.node,
    checked: PropTypes.bool,

    onChange: PropTypes.func,
};

C_Radio.defaultProps = {
    checked: false,
};

export default C_Radio;
