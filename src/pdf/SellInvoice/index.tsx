import React, { Fragment, useMemo } from 'react';
import { Page, Document, Image, StyleSheet, View, Text } from '@react-pdf/renderer';

import { SellInvoice } from '@/models/invoice/sellInvoice';

const styles = StyleSheet.create({
    title: {
        fontSize: 12,
        textAlign: 'center',
        textTransform: 'uppercase',
    }
});


interface InvoicePdfProp { invoice: SellInvoice, type: "customer" | "customer_patient" }
export default function SellInvoicePdf(props: InvoicePdfProp) {

    return <Document>
        <SellInvoicePdfPage {...props} />
    </Document>
};

export function SellInvoicePdfPage(props: InvoicePdfProp) {
    const { invoice } = props;
    return <Page size="A4" style={
        {
            fontFamily: 'Helvetica',
            position: "relative",
            fontSize: 11,
            paddingTop: 30,
            paddingLeft: 60,
            paddingRight: 60,
            lineHeight: 1.5,
            flexDirection: 'column',
        }
    }>
        <View style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            zIndex: "10px"
        }}>
            <Image style={{
                width: "100%",
                height: 66,
                marginLeft: 'auto',
                marginRight: 'auto'
            }} src={'/logo/invoiceHeader.png'} />
            <InvoiceTitle title='Tax Invoice' trn={String(invoice.user.company?.trn)} />
        </View>

        {/* Invoice Number */}
        <View style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            gap: "4px",
            marginTop: 10,
        }}>
            <Text >{"No: "}</Text>
            <Text >{invoice.invoiceNumber}</Text>
        </View >


        <View style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            gap: "4px",
            marginTop: 10,
        }}>
            <Text >{"Issued Date: "}</Text>
            <Text >{invoice.invoiceDate}</Text>
        </View >


        {/* Invoice Header Info (Customer Info & Patient Info)*/}
        <InvoiceHeaderInfo {...props} />

        {/* Table */}
        <InvoiceItemsTable invoice={invoice} />
        <InvoiceSummary invoice={invoice} />

        {/* Footer */}
        <View style={{
            width: "100%",
            display: "flex",
            flexDirection: 'row',
            justifyContent: "space-around",
            marginTop: 5
        }}>
            <Text style={styles.title}>{"Receiver's Signature"}</Text>
            <Text style={styles.title}>{"Signature"} </Text>
        </View>
    </Page>
};


const InvoiceHeaderInfo = ({ invoice, type }: InvoicePdfProp) => {

    const styles = StyleSheet.create({
        outerContainer: {
            flexDirection: 'row',
            width: "100%",
            justifyContent: "space-between",
            gap: "4px",
            marginVertical: 2
        },
        innerContainer: {
            flexDirection: 'column',
            alignItems: "flex-start",
            border: "1px #000000 solid",
            width: "50%",
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
            {
                type == "customer_patient" ? <View style={styles.innerContainer}>
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
                </View> : null
            }
        </View >
    </Fragment>
};
const InvoiceItemsTable = ({ invoice }: { invoice: SellInvoice }) => {

    const styles = StyleSheet.create({
        table: {
            width: '100%',
        },
        row: {
            display: 'flex',
            flexDirection: 'row',
            borderTop: '1px solid #EEE',
            paddingTop: 8,
            paddingBottom: 8,
        },
        header: {
            borderTop: 'none',
            backgroundColor: '#66a1d7',
            color: "#fff"
        },
        bold: {
            fontWeight: 'bold',
        },
        row1: {
            width: '9.6%',
            textAlign: "center",
        },
        row2: {
            width: '11.3%',
            textAlign: "center",
        },
        row3: {

            width: '33.9%',
            textAlign: "center",
        },
        row4: {
            width: '11.3%',
            textAlign: "center",
        },
        row5: {
            width: '11.3%',
            textAlign: "center",
        },
        row6: {
            width: '11.3%',
            textAlign: "center",
        },
        row7: {
            width: '11.3%',
            textAlign: "center",
        },
    })

    return <Fragment>
        <View style={styles.table}>
            <View style={[styles.row, styles.bold, styles.header]}>
                <Text style={styles.row1}>{"No"}</Text>
                <Text style={styles.row2}>{"Item"}</Text>
                <Text style={styles.row3}>{"Description"}</Text>
                <Text style={styles.row4}>{"Qty"}</Text>
                <Text style={styles.row5}>{"VAT%"}</Text>
                <Text style={styles.row6}>{"Item Price"}</Text>
                <Text style={styles.row7}>{"Amount"}</Text>
            </View>
            {invoice.invoiceItems.map((item, index) => (
                <View key={index.toString()} style={styles.row} wrap={false}>
                    <Text style={[styles.bold, styles.row1]}>{index + 1}</Text>
                    <Text style={styles.row2}>{item.item.name}</Text>
                    <Text style={styles.row3}>{item.item.description}</Text>
                    <Text style={styles.row4}>{item.quantity}</Text>
                    <Text style={styles.row5}>{0}</Text>
                    <Text style={[styles.row6, styles.bold]}>{Number((item.unitPrice).toFixed(2)).toLocaleString('en')}</Text>
                    <Text style={styles.row7}>{Number((item.unitPrice * item.quantity).toFixed(2)).toLocaleString('en')}</Text>
                </View>
            ))}
        </View>
    </Fragment>

}

const InvoiceSummary = ({ invoice }: { invoice: SellInvoice }) => {

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
const InvoiceTitle = ({ title, trn }: { title: string, trn: string }) => {
    const styles = StyleSheet.create({

        titleContainer: {
            display: "flex",
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
    return <View style={styles.titleContainer}>
        <Text style={styles.reportTitle}>{title}</Text>
        <Text style={styles.TRNTitle}>{`TRN: ${trn}`}</Text>
    </View>
};