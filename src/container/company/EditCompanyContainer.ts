import { UpdateJsonR, EditCompanyInterface, EditCompanyInterfaceER } from "@/api/interface/company/edit"
import { GetOneJsonR } from "@/api/interface/company/get";
import CompanyService from "@/api/services/CompanyService";
import { EditValidation } from "@/api/validation/company";
import { httpErrorHandler } from "@/hooks/httpErrorHandler";
import MyToast from "@/hooks/toast";
import { Company } from "@/models/company";
import { useEffect, useState } from "react"

export default function EditCompanyContainer(props: { comapny_id: number }) {


    const [loading, setLoading] = useState<boolean>(false);


    const [data, setData] = useState<EditCompanyInterface>({});

    const [errors, setErrors] = useState<EditCompanyInterfaceER | undefined>();

    const [company, setCompany] = useState<Company | null>(null);

    useEffect(() => {
        if (props.comapny_id) {
            getCompanyHandler()
        }
    }, [props.comapny_id])


    const getCompanyHandler = () => {
        CompanyService.getById({ id: props.comapny_id })
            .then(response => {
                const res: GetOneJsonR = response.data;
                setCompany(res.data)
                setData((prev) => ({ ...res.data }));
                new MyToast(res.message).success();
            })
            .catch((error) => {
                httpErrorHandler(error, {
                    onStatusCode: function (status: number): void {
                        const res: GetOneJsonR = error.response.data;
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

        const validate = EditValidation(data);
        if (validate !== undefined) {
            setErrors(validate)
            return;
        }

        CompanyService.update(data)
            .then(response => {
                const res: UpdateJsonR = response.data;
                setData({})
                new MyToast(res.message).success();
                window.history.back()
            })
            .catch((error) => {
                httpErrorHandler(error, {
                    onStatusCode: function (status: number): void {
                        const res: UpdateJsonR = error.response.data;
                        switch (status) {
                            case 404:
                                new MyToast("Sorry, the requested resource could not be found. Please check your API endpoint or try again late").error()
                                break;
                            case 422:
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
        company,

    }
}