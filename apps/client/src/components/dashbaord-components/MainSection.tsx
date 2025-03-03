import axios from "axios"
import { useEffect } from "react"
import { contentAtom } from "../../store/atoms/contentStore"
import { useRecoilState } from "recoil"

const MainSection = () => {

    const [contentModel, setContentModel] = useRecoilState(contentAtom)

    const fetchContent = async()=>{
        try{
            const token = localStorage.getItem("token")
            const res = await axios.get(`http://localhost:5000/api/v1/content`,{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
            if(res.data && res.data.length){
                setContentModel(res.data)
                console.log(contentModel)
            }
        }catch(err){
            console.log(err)
        }
    }


useEffect( ()=>{
    fetchContent()
},[])





  return (
    <div>
        
    </div>
  )
}

export default MainSection
