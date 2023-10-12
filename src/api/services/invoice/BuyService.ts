import URL from "../../config/url";
import http from "../../config/http";
import { CreateInterface, DeleteInterface } from "../../interface/invoice/buy";

const getAll = async () => {
    return (await http()).put((await URL()).BUY_INVOICE_URL.GET_ALL);
};
const getById = async (data: { id: number }) => {
    return (await http()).post((await URL()).BUY_INVOICE_URL.GET_ALL + "/" + data.id);
};
const create = async (data: CreateInterface) => {
    return (await http())
        .post((await URL()).BUY_INVOICE_URL.CREATE, data);
};

const trash = async (data: DeleteInterface) => {
    return (await http()).delete((await URL()).BUY_INVOICE_URL.DELETE + "/" + data.id);
};

const BuyInvoiceService = {
    create, trash, getAll, getById
};


export default BuyInvoiceService;