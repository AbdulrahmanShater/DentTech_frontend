import { CreateItemER, CreateItemInterface, CreateJsonR } from "@/api/interface/item"
import ItemService from "@/api/services/ItemService";
import { CreateValidation } from "@/api/validation/item";
import { ConfirmDialog } from "@/components/MyDialog/Confirm";
import MyTools from "@/hooks/MyTools";
import { httpErrorHandler } from "@/hooks/httpErrorHandler";
import MyToast from "@/hooks/toast";
import { useState, useMemo } from "react"
import { AiFillSave } from "react-icons/ai";

export default function CreateContainer() {

    const myTools = MyTools()

    const [loading, setLoading] = useState<boolean>(false);


    const [data, setData] = useState<CreateItemInterface | undefined>(undefined);

    const [errors, setErrors] = useState<CreateItemER | undefined>();

    const canSaveEditData = useMemo(() => {
        if (data !== undefined) {
            if (!myTools.areAllValuesUndefined<CreateItemInterface>(data)) {
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
        const validate = CreateValidation(data);
        if (validate !== undefined) {
            setErrors(validate)
            return;
        }
        ItemService.create(data)
            .then(response => {
                const res: CreateJsonR = response.data;
                new MyToast(res.message).success();
                if (!props.reInter) {
                    document.location.replace("/item")
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
            document.location.replace("/item")
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
                    document.location.replace("/item")
                }
            },
        })
    }

    return {
        inputHandeler,
        submitHandler,
        backHandlerHandler,
        data,
        errors,
        loading,
        canSaveEditData,
    }
}