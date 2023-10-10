"use client";
import { AiOutlineArrowLeft, AiOutlineSave } from "react-icons/ai";
import React, { } from "react";
import { MyItemInput } from "@/components/Input/Input";
import MyTools from "@/hooks/MyTools";
import Applayout from "@/components/layout/Applayout";
import IconButton from "@/components/Button/IconButton";
import GridItem from "@/components/GridItem";
import { CreateItemInterface } from "@/api/interface/item";
import CreateContainer from "@/container/item/CreateContainer";

const CreateItem = () => {

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
                                name={myTools.propToString<CreateItemInterface>().name + ""}
                                onChange={container.inputHandeler}
                                value={container.data == undefined ? "" : container.data.name!}
                            />
                        },
                        {
                            lableText: "Description",
                            error: container.errors?.description,
                            input: <MyItemInput
                                className="w-72"
                                name={myTools.propToString<CreateItemInterface>().description + ""}
                                onChange={container.inputHandeler}
                                value={container.data == undefined ? "" : container.data.description!}
                            />
                        },
                        {
                            lableText: "Price1",
                            error: container.errors?.price1,
                            input: <MyItemInput
                                className="w-72"
                                name={myTools.propToString<CreateItemInterface>().price1 + ""}
                                onChange={container.inputHandeler}
                                value={container.data == undefined ? "" : container.data.price1!}
                            />
                        },
                        {
                            lableText: "Price2",
                            error: container.errors?.price1,
                            input: <MyItemInput
                                className="w-72"
                                name={myTools.propToString<CreateItemInterface>().price2 + ""}
                                onChange={container.inputHandeler}
                                value={container.data == undefined ? "" : container.data.price2!}
                            />
                        },
                        {
                            lableText: "Price3",
                            error: container.errors?.price1,
                            input: <MyItemInput
                                className="w-72"
                                name={myTools.propToString<CreateItemInterface>().price3 + ""}
                                onChange={container.inputHandeler}
                                value={container.data == undefined ? "" : container.data.price3!}
                            />
                        },
                        {
                            lableText: "Price4",
                            error: container.errors?.price1,
                            input: <MyItemInput
                                className="w-72"
                                name={myTools.propToString<CreateItemInterface>().price4 + ""}
                                onChange={container.inputHandeler}
                                value={container.data == undefined ? "" : container.data.price4!}
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
                <h1 className="font-extrabold text-2xl">{"New Item"}</h1>
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
export default CreateItem;