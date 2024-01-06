import { BaseJsonResponse } from "@/api/config/BaseJson";
import { SellInvoice } from "@/models/invoice/sellInvoice";

export interface GetReportInterface {
    companyId?: number | null,
    userId?: number | null,
    beginDate?: string,
    endDate?: string,
    // beginDate?: string,
    // endDate?: string,
}

export interface GetReportInterfaceER {
    companyId?: string,
    userId?: string,
    beginDate?: string,
    endDate?: string,
}
export interface GetAllJsonR extends BaseJsonResponse<SellInvoice[], {}> { }

