"use client";
import { AiOutlineArrowLeft, AiOutlineDelete, AiOutlineEdit, AiOutlineInfoCircle, AiOutlineSave } from "react-icons/ai";
// import React, { useEffect, useState } from "react";
// import { MyItemInput } from "@/components/Input/Input";
// import MyTools from "@/hooks/MyTools";
// import Applayout from "@/components/layout/Applayout";
// import IconButton from "@/components/Button/IconButton";
// import GridItem from "@/components/GridItem";
// import CreateContainer, { TableItemModel } from "@/container/invoice/buy/CreateContainer";
// import { CreateInterface, InvoiceItemInterface } from "@/api/interface/invoice/buy";
// import { BsArrowReturnRight } from "react-icons/bs";
// import { IoMdAddCircleOutline } from "react-icons/io";
// import { httpErrorHandler } from "@/hooks/httpErrorHandler";
// import MyToast from "@/hooks/toast";
// import { BuyInvoiceItem } from "@/models/invoice/buyInvoice";
// import { Item } from "@/models/item";
// import ItemService from "@/api/services/ItemService";
// import { GetAllJsonR } from "@/api/interface/item";

// const CreateCustomer = () => {

//     const container = CreateContainer();

//     const myTools = MyTools();

//     return (<>
//         <Applayout>
//             <div className="flex flex-col gap-5 h-full ">
//                 <Header
//                     onClickSave={container.canSaveEditData ? container.submitHandler : undefined}
//                     backHanlder={container.backHandlerHandler} />
//                 <div className="flex gap-3 h-full">
//                     <TableThree inputs={[
//                         {
//                             lableText: "Customer",
//                             error: container.errors?.customer,
//                             input: <MyItemInput
//                                 className="w-72"
//                                 name={myTools.propToString<CreateInterface>().customer + ""}
//                                 onChange={container.inputHandeler}
//                                 value={container.data == undefined ? "" : container.data.customer!}
//                             />
//                         },
//                         {
//                             lableText: "Date",
//                             error: container.errors?.invoiceDate,
//                             input: <MyItemInput
//                                 className="w-72"
//                                 name={myTools.propToString<CreateInterface>().invoiceDate + ""}
//                                 onChange={container.inputHandeler}
//                                 value={container.data == undefined ? "" : container.data.invoiceDate!}
//                             />
//                         },
//                         {
//                             lableText: "Number",
//                             error: container.errors?.invoiceNumber,
//                             input: <MyItemInput
//                                 className="w-72"
//                                 name={myTools.propToString<CreateInterface>().invoiceNumber + ""}
//                                 onChange={container.inputHandeler}
//                                 value={container.data == undefined ? "" : container.data.invoiceNumber!}
//                             />
//                         },
//                         {
//                             lableText: "Reference",
//                             error: container.errors?.reference,
//                             input: <MyItemInput
//                                 className="w-72"
//                                 name={myTools.propToString<CreateInterface>().reference + ""}
//                                 onChange={container.inputHandeler}
//                                 value={container.data == undefined ? "" : container.data.reference!}
//                             />
//                         },
//                         {
//                             lableText: "Discount",
//                             error: container.errors?.discount,
//                             input: <MyItemInput
//                                 className="w-72"
//                                 name={myTools.propToString<CreateInterface>().discount + ""}
//                                 onChange={container.inputHandeler}
//                                 value={container.data == undefined ? "" : container.data.discount!}
//                             />
//                         },
//                     ]} />

//                 </div>
//                 <ItemsTable />
//             </div>
//         </Applayout>
//     </>)


//     // function InvoiceItemTable() {

