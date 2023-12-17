"use client";
import Link from "next/link";
import { Customer } from "../../models/customer";
import DropdownFilter from "./DropdownFilter";
import { AiOutlineDelete, AiOutlineEdit, AiOutlineInfoCircle, AiOutlinePlus } from "react-icons/ai";
import { useMemo, useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css'
import Applayout from "@/components/layout/Applayout";
import CustomersContainer from "@/container/customer/CustomersContainer";
import { MRT_ColumnDef, MaterialReactTable } from "material-react-table";
import MyTools from "@/hooks/MyTools";
import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
export default function CustomerPage() {

    const [selectedCustomer, setSelectedCustomer] = useState<Customer | undefined>(undefined);

    const container = CustomersContainer();

    const myTools = MyTools();

    const [selectedFilterIsVendor, setSelectedFilterIsVendor] = useState<'true' | 'false'>('true');

    const handleChange = (event: SelectChangeEvent) => {
        setSelectedFilterIsVendor(event.target.value as any);
    };

    const columns = useMemo<MRT_ColumnDef<Customer>[]>(
        () => [
            {
                header: 'Name',
                accessorKey: myTools.propToString<Customer>().firstName,
                Cell: ({ renderedCellValue, row }) => {
                    return `${row.original.firstName} ${row.original.lastName}`;
                }
            },
            {
                header: 'Email',
                accessorKey: myTools.propToString<Customer>().email + "",
            },
            {
                header: 'Tel',
                accessorKey: myTools.propToString<Customer>().tel + "",
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
                                    {"First Name"}
                                </th>
                                <th className={`${selectedCustomer != undefined ? 'hidden' : 'table-cell'} min-w-[150px] py-4 px-4 font-medium text-black dark:text-white`}>
                                    {"Last Name"}
                                </th>
                                <th className={`${selectedCustomer != undefined ? 'hidden' : 'table-cell'} min-w-[120px] py-4 px-4 font-medium text-black dark:text-white`}>
                                    {"Email"}
                                </th>
                                <th className={`${selectedCustomer != undefined ? 'hidden' : 'table-cell'} py-4 px-4 font-medium text-black dark:text-white`}>
                                    {"Tel"}
                                </th>
                                <th className={`${selectedCustomer != undefined ? 'hidden' : 'table-cell'} py-4 px-4 font-medium text-black dark:text-white`}>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {container.data.map((customer, key) => (
                                <tr key={key}>
                                    {/* Name */}
                                    <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                                        <p className="text-black dark:text-white">
                                            {customer.firstName}
                                        </p>
                                    </td>
                                    {/* Name */}

                                    {/* Debit */}
                                    <td className={`${selectedCustomer != undefined ? 'hidden' : 'table-cell'}  border-b border-[#eee] py-5 px-4 dark:border-strokedark`}>
                                        <p className="text-black dark:text-white">
                                            {customer.lastName}
                                        </p>
                                    </td>
                                    {/* Debit */}

                                    {/* Credit */}
                                    <td className={`${selectedCustomer != undefined ? 'hidden' : 'table-cell'}  border-b border-[#eee] py-5 px-4 dark:border-strokedark`}>
                                        <p className="text-black dark:text-white">
                                            {customer.email}
                                        </p>
                                    </td>
                                    {/* Credit */}

                                    {/* Balance */}
                                    <td className={`${selectedCustomer != undefined ? 'hidden' : 'table-cell'}  border-b border-[#eee] py-5 px-4 dark:border-strokedark`}>
                                        <p className="text-black dark:text-white">
                                            {customer.tel}
                                        </p>
                                    </td>
                                    {/* Balance */}


                                    {/* Actions */}
                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                        <div className="flex items-center felx-row space-x-3.5">
                                            <Link href={`/customer/edit/${customer?.id}`} >
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
                {/* <DropdownFilter /> */}
                <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Filter</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={String(selectedFilterIsVendor)}
                            label="Filter"
                            onChange={handleChange}
                        >
                            <MenuItem value={'true'}>Vendor</MenuItem>
                            <MenuItem value={'false'}>Clients</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
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
    const TableThree = () => {
        return (
            <div className="w-full overflow-x-auto">
                <MaterialReactTable
                    columns={columns}
                    data={container.data.filter((f) => (f.company?.vendor ? 'true' : 'false') == selectedFilterIsVendor)}
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
                        const Customer = row.original;
                        return <div className="flex items-center felx-row space-x-3.5">
                            <Link href={`/Customer/edit/${Customer?.id}`} >
                                <button className="hover:text-primary" >
                                    <AiOutlineEdit />
                                </button>
                            </Link>
                            <button className="hover:text-primary" onClick={() => { setSelectedCustomer(Customer) }}>
                                <AiOutlineInfoCircle />
                            </button>
                            <button className="hover:text-primary" onClick={() => {
                                confirmAlert({
                                    title: 'Are you sure?',
                                    message: 'want to delete this Customer!?',
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
                                                            container.submitDeleteHandler({ id: Customer.id })
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
                    }}
                />
            </div>
        )
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
                            <h1 className="text-3xl font-bold">{selectedCustomer?.firstName}</h1>
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
                                        <h3 className="font-bold">{selectedCustomer?.firstName}</h3>
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
