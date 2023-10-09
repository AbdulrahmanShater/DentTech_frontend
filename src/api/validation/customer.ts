import MyTools from "@/hooks/MyTools";
import { CreateCustomerInterface, CreateCustomerER, EditCustomerInterfaceER, EditCustomerInterface } from "../interface/customer";

export function CreateValidation(customer: CreateCustomerInterface): CreateCustomerER | undefined {

    const myTools = MyTools();

    var firstName: string | undefined = undefined;
    var lastName: string | undefined = undefined;
    var tel: string | undefined = undefined;
    var email: string | undefined = undefined;
    var password: string | undefined = undefined;
    var company: string | undefined = undefined;


    if (customer.firstName == undefined) firstName = "name is required";

    if (customer.lastName == undefined) lastName = "name is required";

    // tel
    if (customer.tel == undefined) tel = "PhoneNumber is required"
    else if (!customer.tel.startsWith("+")) tel = "phoneNumber must starts with +";
    else if (customer.tel.length < 5) tel = "PhoneNumber min length is 5";

    // email
    if (customer.email == undefined) email = "Email is required"
    else if (!myTools.isValidEmailRGX(customer.email)) email = "Email is invalid";

    if (customer.password == undefined) password = "Password is required";

    if (customer.company == undefined) company = "Company is required";



    const validate: CreateCustomerER = {
        firstName: firstName,
        lastName: lastName,
        tel: tel,
        email: email,
        password: password,
        company: company,
    }

    return myTools.objectIsUndefined<CreateCustomerER>(validate) ? undefined : validate;
}
export function EditValidation(customer: EditCustomerInterface): EditCustomerInterfaceER | undefined {
    return CreateValidation(customer);
}   