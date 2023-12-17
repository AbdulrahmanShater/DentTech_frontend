"use client";
import { AiOutlineArrowLeft, AiOutlineSave } from "react-icons/ai";
import React, { useMemo } from "react";
import { MyItemInput } from "@/components/Input/Input";
import MyTools from "@/hooks/MyTools";
import Applayout from "@/components/layout/Applayout";
import IconButton from "@/components/Button/IconButton";
import GridItem from "@/components/GridItem";
import { CreateInterface } from "@/api/interface/payment";

import { MySelect } from "@/components/Input";
import CreatePaymentContainer from "@/container/payment/CreatePaymentContainer";

import DataGrid, {
    Column,
    Selection,
    FilterRow,
    Paging,
    HeaderFilter,
} from 'devextreme-react/data-grid';
import { SelectBox } from 'devextreme-react/select-box';
import themes from 'devextreme/ui/themes';
import { SellInvoice } from "@/models/invoice/sellInvoice";
import { Autocomplete, TextField } from "@mui/material";
import { Company } from "@/models/company";


const CreatePayment = () => {

    const container = CreatePaymentContainer();

    const myTools = MyTools();

    const selectedCompany: Company | undefined = useMemo(() => {
        return container.companies.find((f) => Number(f.id) === container.selectedCompanyId)
    }, [container.selectedCompanyId, container.companies])

    return (<>
        <Applayout>
            <div className="flex flex-col gap-5 h-full ">
                <Header
                    onClickSave={container.canSaveEditData ? container.submitHandler : undefined}
                    backHanlder={container.backHandlerHandler} />
                <div className="flex gap-3 h-fit">
                    <TableThree inputs={[
                        {
                            lableText: "Company",
                            input:
                                <Autocomplete
                                    disablePortal
                                    value={selectedCompany == undefined ? null : {
                                        id: selectedCompany.id,
                                        label: selectedCompany.name
                                    }}
                                    options={
                                        container.companies.map((value) => ({ label: value.name, id: value.id }))
                                    }
                                    onChange={(event, value) => {
                                        container.setSelectedCompanyId(Number(value?.id))
                                        // container.setData((prev) => ({ ...prev, customer: (value == null ? undefined : Number(value?.id)) }))
                                    }}
                                    noOptionsText="No Customers"
                                    renderInput={(params) =>
                                        <TextField {...params}
                                            // error={!!container.errors?.customer}
                                            // helperText={container.errors?.customer}
                                            label="Customer"
                                        />}
                                />
                            // <MySelect
                            //     className="w-72"
                            //     onChange={(e) => {
                            //         container.setSelectedCompanyId(Number(e.target.value))
                            //     }}
                            //     value={container.selectedCompanyId}
                            //     options={container.companies.map((c) => ({ title: c.name, value: c.id }))}
                            // />
                        },
                        {
                            lableText: "Date",
                            error: container.errors?.paymentDate,
                            input: <MyItemInput
                                className="w-72"
                                type="date"
                                name={myTools.propToString<CreateInterface>().paymentDate + ""}
                                onChange={container.inputHandeler}
                                value={container.data == undefined ? "" : container.data.paymentDate!}
                            />
                        },
                        {
                            lableText: "Number",
                            error: container.errors?.paymentNumber,
                            input: <MyItemInput
                                className="w-72"
                                name={myTools.propToString<CreateInterface>().paymentNumber + ""}
                                onChange={container.inputHandeler}
                                value={container.data == undefined ? "" : container.data.paymentNumber!}
                            />
                        },
                        {
                            lableText: "Paymnet Value",
                            input: <MyItemInput
                                className="w-72"
                                readOnly
                                value={container.paymentValue}
                            />
                        },
                        {
                            lableText: "Reference",
                            error: container.errors?.reference,
                            input: <MyItemInput
                                className="w-72"
                                name={myTools.propToString<CreateInterface>().reference + ""}
                                onChange={container.inputHandeler}
                                value={container.data == undefined ? "" : container.data.reference!}
                            />
                        },
                    ]} />

                </div>
                {/* tabel here */}

                <DataGrid
                    className="!max-w-full "
                    width="100%"
                    dataSource={container.invoices}
                    showBorders={true}
                    columnAutoWidth
                    keyExpr={myTools.propToString<SellInvoice>().id + ""}
                    onSelectionChanged={(e) => {
                        container.setSelectedInvoices(e.selectedRowsData)
                    }}
                >
                    <HeaderFilter visible />
                    <Selection
                        mode="multiple"
                        selectAllMode={'allPages'}
                        showCheckBoxesMode={'always'}
                    />
                    {/* <FilterRow visible={true} /> */}
                    <Paging defaultPageSize={10} />

                    <Column dataField={myTools.propToString<SellInvoice>().invoiceNumber + ""} caption="Invoice Number" />
                    <Column dataField={myTools.propToString<SellInvoice>().invoiceDate + ""} dataType="date" caption="Invoice Date" />
                    <Column dataField={myTools.propToString<SellInvoice>().total + ""} dataType="number" caption="Invoice Total" />
                    {/* <Column dataField="city" />
                    <Column dataField="country" width={180} />
                    <Column dataField="region" />
                    <Column dataField="date" dataType="date" />
                    <Column dataField="amount" format="currency" width={90} /> */}
                </DataGrid>
            </div>
        </Applayout>
    </>)
}


interface MyInputsInterface {
    lableText: string,
    error?: string,
    input: React.ReactNode
}
const TableThree = (props: { inputs: MyInputsInterface[], title?: string }) => {
    return (

        <div className={`min-h-fit h-full flex-1 flex flex-col gap-4 rounded-xl border border-stroke bg-[var(--color3)] text-[var(--color2)] px-5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5`}>
            {props.title && <h1 className="text-title-md font-bold"> {props.title}</h1>}
            <div className="max-w-full overflow-x-auto grid xs:grid-cols-1 md:grid-cols-2 items-center gap-7 gap-x-14">
                {
                    props.inputs.map((inp) => {
                        return (<>
                            <GridItem name={inp.lableText} error={inp.error}>
                                {inp.input}
                            </GridItem>
                        </>)
                    })
                }
            </div>
        </div>
    );
};

const Header = (props: { onClickSave?: (props: { reInter: boolean }) => void, backHanlder?: () => void }) => {
    return (<>
        <div className="flex flex-row justify-between">

            <div className="flex flex-row items-center gap-2">
                <div className="cursor-pointer" onClick={props.backHanlder}>
                    <AiOutlineArrowLeft />
                </div>
                <h1 className="font-extrabold text-2xl">{"New Payment"}</h1>
            </div>
            {
                props.onClickSave !== undefined ?
                    <div className="flex">
                        <IconButton className="bg-success animate-pulse" text="save" icon={<AiOutlineSave />}
                            onClick={() => {
                                props.onClickSave!({ reInter: true })
                            }} />
                        <IconButton className="bg-success" text="save and close" icon={<AiOutlineSave />}
                            onClick={() => {
                                props.onClickSave!({ reInter: false })
                            }} />

                    </div> : <></>
            }

        </div>
    </>)
}
export default CreatePayment;