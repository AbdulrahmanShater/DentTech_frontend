import { Customer } from "../customer";
import { Item } from "../item";

export type SellInvoice = {
    id: number;
    invoiceNumber: string,
    paid: boolean;
    sell: boolean;
    discount: number;
    total: number;
    invoiceDate: string;
    reference: string | null;
    invoiceItems: SellInvoiceItem[],
    user: Customer,
    patientName?: string;
    fileNumber?: string;
    shade?: string | null;
    jobOrder?: string;
};

export type SellInvoiceItem = {
    id: number;
    quantity: number;
    unitPrice: number;
    item: Item;
};
