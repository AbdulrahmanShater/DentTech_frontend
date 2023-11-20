import React, { Fragment } from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';
import { SellInvoiceItem } from '@/models/invoice/sellInvoice';


const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        borderBottomColor: '#000',
        borderBottomWidth: 1,
        alignItems: 'center',
        paddingVertical: "10px",
        fontStyle: 'bold',
        width: "100%",
    },
    noCol: {
        width: '8%',
        borderRightWidth: 1,
        textAlign: "center",
    },
    descriptionCol: {
        width: '50%',
        borderRightWidth: 1,
        paddingLeft: "2px"
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


const InvoiceTableRow = (props: { items: SellInvoiceItem[] }) => {
    const { items } = props;
    const rows = items.map((item, index) =>
        <View style={styles.row} key={index.toString()}>
            <Text style={styles.noCol}>{index+1}</Text>
            <Text style={styles.descriptionCol}>{""}</Text>
            <Text style={styles.headerCol}>{item.quantity}</Text>
            <Text style={styles.headerCol}>{0}</Text>
            <Text style={styles.headerCol}>{item.unitPrice}</Text>
            <Text style={styles.amountCol}>{(item.unitPrice * item.quantity).toFixed(2)}</Text>
        </View>
    )
    return (<Fragment>{rows}</Fragment>)
};

export default InvoiceTableRow