import URL from "../config/url";
import http from "../config/http";
import { CreateItemInterface, EditItemInterface, DeleteItemInterface } from "../interface/item";

const getAll = async () => {
    return (await http()).put((await URL()).ITEM_URL.GET_ALL);
};
const getById = async (data: { id: number }) => {
    return (await http()).post((await URL()).ITEM_URL.GET_ALL + "/" + data.id);
};
const create = async (data: CreateItemInterface) => {
    return (await http())
        .post((await URL()).ITEM_URL.CREATE, data);
};

const update = async (data: EditItemInterface) => {
    return (await http()).put((await URL()).ITEM_URL.UPDATE + "/" + data.id, data);
};

const trash = async (data: DeleteItemInterface) => {
    return (await http()).delete((await URL()).ITEM_URL.DELETE + "/" + data.id);
};

const ItemService = {
    create, update, trash, getAll, getById
};


export default ItemService;