
const ViewTypeWidget = (props: { icon: React.ReactNode, selected: boolean, className?: string, onCLick: () => void }) => {
    return (
        <>
            <div className={`cursor-pointer p-2 rounded-md ${props.selected ? 'bg-boxdark drop-shadow-none dark:bg-white dark:drop-shadow-1' : 'bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none'} ${props.className}`} onClick={props.onCLick}>
                {props.icon}
            </div>
        </>
    )
}
export default ViewTypeWidget;