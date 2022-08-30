
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'antd';

import { Functions } from '../../../../../../../../utils/functions';
import { C_Date, C_Input, C_Message } from '../../../../../../../../components';
import M_ListadoAlmacen from '../../../../data/almacen/modal/listado';

function C_Form( props ) {
    const { informeInventario, onChange } = props;
    const [ visible_almacen, setVisibleAlmacen ] = useState(false);

    function onChangeFechaInicio( value ) {
        let fechainicio = Functions.convertDMYToYMD(value);
        let fechafinal  = Functions.convertDMYToYMD(informeInventario.fechafinal);
        if ( fechainicio <= fechafinal || fechafinal == "" ) {
            informeInventario.fechainicio = value;
            onChange(informeInventario);
        } else {
            C_Message("warning", "Fecha Inicio debe ser menor a Fecha Final");
        }
    };

    function onChangeFechaFinal( value ) {
        let fechainicio = Functions.convertDMYToYMD(informeInventario.fechainicio);
        let fechafinal  = Functions.convertDMYToYMD(value);
        if ( fechafinal >= fechainicio && fechainicio != "" ) {
            informeInventario.fechafinal = value;
            onChange(informeInventario);
        } else {
            C_Message("warning", "Fecha Final debe ser mayor a Fecha Inicio");
        }
    };

    function onShowAlmacen() {
        setVisibleAlmacen(true);
    };

    function onChangeFKIDAlmacen( almacen ) {
        informeInventario.fkidalmacen  = almacen.idalmacen;
        informeInventario.almacen      = almacen.descripcion;
        onChange( informeInventario );
        setVisibleAlmacen(false);
    };

    function componentAlmacen() {
        if ( !visible_almacen ) return null;
        return (
            <M_ListadoAlmacen
                visible={visible_almacen}
                onClose={ () => setVisibleAlmacen(false) }
                value={informeInventario.fkidalmacen}
                onChange={onChangeFKIDAlmacen}
            />
        );
    };

    return (
        <>
            { componentAlmacen() }
            <Row gutter={ [12, 8] }>
                <Col xs={{ span: 24, }} sm={{ span: 16, }}>
                    <Row gutter={ [12, 8] }>
                        <Col xs={{ span: 24, }} sm={{ span: 10, }}>
                            <div className="main-card mb-2 card mt-1">
                                <div className="card-header card-subtitle" style={{ height: "2.2rem" }}>
                                    {" "}
                                </div>
                                <div className="card-body pb-2 pt-0">
                                    <Row gutter={ [12, 8] } style={{ marginTop: -12, }}>
                                        <Col xs={{ span: 24, }} sm={{ span: 24, }}>
                                            <C_Input
                                                label={"Álmacen"}
                                                placeholder={ "SELECCIONAR ÁLMACEN..." }
                                                value={ informeInventario.almacen }
                                                onClick={onShowAlmacen}
                                                select={true}
                                            />
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        </Col>
                        <Col xs={{ span: 24, }} sm={{ span: 14, }}>
                            <div className="main-card mb-2 card mt-1">
                                <div className="card-header card-subtitle" style={{ height: "2.2rem" }}>
                                    Periodo
                                </div>
                                <div className="card-body pb-2 pt-0">
                                    <Row gutter={ [12, 8] } style={{ marginTop: -12, }}>
                                        <Col xs={{ span: 24, }} sm={{ span: 12, }}>
                                            <C_Date 
                                                label={"Inicio"}
                                                value={ informeInventario.fechainicio }
                                                onChange={ onChangeFechaInicio }
                                                allowClear={false}
                                            />
                                        </Col>
                                        <Col xs={{ span: 24, }} sm={{ span: 12, }}>
                                            <C_Date 
                                                label={"Final"}
                                                value={ informeInventario.fechafinal }
                                                onChange={ onChangeFechaFinal }
                                                allowClear={false}
                                            />
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Col>
                <Col xs={{ span: 24, }} sm={{ span: 8, }}></Col>
            </Row>
        </>
    );
};

C_Form.propTypes = {
    onClose:  PropTypes.func,
    onChange: PropTypes.func,
    onImprimir: PropTypes.func,
    informeInventario: PropTypes.object,
}

C_Form.defaultProps = {
    onClose:  () => {},
    onChange: ( ev ) => {},
    informeInventario: {},
}

export default C_Form;
