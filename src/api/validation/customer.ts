import MyTools from "@/hooks/MyTools";
import { CreateCustomerInterface, CreateCustomerER, EditCustomerInterfaceER, EditCustomerInterface } from "../interface/customer";

export function CreateValidation(customer: CreateCustomerInterface): CreateCustomerER | undefined {

    const myTools = MyTools();

    var name: string | undefined = undefined;
    var tel: string | undefined = undefined;
    var poBox: string | undefined = undefined;
    var email: string | undefined = undefined;
    var trn: string | undefined = undefined;
    var address: string | undefined = undefined;
    var vendor: string | undefined = undefined;
    var price_stage: string | undefined = undefined;

    // name
    if (customer.name == undefined) name = "name is required"
    else if (customer.name.length < 3 || customer.name.length > 60) name = "name max length 60 and min is 3";

    // tel
    if (customer.tel == undefined) tel = "phoneNumber is required"
    else if (!customer.tel.startsWith("+")) tel = "phoneNumber must starts with +";
    else if (customer.tel.length < 5) tel = "phoneNumber min length is 5";

    // poBox
    if (customer.poBox == undefined) name = "poBox is required"
    else if (customer.poBox.length < 3 || customer.poBox.length > 60) poBox = "poBox max length 60 and min is 3";

    // email
    if (customer.email == undefined) email = "email is required"
    else if (!myTools.isValidEmailRGX(customer.email)) email = "email is invalid";

    // trn
    if (customer.trn == undefined) trn = "trn is required"
    else if (customer.trn.length != 15) trn = "TRN number must be 15 digits";

    // address
    if (customer.address == undefined) address = "address is required";

    // vendor
    if (customer.vendor == undefined) vendor = "vendor is required";

    // price stage
    if (customer.price_stage == undefined) price_stage = "vendor is required"
    else if (customer.price_stage < 0 || customer.price_stage > 3) price_stage = "price stage must be between 0 and 3";


    const validate: CreateCustomerER = {
        name: name,
        tel: tel,
        address: address,
        email: email,
        poBox: poBox,
        price_stage: price_stage,
        trn: trn,
        vendor: vendor
    }

    return myTools.objectIsUndefined<CreateCustomerER>(validate) ? undefined : validate;
}
export function EditValidation(customer: EditCustomerInterface): EditCustomerInterfaceER | undefined {
    return CreateValidation(customer);
}   