
import React from 'react';
import PropTypes from 'prop-types';

import { C_ModalDraggable, C_PrintOption } from '../../../../../../../components';
import { Functions } from '../../../../../../../utils/functions';

function OptionCiudadClasificacion( props ) {
    const { option } = props;

    async function onSubmitPrintOption() {
        if ( option.checked.archivo ) {
            await props.resetPrintOption();
            archivo.visible = true;
            await props.onArchivoOption(archivo);
            return;
        }
        await props.onImprimir();
        if ( option.checked.impresora ) {
            document.getElementById("generate_print").click();
            return;
        }
        
        await props.resetPrintOption();
        await props.showReporte();
    };

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

OptionCiudadClasificacion.propTypes = {
    option:   PropTypes.object,

    onChange: PropTypes.func,
    onSubmit: PropTypes.func,
};

OptionCiudadClasificacion.defaultProps = {
    onChange: ( evt ) => {},
};

export default OptionCiudadClasificacion;
