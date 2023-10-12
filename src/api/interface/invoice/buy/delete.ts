import { BaseJsonResponse } from "@/api/config/BaseJson";

export interface DeleteInterface {
    id?: number,
}

export interface DeleteInterfaceER {
    id?: string,
}
export interface DeleteJsonR extends BaseJsonResponse<{}, DeleteInterfaceER> { }
