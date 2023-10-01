"use client";

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react';


import Link from "next/link";
import { Company } from "../../../../models/company";
import DropdownFilter from "../../DropdownFilter";
import { AiOutlinePlus } from "react-icons/ai";

export default function Company() {

    const packageData: Company[] = [
        {
            id: 1,
            name: "Free package",
            debit: "0.0",
            credit: " 59.0",
            status: "Paid",
            balance: "59.0",
            email: "user1@gmail.com",
            tel: "0000",
            address: "Abu Dhabi Alkhalduyah",
            trn: "654654894153121864",
        },
        {
            id: 2,
            name: "Standard Package",
            debit: "0.0",
            credit: " 59.0",
            status: "Paid",
            balance: "59.0",
            email: "user2@gmail.com",
            tel: "0000",
            address: "Abu Dhabi Alkhalduyah",
            trn: "654654894153121864",
        },
        {
            id: 3,
            name: "Business Package",
            debit: "0.0",
            credit: " 59.0",
            status: "Unpaid",
            balance: "59.0",
            email: "user3@gmail.com",
            tel: "0000",
            address: "Abu Dhabi Alkhalduyah",
            trn: "654654894153121864",
        },
        {
            id: 4,
            name: "Standard Package",
            debit: "0.0",
            credit: " 59.0",
            status: "Unpaid",
            balance: "59.0",
            email: "user4@gmail.com",
            tel: "0000",
            address: "Abu Dhabi Alkhalduyah",
            trn: "654654894153121864",
        },
    ];


    const router = useRouter();
    // const { id } = router.query; // get id value from URL
    const [company, setCompany] = useState<Company | null>(null);


    useEffect(() => {
        // fetch data for specific company using id
        // example: make an API call to get company data
        const fetchData = async () => {
            // const response = await fetch(`https://example.com/api/companies/${id}`);
            // const data = await response.json();
            // const data = packageData[id];
            const data = packageData[0];
            setCompany(data);
        }

        fetchData();
    }, []);//id


    if (!company) {
        return <div>Loading...</div>;
    }

    const TableThree = () => {
        return (
            <div className={`flex-1 rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1`}>
                <div className="max-w-full overflow-x-auto grid grid-cols-[max-content,1fr,max-content,1fr] items-center gap-7 gap-x-14">

                    <GridItem name="Name" >
                        <GridItemInput />
                    </GridItem>

                    <GridItem name="Tel" >
                        <div className="flex gap-x-7">
                            <GridItemInput />
                            {/* <GridItemInput /> */}
                        </div>
                    </GridItem>

                    <GridItem name="poBox">
                        <div className="flex gap-x-7">
                            <GridItemInput />
                            {/* <GridItemRadio name="Busines" />
                            <GridItemRadio name="Indivdual" /> */}
                        </div>
                    </GridItem>

                    <GridItem name="Email" >
                        <GridItemInput />
                    </GridItem>

                    <GridItem name="Address" >
                        <GridItemInput />
                    </GridItem>

                    <GridItem name="Trn" >
                        <GridItemInput />
                    </GridItem>


                    {/* <GridItem name="Primary Contact" >
                        <div className="flex gap-x-7">
                            <GridItemSelect />
                            <GridItemInput />
                            <GridItemInput />
                        </div>
                    </GridItem> */}


                    {/* 
                    <GridItem name="Customer Display Name" >
                        <GridItemSelect />
                    </GridItem>

                    <GridItem name="Currency" >
                        <GridItemSelect />
                    </GridItem> */}




                </div>
            </div>
        );
    };
    // const TableThree = () => {
    //     return (
    //         <div className={`flex-1 rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1`}>
    //             <div className="max-w-full overflow-x-auto grid grid-cols-[max-content,1fr] items-center gap-7 gap-x-14">

    //                 <GridItem name="Customer Type">
    //                     <div className="flex gap-x-7">
    //                         <GridItemRadio name="Busines" />
    //                         <GridItemRadio name="Indivdual" />
    //                     </div>
    //                 </GridItem>

    //                 <GridItem name="Primary Contact" >
    //                     <div className="flex gap-x-7">
    //                         <GridItemSelect />
    //                         <GridItemInput />
    //                         <GridItemInput />
    //                     </div>
    //                 </GridItem>

    //                 <GridItem name="Primary Name" >
    //                     <GridItemInput />
    //                 </GridItem>

    //                 <GridItem name="Customer Display Name" >
    //                     <GridItemSelect />
    //                 </GridItem>

    //                 <GridItem name="Currency" >
    //                     <GridItemSelect />
    //                 </GridItem>

    //                 <GridItem name="Customer Email" >
    //                     <GridItemInput />
    //                 </GridItem>

    //                 <GridItem name="Customer Phone" >
    //                     <div className="flex gap-x-7">
    //                         <GridItemInput />
    //                         <GridItemInput />
    //                     </div>
    //                 </GridItem>

    //             </div>
    //         </div>
    //     );
    // };
    const GridItem = (props: { name: string, children: React.ReactNode }) => {
        return (
            <>
                {/* <div className="flex flex-row items-center justify-between"> */}
                <label htmlFor="">{props.name}</label>
                {props.children}
                {/* </div> */}
            </>
        );
    };


    const GridItemRadio = (props: { name: string }) => {
        return (
            <div className="flex flex-row items-center justify-start gap-5">
                <input type={'radio'} className="outline-none bg-transparent w-5.5 h-5.5" />
                <label htmlFor="" >{props.name}</label>
            </div>
        );
    }
    const GridItemInput = () => {
        return (
            <>
                <input type="text" className="py-2 px-2 rounded-md w-50 outline-none bg-transparent border  focus:border-primary" />
            </>
        );
    }

    const GridItemSelect = () => {
        return (
            <>
                <select name="" id="" className="py-2 px-2 rounded-md w-50 outline-none border  focus:border-primary bg-white dark:bg-boxdark">
                    <option value="" >{""}</option>
                    <option value="" >{"item 1"}</option>
                    <option value="" >{"item 1"}</option>
                    <option value="" >{"item 1"}</option>
                    <option value="" >{"item 1"}</option>
                </select>
            </>
        );
    };

    const Header = () => {
        return (<>
            <div className="flex flex-row justify-between">

                <div className="flex flex-row items-center gap-2">
                    <Link href="/company" className="cursor-pointer">
                        <AiOutlinePlus />
                    </Link>
                    <h1 className="font-extrabold text-2xl">{"Edit Company"}</h1>
                </div>

                {/* buttons */}
                <div className="flex">
                    <Link
                        href="#"
                        className="inline-flex items-center justify-center gap-2.5 rounded-md bg-primary py-2 px-5 text-center font-medium text-white hover:bg-opacity-90 lg:px-4 xl:px-5"
                    >
                        <AiOutlinePlus />
                        Save
                    </Link>
                </div>
                {/* buttons */}

            </div>
        </>)
    }

    return (<>
        <div className="flex flex-col gap-5">
            <Header />
            <div className="flex gap-3">
                <TableThree />
            </div>
        </div>
    </>)
}