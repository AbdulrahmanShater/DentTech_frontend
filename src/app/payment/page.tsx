"use client";
import Link from "next/link";
// import { SellInvoice } from "../../../models/payment/sellInvoice";
import DropdownFilter from "./DropdownFilter";
import { AiOutlineDelete, AiOutlineEdit, AiOutlineInfoCircle, AiOutlinePlus } from "react-icons/ai";
import { useMemo, useState } from "react";
import 'react-confirm-alert/src/react-confirm-alert.css'
import Applayout from "@/components/layout/Applayout";
import PaymentContainer from "@/container/payment/PaymentContainer";
import { SellInvoice } from "@/models/invoice/sellInvoice";
import { Customer } from "@/models/customer";
import { MRT_ColumnDef, MaterialReactTable } from "material-react-table";
import MyTools from "@/hooks/MyTools";
export default function InvoicePage() {

    const [selectedCustomer, setSelectedCustomer] = useState<SellInvoice | undefined>(undefined);

    const container = PaymentContainer();

    const myTools = MyTools();


    const columns = useMemo<MRT_ColumnDef<SellInvoice>[]>(
        () => [
            {
                header: 'Number',
                accessorKey: myTools.propToString<SellInvoice>().id + "",
            },
            {
                header: 'Invoice Number',
                accessorKey: myTools.propToString<SellInvoice>().invoiceNumber,
            },
            {
                header: 'Paid',
                accessorKey: myTools.propToString<SellInvoice>().paid + "",
                Cell: ({ renderedCellValue, row }) => {
                    const isPaid: boolean = Boolean(renderedCellValue);
                    return <p className={`text-white dark:text-white ${isPaid ? 'bg-success' : 'bg-danger'}  w-fit rounded-xl px-4 py-1`}>
                        {`${isPaid ? 'Paid' : 'Not Paid'}`}
                    </p>
                }
            },
            {
                header: 'Total',
                accessorKey: myTools.propToString<SellInvoice>().total + "",
                Cell: ({ renderedCellValue, row }) => {
                    return Number(renderedCellValue).toLocaleString();
                }
            },
        ],
        [container.data],
    );


    const TableThreeOld = () => {
        return (
            <div id="customerPage" className={`flex-1 rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1 relative  `}>
                <div className="max-w-full overflow-x-auto">
                    <table className="w-full table-auto">
                        <thead>
                            <tr className="bg-gray-2 text-left dark:bg-meta-4">
                                <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                                    {"Number"}
                                </th>
                                <th className={`${selectedCustomer != undefined ? 'hidden' : 'table-cell'} min-w-[150px] py-4 px-4 font-medium text-black dark:text-white`}>
                                    {"Invoice Number"}
                                </th>
                                <th className={`${selectedCustomer != undefined ? 'hidden' : 'table-cell'} min-w-[120px] py-4 px-4 font-medium text-black dark:text-white`}>
                                    {"Paid"}
                                </th>
                                <th className={`${selectedCustomer != undefined ? 'hidden' : 'table-cell'} py-4 px-4 font-medium text-black dark:text-white`}>
                                    {"Total"}
                                </th>
                                <th className={`${selectedCustomer != undefined ? 'hidden' : 'table-cell'} py-4 px-4 font-medium text-black dark:text-white`}>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {container.data.map((payment, key) => (
                                <tr key={key}>
                                    <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                                        <p className="text-black dark:text-white">
                                            {payment.id}
                                        </p>
                                    </td>

                                    <td className={`${selectedCustomer != undefined ? 'hidden' : 'table-cell'}  border-b border-[#eee] py-5 px-4 dark:border-strokedark`}>
                                        <p className="text-black dark:text-white">
                                            {payment.invoiceNumber}
                                        </p>
                                    </td>

                                    <td className={`${selectedCustomer != undefined ? 'hidden' : 'table-cell'}  border-b border-[#eee] py-5 px-4 dark:border-strokedark`}>
                                        <p className={`text-white dark:text-white ${payment.paid ? 'bg-success' : 'bg-danger'}  w-fit rounded-xl px-4 py-1`}>
                                            {`${payment.paid ? 'Paid' : 'Not Paid'}`}
                                        </p>
                                    </td>

                                    <td className={`${selectedCustomer != undefined ? 'hidden' : 'table-cell'}  border-b border-[#eee] py-5 px-4 dark:border-strokedark`}>
                                        <p className="text-black dark:text-white">
                                            {payment.total}
                                        </p>
                                    </td>


                                    {/* Actions */}
                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                        <div className="flex items-center felx-row space-x-3.5">
                                            <Link href={`/payment/edit/${payment?.id}`} >
                                                <button className="hover:text-primary" >
                                                    <AiOutlineEdit />
                                                </button>
                                            </Link>
                                            {/* <button className="hover:text-primary" onClick={() => { setSelectedCustomer(payment) }}>
                                                <AiOutlineInfoCircle />
                                            </button> */}
                                            {/* <button className="hover:text-primary" onClick={() => {
                                                container.submitDeleteHandler({ id: payment.id })
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

    const TableThree = () => {
        return (
            <>
                <MaterialReactTable
                    columns={columns}
                    data={container.data}
                    enableColumnResizing
                    enableGrouping
                    enableStickyFooter
                    enableColumnActions={false}
                    enableColumnDragging={true}
                    enableStickyHeader={true}
                    enableColumnOrdering={true}
                    enableDensityToggle={false}
                    enableEditing={false}
                    enableRowActions={false}
                    muiPaginationProps={{
                        rowsPerPageOptions: [5, 10, 20, 25, 50, 100],
                        shape: 'rounded',
                        variant: 'outlined',
                        color: 'primary',
                    }}
                    paginationDisplayMode={'pages'}
                    positionActionsColumn='last'
                    layoutMode='grid'
                    columnFilterDisplayMode='popover'
                    muiToolbarAlertBannerChipProps={{ color: 'primary' }}
                    muiTableContainerProps={{ sx: { maxHeight: 700 } }}
                    state={
                        {
                            isLoading: container.loading,
                        }
                    }
                    renderRowActions={({ cell, row, table,
                    }) => {
                        const payment = row.original;
                        return <div className="flex items-center felx-row space-x-3.5">
                            <Link href={`/payment/edit/${payment?.id}`} >
                                <button className="hover:text-primary" >
                                    <AiOutlineEdit />
                                </button>
                            </Link>
                            {/* <button className="hover:text-primary" onClick={() => { setSelectedCustomer(payment) }}>
                                <AiOutlineInfoCircle />
                            </button> */}
                            {/* <button className="hover:text-primary" onClick={() => {
                                container.submitDeleteHandler({ id: payment.id })
                            }}>
                                <AiOutlineDelete />
                            </button> */}

                        </div>
                    }}
                />
            </>
        )
    }
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
                        href="/payment/sell/create"
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
                    {/* payment details */}
                    <div className={`${selectedCustomer == undefined ? 'hidden' : 'block'} flex-2 flex flex-col bg-white dark:bg-boxdark border-stroke dark:border-strokedark rounded-sm border gap-5 px-5 pt-6 pb-2.5 sm:px-7.5 xl:pb-1 `}>
                        {/* header */}
                        <div className="flex flex-row justify-between items-center w-full">
                            <h1 className="text-3xl font-bold">{selectedCustomer?.user.firstName}</h1>
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
                                        <h3 className="font-bold">{selectedCustomer?.user.firstName}</h3>
                                        <h3>{selectedCustomer?.user.email}</h3>
                                        <ul className="flex flex-col gap-2">
                                            <li className="flex flex-row items-center justify-start ">
                                                <AiOutlinePlus />
                                                {selectedCustomer?.user.tel}
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
                    {/* payment details */}
                </div>
            </div>
        </Applayout>
    </>)
}
