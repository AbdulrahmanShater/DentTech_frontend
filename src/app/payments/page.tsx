"use client";
import Link from "next/link";
import DropdownFilter from "./DropdownFilter";
import { AiOutlineDelete, AiOutlineEdit, AiOutlineInfoCircle, AiOutlinePlus } from "react-icons/ai";
import { useState } from "react";
import 'react-confirm-alert/src/react-confirm-alert.css'
import Applayout from "@/components/layout/Applayout";
import { Payment } from "@/models/company";
import PaymentContainer from "@/container/payment/PaymentContainer";
export default function InvoicePage() {

    const [selectedPayment, setSelectedPayment] = useState<Payment | undefined>(undefined);

    const container = PaymentContainer();

    const TableThree = () => {
        return (
            <div id="customerPage" className={`flex-1 rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1 relative  `}>
                <div className="max-w-full overflow-x-auto">
                    <table className="w-full table-auto">
                        <thead>
                            <tr className="bg-gray-2 text-left dark:bg-meta-4">
                                <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                                    {"Number"}
                                </th>
                                <th className={`${selectedPayment != undefined ? 'hidden' : 'table-cell'} min-w-[150px] py-4 px-4 font-medium text-black dark:text-white`}>
                                    {"Payment Number"}
                                </th>
                                <th className={`${selectedPayment != undefined ? 'hidden' : 'table-cell'} min-w-[120px] py-4 px-4 font-medium text-black dark:text-white`}>
                                    {"Payment Date"}
                                </th>
                                <th className={`${selectedPayment != undefined ? 'hidden' : 'table-cell'} py-4 px-4 font-medium text-black dark:text-white`}>
                                    {"Payment Amount"}
                                </th>
                                <th className={`${selectedPayment != undefined ? 'hidden' : 'table-cell'} py-4 px-4 font-medium text-black dark:text-white`}>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {container.data.map((invoice, key) => (
                                <tr key={key}>
                                    <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                                        <p className="text-black dark:text-white">
                                            {invoice.id}
                                        </p>
                                    </td>

                                    <td className={`${selectedPayment != undefined ? 'hidden' : 'table-cell'}  border-b border-[#eee] py-5 px-4 dark:border-strokedark`}>
                                        <p className="text-black dark:text-white">
                                            {invoice.paymentNumber}
                                        </p>
                                    </td>

                                    <td className={`${selectedPayment != undefined ? 'hidden' : 'table-cell'}  border-b border-[#eee] py-5 px-4 dark:border-strokedark`}>
                                        <p className="text-black dark:text-white">
                                            {invoice.paymentDate}
                                        </p>
                                    </td>

                                    <td className={`${selectedPayment != undefined ? 'hidden' : 'table-cell'}  border-b border-[#eee] py-5 px-4 dark:border-strokedark`}>
                                        <p className="text-black dark:text-white">
                                            {invoice.amount}
                                        </p>
                                    </td>


                                    {/* Actions */}
                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                        <div className="flex items-center felx-row space-x-3.5">
                                            <Link href={`/invoice/edit/${invoice?.id}`} >
                                                <button className="hover:text-primary" >
                                                    <AiOutlineEdit />
                                                </button>
                                            </Link>
                                            <button className="hover:text-primary" onClick={() => { setSelectedPayment(invoice) }}>
                                                <AiOutlineInfoCircle />
                                            </button>
                                            {/* <button className="hover:text-primary" onClick={() => {
                                                container.submitDeleteHandler({ id: invoice.id })
                                            }}>
                                                <AiOutlineDelete />
                                            </button> */}

                                        </div>
                                    </td>
                                    {/* Actions */}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    };
    const Header = () => {
        return (<>
            <div className="flex flex-row justify-between">

                {/* Toggle */}
                {/* <DropdownFilter /> */}
                <div className=""></div>
                {/* Toggle */}

                {/* buttons */}
                <div className="flex">
                    <Link
                        href="/payments/create"
                        className="inline-flex items-center justify-center gap-2.5 rounded-md bg-primary py-2 px-5 text-center font-medium text-white hover:bg-opacity-90 lg:px-4 xl:px-5"
                    >
                        <AiOutlinePlus />
                        New
                    </Link>
                </div>
                {/* buttons */}

            </div>
        </>)
    }

    return (<>
        <Applayout>
            <div className="flex flex-col gap-5">
                <Header />
                <div className="flex gap-3">
                    <TableThree />
                    {/* invoice details */}
                    <div className={`${selectedPayment == undefined ? 'hidden' : 'block'} flex-2 flex flex-col bg-white dark:bg-boxdark border-stroke dark:border-strokedark rounded-sm border gap-5 px-5 pt-6 pb-2.5 sm:px-7.5 xl:pb-1 `}>
                        {/* header */}
                        <div className="flex flex-row justify-between items-center w-full">
                            {/* <h1 className="text-3xl font-bold">{selectedPayment?.user.firstName}</h1> */}
                            <div className="flex flex-row justify-center items-center">
                                <div
                                    className="cursor-pointer"
                                    onClick={() => { setSelectedPayment(undefined) }}>
                                    <AiOutlinePlus />
                                </div>
                            </div>
                        </div>
                        {/* header */}

                        {/* nav */}
                        <ul className="flex flex-row gap-3">
                            <li className="cursor-pointer hover:border-b-primary hover:border-b-4 ">{"Overview"}</li>
                            <li className="cursor-pointer hover:border-b-primary hover:border-b-4 ">{"Comments"}</li>
                            <li className="cursor-pointer hover:border-b-primary hover:border-b-4 ">{"Transactions"}</li>
                            <li className="cursor-pointer hover:border-b-primary hover:border-b-4 ">{"Mails"}</li>
                            <li className="cursor-pointer hover:border-b-primary hover:border-b-4 ">{"Statements"}</li>
                        </ul>
                        {/* nav */}

                        <hr />

                        {/* content */}
                        <div className="flex flex-row">

                            <div className="flex-1 flex flex-col gap-3 p-5">
                                <h2>{"asda"}</h2>
                                <hr />

                                {/* contactInfo */}
                                {/* <div className="flex flex-row gap-3">
                                    <img
                                        src="chrome://new-tab-page/icons/google_logo.svg"
                                        alt="image"
                                        className="w-25 h-25 bg-body rounded-lg"
                                    />
                                    <div className="flex flex-col">
                                        <h3 className="font-bold">{selectedPayment?.user.firstName}</h3>
                                        <h3>{selectedPayment?.user.email}</h3>
                                        <ul className="flex flex-col gap-2">
                                            <li className="flex flex-row items-center justify-start ">
                                                <AiOutlinePlus />
                                                {selectedPayment?.user.tel}
                                            </li>
                                        </ul>
                                    </div>
                                </div> */}
                                {/* contactInfo */}

                            </div>

                            F                        <div className="flex-2 p-5">
                                Payment due period
                            </div>
                        </div>
                        {/* content */}

                    </div>
                    {/* invoice details */}
                </div>
            </div>
        </Applayout>
    </>)
}
