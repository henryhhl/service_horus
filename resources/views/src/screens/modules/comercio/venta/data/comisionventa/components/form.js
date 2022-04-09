
import React from 'react';
import PropTypes from 'prop-types';

import { Col, Row } from 'antd';
import { C_Input } from '../../../../../../../components';

function C_Form( props ) {
    const { comisionVenta, disabled, onChange } = props;
    const { descripcion, idcomisionventa } = comisionVenta;
    const { focusInput, error, message } = comisionVenta;

    function onChangeID( value ) {
        comisionVenta.idcomisionventa = value;
        onChange( comisionVenta );
    };

    function onChangeDescripcion( value ) {
        comisionVenta.descripcion        = value;
        comisionVenta.error.descripcion  = false;
        comisionVenta.message.descripcion = "";
        onChange( comisionVenta );
    };

    function onChangeValor( value ) {
        if ( value === "" ) value = 0;
        if ( !isNaN( value ) ) {
            if ( parseInt( value ) >= 0 && parseInt( value ) <= 100 ) {
                comisionVenta.valor        = parseInt( value );
                comisionVenta.error.valor  = false;
                comisionVenta.message.valor = "";
                onChange( comisionVenta );
            }
        }
    };

    return (
        <>
            <Row gutter={ [12, 8] }>
                <Col sm={{ span: 8, }}></Col>
                <Col xs={{ span: 24, }} sm={{ span: 8, }}>
                    <C_Input
                        label={ "Código"}
                        placeholder={ "INGRESAR CÓDIGO..." }
                        value={ idcomisionventa }
                        onChange={ onChangeID }
                        disabled={ disabled.iddata }
                        onPressEnter={ props.onPressEnter }
                        autoFocus={true}
                        focus={ focusInput }
                    />
                </Col>
            </Row>
            <Row gutter={ [12, 8] }>
                <Col xs={{ span: 24, }} sm={{ span: 2, }}></Col>
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
                <Col xs={{ span: 24, }} sm={{ span: 4, }}>
                    <C_Input
                        label={ "Valor"}
                        placeholder={ "INGRESAR VALOR..." }
                        value={ comisionVenta.valor }
                        onChange={ onChangeValor }
                        disabled={ disabled.data }
                        error={error.valor}
                        message={message.valor}
                    />
                </Col>
            </Row>
        </>
    );
};

C_Form.propTypes = {
    comisionVenta: PropTypes.object,
    disabled:     PropTypes.object,

    onChange:     PropTypes.func.isRequired,
    onPressEnter: PropTypes.func,
};

C_Form.defaultProps = {
    onChange: ( evt ) => {},
};

export default C_Form;
