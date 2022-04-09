
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ReactToPrint from 'react-to-print';


class VendedorPrint extends Component {
    constructor( props ) {
        super( props );
        this.state = {};
    };
    render() {
        const { vendedor } = this.props;
        return (
            <>
                <ReactToPrint
                    trigger={ () => <a style={{ display: 'none', }} id="clientetipo_print">Generar</a>}
                    content={ () => this.componentVendedorRef }
                >
                </ReactToPrint>
                <div style={{ display: 'none' }}>
                    <VendedorComponent
                        vendedor={vendedor}
                        ref={ el => (this.componentVendedorRef = el) }
                    />
                </div>
            </>
        );
    };
};

class VendedorComponent extends Component {

    constructor( props ) {
        super( props );
        this.state = {};
    };

    render() {

        const { vendedor } = this.props;
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
                            <th colSpan='8' style={ ttitle }>
                                VENDEDOR
                            </th>
                        </tr>
                    </tbody>

                    <tbody>
                        <tr>
                            <th colSpan='8' style={{ fontSize: 10, paddingTop: 5, color: 'grey', }}>
                                <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', }}>
                                    <div style={{ paddingLeft: 40, display: 'block'  }}>
                                        <div>HORUS S.R.L.</div>
                                        <div>Av. El Trompillo Nro. 1029 </div>
                                        <div>Telf.</div>
                                        <div>N.I.T. 317672026</div>
                                    </div>
                                    <div style={{ paddingRight: 40, display: 'block' }}>
                                        <div> { vendedor.fecha }</div>
                                        <div style={{ paddingLeft: 5, }}> { vendedor.hora }</div>
                                        {/* <div>Pag: 001</div> */}
                                    </div>
                                </div>
                            </th>
                        </tr>

                    </tbody>

                    <tbody>
                        <tr>
                            <th style={{ paddingTop: 10, paddingLeft: 40, borderBottom: '1px solid #E8E8E8', }}>
                                <strong style={ thead }> NRO </strong>
                            </th>
                            <th style={{ paddingTop: 10, paddingRight: 40, borderBottom: '1px solid #E8E8E8', }}>
                                <strong style={ thead }> CI </strong>
                            </th>
                            <th style={{ paddingTop: 10, paddingRight: 40, borderBottom: '1px solid #E8E8E8', }}>
                                <strong style={ thead }> NOMBRE </strong>
                            </th>
                            <th style={{ paddingTop: 10, paddingRight: 40, borderBottom: '1px solid #E8E8E8', }}>
                                <strong style={ thead }> APELLIDO </strong>
                            </th>
                            <th style={{ paddingTop: 10, paddingRight: 40, borderBottom: '1px solid #E8E8E8', }}>
                                <strong style={ thead }> COMISIÓN </strong>
                            </th>
                            <th style={{ paddingTop: 10, paddingRight: 40, borderBottom: '1px solid #E8E8E8', }}>
                                <strong style={ thead }> CIUDAD </strong>
                            </th>
                            <th style={{ paddingTop: 10, paddingRight: 40, borderBottom: '1px solid #E8E8E8', }}>
                                <strong style={ thead }> DIRECCIÓN </strong>
                            </th>
                            <th style={{ paddingTop: 10, paddingRight: 40, borderBottom: '1px solid #E8E8E8', }}>
                                <strong style={ thead }> TELÉFONO </strong>
                            </th>
                        </tr>
                        { vendedor.arrayVendedor.map(
                            ( item, key ) => (
                                <tr key={key}>
                                    <th style={ Object.assign( tbody, { paddingLeft: 5, } ) }>
                                        { key + 1 }
                                    </th>
                                    <th style={ Object.assign( tbody, { paddingRight: 5, } ) }>
                                        { item.ci }
                                    </th>
                                    <th style={ Object.assign( tbody, { paddingRight: 5, } ) }>
                                        { item.nombre }
                                    </th>
                                    <th style={ Object.assign( tbody, { paddingRight: 5, } ) }>
                                        { item.apellido }
                                    </th>
                                    <th style={ Object.assign( tbody, { paddingRight: 5, } ) }>
                                        { parseFloat(item.valor).toFixed(2) }%
                                    </th>
                                    <th style={ Object.assign( tbody, { paddingRight: 5, } ) }>
                                        { item.ciudadpais } { item.ciudad }
                                    </th>
                                    <th style={ Object.assign( tbody, { paddingRight: 5, } ) }>
                                        { item.direccion && item.direccion }
                                    </th>
                                    <th style={ Object.assign( tbody, { paddingRight: 5, } ) }>
                                        { item.telefono ? item.telefono : '' } { item.celular ? item.celular : ''}
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

VendedorPrint.propTypes = {
    vendedor: PropTypes.object,
};

VendedorPrint.defaultProps = {
};

export default VendedorPrint;
