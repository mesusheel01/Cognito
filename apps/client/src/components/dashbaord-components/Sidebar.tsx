import { useState } from "react";
import { FaHashtag, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IoLinkSharp } from "react-icons/io5";
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from "react-icons/md";
import { SlDocs } from "react-icons/sl";
import { useRecoilState } from "recoil";
import { contentAtom } from "../../store/atoms/contentStore";
import axios from "axios";
import { loadingAtom } from "../../store/atoms/loadingStore";
import { errorAtom } from "../../store/atoms/errorAtom";

const Sidebar = () => {
    const [IsSidebarOpen, setIsSidebarOpen] = useState(false)
    const [contentStorage, setContentStorage] = useRecoilState(contentAtom)
    const [loading, setLoading] = useRecoilState(loadingAtom)
    const [error, setError] = useRecoilState(errorAtom)
    const handleButtonClick = async(type:string)=>{
            console.log("clicked: ",type )
            try {
                setLoading(true)
                const token = localStorage.getItem("token")
                const response = await axios.get('http://localhost:5000/api/v1/content/',{
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                })
                if(response.data.contents){
                    setLoading(false)
                    console.log(response.data.contents)
                    const list = response.data.contents.filter(item => item.link.toLowerCase().includes(type.toLowerCase()))
                    setContentStorage(list)
                }
            } catch (error) {
                setLoading(false)
                setError(error)
                console.log(error)
            }
    }
    console.log(contentStorage)
  return (
    <aside className="fixed z-50 transition-all duration-300">
        { IsSidebarOpen ?
            <div className="translate-y-10 absolute transition-all duration-300 top-40 bg-myGreen h-[40vh] w-[35vh] rounded-xl opacity-80 m-2 flex flex-col gap-3 justify-center items-center">
            {/* Section for all the types of content and user profile section */}
            <button className="relative -top-1 left-24" onClick={()=>setIsSidebarOpen(prev=>!prev)}>
                <MdKeyboardDoubleArrowLeft />
            </button>
            <LinkButton title={"Youtube"} icon={<FaYoutube />} onClick={()=>handleButtonClick("youtube")} />
            <LinkButton title={"Twitter"} icon={<FaXTwitter />} onClick={()=>handleButtonClick("x.com")} />
            <LinkButton title={"Docs"} icon={<SlDocs />} onClick={()=>handleButtonClick("docs")} />
            <LinkButton title={"Links"} icon={<IoLinkSharp />} onClick={()=>handleButtonClick("links")} />
            <LinkButton title={"Tags"} icon={<FaHashtag />} onClick={()=>handleButtonClick("tags")} />
        </div>
        :
        <div className="translate-y-10 flex flex-col gap-8 justify-center transition-all duration-300 items-center absolute top-40 bg-myGreen h-[40vh] w-[6vh] rounded-xl opacity-80 m-2">
            <div className="" onClick={()=>setIsSidebarOpen(prev=>!prev)}>
                <MdKeyboardDoubleArrowRight />
            </div>
            <FaYoutube onClick={()=>handleButtonClick("youtube")} />
            <FaXTwitter onClick={()=>handleButtonClick("x.com")} />
            <SlDocs onClick={()=>handleButtonClick("docs")} />
            <IoLinkSharp onClick={()=>handleButtonClick("links")} />
            <FaHashtag onClick={()=>handleButtonClick("tags")} />
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
    return <button
        onClick={props.onClick}
    className="flex  gap-12 bg-white hover:bg-gray-500 p-2 rounded-xl w-[30vh]">
        <div className="translate-y-1 translate-x-1">{props.icon}</div>
        <div>{props.title}</div>
        </button>
}


export default Sidebar
