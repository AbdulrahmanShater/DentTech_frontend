"use client";
import Link from "next/link";
import { AiOutlinePlus } from "react-icons/ai";
import React, { InputHTMLAttributes } from "react";
import CreateCompanyContainer from "@/container/company/CreateCompanyContainer";
import { MyItemInput } from "@/components/Input/Input";
import MyTools from "@/hooks/MyTools";

const CreateCompany = () => {

    const container = CreateCompanyContainer();

    const myTools = MyTools();



    return (<>
        <div className="flex flex-col gap-5">
            <Header onClickSave={() => container.submitHandler()} />
            <div className="flex gap-3">
                <TableThree inputsProps={[
                    {
                        lableText: "Name",
                        name: myTools.propToString<typeof container.data>(container.data).name,
                        onChange: container.inputHandeler,
                        value: container.data.name
                    },
                    {
                        lableText: "Tel",
                        name: myTools.propToString<typeof container.data>(container.data).tel,
                        onChange: container.inputHandeler,
                        value: container.data.tel
                    },
                    {
                        lableText: "poBox",
                        name: myTools.propToString<typeof container.data>(container.data).poBox,
                        onChange: container.inputHandeler,
                        value: container.data.poBox
                    },
                    {
                        lableText: "Email",
                        name: myTools.propToString<typeof container.data>(container.data).email,
                        onChange: container.inputHandeler,
                        value: container.data.email
                    },
                    {
                        lableText: "Address",
                        name: myTools.propToString<typeof container.data>(container.data).address,
                        onChange: container.inputHandeler,
                        value: container.data.address
                    },
                    {
                        lableText: "Trn",
                        name: myTools.propToString<typeof container.data>(container.data).trn,
                        onChange: container.inputHandeler,
                        value: container.data.trn
                    }
                ]} />

            </div>
        </div>
    </>)
}


interface MyInputsInterface extends InputHTMLAttributes<HTMLInputElement> {
    lableText: string
}
const TableThree = (props: { inputsProps: MyInputsInterface[] }) => {

    return (
        <div className={`flex-1 rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1`}>
            <div
                className="max-w-full overflow-x-auto flex flex-row flex-wrap items-center gap-7 gap-x-14"
            // className="max-w-full overflow-x-auto grid grid-cols-[max-content,1fr,max-content,1fr] items-center gap-7 gap-x-14"
            >
                {
                    props.inputsProps.map((inp) => {
                        return (<>
                            <GridItem name={inp.lableText} >
                                <MyItemInput {...inp} />
                            </GridItem>
                        </>)
                    })
                }
            </div>
        </div>
    );
};
const GridItem = (props: { name: string, children: React.ReactNode }) => {
    return (
        <>
            <div className="flex flex-row items-center justify-around ">
                <label htmlFor="">{props.name}</label>
                {props.children}
            </div>
        </>
    );
};


const Header = (props: { onClickSave: () => void }) => {
    return (<>
        <div className="flex flex-row justify-between">

            <div className="flex flex-row items-center gap-2">
                <Link href="/company" className="cursor-pointer">
                    <AiOutlinePlus />
                </Link>
                <h1 className="font-extrabold text-2xl">{"New Company"}</h1>
            </div>

            {/* buttons */}
            <div className="flex">

                <button onClick={props.onClickSave} className="inline-flex items-center justify-center gap-2.5 rounded-md bg-primary py-2 px-5 text-center font-medium text-white hover:bg-opacity-90 lg:px-4 xl:px-5">
                    <AiOutlinePlus />
                    Save
                </button>

                {/* <Link
                    href="#"
                >
                    <AiOutlinePlus />
                    Save
                </Link> */}
            </div>
            {/* buttons */}

        </div>
    </>)
}
export default CreateCompany;