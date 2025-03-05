import { useRecoilState, useSetRecoilState } from "recoil"
import { BrainOne } from "../assets/icons/Brain"
import { passwordAtom, usernameAtom } from "../store/atoms/credentialStore"
import { SignButton } from "./common-components/SignButton"
import { Profile } from "../assets/icons/Profile"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { loadingAtom } from "../store/atoms/loadingStore"
import { tokenAtom } from "../store/atoms/KyaSigninHaiStore"

const Signin = () => {

    const [username, setUsername] = useRecoilState(usernameAtom)
    const [password, setPassword] = useRecoilState(passwordAtom)
    const setTokenValue = useSetRecoilState(tokenAtom)
    const  setLoading = useSetRecoilState(loadingAtom)
    const navigate = useNavigate()

    const handleSigninClick = async (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        try{
            setLoading(true)
            const res = await axios.post(`http://localhost:5000/api/v1/user/signin`,({username,password}))
            if(res.data.token){
                console.log(res.data.token)
                localStorage.setItem("token", res.data.token)
                setLoading(false)
                navigate("/dashboard")
                setTokenValue(res.data.token)

            }
        }catch(err){
            setLoading(false)
            console.log(err)

        }
    }

  return (
    <div className="bg-backCol min-h-screen">
        {/* top imgae section */}
        <div className="flex items-center translate-y-[6.1vh] justify-center">
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
                    <SignButton onClick={handleSigninClick} title="Signin" />
                </div>
            </form>
        </div>
    </div>
  )
}

export default Signin
