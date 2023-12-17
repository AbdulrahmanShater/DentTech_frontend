import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// Define the custom size for the card
const cardWidth = 200;
const cardHeight = 300;

// Create styles for the card
const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#fff',
        padding: 10,
        width: cardWidth,
        height: cardHeight,
    },
    section: {
        margin: 10,
        padding: 10,
        paddingLeft: 0,
        flexGrow: 1,
        width: "100%",
    },
    content: {
        fontSize: 12,
        marginBottom: 5,
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    },
});

// Define the content of the card
export const CardPdf = ({ client, doctor, fileNo, issueddate, orderNo, patient }: { client: string, doctor: string, patient: string, fileNo: string, orderNo: string, issueddate: string }) => (
    <Document>
        <Page size={{ width: cardWidth, height: cardHeight }} style={{
            display: "flex",
            flexDirection: 'row',
            gap: 10,
            backgroundColor: '#fff',
            padding: 10,
            width: cardWidth,
            height: cardHeight,
            fontSize: "14px"
        }} orientation='landscape'>
            <View style={{ width: "30%", display: "flex", flexDirection: "column", gap: 10, justifyContent: "space-around" }}>
                <Text> {`Client:`}</Text>
                <Text> {`Doctor:`}</Text>
                <Text> {`Patient:`}</Text>
                <Text> {`File No:`}</Text>
                <Text> {`Order No:`}</Text>
                <Text> {`Issued date:`}</Text>
            </View>
            <View style={{ width: "70%", display: "flex", flexDirection: "column", gap: 10, justifyContent: "space-around" }}>
                <Text> {`${client}`}</Text>
                <Text> {`${doctor}`}</Text>
                <Text> {`${patient}`}</Text>
                <Text> {`${fileNo}`}</Text>
                <Text> {`${orderNo}`}</Text>
                <Text> {`${issueddate}`}</Text>
            </View>
        </Page>
    </Document>
);
// // Define the content of the card
// export const CardPdf = ({ chruc, doctor, fileNo, issueddate, orderNo, patient }: { chruc: string, doctor: string, patient: string, fileNo: string, orderNo: string, issueddate: string }) => (
//     <Document>
//         <Page size={{ width: cardWidth, height: cardHeight }} style={styles.page} orientation='landscape'>
//             <View style={styles.section}>
//                 <View style={styles.content}>
//                     <Text> {`Chruc:`}</Text>
//                     <Text> {`${chruc}`}</Text>
//                 </View>
//                 <View style={styles.content}>
//                     <Text> {`Doctor:`}</Text>
//                     <Text> {`${doctor}`}</Text>
//                 </View>
//                 <View style={styles.content}>
//                     <Text> {`Patient:`}</Text>
//                     <Text> {`${patient}`}</Text>
//                 </View>
//                 <View style={styles.content}>
//                     <Text> {`File No:`}</Text>
//                     <Text> {`${fileNo}`}</Text>
//                 </View>
//                 <View style={styles.content}>
//                     <Text> {`Order No:`}</Text>
//                     <Text> {`${orderNo}`}</Text>
//                 </View>
//                 <View style={styles.content}>
//                     <Text> {`Issued date:`}</Text>
//                     <Text> {`${issueddate}`}</Text>
//                 </View>
//             </View>
//         </Page>
//     </Document>
// );
