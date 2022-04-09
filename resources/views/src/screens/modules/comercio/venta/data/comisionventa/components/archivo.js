
import React from 'react';
import PropTypes from 'prop-types';

import { Functions } from '../../../../../../../utils/functions';
import { C_ArchivoOption, C_ModalDraggable } from '../../../../../../../components';

function C_Archivo( props ) {
    const { archivo } = props;

    function onComponent() {
        if ( !archivo.visible ) return null;
        return (
            <C_ModalDraggable
                visible={archivo.visible}
                onClose={ () => {
                    Functions.cleanObejct( archivo );
                    archivo.checked.xls = true;
                    props.onChange( archivo );
                } }
                maskStyle={{ background: 'transparent', }} width={200}
                zIndex={1200} title="Opción Archivo"
                keyboard maskClosable bodyStyle={{ padding: 0, }}
            >
                <C_ArchivoOption
                    checked={archivo.checked}
                    onChange={ (checked) => {
                        archivo.checked = checked;
                        props.onChange( archivo );
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

C_Archivo.propTypes = {
    archivo: PropTypes.object,

    onChange: PropTypes.func,
    onSubmit: PropTypes.func,
};

C_Archivo.defaultProps = {

};

export default C_Archivo;
