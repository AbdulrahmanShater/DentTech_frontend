import URL from "../config/url";
import http from "../config/http";
import { CreateCustomerInterface, EditCustomerInterface, DeleteCustomerInterface } from "../interface/customer";

const getAll = async () => {
    return (await http()).put((await URL()).CUSTOMER_URL.GET_ALL);
};
const getById = async (data: { id: number }) => {
    return (await http()).post((await URL()).CUSTOMER_URL.GET_ALL + "/" + data.id);
};
const create = async (data: CreateCustomerInterface) => {
    return (await http())
        .post((await URL()).CUSTOMER_URL.CREATE, data);
};

const update = async (data: EditCustomerInterface) => {
    return (await http()).put((await URL()).CUSTOMER_URL.UPDATE + "/" + data.id, data);
};

const trash = async (data: DeleteCustomerInterface) => {
    return (await http()).delete((await URL()).CUSTOMER_URL.DELETE + "/" + data.id);
};
const getBuyers = async () => {
    return (await http()).put((await URL()).CUSTOMER_URL.GET_BUYERS);
};
const getVendors = async () => {
    return (await http()).put((await URL()).CUSTOMER_URL.GET_VENDORS);
};
const CustomerService = {
    create, update, trash, getAll, getById, getBuyers, getVendors
};


export default CustomerService;