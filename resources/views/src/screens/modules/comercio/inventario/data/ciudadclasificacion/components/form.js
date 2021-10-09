
import React from 'react';
import PropTypes from 'prop-types';

import { Col, Row } from 'antd';
import { C_Input } from '../../../../../../../components';

function C_Form( props ) {
    const { ciudadClasificacion, disabled, onChange } = props;
    const { descripcion, idciudadclasificacion, focusInput, error, message } = ciudadClasificacion;

    function onChangeID( value ) {
        ciudadClasificacion.idciudadclasificacion = value;
        onChange( ciudadClasificacion );
    };

    function onChangeDescripcion( value ) {
        ciudadClasificacion.descripcion        = value;
        ciudadClasificacion.error.descripcion  = false;
        ciudadClasificacion.message.descripcion = "";
        onChange( ciudadClasificacion );
    };

    return (
        <>
            <Row gutter={ [12, 8] }>
                <Col sm={{ span: 8, }}></Col>
                <Col xs={{ span: 24, }} sm={{ span: 8, }}>
                    <C_Input
                        label={ "Código"}
                        placeholder={ "INGRESAR CÓDIGO..." }
                        value={ idciudadclasificacion }
                        onChange={ onChangeID }
                        disabled={ disabled.iddata }
                        onPressEnter={ props.onPressEnter }
                        autoFocus={true}
                        focus={ focusInput }
                    />
                </Col>
            </Row>
            <Row gutter={ [12, 8] }>
                <Col sm={{ span: 5, }}></Col>
                <Col xs={{ span: 24, }} sm={{ span: 14, }}>
                    <C_Input
                        label={ "Descripción"}
                        placeholder={ "INGRESAR DESCRIPCIÓN..." }
                        value={ descripcion }
                        onChange={ onChangeDescripcion }
                        disabled={ disabled.data }
                        error={error.descripcion}
                        message={message.descripcion}
                    />
                </Col>
            </Row>
        </>
    );
};

C_Form.propTypes = {
    ciudadClasificacion: PropTypes.object,
    disabled:            PropTypes.object,

    onChange:     PropTypes.func.isRequired,
    onPressEnter: PropTypes.func,
};

C_Form.defaultProps = {
    onChange: ( evt ) => {},
};

export default C_Form;
