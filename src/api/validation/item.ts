import MyTools from "@/hooks/MyTools";
import { CreateItemInterface, CreateItemER, EditItemInterfaceER, EditItemInterface } from "../interface/item";

export function CreateValidation(item: CreateItemInterface): CreateItemER | undefined {

    const myTools = MyTools();

    var name: string | undefined = undefined;
    var description: string | undefined = undefined;
    var price1: string | undefined = undefined;
    var price2: string | undefined = undefined;
    var price3: string | undefined = undefined;
    var price4: string | undefined = undefined;


    if (item.name == undefined) name = "name is required";

    if (item.description == undefined) description = "description is required";

    if (item.price1 == undefined) price1 = "price1 is required";

    if (item.price2 == undefined) price2 = "price2 is required";

    if (item.price3 == undefined) price3 = "price3 is required";

    if (item.price4 == undefined) price4 = "price4 is required";


    const validate: CreateItemER = {
        name: name,
        description: description,
        price1: price1,
        price2: price2,
        price3: price3,
        price4: price4,
    }

    return myTools.objectIsUndefined<CreateItemER>(validate) ? undefined : validate;
}
export function EditValidation(item: EditItemInterface): EditItemInterfaceER | undefined {
    return CreateValidation(item);
}   