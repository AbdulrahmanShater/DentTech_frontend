interface MyRadioProps {
    inputName: string,
    title: string,

    onChange: (event: any) => void,
}
export const MyRadio = (props: MyRadioProps) => {
    const { inputName, title } = props;
    return (
        <div className="flex flex-row items-center justify-start gap-5">
            <input type={'radio'} name={inputName} className="outline-none bg-transparent w-5.5 h-5.5" />
            <label htmlFor="" >{title}</label>
        </div>
    );
}
