import { BaseJsonResponse } from "@/api/config/BaseJson";
import { SellInvoice } from "@/models/invoice/sellInvoice";

export interface GetReportInterface {
    companyId?: number,
    beginDate?: string,
    endDate?: string,
}

export interface GetReportInterfaceER {
    companyId?: string,
    beginDate?: string,
    endDate?: string,
}
export interface GetAllJsonR extends BaseJsonResponse<SellInvoice[], {}> { }

