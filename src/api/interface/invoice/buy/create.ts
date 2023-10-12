import { BaseJsonResponse } from "@/api/config/BaseJson";
import { BuyInvoice } from "@/models/invoice/buyInvoice";

interface InvoiceItemInterface {
    quantity?: number;
    unitPrice?: string;
    item?: number;
}
export interface CreateInterface {
    discount?: number;
    customer?: number;
    invoiceNumber?: number;
    reference?: number;
    invoiceDate?: number;
    invoiceItems?: InvoiceItemInterface[];
}
export interface CreateER {
    discount?: string;
    invoiceNumber?: string;
    reference?: string;
    customer?: string;
    invoiceItems?:string,
    invoiceDate?: string;
}

export interface CreateJsonR extends BaseJsonResponse<BuyInvoice[], CreateER> { }
