
import React from 'react';
import PropTypes from 'prop-types';

import { Col, Row } from 'antd';
import { C_Input } from '../../../../../../../components';

function C_Form( props ) {
    const { productoTipo, disabled, onChange } = props;
    const { abreviatura, descripcion, idproductotipo, focusInput, error, message } = productoTipo;

    function onChangeID( value ) {
        productoTipo.idproductotipo = value;
        onChange( productoTipo );
    };

    function onChangeAbreviatura( value ) {
        productoTipo.abreviatura        = value;
        productoTipo.error.abreviatura  = false;
        productoTipo.message.abreviatura = "";
        onChange( productoTipo );
    };

    function onChangeDescripcion( value ) {
        productoTipo.descripcion        = value;
        productoTipo.error.descripcion  = false;
        productoTipo.message.descripcion = "";
        onChange( productoTipo );
    };

    return (
        <>
            <Row gutter={ [12, 8] }>
                <Col sm={{ span: 8, }}></Col>
                <Col xs={{ span: 24, }} sm={{ span: 8, }}>
                    <C_Input
                        label={ "Código"}
                        placeholder={ "INGRESAR CÓDIGO..." }
                        value={ idproductotipo }
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
    productoTipo: PropTypes.object,
    disabled:     PropTypes.object,

    onChange:     PropTypes.func.isRequired,
    onPressEnter: PropTypes.func,
};

C_Form.defaultProps = {
    onChange: ( evt ) => {},
};

export default C_Form;