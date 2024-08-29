import axios from "axios"
import {USER_API_END_POINT} from "../utils/constant"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { getMyProfile, getOtherUser } from "../redux/userSlice"


const useOtherUser=async(id)=>{
    const dispactch=useDispatch()

    useEffect(()=>{
        const fetchOtherUser=async()=>{
            try {
                const res=await axios.get(`${USER_API_END_POINT}/otheruser/${id}`,{
                    withCredentials:true
                })
                dispactch(getOtherUser(res.data.otherUsers))
            } catch (error) {
                console.log(error);
                
            }
        }
        fetchOtherUser()
      
    },[])
   
}
export default useOtherUser