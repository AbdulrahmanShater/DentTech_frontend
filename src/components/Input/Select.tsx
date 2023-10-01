interface MySelectProps {
    inputName: string,
    onChange: (event: any) => void,
    options: { vlaue: string | ReadonlyArray<string> | number | undefined, title: string }[]
}
export const MySelect = (props: MySelectProps) => {
    const { inputName, onChange } = props;
    return (
        <>
            <select name={inputName} onChange={onChange} id="" className="py-2 px-2 rounded-md w-50 outline-none border  focus:border-primary bg-white dark:bg-boxdark">
                <option value="" >{""}</option>
                <option value="" >{"item 1"}</option>
                <option value="" >{"item 1"}</option>
                <option value="" >{"item 1"}</option>
                <option value="" >{"item 1"}</option>
            </select>
        </>
    );
}