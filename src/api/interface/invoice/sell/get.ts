import { BaseJsonResponse } from "@/api/config/BaseJson";
import { SellInvoice } from "@/models/invoice/sellInvoice";

export interface GetAllJsonR extends BaseJsonResponse<SellInvoice[], {}> { }
export interface GetOneJsonR extends BaseJsonResponse<SellInvoice, {}> { }

