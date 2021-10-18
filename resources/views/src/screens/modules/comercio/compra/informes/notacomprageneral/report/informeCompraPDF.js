
import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Document, Font, Page, PDFViewer, StyleSheet, Text, View } from '@react-pdf/renderer';
import { Functions } from '../../../../../../../utils/functions';

Font.register( {
    family: 'Oswald,Roboto,sans-serif',
    src: '/fonts/fontfamily/oswald.ttf',
} );

const styles = StyleSheet.create( {
    init: {
        width: '100%', height: 580,
        color: "#4a4a4a", backgroundColor: "#f2f2f2",
        border: "1px solid #E8E8E8",
    },
    page: {
        backgroundColor: "#FFF",
        paddingTop: 30,
        paddingBottom: 60,
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 14,
        textAlign: 'center',
        fontFamily: 'Oswald,Roboto,sans-serif',
    },
    header: {
        fontSize: 8,
        marginBottom: 10,
        color: 'grey',
    },
    thead: {
        fontSize: 10, fontFamily: 'Oswald,Roboto,sans-serif', paddingLeft: 15,
    },
    tbody: {
        fontSize: 9, color: 'grey', paddingLeft: 8,
    },
    borderBottomColor: {
        borderBottomWidth: 1, borderBottomColor: '#e8e8e8',
    },
} );

