import { BaseJsonResponse } from "@/api/config/BaseJson";
import { Company } from "@/models/company";

export interface RegisterInterface {
    firstname?: string,
    email?: string,
    password?: string,
    lastname?: string,
    role?: number,
    company?: number,
}
export interface RegisterInterfaceER extends RegisterInterface {

}


export type RegisterJsonRType = {
    access_token: string,
    refresh_token: string
}
export interface RegisterJsonR extends BaseJsonResponse<RegisterJsonRType, RegisterInterfaceER> { }
