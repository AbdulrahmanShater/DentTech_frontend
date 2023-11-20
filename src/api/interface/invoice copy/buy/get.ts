import { BaseJsonResponse } from "@/api/config/BaseJson";
import { BuyInvoice } from "@/models/invoice/buyInvoice";

export interface GetAllJsonR extends BaseJsonResponse<BuyInvoice[], {}> { }
export interface GetOneJsonR extends BaseJsonResponse<BuyInvoice, {}> { }

