"use client";

import { useParams, useRouter } from 'next/navigation'
import { InputHTMLAttributes, useEffect, useMemo, useState } from 'react';


import Link from "next/link";
import { Customer } from "../../../../models/customer";
import DropdownFilter from "../../DropdownFilter";
import { AiOutlineArrowLeft, AiOutlineEdit, AiOutlineInfoCircle, AiOutlinePlus, AiOutlineSave } from "react-icons/ai";
import { MyItemInput, MySelect } from '@/components/Input';
import MyTools from '@/hooks/MyTools';
import Applayout from '@/components/layout/Applayout';
import IconButton from '@/components/Button/IconButton';
import { EditCustomerInterface } from '@/api/interface/customer';
import GridItem from '@/components/GridItem';
import EditContainer from '@/container/customer/EditContainer';
import { Autocomplete, TextField } from '@mui/material';
import { Company } from '@/models/company';

export default function EditCustomer() {

    const router = useRouter();
    // const { id } = router.query; // get id value from URL

    const { id } = useParams();
    const container = EditContainer({ customer_id: Number(id) });

    const myTools = MyTools();

    const selectedCompany: Company | undefined = useMemo(() => {
        return container.companies.find((f) => Number(f.id) === container.data?.company)
    }, [container.data?.company, container.companies])


    if (container.customer == null) {
        return (
            <>
                <div className="">{"loading.."}</div>
            </>
        )

    }
    return (<>
        <Applayout>
            <div className="flex flex-col gap-5">
                <Header onClickSave={container.canSaveEditData ? container.submitHandler : undefined} backHanlder={container.backHandlerHandler} />
                <div className="flex gap-3">
                    <TableThree inputs={[
                        {
                            lableText: "First Name",
                            error: container.errors?.firstName,
                            input: <MyItemInput
                                className="w-72"
                                name={myTools.propToString<EditCustomerInterface>().firstName + ""}
                                onChange={container.inputHandeler}
                                value={container.data == undefined ? "" : container.data.firstName!}
                            />
                        },
                        {
                            lableText: "Last Name",
                            error: container.errors?.lastName,
                            input: <MyItemInput
                                className="w-72"
                                name={myTools.propToString<EditCustomerInterface>().lastName + ""}
                                onChange={container.inputHandeler}
                                value={container.data == undefined ? "" : container.data.lastName!}
                            />
                        },
                        {
                            lableText: "Company",
                            error: container.errors?.company,
                            input: <Autocomplete
                                disablePortal
                                value={selectedCompany == undefined ? null : {
                                    id: selectedCompany.id,
                                    label: selectedCompany.name
                                }}
                                options={
                                    container.companies.map((value) => ({ label: value.name, id: value.id }))
                                }
                                onChange={(event, value) => {
                                    container.setData((prev) => ({ ...prev, company: (value == null ? undefined : Number(value?.id)) }))
                                }}
                                noOptionsText="No Company"
                                renderInput={(params) =>
                                    <TextField {...params}
                                        error={!!container.errors?.company}
                                        helperText={container.errors?.company}
                                        label="Company"
                                    />}
                            />
                            // <MySelect
                            //     className="w-72"
                            //     name={myTools.propToString<EditCustomerInterface>().company + ""}
                            //     onChange={container.inputHandeler}
                            //     value={container.data == undefined ? "" : container.data.company!}
                            //     options={container.companies.map((c) => ({ title: c.name, value: c.id }))}
                            // />
                        },
                        {
                            lableText: "Tel",
                            error: container.errors?.tel,
                            input: <MyItemInput
                                className="w-72"
                                name={myTools.propToString<EditCustomerInterface>().tel + ""}
                                onChange={container.inputHandeler}
                                value={container.data == undefined ? "" : container.data.tel!}
                            />
                        },
                        {
                            lableText: "Email",
                            error: container.errors?.email,
                            input: <MyItemInput
                                className="w-72"
                                name={myTools.propToString<EditCustomerInterface>().email + ""}
                                onChange={container.inputHandeler}
                                value={container.data == undefined ? "" : container.data.email!}
                            />
                        },
                        {
                            lableText: "Password",
                            error: container.errors?.password,
                            input: <MyItemInput
                                className="w-72"
                                name={myTools.propToString<EditCustomerInterface>().password + ""}
                                onChange={container.inputHandeler}
                                value={container.data == undefined ? "" : container.data.password!}
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



const Header = (props: { onClickSave?: () => void, backHanlder?: () => void }) => {
    return (<>
        <div className="flex flex-row justify-between">

            <div className="flex flex-row items-center gap-2">
                <div className="cursor-pointer" onClick={props.backHanlder}>
                    <AiOutlineArrowLeft />
                </div>
                <h1 className="font-extrabold text-2xl">{"Edit Customer"}</h1>
            </div>

            {/* buttons */}
            {
                props.onClickSave !== undefined ?
                    <div className="flex">
                        <IconButton className="bg-warning animate-pulse" text="Save Changing" icon={<AiOutlineSave />}
                            onClick={() => {
                                props.onClickSave!()
                            }} />
                    </div> : <></>
            }
            {/* buttons */}

        </div>
    </>)
}

