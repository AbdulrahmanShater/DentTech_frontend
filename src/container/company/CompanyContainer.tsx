import { CreateCompanyER, CreateCompanyInterface, CreateJsonR } from "@/api/interface/company/create"
import CompanyService from "@/api/services/CompanyService";
import MyToast from "@/hooks/toast";
import { useEffect, useState } from "react"
import { GetServerSideProps } from 'next';
import { GetAllJsonR, DeleteCompanyInterface, } from "@/api/interface/company";
import { Company } from "@/models/company";
import { httpErrorHandler } from "@/hooks/httpErrorHandler";
import { DeleteJsonR } from "@/api/interface/company/delete";
import { ConfirmDialog } from "@/components/MyDialog/Confirm";
import { AiOutlineDelete } from "react-icons/ai";


export default function CompanyContainer() {


    const [data, setData] = useState<Company[]>([]);

    const [loading, setLoading] = useState<false>(false);

    useEffect(() => {
        getCompaniesHandler()
    }, [])


    const getCompaniesHandler = () => {
        CompanyService.getAll()
            .then(response => {
                const res: GetAllJsonR = response.data;
                setData(res.data)
                new MyToast(res.message).success();
            })
            .catch((error) => {

                httpErrorHandler(error, {
                    onStatusCode: function (status: number): void {
                        const res: GetAllJsonR = error.response.data;
                        switch (status) {
                            case 404:
                                new MyToast("Sorry, the requested resource could not be found. Please check your API endpoint or try again late").error()
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

    const submitDeleteHandler = (data: { id: number }) => {
        ConfirmDialog({
            type: "danger",
            icon: <AiOutlineDelete />,
            title: 'Are you sure to delete?',
            message: '',
            default: "no",
            onCallback(value) {
                if (value) {
                    CompanyService.trash(data)
                        .then(response => {
                            const res: DeleteJsonR = response.data;
                            setData((prev) => (prev.filter((f) => f.id.toString() != data.id.toString())))
                            new MyToast(res.message).success();
                        })
                        .catch((error) => {

                            httpErrorHandler(error, {
                                onStatusCode: function (status: number): void {
                                    const res: DeleteJsonR = error.response.data;
                                    switch (status) {
                                        case 204:
                                            setData((prev) => (prev.filter((f) => f.id.toString() != data.id.toString())))
                                            break;
                                        case 404:
                                            new MyToast("Sorry, the requested resource could not be found. Please check your API endpoint or try again late").error()
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
            },
        })

    }

    return {
        data,
        loading,
        submitDeleteHandler,
    }
}
