import { useRecoilValue } from "recoil"
import MainSection from "./dashbaord-components/MainSection"
import Navbar from "./dashbaord-components/Navbar"
import { tokenAtom } from "../store/atoms/KyaSigninHaiStore"
import { useNavigate } from "react-router-dom"
import Sidebar from "./dashbaord-components/Sidebar"
import { useEffect } from "react"


const Dashboard = () => {

    const token = useRecoilValue(tokenAtom)
    const localToken = localStorage.getItem('token')
    const navigate = useNavigate()

    useEffect(() =>{
        if (!token && !localToken) {
            navigate('/')
        }
    },[])

  return (

    <div>
      <Navbar />
      <Sidebar />
      <MainSection />
    </div>
  )
}

export default Dashboard
