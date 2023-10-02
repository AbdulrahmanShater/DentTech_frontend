import { BaseJsonResponse } from "@/api/config/BaseJson";
import { EditCompanyInterfaceER } from "./edit";

export interface DeleteCompanyInterface {
    id?: number,
}

export interface DeleteJsonR extends BaseJsonResponse<{}, EditCompanyInterfaceER> { }
