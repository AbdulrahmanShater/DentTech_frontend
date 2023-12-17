"use client";
import { AiOutlineArrowLeft, AiOutlineDelete, AiOutlineSave } from "react-icons/ai";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { MyItemInput } from "@/components/Input/Input";
import MyTools from "@/hooks/MyTools";
import Applayout from "@/components/layout/Applayout";
import IconButton from "@/components/Button/IconButton";
import GridItem from "@/components/GridItem";
import CreateContainer from "@/container/invoice/sell/CreateContainer";
import { CreateInterface, InvoiceItemInterface } from "@/api/interface/invoice/sell";
import { BsArrowReturnRight } from "react-icons/bs";
import { IoMdAddCircleOutline } from "react-icons/io";
import { PiArrowClockwiseLight } from "react-icons/pi";

import { httpErrorHandler } from "@/hooks/httpErrorHandler";
import MyToast from "@/hooks/toast";
import { Item } from "@/models/item";
import ItemService from "@/api/services/ItemService";
import { GetAllJsonR } from "@/api/interface/item";
import ToolTip from "@/components/ToolTip";
import { MySelect } from "@/components/Input";

const CreateCustomer = () => {

    const container = CreateContainer();

    const myTools = MyTools();

    return (<>
        <Applayout>
            <div className="flex flex-col gap-5 h-full ">
                <Header
                    onClickSave={container.canSaveEditData ? container.submitHandler : undefined}
                    backHanlder={container.backHandlerHandler} />
                <div className="flex gap-3 h-fit">
                    <TableThree inputs={[
                        {
                            lableText: "Customer",
                            error: container.errors?.customer,
                            input: <MySelect
                                className="w-72"
                                name={myTools.propToString<CreateInterface>().customer + ""}
                                onChange={container.inputHandeler}
                                value={container.data == undefined ? "" : container.data.customer!}
                                options={container.customers.map((c) => ({ title: c.firstName + " " + c.lastName, value: c.id }))}
                            />
                        },
                        {
                            lableText: "Date",
                            error: container.errors?.invoiceDate,
                            input: <MyItemInput
                                className="w-72"
                                type="date"
                                name={myTools.propToString<CreateInterface>().invoiceDate + ""}
                                onChange={container.inputHandeler}
                                value={container.data == undefined ? "" : container.data.invoiceDate!}
                            />
                        },
                        // {
                        //     lableText: "Number",
                        //     error: container.errors?.invoiceNumber,
                        //     input: <MyItemInput
                        //         className="w-72"
                        //         name={myTools.propToString<CreateInterface>().invoiceNumber + ""}
                        //         onChange={container.inputHandeler}
                        //         value={container.data == undefined ? "" : container.data.invoiceNumber!}
                        //     />
                        // },
                        {
                            lableText: "Reference",
                            error: container.errors?.reference,
                            input: <MyItemInput
                                className="w-72"
                                name={myTools.propToString<CreateInterface>().reference + ""}
                                onChange={container.inputHandeler}
                                value={container.data == undefined ? "" : container.data.reference!}
                            />
                        },
                        {
                            lableText: "patientName",
                            error: container.errors?.patientName,
                            input: <MyItemInput
                                className="w-72"
                                name={myTools.propToString<CreateInterface>().patientName + ""}
                                onChange={container.inputHandeler}
                                value={container.data == undefined ? "" : container.data.patientName!}
                            />
                        },
                        {
                            lableText: "fileNumber",
                            error: container.errors?.fileNumber,
                            input: <MyItemInput
                                className="w-72"
                                name={myTools.propToString<CreateInterface>().fileNumber + ""}
                                onChange={container.inputHandeler}
                                value={container.data == undefined ? "" : container.data.fileNumber!}
                            />
                        },
                        {
                            lableText: "shade",
                            error: container.errors?.shade,
                            input: <MyItemInput
                                className="w-72"
                                name={myTools.propToString<CreateInterface>().shade + ""}
                                onChange={container.inputHandeler}
                                value={container.data == undefined ? "" : container.data.shade!}
                            />
                        },
                        {
                            lableText: "jobOrder",
                            error: container.errors?.jobOrder,
                            input: <MyItemInput
                                className="w-72"
                                name={myTools.propToString<CreateInterface>().jobOrder + ""}
                                onChange={container.inputHandeler}
                                value={container.data == undefined ? "" : container.data.jobOrder!}
                            />
                        },
                    ]} />

                </div>
                <ItemsTable
                    data={container.data?.invoiceItems == undefined ? [] : container.data?.invoiceItems.map((item, index) => {
                        return { ...item, index }
                    })}
                    hiddenNewRow={false}
                    hiddenSelectAll={false}
                    priceStage={
                        (container.priceStage == undefined ||
                            Number(container.priceStage) == 1) ?
                            "price1" : Number(container.priceStage) == 2 ? "price2" :
                                Number(container.priceStage) == 3 ? "price3" :
                                    Number(container.priceStage) == 4 ? "price4" :
                                        "price1"
                    }
                    saveHandler={(data, atIndex) => {

                        if (container.data == undefined || container.data?.invoiceItems == undefined) {
                            container.setData((prev) => ({ ...prev, invoiceItems: [data] }))
                        } else {
                            container.setData((prev) => ({
                                ...prev, invoiceItems:
                                    atIndex == undefined ?
                                        [...prev?.invoiceItems!, data] :
                                        [
                                            ...prev!.invoiceItems!.slice(0, atIndex),
                                            {
                                                ...data,
                                            },
                                            ...prev!.invoiceItems!.slice(atIndex)
                                        ]
                            }))
                        }
                    }}
                    deleteHandler={(data) => {
                        container.setData((prev) => ({ ...prev, invoiceItems: prev?.invoiceItems?.filter((f) => Number(f.rowId) != Number(data.rowId)) }))
                    }}
                    editHandler={(data) => {
                        container.setData((prev) => ({
                            ...prev, invoiceItems: prev?.invoiceItems?.map((item) => {
                                return Number(item.rowId) == Number(data.rowId) ? data : item
                            })
                        }))
                    }}
                />

                {/* summary table */}
                <div className={`h-fit flex-1 rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1 relative  `}>
                    {/* <div className="max-w-full overflow-x-auto"> */}
                    <table className="w-full table-auto h-fit">
                        <thead>
                            <tr className="bg-gray-2 text-left dark:bg-meta-4">
                                {
                                    ["Sub Total", "Discount", "Total"].map((col) => {
                                        return (
                                            <>
                                                <th className="min-w-[220px] py-4 px-4 font-medium text-black text-center dark:text-white xl:pl-11">
                                                    {col}
                                                </th>
                                            </>
                                        )
                                    })
                                }
                            </tr>
                        </thead>
                        <tbody>
                            <tr >
                                <td className={`  border-b border-[#eee] py-5 px-4 dark:border-strokedark text-center`}>
                                    <ToolTip tooltip={"this value is represent selected items values"}>
                                        <input
                                            type="text"
                                            className="disabled:bg-graydark text-center text-black dark:text-white bg-transparent border outline-none p-2 disabled:bg-gray-300 rounded-lg cursor-not-allowed"
                                            value={container.subTotalValue}
                                            disabled
                                        />
                                    </ToolTip>
                                </td>
                                <td className={`  border-b border-[#eee] py-5 px-4 dark:border-strokedark text-center`}>
                                    <input
                                        type="number"
                                        name={myTools.propToString<CreateInterface>().discount + ""}
                                        onChange={container.inputHandeler}
                                        className="text-center text-gray bg-transparent border outline-none p-2 disabled:bg-gray-300 rounded-lg"
                                        value={container.discountValue}
                                    />
                                </td>
                                <td className={`  border-b border-[#eee] py-5 px-4 dark:border-strokedark text-center`}>
                                    <ToolTip tooltip={"this value is represent subtotal minuse of discount"}>
                                        <input
                                            type="text"
                                            className="disabled:bg-graydark text-center text-gray bg-transparent border outline-none p-2 disabled:bg-gray-300 rounded-lg cursor-not-allowed"
                                            value={container.totalValue}
                                            disabled
                                        />
                                    </ToolTip>
                                </td>

                            </tr>
                        </tbody>
                    </table>
                    {/* </div> */}
                </div>
            </div>
        </Applayout>
    </>)
}
interface ItemsTableProps {
    data: TableItems[],
    // onDataChange: (data: OfferItemModel[]) => void,
    saveHandler: (data: TableItems, atIndex?: number) => void,