//     //     const myTools = MyTools()
//     //     interface InvoiceItemModel {
//     //         item_id?: number,
//     //         quantity?: number,
//     //         unite_price?: number
//     //     }
//     //     const [data, setData] = useState<InvoiceItemModel[]>([
//     //         {
//     //             item_id: 1,
//     //             quantity: 2,
//     //             unite_price: 252
//     //         },
//     //         {
//     //             item_id: 2,
//     //             quantity: 4,
//     //             unite_price: 300
//     //         },
//     //         {
//     //             item_id: 5,
//     //             quantity: 2,
//     //             unite_price: 150
//     //         }
//     //     ])

//     //     const [newRowData, setNewRowData] = useState<InvoiceItemModel>({});

//     //     const [newRow, setNewRow] = useState<boolean>(false)

//     //     const saveNewRowDate = () => {
//     //         setData((prev) => [...prev, newRowData]);
//     //         setNewRow(false)
//     //         setNewRowData({})
//     //     }

//     //     const copyLineHandler = (lineIndex: number) => {
//     //         const index = 2;
//     //         const rowdata = data[lineIndex]
//     //         const newData = [
//     //             ...data.slice(0, index),
//     //             rowdata,
//     //             ...data.slice(index)
//     //         ];
//     //         setData(newData)
//     //     }

//     //     const inputNewRowData = (event: any) => {
//     //         var value = event.target.value;
//     //         const name = event.target.name;
//     //         if (value == "" || value == null) {
//     //             value = undefined;
//     //         }
//     //         setNewRowData((prev) => ({ ...prev, [name]: value }));
//     //     }

//     //     const inputEditRowData = (event: any, rowIndex: number) => {
//     //         var value = event.target.value;
//     //         const name = event.target.name;
//     //         if (value == "" || value == null) {
//     //             value = undefined;
//     //         }
//     //         setData((prev) => (
//     //             prev.map((row, index) => {
//     //                 return index == rowIndex ? { ...row, [name]: value }
//     //                     : row
//     //             })
//     //         ))
//     //         setNewRowData((prev) => ({ ...prev, [name]: value }));
//     //     }

//     //     const deleteRowHandler = (rowData: InvoiceItemModel) => {
//     //         setData((prev) => prev.filter((f) => f != rowData))
//     //     }


//     //     return (<>
//     //         <div id="customerPage" className={`flex-1 rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1 relative  `}>
//     //             <div className="max-w-full overflow-x-auto">
//     //                 <table className="w-full table-auto">
//     //                     <thead>
//     //                         <tr className="bg-gray-2 text-left dark:bg-meta-4">
//     //                             {
//     //                                 ["Item", "Quantity", "Unite Price", ""].map((col) => {
//     //                                     return (
//     //                                         <>
//     //                                             <th className="min-w-[220px] py-4 px-4 font-medium text-black text-center dark:text-white xl:pl-11">
//     //                                                 {col}
//     //                                             </th>
//     //                                         </>
//     //                                     )
//     //                                 })
//     //                             }
//     //                         </tr>
//     //                     </thead>
//     //                     <tbody>
//     //                         {data.map((invoice, key) => (
//     //                             <tr key={key}>
//     //                                 <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11 text-center">
//     //                                     <select id="" className="text-black dark:text-white bg-white dark:bg-boxdark border outline-none p-2 rounded-lg w-full "
//     //                                         onChange={(event) => inputEditRowData(event, key)}
//     //                                         value={invoice.item_id}>
//     //                                         <option value={invoice.item_id}>{invoice.item_id}</option>
//     //                                         <option value={1}>{"1"}</option>
//     //                                         <option value={2}>{"2"}</option>
//     //                                         <option value={3}>{"3"}</option>
//     //                                         <option value={4}>{"4"}</option>
//     //                                     </select>
//     //                                 </td>

//     //                                 <td className={`  border-b border-[#eee] py-5 px-4 dark:border-strokedark text-center`}>
//     //                                     <input type="text" className="text-black dark:text-white bg-transparent border outline-none p-2 rounded-lg"
//     //                                         onChange={(event) => inputEditRowData(event, key)}
//     //                                         value={invoice.quantity} />
//     //                                     {/* <p className="text-black dark:text-white">
//     //                                         {invoice}
//     //                                     </p> */}
//     //                                 </td>

