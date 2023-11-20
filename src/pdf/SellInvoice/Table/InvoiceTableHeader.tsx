import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        bordeColor: '#000',
        borderBottomWidth: 1,
        alignItems: 'center',
        textAlign: 'center',
        fontStyle: 'bold',
        flexGrow: 1,
    },
    noCol: {
        width: '8%',
        borderRightWidth: 1,
        textAlign: "center",
    },
    descriptionCol: {
        width: '50%',
        borderRightWidth: 1,
    },
    headerCol: {
        width: "10%",
        borderRightWidth: 1,
        textAlign: "center",
    },
    amountCol: {
        width: "12%",
        borderRightWidth: 0,
        textAlign: "center",
    },
});

const InvoiceTableHeader = () => (
    <View style={styles.container}>
        <Text style={styles.noCol} >{"No"}</Text>
        <Text style={styles.descriptionCol}> {"Work Description"} </Text>
        <Text style={styles.headerCol}>{"Qty"} </Text>
        <Text style={styles.headerCol}> {"VAT%"}</Text>
        <Text style={styles.headerCol}> {"Item Price"} </Text>
        <Text style={styles.amountCol}> {"Amount"} </Text>
    </View>
);

export default InvoiceTableHeader