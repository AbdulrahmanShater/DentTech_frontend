import { BaseJsonResponse } from "@/api/config/BaseJson";
import { Payment } from "@/models/company";

export interface GetAllJsonR extends BaseJsonResponse<Payment[], {}> { }

