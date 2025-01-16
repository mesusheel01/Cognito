import { useRecoilState } from "recoil"
import { BrainOne } from "../assets/icons/Brain"
import { emailAtom, passwordAtom, usernameAtom } from "../store/atoms/credentialStore"
import { SignButton } from "./common-components/SignButton"
import { Profile } from "../assets/icons/Profile"

const Signup = () => {

    const [username, setUsername] = useRecoilState(usernameAtom)
    const [email, setEmail] = useRecoilState(emailAtom)
    const [password, setPassword] = useRecoilState(passwordAtom)

    const handleSignup = (e: Event)=>{
        e.preventDefault()
    }

  return (
    <div className="bg-signBg min-h-screen">
        {/* top imgae section */}
        <div className="flex items-center justify-center">
            <BrainOne />
        </div>
        {/* below Signup card section */}
        <div className="flex justify-center items-start ">
                <div className="translate-x-10">
                    <Profile />
                </div>
            <form className="flex bg-myGreen font-play w-[30rem] border border-black shadow-xl gap-10 items-center h-[20rem] justify-center   rounded-xl p-2 m">
                <div className="flex flex-col gap-5">
                    <div>
                        <input
                        type="text"
                        value={username}
                        placeholder="Sus Daimon..."
                        onChange={(e)=>setUsername(e.target.value)}
                        className="bg-transparent text-black text-opacity-10 border-b border-black"
                        />
                    </div>
                    <div className="">
                        <input
                        type="email"
                        value={email}
                        placeholder="Sus@Daimon..."
                        onChange={(e)=>setEmail(e.target.value)}
                        className="bg-transparent text-black text-opacity-10 border-b border-black"
                        />
                    </div>
                    <div>
                        <input
                        type="password"
                        value={password}
                        placeholder="aljsy4923yurh3"
                        onChange={(e)=>setPassword(e.target.value)}
                    className="bg-transparent text-black text-opacity-55 border-b border-black"
                        />
                    </div>

                </div>

                <div>
                    <SignButton title="Signup" onClick={handleSignup} />
                </div>
            </form>
        </div>
    </div>
  )
}

export default Signup