//     //                                 <td className={`  border-b border-[#eee] py-5 px-4 dark:border-strokedark text-center`}>
//     //                                     <input type="text" className="text-black dark:text-white bg-transparent border outline-none p-2 rounded-lg"
//     //                                         onChange={(event) => inputEditRowData(event, key)}
//     //                                         value={invoice.unite_price} />
//     //                                 </td>

//     //                                 {/* Actions */}
//     //                                 <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark text-end">
//     //                                     <div className="flex items-center justify-end felx-row space-x-3.5 gap-4 ">
//     //                                         <button className="hover:text-primary" onClick={() => {
//     //                                             copyLineHandler(key)
//     //                                         }}>
//     //                                             <BsArrowReturnRight />
//     //                                         </button>
//     //                                         <button className="hover:text-primary" onClick={() => {
//     //                                             deleteRowHandler(invoice)
//     //                                         }}>
//     //                                             <AiOutlineDelete />
//     //                                         </button>

//     //                                     </div>
//     //                                 </td>
//     //                                 {/* Actions */}
//     //                             </tr>
//     //                         ))}
//     //                         {
//     //                             newRow &&
//     //                             <tr key={-1}>
//     //                                 <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11 text-center">
//     //                                     <select
//     //                                         name={myTools.propToString<InvoiceItemModel>().item_id + ""}
//     //                                         id=""
//     //                                         onChange={inputNewRowData}
//     //                                         value={newRowData.item_id}
//     //                                         className="text-black dark:text-white bg-white dark:bg-boxdark border outline-none p-2 rounded-lg w-full " >
//     //                                         <option value={1}>{"1"}</option>
//     //                                         <option value={2}>{"2"}</option>
//     //                                         <option value={3}>{"3"}</option>
//     //                                         <option value={4}>{"4"}</option>
//     //                                     </select>
//     //                                 </td>

//     //                                 <td className={`  border-b border-[#eee] py-5 px-4 dark:border-strokedark text-center`}>
//     //                                     <input type="text" name={myTools.propToString<InvoiceItemModel>().quantity + ""} value={newRowData.quantity} onChange={inputNewRowData} className="text-black dark:text-white bg-transparent border outline-none p-2 rounded-lg" />
//     //                                     {/* <p className="text-black dark:text-white">
//     //                                 {invoice}
//     //                             </p> */}
//     //                                 </td>

//     //                                 <td className={`  border-b border-[#eee] py-5 px-4 dark:border-strokedark text-center`}>
//     //                                     <input type="text" name={myTools.propToString<InvoiceItemModel>().unite_price + ""} value={newRowData.unite_price} onChange={inputNewRowData} className="text-black dark:text-white bg-transparent border outline-none p-2 rounded-lg" />
//     //                                 </td>

//     //                                 {/* Actions */}
//     //                                 <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark text-end">
//     //                                     <div className="flex items-center justify-end felx-row space-x-3.5 gap-4 ">
//     //                                         <button className="hover:text-primary" onClick={() => {
//     //                                             saveNewRowDate()
//     //                                         }}>
//     //                                             <AiOutlineSave />
//     //                                         </button>
//     //                                         <button className="hover:text-primary" onClick={() => {
//     //                                             setNewRow(false)
//     //                                         }}>
//     //                                             <AiOutlineDelete />
//     //                                         </button>
//     //                                     </div>
//     //                                 </td>
//     //                                 {/* Actions */}
//     //                             </tr>
//     //                         }
//     //                     </tbody>
//     //                 </table>
//     //                 {

//     //                     !newRow && <button className="flex flex-row items-center gap-2 cursor-pointer" onClick={() => {
//     //                         setNewRow(true)
//     //                     }}>
//     //                         <IoMdAddCircleOutline />
//     //                         <h1>{"Add another line"}</h1>
//     //                     </button>
//     //                 }
//     //             </div>
//     //         </div>
//     //     </>)
//     // }
//     function ItemsTable() {

