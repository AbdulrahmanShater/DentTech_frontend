import React from 'react';
import { Document } from '@react-pdf/renderer';
import { SellInvoice } from '@/models/invoice/sellInvoice';
import { SellInvoicePdfPage } from '../SellInvoice';

export type StatmentPdfType = {
    invoices: SellInvoice[]
}
export default function AllInvoicesPdf({ invoices }: StatmentPdfType) {

    return <Document>
        {
            invoices.map((invoice) => <SellInvoicePdfPage invoice={invoice} />)
        }
    </Document>
};

