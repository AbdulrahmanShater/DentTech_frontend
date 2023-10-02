import { BaseJsonResponse } from "@/api/config/BaseJson";
import { Company } from "@/models/company";

export interface EditCompanyInterface {
    id?: number,
    name?: string,
    tel?: string,
    poBox?: number,
    email?: string,
    address?: string,
    trn?: string,
    vendor?: boolean,
    price_stage?: number,

}
export interface EditCompanyInterfaceER extends EditCompanyInterface {

}


export interface UpdateJsonR extends BaseJsonResponse<Company[], EditCompanyInterfaceER> { }
