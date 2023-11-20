import MyTools from "@/hooks/MyTools";
import { CreateInterface, CreateER } from "../../interface/invoice/sell";

export function CreateValidation(data: CreateInterface): CreateER | undefined {

    const myTools = MyTools();


    var discount: string | undefined = undefined;
    var invoiceNumber: string | undefined = undefined;
    var reference: string | undefined = undefined;
    var customer: string | undefined = undefined;
    var invoiceItems: string | undefined = undefined;
    var invoiceDate: string | undefined = undefined;

    if (data.discount == undefined) discount = "discount is required"

    if (data.invoiceNumber == undefined) invoiceNumber = "invoiceNumber is required"

    if (data.reference == undefined) reference = "reference is required"

    if (data.customer == undefined) customer = "customer is required"

    if (data.invoiceDate == undefined) invoiceDate = "invoiceDate is required"

    if (data.invoiceItems == undefined || data.invoiceItems.length == 0) invoiceItems = "invoiceItems is required"


    const validate: CreateER = {
        discount: discount,
        invoiceNumber: invoiceNumber,
        reference: reference,
        customer: customer,
        invoiceItems: invoiceItems,
        invoiceDate: invoiceDate,
    }

    return myTools.objectIsUndefined<CreateER>(validate) ? undefined : validate;
}
