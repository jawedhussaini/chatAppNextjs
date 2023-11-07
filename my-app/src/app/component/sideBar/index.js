"use client";
import { GloblaContext } from "@/app/context";
import { getConById } from "@/app/services/converstaion";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { BiPaperPlane } from "react-icons/bi";
import { BiConversation } from "react-icons/bi";
import { BiFileBlank } from "react-icons/bi";
import { BiImageAlt } from "react-icons/bi";
import { BiPowerOff } from "react-icons/bi";
import { BiAddToQueue } from "react-icons/bi";

const SideBar = () => {
    const {setIsAuthUser,setUser,getAllCon,setGetCurrentCon,user,onlineUsers,setOnlineUSers,setGroupModel}=useContext(GloblaContext)
    const [finalOnlineUser,setFinalOnlineUser]=useState(null)
    const [finalOfllineUser,setFinalOflineUser]=useState(null)
    const userID=user !== null ? user.id :null
    const router=useRouter()
    function handelLogOut(){
        router.push('/login')
        setIsAuthUser(false)
        setGetCurrentCon(null)
        setUser(null)
        Cookies.remove('token')
        localStorage.clear()
       
    }
    async function handelGetCon(id){
        const res=await getConById(id)
        if(res.success){
            setGetCurrentCon(res.data)
            localStorage.setItem('currentCon',JSON.stringify(res?.data))
        }
      

    }
useEffect(()=>{
if(user !==null && getAllCon !==null && onlineUsers !==null){
const ids=onlineUsers.map(use=>use.userId)
const finalId= ids.filter(id=>id!==userID)
let online=[]
getAllCon.map(con=>con.users.map(use=>finalId.map(id=>id===use._id ? online.push(con) :null)))
 const offlin= getAllCon.filter(con=>online.indexOf(con)===-1)
setFinalOnlineUser(online)
setFinalOflineUser(offlin)
}
},[user,getAllCon,onlineUsers])

  return (
    <div className="fixed min-w-[16rem] bg-gray-50 h-screen flex flex-row z-20 top-0 left-0 border-b border-gray-200">
      <div className="w-1/2 p-5 bg-blue-700 h-screen flex flex-col justify-between">
        <div className="flex flex-col gap-4 items-center justify-center mt-10">
          <div className="p-5 cursor-pointer  hover:bg-blue-900 bg-blue-800 rounded-3xl">
            <BiPaperPlane size={25} color="white" />
          </div>
          <div className="p-5 cursor-pointer  hover:bg-blue-900 bg-blue-800 rounded-3xl">
            <BiConversation size={25} color="white" />
          </div>
          <div className="p-5 cursor-pointer  hover:bg-blue-900 bg-blue-800 rounded-3xl">
            <BiFileBlank size={25} color="white" />
          </div>
          <div className="p-5 cursor-pointer  hover:bg-blue-900 bg-blue-800 rounded-3xl">
            <BiImageAlt size={25} color="white" />
          </div>
          <div onClick={()=>setGroupModel(true)} className="p-5 cursor-pointer hover:bg-blue-900 bg-blue-800 rounded-3xl">
            <BiAddToQueue size={25} color="white" />
          </div>
        </div>
        <div className="flex items-center justify-center gap-4">
          <div onClick={handelLogOut} className="p-5 cursor-pointer bg-red-600 rounded-3xl">
            <BiPowerOff size={25} color="white" />
          </div>
        </div>
        
      </div>
      <div className="w-1/2 p-5 h-screen flex flex-col justify-start">
        <div className="flex flex-col gap-5 items-center justify-center mt-10 border-b pb-6">
         <h1 className="p-3 font-semibold text-lg uppercase pt-0 text-gray-700">friends</h1>
          {finalOnlineUser && finalOnlineUser.length ? finalOnlineUser.map((item)=>{
              const imgUrsl=item.users.filter((userss)=>userss._id!==userID)
          
              return(
                 <div key={item._id}  onClick={()=>handelGetCon(item._id)} className="w-full cursor-pointer relative flex items-center justify-center">
            <img
              src={imgUrsl.map((ss)=>ss.imgUrl)}
              className="h-16 w-16 rounded-full object-cover"
            />
             <div className="h-4 w-4 absolute right-4 top-[0.10rem] rounded-full border-white border-2 bg-green-400 shadow-white shadow-2xl"></div>
          </div>
  )

          }) : null}
        
        </div>
        <div className="flex flex-col gap-5 items-center justify-start mt-5 border-b pb-6">
      

         {
            finalOfllineUser && finalOfllineUser.length ? finalOfllineUser.map((item)=>{
              const imgUrsl=item.users.filter((userss)=>userss._id!==userID)
          
              return(
                 <div key={item._id}  onClick={()=>handelGetCon(item._id)} className="w-full cursor-pointer relative flex items-center justify-center">
            <img
              src={imgUrsl.map((ss)=>ss.imgUrl)}
              className="h-16 w-16 rounded-full object-cover"
            />
          </div>
  )}) : null
  
         }
         
        </div>
         <div className="flex relative flex-col gap-5 items-center justify-start mt-5 border-b pb-6">

         
            <div  className="w-full left-3 absolute cursor-pointer z-50 flex items-center justify-center">
            <img
              src="./two.jpg"
              className="h-16 w-16 shadow-lg rounded-full object-cover"
            />
          </div>
           <div  className="w-full top left-0 absolute z-40  cursor-pointer flex items-center justify-center">
            <div
           
              className="h-16 w-16 opacity-80 bg-gray-300 border-white  rounded-full object-cover"
            ></div>
          </div>
           <div  className="w-full -left-3 absolute z-30 cursor-pointe  flex items-center justify-center">
            <div
          
              className="h-16 w-16 border-2 opacity-50 bg-slate-200 border-white  rounded-full object-cover"
            ></div>
          </div>
        </div>
        
       
      </div>
    </div>
  );
};

export default SideBar;
