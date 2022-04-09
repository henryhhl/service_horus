
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ReactToPrint from 'react-to-print';


class NotaVentaPrint extends Component {
    constructor( props ) {
        super( props );
        this.state = {};
    };
    render() {
        const { notaVenta } = this.props;
        return (
            <>
                <ReactToPrint
                    trigger={ () => <a style={{ display: 'none', }} id="notaventa_print">Generar</a>}
                    content={ () => this.componentNotaVentaRef }
                >
                </ReactToPrint>
                <div style={{ display: 'none' }}>
                    <NotaVentaComponent
                        notaVenta={notaVenta}
                        ref={ el => (this.componentNotaVentaRef = el) }
                    />
                </div>
            </>
        );
    };
};

class NotaVentaComponent extends Component {

    constructor( props ) {
        super( props );
        this.state = {};
    };

    render() {

        const { notaVenta } = this.props;
        const thead = {
            fontSize: 10, fontFamily: 'Oswald,Roboto,sans-serif', paddingLeft: 5,
        };
        const tbody = {
            fontSize: 9, color: 'grey', paddingLeft: 6, paddingTop: 10,
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
                                NOTA VENTA
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
                                        <div> { notaVenta.fecha }</div>
                                        <div style={{ paddingLeft: 5, }}> { notaVenta.hora }</div>
                                        {/* <div>Pag: 001</div> */}
                                    </div>
                                </div>
                            </th>
                        </tr>

                    </tbody>

                    <tbody>
                        <tr>
                            <th style={{ paddingTop: 10, paddingLeft: 5, borderBottom: '1px solid #E8E8E8', }}>
                                <strong style={ thead }> NRO </strong>
                            </th>
                            <th style={{ paddingTop: 10, paddingRight: 5, borderBottom: '1px solid #E8E8E8', }}>
                                <strong style={ thead }> SUCURSAL </strong>
                            </th>
                            <th style={{ paddingTop: 10, paddingRight: 5, borderBottom: '1px solid #E8E8E8', }}>
                                <strong style={ thead }> ÁLMACEN </strong>
                            </th>
                            <th style={{ paddingTop: 10, paddingRight: 5, borderBottom: '1px solid #E8E8E8', }}>
                                <strong style={ thead }> CONCEPTO </strong>
                            </th>
                            <th style={{ paddingTop: 10, paddingRight: 5, borderBottom: '1px solid #E8E8E8', }}>
                                <strong style={ thead }> VENDEDOR </strong>
                            </th>
                            <th style={{ paddingTop: 10, paddingRight: 5, borderBottom: '1px solid #E8E8E8', }}>
                                <strong style={ thead }> CLIENTE </strong>
                            </th>
                            <th style={{ paddingTop: 10, paddingRight: 5, borderBottom: '1px solid #E8E8E8', }}>
                                <strong style={ thead }> NIT </strong>
                            </th>
                            <th style={{ paddingTop: 10, paddingRight: 5, borderBottom: '1px solid #E8E8E8', }}>
                                <strong style={ thead }> CANTIDAD </strong>
                            </th>
                            <th style={{ paddingTop: 10, paddingRight: 5, borderBottom: '1px solid #E8E8E8', }}>
                                <strong style={ thead }> MONTO TOTAL </strong>
                            </th>
                        </tr>
                        { notaVenta.arrayNotaVenta.map(
                            ( item, key ) => (
                                <tr key={key}>
                                    <th style={ Object.assign( tbody, { paddingLeft: 5, } ) }>
                                        { key + 1 }
                                    </th>
                                    <th style={ Object.assign( tbody, { paddingRight: 5, } ) }>
                                        { item.sucursal }
                                    </th>
                                    <th style={ Object.assign( tbody, { paddingRight: 5, } ) }>
                                        { item.almacen }
                                    </th>
                                    <th style={ Object.assign( tbody, { paddingRight: 5, } ) }>
                                        { item.conceptoventa }
                                    </th>
                                    <th style={ Object.assign( tbody, { paddingRight: 5, } ) }>
                                        { item.vendedor }
                                    </th>
                                    <th style={ Object.assign( tbody, { paddingRight: 5, } ) }>
                                        { item.cliente }
                                    </th>
                                    <th style={ Object.assign( tbody, { paddingRight: 5, } ) }>
                                        { item.nit ? item.nit : "" }
                                    </th>
                                    <th style={ Object.assign( tbody, { paddingRight: 5, } ) }>
                                        { parseFloat(item.cantidadtotal).toFixed(2) }
                                    </th>
                                    <th style={ Object.assign( tbody, { paddingRight: 5, } ) }>
                                        { parseFloat(item.montototal).toFixed(2) }
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

NotaVentaPrint.propTypes = {
    notaVenta: PropTypes.object,
};

NotaVentaPrint.defaultProps = {
};

export default NotaVentaPrint;
