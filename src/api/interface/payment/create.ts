import { BaseJsonResponse } from "@/api/config/BaseJson";

export interface CreateInterface {
    amount?: number,
    paymentDate?: string,
    paymentNumber?: string,
    reference?: string,
    invoicePayments?: number[],
    paymentMode?:number
}
export interface CreateInterfaceER {
    amount?: string,
    paymentDate?: string,
    paymentNumber?: string,
    reference?: string,
    invoicePayments?: string,
}

export interface CreateJsonR extends BaseJsonResponse<{}, CreateInterfaceER> { }
