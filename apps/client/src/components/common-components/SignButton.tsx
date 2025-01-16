import { useState } from "react";
import { IoIosArrowRoundForward } from "react-icons/io";

interface propsInterface {
    title:String;
    onClick: ()=> void;
}

export const SignButton = (props: propsInterface)=>{
    const [arrow, setArrow]= useState(false)
    console.log(arrow)
    const {title, onClick} = props
    return <button onClick={()=>{
        onClick
        setArrow(!arrow)
    }}
        className={`bg-buttonBg border border-black font-play focus:outline-none p-4 py-10 translate-y-3 rounded-xl hover:py-2  transition-all duration-300`}
    >
        {
            arrow && <div className="transition-all duration-500 translate-x-16 text-xl translate-y-5">
                <IoIosArrowRoundForward />
            </div>
        }
        {title}
    </button>
}
