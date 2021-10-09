
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Col, Row, Skeleton } from 'antd';

import { C_Button, C_Input, C_Loading } from '../../../../../../../components';
import { ciudadActions } from '../../../../../../../redux/actions/comercio/inventario/ciudadActions';

function C_ShowCiudad( props ) {
    const { ciudad, idciudad } = props;

    useEffect(() => {
        props.onShow(idciudad);
    }, [] );

    if ( ciudad.loading ) {
        return  (
            <div className="p-2 pl-4 pr-4">
                <Skeleton active />
            </div>
        );
    };

    return (
        <div className="p-2 pl-4 pr-4">
            <C_Loading visible={ props.loading } />
            <Row gutter={ [12, 8] }>
                <Col xs={{ span: 24, }}>
                    <C_Input
                        label={ "Breve"}
                        value={ ciudad.abreviatura }
                        readOnly
                    />
                </Col>
                <Col xs={{ span: 24, }}>
                    <C_Input
                        label={ "Descripción"}
                        value={ ciudad.descripcion }
                        readOnly
                    />
                </Col>
                <Col xs={{ span: 24, }}>
                    <C_Input
                        label={ "Ciudad Clasificación"}
                        value={ ciudad.ciudadclasificacion }
                        readOnly
                    />
                </Col>
            </Row>
            <Row gutter={ [12, 8] } justify={"center"} className={"pt-3"}>
                <C_Button
                    onClick={props.onClose}
                >
                    { "Aceptar" }
                </C_Button>
            </Row>
        </div>
    );
};

C_ShowCiudad.propTypes = {
    idciudad: PropTypes.number,
    ciudad:   PropTypes.object,
};

C_ShowCiudad.defaultProps = {
    onClose: ( evt ) => {},
};

const mapStateToProps = ( state ) => ( {
    ciudad:  state.ciudad,
    loading: state.loading.visible,
} );

const mapDispatchToProps = {
    onShow: ciudadActions.onShow,
};

export default connect( mapStateToProps, mapDispatchToProps )( C_ShowCiudad );
