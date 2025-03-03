import { useState } from "react";
import { FaHashtag, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IoLinkSharp } from "react-icons/io5";
import { MdKeyboardArrowLeft, MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from "react-icons/md";
import { SlDocs } from "react-icons/sl";

const Sidebar = () => {
    const [IsSidebarOpen, setIsSidebarOpen] = useState(false)
    const handleButtonClick = (type:string)=>{

    }

  return (
    <aside>
        { IsSidebarOpen ?
            <div className="translate-y-10 absolute top-40 bg-myGreen h-[50vh] w-[35vh] rounded-xl opacity-80 m-2 flex flex-col gap-3 justify-center items-center">
            {/* Section for all the types of content and user profile section */}
            <div className="relative -top-6 left-24" onClick={()=>setIsSidebarOpen(prev=>!prev)}>
                <MdKeyboardDoubleArrowLeft />
            </div>
            <LinkButton title={"Youtube"} icon={<FaYoutube />} onClick={()=>handleButtonClick("youtube")} />
            <LinkButton title={"Twitter"} icon={<FaXTwitter />} onClick={()=>handleButtonClick("twitter")} />
            <LinkButton title={"Docs"} icon={<SlDocs />} onClick={()=>handleButtonClick("Docs")} />
            <LinkButton title={"Links"} icon={<IoLinkSharp />} onClick={()=>handleButtonClick("links")} />
            <LinkButton title={"Tags"} icon={<FaHashtag />} onClick={()=>handleButtonClick("tags")} />
        </div>
        :
        <div className="translate-y-10 flex flex-col gap-10 justify-center items-center absolute top-40 bg-myGreen h-[50vh] w-[6vh] rounded-xl opacity-80 m-2">
            <div className="" onClick={()=>setIsSidebarOpen(prev=>!prev)}>
                <MdKeyboardDoubleArrowRight />
            </div>
            <FaYoutube />
             <FaXTwitter />
            <SlDocs />
            <IoLinkSharp />
            <FaHashtag />
        </div>
        }

    </aside>
  )
}

interface propType{
    title: String;
    icon: React.ReactElement;
    onClick: ()=> void;
}

const LinkButton = (props: propType)=>{
    return <button className="flex  gap-12 bg-white p-2 rounded-xl w-[30vh]">
        <div className="translate-y-1 translate-x-1">{props.icon}</div>
        <div>{props.title}</div>
        </button>
}


export default Sidebar
