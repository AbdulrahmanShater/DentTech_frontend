import React, { Fragment } from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';
import { SellInvoice } from '@/models/invoice/sellInvoice';

const styles = StyleSheet.create({
    invoiceDateContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: "4px",
        marginTop: 10,
    },
    invoiceDate: {
        fontSize: 12,
        fontStyle: 'bold',
    },
});


const InvoiceNo = (props: { invoice: SellInvoice }) => {
    const { invoice } = props;
    return <Fragment>
        <View style={styles.invoiceDateContainer}>
            <Text >{"Issued Date: "}</Text>
            <Text >{invoice.invoiceDate}</Text>
        </View >
    </Fragment>
};

export default InvoiceNo