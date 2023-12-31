import { BaseJsonResponse } from "@/api/config/BaseJson";
import { Company } from "@/models/company";

export interface LoginInterface {
    email?: string,
    password?: string,
}
export interface LoginInterfaceER extends LoginInterface {
}
export type LoginJsonRType = {
    access_token: string,
    refresh_token: string
}

export interface LoginJsonR extends BaseJsonResponse<LoginJsonRType, LoginInterfaceER> { }
