import MyTools from "@/hooks/MyTools";
import { CreateInterface, CreateInterfaceER } from "../interface/payment";

export function CreateValidation(data: CreateInterface): CreateInterfaceER | undefined {

    const myTools = MyTools();



    var amount: string | undefined = undefined;
    var paymentDate: string | undefined = undefined;
    var paymentNumber: string | undefined = undefined;
    var reference: string | undefined = undefined;
    var invoicePayments: string | undefined = undefined;


    if (data.amount == undefined) amount = "amount is required";

    if (data.paymentDate == undefined) paymentDate = "paymentDate is required";

    if (data.paymentNumber == undefined) paymentNumber = "paymentNumber is required";
    if (data.reference == undefined) reference = "reference is required";
    if (data.paymentNumber == undefined) paymentNumber = "paymentNumber is required";





    const validate: CreateInterfaceER = {
        amount: amount,
        paymentDate: paymentDate,
        paymentNumber: paymentNumber,
        reference: reference,
        invoicePayments: invoicePayments,
    }

    return myTools.objectIsUndefined<CreateInterfaceER>(validate) ? undefined : validate;
}
