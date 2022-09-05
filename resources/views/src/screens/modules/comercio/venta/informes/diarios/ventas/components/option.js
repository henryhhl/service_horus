
import React from 'react';
import PropTypes from 'prop-types';

import { C_ModalDraggable, C_PrintOption } from '../../../../../../../../components';
import { Functions } from '../../../../../../../../utils/functions';

function C_Option( props ) {
    const { option } = props;

    function onComponent() {
        if ( !option.visible ) return null;
        return (
            <C_ModalDraggable
                visible={option.visible}
                onClose={ () => {
                    Functions.cleanObejct( option );
                    option.checked.pantalla = true;
                    props.onChange(option);
                } }
                maskStyle={{ background: 'transparent', }} width={180}
                zIndex={1200} title="Opcion"
                keyboard maskClosable
            >
                <C_PrintOption
                    checked={option.checked}
                    onChange={ (checked) => {
                        option.checked = checked;
                        props.onChange(option);
                    } }
                    onSubmit={props.onSubmit}
                />
            </C_ModalDraggable>
        );
    };

    return (
        <>
            { onComponent() }
        </>
    );
};

C_Option.propTypes = {
    option:   PropTypes.object,

    onChange: PropTypes.func,
    onSubmit: PropTypes.func,
};

C_Option.defaultProps = {
    onChange: ( evt ) => {},
};

export default C_Option;
