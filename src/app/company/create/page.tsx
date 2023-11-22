"use client";
import { AiOutlineArrowLeft, AiOutlineSave } from "react-icons/ai";
import React, {  } from "react";
import CreateCompanyContainer from "@/container/company/CreateCompanyContainer";
import { MyItemInput } from "@/components/Input/Input";
import MyTools from "@/hooks/MyTools";
import Applayout from "@/components/layout/Applayout";
import IconButton from "@/components/Button/IconButton";
import GridItem from "@/components/GridItem";
import { CreateCompanyInterface } from "@/api/interface/company";

const CreateCompany = () => {

    const container = CreateCompanyContainer();

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
                                name={myTools.propToString<CreateCompanyInterface>().name + ""}
                                onChange={container.inputHandeler}
                                value={container.data == undefined ? "" : container.data.name!}
                            />
                        },
                        {
                            lableText: "Tel",
                            error: container.errors?.tel,
                            input: <MyItemInput
                                className="w-72"
                                name={myTools.propToString<CreateCompanyInterface>().tel + ""}
                                onChange={container.inputHandeler}
                                value={container.data == undefined ? "" : container.data.tel!}
                            />
                        },
                        {
                            lableText: "poBox",
                            error: container.errors?.poBox,
                            input: <MyItemInput
                                className="w-72"
                                name={myTools.propToString<CreateCompanyInterface>().poBox + ""}
                                onChange={container.inputHandeler}
                                value={container.data == undefined ? "" : container.data.poBox!}
                            />
                        },
                        {
                            lableText: "Email",
                            error: container.errors?.email,
                            input: <MyItemInput
                                className="w-72"
                                name={myTools.propToString<CreateCompanyInterface>().email + ""}
                                onChange={container.inputHandeler}
                                value={container.data == undefined ? "" : container.data.email!}
                            />
                        },
                        {
                            lableText: "Address",
                            error: container.errors?.address,
                            input: <MyItemInput
                                className="w-72"
                                name={myTools.propToString<CreateCompanyInterface>().address + ""}
                                onChange={container.inputHandeler}
                                value={container.data == undefined ? "" : container.data.address!}
                            />
                        },
                        {
                            lableText: "Trn",
                            error: container.errors?.trn,
                            input: <MyItemInput
                                className="w-72"
                                name={myTools.propToString<CreateCompanyInterface>().trn + ""}
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
                <h1 className="font-extrabold text-2xl">{"New Company"}</h1>
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

export default CreateCompany;