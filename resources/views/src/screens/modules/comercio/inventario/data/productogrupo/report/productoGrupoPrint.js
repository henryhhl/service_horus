
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ReactToPrint from 'react-to-print';


class ProductoGrupoPrint extends Component {
    constructor( props ) {
        super( props );
        this.state = {};
    };
    render() {
        const { productoGrupo } = this.props;
        return (
            <>
                <ReactToPrint
                    trigger={ () => <a style={{ display: 'none', }} id="productogrupo_print">Generar</a>}
                    content={ () => this.componentProductoGrupoRef }
                >
                </ReactToPrint>
                <div style={{ display: 'none' }}>
                    <ProductoGrupoComponent
                        productoGrupo={productoGrupo} 
                        ref={ el => (this.componentProductoGrupoRef = el) }
                    />
                </div>
            </>
        );
    };
};

class ProductoGrupoComponent extends Component {

    constructor( props ) {
        super( props );
        this.state = {};
    };

    render() {

        const { productoGrupo } = this.props;
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
                            <th colSpan='3' style={ ttitle }>
                                PRODUCTO GRUPO
                            </th>
                        </tr>
                    </tbody>
    
                    <tbody>
                        <tr>
                            <th colSpan='3' style={{ fontSize: 10, paddingTop: 5, color: 'grey', }}>
                                <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', }}>
                                    <div style={{ paddingLeft: 40, display: 'block'  }}>
                                        <div>HORUS S.R.L.</div>
                                        <div>Av. El Trompillo Nro. 1029 </div>
                                        <div>Telf.</div>
                                        <div>N.I.T. 317672026</div>
                                    </div>
                                    <div style={{ paddingRight: 40, display: 'block' }}>
                                        <div> { productoGrupo.fecha }</div>
                                        <div style={{ paddingLeft: 5, }}> { productoGrupo.hora }</div>
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
                            <th style={{ paddingTop: 10, paddingLeft: 40, borderBottom: '1px solid #E8E8E8', }}>
                                <strong style={ thead }> BREVE </strong>
                            </th>
                            <th style={{ paddingTop: 10, paddingRight: 40, borderBottom: '1px solid #E8E8E8', }}>
                                <strong style={ thead }> DESCRIPCIÓN </strong>
                            </th>
                            
                        </tr>
                        { productoGrupo.arrayProductoGrupo.map(
                            ( item, key ) => (
                                <tr key={key}>
                                    <th style={ Object.assign( tbody, { paddingLeft: 40, } ) }>
                                        { key + 1 }
                                    </th>
                                    <th style={ Object.assign( tbody, { paddingRight: 40, } ) }>
                                        { item.abreviatura }
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

ProductoGrupoPrint.propTypes = {
    productoGrupo: PropTypes.object,
};

ProductoGrupoPrint.defaultProps = {
};

export default ProductoGrupoPrint;
