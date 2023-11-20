import URL from "../config/url";
import http from "../config/http";
import { CreateCompanyInterface, EditCompanyInterface, DeleteCompanyInterface } from "../interface/company";


const getAll = async () => {
    return (await http()).put((await URL()).COMPANY_URL.GET_ALL);
};

const getById = async (data: { id: number }) => {
    return (await http()).post((await URL()).COMPANY_URL.GET_ALL + "/" + data.id);
};
const create = async (data: CreateCompanyInterface) => {
    return (await http())
        .post((await URL()).COMPANY_URL.CREATE, data);
};

const update = async (data: EditCompanyInterface) => {
    return (await http()).put((await URL()).COMPANY_URL.UPDATE + "/" + data.id, data);
};

const trash = async (data: DeleteCompanyInterface) => {
    return (await http()).delete((await URL()).COMPANY_URL.DELETE + "/" + data.id);
};

const CompanyService = {
    create, update, trash, getAll,getById,
};


export default CompanyService;