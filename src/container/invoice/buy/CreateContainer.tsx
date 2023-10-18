import { CreateER, CreateInterface, CreateJsonR, InvoiceItemInterface } from "@/api/interface/invoice/buy";
import BuyInvoiceService from "@/api/services/invoice/BuyService";
import { CreateValidation } from "@/api/validation/invoice/buy";
import { ConfirmDialog } from "@/components/MyDialog/Confirm";
import MyTools from "@/hooks/MyTools";
import { httpErrorHandler } from "@/hooks/httpErrorHandler";
import MyToast from "@/hooks/toast";
import { useEffect, useState, useMemo } from "react"
import { AiFillSave } from "react-icons/ai";


export interface TableItemModel extends InvoiceItemInterface {
    rowId?: number,
}

export default function CreateContainer() {

    const myTools = MyTools()

    const [loading, setLoading] = useState<boolean>(false);

    // const [tableItems, setTableItems] = useState<TableItemModel[]>([])

    const [data, setData] = useState<CreateInterface | undefined>();

    const [errors, setErrors] = useState<CreateER | undefined>();

    const tableItemsTotalValue: number = useMemo(() => {
        var total = 0;
        if (data?.invoiceItems)
            for (let index = 0; index < data.invoiceItems.length; index++) {
                const element = data.invoiceItems[index];
                total += (Number(element.quantity) * Number(element.unitPrice))
            }
        return total;
    }, [data?.invoiceItems])



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

        if (data == undefined) {
            new MyToast("No Data To Save!").warning()
            return;
        };
        const validate = CreateValidation({ ...data });
        if (validate !== undefined) {
            setErrors(validate)
            return;
        }
        BuyInvoiceService.create(data)
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

    return {
        inputHandeler,
        submitHandler,
        backHandlerHandler,
        data,
        setData,
        tableItemsTotalValue,
        // tableItemsTotalValue,
        errors,
        loading,
        canSaveEditData,
        // tableItems,
        // setTableItems,
    }
}