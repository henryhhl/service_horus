
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ReactToPrint from 'react-to-print';


class ClientePrint extends Component {
    constructor( props ) {
        super( props );
        this.state = {};
    };
    render() {
        const { cliente } = this.props;
        return (
            <>
                <ReactToPrint
                    trigger={ () => <a style={{ display: 'none', }} id="cliente_print">Generar</a>}
                    content={ () => this.componentClienteRef }
                >
                </ReactToPrint>
                <div style={{ display: 'none' }}>
                    <ClienteComponent
                        cliente={cliente}
                        ref={ el => (this.componentClienteRef = el) }
                    />
                </div>
            </>
        );
    };
};

class ClienteComponent extends Component {

    constructor( props ) {
        super( props );
        this.state = {};
    };

    render() {

        const { cliente } = this.props;
        const thead = {
            fontSize: 10, fontFamily: 'Oswald,Roboto,sans-serif', paddingLeft: 15,
        };
        const tbody = {
            fontSize: 9, color: 'grey', paddingLeft: 8, paddingTop: 10,
        };
        const ttitle = {
            fontSize: 15, textAlign: 'center', fontFamily: 'Oswald,Roboto,sans-serif',
            paddingTop: 40, paddingLeft: 40, paddingRight: 40,
        };

        return (
            <>
                <table style={{ width: '100%', paddingLeft: 40, paddingRight: 40, }}>

                    <tbody>
                        <tr>
                            <th colSpan='9' style={ ttitle }>
                                CLIENTE
                            </th>
                        </tr>
                    </tbody>

                    <tbody>
                        <tr>
                            <th colSpan='9' style={{ fontSize: 10, paddingTop: 5, color: 'grey', }}>
                                <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', }}>
                                    <div style={{ paddingLeft: 40, display: 'block'  }}>
                                        <div>HORUS S.R.L.</div>
                                        <div>Av. El Trompillo Nro. 1029 </div>
                                        <div>Telf.</div>
                                        <div>N.I.T. 317672026</div>
                                    </div>
                                    <div style={{ paddingRight: 40, display: 'block' }}>
                                        <div> { cliente.fecha }</div>
                                        <div style={{ paddingLeft: 5, }}> { cliente.hora }</div>
                                        {/* <div>Pag: 001</div> */}
                                    </div>
                                </div>
                            </th>
                        </tr>

                    </tbody>

                    <tbody>
                        <tr>
                            <th style={{ paddingTop: 10, paddingLeft: 10, borderBottom: '1px solid #E8E8E8', }}>
                                <strong style={ thead }> NRO </strong>
                            </th>
                            <th style={{ paddingTop: 10, paddingRight: 10, borderBottom: '1px solid #E8E8E8', }}>
                                <strong style={ thead }> NOMBRE </strong>
                            </th>
                            <th style={{ paddingTop: 10, paddingRight: 10, borderBottom: '1px solid #E8E8E8', }}>
                                <strong style={ thead }> APELLIDO </strong>
                            </th>
                            <th style={{ paddingTop: 10, paddingRight: 10, borderBottom: '1px solid #E8E8E8', }}>
                                <strong style={ thead }> RAZON SOCIAL </strong>
                            </th>
                            <th style={{ paddingTop: 10, paddingRight: 10, borderBottom: '1px solid #E8E8E8', }}>
                                <strong style={ thead }> NIT </strong>
                            </th>
                            <th style={{ paddingTop: 10, paddingRight: 10, borderBottom: '1px solid #E8E8E8', }}>
                                <strong style={ thead }> TIPO </strong>
                            </th>
                            <th style={{ paddingTop: 10, paddingRight: 10, borderBottom: '1px solid #E8E8E8', }}>
                                <strong style={ thead }> CIUDAD </strong>
                            </th>
                            <th style={{ paddingTop: 10, paddingRight: 10, borderBottom: '1px solid #E8E8E8', }}>
                                <strong style={ thead }> TELEFONO </strong>
                            </th>
                            <th style={{ paddingTop: 10, paddingRight: 10, borderBottom: '1px solid #E8E8E8', }}>
                                <strong style={ thead }> CELULAR </strong>
                            </th>
                        </tr>
                        { cliente.arrayCliente.map(
                            ( item, key ) => (
                                <tr key={key}>
                                    <th style={ Object.assign( tbody, { paddingLeft: 40, } ) }>
                                        { key + 1 }
                                    </th>
                                    <th style={ Object.assign( tbody, { paddingRight: 40, } ) }>
                                        { item.nombre }
                                    </th>
                                    <th style={ Object.assign( tbody, { paddingRight: 40, } ) }>
                                        { item.apellido }
                                    </th>
                                    <th style={ Object.assign( tbody, { paddingRight: 40, } ) }>
                                        { item.razonsocial }
                                    </th>
                                    <th style={ Object.assign( tbody, { paddingRight: 40, } ) }>
                                        { item.nit ? item.nit : "" }
                                    </th>
                                    <th style={ Object.assign( tbody, { paddingRight: 40, } ) }>
                                        { item.tipocliente }
                                    </th>
                                    <th style={ Object.assign( tbody, { paddingRight: 40, } ) }>
                                        { item.ciudadpais + '-' + item.ciudad }
                                    </th>
                                    <th style={ Object.assign( tbody, { paddingRight: 40, } ) }>
                                        { item.telefono ? item.telefono : "" }
                                    </th>
                                    <th style={ Object.assign( tbody, { paddingRight: 40, } ) }>
                                        { item.celular ? item.celular : "" }
                                    </th>
                                </tr>
                            )
                        ) }

                    </tbody>
                </table>
            </>
        );

    };

};

ClientePrint.propTypes = {
    cliente: PropTypes.object,
};

ClientePrint.defaultProps = {
};

export default ClientePrint;
