export const CommonButton = ({title, icon}: {
    title:String,
    icon:React.ReactElement
}) => {
    return <button className={`flex text-base sm:text-lg md:text-xl items-center gap-1 sm:gap-2
    p-0.5 sm:p-1 md:p-2 rounded-md bg-myBlue text-white hover:bg-blue-600 transition-colors duration-200
    font-play`} >
        <div className="scale-90 sm:scale-100">
            {icon}
        </div>
        {title}
    </button>
}
