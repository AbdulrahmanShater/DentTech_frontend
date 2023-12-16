import React, { Fragment } from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';
import { SellInvoice } from '@/models/invoice/sellInvoice';

const styles = StyleSheet.create({
    outerContainer: {
        flexDirection: 'row',
        width: "100%",
        justifyContent: "space-between",
        gap: "4px",
        marginTop: 0,
    },
    innerContainer: {
        flexDirection: 'column',
        alignItems: "flex-start",
        border: "1px #000000 solid",
        width: "100%",
        padding: "5px",
    },
    innerContainerHeader: {
        width: "100%",
        fontWeight: "bold",
        fontSize: "14px",
        borderBottom: "1px #000000 solid",
        marginBottom: "5px"
    },
    innerContainerText: {
        display: "flex",
        width: "100%",
        justifyContent: "space-between",
        flexDirection: "row",
        fontWeight: "bold",
        fontSize: "14px",

    },
});


const InvoiceHeaderInfo = (props: { invoice: SellInvoice }) => {
    const { invoice } = props;
    return <Fragment>
        <View style={styles.outerContainer}>
            <View style={styles.innerContainer}>
                <Text style={styles.innerContainerHeader}>{"Customer Info:"}</Text>

                <View style={styles.innerContainerText}>
                    <Text >{"Name:"} </Text>
                    <Text >{`${invoice.user.company?.name}`}</Text>
                </View >
                <View style={styles.innerContainerText}>
                    <Text >{"Address:"} </Text>
                    <Text >{`${invoice.user.company?.address}`}</Text>
                </View >
                <View style={styles.innerContainerText}>
                    <Text >{"P.O. Box No:"} </Text>
                    <Text >{`${invoice.user.company?.poBox}`}</Text>
                </View >
                <View style={styles.innerContainerText}>
                    <Text >{"TRN No:"} </Text>
                    <Text >{`${invoice.user.company?.trn}`}</Text>
                </View >
                <View style={styles.innerContainerText}>
                    <Text >{"Phone:"} </Text>
                    <Text >{`${invoice.user.company?.tel}`}</Text>
                </View >
            </View >
            <View style={styles.innerContainer}>
                <Text style={styles.innerContainerHeader}>{"Doctor & Patient Info:"}</Text>
                <View style={styles.innerContainerText}>
                    <Text >{"Doctor:"} </Text>
                    <Text >{`${invoice.user.firstName} ${invoice.user.lastName}`}</Text>
                </View >
                <View style={styles.innerContainerText}>
                    <Text >{"Patient:"} </Text>
                    <Text >{invoice.patientName}</Text>
                </View >
                <View style={styles.innerContainerText}>
                    <Text >{"File Number:"} </Text>
                    <Text >{invoice.fileNumber}</Text>
                </View >
                <View style={styles.innerContainerText}>
                    <Text >{"Job Order No:"}</Text>
                    <Text >{invoice.jobOrder}</Text>
                </View >
            </View >
        </View >
    </Fragment>
};

export default InvoiceHeaderInfo