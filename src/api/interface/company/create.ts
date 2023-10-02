import { BaseJsonResponse } from "@/api/config/BaseJson";
import { Company } from "@/models/company";

export interface CreateCompanyInterface {
    name?: string,
    tel?: string,
    poBox?: number,
    email?: string,
    address?: string,
    trn?: string,
    vendor?: boolean,
    price_stage?: number,
}
export interface CreateCompanyER extends CreateCompanyInterface {

}

export interface CreateJsonR extends BaseJsonResponse<Company[], CreateCompanyER> { }
