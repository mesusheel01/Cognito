export const CommonButton = ({title, icon,onClick}: {
    title:String,
    icon:React.ReactElement,
    onClick: ()=> void
}) => {
    return <button
        onClick={onClick}
    className={`flex text-base sm:text-sm md:text-lg items-center gap-1 sm:gap-2
    p-0.5 sm:p-1 md:p-2 rounded-md bg-myBlue text-Charcoal transition-all hover:bg-blue-600 duration-300
    font-play`} >
        <div className="scale-90 sm:scale-100">
            {icon}
        </div>
        {title}
    </button>
}