//         const getDataHandler = () => {

//             setLoading(true)
//             ItemService.getAll().then((response: any) => {
//                 const res: GetAllJsonR = response.data;
//                 setItems(res.data)
//             }).catch((error: any) => {
//                 httpErrorHandler(error, {
//                     onStatusCode: function (status: number): void {
//                         const res: GetAllJsonR = error.response.data;
//                         switch (status) {
//                             case 404:
//                                 new MyToast("Sorry, the requested resource could not be found. Please check your API endpoint or try again late").error()
//                                 break;
//                             default:
//                                 new MyToast(res.message).error()
//                                 break;
//                         }
//                     },

//                 })
//             }).finally(() => {
//                 setLoading(false)
//             })
//         }

//         useEffect(() => {
//             getDataHandler()
//         }, [])

//         const myTools = MyTools()


//         const [loading, setLoading] = useState<boolean>(false);

//         const [items, setItems] = useState<Item[]>([]);



//         const [newRowData, setNewRowData] = useState<TableItemModel>({});

//         const [newRow, setNewRow] = useState<boolean>(false)


//         const getnextRowId = (): number => {
//             return container.tableItems.reduce((max, item) => {
//                 if (item.rowId != undefined && item.rowId > max) {
//                     return item.rowId;
//                 } else {
//                     return max;
//                 }
//             }, 0);
//         }
//         const saveNewRowDate = () => {

//             container.setTableItems((prev) => [...prev, { ...newRowData, rowId: getnextRowId() }]);
//             setNewRow(false)
//             setNewRowData({})
//         }


//         const copyLineHandler = (lineIndex: number) => {
//             const index = lineIndex;
//             const rowdata: TableItemModel = container.tableItems[lineIndex];

//             // use reduce method to get maximum id value
//             const newData = [
//                 ...container.tableItems.slice(0, index),
//                 {
//                     ...rowdata,
//                     rowdata: getnextRowId()
//                 },
//                 ...container.tableItems.slice(index)
//             ];
//             container.setTableItems(newData)
//         }

//         const inputNewRowData = (event: any) => {
//             const type: React.HTMLInputTypeAttribute = event.target.type
//             const name = event.target.name;
//             var value = type == "checkbox" ? event.target.checked : event.target.value;
//             if (type != "checkbox" && (value == "" || value == null)) {
//                 value = undefined;
//             }
//             setNewRowData((prev) => ({ ...prev, [name]: value }));
//         }

//         const inputEditRowData = (event: any, rowId: number) => {
//             const type: React.HTMLInputTypeAttribute = event.target.type
//             const name = event.target.name;
//             var value = type == "checkbox" ? event.target.checked : event.target.value;
//             if (type != "checkbox" && (value == "" || value == null)) {
//                 value = undefined;
//             }
//             container.setTableItems((prev) => (
//                 prev.map((row, index) => {
//                     return row.rowId == rowId ? { ...row, [name]: value }
//                         : row
//                 })
//             ))
//             setNewRowData((prev) => ({ ...prev, [name]: value }));
//         }

//         const deleteRowHandler = (rowData: TableItemModel) => {
//             container.setTableItems((prev) => prev.filter((f) => f.rowId != rowData.rowId))
//         }

//         const canSaveNewRow: boolean = React.useMemo(() => {
//             return (newRowData.item !== undefined && newRowData.quantity !== undefined && newRowData.unitPrice !== undefined)
//         }, [newRowData])


//         useEffect(() => {
//             if (newRowData.item != undefined) {
//                 setNewRowData((prev) => ({ ...prev, quantity: 1 + "" }))
//                 setNewRowData((prev) => ({ ...prev, unite_price: items.filter((cf) => cf.id == newRowData.item)[0]?.price1! + "" }))
//             } else {
//                 setNewRowData((prev) => ({ ...prev, quantity: "" }))
//                 setNewRowData((prev) => ({ ...prev, unite_price: "" }))
//             }

