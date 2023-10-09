import { UpdateJsonR, EditCustomerInterface, EditCustomerInterfaceER } from "@/api/interface/customer/edit"
import { GetOneJsonR } from "@/api/interface/customer/get";
import CustomerService from "@/api/services/CustomerService";
import { EditValidation } from "@/api/validation/customer";
import { ConfirmDialog } from "@/components/MyDialog/Confirm";
import MyTools from "@/hooks/MyTools";
import { httpErrorHandler } from "@/hooks/httpErrorHandler";
import MyToast from "@/hooks/toast";
import { Customer } from "@/models/customer";
import { useEffect, useState, useMemo, useCallback } from "react"
import { AiFillSave } from "react-icons/ai";

export default function EditContainer(props: { customer_id: number }) {

    const myTools = MyTools()

    const [loading, setLoading] = useState<boolean>(false);

    const [data, setData] = useState<EditCustomerInterface>({});

    const [errors, setErrors] = useState<EditCustomerInterfaceER | undefined>();

    const [customer, setCustomer] = useState<Customer | null>(null);

    const canSaveEditData = useMemo(() => {
        if (data !== undefined) {
            if (!myTools.areAllValuesUndefined<EditCustomerInterface>(data)) {
                if (Object(data) != Object({ vendor: false, price_stage: 1 })) {
                    return true;
                }
            }
        }
        return false;
    }, [data])


    let mounted = false;

    const onload = useCallback(() => {
        if (!mounted) {
            getCustomerHandler()
            mounted = true;
        }
    }, []);

    useEffect(() => {
        if (props.customer_id) {
            onload()
        }
    }, [props.customer_id])


    const getCustomerHandler = () => {
        CustomerService.getById({ id: props.customer_id })
            .then(response => {
                const res: GetOneJsonR = response.data;
                setCustomer(res.data)
                setData((prev) => ({ ...res.data, company: res.data.company?.id }));
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

        if (data == undefined) {
            new MyToast("No Data To Save!").warning()
            return;
        };

        const validate = EditValidation(data);
        if (validate !== undefined) {
            setErrors(validate)
            return;
        }

        CustomerService.update(data)
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


    const backHandlerHandler = () => {
        if (!canSaveEditData) {
            document.location.replace("/customer")
            return;
        }
        ConfirmDialog({
            type: "warning",
            icon: <AiFillSave />,
            title: 'Do you want to ignore the changes?',
            message: 'The data will not be saved',
            default: "no",
            onCallback(value) {
                if (value) {
                    document.location.replace("/customer")
                }
            },
        })
    }

    return {
        inputHandeler,
        submitHandler,
        data,
        errors,
        loading,
        customer,
        canSaveEditData,
        backHandlerHandler,

    }
}