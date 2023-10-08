import { BaseJsonResponse } from "@/api/config/BaseJson";
import { Customer } from "@/models/customer";

export interface EditCustomerInterface {
    id?: number,
    name?: string,
    tel?: string,
    poBox?: string,
    email?: string,
    address?: string,
    trn?: string,
    vendor?: boolean,
    price_stage?: number,

}
export interface EditCustomerInterfaceER  {
    id?: string,
    name?: string,
    tel?: string,
    poBox?: string,
    email?: string,
    address?: string,
    trn?: string,
    vendor?: string,
    price_stage?: string,
}


export interface UpdateJsonR extends BaseJsonResponse<Customer[], EditCustomerInterfaceER> { }
