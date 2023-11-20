import { BaseJsonResponse } from "@/api/config/BaseJson";
import { SellInvoice } from "@/models/invoice/sellInvoice";

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
    reference?: string;
    invoiceDate?: number;
    patientName?: string;
    fileNumber?: string;
    shade?: string;
    jobOrder?: string;
    invoiceItems?: InvoiceItemInterface[];
}
export interface CreateER {
    discount?: string;
    invoiceNumber?: string;
    reference?: string;
    customer?: string;
    invoiceItems?: string,
    invoiceDate?: string;
    patientName?: string;
    fileNumber?: string;
    shade?: string;
    jobOrder?: string;

}

export interface CreateJsonR extends BaseJsonResponse<SellInvoice[], CreateER> { }
