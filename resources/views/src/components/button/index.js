
import React from 'react';
import PropTypes from 'prop-types';

function C_Button( props ) {

    const {} = props;

    function onComponent() {
        let size = "";
        
        if ( props.size == "default" ) size = "";
        if ( props.size == "small" )   size = "btn-sm p-1";
        if ( props.size == "large" )   size = "btn-lg";

        let outline= "";
        if ( props.outline == true ) outline = "-outline";

        let color = onColor( props );

        let border = "border-0";
        if ( props.border == true ) border = "";

        let disabled = "btn-wide btn-shadow btn-hover-shine ";
        if ( props.disabled == true ) disabled = "disabled";

        let block = "";
        if ( props.block == true ) block = "btn-block";

        let dashed = "";
        if ( props.dashed == true ) dashed = "btn-dashed";

        let style = props.style;
        style = Object.assign( { marginRight: 2, }, style );

        return ( //rounded-circle
            <button 
                disabled={props.disabled}
                className={`mb-1 btn-transition ${border} btn ${dashed} btn${outline}-${color} ${size} ${disabled} ${block} d-flex align-items-center`}
                onClick={props.onClick}
                type={props.type}
                style={style}
            >
                { props.icon &&
                    <div className="btn-icon-wrapper pr-1">
                        { props.icon }
                    </div>
                }
                { props.children }
            </button>
        );
    };

    return (
        <>
            { onComponent() }
        </>
    );
};

C_Button.propTypes = {
    disabled: PropTypes.bool,
    loading:  PropTypes.bool,
    outline:  PropTypes.bool,
    border:   PropTypes.bool,
    block:    PropTypes.bool,
    dashed:   PropTypes.bool,

    icon: PropTypes.node,

    size:      PropTypes.string,
    shape:     PropTypes.string,
    className: PropTypes.string,
    color:     PropTypes.string,
    type:      PropTypes.string,

    onClick: PropTypes.func,

    style: PropTypes.object,
}

C_Button.defaultProps = {
    disabled: false,
    loading:  false,
    outline:  false,
    border:   true,
    block:    false,
    dashed:   false,

    size:      'small',    // large | default | small	
    shape:     '',         // circle or round
    className: "",
    color:     "primary",
    type:      "button",

    style: {},
}

function onColor( props ) {
    switch ( props.color ) {
        case "secondary":
            return "secondary";

        case "success":
            return "success";

        case "info":
            return "info";

        case "warning":
            return "warning";

        case "danger":
            return "danger";

        case "focus":
            return "focus";

        case "alt":
            return "alternate";

        case "light":
            return "light";

        case "dark":
            return "dark";

        case "link":
            return "link";
    
        default:
            return "primary";
    }
};

export default C_Button;
