
import React from 'react';
import PropTypes from 'prop-types';

import { Row } from 'antd';
import { C_Button } from '..';

function C_FormAction( props ) {
    const { cancelText, justify, okText } = props;

    return (
        <Row gutter={ [12, 8] } justify={justify} className={"pt-3"}>
            <C_Button
                onClick={props.onOk}
            >
                {okText}
            </C_Button>
            <C_Button color={"danger"}
                onClick={props.onCancel}
            >
                {cancelText}
            </C_Button>
        </Row>
    );
};

C_FormAction.propTypes = {
    cancelText: PropTypes.string,
    justify:    PropTypes.string,
    okText:     PropTypes.string,

    onOk:     PropTypes.func,
    onCancel: PropTypes.func,
};

C_FormAction.defaultProps = {
    justify:    "center",  //end, start
    cancelText: "Cancelar",
    okText:     "Aceptar",
};

export default C_FormAction;
