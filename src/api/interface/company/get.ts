import { BaseJsonResponse } from "@/api/config/BaseJson";
import { Company } from "@/models/company";



export interface GetAllJsonR extends BaseJsonResponse<Company[], {}> { }

export interface GetAllVendorsJsonR extends BaseJsonResponse<Company[], {}> { }

export interface GetOneJsonR extends BaseJsonResponse<Company, {}> { }

