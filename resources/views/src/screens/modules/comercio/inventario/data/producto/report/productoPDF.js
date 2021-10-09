
import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Document, Font, Page, PDFViewer, StyleSheet, Text, View } from '@react-pdf/renderer';

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
        paddingHorizontal: 30,
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

function ProductoPDF( props ) {

    const { producto } = props;
    const [ loading, setLoading ] = useState( false );

    return (
        <PDFViewer style={ styles.init } >
            <Document title="REPORTE PRODUCTO" onRender={ ( ) => {
                setLoading( true );
            } }>
                <Page size="A4" style={ styles.page }>

                    <View style={styles.title}>
                        <Text>
                            PRODUCTO
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
                                { producto.fecha } 
                            </Text>
                            <Text style={{ paddingBottom: 3, paddingLeft: 10, }}> 
                                { producto.hora } 
                            </Text>
                            <Text style={{ paddingBottom: 2, }} render={({ pageNumber, totalPages }) => (
                                `Pag: ${ pageNumber } / ${ totalPages }`
                            )} fixed />
                        </View>
                    </View>

                    <View style={ [{ flexDirection: 'row', marginTop: 5, }, styles.borderBottomColor] }>
                        <View style={{ width: '10%', }}>
                            <Text style={ styles.thead }> 
                                NRO
                            </Text>
                        </View>
                        <View style={{ width: '15%', }}>
                            <Text style={ styles.thead }> 
                                CÓDIGO
                            </Text>
                        </View>
                        <View style={{ width: '25%', }}>
                            <Text style={ styles.thead }> 
                                NOMBRE
                            </Text>
                        </View>
                        <View style={{ width: '10%', }}>
                            <Text style={ styles.thead }> 
                                NIVEL
                            </Text>
                        </View>
                        <View style={{ width: '15%', }}>
                            <Text style={ styles.thead }> 
                                TIPO
                            </Text>
                        </View>
                        <View style={{ width: '10%', }}>
                            <Text style={ styles.thead }> 
                                ORIGEN
                            </Text>
                        </View>
                        <View style={{ width: '15%', }}>
                            <Text style={ styles.thead }> 
                                CATEGORÍA
                            </Text>
                        </View>
                    </View>

                    { producto.arrayProducto.map( ( item, key ) => {
                        return (
                            <View key={key} style={ { flexDirection: 'row', marginTop: 5, } }>
                                <View style={{ width: '10%', }}>
                                    <Text style={ styles.tbody }> 
                                        {/* { item.idciudadclasificacion }  */}
                                        { key + 1 } 
                                    </Text>
                                </View>
                                <View style={{ width: '15%', }}>
                                    <Text style={ styles.tbody }> 
                                        { item.codigo && item.codigo } 
                                    </Text>
                                </View>
                                <View style={{ width: '25%', }}>
                                    <Text style={ styles.tbody }> 
                                        { item.nombre } 
                                    </Text>
                                </View>
                                <View style={{ width: '10%', }}>
                                    <Text style={ styles.tbody }> 
                                        { item.nivel } 
                                    </Text>
                                </View>
                                <View style={{ width: '15%', }}>
                                    <Text style={ styles.tbody }> 
                                        { item.productotipo } 
                                    </Text>
                                </View>
                                <View style={{ width: '10%', }}>
                                    <Text style={ styles.tbody }> 
                                        { item.ciudadorigen } 
                                    </Text>
                                </View>
                                <View style={{ width: '15%', }}>
                                    <Text style={ styles.tbody }> 
                                        { item.categoria } 
                                    </Text>
                                </View>
                            </View>
                        );
                    } ) }

                </Page>
            </Document>
        </PDFViewer>
    );

};

ProductoPDF.propTypes = {
    producto: PropTypes.object,

    visible: PropTypes.bool,
};

ProductoPDF.defaultProps = {
    visible: false,
};

export default ProductoPDF;
