import MyTools from "@/hooks/MyTools";
import { CreateCompanyInterface, CreateCompanyER } from "../interface/company";

export function CreateValidation(company: CreateCompanyInterface): CreateCompanyER | undefined {

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
    if (company.name == undefined) name = "name is required"
    else if (company.name.length < 3 || company.name.length > 60) name = "name max length 60 and min is 3";

    // tel
    if (company.tel == undefined) tel = "phoneNumber is required"
    else if (!company.tel.startsWith("+")) tel = "phoneNumber must starts with +";
    else if (company.tel.length < 5) tel = "phoneNumber min length is 5";

    // poBox
    if (company.poBox == undefined) name = "poBox is required"
    else if (company.poBox.length < 3 || company.poBox.length > 60) poBox = "poBox max length 60 and min is 3";

    // email
    if (company.email == undefined) email = "email is required"
    else if (!myTools.isValidEmailRGX(company.email)) email = "email is invalid";

    // trn
    if (company.trn == undefined) trn = "trn is required"
    else if (company.trn.length != 15) trn = "TRN number must be 15 digits";

    // address
    if (company.address == undefined) address = "address is required";

    // vendor
    if (company.vendor == undefined) vendor = "vendor is required";

    // price stage
    if (company.price_stage == undefined) price_stage = "vendor is required"
    else if (company.price_stage < 0 || company.price_stage > 3) price_stage = "price stage must be between 0 and 3";


    const validate: CreateCompanyER = {
        name: name,
        tel: tel,
        address: address,
        email: email,
        poBox: poBox,
        price_stage: price_stage,
        trn: trn,
        vendor: vendor
    }

    return myTools.objectIsUndefined<CreateCompanyER>(validate) ? undefined : validate;
}   