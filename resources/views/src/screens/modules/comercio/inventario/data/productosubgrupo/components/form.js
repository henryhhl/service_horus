
import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Col, Row } from 'antd';
import { C_Input } from '../../../../../../../components';

import M_ListadoProductoGrupo from '../../productogrupo/modal/listado';

function C_Form( props ) {
    const { productoSubGrupo, disabled, onChange } = props;
    const { abreviatura, descripcion, idproductosubgrupo, focusInput, error, message } = productoSubGrupo;

    const [ visible_productogrupo, setVisibleProductoGrupo ] = useState( false );

    function onChangeID( value ) {
        productoSubGrupo.idproductosubgrupo = value;
        onChange( productoSubGrupo );
    };

    function onChangeAbreviatura( value ) {
        productoSubGrupo.abreviatura        = value;
        productoSubGrupo.error.abreviatura  = false;
        productoSubGrupo.message.abreviatura = "";
        onChange( productoSubGrupo );
    };

    function onChangeDescripcion( value ) {
        productoSubGrupo.descripcion        = value;
        productoSubGrupo.error.descripcion  = false;
        productoSubGrupo.message.descripcion = "";
        onChange( productoSubGrupo );
    };

    function onShowProductoGrupo() {
        if ( !disabled.data ) setVisibleProductoGrupo(true);
    };

    function componentProductoGrupo() {
        if ( !visible_productogrupo ) return null;
        return (
            <M_ListadoProductoGrupo
                visible={visible_productogrupo}
                onClose={ () => setVisibleProductoGrupo(false) }
                value={productoSubGrupo.fkidproductogrupo}
                onChange={ ( data ) => {
                    productoSubGrupo.fkidproductogrupo  = data.idproductogrupo;
                    productoSubGrupo.productogrupo      = data.descripcion;
                    productoSubGrupo.error.fkidproductogrupo   = false;
                    productoSubGrupo.message.fkidproductogrupo = "";
                    onChange( productoSubGrupo );
                    setVisibleProductoGrupo(false);
                } }
            />
        );
    };

    return (
        <>
            { componentProductoGrupo() }
            <Row gutter={ [12, 8] }>
                <Col sm={{ span: 8, }}></Col>
                <Col xs={{ span: 24, }} sm={{ span: 8, }}>
                    <C_Input
                        label={ "Código"}
                        placeholder={ "INGRESAR CÓDIGO..." }
                        value={ idproductosubgrupo }
                        onChange={ onChangeID }
                        disabled={ disabled.iddata }
                        onPressEnter={ props.onPressEnter }
                        autoFocus={true}
                        focus={ focusInput }
                    />
                </Col>
            </Row>
            <Row gutter={ [12, 8] }>
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
                <Col xs={{ span: 24, }} sm={{ span: 10, }}>
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
                <Col xs={{ span: 24, }} sm={{ span: 10, }}>
                    <C_Input
                        label={ "Grupo"}
                        placeholder={ "SELECCIONAR GRUPO..." }
                        value={ productoSubGrupo.productogrupo }
                        onClick={onShowProductoGrupo}
                        disabled={ disabled.data }
                        error={error.fkidproductogrupo}
                        message={message.fkidproductogrupo}
                        select={true}
                    />
                </Col>
            </Row>
        </>
    );
};

C_Form.propTypes = {
    productoSubGrupo: PropTypes.object,
    disabled:     PropTypes.object,

    onChange:     PropTypes.func.isRequired,
    onPressEnter: PropTypes.func,
};

C_Form.defaultProps = {
    onChange: ( evt ) => {},
};

export default C_Form;
