export default function IconButton(props: { text: string, className?: string, icon: React.ReactNode, onClick: () => void }) {
    return (<>
        <div onClick={props.onClick} className={`text-base flex flex-row items-center gap-4 bg-primary px-4 py-2 rounded active:bg-pink-600 uppercase text-white  hover:shadow-md shadow  sm:mr-2 mb-1 ease-linear transition-all duration-150 ${props.className}`}>
            {props.icon}
            <button className="outline-none focus:outline-none" type="button">
                {props.text}
            </button>
        </div>

    </>)
}