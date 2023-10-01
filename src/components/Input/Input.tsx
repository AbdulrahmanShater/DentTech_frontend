import { DetailedHTMLProps, InputHTMLAttributes } from "react";

interface MyItemInputProps {
    inputName: string,
    onChange: (event: any) => void,
    p: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
}
export const MyItemInput = (props: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) => {
    // const { inputName, onChange } = props;
    return (
        <>
            <input
                type="text"
                className="py-2 px-2 rounded-md w-50 outline-none bg-transparent border  focus:border-primary"
                name={props.name}
                onChange={props.onChange}
                value={props.value}
            />
        </>
    );
}
            //  {...props} 
