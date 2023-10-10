import { BaseJsonResponse } from "@/api/config/BaseJson";
import { Item } from "@/models/item";

export interface GetAllJsonR extends BaseJsonResponse<Item[], {}> { }
export interface GetOneJsonR extends BaseJsonResponse<Item, {}> { }

