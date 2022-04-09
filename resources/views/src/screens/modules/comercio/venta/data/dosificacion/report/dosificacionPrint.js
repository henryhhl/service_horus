
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ReactToPrint from 'react-to-print';
import { Functions } from '../../../../../../../utils/functions';


class DosificacionPrint extends Component {
    constructor( props ) {
        super( props );
        this.state = {};
    };
    render() {
        const { dosificacion } = this.props;
        return (
            <>
                <ReactToPrint
                    trigger={ () => <a style={{ display: 'none', }} id="dosificacion_print">Generar</a>}
                    content={ () => this.componentDosificacionRef }
                >
                </ReactToPrint>
                <div style={{ display: 'none' }}>
                    <DosificacionComponent
                        dosificacion={dosificacion}
                        ref={ el => (this.componentDosificacionRef = el) }
                    />
                </div>
            </>
        );
    };
};

class DosificacionComponent extends Component {

    constructor( props ) {
        super( props );
        this.state = {};
    };

    render() {

        const { dosificacion } = this.props;
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
                            <th colSpan='11' style={ ttitle }>
                                DOSIFICACIÓN
                            </th>
                        </tr>
                    </tbody>

                    <tbody>
                        <tr>
                            <th colSpan='11' style={{ fontSize: 10, paddingTop: 5, color: 'grey', }}>
                                <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', }}>
                                    <div style={{ paddingLeft: 40, display: 'block'  }}>
                                        <div>HORUS S.R.L.</div>
                                        <div>Av. El Trompillo Nro. 1029 </div>
                                        <div>Telf.</div>
                                        <div>N.I.T. 317672026</div>
                                    </div>
                                    <div style={{ paddingRight: 40, display: 'block' }}>
                                        <div> { dosificacion.fecha }</div>
                                        <div style={{ paddingLeft: 5, }}> { dosificacion.hora }</div>
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
                                <strong style={ thead }> ACTIVIDAD ECONÓMICA </strong>
                            </th>
                            <th style={{ paddingTop: 10, paddingRight: 40, borderBottom: '1px solid #E8E8E8', }}>
                                <strong style={ thead }> DESCRIPCIÓN </strong>
                            </th>
                            <th style={{ paddingTop: 10, paddingRight: 40, borderBottom: '1px solid #E8E8E8', }}>
                                <strong style={ thead }> TIPO SUCURSAL </strong>
                            </th>
                            <th style={{ paddingTop: 10, paddingRight: 40, borderBottom: '1px solid #E8E8E8', }}>
                                <strong style={ thead }> TIPO DOSIFICACIÓN </strong>
                            </th>
                            <th style={{ paddingTop: 10, paddingRight: 40, borderBottom: '1px solid #E8E8E8', }}>
                                <strong style={ thead }> TIPO EMPRESA </strong>
                            </th>
                            <th style={{ paddingTop: 10, paddingRight: 40, borderBottom: '1px solid #E8E8E8', }}>
                                <strong style={ thead }> NIT </strong>
                            </th>
                            <th style={{ paddingTop: 10, paddingRight: 40, borderBottom: '1px solid #E8E8E8', }}>
                                <strong style={ thead }> NRO. AUTORIZACIÓN </strong>
                            </th>
                            <th style={{ paddingTop: 10, paddingRight: 40, borderBottom: '1px solid #E8E8E8', }}>
                                <strong style={ thead }> FECHA ACTIVACIÓN </strong>
                            </th>
                            <th style={{ paddingTop: 10, paddingRight: 40, borderBottom: '1px solid #E8E8E8', }}>
                                <strong style={ thead }> FECHA LIMITE EMISIÓN </strong>
                            </th>
                        </tr>
                        { dosificacion.arrayDosificacion.map(
                            ( item, key ) => (
                                <tr key={key}>
                                    <th style={ Object.assign( tbody, { paddingLeft: 5, } ) }>
                                        { key + 1 }
                                    </th>
                                    <th style={ Object.assign( tbody, { paddingRight: 5, } ) }>
                                        { item.sucursal }
                                    </th>
                                    <th style={ Object.assign( tbody, { paddingRight: 5, } ) }>
                                        { item.actividadeconomica }
                                    </th>
                                    <th style={ Object.assign( tbody, { paddingRight: 5, } ) }>
                                        { item.descripcion }
                                    </th>
                                    <th style={ Object.assign( tbody, { paddingRight: 5, } ) }>
                                        { item.tiposucursal === "S" ? "Sucursal" : "Casa Matriz" }
                                    </th>
                                    <th style={ Object.assign( tbody, { paddingRight: 5, } ) }>
                                        { item.tipodosificacion === "A" ? 'Automático' : "Manual" }
                                    </th>
                                    <th style={ Object.assign( tbody, { paddingRight: 5, } ) }>
                                        { item.tipoempresa === "N" ? "Natural" : "Jurídico" }
                                    </th>
                                    <th style={ Object.assign( tbody, { paddingRight: 5, } ) }>
                                        { item.nit }
                                    </th>
                                    <th style={ Object.assign( tbody, { paddingRight: 5, } ) }>
                                        { item.nroautorizacion }
                                    </th>
                                    <th style={ Object.assign( tbody, { paddingRight: 5, } ) }>
                                        { Functions.convertYMDToDMY( item.fechaactivacion ) }
                                    </th>
                                    <th style={ Object.assign( tbody, { paddingRight: 5, } ) }>
                                        { Functions.convertYMDToDMY( item.fechalimiteemision ) }
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

DosificacionPrint.propTypes = {
    dosificacion: PropTypes.object,
};

DosificacionPrint.defaultProps = {
};

export default DosificacionPrint;
