
import { confirmAlert } from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css'
import GridItem from "../GridItem/index";
import { MyItemInput } from "../Input/Input";
import { MdOutlineSecurity } from "react-icons/md";

export const InputPasswordDialog = (props: { onCallback: (authPassword: string | null) => void }) => {

    confirmAlert({
        title: `تأكيد الأمان`,
        message: `يرجى إدخال كلمة المرور الخاصة بك `,
        customUI: (customUiOptions: any) => {
            return (<>
                <div className='custom-ui text-[#666] bg-white rounded-xl p-8 shadow-dialog flex flex-col items-center gap-4  w-125 h-auto'>
                    <div className="w-20 h-20 text-6xl border-[4px] border-warning text-warning rounded-full flex flex-row items-center justify-center">
                        <MdOutlineSecurity />
                    </div>
                    <h1 className="text-xl font-bold text-warning">{customUiOptions.title}</h1>
                    <p>{customUiOptions.message}</p>

                    <MyItemInput id={"authPassword"} />
                    <div className="flex flex-row items-center justify-evenly w-full">

                        <button
                            className={`border rounded-lg   bg-warning text-white px-4 py-2 `}
                            onClick={() => {

                                props.onCallback((document.getElementById("authPassword") as HTMLInputElement).value)
                                customUiOptions.onClose()

                            }}> {"تأكيد"}</button>

                        <button
                            className="border rounded-lg cursor-pointer  border-warning text-warning bg-white px-4 py-2 "
                            onClick={() => {
                                props.onCallback(null)
                                customUiOptions.onClose()
                            }}
                        >{"إلغاء"}</button>



                    </div>
                </div>
            </>)
        },
    });

}
