
import React from 'react';
import PropTypes from 'prop-types';

import { Col, Row } from 'antd';
import { C_Input } from '../../../../../../../components';

function C_Form( props ) {
    const { conceptoCompra, disabled, onChange } = props;
    const { descripcion, idconceptocompra } = conceptoCompra;
    const { focusInput, error, message } = conceptoCompra;

    function onChangeID( value ) {
        conceptoCompra.idconceptocompra = value;
        onChange( conceptoCompra );
    };

    function onChangeDescripcion( value ) {
        conceptoCompra.descripcion        = value;
        conceptoCompra.error.descripcion  = false;
        conceptoCompra.message.descripcion = "";
        onChange( conceptoCompra );
    };

    return (
        <>
            <Row gutter={ [12, 8] }>
                <Col sm={{ span: 8, }}></Col>
                <Col xs={{ span: 24, }} sm={{ span: 8, }}>
                    <C_Input
                        label={ "Código"}
                        placeholder={ "INGRESAR CÓDIGO..." }
                        value={ idconceptocompra }
                        onChange={ onChangeID }
                        disabled={ disabled.iddata }
                        onPressEnter={ props.onPressEnter }
                        autoFocus={true}
                        focus={ focusInput }
                    />
                </Col>
            </Row>
            <Row gutter={ [12, 8] }>
                <Col xs={{ span: 24, }} sm={{ span: 4, }}></Col>
                <Col xs={{ span: 24, }} sm={{ span: 16, }}>
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
    conceptoCompra: PropTypes.object,
    disabled:     PropTypes.object,

    onChange:     PropTypes.func.isRequired,
    onPressEnter: PropTypes.func,
};

C_Form.defaultProps = {
    onChange: ( evt ) => {},
};

export default C_Form;
