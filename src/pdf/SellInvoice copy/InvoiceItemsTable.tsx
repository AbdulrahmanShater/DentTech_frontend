import { View, StyleSheet } from '@react-pdf/renderer';
import InvoiceTableHeader from './Table/InvoiceTableHeader'
import InvoiceTableRow from './Table/InvoiceTableRow'
import InvoiceTableBlankSpace from './Table/InvoiceTableBlankSpace'
import InvoiceTableFooter from './Table/InvoiceTableFooter'
import { SellInvoice } from '@/models/invoice/sellInvoice';


const styles = StyleSheet.create({
    tableContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 10,
        borderWidth: 1,
        borderColor: '#000',
    },
});

const InvoiceItemsTable = (props: { invoice: SellInvoice }) => {
    const { invoice } = props;
    return <View style={styles.tableContainer}>
        <InvoiceTableHeader />
        <InvoiceTableRow items={invoice.invoiceItems} />
    </View>
};

export default InvoiceItemsTable