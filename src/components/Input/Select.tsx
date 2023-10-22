import React, { SelectHTMLAttributes } from "react";

interface MySelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    error?: string
    options: { value: string | ReadonlyArray<string> | number | undefined, title: string }[],
    extraOptions?: React.ReactNode
}
export const MySelect = (props: MySelectProps) => {
    return (
        <>
            <select
                {...props}
                className={`py-2 px-2 rounded-md w-50 outline-none bg-[var(--color3)] dark:bg-boxdark border focus:border-primary ${props.error == undefined ? '' : 'text-danger border-danger focus:border-danger'}`}
                onChange={props.onChange}
                value={props.value}
            >
                {
                    props.options.map((op, index) => {
                        return <option key={index} value={op.value} >{op.title}</option>
                    })
                }
                 {props.extraOptions}
            </select>
          
        </>
    );
}