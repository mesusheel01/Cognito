import { useRecoilState } from "recoil"
import { BrainOne } from "../assets/icons/Brain"
import { passwordAtom, usernameAtom } from "../store/atoms/credentialStore"
import { SignButton } from "./common-components/SignButton"
import { Profile } from "../assets/icons/Profile"

const Signin = () => {

    const [username, setUsername] = useRecoilState(usernameAtom)
    const [password, setPassword] = useRecoilState(passwordAtom)


  return (
    <div className="bg-backCol min-h-screen">
        {/* top imgae section */}
        <div className="flex items-center justify-center">
            <BrainOne />
        </div>
        {/* below Signup card section */}
        <div className="flex justify-center items-start ">
                <div className="translate-x-10">
                    <Profile />
                </div>
            <form className="flex bg-myBlue font-play w-[30rem] border border-black shadow-xl gap-10 items-center h-[20rem] justify-center   rounded-xl p-2 m">
                <div className="flex flex-col gap-8">
                    <div>
                        <input
                        type="text"
                        value={username}
                        placeholder="Sus Daimon..."
                        onChange={(e)=>setUsername(e.target.value)}
                        className="bg-transparent text-black placeholder:text-gray-300 border-b border-black"
                        />
                    </div>
                    <div>
                        <input
                        type="password"
                        value={password}
                        placeholder="aljsy4923yurh3"
                        onChange={(e)=>setPassword(e.target.value)}
                        className="bg-transparent text-black placeholder:text-gray-300 border-b border-black"
                        />
                    </div>

                </div>

                <div>
                    <SignButton title="Signin" routeTo={'/dashboard'} />
                </div>
            </form>
        </div>
    </div>
  )
}

export default Signin
