import { SmallBrainOne } from "../../assets/icons/Brain"
import { CommonButton } from "../common-components/CommonButton"
import { IoMdShare } from "react-icons/io"
import { RiAddFill } from "react-icons/ri"
import LiveSearch from "./LiveSearch"

const Navbar = () => {
  return (
    <div>
        <div className="flex justify-between">
            {/* logo section - top left section */}
            <div className="m-2">
                <SmallBrainOne />
            </div>
            <div className="absolute left-[40%]">
                <LiveSearch />
            </div>
            {/* top right section */}
            <div className="flex gap-2 m-5">
                <CommonButton icon={<IoMdShare />} title="Share Content" />
                <CommonButton icon={<RiAddFill />} title="Add Content" />

            </div>
        </div>
    </div>
  )
}

export default Navbar
