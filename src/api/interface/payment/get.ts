import { BaseJsonResponse } from "@/api/config/BaseJson";
import { Payment } from "@/models/payment";

export interface GetAllJsonR extends BaseJsonResponse<Payment[], {}> { }

