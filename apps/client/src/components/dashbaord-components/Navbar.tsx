import { SmallBrainOne } from "../../assets/icons/Brain"
import { CommonButton } from "../common-components/CommonButton"
import { IoMdCloseCircle, IoMdShare } from "react-icons/io"
import { RiAddFill } from "react-icons/ri"
import LiveSearch from "./LiveSearch"
import { useRecoilState } from "recoil"
import { modelAtom } from "../../store/atoms/model"


const contentTypes = ['image', 'video', 'article', 'audio']


const Navbar = () => {
    const [isModelOpen, setIsModelOpen] = useRecoilState(modelAtom)


    const handleAddSection = () =>{
        setIsModelOpen(!isModelOpen)
        console.log(isModelOpen)
    }
    const handleShare = () =>{

    }

  return (
    <nav className="w-full px-4 py-2">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* logo section - left */}
        <div className="flex-shrink-0">
          <SmallBrainOne />
        </div>

        {/* search section - center */}
        <div className="flex-2 translate-x-16 max-w-xl mx-4 hidden sm:block">
          <LiveSearch />
        </div>

        {/* buttons section - right */}
        <div className="flex items-center gap-2">
          <CommonButton onClick={handleShare} icon={<IoMdShare />} title="Share Content" />
          <CommonButton onClick={handleAddSection} icon={<RiAddFill />} title="Add Content" />
        </div>
      </div>
      {
        isModelOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50">
            <div className="w-[400px] h-[500px] bg-myGreen rounded-lg  p-4">
                <div className="flex justify-end items-end" onClick={()=> setIsModelOpen(!isModelOpen)}>
                    <IoMdCloseCircle  />
                </div>
                {/* close button */}
                <div className="flex flex-col items-center gap-3 font-play ">
                 <div className="relative text-[19px] -left-20">
                    Create Content
                </div>
                <form>
                    <div className="flex flex-col gap-4">
                        <div className="">
                            <input
                                type="text"
                                placeholder="Title"
                                className="rounded-xl w-[30vh]  p-1 px-4"
                            />
                        </div>
                        <div>
                            <select
                                defaultValue=""
                                className="py-1.5 px-4 rounded-xl w-[30vh]  text-gray-400"
                            >
                                <option
                                value="" disabled>Select Type...</option>
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
                                placeholder="link"
                                className="rounded-xl w-[30vh]  p-1 px-4"
                            />
                        </div>
                        <div>
                            <textarea
                                placeholder="Content.."
                                className="rounded-xl w-[30vh] h-[18vh]  p-2 px-4"
                            />
                        </div>
                        <div>
                            <input
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
