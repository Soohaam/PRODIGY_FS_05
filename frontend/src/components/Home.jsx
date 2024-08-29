import React, { useEffect } from 'react'
import Leftsidebar from './Leftsidebar'
import Feed from './Feed'
import Rightsidebar from './Rightsidebar'
import { Outlet, useNavigate } from 'react-router-dom'
import useOtherUser from '../hooks/useOtherUser'
import { useSelector } from 'react-redux'
import useGetMyTweet from '../hooks/useGetMyTweet'


const Home = () => {

  const{ user,otheruser}=useSelector(store=>store.user)


  const navigate = useNavigate();

  useEffect(()=>{
    if (!user) {
      navigate("/login");
    }
  },[]);

  useOtherUser(user?._id)
  useGetMyTweet(user?._id)
  
  return (
    <div className='flex mx-auto w-[80%] gap-[5%] justify-between '>
      <Leftsidebar/>
      <Outlet/>
      <Rightsidebar otheruser={otheruser}/>
    </div>
  )
}

export default Home
