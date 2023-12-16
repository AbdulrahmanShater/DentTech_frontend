import MyToast from "@/hooks/toast";
import { useEffect, useState, useCallback } from "react"
import { httpErrorHandler } from "@/hooks/httpErrorHandler";
import { ConfirmDialog } from "@/components/MyDialog/Confirm";
import { AiOutlineDelete } from "react-icons/ai";
import PaymentService from "@/api/services/PaymentService";
import { GetAllJsonR } from "@/api/interface/payment";
import { Payment } from "@/models/payment";
import { SellInvoice } from "@/models/invoice/sellInvoice";

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

        PaymentService.getAll()
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

    return {
        data,
        loading,
    }
}
