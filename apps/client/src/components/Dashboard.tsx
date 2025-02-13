import { useRecoilValue } from "recoil"
import MainSection from "./dashbaord-components/MainSection"
import Navbar from "./dashbaord-components/Navbar"
import { kyaSigninHaiAtom } from "../store/atoms/KyaSigninHaiStore"
import { useNavigate } from "react-router-dom"


const Dashboard = () => {

    const kyaSigninHai = useRecoilValue(kyaSigninHaiAtom)
    const navigate = useNavigate()

    if (!kyaSigninHai) {
        navigate('/')
        return null
    }

  return (

    <div>
      <Navbar />
      <MainSection />
    </div>
  )
}

export default Dashboard
