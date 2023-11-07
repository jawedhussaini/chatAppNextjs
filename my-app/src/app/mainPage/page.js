"use client";

import { useContext, useEffect, useState } from "react";
import FindFriends from "../component/findFriends";
import MessageContainer from "../component/messageContainer";
import Navbar from "../component/navbar";
import SideBar from "../component/sideBar";
import { allUsers } from "../services/user";
import { GloblaContext } from "../context";
import { getConverstation } from "../services/converstaion";
import GroupModel from "../component/groupModel";

const MainPage = () => {
    const {user,setGetAlluser, setGetAllCon,getCurrentCon,inchatUser,setInChatUser,groupModel}=useContext(GloblaContext)
    const [u,setu]=useState([])
       const userId=user !==null ? user.id : null
    async function extractallData(){
       const id=user?.id
        const res=await allUsers()
        const con=await getConverstation(id)
    
       if(res.success){
           
        const dd=con.data.map(a=>a.users.map(u=>u._id)).flat()
      
        const bb=res.data.filter(u=>dd.includes(u._id))
        const data=res.data.filter(use=>use._id!==userId)
        
        setInChatUser(bb)
        setGetAlluser(data)
       
      
       }
    }

    async function extractallCon(){
        const id=user?.id
        const res=await getConverstation(id)
        if(res.success){
            setGetAllCon(res.data)
        }
    }
    useEffect(()=>{
       if(user !==null){
        extractallData()
        extractallCon()
       }
    },[user])
  return (
    <>
      <Navbar />
      <div className="flex flex-row z-40">
        <div className="w-[60%] mt-[7rem] ml-[16rem]">
             <SideBar />
          <MessageContainer />
        </div>
        <div className="w-[26%] ml-72 fixed right-0 z-30 mt-[7rem]">
          <FindFriends />
        </div>
      </div>
      {groupModel && <GroupModel/>}
      
    </>
  );
};

export default MainPage;
