
import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Col, Row } from 'antd';
import { C_Date, C_Input, C_Select } from '../../../../../../../components';

import M_TreeCiudad from '../../../../inventario/data/ciudad/modal/listado';
import M_ListadoClienteTipo from '../../clientetipo/modal/listado';

import { Functions } from '../../../../../../../utils/functions';

function C_Form( props ) {
    const { cliente, disabled, onChange } = props;
    const { idcliente } = cliente;
    const { focusInput, error, message } = cliente;

    const [ visible_ciudadpais, setVisibleCiudadPais ] = useState( false );
    const [ visible_ciudad, setVisibleCiudad ] = useState( false );
    const [ visible_clientetipo, setVisibleClienteTipo ] = useState( false );

    function onChangeID( value ) {
        cliente.idcliente = value;
        onChange( cliente );
    };

    function onChangeCodigo( value ) {
        cliente.codigo = value;
        onChange( cliente );
    };

    function onChangeTipoPersoneria( value ) {
        cliente.tipopersoneria = value;
        onChange( cliente );
    };

    function onChangeEstado( value ) {
        cliente.estado = value;
        onChange( cliente );
    };

    function onChangeNombre( value ) {
        cliente.nombre = value;
        cliente.error.nombre = false;
        cliente.message.nombre = "";
        onChange( cliente );
    };

    function onChangeApellido( value ) {
        cliente.apellido = value;
        cliente.error.apellido = false;
        cliente.message.apellido = "";
        onChange( cliente );
    };

    function onChangeRazonSocial( value ) {
        cliente.razonsocial = value;
        cliente.error.razonsocial = false;
        cliente.message.razonsocial = "";
        onChange( cliente );
    };

    function onChangeNit( value ) {
        cliente.nit = value;
        onChange( cliente );
    };

    function onChangeDireccion( value ) {
        cliente.direccion = value;
        onChange( cliente );
    };

    function onChangeTelefono( value ) {
        cliente.telefono = value;
        onChange( cliente );
    };

    function onChangeCelular( value ) {
        cliente.celular = value;
        onChange( cliente );
    };

    function onChangeFax( value ) {
        cliente.fax = value;
        onChange( cliente );
    };

    function onChangeContacto( value ) {
        cliente.contacto = value;
        onChange( cliente );
    };

    function onChangeEmail( value ) {
        cliente.email        = value;
        cliente.error.email  = false;
        cliente.message.email = "";
        onChange( cliente );
    };

    function onChangeCasilla( value ) {
        cliente.casilla = value;
        onChange( cliente );
    };

    function onChangeDiasCredito( value ) {
        if ( value === "" ) value = 0;
        if ( !isNaN( value ) ) {
            cliente.diascredito = parseInt( value );
            cliente.error.diascredito  = false;
            cliente.message.diascredito = "";
            onChange( cliente );
        }
    }

    function onChangeLimiteCredito( value ) {
        if ( value === "" ) value = 0;
        if ( !isNaN( value ) ) {
            if ( Functions.esDecimal( value, 2 ) ) {
                let limitecredito = Functions.onChangeNumberDecimal(value);
                cliente.limitecredito = limitecredito;
                cliente.error.limitecredito  = false;
                cliente.message.limitecredito = "";
                onChange( cliente );
            }
        }
    }

    function onChangeDescuento( value ) {
        if ( value === "" ) value = 0;
        if ( !isNaN( value ) ) {
            if ( parseInt( value ) >= 0 && parseInt( value ) <= 100 ) {
                cliente.descuento = parseInt( value );
                cliente.error.descuento  = false;
                cliente.message.descuento = "";
                onChange( cliente );
            }
        }
    }

    function onChangeCantidadItems( value ) {
        if ( value === "" ) value = 0;
        if ( !isNaN( value ) ) {
            cliente.cantidaditems = parseInt( value );
            cliente.error.cantidaditems  = false;
            cliente.message.cantidaditems = "";
            onChange( cliente );
        }
    }

    function onChangeDescuentoXCantidadItems( value ) {
        if ( value === "" ) value = 0;
        if ( !isNaN( value ) ) {
            if ( parseInt( value ) >= 0 && parseInt( value ) <= 100 ) {
                cliente.descuentoxcantidaditems = parseInt( value );
                cliente.error.descuentoxcantidaditems  = false;
                cliente.message.descuentoxcantidaditems = "";
                onChange( cliente );
            }
        }
    }

    function onChangeDescuentoInicial( value ) {
        if ( value === "" ) value = 0;
        if ( !isNaN( value ) ) {
            if ( parseInt( value ) >= 0 && parseInt( value ) <= 100 ) {
                cliente.descuentoinicial = parseInt( value );
                cliente.error.descuentoinicial  = false;
                cliente.message.descuentoinicial = "";
                onChange( cliente );
            }
        }
    }

    function onChangeDescuentoFinal( value ) {
        if ( value === "" ) value = 0;
        if ( !isNaN( value ) ) {
            if ( parseInt( value ) >= 0 && parseInt( value ) <= 100 ) {
                cliente.descuentofinal = parseInt( value );
                cliente.error.descuentofinal  = false;
                cliente.message.descuentofinal = "";
                onChange( cliente );
            }
        }
    }

    function onChangeMontoTotalAdeudado( value ) {
        if ( value === "" ) value = 0;
        if ( !isNaN( value ) ) {
            if ( Functions.esDecimal( value, 2 ) ) {
                let montototaladeudado = Functions.onChangeNumberDecimal(value);
                cliente.montototaladeudado = montototaladeudado;
                cliente.error.montototaladeudado  = false;
                cliente.message.montototaladeudado = "";
                onChange( cliente );
            }
        };
    }

    function onChangeFechaUltimoPago( value ) {
        cliente.fechaultimopago = value;
        cliente.error.fechaultimopago  = false;
        cliente.message.fechaultimopago = "";
        onChange( cliente );
    };

    function onChangeMontoTotalAdeudadoUltimoPago( value ) {
        if ( value === "" ) value = 0;
        if ( !isNaN( value ) ) {
            if ( Functions.esDecimal( value, 2 ) ) {
                let montototaladeudadoultimopago = Functions.onChangeNumberDecimal(value);
                cliente.montototaladeudadoultimopago = montototaladeudadoultimopago;
                cliente.error.montototaladeudadoultimopago  = false;
                cliente.message.montototaladeudadoultimopago = "";
                onChange( cliente );
            }
        };
    }

    function onChangeFechaUltimaVenta( value ) {
        cliente.fechaultimaventa = value;
        cliente.error.fechaultimaventa  = false;
        cliente.message.fechaultimaventa = "";
        onChange( cliente );
    };

    function onChangeMontoTotalUltimaVenta( value ) {
        if ( value === "" ) value = 0;
        if ( !isNaN( value ) ) {
            if ( Functions.esDecimal( value, 2 ) ) {
                let montototalultimaventa = Functions.onChangeNumberDecimal(value);
                cliente.montototalultimaventa = montototalultimaventa;
                cliente.error.montototalultimaventa  = false;
                cliente.message.montototalultimaventa = "";
                onChange( cliente );
            }
        };
    }

    function onShowCiudadPais() {
        if ( !disabled.data ) setVisibleCiudadPais(true);
    };

    function onShowCiudad() {
        if ( ( !disabled.data ) && ( typeof cliente.fkidciudadpais === "number"  ) ) setVisibleCiudad(true);
    };

    function onShowClienteTipo() {
        if ( !disabled.data ) setVisibleClienteTipo(true);
    };

    function componentCiudadPais() {
        if ( !visible_ciudadpais ) return null;
        return (
            <M_TreeCiudad
                showChildren={false}
                visible={visible_ciudadpais}
                onClose={ () => setVisibleCiudadPais(false) }
                onSelect={ ( data ) => {
                    cliente.fkidciudadpais  = data.idciudad;
                    cliente.ciudadpais      = data.descripcion;
                    cliente.error.fkidciudadpais   = false;
                    cliente.message.fkidciudadpais = "";
                    onChange( cliente );
                    setVisibleCiudadPais(false);
                } }
                title="Pais"
            />
        );
    };

    function componentCiudad() {
        if ( !visible_ciudad ) return null;
        return (
            <M_TreeCiudad
                visible={visible_ciudad}
                onClose={ () => setVisibleCiudad(false) }
                onSelect={ ( data ) => {
                    cliente.fkidciudad  = data.idciudad;
                    cliente.ciudad      = data.descripcion;
                    cliente.error.fkidciudad   = false;
                    cliente.message.fkidciudad = "";
                    onChange( cliente );
                    setVisibleCiudad(false);
                } }
                selectedPadre={false}
                fkiddata={cliente.fkidciudadpais}
                expanded={true}
            />
        );
    };

    function componentClienteTipo() {
        if ( !visible_clientetipo ) return null;
        return (
            <M_ListadoClienteTipo
                visible={visible_clientetipo}
                onClose={ () => setVisibleClienteTipo(false) }
                value={cliente.fkidclientetipo}
                onChange={ ( data ) => {
                    cliente.fkidclientetipo  = data.idclientetipo;
                    cliente.clientetipo      = data.descripcion;
                    cliente.error.fkidclientetipo   = false;
                    cliente.message.fkidclientetipo = "";
                    onChange( cliente );
                    setVisibleClienteTipo(false);
                } }
            />
        );
    }

    return (
        <>
            { componentCiudad() }
            { componentCiudadPais() }
            { componentClienteTipo() }
            <Row gutter={ [12, 8] }>
                <Col xs={{ span: 24, }} sm={{ span: 4, }}>
                    <C_Input
                        label={ "Nro."}
                        placeholder={ "INGRESAR NRO..." }
                        value={ idcliente }
                        onChange={ onChangeID }
                        disabled={ disabled.iddata }
                        onPressEnter={ props.onPressEnter }
                        autoFocus={true}
                        focus={ focusInput }
                    />
                </Col>
                <Col xs={{ span: 24, }} sm={{ span: 4, }}></Col>
                <Col xs={{ span: 24, }} sm={{ span: 4, }}>
                    <C_Input
                        label={ "Código"}
                        placeholder={ "INGRESAR CÓDIGO..." }
                        value={ cliente.codigo }
                        onChange={ onChangeCodigo }
                        disabled={ disabled.data }
                    />
                </Col>
                <Col xs={{ span: 24, }} sm={{ span: 4, }}>
                    <C_Input
                        label={ "Tipo*"}
                        placeholder={ "SELECCIONAR TIPO..." }
                        value={ cliente.clientetipo }
                        onClick={onShowClienteTipo}
                        disabled={ disabled.data }
                        error={error.fkidclientetipo}
                        message={message.fkidclientetipo}
                        select={true}
                    />
                </Col>
                <Col xs={{ span: 24, }} sm={{ span: 4, }}>
                    <C_Select
                        label={ "Personeria"}
                        placeholder={ "SELECCIONAR PERSONERIA" }
                        value={ cliente.tipopersoneria }
                        onChange={ onChangeTipoPersoneria }
                        disabled={ disabled.data }
                        data={ [
                            { title: "Ninguno", value: "S" },
                            { title: "Juridico", value: "J" },
                            { title: "Natural", value: "N" },
                        ] }
                    />
                </Col>
                <Col xs={{ span: 24, }} sm={{ span: 4, }}>
                    <C_Select
                        label={ "Estado"}
                        placeholder={ "SELECCIONAR ESTADO" }
                        value={ cliente.estado }
                        onChange={ onChangeEstado }
                        disabled={ disabled.data }
                        data={ [
                            { title: "Activo", value: "A" },
                            { title: "Inactivo", value: "N" },
                        ] }
                    />
                </Col>
            </Row>
            <Row gutter={ [12, 8] }>
                <Col xs={{ span: 24, }} sm={{ span: 4, }}>
                    <C_Input
                        label={ "Nombre*"}
                        placeholder={ "INGRESAR NOMBRE..." }
                        value={ cliente.nombre }
                        onChange={ onChangeNombre }
                        disabled={ disabled.data }
                        error={error.nombre}
                        message={message.nombre}
                    />
                </Col>
                <Col xs={{ span: 24, }} sm={{ span: 8, }}>
                    <C_Input
                        label={ "Apellido*"}
                        placeholder={ "INGRESAR APELLIDO..." }
                        value={ cliente.apellido }
                        onChange={ onChangeApellido }
                        disabled={ disabled.data }
                        error={error.apellido}
                        message={message.apellido}
                    />
                </Col>
                <Col xs={{ span: 24, }} sm={{ span: 8, }}>
                    <C_Input
                        label={ "Razon social*"}
                        placeholder={ "INGRESAR RAZON SOCIAL..." }
                        value={ cliente.razonsocial }
                        onChange={ onChangeRazonSocial }
                        disabled={ disabled.data }
                        error={error.razonsocial}
                        message={message.razonsocial}
                    />
                </Col>
                <Col xs={{ span: 24, }} sm={{ span: 4, }}>
                    <C_Input
                        label={ "Nit"}
                        placeholder={ "INGRESAR NIT..." }
                        value={ cliente.nit }
                        onChange={ onChangeNit }
                        disabled={ disabled.data }
                    />
                </Col>
            </Row>
            <Row gutter={ [12, 8] }>
                <Col xs={{ span: 24, }} sm={{ span: 6, }}>
                    <C_Input
                        label={ "Pais*"}
                        placeholder={ "SELECCIONAR PAIS..." }
                        value={ cliente.ciudadpais }
                        onClick={onShowCiudadPais}
                        disabled={ disabled.data }
                        error={error.fkidciudadpais}
                        message={message.fkidciudadpais}
                        select={true}
                    />
                </Col>
                <Col xs={{ span: 24, }} sm={{ span: 6, }}>
                    <C_Input
                        label={ "Ciudad*"}
                        placeholder={ "SELECCIONAR CIUDAD..." }
                        value={ cliente.ciudad }
                        onClick={onShowCiudad}
                        disabled={ ( disabled.data || ( typeof cliente.fkidciudadpais !== "number" ) ) ? true : false }
                        error={error.fkidciudad}
                        message={message.fkidciudad}
                        select={true}
                    />
                </Col>
                <Col xs={{ span: 24, }} sm={{ span: 12, }}>
                    <C_Input
                        label={ "Dirección"}
                        placeholder={ "INGRESAR DIRECCCIÓN..." }
                        value={ cliente.direccion }
                        onChange={onChangeDireccion}
                        disabled={ disabled.data }
                        error={error.direcccion}
                        message={message.direcccion}
                    />
                </Col>
            </Row>
            <div className="card mb-1 mt-2">
                <div className="card-header card-header-title font-size-lg text-capitalize">
                    Referencia Contacto
                </div>
                <div className="card-body pb-2 pt-0">
                    <Row gutter={ [12, 8] }>
                        <Col xs={{ span: 24, }} sm={{ span: 4, }}>
                            <C_Input
                                label={ "Teléfono"}
                                placeholder={ "INGRESAR TELÉFONO..." }
                                value={ cliente.telefono }
                                onChange={ onChangeTelefono }
                                disabled={ disabled.data }
                            />
                        </Col>
                        <Col xs={{ span: 24, }} sm={{ span: 4, }}>
                            <C_Input
                                label={ "Celular"}
                                placeholder={ "INGRESAR CELULAR..." }
                                value={ cliente.celular }
                                onChange={ onChangeCelular }
                                disabled={ disabled.data }
                            />
                        </Col>
                        <Col xs={{ span: 24, }} sm={{ span: 4, }}>
                            <C_Input
                                label={ "Fax"}
                                placeholder={ "INGRESAR FAX..." }
                                value={ cliente.fax }
                                onChange={ onChangeFax }
                                disabled={ disabled.data }
                            />
                        </Col>
                        <Col xs={{ span: 24, }} sm={{ span: 12, }}>
                            <C_Input
                                label={ "Contacto"}
                                placeholder={ "INGRESAR CONTACTO..." }
                                value={ cliente.contacto }
                                onChange={ onChangeContacto }
                                disabled={ disabled.data }
                            />
                        </Col>
                    </Row>
                    <Row gutter={ [12, 8] }>
                        <Col xs={{ span: 24, }} sm={{ span: 8, }}>
                            <C_Input
                                label={ "Email"}
                                placeholder={ "INGRESAR EMAIL..." }
                                value={ cliente.email }
                                onChange={ onChangeEmail }
                                disabled={ disabled.data }
                                error={error.email}
                                message={message.email}
                            />
                        </Col>
                        <Col xs={{ span: 24, }} sm={{ span: 6, }}>
                            <C_Input
                                label={ "Casilla"}
                                placeholder={ "INGRESAR CASILLA..." }
                                value={ cliente.casilla }
                                onChange={ onChangeCasilla }
                                disabled={ disabled.data }
                            />
                        </Col>
                        <Col xs={{ span: 24, }} sm={{ span: 5, }}>
                            <C_Input
                                label={ "Días crédito"}
                                placeholder={ "INGRESAR DÍAS CRÉDITO..." }
                                value={ cliente.diascredito }
                                onChange={ onChangeDiasCredito }
                                disabled={ disabled.data }
                                error={error.diascredito}
                                message={message.diascredito}
                            />
                        </Col>
                        <Col xs={{ span: 24, }} sm={{ span: 5, }}>
                            <C_Input
                                label={ "Límite crédito"}
                                placeholder={ "INGRESAR LÍMITE CRÉDITO..." }
                                value={ cliente.limitecredito }
                                onChange={ onChangeLimiteCredito }
                                disabled={ disabled.data }
                                error={error.limitecredito}
                                message={message.limitecredito}
                            />
                        </Col>
                    </Row>
                </div>
            </div>
            <Row gutter={ [12, 8] }>
                <Col xs={{ span: 24, }} sm={{ span: 16, }}>
                    <Row gutter={ [12, 8] }>
                        <Col xs={{ span: 24, }} sm={{ span: 8, }}>
                            <C_Input
                                label={ "(%) Dscto."}
                                placeholder={ "INGRESAR DESCUENTO..." }
                                value={ cliente.descuento }
                                onChange={onChangeDescuento}
                                disabled={ disabled.data }
                                error={error.descuento}
                                message={message.descuento}
                            />
                        </Col>
                        <Col xs={{ span: 24, }} sm={{ span: 8, }}>
                            <C_Input
                                label={ "Cant. items"}
                                placeholder={ "INGRESAR CANTIDAD ITEMS..." }
                                value={ cliente.cantidaditems }
                                onChange={onChangeCantidadItems}
                                disabled={ disabled.data }
                                error={error.cantidaditems}
                                message={message.cantidaditems}
                            />
                        </Col>
                        <Col xs={{ span: 24, }} sm={{ span: 8, }}>
                            <C_Input
                                label={ "(%)Dscto. Cant. items"}
                                placeholder={ "INGRESAR CANTIDAD ITEMS..." }
                                value={ cliente.descuentoxcantidaditems }
                                onChange={onChangeDescuentoXCantidadItems}
                                disabled={ disabled.data }
                                error={error.descuentoxcantidaditems}
                                message={message.descuentoxcantidaditems}
                            />
                        </Col>
                    </Row>
                    <Row gutter={ [12, 8] }>
                        <Col xs={{ span: 24, }} sm={{ span: 8, }}>
                            <C_Input
                                label={ "(%) Dscto. ini."}
                                placeholder={ "INGRESAR DESCUENTO INICIAL..." }
                                value={ cliente.descuentoinicial }
                                onChange={onChangeDescuentoInicial}
                                disabled={ disabled.data }
                                error={error.descuentoinicial}
                                message={message.descuentoinicial}
                            />
                        </Col>
                        <Col xs={{ span: 24, }} sm={{ span: 8, }}>
                            <C_Input
                                label={ "(%) Dscto. fin."}
                                placeholder={ "INGRESAR DESCUENTO FINAL..." }
                                value={ cliente.descuentofinal }
                                onChange={onChangeDescuentoFinal}
                                disabled={ disabled.data }
                                error={error.descuentofinal}
                                message={message.descuentofinal}
                            />
                        </Col>
                    </Row>
                </Col>
                <Col xs={{ span: 24, }} sm={{ span: 8, }}>
                    <Row gutter={ [12, 8] }>
                        <Col xs={{ span: 24, }} sm={{ span: 12, }}>
                            <C_Input
                                label={ "Deuda actual."}
                                placeholder={ "INGRESAR DEUDA ACTUAL..." }
                                value={ cliente.montototaladeudado }
                                onChange={onChangeMontoTotalAdeudado}
                                disabled={ disabled.data }
                                error={error.montototaladeudado}
                                message={message.montototaladeudado}
                            />
                        </Col>
                    </Row>
                    <Row gutter={ [12, 8] }>
                        <Col xs={{ span: 24, }} sm={{ span: 12, }}>
                            <C_Date
                                label={"F. ult. pago"}
                                value={ cliente.fechaultimopago }
                                onChange={ onChangeFechaUltimoPago }
                                disabled={ disabled.data }
                                error={error.fechaultimopago}
                                message={message.fechaultimopago}
                            />
                        </Col>
                        <Col xs={{ span: 24, }} sm={{ span: 12, }}>
                            <C_Input
                                label={ "Mto. ult. pago"}
                                placeholder={ "INGRESAR DEUDA ACTUAL..." }
                                value={ cliente.montototaladeudadoultimopago }
                                onChange={onChangeMontoTotalAdeudadoUltimoPago}
                                disabled={ disabled.data }
                                error={error.montototaladeudadoultimopago}
                                message={message.montototaladeudadoultimopago}
                            />
                        </Col>
                    </Row>
                    <Row gutter={ [12, 8] }>
                        <Col xs={{ span: 24, }} sm={{ span: 12, }}>
                            <C_Date
                                label={"F. ult. vta."}
                                value={ cliente.fechaultimaventa }
                                onChange={ onChangeFechaUltimaVenta }
                                disabled={ disabled.data }
                                error={error.fechaultimaventa}
                                message={message.fechaultimaventa}
                            />
                        </Col>
                        <Col xs={{ span: 24, }} sm={{ span: 12, }}>
                            <C_Input
                                label={ "Mto. ult. vta."}
                                placeholder={ "INGRESAR DEUDA ACTUAL..." }
                                value={ cliente.montototalultimaventa }
                                onChange={onChangeMontoTotalUltimaVenta}
                                disabled={ disabled.data }
                                error={error.montototalultimaventa}
                                message={message.montototalultimaventa}
                            />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    );
};

C_Form.propTypes = {
    cliente: PropTypes.object,
    disabled:     PropTypes.object,

    onChange:     PropTypes.func.isRequired,
    onPressEnter: PropTypes.func,
};

C_Form.defaultProps = {
    onChange: ( evt ) => {},
};

export default C_Form;
