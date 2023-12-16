import React from 'react';
import { Page, Document, Image, StyleSheet, PDFViewer, View, Text, PDFDownloadLink } from '@react-pdf/renderer';


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
    // So Declarative and unDRY 👌
    row1: {
        width: '16.6%',
        textAlign: "center",
    },
    row2: {
        width: '16.6%',
        textAlign: "center",
    },
    row3: {
        width: '33.6%',
        textAlign: "center",
    },
    row4: {
        width: '16.6%',
        textAlign: "center",
    },
    row5: {
        width: '16.6%',
        textAlign: "center",
    },
})

export type StatmentPdfType = {
    name: string, date: string, Dr: string, title: string, total: number, data: { invoiceNo: string, PatientName: string, InvoiceDate: string, Amount: number }[]
}
export default function StatmentPdf({ title, name, date, Dr, data, total }: StatmentPdfType) {

    return <Document>
        <Page size="A4" style={
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
                <View style={{
                    flexDirection: 'column',
                    alignItems: "center",
                    marginVertical: 50,
                }}>
                    <Text style={{
                        color: '#ff0000',
                        letterSpacing: 1,
                        fontSize: 18,
                        textAlign: 'center',
                    }}>{title}</Text>
                </View>
            </View>
            <View style={{
                display: "flex",
                flexDirection: "column",
                gap: "4px",
                width: "100%",
                textAlign: "left",
                color: '#000000',
                fontSize: 10,
                marginBottom: "20px"
            }}>
                <Text>{`Name: ${name}`}</Text>
                <Text>{`Date: ${date}`}</Text>
                <Text>{`DR: ${Dr}`}</Text>
            </View>

            {/* Table */}
            <View style={styles.table}>
                <View style={[styles.row, styles.bold, styles.header]}>
                    <Text style={styles.row1}>{"No"}</Text>
                    <Text style={styles.row2}>{"Invoice.No"}</Text>
                    <Text style={styles.row3}>{"Patient Name"}</Text>
                    <Text style={styles.row4}>{"Invoice Date"}</Text>
                    <Text style={styles.row5}>{"Amount"}</Text>
                </View>
                {data.map((row, index) => (
                    <View key={index.toString()} style={styles.row} wrap={false}>
                        <Text style={styles.row1}>
                            <Text style={styles.bold}>{index + 1}</Text>
                        </Text>
                        <Text style={styles.row2}>{row.invoiceNo}</Text>
                        <Text style={styles.row3}>{row.PatientName}</Text>
                        <Text style={styles.row4}>
                            <Text style={styles.bold}>{row.InvoiceDate}</Text>
                        </Text>
                        <Text style={styles.row5}>{Number(row.Amount).toLocaleString('en')}</Text>
                    </View>
                ))}
            </View>

            {/* Total Amount */}
            <View style={{
                width: "100%",
                textAlign: 'left',
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                fontSize: 14,
                gap: "8px",
                border: "1px",
                borderColor: "#66a1d7"
            }}>
                <Text style={{
                    backgroundColor: '#66a1d7',
                    color: "#fff",
                    width: "20%",
                    textAlign: "center",
                }}>{"Total"}
                </Text>
                <Text style={{
                    width: "80%",
                }}>{Number(total).toLocaleString('en')}
                </Text>
            </View>


            {/* Terms And Conditions */}
            <Text style={{
                marginTop: "50px",
                width: "100%",
                textAlign: 'left',
            }}>
                <Text style={{
                    color: '#66a1d7',
                    fontSize: 14,
                }}>{"Terms and Condition"}
                </Text>
                <Text style={{
                    fontSize: 9,
                    color: "#aaaaaa"
                }}>{" Payment due in 60 days from statement date."}
                </Text>
            </Text>
        </Page>
    </Document>
};

