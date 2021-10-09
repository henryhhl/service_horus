
import React from 'react';
import PropTypes from 'prop-types';

import { Col, Row } from 'antd';
import { C_Input } from '../../../../../../../components';

function C_Form( props ) {
    const { unidadMedida, disabled, onChange } = props;
    const { abreviatura, descripcion, idunidadmedida, focusInput, error, message } = unidadMedida;

    function onChangeID( value ) {
        unidadMedida.idunidadmedida = value;
        onChange( unidadMedida );
    };

    function onChangeAbreviatura( value ) {
        unidadMedida.abreviatura        = value;
        unidadMedida.error.abreviatura  = false;
        unidadMedida.message.abreviatura = "";
        onChange( unidadMedida );
    };

    function onChangeDescripcion( value ) {
        unidadMedida.descripcion        = value;
        unidadMedida.error.descripcion  = false;
        unidadMedida.message.descripcion = "";
        onChange( unidadMedida );
    };

    return (
        <>
            <Row gutter={ [12, 8] }>
                <Col sm={{ span: 8, }}></Col>
                <Col xs={{ span: 24, }} sm={{ span: 8, }}>
                    <C_Input
                        label={ "Código"}
                        placeholder={ "INGRESAR CÓDIGO..." }
                        value={ idunidadmedida }
                        onChange={ onChangeID }
                        disabled={ disabled.iddata }
                        onPressEnter={ props.onPressEnter }
                        autoFocus={true}
                        focus={ focusInput }
                    />
                </Col>
            </Row>
            <Row gutter={ [12, 8] }>
                <Col sm={{ span: 3, }}></Col>
                <Col xs={{ span: 24, }} sm={{ span: 4, }}>
                    <C_Input
                        label={ "Breve"}
                        placeholder={ "INGRESAR BREVE..." }
                        value={ abreviatura }
                        onChange={ onChangeAbreviatura }
                        disabled={ disabled.data }
                        error={error.abreviatura}
                        message={message.abreviatura}
                    />
                </Col>
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
    unidadMedida: PropTypes.object,
    disabled:     PropTypes.object,

    onChange:     PropTypes.func.isRequired,
    onPressEnter: PropTypes.func,
};

C_Form.defaultProps = {
    onChange: ( evt ) => {},
};

export default C_Form;
