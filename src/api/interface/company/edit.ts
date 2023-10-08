import { BaseJsonResponse } from "@/api/config/BaseJson";
import { Company } from "@/models/company";

export interface EditCompanyInterface {
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
export interface EditCompanyInterfaceER  {
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


export interface UpdateJsonR extends BaseJsonResponse<Company[], EditCompanyInterfaceER> { }
