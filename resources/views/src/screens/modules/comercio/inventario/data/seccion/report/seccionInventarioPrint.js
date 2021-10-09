
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ReactToPrint from 'react-to-print';


class SeccionInventarioPrint extends Component {
    constructor( props ) {
        super( props );
        this.state = {};
    };
    render() {
        const { seccionInventario } = this.props;
        return (
            <>
                <ReactToPrint
                    trigger={ () => <a style={{ display: 'none', }} id="seccioninventario_print">Generar</a>}
                    content={ () => this.componentSeccionInventarioRef }
                >
                </ReactToPrint>
                <div style={{ display: 'none' }}>
                    <SeccionInventarioComponent
                        seccionInventario={seccionInventario} 
                        ref={ el => (this.componentSeccionInventarioRef = el) }
                    />
                </div>
            </>
        );
    };
};

class SeccionInventarioComponent extends Component {

    constructor( props ) {
        super( props );
        this.state = {};
    };

    render() {

        const { seccionInventario } = this.props;
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
                            <th colSpan='2' style={ ttitle }>
                                SECCIÓN INVENTARIO
                            </th>
                        </tr>
                    </tbody>
    
                    <tbody>
                        <tr>
                            <th colSpan='2' style={{ fontSize: 10, paddingTop: 5, color: 'grey', }}>
                                <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', }}>
                                    <div style={{ paddingLeft: 40, display: 'block'  }}>
                                        <div>HORUS S.R.L.</div>
                                        <div>Av. El Trompillo Nro. 1029 </div>
                                        <div>Telf.</div>
                                        <div>N.I.T. 317672026</div>
                                    </div>
                                    <div style={{ paddingRight: 40, display: 'block' }}>
                                        <div> { seccionInventario.fecha }</div>
                                        <div style={{ paddingLeft: 5, }}> { seccionInventario.hora }</div>
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
                                <strong style={ thead }> DESCRIPCIÓN </strong>
                            </th>
                        </tr>
                        { seccionInventario.arraySeccionInventario.map(
                            ( item, key ) => (
                                <tr key={key}>
                                    <th style={ Object.assign( tbody, { paddingLeft: 40, } ) }>
                                        { key + 1 }
                                    </th>
                                    <th style={ Object.assign( tbody, { paddingRight: 40, } ) }>
                                        { item.descripcion }
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

SeccionInventarioPrint.propTypes = {
    seccionInventario: PropTypes.object,
};

SeccionInventarioPrint.defaultProps = {
};

export default SeccionInventarioPrint;
