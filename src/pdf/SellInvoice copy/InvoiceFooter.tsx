import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({

    footer: {
        width: "100%",
        display: "flex",
        flexDirection: 'row',
        justifyContent: "space-around",
        marginTop: 5
    },
    title: {
        fontSize: 12,
        textAlign: 'center',
        textTransform: 'uppercase',
    }
});


const InvoiceFooter = () => (
    <View style={styles.footer}>
        <Text style={styles.title}>{"Receiver's Signature"}</Text>
        <Text style={styles.title}>{"Signature"} </Text>
    </View>
);
export default InvoiceFooter