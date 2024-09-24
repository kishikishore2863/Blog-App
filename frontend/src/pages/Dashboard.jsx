/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect,useState } from "react"
import {useLocation} from 'react-router-dom'
import DashSidebar from "../component/DashSidebar"
import DashProfile from "../component/DashProfile"

const Dashboard = () => {
  const location =useLocation()
  const [tab,setTab]=useState('')

useEffect(()=>{
  const location =useLocation();
  const urlParams =new URLSearchParams(location.search)
  const tabFromUrl=urlParams.get('tab')
  if(tabFromUrl){
    setTab(tabFromUrl)
  }
},[location.search])

  return (
    
<div>
  <div className="">
    {/* slidebar */}
    <DashSidebar/>
  </div>
  <div>
    {/* profile */}
    {tab === 'profile' && <DashProfile/>}
  </div>
</div>
  )
}

export default Dashboard