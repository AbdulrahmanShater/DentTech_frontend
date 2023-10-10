import { BaseJsonResponse } from "@/api/config/BaseJson";

export interface DeleteItemInterface {
    id?: number,
}

export interface DeleteItemInterfaceER {
    id?: string,
}
export interface DeleteJsonR extends BaseJsonResponse<{}, DeleteItemInterfaceER> { }
