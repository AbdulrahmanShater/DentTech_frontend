import { BaseJsonResponse } from "@/api/config/BaseJson";
import { Company } from "@/models/company";

export interface LoginInterface {
    email?: string,
    password?: string,
}
export interface LoginInterfaceER extends LoginInterface {
}

export interface LoginJsonR extends BaseJsonResponse<{}, LoginInterfaceER> { }
