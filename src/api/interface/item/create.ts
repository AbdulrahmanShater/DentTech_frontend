import { BaseJsonResponse } from "@/api/config/BaseJson";
import { Item } from "@/models/item";

export interface CreateItemInterface {
    name?: string;
    description?: string;
    price1?: number;
    price2?: number;
    price3?: number;
    price4?: number;
}
export interface CreateItemER {
    name?: string;
    description?: string;
    price1?: string;
    price2?: string;
    price3?: string;
    price4?: string;
}

export interface CreateJsonR extends BaseJsonResponse<Item[], CreateItemER> { }