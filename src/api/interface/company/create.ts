import { BaseJsonResponse } from "@/api/config/BaseJson";
import { Company } from "@/models/company";

export interface CreateCompanyInterface {
    name?: string,
    tel?: string,
    poBox?: string,
    email?: string,
    address?: string,
    trn?: string,
    vendor?: boolean,
    price_stage?: number,
}
export interface CreateCompanyER {
    name?: string,
    tel?: string,
    poBox?: string,
    email?: string,
    address?: string,
    trn?: string,
    vendor?: string,
    price_stage?: string,
}

export interface CreateJsonR extends BaseJsonResponse<Company[], CreateCompanyER> { }