    editHandler: (data: TableItems) => void,
    deleteHandler: (data: TableItems) => void,
    hiddenNewRow: boolean,
    hiddenSelectAll: boolean,
    priceStage: "price1" | "price2" | "price3" | "price4",
    error?: string,

}
interface TableItems extends InvoiceItemInterface {
    rowId?: number,
}

function ItemsTable(props: ItemsTableProps) {


    const myTools = MyTools()

    const [loading, setLoading] = useState<boolean>(false);

    const [items, setItems] = useState<Item[]>([]);

    // const [data, setData] = useState<TableItems[]>([])

    const [newRowData, setNewRowData] = useState<TableItems>({});

    const [newRow, setNewRow] = useState<boolean>(true)




    const getDataHandler = useCallback(() => {
        setLoading(true)
        ItemService.getAll().then((response: any) => {
            const res: GetAllJsonR = response.data;
            setItems(res.data)
            setNewRowData((prev) => ({ ...prev, item: res.data[0].id }))
        }).catch((error: any) => {
            httpErrorHandler(error, {
                onStatusCode: function (status: number): void {
                    const res: GetAllJsonR = error.response.data;
                    switch (status) {
                        case 404:
                            new MyToast("Sorry, the requested resource could not be found. Please check your API endpoint or try again late").error()
                            break;
                        default:
                            new MyToast(res.message).error()
                            break;
                    }
                },

            })
        }).finally(() => {
            setLoading(false)
        })
    }, [])


    useEffect(() => {
        getDataHandler()
    }, [getDataHandler])


    const getnextRowId = (): number => {
        return props.data.reduce((max, item) => {
            if (item.rowId != undefined && item.rowId > max) {
                return item.rowId;
            } else {
                return max;
            }
        }, 0) + 1;
    }

    const getItemPrice = (invoice: TableItems): string => {

        return items.filter((cf) => cf.id == invoice.item)[0].price1! + ""
    }

    const ALL_ID = "";

    //---------------------
    // DATA
    //  
    const copyLineHandler = (rowId: number) => {
        const rowdata: TableItems = props.data.filter((f) => f.rowId == rowId)[0];
        props.saveHandler({ ...rowdata, rowId: getnextRowId() }, props.data.indexOf(rowdata))
    }
    const inputEditRowData = (event: any, rowId: number) => {
        const type: React.HTMLInputTypeAttribute = event.target.type
        const name = event.target.name;
        var value = type == "checkbox" ? event.target.checked : event.target.value;
        if (type != "checkbox" && (value == "" || value == null)) {
            value = undefined;
        }
        const newData: TableItems = {
            ...props.data.filter((df) => df.rowId == rowId)[0], [name]: value
        };
        props.editHandler(newData)
    }
    const deleteRowHandler = (rowData: TableItems) => {
        props.deleteHandler(rowData)
    }
    const recoverItemPrice = (rowId: number) => {
        const item = props.data.filter((df) => df.rowId == rowId)[0];
        const newData: TableItems = {
            ...props.data.filter((df) => df.rowId == rowId)[0],
            unitPrice: getItemPrice(item)
        };
        props.editHandler(newData)
    }

    //---------------------
    // NEW ROW
    //
    const canSaveNewRow: boolean = useMemo(() => {
        return (newRowData.item !== undefined && newRowData.quantity !== undefined && newRowData.unitPrice !== undefined)
    }, [newRowData])

    useEffect(() => {
        if (newRowData.item !== undefined) {
            setNewRowData((prev) => ({
                // [props.priceStage].toString()
                ...prev, unitPrice: items.find((f) => f.id == newRowData.item)![props.priceStage].toString()
                // ...prev, unitPrice: items.filter((f) => f.id == newRowData.item)[0][props.priceStage].toString()
            }))
        }
    }, [newRowData.item])
    const saveNewRowDate = () => {
        props.saveHandler({ ...newRowData, rowId: getnextRowId() })
        setNewRowData({ item: items[0].id })
    }

    const inputNewRowData = (event: any) => {
        const type: React.HTMLInputTypeAttribute = event.target.type
        const name = event.target.name;
        var value = type == "checkbox" ? event.target.checked : event.target.value;
        if (type != "checkbox" && (value == "" || value == null || value == ALL_ID)) {
            value = undefined;
        }
        setNewRowData((prev) => ({ ...prev, [name]: value }));
    }

    const deleteNewRowHandler = () => {
        setNewRowData({})
    }

    const recoverNewRowItemPrice = () => {

        setNewRowData((prev) => ({ ...prev, unite_price: getItemPrice(newRowData), is_free: false }))
    }

    return useMemo(() => {
        return (<>
            <GridItem error={props.error} name="" children={<></>} />
            <div id="customerPage" className={`flex-1 rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1 relative  `}>
                <div className="max-w-full overflow-x-auto">
                    <table className="w-full table-auto">
                        <thead>
                            <tr className="bg-gray-2 text-left dark:bg-meta-4">
                                {
                                    ["Number", "Item", "Quantity", "Unit Price", ""].map((col) => {
                                        return (
                                            <>
                                                <th className="min-w-[220px] py-4 px-4 font-medium text-black text-center dark:text-white xl:pl-11">
                                                    {col}
                                                </th>
                                            </>
                                        )
                                    })
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {props.data.map((invoice, key) => {
                                return <tr key={invoice.rowId}>
                                    <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11 text-center">
                                        <h1>{key + 1}</h1>
                                    </td>
                                    <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11 text-center">
                                        <select id="" name={myTools.propToString<TableItems>().item + ""} className="text-black dark:text-white bg-white dark:bg-boxdark border outline-none p-2 rounded-lg w-full "
                                            onChange={(event) => inputEditRowData(event, invoice.rowId!)}
                                            value={invoice.item == undefined ? "" : invoice.item}>
                                            {
                                                items.map((c, key) => {
                                                    return <option key={key} value={c.id}>{c.name}</option>
                                                })
                                            }
                                        </select>
                                    </td>

                                    <td className={`  border-b border-[#eee] py-5 px-4 dark:border-strokedark text-center`}>
                                        <input type="number" name={myTools.propToString<TableItems>().quantity + ""} className="text-black dark:text-white bg-transparent border outline-none p-2 rounded-lg"
                                            onChange={(event) => inputEditRowData(event, invoice.rowId!)}
                                            value={invoice.quantity}
                                        />
                                    </td>

                                    <td className={`  border-b border-[#eee] py-5 px-4 dark:border-strokedark text-center`}>
                                        <div className="flex">
                                            <input type="number" name={myTools.propToString<TableItems>().unitPrice + ""} className="text-black dark:text-white bg-transparent border outline-none p-2 rounded-lg"
                                                onChange={(event) => inputEditRowData(event, invoice.rowId!)}
                                                value={invoice.unitPrice}
                                            />
                                            <button onClick={() => { recoverItemPrice(Number(invoice.rowId)) }}>
                                                <ToolTip tooltip="إعادة تعين سعر المنتج">
                                                    <PiArrowClockwiseLight className={`text-success text-xl ms-2 !cursor-pointer`} />
                                                </ToolTip>
                                            </button>
                                        </div>
                                    </td>

                                    {/* Actions */}
                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark text-end">
                                        <div className="flex items-center justify-end felx-row space-x-3.5 gap-4 ">
                                            <button className="hover:text-primary" onClick={() => {
                                                copyLineHandler(invoice.rowId!)
                                            }}>
                                                <BsArrowReturnRight />
                                            </button>
                                            <button className="hover:text-primary" onClick={() => {
                                                deleteRowHandler(invoice)
                                            }}>
                                                <AiOutlineDelete />
                                            </button>
                                        </div>
                                    </td>
                                    {/* Actions */}
                                </tr>
                            })}
                            {
                                (!props.hiddenNewRow && newRow) &&
                                <tr key={-1}>
                                    <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11 text-center">
                                        <h1>{props.data.length + 1}</h1>
                                    </td>
                                    <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11 text-center">
                                        {
                                            loading ?
                                                <h1>{"loading items.."}</h1>
                                                : <select id="" name={myTools.propToString<TableItems>().item + ""} className="text-black dark:text-white bg-white dark:bg-boxdark border outline-none p-2 rounded-lg w-full "
                                                    onChange={inputNewRowData}
                                                    value={newRowData.item}>
                                                    {
                                                        items.map((c, key) => {
                                                            return <option key={key} value={c.id}>{c.name}</option>
                                                        })
                                                    }
                                                </select>
                                        }

                                    </td>

                                    <td className={`  border-b border-[#eee] py-5 px-4 dark:border-strokedark text-center`}>
                                        <input type="number" name={myTools.propToString<TableItems>().quantity + ""} value={newRowData.quantity} onChange={inputNewRowData} className="text-black dark:text-white bg-transparent border outline-none p-2 rounded-lg" />
                                        {/* <p className="text-black dark:text-white">
                                {invoice}
                            </p> */}
                                    </td>

                                    <td className={`  border-b border-[#eee] py-5 px-4 dark:border-strokedark text-center`}>
                                        <div className="flex">
                                            <input
                                                type="number"
                                                value={newRowData.unitPrice}
                                                name={myTools.propToString<TableItems>().unitPrice + ""}
                                                onChange={inputNewRowData}
                                                className="text-black dark:text-white bg-transparent border outline-none p-2 rounded-lg" />
                                            {
                                                <button onClick={recoverNewRowItemPrice}>
                                                    <ToolTip tooltip="reset item price">
                                                        <PiArrowClockwiseLight className={`text-success text-xl ms-2 !cursor-pointer`} />
                                                    </ToolTip>
                                                </button>
                                            }
                                        </div>
                                    </td>

                                    {/* Actions */}
                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark text-end">
                                        <div className="flex items-center justify-end felx-row space-x-3.5 gap-4 ">
                                            {
                                                canSaveNewRow &&
                                                <ToolTip tooltip="save new row ">
                                                    <button className="hover:text-primary" onClick={() => {
                                                        saveNewRowDate()
                                                    }}>
                                                        <AiOutlineSave />
                                                    </button>
                                                </ToolTip>
                                            }

                                            <ToolTip tooltip="close enter row ">
                                                <button className="hover:text-primary" onClick={() => {
                                                    // setNewRow(false)
                                                }}>
                                                    <AiOutlineDelete />
                                                </button>
                                            </ToolTip>

                                        </div>
                                    </td>
                                    {/* Actions */}
                                </tr>
                            }
                        </tbody>
                    </table>
                    {

                        !newRow && <button className="flex flex-row items-center gap-2 cursor-pointer mt-2" onClick={deleteNewRowHandler}>
                            <IoMdAddCircleOutline />
                            <h1>{"إضافة سطر"}</h1>
                        </button>
                    }
                </div>
            </div>
        </>)
    }, [props, newRowData, newRow, canSaveNewRow, newRow, items])
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
                <h1 className="font-extrabold text-2xl">{"New Sell Invoice"}</h1>
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