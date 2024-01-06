import { CreateInterface, CreateInterfaceER, CreateJsonR } from "@/api/interface/payment";
import CompanyService from "@/api/services/CompanyService";
import { CreateValidation } from "@/api/validation/payment";
import { ConfirmDialog } from "@/components/MyDialog/Confirm";
import MyTools from "@/hooks/MyTools";
import { httpErrorHandler } from "@/hooks/httpErrorHandler";
import MyToast from "@/hooks/toast";
import { useEffect, useState, useMemo, useCallback } from "react"
import { AiFillSave } from "react-icons/ai";
import { GetAllJsonR } from "@/api/interface/company";
import { GetAllJsonR as GetAllJsonR_SellInvoice } from "@/api/interface/invoice/sell";
import { Company } from "@/models/company";
import PaymentService from "@/api/services/PaymentService";
import { SellInvoice } from "@/models/invoice/sellInvoice";
import SellInvoiceService from "@/api/services/invoice/SellService";
import dayjs from "dayjs";


export default function CreatePaymentContainer() {

    const myTools = MyTools()

    const [data, setData] = useState<CreateInterface | undefined>();

    const [loading, setLoading] = useState<boolean>(false);

    const [loadingGetcompanies, setLoadingGetcompanies] = useState<boolean>(false);

    const [companies, setCompanies] = useState<Company[]>([]);

    const [invoices, setInvoices] = useState<SellInvoice[]>([]);

    const [selectedInvoices, setSelectedInvoices] = useState<SellInvoice[]>([]);

    const [selectedCompanyId, setSelectedCompanyId] = useState<number>(-1);

    const [errors, setErrors] = useState<CreateInterfaceER>({});



    const canSaveEditData = useMemo(() => {
        if (data !== undefined) {
            if (!myTools.areAllValuesUndefined<CreateInterface>(data)) {
                if (Object(data) != Object({ vendor: false, price_stage: 1 })) {
                    return true;
                }
            }
        }
        return false;
    }, [myTools])
    const paymentValue: number = useMemo(() => {
        var value: number = 0;
        selectedInvoices.forEach(element => {
            value += element.total
        });
        return value;
    }, [selectedInvoices])


    useEffect(() => {
        setData({
            paymentDate: dayjs().format('YYYY-MM-DD')
        });
    }, [])


    useEffect(() => {
        if (selectedCompanyId == -1) return;
        SellInvoiceService.getUnPaidInvoices({ companyId: selectedCompanyId })
            .then(response => {
                const res: GetAllJsonR_SellInvoice = response.data;
                setInvoices(res.data)
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
                setLoadingGetcompanies(false)
            });
    }, [selectedCompanyId])


    const inputHandeler = (event: any) => {
        var value = event.target.value;
        const name = event.target.name;
        if (value == "" || value == null) {
            value = undefined;
        }
        setErrors({})
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
        var dataToSave: CreateInterface = {
            ...data,
            amount: paymentValue,
            invoicePayments: selectedInvoices.map((inv) => inv.id),
            paymentMode: 1,
        };
        console.log(dataToSave)
        if (dataToSave == undefined) {
            new MyToast("No Data To Save!").warning()
            return;
        };
        const validate = CreateValidation(dataToSave);
        if (validate !== undefined) {
            setErrors(validate!)
            return;
        }
        // alert("validate...")
        // console.log(validate)
        PaymentService.create(dataToSave)
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

    const getcompaniesHandler = () => {

        setLoadingGetcompanies(true)
        CompanyService.getAll()
            .then(response => {
                const res: GetAllJsonR = response.data;
                setCompanies(res.data)
                if (res.data.length > 0) {
                    setData((prev) => ({ ...prev, customer: res.data[0].id }))
                    setSelectedCompanyId(res.data[0].id)
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
                setLoadingGetcompanies(false)
            });
    }

    const onload = useCallback(() => {
        getcompaniesHandler();
    }, [])

    useEffect(() => {
        onload()
    }, [onload])

    return {
        inputHandeler,
        submitHandler,
        backHandlerHandler,
        data,
        companies,
        setData,
        errors,
        loadingGetcompanies,
        loading,
        canSaveEditData,
        selectedCompanyId,
        invoices,
        selectedInvoices,
        paymentValue,
        setSelectedInvoices,
        setSelectedCompanyId
    }
}