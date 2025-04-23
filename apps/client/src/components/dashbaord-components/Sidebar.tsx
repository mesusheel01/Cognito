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
import { BiLogOut } from "react-icons/bi";
import { useSnackbar } from "notistack";

const Sidebar = () => {
    const [IsSidebarOpen, setIsSidebarOpen] = useState(false);
    const [contentStorage, setContentStorage] = useRecoilState(contentAtom);
    const [loading, setLoading] = useRecoilState(loadingAtom);
    const [error, setError] = useRecoilState(errorAtom);
    const {enqueueSnackbar} = useSnackbar()
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
    const handleLogout = ()=>{
        localStorage.removeItem('token')
        window.location.href= 'http://localhost:5173/'
        enqueueSnackbar("Logged out!",{variant:"success"})
    }
    console.log(contentStorage)
  return (
    <aside className="fixed left-0 top-1/2 -translate-y-1/2 z-50">
        <div className={`
            transition-all duration-300 ease-in-out
            bg-myGreen rounded-r-xl opacity-80
            flex flex-col items-center
            ${IsSidebarOpen
                ? 'w-[280px] p-4' // Open state
                : 'w-[60px] p-2'   // Closed state
            }
        `}>
            {/* Toggle Button */}
            <button
                className={`
                    absolute top-4
                    ${IsSidebarOpen ? 'right-4' : 'right-1/2 transform translate-x-1/2'}
                    text-black hover:text-gray-200 transition-colors
                `}
                onClick={() => setIsSidebarOpen(prev => !prev)}
            >
                {IsSidebarOpen
                    ? <MdKeyboardDoubleArrowLeft size={24} />
                    : <MdKeyboardDoubleArrowRight size={24} />
                }
            </button>

            {/* Navigation Items */}
            <div className="mt-10 w-full flex flex-col gap-4">
                {IsSidebarOpen ? (
                    // Expanded View
                    <>
                        <LinkButton title="Youtube" icon={<FaYoutube />} onClick={() => handleButtonClick("youtube")} />
                        <LinkButton title="Twitter" icon={<FaXTwitter />} onClick={() => handleButtonClick("x.com")} />
                        <LinkButton title="Docs" icon={<SlDocs />} onClick={() => handleButtonClick("docs")} />
                        <LinkButton title="Links" icon={<IoLinkSharp />} onClick={() => handleButtonClick("links")} />
                        <LinkButton title="Tags" icon={<FaHashtag />} onClick={() => handleButtonClick("tags")} />
                        <LinkButton title="Logout" icon={<BiLogOut />} onClick={handleLogout} />
                    </>
                ) : (
                    // Collapsed View
                    <>

                        <IconButton icon={<FaYoutube />} onClick={() => handleButtonClick("youtube")} />
                        <IconButton icon={<FaXTwitter />} onClick={() => handleButtonClick("x.com")} />
                        <IconButton icon={<SlDocs />} onClick={() => handleButtonClick("docs")} />
                        <IconButton icon={<IoLinkSharp />} onClick={() => handleButtonClick("links")} />
                        <IconButton icon={<FaHashtag />} onClick={() => handleButtonClick("tags")} />
                        <IconButton icon={<BiLogOut />} onClick={handleLogout} />

                    </>
                )}
            </div>
        </div>
    </aside>
  )
}

interface PropType {
    title: string;
    icon: React.ReactElement;
    onClick: () => void;
}

const LinkButton = ({ title, icon, onClick }: PropType) => (
    <button
        onClick={onClick}
        className="
            w-full flex items-center gap-4
            bg-white hover:bg-gray-100
            px-4 py-2 rounded-lg
            transition-colors duration-200
        "
    >
        <span className="text-xl">{icon}</span>
        <span className="flex-1">{title}</span>
    </button>
);

const IconButton = ({ icon, onClick }: { icon: React.ReactElement, onClick: () => void }) => (
    <button
        onClick={onClick}
        className="
            w-full flex justify-center
            text-black hover:bg-white/20
            p-2 rounded-lg
            transition-colors duration-200
            text-xl
        "
    >
        {icon}
    </button>
);

export default Sidebar
