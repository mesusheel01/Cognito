import { SmallBrainOne } from "../../assets/icons/Brain"
import { CommonButton } from "../common-components/CommonButton"
import { IoMdCloseCircle, IoMdShare } from "react-icons/io"
import { RiAddFill } from "react-icons/ri"
import LiveSearch from "./LiveSearch"
import { useRecoilState } from "recoil"
import { modelAtom } from "../../store/atoms/model"
import { useState } from "react"
import axios from "axios"



const contentTypes = ['twitter', 'video', 'link', 'doc']


const Navbar = () => {
    const [isModelOpen, setIsModelOpen] = useRecoilState(modelAtom)
    const [formData, setFormData] = useState({
        title: '',
        type: '',
        link: '',
        tags: ''
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
        console.log(formData)
    }
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const token = localStorage.getItem("token")
            // Convert tags string to array and prepare data
            const processedData = {
                ...formData,
                tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '')
            }

            const response = await axios.post('http://localhost:5000/api/v1/content',
                processedData, // Send processed data directly
                {
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                }
            )
            if (response.data) {
                console.log("posted", response.data.response)
                setIsModelOpen(false)
                setFormData({
                    title: '',
                    type: '',
                    link: '',
                    tags: ''
                })
            }
        } catch (error) {
            console.error('Error submitting content:', error)
        }
    }

    const handleAddSection = () =>{
        setIsModelOpen(!isModelOpen)
        console.log(isModelOpen)
    }
    const handleShare = () =>{
        //use to hit a backend which will return a url and it will be rendered on the screen and after clicking that user content will be visible to anyone with the link access.
    }

  return (
    <nav className="w-full px-4 py-2 relative z-[100] bg-white">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* logo section - left */}
        <div onClick={()=>window.location.reload()} className="flex-shrink-0">
          <SmallBrainOne />
        </div>

        {/* search section - center */}
        <div className="flex-2 translate-x-16 max-w-xl mx-4">
          <LiveSearch />
        </div>

        {/* buttons section - right */}
        <div className="flex  items-center gap-2">
          <CommonButton onClick={handleShare} icon={<IoMdShare />} title="Share Content" />
          <CommonButton onClick={handleAddSection} icon={<RiAddFill />} title="Add Content" />
        </div>
      </div>
      {
        isModelOpen && (
          <div className="fixed transition-all duration-300 inset-0 flex items-center justify-center z-10 bg-black/50">
            <div className="w-[400px]  bg-myGreen rounded-lg  p-4">
                <div className="flex justify-end items-end" onClick={()=> setIsModelOpen(!isModelOpen)}>
                    <IoMdCloseCircle  />
                </div>
                {/* close button */}
                <div className="flex flex-col items-center gap-3 font-play ">
                 <div className="relative text-[19px] -left-20">
                    Create Content
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-4">
                        <div className="">
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                placeholder="Title"
                                className="rounded-xl w-[30vh]  p-1 px-4"
                            />
                        </div>
                        <div>
                            <select
                                name="type"
                                value={formData.type}
                                onChange={handleInputChange}
                                className="py-1.5 px-4 rounded-xl w-[30vh]  text-gray-400"
                            >
                                <option value="" disabled>Select Type...</option>
                                {contentTypes.map(type => (
                                    <option key={type} value={type}>
                                        {type.charAt(0).toUpperCase() + type.slice(1)}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <input
                                type="text"
                                name="link"
                                value={formData.link}
                                onChange={handleInputChange}
                                placeholder="link"
                                className="rounded-xl w-[30vh]  p-1 px-4"
                            />
                        </div>
                        <div>
                            <input
                                name="tags"
                                value={formData.tags}
                                onChange={handleInputChange}
                                placeholder="Add tags.."
                                className="rounded-xl w-[30vh]  p-1 px-4"
                            />
                        </div>
                    </div>
                    <button className="px-12 bg-buttonBg hover:bg-red-400 p-2 mt-2 translate-x-8 rounded-xl  transition-all duration-300" >Submit</button>
                </form>
                </div>
            </div>
          </div>
        )
      }
    </nav>
  )
}

export default Navbar
