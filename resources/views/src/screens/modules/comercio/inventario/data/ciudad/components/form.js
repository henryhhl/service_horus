
import React from 'react';
import PropTypes from 'prop-types';

import { Col, Row } from 'antd';
import { C_FormAction, C_Input, C_Select, C_TreeSelect } from '../../../../../../../components';

function C_Form( props ) {
    const { ciudad } = props;
    const { error, message } = ciudad;

    function onChangeAbreviatura( value ) {
        ciudad.abreviatura         = value;
        ciudad.error.abreviatura   = false;
        ciudad.message.abreviatura = "";
        props.onChange( ciudad );
    };

    function onChangeDescripcion( value ) {
        ciudad.descripcion         = value;
        ciudad.error.descripcion   = false;
        ciudad.message.descripcion = "";
        props.onChange( ciudad );
    };

    function onChangeFkIDCiudadClasificacion( value ) {
        ciudad.fkidciudadclasificacion         = value;
        ciudad.error.fkidciudadclasificacion   = false;
        ciudad.message.fkidciudadclasificacion = "";
        props.onChange( ciudad );
    };

    function onChangeIDCiudad( value ) {
        ciudad.fkidciudadpadre = value;
        props.onChange( ciudad );
    };
    
    return (
        <>
            <Row gutter={ [12, 8] }>
                <Col xs={{ span: 24, }}>
                    <C_Input
                        label={ "Breve"}
                        placeholder={ "INGRESAR BREVE..." }
                        value={ ciudad.abreviatura }
                        onChange={ onChangeAbreviatura }
                        error={error.abreviatura}
                        message={message.abreviatura}
                    />
                </Col>
                <Col xs={{ span: 24, }}>
                    <C_Input
                        label={ "Descripción"}
                        placeholder={ "INGRESAR DESCRIPCIÓN..." }
                        value={ ciudad.descripcion }
                        onChange={ onChangeDescripcion }
                        error={error.descripcion}
                        message={message.descripcion}
                    />
                </Col>
                <Col xs={{ span: 24, }}>
                    <C_Select 
                        label={"Ciudad Clasificación"}
                        data={ciudad.array_ciudadclasificacion}
                        option={ { title: "descripcion", value: "idciudadclasificacion", } }
                        placeholder={"SELECCIONAR CLASIFICACIÓN"}
                        value={ciudad.fkidciudadclasificacion}
                        onChange={onChangeFkIDCiudadClasificacion}
                        error={error.fkidciudadclasificacion}
                        message={message.fkidciudadclasificacion}
                    />
                </Col>
                <Col xs={{ span: 24, }}>
                    <C_TreeSelect
                        label={ "Familia Ciudad"}
                        placeholder={ "SELECCIONAR CIUDAD..." }
                        value={ ciudad.fkidciudadpadre }
                        onChange={ onChangeIDCiudad }
                        option={{ title: "descripcion", value: "idciudad", fkidpadre: "fkidciudadpadre" }}
                        treeData={ciudad.array_ciudad}
                    />
                </Col>
            </Row>
            <C_FormAction 
                onCancel={props.onCancel}
                onOk={props.onOk}
            />
        </>
    );
};

C_Form.propTypes = {
    ciudad: PropTypes.object,

    onChange: PropTypes.func.isRequired,
    onCancel: PropTypes.func,
    onOk:     PropTypes.func,
};

C_Form.defaultProps = {
    onChange: ( evt ) => {},
};

export default C_Form;
