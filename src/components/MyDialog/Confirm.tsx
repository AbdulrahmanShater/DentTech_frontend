
import { confirmAlert } from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css'


interface ConfirmDialogProps {
    onCallback: (value: boolean) => void,
    icon: React.ReactNode,
    title: string,
    message: string,
    default: "yes" | "no",
    type: "warning" | "danger" | "success"
}

const ConfirmButton = (props: { default: boolean, title: string, onClick: () => void, type: "warning" | "danger" | "success" }) => {
    return (
        <>
            <button
                className={`border rounded-lg cursor-pointer px-4 py-2  ${props.default ? `bg-${props.type} text-white animate-pulse` : `border-${props.type} text-${props.type} bg-white`}`}
                onClick={props.onClick}>
                {props.title}
            </button>
        </>
    )
}
export const ConfirmDialog = (props: ConfirmDialogProps) => {

    confirmAlert({
        customUI: (customUiOptions: any) => {
            return (<>
                <div className={`custom-ui text-[#666] bg-white rounded-xl p-8 shadow-dialog flex flex-col items-center gap-4  w-125 h-auto`}>
                    <div className={`w-20 h-20 text-6xl border-[4px] border-${props.type} text-${props.type} rounded-full flex flex-row items-center justify-center`}>
                        {props.icon}
                    </div>
                    <h1 className={`text-xl font-bold text-${props.type}`}>{props.title}</h1>
                    <p>{props.message}</p>

                    {/* buttons start */}
                    <div className="flex flex-row items-center justify-evenly w-full">
                        <ConfirmButton title="نعم" type={props.type} default={props.default == "yes"} onClick={() => {
                            customUiOptions.onClose()
                            props.onCallback(true)
                        }} />

                        <ConfirmButton title="لا" type={props.type} default={props.default == "no"} onClick={() => {
                            customUiOptions.onClose()
                            props.onCallback(false)
                        }} />
                    </div>
                    {/* buttons end */}

                </div>
            </>)
        },
        overlayClassName:"bg-"
    });

}

