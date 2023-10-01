// import URL from "@/app/src/api/config/url";
// import { http, httpType } from "@/app/src/api/config/http";
// import { CreateCompanyInterface } from "@/app/src/api/interface/company/create";
// import { EditCompanyInterface } from "@/app/src/api/interface/company/edit";
// import { DeleteCompanyInterface } from "@/app/src/api/interface/company/delete";
import URL from "../config/url";
import http from "../config/http";
import { CreateCompanyInterface, EditCompanyInterface, DeleteCompanyInterface } from "../interface/company";
// import http from "../config/http";


const getAll = async () => {
    return (await http()).get((await URL()).COMPANY_URL.GET_ALL);
};

const create = async (data: CreateCompanyInterface) => {
    return (await http())
        .post((await URL()).COMPANY_URL.CREATE, data);
};

const update = async (data: EditCompanyInterface) => {
    return (await http()).post((await URL()).COMPANY_URL.UPDATE, data);
};

const trash = async (data: DeleteCompanyInterface) => {
    return (await http()).post((await URL()).COMPANY_URL.DELETE, data);
};

const CompanyService = {
    create, update, trash, getAll,
};


export default CompanyService;