import { BaseJsonResponse } from "@/api/config/BaseJson";
import { Customer } from "@/models/customer";

export interface GetAllJsonR extends BaseJsonResponse<Customer[], {}> { }
export interface GetOneJsonR extends BaseJsonResponse<Customer, {}> { }

