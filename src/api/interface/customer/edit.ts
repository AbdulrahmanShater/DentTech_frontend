import { BaseJsonResponse } from "@/api/config/BaseJson";
import { Customer } from "@/models/customer";

export interface EditCustomerInterface {
    id?: number,
    firstName?: string,
    lastName?: string,
    tel?: string,
    email?: string,
    password?: string,
    company?: number,
}
export interface EditCustomerInterfaceER {
    id?: string,
    firstName?: string,
    lastName?: string,
    tel?: string,
    email?: string,
    password?: string,
    company?: string,
}


export interface UpdateJsonR extends BaseJsonResponse<Customer[], EditCustomerInterfaceER> { }
