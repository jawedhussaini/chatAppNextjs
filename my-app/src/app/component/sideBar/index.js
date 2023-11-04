"use client";
import { GloblaContext } from "@/app/context";
import { getConById } from "@/app/services/converstaion";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { BiPaperPlane } from "react-icons/bi";
import { BiConversation } from "react-icons/bi";
import { BiFileBlank } from "react-icons/bi";
import { BiImageAlt } from "react-icons/bi";
import { BiPowerOff } from "react-icons/bi";

const SideBar = () => {
    const {setIsAuthUser,setUser,getAllCon,setGetCurrentCon,user}=useContext(GloblaContext)
   const userID=user !== null ? user.id :null
    const router=useRouter()
    function handelLogOut(){
        router.push('/login')
        setIsAuthUser(false)
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

console.log(getAllCon)
  return (
    <div className="fixed min-w-[16rem] bg-gray-50 h-screen flex flex-row z-20 top-0 left-0 border-b border-gray-200">
      <div className="w-1/2 p-5 bg-blue-700 h-screen flex flex-col justify-between">
        <div className="flex flex-col gap-4 items-center justify-center mt-10">
          <div className="p-5 bg-blue-800 rounded-3xl">
            <BiPaperPlane size={25} color="white" />
          </div>
          <div className="p-5 bg-blue-800 rounded-3xl">
            <BiConversation size={25} color="white" />
          </div>
          <div className="p-5 bg-blue-800 rounded-3xl">
            <BiFileBlank size={25} color="white" />
          </div>
          <div className="p-5 bg-blue-800 rounded-3xl">
            <BiImageAlt size={25} color="white" />
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
          <div className="w-full relative flex items-center justify-center">
            <img
              src="/two.jpg"
              className="h-16 w-16 rounded-full object-cover"
            />
            <div className="h-4 w-4 absolute right-4 top-[0.10rem] rounded-full border-white border-2 bg-green-400 shadow-white shadow-2xl"></div>
          </div>
          <div className="w-full relative flex items-center justify-center">
            <img
              src="/two.jpg"
              className="h-16 w-16 rounded-full object-cover"
            />
            <div className="h-4 w-4 absolute right-4 top-[0.10rem] rounded-full border-white border-2 bg-green-400 shadow-white shadow-2xl"></div>
          </div>
        </div>
        <div className="flex flex-col gap-5 items-center justify-start mt-5 border-b pb-6">
         {
            getAllCon && getAllCon.length ? getAllCon.map((item)=>{
              const imgUrsl=item.users.filter((userss)=>userss._id!==userID)
          
              return(
                 <div key={item._id}  onClick={()=>handelGetCon(item._id)} className="w-full cursor-pointer relative flex items-center justify-center">
            <img
              src={imgUrsl.map((ss)=>ss.imgUrl)}
              className="h-16 w-16 rounded-full object-cover"
            />
          </div>
  )}) :null
         }
         
        </div>
      </div>
    </div>
  );
};

export default SideBar;
