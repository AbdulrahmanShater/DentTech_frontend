import React, { Fragment, useMemo } from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';
import { SellInvoice } from '@/models/invoice/sellInvoice';

const styles = StyleSheet.create({
    outerContainer: {
        flexDirection: 'row',
        width: "100%",
        justifyContent: "flex-end",
        gap: "4px",
        marginTop: 10,
    },
    innerContainer: {
        display: "flex",
        flexDirection: 'column',
        alignItems: "flex-start",
        border: "1px #000000 solid",
        width: "auto",
        padding: "5px",
    },
    item: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        alignContent: "center",
        justifyContent: "space-between",
        paddingVertical: "5px",
        gap: "5px"
    },
    innerContainerHeader: {
        textAlign: "center",
        fontWeight: "bold",
        fontSize: "14px",
    },
    innerContainerText: {
        textAlign: "center",
        fontSize: "14px",
    },
});


const InvoiceSummary = (props: { invoice: SellInvoice }) => {
    const { invoice } = props;


    const total: number = useMemo(() => {
        var total = 0;
        invoice.invoiceItems.forEach((item, index) => {
            total += Number(item.quantity) * Number(item.unitPrice)
        })
        return total;
    }, [invoice.invoiceItems])

    const netPrice: number = useMemo(() => {
        return total - invoice.discount;
    }, [invoice, total])


    return <Fragment>
        <View style={styles.outerContainer}>

            <View style={styles.innerContainer}>
                <Text style={styles.innerContainerHeader}>{"Summary:"} </Text>
                <View style={styles.item}>
                    <Text style={styles.innerContainerHeader}>{"Total Amount/ AED:"} </Text>
                    <Text style={styles.innerContainerText}>{total}</Text>
                </View >
                <View style={styles.item}>
                    <Text style={styles.innerContainerHeader}>{"Discount:"} </Text>
                    <Text style={styles.innerContainerText}>{invoice.discount}</Text>
                </View >
                <View style={styles.item}>
                    <Text style={styles.innerContainerHeader}>{"Total VAT 5%:"} </Text>
                    <Text style={styles.innerContainerText}>{0}</Text>
                </View >
                <View style={styles.item}>
                    <Text style={styles.innerContainerHeader}>{"Net Total:"} </Text>
                    <Text style={styles.innerContainerText}>{netPrice}</Text>
                </View >
            </View >
        </View >
    </Fragment>
};

export default InvoiceSummary