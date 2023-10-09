import { AiOutlineInfoCircle } from "react-icons/ai";
import ToolTip from "../ToolTip";

export default function GridItem(props: { error?: string, name: string, children: React.ReactNode }) {
    return (
        <>
            <div className="flex flex-row items-center justify-start">

                {/* <div className="w-5 h-5 text-danger" >
                    {
                        props.error && <ToolTip tooltip={props.error + ""}> <AiOutlineInfoCircle /></ToolTip>
                    }
                </div> */}
                <div className="w-5 h-5 text-danger ">
                    {
                        props.error && <ToolTip
                            backgroundColor="rgb(211 64 83 / var(--tw-bg-opacity))"
                            tooltip={props.error + ""}
                        >
                            <div className="text-danger ">
                                <AiOutlineInfoCircle />
                            </div>
                        </ToolTip>
                    }
                </div>

                <div className="flex flex-row items-center justify-between flex-1">
                    <label htmlFor="">{props.name}</label>
                    {props.children}
                </div>
            </div>

        </>
    );
};
