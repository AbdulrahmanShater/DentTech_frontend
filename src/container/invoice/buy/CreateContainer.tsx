import { CreateER, CreateInterface, CreateJsonR, InvoiceItemInterface } from "@/api/interface/invoice/buy";
import CustomerService from "@/api/services/CustomerService";
import BuyInvoiceService from "@/api/services/invoice/BuyService";
import { CreateValidation } from "@/api/validation/invoice/buy";
import { ConfirmDialog } from "@/components/MyDialog/Confirm";
import MyTools from "@/hooks/MyTools";
import { httpErrorHandler } from "@/hooks/httpErrorHandler";
import MyToast from "@/hooks/toast";
import { useEffect, useState, useMemo, useCallback } from "react"
import { AiFillSave } from "react-icons/ai";
import { GetAllJsonR } from "@/api/interface/customer";
import { Customer } from "@/models/customer";


export interface TableItemModel extends InvoiceItemInterface {
    rowId?: number,
}

export default function CreateContainer() {

    const myTools = MyTools()

    const [loading, setLoading] = useState<boolean>(false);

    const [loadingGetCustomers, setLoadingGetCustomers] = useState<boolean>(false);


    // const [tableItems, setTableItems] = useState<TableItemModel[]>([])

    const [data, setData] = useState<CreateInterface | undefined>();

    const [customers, setCustomers] = useState<Customer[]>([]);

    const [errors, setErrors] = useState<CreateER | undefined>();

    const discountValue: number = useMemo(() => {
        var discount = 0;
        if (data?.discount != undefined) {
            discount = data?.discount;
        }
        return discount;
    }, [data?.discount])


    const subTotalValue: number = useMemo(() => {
        console.log(data?.invoiceItems)
        var total = 0;
        if (data?.invoiceItems)
            for (let index = 0; index < data.invoiceItems.length; index++) {
                const element = data.invoiceItems[index];
                total += (Number(element.quantity) * Number(element.unitPrice))
            }
        return total;
    }, [data?.invoiceItems])


    const totalValue: number = useMemo(() => {
        return subTotalValue - discountValue;
    }, [subTotalValue, discountValue])



    const canSaveEditData = useMemo(() => {
        if (data !== undefined) {
            if (!myTools.areAllValuesUndefined<CreateInterface>(data)) {
                if (Object(data) != Object({ vendor: false, price_stage: 1 })) {
                    return true;
                }
            }
        }
        return false;
    }, [data])


    const priceStage: number | undefined = useMemo(() => {
        if (data?.customer == undefined) return undefined;
        const customer: Customer | undefined = customers.filter((f) => f.id.toString() == data.customer?.toString())[0];
        if (customer == undefined) return undefined;
        return customer.company!.price_stage;
    }, [data?.customer])


    const inputHandeler = (event: any) => {
        var value = event.target.value;
        const name = event.target.name;
        if (value == "" || value == null) {
            value = undefined;
        }
        setErrors(undefined)
        setData((prev) => ({ ...prev, [name]: value }));
    }

    const submitHandler = (props: { reInter: boolean }) => {
        if (props.reInter) {

            ConfirmDialog({
                type: "success",
                icon: <AiFillSave />,
                title: 'Do you want to keep the data?',
                message: `For new entry`,
                default: "yes",
                onCallback(value) {
                    saveHandler({ ...props, clearData: !value })
                },
            })

        } else {
            saveHandler({ ...props, clearData: true })
        }

    }

    const saveHandler = (props: { reInter: boolean, clearData: boolean }) => {
        console.log(data)
        const newData: CreateInterface = { ...data, discount: discountValue }
        if (newData == undefined) {
            new MyToast("No Data To Save!").warning()
            return;
        };
        const validate = CreateValidation(newData);
        if (validate !== undefined) {
            setErrors(validate)
            return;
        }
        alert("validate...")
        console.log(validate)
        BuyInvoiceService.create({ ...data, discount: discountValue })
            .then(response => {
                const res: CreateJsonR = response.data;
                new MyToast(res.message).success();
                if (!props.reInter) {
                    document.location.replace("/")
                }
                if (props.clearData) {
                    setData(undefined)
                }
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

    const backHandlerHandler = () => {
        if (!canSaveEditData) {
            document.location.replace("/invoice/buy")
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
                    document.location.replace("/invoice/buy")
                }
            },
        })
    }

    const getCustomersHandler = () => {
        setLoadingGetCustomers(true)
        CustomerService.getAll()
            .then(response => {
                const res: GetAllJsonR = response.data;
                setCustomers(res.data)
                if (res.data.length > 0) {
                    setData((prev) => ({ ...prev, customer: res.data[0].id }))
                }
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
                setLoadingGetCustomers(false)
            });
    }

    const onload = useCallback(() => {
        getCustomersHandler();
    }, [])
    useEffect(() => {
        onload()
    }, [onload])

    return {
        inputHandeler,
        submitHandler,
        backHandlerHandler,
        data,
        customers,
        setData,
        totalValue,
        subTotalValue,
        discountValue,

        priceStage,
        // tableItemsTotalValue,
        errors,
        loadingGetCustomers,
        loading,
        canSaveEditData,
        // tableItems,
        // setTableItems,
    }
}