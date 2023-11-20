import React from 'react';
import { Page, Document, Image, StyleSheet, PDFViewer, View, Text, PDFDownloadLink } from '@react-pdf/renderer';

import InvoiceFooter from './InvoiceFooter';
// import invoiceHeaderImg from './invoiceHeader.png'
import InvoiceHeaderInfo from './InvoiceHeaderInfo';
import InvoiceItemsTable from './InvoiceItemsTable'
import InvoiceNo from './InvoiceNo'
import InvoiceSummary from './InvoiceSummary';
import InvoiceTitle from './InvoiceTitle'

// import { invoice } from './data'
import { SellInvoice } from '@/models/invoice/sellInvoice';

const styles = StyleSheet.create({
    page: {
        fontFamily: 'Helvetica',
        position: "relative",
        fontSize: 11,
        paddingTop: 30,
        paddingLeft: 60,
        paddingRight: 60,
        lineHeight: 1.5,
        flexDirection: 'column',
    },
    imageSection: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        zIndex: "10px"
    },
    invoiceHeaderImg: {
        width: "100%",
        height: 66,
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    logo: {
        width: 100,
        height: 66,
        marginLeft: 'auto',
        marginRight: 'auto'
    },

});


export default function SellInvoicePdf(props: { invoice: SellInvoice }) {

    const { invoice } = props;
    return <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.imageSection}>
                <Image style={styles.invoiceHeaderImg} src={'/logo/invoiceHeader.png'}  />
                <InvoiceTitle title='Sell Invoice' trn={invoice.invoiceNumber} />
            </View>
            <InvoiceNo invoice={invoice} />
            <InvoiceHeaderInfo invoice={invoice} />
            <InvoiceItemsTable invoice={invoice} />
            <InvoiceSummary invoice={invoice} />
            <InvoiceFooter />
        </Page>
    </Document>
};

