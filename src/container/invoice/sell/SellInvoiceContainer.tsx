import MyToast from "@/hooks/toast";
import { useEffect, useState, useCallback } from "react"
import { httpErrorHandler } from "@/hooks/httpErrorHandler";
import { ConfirmDialog } from "@/components/MyDialog/Confirm";
import { AiOutlineDelete } from "react-icons/ai";
import { SellInvoice } from "@/models/invoice/sellInvoice";
import SellInvoiceService from "@/api/services/invoice/SellService";
import { DeleteJsonR, GetAllJsonR } from "@/api/interface/invoice/sell";


export default function SellInvoiceContainer() {


    const [data, setData] = useState<SellInvoice[]>([]);

    const [loading, setLoading] = useState<false>(false);

    let mounted = false;

    const onload = useCallback(() => {
        if (!mounted) {
            getSellInvoicesHandler()
            mounted = true;
        }
    }, []);

    useEffect(() => {
        onload()
    }, [onload])

    const getSellInvoicesHandler = () => {
      
        SellInvoiceService.getAll()
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
                    SellInvoiceService.trash(data)
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