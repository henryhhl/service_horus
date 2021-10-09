
import { usePDF, Document, Page, StyleSheet, Font, Text, View } from '@react-pdf/renderer';

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

const  MyDoc = ( ciudadClasificacion ) => (
  <Document title="REPORTE CIUDAD CLASIFICACIÓN" onRender>
    <Page size="A4" style={ styles.page }>

        <View style={styles.title}>
            <Text>
                Ciudad Clasificación
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
                <Text style={{ paddingBottom: 1, fontSize: 10, fontFamily: 'Oswald,Roboto,sans-serif'}}> 
                    RAL. 01.01.02
                </Text>
                <Text style={{ paddingBottom: 2, }}> 
                    { ciudadClasificacion.fecha } 
                </Text>
                <Text style={{ paddingBottom: 2, paddingLeft: 5, }}> 
                    { ciudadClasificacion.hora } 
                </Text>
                {/* <Text style={{ paddingBottom: 2, }}> 
                    Pag: 
                </Text> */}
                <Text style={{ paddingBottom: 2, }} render={({ pageNumber, totalPages }) => (
                    `Pag.: ${ pageNumber } / ${ totalPages }`
                )} fixed />
            </View>
        </View>

        <View style={ [{ flexDirection: 'row', marginTop: 5, }, styles.borderBottomColor] }>
            <View style={{ width: '20%', }}>
                <Text style={ styles.thead }> 
                    NRO
                </Text>
            </View>
            <View style={{ width: '80%', }}>
                <Text style={ styles.thead }> 
                    DESCRIPCIÓN
                </Text>
            </View>
        </View>

        { ciudadClasificacion.arrayCiudadClasificacion.map( ( item, key ) => {
            return (
                <View key={key} style={ { flexDirection: 'row', marginTop: 5, } }>
                    <View style={{ width: '20%', }}>
                        <Text style={ styles.tbody }> 
                            {/* { item.idciudadclasificacion }  */}
                            { key + 1 } 
                        </Text>
                    </View>
                    <View style={{ width: '80%', }}>
                        <Text style={ styles.tbody }> 
                            { item.descripcion } 
                        </Text>
                    </View>
                </View>
            );
        } ) }

    </Page>
</Document>
);

export const CiudadClasificacionDownloadPDF = ( { ciudadClasificacion } ) => {

  const [ instance, updateInstance] = usePDF( { document: MyDoc( ciudadClasificacion ) } );

  if ( instance.loading ) return <div> Loading ...</div>;

  if ( instance.error ) return <div>Something went wrong: {error}</div>;

  return (
    <a href={instance.url} download="test.pdf">
      Download
    </a>
  );
}