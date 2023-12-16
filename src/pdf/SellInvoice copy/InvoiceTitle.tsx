import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({

    titleContainer: {
        flexDirection: 'column',
        alignItems: "center",
        marginTop: 50,
    },
    reportTitle: {
        color: '#ff0000',
        letterSpacing: 1,
        fontSize: 18,
        textAlign: 'center',
    },
    TRNTitle: {
        color: '#000000',
        letterSpacing: 1,
        fontSize: 14,
        textAlign: 'center',
    }
});


const InvoiceTitle = (props: { title: string, trn: string }) => {
    const { title, trn } = props;
    return <View style={styles.titleContainer}>
        <Text style={styles.reportTitle}>{title}</Text>
        <Text style={styles.TRNTitle}>{`TRN: ${trn}`}</Text>
    </View>
};

export default InvoiceTitle