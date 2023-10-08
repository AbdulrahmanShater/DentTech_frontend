"use client";
import Link from "next/link";
import { Customer } from "../../models/customer";
import DropdownFilter from "./DropdownFilter";
import { AiOutlineDelete, AiOutlineEdit, AiOutlineInfoCircle, AiOutlinePlus } from "react-icons/ai";
import { useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css'
import Applayout from "@/components/layout/Applayout";
import CustomersContainer from "@/container/customer/CustomersContainer";
export default function CustomerPage() {

    const [selectedCustomer, setSelectedCustomer] = useState<Customer | undefined>(undefined);

    const container = CustomersContainer();

    const TableThree = () => {
        return (
            <div id="customerPage" className={`flex-1 rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1 relative  `}>
                <div className="max-w-full overflow-x-auto">
                    <table className="w-full table-auto">
                        <thead>
                            <tr className="bg-gray-2 text-left dark:bg-meta-4">
                                <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                                    {"Customer Name"}
                                </th>
                                <th className={`${selectedCustomer != undefined ? 'hidden' : 'table-cell'} min-w-[150px] py-4 px-4 font-medium text-black dark:text-white`}>
                                    {"Debit"}
                                </th>
                                <th className={`${selectedCustomer != undefined ? 'hidden' : 'table-cell'} min-w-[120px] py-4 px-4 font-medium text-black dark:text-white`}>
                                    {"Credit"}
                                </th>
                                <th className={`${selectedCustomer != undefined ? 'hidden' : 'table-cell'} py-4 px-4 font-medium text-black dark:text-white`}>
                                    {"Balance"}
                                </th>
                                <th className={`${selectedCustomer != undefined ? 'hidden' : 'table-cell'} py-4 px-4 font-medium text-black dark:text-white`}>
                                    {"Status"}
                                </th>
                                <th className={`py-4 px-4 font-medium text-black dark:text-white`}>
                                    {"Actions"}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {container.data.map((customer, key) => (
                                <tr key={key}>
                                    {/* Name */}
                                    <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                                        <p className="text-black dark:text-white">
                                            {customer.name}
                                        </p>
                                    </td>
                                    {/* Name */}

                                    {/* Debit */}
                                    <td className={`${selectedCustomer != undefined ? 'hidden' : 'table-cell'}  border-b border-[#eee] py-5 px-4 dark:border-strokedark`}>
                                        <p className="text-black dark:text-white">
                                            {customer.debit}
                                        </p>
                                    </td>
                                    {/* Debit */}

                                    {/* Credit */}
                                    <td className={`${selectedCustomer != undefined ? 'hidden' : 'table-cell'}  border-b border-[#eee] py-5 px-4 dark:border-strokedark`}>
                                        <p className="text-black dark:text-white">
                                            {customer.credit}
                                        </p>
                                    </td>
                                    {/* Credit */}

                                    {/* Balance */}
                                    <td className={`${selectedCustomer != undefined ? 'hidden' : 'table-cell'}  border-b border-[#eee] py-5 px-4 dark:border-strokedark`}>
                                        <p className="text-black dark:text-white">
                                            {customer.balance}
                                        </p>
                                    </td>
                                    {/* Balance */}

                                    {/* Status */}
                                    <td className={`${selectedCustomer != undefined ? 'hidden' : 'table-cell'}  border-b border-[#eee] py-5 px-4 dark:border-strokedark`}>
                                        <p
                                            className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${customer.status === "Paid"
                                                ? "text-success bg-success"
                                                : customer.status === "Unpaid"
                                                    ? "text-danger bg-danger"
                                                    : "text-warning bg-warning"
                                                }`}
                                        >
                                            {customer.status}
                                        </p>
                                    </td>
                                    {/* Status */}

                                    {/* Actions */}
                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                        <div className="flex items-center felx-row space-x-3.5">
                                            <Link href={`/customer/edit/${selectedCustomer?.id}`} >
                                                <button className="hover:text-primary" >
                                                    <AiOutlineEdit />
                                                </button>
                                            </Link>
                                            <button className="hover:text-primary" onClick={() => { setSelectedCustomer(customer) }}>
                                                <AiOutlineInfoCircle />
                                            </button>
                                            <button className="hover:text-primary" onClick={() => {
                                                confirmAlert({
                                                    title: 'Are you sure?',
                                                    message: 'want to delete this Customer!?',
                                                    buttons: [
                                                        {
                                                            label: 'Yes',
                                                            onClick: () => alert('Click Yes')
                                                        },
                                                        {
                                                            label: 'No',
                                                            onClick: () => alert('Click No')
                                                        }
                                                    ],
                                                    customUI: (customUiOptions) => {
                                                        return (<>
                                                            <div className='custom-ui text-[#666] bg-white rounded-xl p-8 shadow-dialog flex flex-col items-center gap-4 w-max'>
                                                                <div className="w-20 h-20 text-6xl border-[4px] border-danger text-danger rounded-full flex flex-row items-center justify-center">
                                                                    <AiOutlineDelete />
                                                                </div>
                                                                <h1 className="text-xl font-bold text-danger">{customUiOptions.title}</h1>
                                                                <p>{customUiOptions.message}</p>

                                                                <div className="flex flex-row items-center justify-evenly w-full">
                                                                    <button
                                                                        className="border rounded-lg cursor-pointer bg-danger text-white px-4 py-2 animate-pulse"
                                                                        onClick={customUiOptions.onClose}>No</button>

                                                                    <button
                                                                        className="border rounded-lg cursor-pointer border-danger text-danger bg-white px-4 py-2"
                                                                        onClick={() => {
                                                                            customUiOptions.onClose()
                                                                            container.submitDeleteHandler({ id: customer.id })
                                                                        }}
                                                                    >
                                                                        Yes, Delete it!
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </>)
                                                    },
                                                });
                                            }}>
                                                <AiOutlineDelete />
                                            </button>

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
                <DropdownFilter />
                {/* Toggle */}

                {/* buttons */}
                <div className="flex">
                    <Link
                        href="/customer/create"
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
                    {/* customer details */}
                    <div className={`${selectedCustomer == undefined ? 'hidden' : 'block'} flex-2 flex flex-col bg-white dark:bg-boxdark border-stroke dark:border-strokedark rounded-sm border gap-5 px-5 pt-6 pb-2.5 sm:px-7.5 xl:pb-1 `}>
                        {/* header */}
                        <div className="flex flex-row justify-between items-center w-full">
                            <h1 className="text-3xl font-bold">{selectedCustomer?.name}</h1>
                            <div className="flex flex-row justify-center items-center">
                                <div
                                    className="cursor-pointer"
                                    onClick={() => { setSelectedCustomer(undefined) }}>
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
                                <div className="flex flex-row gap-3">
                                    <img
                                        src="chrome://new-tab-page/icons/google_logo.svg"
                                        alt="image"
                                        className="w-25 h-25 bg-body rounded-lg"
                                    />
                                    <div className="flex flex-col">
                                        <h3 className="font-bold">{selectedCustomer?.name}</h3>
                                        <h3>{selectedCustomer?.email}</h3>
                                        <ul className="flex flex-col gap-2">
                                            <li className="flex flex-row items-center justify-start ">
                                                <AiOutlinePlus />
                                                {selectedCustomer?.tel}
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                {/* contactInfo */}

                            </div>

                            F                        <div className="flex-2 p-5">
                                Payment due period
                            </div>
                        </div>
                        {/* content */}

                    </div>
                    {/* customer details */}
                </div>
            </div>
        </Applayout>
    </>)
}
