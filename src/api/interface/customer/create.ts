import { BaseJsonResponse } from "@/api/config/BaseJson";
import { Customer } from "@/models/customer";

export interface CreateCustomerInterface {
    firstName?: string,
    lastName?: string,
    tel?: string,
    email?: string,
    password?: string,
    company?: number,
    userRole?: number,
}
export interface CreateCustomerER {
    firstName?: string,
    lastName?: string,
    tel?: string,
    email?: string,
    password?: string,
    company?: string,
}

export interface CreateJsonR extends BaseJsonResponse<Customer[], CreateCustomerER> { }