//         }, [newRowData.item])


//         return (<>
//             <div id="customerPage" className={`flex-1 rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1 relative  `}>
//                 <div className="max-w-full overflow-x-auto">
//                     <table className="w-full table-auto">
//                         <thead>
//                             <tr className="bg-gray-2 text-left dark:bg-meta-4">
//                                 {
//                                     ["NO", "Invoice Item", "Quantity", "Price", ""].map((col) => {
//                                         return (
//                                             <>
//                                                 <th className="min-w-[220px] py-4 px-4 font-medium text-black text-center dark:text-white xl:pl-11">
//                                                     {col}
//                                                 </th>
//                                             </>
//                                         )
//                                     })
//                                 }
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {container.tableItems.map((invoice, key) => {
//                                 return <tr key={invoice.rowId}>
//                                     <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11 text-center">
//                                         {key + 1}
//                                     </td>
//                                     <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11 text-center">
//                                         <select id="" name={myTools.propToString<TableItemModel>().item + ""} className="text-black dark:text-white bg-white dark:bg-boxdark border outline-none p-2 rounded-lg w-full "
//                                             onChange={(event) => inputEditRowData(event, invoice.rowId!)}
//                                             value={invoice.item}>
//                                             {
//                                                 items.map((c, key) => {
//                                                     return <option key={key} value={c.id}>{c.name}</option>
//                                                 })
//                                             }
//                                         </select>
//                                     </td>

//                                     <td className={`  border-b border-[#eee] py-5 px-4 dark:border-strokedark text-center`}>
//                                         <input type="text" name={myTools.propToString<TableItemModel>().quantity + ""} className="text-black dark:text-white bg-transparent border outline-none p-2 rounded-lg"
//                                             onChange={(event) => inputEditRowData(event, invoice.rowId!)}
//                                             value={invoice.quantity}
//                                         />
//                                     </td>

//                                     <td className={`  border-b border-[#eee] py-5 px-4 dark:border-strokedark text-center`}>
//                                         <input type="text" name={myTools.propToString<TableItemModel>().unitPrice + ""} className="text-black dark:text-white bg-transparent border outline-none p-2 rounded-lg"
//                                             onChange={(event) => inputEditRowData(event, invoice.rowId!)}
//                                             value={invoice.unitPrice}
//                                         />
//                                     </td>

//                                     {/* Actions */}
//                                     <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark text-end">
//                                         <div className="flex items-center justify-end felx-row space-x-3.5 gap-4 ">
//                                             <button className="hover:text-primary" onClick={() => {
//                                                 copyLineHandler(invoice.rowId!)
//                                             }}>
//                                                 <BsArrowReturnRight />
//                                             </button>
//                                             <button className="hover:text-primary" onClick={() => {
//                                                 deleteRowHandler(invoice)
//                                             }}>
//                                                 <AiOutlineDelete />
//                                             </button>

//                                         </div>
//                                     </td>
//                                     {/* Actions */}
//                                 </tr>
//                             })}
//                             {
//                                 newRow &&
//                                 <tr key={-1}>


//                                     <td className={`  border-b border-[#eee] py-5 px-4 dark:border-strokedark text-center`}>
//                                         {container.tableItems.length + 1}
//                                     </td>

//                                     <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11 text-center">
//                                         <select id="" name={myTools.propToString<TableItemModel>().item + ""} className="text-black dark:text-white bg-white dark:bg-boxdark border outline-none p-2 rounded-lg w-full "
//                                             onChange={inputNewRowData}
//                                             value={newRowData.item}>
//                                             {
//                                                 items.map((c, key) => {
//                                                     return <option key={key} value={c.id}>{c.name}</option>
//                                                 })
//                                             }
//                                         </select>
//                                     </td>


//                                     <td className={`  border-b border-[#eee] py-5 px-4 dark:border-strokedark text-center`}>
//                                         <input type="text" name={myTools.propToString<TableItemModel>().quantity + ""} value={newRowData.quantity} onChange={inputNewRowData} className="text-black dark:text-white bg-transparent border outline-none p-2 rounded-lg" />

//                                     </td>

//                                     <td className={`  border-b border-[#eee] py-5 px-4 dark:border-strokedark text-center`}>
//                                         <input type="text" value={newRowData.unitPrice} name={myTools.propToString<TableItemModel>().unitPrice + ""} onChange={inputNewRowData} className="text-black dark:text-white bg-transparent border outline-none p-2 rounded-lg" />
//                                     </td>


//                                     {/* Actions */}
//                                     <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark text-end">
//                                         <div className="flex items-center justify-end felx-row space-x-3.5 gap-4 ">
//                                             {
//                                                 canSaveNewRow && <button className="hover:text-primary" onClick={() => {
//                                                     saveNewRowDate()
//                                                 }}>
//                                                     <AiOutlineSave />
//                                                 </button>
//                                             }

//                                             <button className="hover:text-primary" onClick={() => {
//                                                 setNewRow(false)
//                                             }}>
//                                                 <AiOutlineDelete />
//                                             </button>
//                                         </div>
//                                     </td>
//                                     {/* Actions */}
//                                 </tr>
//                             }
//                         </tbody>
//                     </table>
//                     <div className="flex flex-row justify-between items-center">
//                         {

//                             !newRow && <button className="flex flex-row items-center gap-2 cursor-pointer mt-2" onClick={() => {
//                                 setNewRow(true)
//                             }}>
//                                 <IoMdAddCircleOutline />
//                                 <h1>{"Add New Line"}</h1>
//                             </button>
//                         }
//                         <h1>{container.tableItemsTotalValue}</h1>
//                     </div>
//                 </div>
//             </div>
//         </>)
//     }
// }



// interface MyInputsInterface {
//     lableText: string,
//     error?: string,
//     input: React.ReactNode
// }
// const TableThree = (props: { inputs: MyInputsInterface[], title?: string }) => {
//     return (

//         <div className={`min-h-fit h-full flex-1 flex flex-col gap-4 rounded-xl border border-stroke bg-[var(--color3)] text-[var(--color2)] px-5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5`}>
//             {props.title && <h1 className="text-title-md font-bold"> {props.title}</h1>}
//             <div className="max-w-full overflow-x-auto grid xs:grid-cols-1 md:grid-cols-2 items-center gap-7 gap-x-14">
//                 {
//                     props.inputs.map((inp) => {
//                         return (<>
//                             <GridItem name={inp.lableText} error={inp.error}>
//                                 {inp.input}
//                             </GridItem>
//                         </>)
//                     })
//                 }
//             </div>
//         </div>
//     );
// };

// const Header = (props: { onClickSave?: (props: { reInter: boolean }) => void, backHanlder?: () => void }) => {
//     return (<>
//         <div className="flex flex-row justify-between">

//             <div className="flex flex-row items-center gap-2">
//                 <div className="cursor-pointer" onClick={props.backHanlder}>
//                     <AiOutlineArrowLeft />
//                 </div>
//                 <h1 className="font-extrabold text-2xl">{"New Buy Invoice"}</h1>
//             </div>
//             {
//                 props.onClickSave !== undefined ?
//                     <div className="flex">
//                         <IconButton className="bg-success animate-pulse" text="save" icon={<AiOutlineSave />}
//                             onClick={() => {
//                                 props.onClickSave!({ reInter: true })
//                             }} />
//                         <IconButton className="bg-success" text="save and close" icon={<AiOutlineSave />}
//                             onClick={() => {
//                                 props.onClickSave!({ reInter: false })
//                             }} />

//                     </div> : <></>
//             }

//         </div>
//     </>)
// }
// export default CreateCustomer;