import URL from "../config/url";
import http from "../config/http";
import { CreateInterface } from "../interface/payment";



const create = async (data: CreateInterface) => {
    return (await http())
        .post((await URL()).PAYMENT_URL.CREATE, data);
};

const getAll = async () => {
    return (await http()).put((await URL()).PAYMENT_URL.GET_ALL);
};

const PaymentService = {
    create, getAll
};


export default PaymentService;