"use client";
import Link from "next/link";
import { AiFillSave, AiOutlineArrowLeft, AiOutlineInfoCircle, AiOutlinePlus, AiOutlineSave, AiOutlineArrowRight } from "react-icons/ai";
import React, { InputHTMLAttributes, useRef } from "react";
import { MyItemInput } from "@/components/Input/Input";
import MyTools from "@/hooks/MyTools";
import Applayout from "@/components/layout/Applayout";
import IconButton from "@/components/Button/IconButton";
import GridItem from "@/components/GridItem";
import { CreateCustomerInterface } from "@/api/interface/customer";
import CreateContainer from "@/container/customer/CreateContainer";

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
                            lableText: "Name",
                            error: container.errors?.name,
                            input: <MyItemInput
                                className="w-72"
                                name={myTools.propToString<CreateCustomerInterface>().name + ""}
                                onChange={container.inputHandeler}
                                value={container.data == undefined ? "" : container.data.name!}
                            />
                        },
                        {
                            lableText: "Tel",
                            error: container.errors?.tel,
                            input: <MyItemInput
                                className="w-72"
                                name={myTools.propToString<CreateCustomerInterface>().tel + ""}
                                onChange={container.inputHandeler}
                                value={container.data == undefined ? "" : container.data.tel!}
                            />
                        },
                        {
                            lableText: "poBox",
                            error: container.errors?.tel,
                            input: <MyItemInput
                                className="w-72"
                                name={myTools.propToString<CreateCustomerInterface>().poBox + ""}
                                onChange={container.inputHandeler}
                                value={container.data == undefined ? "" : container.data.poBox!}
                            />
                        },
                        {
                            lableText: "Email",
                            error: container.errors?.tel,
                            input: <MyItemInput
                                className="w-72"
                                name={myTools.propToString<CreateCustomerInterface>().email + ""}
                                onChange={container.inputHandeler}
                                value={container.data == undefined ? "" : container.data.email!}
                            />
                        },
                        {
                            lableText: "Address",
                            error: container.errors?.tel,
                            input: <MyItemInput
                                className="w-72"
                                name={myTools.propToString<CreateCustomerInterface>().address + ""}
                                onChange={container.inputHandeler}
                                value={container.data == undefined ? "" : container.data.address!}
                            />
                        },
                        {
                            lableText: "Trn",
                            error: container.errors?.tel,
                            input: <MyItemInput
                                className="w-72"
                                name={myTools.propToString<CreateCustomerInterface>().trn + ""}
                                onChange={container.inputHandeler}
                                value={container.data == undefined ? "" : container.data.trn!}
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
            <div className="max-w-full overflow-x-auto grid grid-cols-1 items-center gap-7 gap-x-14">
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
                <h1 className="font-extrabold text-2xl">{"New Customer"}</h1>
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