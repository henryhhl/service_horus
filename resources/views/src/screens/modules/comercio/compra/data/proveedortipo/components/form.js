
import React from 'react';
import PropTypes from 'prop-types';

import { Col, Row } from 'antd';
import { C_Input } from '../../../../../../../components';

function C_Form( props ) {
    const { proveedorTipo, disabled, onChange } = props;
    const { descripcion, idproveedortipo } = proveedorTipo;
    const { focusInput, error, message } = proveedorTipo;

    function onChangeID( value ) {
        proveedorTipo.idproveedortipo = value;
        onChange( proveedorTipo );
    };

    function onChangeDescripcion( value ) {
        proveedorTipo.descripcion        = value;
        proveedorTipo.error.descripcion  = false;
        proveedorTipo.message.descripcion = "";
        onChange( proveedorTipo );
    };

    return (
        <>
            <Row gutter={ [12, 8] }>
                <Col sm={{ span: 8, }}></Col>
                <Col xs={{ span: 24, }} sm={{ span: 8, }}>
                    <C_Input
                        label={ "Código"}
                        placeholder={ "INGRESAR CÓDIGO..." }
                        value={ idproveedortipo }
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
    proveedorTipo: PropTypes.object,
    disabled:     PropTypes.object,

    onChange:     PropTypes.func.isRequired,
    onPressEnter: PropTypes.func,
};

C_Form.defaultProps = {
    onChange: ( evt ) => {},
};

export default C_Form;
