import { BaseJsonResponse } from "@/api/config/BaseJson";
import { BuyInvoice } from "@/models/invoice/buyInvoice";

export interface InvoiceItemInterface {
    rowId?: number, // this for invoice items table only not for backend
    quantity?: string;
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
    invoiceItems?: string,
    invoiceDate?: string;

}

export interface CreateJsonR extends BaseJsonResponse<BuyInvoice[], CreateER> { }
