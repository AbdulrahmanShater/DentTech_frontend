"use client";
import { AiOutlineArrowLeft, AiOutlineSave } from "react-icons/ai";
import React, { } from "react";
import { MyItemInput } from "@/components/Input/Input";
import MyTools from "@/hooks/MyTools";
import Applayout from "@/components/layout/Applayout";
import IconButton from "@/components/Button/IconButton";
import GridItem from "@/components/GridItem";
import CreateContainer from "@/container/invoice/buy/CreateContainer";
import { CreateInterface } from "@/api/interface/invoice/buy";

const CreateCustomer = () => {

    const container = CreateContainer();

    const myTools = MyTools();

    return (<>
        <Applayout>
            <div className="flex flex-col gap-5 h-full ">
                <Header
                    onClickSave={container.canSaveEditData ? container.submitHandler : undefined}
                    backHanlder={container.backHandlerHandler} />
                <div className="flex gap-3 h-full">
                    <TableThree inputs={[
                        {
                            lableText: "Customer",
                            error: container.errors?.customer,
                            input: <MyItemInput
                                className="w-72"
                                name={myTools.propToString<CreateInterface>().customer + ""}
                                onChange={container.inputHandeler}
                                value={container.data == undefined ? "" : container.data.customer!}
                            />
                        },
                        {
                            lableText: "Date",
                            error: container.errors?.invoiceDate,
                            input: <MyItemInput
                                className="w-72"
                                name={myTools.propToString<CreateInterface>().invoiceDate + ""}
                                onChange={container.inputHandeler}
                                value={container.data == undefined ? "" : container.data.invoiceDate!}
                            />
                        },
                        {
                            lableText: "Number",
                            error: container.errors?.invoiceNumber,
                            input: <MyItemInput
                                className="w-72"
                                name={myTools.propToString<CreateInterface>().invoiceNumber + ""}
                                onChange={container.inputHandeler}
                                value={container.data == undefined ? "" : container.data.invoiceNumber!}
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
                        {
                            lableText: "Discount",
                            error: container.errors?.discount,
                            input: <MyItemInput
                                className="w-72"
                                name={myTools.propToString<CreateInterface>().discount + ""}
                                onChange={container.inputHandeler}
                                value={container.data == undefined ? "" : container.data.discount!}
                            />
                        },
                    ]} />

                </div>
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
                <h1 className="font-extrabold text-2xl">{"New Buy Invoice"}</h1>
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
export default CreateCustomer;