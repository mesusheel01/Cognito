import { useRecoilValue } from "recoil"
import MainSection from "./dashbaord-components/MainSection"
import Navbar from "./dashbaord-components/Navbar"
import { kyaSigninHaiAtom } from "../store/atoms/KyaSigninHaiStore"
import { useNavigate } from "react-router-dom"
import Sidebar from "./dashbaord-components/Sidebar"
import { useEffect } from "react"


const Dashboard = () => {

    const kyaSigninHai = useRecoilValue(kyaSigninHaiAtom)
    const navigate = useNavigate()

    useEffect(() =>{

        if (!kyaSigninHai) {
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
