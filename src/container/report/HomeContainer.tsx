import { useState, useEffect, useCallback } from "react"

import RatingService from "../../api/services/ReportService";
import { httpErrorHandler } from "../../hooks/httpErrorHandler";
import { GetReportInterface, GetReportInterfaceER, GetAllJsonR } from "../../api/interface/report";
import MyToast from "../../hooks/toast";
import { SellInvoice } from "../../models/invoice/sellInvoice";
import dayjs from "dayjs";

export default function HomeContainer() {

    const [invoices, setInvoices] = useState<SellInvoice[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const [filterData, setFilterDate] = useState<GetReportInterface>({})
    const [errors, setErrors] = useState<GetReportInterfaceER>({})


    const getRatingsHandler = useCallback(() => {

        setLoading(true)
        const beginDate = dayjs(filterData.beginDate).format('YYYY-MM-DD');
        const endDate = dayjs(filterData.endDate).format('YYYY-MM-DD');
        RatingService.getAll({
            companyId: filterData.companyId,
            beginDate: beginDate,
            endDate: endDate
        })
            .then(response => {
                const res: GetAllJsonR = response.data;
                setErrors({})
                setInvoices(res.data)
            })
            .catch(error => {
                httpErrorHandler(error, {
                    onStatusCode: function (status: number): void {
                        const res: GetAllJsonR = error.response.data;
                        switch (status) {
                            case 404:
                                new MyToast("Sorry, the requested resource could not be found. Please check your API endpoint or try again late").error()
                                break;
                            case 422:
                                setErrors(res.errors!)
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
    }, [filterData])

    // useEffect(() => {
    //     getRatingsHandler()
    // }, [getRatingsHandler])

    return {
        loading,
        invoices,
        filterData,
        getRatingsHandler,
        setFilterDate,
        errors,
    }
}