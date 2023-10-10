"use client";

import { useParams, useRouter } from 'next/navigation'
import { AiOutlineArrowLeft, AiOutlineSave } from "react-icons/ai";
import { MyItemInput } from '@/components/Input';
import MyTools from '@/hooks/MyTools';
import Applayout from '@/components/layout/Applayout';
import IconButton from '@/components/Button/IconButton';
import { EditItemInterface } from '@/api/interface/item';
import GridItem from '@/components/GridItem';
import EditContainer from '@/container/item/EditContainer';

export default function EditItem() {

    const router = useRouter();
    // const { id } = router.query; // get id value from URL

    const { id } = useParams();
    const container = EditContainer({ item_id: Number(id) });

    const myTools = MyTools();


    if (container.item == null) {
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
                            lableText: "Name",
                            error: container.errors?.name,
                            input: <MyItemInput
                                className="w-72"
                                name={myTools.propToString<EditItemInterface>().name + ""}
                                onChange={container.inputHandeler}
                                value={container.data == undefined ? "" : container.data.name!}
                            />
                        },
                        {
                            lableText: "Description",
                            error: container.errors?.description,
                            input: <MyItemInput
                                className="w-72"
                                name={myTools.propToString<EditItemInterface>().description + ""}
                                onChange={container.inputHandeler}
                                value={container.data == undefined ? "" : container.data.description!}
                            />
                        },
                        {
                            lableText: "Price1",
                            error: container.errors?.price1,
                            input: <MyItemInput
                                className="w-72"
                                name={myTools.propToString<EditItemInterface>().price1 + ""}
                                onChange={container.inputHandeler}
                                value={container.data == undefined ? "" : container.data.price1!}
                            />
                        },
                        {
                            lableText: "Price2",
                            error: container.errors?.price2,
                            input: <MyItemInput
                                className="w-72"
                                name={myTools.propToString<EditItemInterface>().price2 + ""}
                                onChange={container.inputHandeler}
                                value={container.data == undefined ? "" : container.data.price2!}
                            />
                        },
                        {
                            lableText: "Price3",
                            error: container.errors?.price3,
                            input: <MyItemInput
                                className="w-72"
                                name={myTools.propToString<EditItemInterface>().price3 + ""}
                                onChange={container.inputHandeler}
                                value={container.data == undefined ? "" : container.data.price3!}
                            />
                        },
                        {
                            lableText: "Price4",
                            error: container.errors?.price4,
                            input: <MyItemInput
                                className="w-72"
                                name={myTools.propToString<EditItemInterface>().price4 + ""}
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



const Header = (props: { onClickSave?: () => void, backHanlder?: () => void }) => {
    return (<>
        <div className="flex flex-row justify-between">

            <div className="flex flex-row items-center gap-2">
                <div className="cursor-pointer" onClick={props.backHanlder}>
                    <AiOutlineArrowLeft />
                </div>
                <h1 className="font-extrabold text-2xl">{"Edit Item"}</h1>
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

