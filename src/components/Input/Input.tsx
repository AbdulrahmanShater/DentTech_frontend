import { DetailedHTMLProps, InputHTMLAttributes } from "react";

interface MyItemInputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    error?: string,
}
export const MyItemInput = (props: MyItemInputProps) => {
    // const { inputName, onChange } = props;
    return (
        <>
            <input
                type="text"
                className={`py-2 px-2 rounded-md w-50 outline-none bg-transparent border  focus:border-primary ${props.error==undefined?'':'text-danger border-danger focus:border-danger'}`}
                name={props.name}
                onChange={props.onChange}
                value={props.value}
            />
        </>
    );
}
//  {...props} 