function InformeCompraPDF( props ) {

    const { informeCompra } = props;
    const [ loading, setLoading ] = useState( false );

    function onLibroDiario() {

        let cantidadTotal = 0;
        let costoUnitarioTotal = 0;
        let costoTotal = 0;

        return (
            <>
                <View style={ [{ flexDirection: 'row', marginTop: 5, }, styles.borderBottomColor] }>
                    <View style={{ width: '5%', }}>
                        <Text style={ styles.thead }> 
                            NRO
                        </Text>
                    </View>
                    <View style={{ width: '10%', }}>
                        <Text style={ styles.thead }> 
                            FECHA
                        </Text>
                    </View>
                    <View style={{ width: '5%', }}>
                        <Text style={ styles.thead }> 
                            T.C.
                        </Text>
                    </View>

                    <View style={{ width: '15%', }}>
                        <Text style={ styles.thead }> 
                            PROVEEDOR
                        </Text>
                    </View>
                    <View style={{ width: '15%', }}>
                        <Text style={ styles.thead }> 
                            ÁLMACEN
                        </Text>
                    </View>
                    <View style={{ width: '10%', }}>
                        <Text style={ styles.thead }> 
                            CONCEPTO
                        </Text>
                    </View>
                    <View style={{ width: '10%', }}>
                        <Text style={ styles.thead }> 
                            CANTIDAD
                        </Text>
                    </View>
                    <View style={{ width: '15%', }}>
                        <Text style={ styles.thead }> 
                            COSTO
                        </Text>
                    </View>
                    <View style={{ width: '15%', }}>
                        <Text style={ styles.thead }> 
                            SUB TOTAL
                        </Text>
                    </View>
                </View>

                { informeCompra.arrayInformeCompra.map( ( informe, index ) => {
                    let cantidad = 0;
                    let costounitario = 0;
                    let costosubtotal = 0;

                    return (
                        <View key={index}>
                            <View style={ { flexDirection: 'row', marginTop: 5, } }>
                                <View style={{ width: '5%', }}>
                                    <Text style={ [styles.tbody, ] }> 
                                        { `${informe.idnotacompra}` } 
                                    </Text>
                                </View>
                                <View style={{ width: '10%', }}>
                                    <Text style={ [styles.tbody, ] }> 
                                        { `${Functions.convertYMDToDMY(informe.fechanotacompra)}` } 
                                    </Text>
                                </View>
                                <View style={{ width: '5%', }}>
                                    <Text style={ [styles.tbody, ] }> 
                                        { `${parseFloat(informe.tipocambio).toFixed(2)}` } 
                                    </Text>
                                </View>
                                <View style={{ width: '15%', }}>
                                    <Text style={ [styles.tbody, ] }> 
                                        { `${informe.proveedor}` } 
                                    </Text>
                                </View>
                                <View style={{ width: '15%', }}>
                                    <Text style={ [styles.tbody, ] }> 
                                        { `${informe.almacen}` } 
                                    </Text>
                                </View>
                                <View style={{ width: '50%', }}>
                                    <Text style={ [styles.tbody, ] }> 
                                        { `${informe.conceptocompra}` } 
                                    </Text>
                                </View>
                            </View>

                            { informe.arraynotacompradetalle.map( ( item, key ) => {
                                cantidad += parseInt(item.cantidad);
                                costounitario += parseFloat(item.costounitario);
                                costosubtotal += parseFloat(item.costosubtotal);

                                cantidadTotal += parseInt(item.cantidad);
                                costoUnitarioTotal += parseFloat(item.costounitario);
                                costoTotal += parseFloat(item.costosubtotal);

                                return (
                                    <View key={key} style={ { flexDirection: 'row', marginTop: 5, } }>
                                        <View style={{ width: '20%', }}>
                                            <Text style={ [styles.tbody, ] }> 
                                                { `${item.codigo}` } 
                                            </Text>
                                        </View>
                                        <View style={{ width: '40%', }}>
                                            <Text style={ [styles.tbody, ] }> 
                                                { `${item.producto}` } 
                                            </Text>
                                        </View>
                                        <View style={{ width: '10%', textAlign: 'right', paddingRight: 10, }}>
                                            <Text style={ [styles.tbody, ] }> 
                                                { `${parseInt(item.cantidad)}` } 
                                            </Text>
                                        </View>
                                        <View style={{ width: '15%', textAlign: 'right', paddingRight: 10, }}>
                                            <Text style={ [styles.tbody, ] }> 
                                                { `${parseFloat(item.costounitario).toFixed(2)}` } 
                                            </Text>
                                        </View>
                                        <View style={{ width: '15%', textAlign: 'right', paddingRight: 10, }}>
                                            <Text style={ [styles.tbody, ] }> 
                                                { `${parseFloat(item.costosubtotal).toFixed(2)}` } 
                                            </Text>
                                        </View>
                                    </View>
                                );
                            } )}

                            <View style={ { flexDirection: 'row', marginTop: 5, } }>
                                <View style={{ width: '60%', textAlign: 'right', paddingRight: 10, }}>
                                    <Text style={ styles.thead }> 
                                        TOTALES POR NOTA:
                                    </Text>
                                </View>
                                <View style={{ width: '10%', textAlign: 'right', paddingRight: 10, }}>
                                    <Text style={ styles.thead }> 
                                        { cantidad }
                                    </Text>
                                </View>
                                <View style={{ width: '15%', textAlign: 'right', paddingRight: 10, }}>
                                    <Text style={ styles.thead }> 
                                        { costounitario.toFixed(2) }
                                    </Text>
                                </View>
                                <View style={{ width: '15%', textAlign: 'right', paddingRight: 10, }}>
                                    <Text style={ styles.thead }> 
                                        { costosubtotal.toFixed(2) }
                                    </Text>
                                </View>
                            </View>
                        </View>
                    );
                } ) }
                <View style={ { flexDirection: 'row', marginTop: 5, } }>
                    <View style={{ width: '60%', textAlign: 'right', paddingRight: 10, }}>
                        <Text style={ styles.thead }> 
                            TOTALES GENERAL:
                        </Text>
                    </View>
                    <View style={{ width: '10%', textAlign: 'right', paddingRight: 10, }}>
                        <Text style={ styles.thead }> 
                            { cantidadTotal }
                        </Text>
                    </View>
                    <View style={{ width: '15%', textAlign: 'right', paddingRight: 10, }}>
                        <Text style={ styles.thead }> 
                            { costoUnitarioTotal.toFixed(2) }
                        </Text>
                    </View>
                    <View style={{ width: '15%', textAlign: 'right', paddingRight: 10, }}>
                        <Text style={ styles.thead }> 
                            { costoTotal.toFixed(2) }
                        </Text>
                    </View>
                </View>
            </>
        );
    };

    function onLibroMayor() {

        let cantidadTotal = 0;
        let costoUnitarioTotal = 0;
        let costoTotal = 0;

        return (
            <>
                <View style={ [{ flexDirection: 'row', marginTop: 5, }, styles.borderBottomColor] }>
                    <View style={{ width: '5%', }}>
                        <Text style={ styles.thead }> 
                            NRO
                        </Text>
                    </View>
                    <View style={{ width: '10%', }}>
                        <Text style={ styles.thead }> 
                            FECHA
                        </Text>
                    </View>
                    <View style={{ width: '5%', }}>
                        <Text style={ styles.thead }> 
                            T.C.
                        </Text>
                    </View>

                    <View style={{ width: '20%', }}>
                        <Text style={ styles.thead }> 
                            PROVEEDOR
                        </Text>
                    </View>
                    <View style={{ width: '20%', }}>
                        <Text style={ styles.thead }> 
                            ÁLMACEN
                        </Text>
                    </View>
                    <View style={{ width: '10%', }}>
                        <Text style={ styles.thead }> 
                            CANTIDAD
                        </Text>
                    </View>
                    <View style={{ width: '15%', }}>
                        <Text style={ styles.thead }> 
                            COSTO
                        </Text>
                    </View>
                    <View style={{ width: '15%', }}>
                        <Text style={ styles.thead }> 
                            SUB TOTAL
                        </Text>
                    </View>
                </View>

                { informeCompra.arrayInformeCompra.map( ( informe, index ) => {
                    let cantidad = 0;
                    let costounitario = 0;
                    let costosubtotal = 0;

                    return (
                        <View key={index}>
                            <View style={ { flexDirection: 'row', marginTop: 5, } }>
                                <View style={{ width: '7%', }}>
                                    <Text style={ [styles.tbody, { fontFamily: 'Oswald,Roboto,sans-serif', color: 'black', } ] }> 
                                        { `Producto` } 
                                    </Text>
                                </View>
                                <View style={{ width: '15%', }}>
                                    <Text style={ [styles.tbody, ] }> 
                                        { `${informe.codigo}` } 
                                    </Text>
                                </View>
                                <View style={{ width: '75%', }}>
                                    <Text style={ [styles.tbody, ] }> 
                                        { `${informe.producto}` } 
                                    </Text>
                                </View>
                            </View>

                            { informe.arraynotacompradetalle.map( ( item, key ) => {
                                cantidad += parseInt(item.cantidad);
                                costounitario += parseFloat(item.costounitario);
                                costosubtotal += parseFloat(item.costosubtotal);

                                cantidadTotal += parseInt(item.cantidad);
                                costoUnitarioTotal += parseFloat(item.costounitario);
                                costoTotal += parseFloat(item.costosubtotal);

                                return (
                                    <View key={key} style={ { flexDirection: 'row', marginTop: 5, } }>
                                        <View style={{ width: '5%', }}>
                                            <Text style={ [styles.tbody, ] }> 
                                                { `${item.idnotacompra}` } 
                                            </Text>
                                        </View>
                                        <View style={{ width: '10%', }}>
                                            <Text style={ [styles.tbody, ] }> 
                                                { `${Functions.convertYMDToDMY(item.fechanotacompra)}` } 
                                            </Text>
                                        </View>
                                        <View style={{ width: '5%', textAlign: 'right', paddingRight: 10, }}>
                                            <Text style={ [styles.tbody, ] }> 
                                                { `${parseFloat(item.tipocambio).toFixed(2)}` } 
                                            </Text>
                                        </View>
                                        <View style={{ width: '20%', }}>
                                            <Text style={ [styles.tbody, ] }> 
                                                { `${item.proveedor}` } 
                                            </Text>
                                        </View>
                                        <View style={{ width: '20%', textAlign: 'right', paddingRight: 10, }}>
                                            <Text style={ [styles.tbody, ] }> 
                                                { `${item.almacen}` } 
                                            </Text>
                                        </View>
                                        <View style={{ width: '10%', textAlign: 'right', paddingRight: 10, }}>
                                            <Text style={ [styles.tbody, ] }> 
                                                { `${parseInt(item.cantidad)}` } 
                                            </Text>
                                        </View>
                                        <View style={{ width: '15%', textAlign: 'right', paddingRight: 10, }}>
                                            <Text style={ [styles.tbody, ] }> 
                                                { `${parseFloat(item.costounitario).toFixed(2)}` } 
                                            </Text>
                                        </View>
                                        <View style={{ width: '15%', textAlign: 'right', paddingRight: 10, }}>
                                            <Text style={ [styles.tbody, ] }> 
                                                { `${parseFloat(item.costosubtotal).toFixed(2)}` } 
                                            </Text>
                                        </View>
                                    </View>
                                );
                            } )}

                            <View style={ { flexDirection: 'row', marginTop: 5, } }>
                                <View style={{ width: '60%', textAlign: 'right', paddingRight: 10, }}>
                                    <Text style={ styles.thead }> 
                                        TOTALES POR NOTA:
                                    </Text>
                                </View>
                                <View style={{ width: '10%', textAlign: 'right', paddingRight: 10, }}>
                                    <Text style={ styles.thead }> 
                                        { cantidad }
                                    </Text>
                                </View>
                                <View style={{ width: '15%', textAlign: 'right', paddingRight: 10, }}>
                                    <Text style={ styles.thead }> 
                                        { costounitario.toFixed(2) }
                                    </Text>
                                </View>
                                <View style={{ width: '15%', textAlign: 'right', paddingRight: 10, }}>
                                    <Text style={ styles.thead }> 
                                        { costosubtotal.toFixed(2) }
                                    </Text>
                                </View>
                            </View>
                        </View>
                    );
                } ) }
                <View style={ { flexDirection: 'row', marginTop: 5, } }>
                    <View style={{ width: '60%', textAlign: 'right', paddingRight: 10, }}>
                        <Text style={ styles.thead }> 
                            TOTALES GENERAL:
                        </Text>
                    </View>
                    <View style={{ width: '10%', textAlign: 'right', paddingRight: 10, }}>
                        <Text style={ styles.thead }> 
                            { cantidadTotal }
                        </Text>
                    </View>
                    <View style={{ width: '15%', textAlign: 'right', paddingRight: 10, }}>
                        <Text style={ styles.thead }> 
                            { costoUnitarioTotal.toFixed(2) }
                        </Text>
                    </View>
                    <View style={{ width: '15%', textAlign: 'right', paddingRight: 10, }}>
                        <Text style={ styles.thead }> 
                            { costoTotal.toFixed(2) }
                        </Text>
                    </View>
                </View>
            </>
        );
    };

    function onProveedorProducto() {

        let cantidadTotal = 0;
        let costoUnitarioTotal = 0;
        let costoTotal = 0;
        return (
            <>
                <View style={ [{ flexDirection: 'row', marginTop: 5, }, styles.borderBottomColor] }>
                    <View style={{ width: '5%', }}>
                        <Text style={ styles.thead }> 
                            NRO
                        </Text>
                    </View>
                    <View style={{ width: '10%', }}>
                        <Text style={ styles.thead }> 
                            FECHA
                        </Text>
                    </View>
                    <View style={{ width: '5%', }}>
                        <Text style={ styles.thead }> 
                            T.C.
                        </Text>
                    </View>

                    <View style={{ width: '40%', }}>
                        <Text style={ styles.thead }> 
                            PRODUCTO
                        </Text>
                    </View>
                    <View style={{ width: '10%', }}>
                        <Text style={ styles.thead }> 
                            CANTIDAD
                        </Text>
                    </View>
                    <View style={{ width: '15%', }}>
                        <Text style={ styles.thead }> 
                            COSTO
                        </Text>
                    </View>
                    <View style={{ width: '15%', }}>
                        <Text style={ styles.thead }> 
                            SUB TOTAL
                        </Text>
                    </View>
                </View>

                { informeCompra.arrayInformeCompra.map( ( informe, index ) => {
                    let cantidad = 0;
                    let costounitario = 0;
                    let costosubtotal = 0;

                    return (
                        <View key={index}>
                            <View style={ { flexDirection: 'row', marginTop: 5, } }>
                                <View style={{ width: '7%', }}>
                                    <Text style={ [styles.tbody, { fontFamily: 'Oswald,Roboto,sans-serif', color: 'black', } ] }> 
                                        { `Proveedor:` } 
                                    </Text>
                                </View>
                                <View style={{ width: '5%', }}>
                                    <Text style={ [styles.tbody, ] }> 
                                        { `${informe.idproveedor}` } 
                                    </Text>
                                </View>
                                <View style={{ width: '88%', }}>
                                    <Text style={ [styles.tbody, ] }> 
                                        { `${informe.proveedor}` } 
                                    </Text>
                                </View>
                            </View>

                            { informe.arraynotacompra.map( ( item, key ) => {
                                cantidad += parseInt(item.cantidad);
                                costounitario += parseFloat(item.costounitario);
                                costosubtotal += parseFloat(item.costosubtotal);

                                cantidadTotal += parseInt(item.cantidad);
                                costoUnitarioTotal += parseFloat(item.costounitario);
                                costoTotal += parseFloat(item.costosubtotal);

                                return (
                                    <View key={key} style={ { flexDirection: 'row', marginTop: 5, } }>
                                        <View style={{ width: '5%', }}>
                                            <Text style={ [styles.tbody, ] }> 
                                                { `${item.idnotacompra}` } 
                                            </Text>
                                        </View>
                                        <View style={{ width: '10%', }}>
                                            <Text style={ [styles.tbody, ] }> 
                                                { `${Functions.convertYMDToDMY(item.fechanotacompra)}` } 
                                            </Text>
                                        </View>
                                        <View style={{ width: '5%', textAlign: 'right', paddingRight: 10, }}>
                                            <Text style={ [styles.tbody, ] }> 
                                                { `${parseFloat(item.tipocambio).toFixed(2)}` } 
                                            </Text>
                                        </View>
                                        <View style={{ width: '40%', }}>
                                            <Text style={ [styles.tbody, ] }> 
                                                { `${item.codigo} ${item.producto}` } 
                                            </Text>
                                        </View>
                                        <View style={{ width: '10%', textAlign: 'right', paddingRight: 10, }}>
                                            <Text style={ [styles.tbody, ] }> 
                                                { `${parseInt(item.cantidad)}` } 
                                            </Text>
                                        </View>
                                        <View style={{ width: '15%', textAlign: 'right', paddingRight: 10, }}>
                                            <Text style={ [styles.tbody, ] }> 
                                                { `${parseFloat(item.costounitario).toFixed(2)}` } 
                                            </Text>
                                        </View>
                                        <View style={{ width: '15%', textAlign: 'right', paddingRight: 10, }}>
                                            <Text style={ [styles.tbody, ] }> 
                                                { `${parseFloat(item.costosubtotal).toFixed(2)}` } 
                                            </Text>
                                        </View>
                                    </View>
                                );
                            } )}

                            <View style={ { flexDirection: 'row', marginTop: 5, } }>
                                <View style={{ width: '60%', textAlign: 'right', paddingRight: 10, }}>
                                    <Text style={ styles.thead }> 
                                        TOTALES POR PROVEEDOR:
                                    </Text>
                                </View>
                                <View style={{ width: '10%', textAlign: 'right', paddingRight: 10, }}>
                                    <Text style={ styles.thead }> 
                                        { cantidad }
                                    </Text>
                                </View>
                                <View style={{ width: '15%', textAlign: 'right', paddingRight: 10, }}>
                                    <Text style={ styles.thead }> 
                                        { costounitario.toFixed(2) }
                                    </Text>
                                </View>
                                <View style={{ width: '15%', textAlign: 'right', paddingRight: 10, }}>
                                    <Text style={ styles.thead }> 
                                        { costosubtotal.toFixed(2) }
                                    </Text>
                                </View>
                            </View>
                        </View>
                    );
                } ) }
                <View style={ { flexDirection: 'row', marginTop: 5, } }>
                    <View style={{ width: '60%', textAlign: 'right', paddingRight: 10, }}>
                        <Text style={ styles.thead }> 
                            TOTALES GENERAL:
                        </Text>
                    </View>
                    <View style={{ width: '10%', textAlign: 'right', paddingRight: 10, }}>
                        <Text style={ styles.thead }> 
                            { cantidadTotal }
                        </Text>
                    </View>
                    <View style={{ width: '15%', textAlign: 'right', paddingRight: 10, }}>
                        <Text style={ styles.thead }> 
                            { costoUnitarioTotal.toFixed(2) }
                        </Text>
                    </View>
                    <View style={{ width: '15%', textAlign: 'right', paddingRight: 10, }}>
                        <Text style={ styles.thead }> 
                            { costoTotal.toFixed(2) }
                        </Text>
                    </View>
                </View>
            </>
        );
    };

    function onComponentReport() {

        if ( props.formato == "LD" ) {
            return onLibroDiario();
        };

        if ( props.formato == "LM" ) {
            return onLibroMayor();
        };

        if ( props.formato == "PP" ) {
            return onProveedorProducto();
        };

        let Totalmontosubtotal = 0;
        let Totalmontodescuento = 0;
        let Totalfletes = 0;
        let Totalinternacion = 0;
        let Totalotrosgastos = 0;
        let Totalimpuestototal = 0;
        let Totalmontototal = 0;
        return (
            <>
                <View style={ [{ flexDirection: 'row', marginTop: 5, }, styles.borderBottomColor] }>
                    <View style={{ width: '5%', }}>
                        <Text style={ styles.thead }> 
                            NRO
                        </Text>
                    </View>
                    <View style={{ width: '7%', }}>
                        <Text style={ styles.thead }> 
                            FECHA
                        </Text>
                    </View>
                    <View style={{ width: '5%', }}>
                        <Text style={ styles.thead }> 
                            T.C.
                        </Text>
                    </View>

                    {  props.formato == "PN" && 
                        <View style={{ width: '13%', }}>
                            <Text style={ styles.thead }> 
                                ÁLMACEN
                            </Text>
                        </View>
                    }

                    {  (props.formato == "AN" || props.formato == "CN" || props.formato == "CPN") && 
                        <View style={{ width: '13%', }}>
                            <Text style={ styles.thead }> 
                                PROVEEDOR
                            </Text>
                        </View>
                    }

                    <View style={{ width: '10%', }}>
                        <Text style={ styles.thead }> 
                            SUBTOTAL
                        </Text>
                    </View>
                    <View style={{ width: '10%', }}>
                        <Text style={ styles.thead }> 
                            TOTAL DESC
                        </Text>
                    </View>
                    <View style={{ width: '10%', }}>
                        <Text style={ styles.thead }> 
                            TOTAL FLETE
                        </Text>
                    </View>
                    <View style={{ width: '10%', }}>
                        <Text style={ styles.thead }> 
                            TOTAL INT
                        </Text>
                    </View>
                    <View style={{ width: '10%', }}>
                        <Text style={ styles.thead }> 
                            TOTAL OTR
                        </Text>
                    </View>
                    <View style={{ width: '10%', }}>
                        <Text style={ styles.thead }> 
                            IMPUESTO
                        </Text>
                    </View>
                    <View style={{ width: '10%', }}>
                        <Text style={ styles.thead }> 
                            MTO TOTAL
                        </Text>
                    </View>
                </View>
                { informeCompra.arrayInformeCompra.map( ( informe, index ) => {
                    let montosubtotal = 0;
                    let montodescuento = 0;
                    let fletes = 0;
                    let internacion = 0;
                    let otrosgastos = 0;
                    let impuestototal = 0;
                    let montototal = 0;

                    if ( props.formato == "CPN" ) {

                        montosubtotal += parseFloat(informe.montosubtotal);
                        montodescuento += parseFloat(informe.montodescuento);
                        fletes += parseFloat(informe.fletes);
                        internacion += parseFloat(informe.internacion);
                        otrosgastos += parseFloat(informe.otrosgastos);
                        impuestototal += parseFloat(informe.impuestototal);
                        montototal += parseFloat(informe.montototal);

                        Totalmontosubtotal += parseFloat(informe.montosubtotal);
                        Totalmontodescuento += parseFloat(informe.montodescuento);
                        Totalfletes += parseFloat(informe.fletes);
                        Totalinternacion += parseFloat(informe.internacion);
                        Totalotrosgastos += parseFloat(informe.otrosgastos);
                        Totalimpuestototal += parseFloat(informe.impuestototal);
                        Totalmontototal += parseFloat(informe.montototal);

                        return (
                            <View key={index} style={ { flexDirection: 'row', marginTop: 5, } }>
                                <View style={{ width: '5%', }}>
                                    <Text style={ [styles.tbody, ] }> 
                                        { `${informe.idnotacompra}` } 
                                    </Text>
                                </View>
                                <View style={{ width: '7%', }}>
                                    <Text style={ [styles.tbody, ] }> 
                                        { `${Functions.convertYMDToDMY(informe.fechanotacompra)}` } 
                                    </Text>
                                </View>
                                <View style={{ width: '5%', }}>
                                    <Text style={ [styles.tbody, ] }> 
                                        { `${parseFloat(informe.tipocambio).toFixed(2)}` } 
                                    </Text>
                                </View>
                                <View style={{ width: '13%', }}>
                                    <Text style={ [styles.tbody, ] }> 
                                        { `${informe.proveedor}` } 
                                    </Text>
                                </View>
                                <View style={{ width: '10%', textAlign: 'right', paddingRight: 10, }}>
                                    <Text style={ [styles.tbody, ] }> 
                                        { `${parseFloat(informe.montosubtotal).toFixed(2)}` } 
                                    </Text>
                                </View>
                                <View style={{ width: '10%', textAlign: 'right', paddingRight: 10, }}>
                                    <Text style={ [styles.tbody, ] }> 
                                        { `${parseFloat(informe.montodescuento).toFixed(2)}` } 
                                    </Text>
                                </View>
                                <View style={{ width: '10%', textAlign: 'right', paddingRight: 10, }}>
                                    <Text style={ [styles.tbody, ] }> 
                                        { `${parseFloat(informe.fletes).toFixed(2)}` } 
                                    </Text>
                                </View>
                                <View style={{ width: '10%', textAlign: 'right', paddingRight: 10, }}>
                                    <Text style={ [styles.tbody, ] }> 
                                        { `${parseFloat(informe.internacion).toFixed(2)}` } 
                                    </Text>
                                </View>
                                <View style={{ width: '10%', textAlign: 'right', paddingRight: 10, }}>
                                    <Text style={ [styles.tbody, ] }> 
                                        { `${parseFloat(informe.otrosgastos).toFixed(2)}` } 
                                    </Text>
                                </View>
                                <View style={{ width: '10%', textAlign: 'right', paddingRight: 10, }}>
                                    <Text style={ [styles.tbody, ] }> 
                                        { `${parseFloat(informe.impuestototal).toFixed(2)}` } 
                                    </Text>
                                </View>
                                <View style={{ width: '10%', textAlign: 'right', paddingRight: 10, }}>
                                    <Text style={ [styles.tbody, ] }> 
                                        { `${parseFloat(informe.montototal).toFixed(2)}` } 
                                    </Text>
                                </View>
                            </View>
                        );
                    }

                    return (
                        <View key={index}>


                            { props.formato == "PN" && 
                                <View style={ { flexDirection: 'row', marginTop: 5, } }>
                                    <View style={{ width: '8%', }}>
                                        <Text style={ styles.thead }> 
                                            Proveedor:
                                        </Text>
                                    </View>
                                    <View style={{ width: '92%', }}>
                                        <Text style={ [styles.tbody, { position: 'relative', top: 3, fontSize: 10, }] }> 
                                            { `${informe.idproveedor} - ${informe.nombre}` } 
                                        </Text>
                                    </View>
                                </View>
                            }

                            { props.formato == "AN" && 
                                <View style={ { flexDirection: 'row', marginTop: 5, } }>
                                    <View style={{ width: '8%', }}>
                                        <Text style={ styles.thead }> 
                                            Álmacen:
                                        </Text>
                                    </View>
                                    <View style={{ width: '92%', }}>
                                        <Text style={ [styles.tbody, { position: 'relative', top: 3, fontSize: 10, }] }> 
                                            { `${informe.idalmacen} - ${informe.almacen}` } 
                                        </Text>
                                    </View>
                                </View>
                            }

                            { props.formato == "CN" && 
                                <View style={ { flexDirection: 'row', marginTop: 5, } }>
                                    <View style={{ width: '8%', }}>
                                        <Text style={ styles.thead }> 
                                            Concepto:
                                        </Text>
                                    </View>
                                    <View style={{ width: '92%', }}>
                                        <Text style={ [styles.tbody, { position: 'relative', top: 3, fontSize: 10, }] }> 
                                            { `${informe.idconceptocompra} - ${informe.conceptocompra}` } 
                                        </Text>
                                    </View>
                                </View>
                            }

                            { informe.arraynotacompra.map( ( item, key ) => {
                                montosubtotal += parseFloat(item.montosubtotal);
                                montodescuento += parseFloat(item.montodescuento);
                                fletes += parseFloat(item.fletes);
                                internacion += parseFloat(item.internacion);
                                otrosgastos += parseFloat(item.otrosgastos);
                                impuestototal += parseFloat(item.impuestototal);
                                montototal += parseFloat(item.montototal);

                                Totalmontosubtotal += parseFloat(item.montosubtotal);
                                Totalmontodescuento += parseFloat(item.montodescuento);
                                Totalfletes += parseFloat(item.fletes);
                                Totalinternacion += parseFloat(item.internacion);
                                Totalotrosgastos += parseFloat(item.otrosgastos);
                                Totalimpuestototal += parseFloat(item.impuestototal);
                                Totalmontototal += parseFloat(item.montototal);

                                return (
                                    <View key={key} style={ { flexDirection: 'row', marginTop: 5, } }>
                                        <View style={{ width: '5%', }}>
                                            <Text style={ [styles.tbody, ] }> 
                                                { `${item.idnotacompra}` } 
                                            </Text>
                                        </View>
                                        <View style={{ width: '7%', }}>
                                            <Text style={ [styles.tbody, ] }> 
                                                { `${Functions.convertYMDToDMY(item.fechanotacompra)}` } 
                                            </Text>
                                        </View>
                                        <View style={{ width: '5%', }}>
                                            <Text style={ [styles.tbody, ] }> 
                                                { `${parseFloat(item.tipocambio).toFixed(2)}` } 
                                            </Text>
                                        </View>

                                        { props.formato == "PN" && 
                                            <View style={{ width: '13%', }}>
                                                <Text style={ [styles.tbody, ] }> 
                                                    { `${item.almacen}` } 
                                                </Text>
                                            </View>
                                        }
                                        { (props.formato == "AN" || props.formato == "CN") && 
                                            <View style={{ width: '13%', }}>
                                                <Text style={ [styles.tbody, ] }> 
                                                    { `${item.proveedor}` } 
                                                </Text>
                                            </View>
                                        }

                                        <View style={{ width: '10%', textAlign: 'right', paddingRight: 10, }}>
                                            <Text style={ [styles.tbody, ] }> 
                                                { `${parseFloat(item.montosubtotal).toFixed(2)}` } 
                                            </Text>
                                        </View>
                                        <View style={{ width: '10%', textAlign: 'right', paddingRight: 10, }}>
                                            <Text style={ [styles.tbody, ] }> 
                                                { `${parseFloat(item.montodescuento).toFixed(2)}` } 
                                            </Text>
                                        </View>
                                        <View style={{ width: '10%', textAlign: 'right', paddingRight: 10, }}>
                                            <Text style={ [styles.tbody, ] }> 
                                                { `${parseFloat(item.fletes).toFixed(2)}` } 
                                            </Text>
                                        </View>
                                        <View style={{ width: '10%', textAlign: 'right', paddingRight: 10, }}>
                                            <Text style={ [styles.tbody, ] }> 
                                                { `${parseFloat(item.internacion).toFixed(2)}` } 
                                            </Text>
                                        </View>
                                        <View style={{ width: '10%', textAlign: 'right', paddingRight: 10, }}>
                                            <Text style={ [styles.tbody, ] }> 
                                                { `${parseFloat(item.otrosgastos).toFixed(2)}` } 
                                            </Text>
                                        </View>
                                        <View style={{ width: '10%', textAlign: 'right', paddingRight: 10, }}>
                                            <Text style={ [styles.tbody, ] }> 
                                                { `${parseFloat(item.impuestototal).toFixed(2)}` } 
                                            </Text>
                                        </View>
                                        <View style={{ width: '10%', textAlign: 'right', paddingRight: 10, }}>
                                            <Text style={ [styles.tbody, ] }> 
                                                { `${parseFloat(item.montototal).toFixed(2)}` } 
                                            </Text>
                                        </View>
                                    </View>
                                );
                            } ) }
                            <View style={ { flexDirection: 'row', marginTop: 5, } }>
                                { props.formato == "PN" && 
                                    <View style={{ width: '30%', textAlign: 'right', paddingRight: 10, }}>
                                        <Text style={ styles.thead }> 
                                            TOTALES PROVEEDOR:
                                        </Text>
                                    </View>
                                }
                                { props.formato == "AN" && 
                                    <View style={{ width: '30%', textAlign: 'right', paddingRight: 10, }}>
                                        <Text style={ styles.thead }> 
                                            TOTALES ÁLMACEN:
                                        </Text>
                                    </View>
                                }
                                { props.formato == "CN" && 
                                    <View style={{ width: '30%', textAlign: 'right', paddingRight: 10, }}>
                                        <Text style={ styles.thead }> 
                                            TOTALES CONCEPTO:
                                        </Text>
                                    </View>
                                }
                                <View style={{ width: '10%', textAlign: 'right', paddingRight: 10, }}>
                                    <Text style={ styles.thead }> 
                                        { montosubtotal.toFixed(2) }
                                    </Text>
                                </View>
                                <View style={{ width: '10%', textAlign: 'right', paddingRight: 10, }}>
                                    <Text style={ styles.thead }> 
                                        { montodescuento.toFixed(2) }
                                    </Text>
                                </View>
                                <View style={{ width: '10%', textAlign: 'right', paddingRight: 10, }}>
                                    <Text style={ styles.thead }> 
                                        { fletes.toFixed(2) }
                                    </Text>
                                </View>
                                <View style={{ width: '10%', textAlign: 'right', paddingRight: 10, }}>
                                    <Text style={ styles.thead }> 
                                        { internacion.toFixed(2) }
                                    </Text>
                                </View>
                                <View style={{ width: '10%', textAlign: 'right', paddingRight: 10, }}>
                                    <Text style={ styles.thead }> 
                                        { otrosgastos.toFixed(2) }
                                    </Text>
                                </View>
                                <View style={{ width: '10%', textAlign: 'right', paddingRight: 10, }}>
                                    <Text style={ styles.thead }> 
                                        { impuestototal.toFixed(2) }
                                    </Text>
                                </View>
                                <View style={{ width: '10%', textAlign: 'right', paddingRight: 10, }}>
                                    <Text style={ styles.thead }> 
                                        { montototal.toFixed(2) }
                                    </Text>
                                </View>
                            </View>
                        </View>
                    );
                } ) }
                <View style={ { flexDirection: 'row', marginTop: 5, } }>
                    <View style={{ width: '30%', textAlign: 'right', paddingRight: 10, }}>
                        <Text style={ styles.thead }> 
                            TOTALES GENERAL:
                        </Text>
                    </View>
                    <View style={{ width: '10%', textAlign: 'right', paddingRight: 10, }}>
                        <Text style={ styles.thead }> 
                            { Totalmontosubtotal.toFixed(2) }
                        </Text>
                    </View>
                    <View style={{ width: '10%', textAlign: 'right', paddingRight: 10, }}>
                        <Text style={ styles.thead }> 
                            { Totalmontodescuento.toFixed(2) }
                        </Text>
                    </View>
                    <View style={{ width: '10%', textAlign: 'right', paddingRight: 10, }}>
                        <Text style={ styles.thead }> 
                            { Totalfletes.toFixed(2) }
                        </Text>
                    </View>
                    <View style={{ width: '10%', textAlign: 'right', paddingRight: 10, }}>
                        <Text style={ styles.thead }> 
                            { Totalinternacion.toFixed(2) }
                        </Text>
                    </View>
                    <View style={{ width: '10%', textAlign: 'right', paddingRight: 10, }}>
                        <Text style={ styles.thead }> 
                            { Totalotrosgastos.toFixed(2) }
                        </Text>
                    </View>
                    <View style={{ width: '10%', textAlign: 'right', paddingRight: 10, }}>
                        <Text style={ styles.thead }> 
                            { Totalimpuestototal.toFixed(2) }
                        </Text>
                    </View>
                    <View style={{ width: '10%', textAlign: 'right', paddingRight: 10, }}>
                        <Text style={ styles.thead }> 
                            { Totalmontototal.toFixed(2) }
                        </Text>
                    </View>
                </View>  
            </>
        );
    };

    return (
        <PDFViewer style={ styles.init } >
            <Document title="REPORTE INFORME COMPRA POR NOTAS" onRender={ ( ) => {
                setLoading( true );
            } }>
                <Page size="A4" style={ styles.page } orientation={"landscape"}>

                    <View style={styles.title}>
                        <Text>
                            INFORME COMPRA POR NOTAS
                        </Text>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 10, }}>
                        <View style={styles.header}>
                            <Text style={{ paddingBottom: 2, }}> 
                                HORUS S.R.L. 
                            </Text>
                            <Text style={{ paddingBottom: 2, }}> 
                                Av. El Trompillo Nro. 1029 
                            </Text>
                            <Text style={{ paddingBottom: 2, }}> 
                                Telf. 
                            </Text>
                            <Text style={{ paddingBottom: 2, }}> 
                                N.I.T. 317672026 
                            </Text>
                        </View>
                        
                        <View style={styles.header}>
                            <Text style={{ paddingBottom: 1, fontSize: 10, fontFamily: 'Oswald,Roboto,sans-serif', color: 'black', }}> 
                                RAL. 01.01.02
                            </Text>
                            <Text style={{ paddingBottom: 2, paddingLeft: 5, }}> 
                                { informeCompra.fecha } 
                            </Text>
                            <Text style={{ paddingBottom: 3, paddingLeft: 10, }}> 
                                { informeCompra.hora } 
                            </Text>
                            {/* <Text style={{ paddingBottom: 2, }}> 
                                Pag: 
                            </Text> */}
                            <Text style={{ paddingBottom: 2, }} render={({ pageNumber, totalPages }) => (
                                `Pag: ${ pageNumber } / ${ totalPages }`
                            )} fixed />
                        </View>
                    </View>

                    { onComponentReport() }

                </Page>
            </Document>
        </PDFViewer>
    );

};

InformeCompraPDF.propTypes = {
    informeCompra: PropTypes.object,

    visible: PropTypes.bool,
    formato: PropTypes.string,
};

InformeCompraPDF.defaultProps = {
    visible: false,
    formato: "PN",
};

export default InformeCompraPDF;
