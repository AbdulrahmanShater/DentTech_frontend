import { BaseJsonResponse } from "@/api/config/BaseJson";

export interface DeleteCustomerInterface {
    id?: number,
}

export interface DeleteCustomerInterfaceER {
    id?: string,
}
export interface DeleteJsonR extends BaseJsonResponse<{}, DeleteCustomerInterfaceER> { }
