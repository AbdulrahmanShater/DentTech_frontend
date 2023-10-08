import { BaseJsonResponse } from "@/api/config/BaseJson";
import { Customer } from "@/models/customer";

export interface CreateCustomerInterface {
    name?: string,
    tel?: string,
    poBox?: string,
    email?: string,
    address?: string,
    trn?: string,
    vendor?: boolean,
    price_stage?: number,
}
export interface CreateCustomerER {
    name?: string,
    tel?: string,
    poBox?: string,
    email?: string,
    address?: string,
    trn?: string,
    vendor?: string,
    price_stage?: string,
}

export interface CreateJsonR extends BaseJsonResponse<Customer[], CreateCustomerER> { }
