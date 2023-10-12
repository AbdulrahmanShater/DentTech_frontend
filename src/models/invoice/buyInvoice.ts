import { Customer } from "../customer";
import { Item } from "../item";

export type BuyInvoice = {
    id: number;
    invoiceNumber:string,
    paid: boolean;
    sell: boolean;
    discount: number;
    total: number;
    invoiceDate: string;
    reference: string | null;
    invoiceItems: BuyInvoiceItem[],
    user:Customer
};

export type BuyInvoiceItem = {
    id: number;
    quantity: number;
    unitPrice: number;
    item: Item;
};
