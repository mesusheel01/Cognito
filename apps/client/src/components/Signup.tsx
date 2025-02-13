import { useRecoilState } from "recoil"
import { BrainOne } from "../assets/icons/Brain"
import { emailAtom, passwordAtom, usernameAtom } from "../store/atoms/credentialStore"
import { SignButton } from "./common-components/SignButton"
import { Profile } from "../assets/icons/Profile"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { loadingAtom } from "../store/atoms/loadingStore"
import { errorAtom } from "../store/atoms/errorAtom"

const Signup = () => {

    const [username, setUsername] = useRecoilState(usernameAtom)
    const [email, setEmail] = useRecoilState(emailAtom)
    const [password, setPassword] = useRecoilState(passwordAtom)
    const [loading,setLoading] = useRecoilState(loadingAtom
    )
    const [error, setError] = useRecoilState(errorAtom)
    const navigate = useNavigate()

    const handleSignupClick = async(e : React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        try{
            setLoading(true)
            const res = await axios.post(`http://localhost:5000/api/v1/user/signup`,{
                username,
                email,
                password
            })
            console.log(res)
            if(res.data.token){
                navigate('/signin')
                setLoading(false)
            }
        }catch(err){
            setLoading(false)
            setError(err.message.response.data)
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
            <form className="flex bg-myBlue font-play w-[30rem] border border-black shadow-xl gap-10 items-center h-[20rem] justify-center rounded-xl p-2 ">
                <div className="flex flex-col gap-5">
                    <div>
                        <input
                        type="text"
                        value={username}
                        placeholder="Sus Daimon..."
                        onChange={(e)=>setUsername(e.target.value)}
                        className="bg-transparent text-black placeholder:text-gray-300 border-b border-black"
                        />
                    </div>
                    <div className="">
                        <input
                        type="email"
                        value={email}
                        placeholder="Sus@Daimon..."
                        onChange={(e)=>setEmail(e.target.value)}
                        className="bg-transparent text-black placeholder:text-gray-300 border-b border-black"
                        />
                    </div>
                    <div>
                        <input
                        type="password"
                        value={password}
                        placeholder="aljsy4923yurh3"
                        onChange={(e)=>setPassword(e.target.value)}
                    className="bg-transparent text-black border-b border-black placeholder:text-gray-300"
                        />
                    </div>
                </div>
                <div>
                    <SignButton title="Signup" onClick={handleSignupClick} />
                </div>
            </form>
            {
                error && <div className=" absolute translate-y-10 text-red-500">{error}</div>
            }
        </div>
    </div>
  )
}

export default Signup
