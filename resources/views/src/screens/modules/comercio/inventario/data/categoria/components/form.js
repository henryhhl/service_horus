
import React from 'react';
import PropTypes from 'prop-types';

import { Col, Row } from 'antd';
import { C_Input } from '../../../../../../../components';

function C_Form( props ) {
    const { categoria, disabled, onChange } = props;
    const { abreviatura, descripcion, idcategoria, focusInput, error, message } = categoria;

    function onChangeID( value ) {
        categoria.idcategoria = value;
        onChange( categoria );
    };

    function onChangeAbreviatura( value ) {
        categoria.abreviatura        = value;
        categoria.error.abreviatura  = false;
        categoria.message.abreviatura = "";
        onChange( categoria );
    };

    function onChangeDescripcion( value ) {
        categoria.descripcion        = value;
        categoria.error.descripcion  = false;
        categoria.message.descripcion = "";
        onChange( categoria );
    };

    return (
        <>
            <Row gutter={ [12, 8] }>
                <Col sm={{ span: 8, }}></Col>
                <Col xs={{ span: 24, }} sm={{ span: 8, }}>
                    <C_Input
                        label={ "Código"}
                        placeholder={ "INGRESAR CÓDIGO..." }
                        value={ idcategoria }
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
            {/* <Row gutter={ [12, 8] }>
                <Col sm={{ span: 7, }}></Col>
                <Col xs={{ span: 24, }} sm={{ span: 14, }}>
                    <C_Input
                        label={ "Familia"}
                        placeholder={ "INGRESAR DESCRIPCIÓN..." }
                        value={ categoria.categoriapadre }
                        disabled={ true }
                    />
                </Col>
            </Row> */}
        </>
    );
};

C_Form.propTypes = {
    categoria: PropTypes.object,
    disabled:  PropTypes.object,

    onChange:     PropTypes.func.isRequired,
    onPressEnter: PropTypes.func,
};

C_Form.defaultProps = {
    onChange: ( evt ) => {},
};

export default C_Form;
