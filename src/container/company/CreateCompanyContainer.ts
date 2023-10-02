import { CreateCompanyER, CreateCompanyInterface, CreateJsonR } from "@/api/interface/company/create"
import CompanyService from "@/api/services/CompanyService";
import { httpErrorHandler } from "@/hooks/httpErrorHandler";
import MyToast from "@/hooks/toast";
import { Company } from "@/models/company";
import { useEffect, useState } from "react"

export default function CreateCompanyContainer() {

    const [loading, setLoading] = useState<boolean>(false);


    const [data, setData] = useState<CreateCompanyInterface>({ vendor: false, price_stage: 1 });

    const [errors, setErrors] = useState<CreateCompanyER | undefined>();


    const inputHandeler = (event: any) => {
        var value = event.target.value;
        const name = event.target.name;
        if (value == "" || value == null) {
            value = undefined;
        }
        setErrors(undefined)
        setData((prev) => ({ ...prev, [name]: value }));
    }


    const submitHandler = () => {
        CompanyService.create(data)
            .then(response => {
                const res: CreateJsonR = response.data;
                setData({ vendor: false, price_stage: 1 })
                new MyToast(res.message).success();
            })
            .catch((error) => {
                
                httpErrorHandler(error, {
                    onStatusCode: function (status: number): void {
                        const res: CreateJsonR = error.response.data;
                        switch (status) {
                            case 404:
                                new MyToast("Sorry, the requested resource could not be found. Please check your API endpoint or try again late").error()
                                break;
                            case 422:
                            case 400:
                                setErrors(res.errors)
                                break;
                            case 500:
                                break;
                            default:
                                new MyToast(res.message).error()
                                break;
                        }
                    },

                })
            }).finally(() => {
                setLoading(false)
            });
    }

    return {
        inputHandeler,
        submitHandler,
        data,
        errors,
        loading,
    }
}