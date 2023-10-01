import { CreateCompanyInterface, CreateJsonR } from "@/api/interface/company/create"
import CompanyService from "@/api/services/CompanyService";
import MyToast from "@/hooks/toast";
import { useEffect, useState } from "react"

export default function CreateCompanyContainer() {

    const [loading, setLoading] = useState<boolean>(false);


    const [data, setData] = useState<CreateCompanyInterface>({ vendor: false, price_stage: 1 });

    const inputHandeler = (event: any) => {
        var value = event.target.value;
        const name = event.target.name;
        console.log(name + " : " + value)
        if (value == "" || value == null) {
            value = undefined;
        }
        setData((prev) => ({ ...prev, [name]: value }));
    }


    // const inputHandeler = (event: any) => {
    //     const { name, value } = event.target;
    //     setData((prev) => ({ ...prev, [name]: value }));
    // };

    const submitHandler = () => {
        console.log(data)
        CompanyService.create(data)
            .then(response => {
                const res: CreateJsonR = response.data;
                // setCustomers(res.data)
                // dispatch(setCustomersRedux(res.data))
                setLoading(false)
            })
            .catch(error => {
                const status = error.response.status;
                setLoading(false)
                const res: CreateJsonR = error.response.data;
                switch (status) {
                    case 422:
                        // new MyToast(res.message).error();
                        break;
                    case 500:
                        new MyToast("حدث خطأ تقني!").error();
                        break;
                    case 401:
                        new MyToast("يرجى تسجيل الدخول").error();
                        break;
                    default:
                        new MyToast(res.message).error();
                        break;
                }
            });
    }

    // useEffect(() => {
    //     console.log(data)
    // }, [data])

    return {
        inputHandeler,
        submitHandler,
        data,
    }
}