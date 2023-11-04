"use client";
import { GloblaContext } from "@/app/context";
import { addComment, getConById } from "@/app/services/converstaion";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { BiSolidPaperPlane } from "react-icons/bi";
import { io } from 'socket.io-client'



const MessageContainer = () => {
  const { getCurrentCon, user } = useContext(GloblaContext);
  console.log(user)
  const [messages, setMessage] = useState("");
  const [allmessage, setAllMessage] = useState([]);
  const [chatImg,setChatImg]=useState(null)
  const userID = user !== null ? user.id : null;





 const [socket,setSocket]=useState(undefined)
  const [indox,setIndox]=useState(null)
  const [message,setMesage]=useState('')
  const [room,setroom]=useState('')




  async function getconverstation() {
    const id = getCurrentCon && getCurrentCon._id ? getCurrentCon._id : "";
    const res = await getConById(id);
    if (res.success) {
      const data = res && res.data ? res.data.message : null;
      setAllMessage(data);
      const img=res && res.data ? res.data.users.map(use=>use._id!==userID?  setChatImg(use) :null) :null
       setMessage("")
    }
  }

  async function addComments() {
    const _id = getCurrentCon._id;

    const message = { sender: user?.id, message: messages };
    const users = getCurrentCon.users;
    const res = await addComment({ _id, message, users });
    if (res.success) {
      const messagesss={sender:user,message:messages}
      socket.emit("message",messagesss,_id)
      getconverstation();
    }
  }
    useEffect(()=>{
     const room= getCurrentCon && getCurrentCon._id ? getCurrentCon._id :null
const socket=io('http://localhost:3000')
    
socket.on("message",(message)=>{ 

setIndox(message)  

})

setSocket(socket)
  },[])

  useEffect(() => {
    if (user !== null && getCurrentCon !== null) {
     
      getconverstation();
      {socket !== undefined ?  socket.emit("joinRoom",getCurrentCon._id) : null}
     
   
    }
  }, [user, getCurrentCon]);



useEffect(()=>{
  indox && setAllMessage((prev)=>[...prev,indox])
},[indox])

useEffect(()=>{
window.scrollTo({top:document.body.scrollHeight,left:0,behavior:"smooth"});
})

  return (
    <div className="flex flex-col p-2">
      <div className=" mb-[7rem]">
        <div className="w-full flex flex-row h-auto border-b-2 border-gray-200 p-5 justify-start items-start">
        {
          chatImg!==null ? <div className="flex flex-row w-full gap-3">

             <div className="relative flex items-center justify-center">
              
              <img
                src={chatImg.imgUrl}
                className="h-16 w-16 rounded-full object-cover"
              />
              <div className="h-4 w-4 absolute right-1 top-[0.01rem] rounded-full border-white border-2 bg-green-400 shadow-white shadow-2xl"></div>
            </div>
             <div className="flex flex-col justify-center">
              <h1 className="text-gray-700 font-bold">{chatImg.name}</h1>
              <h1 className="font-semibold text-gray-500">Active</h1>
            </div>

          </div> :null
        } 
        
          
        </div>

        {allmessage && allmessage.length
          ? allmessage.map((converstation) =>
              converstation &&
              converstation.sender &&
              converstation.sender._id === userID ? (
                <div className="w-full grid grid-cols-4 p-6 pl-14 pr-14 items-end ">
                  <div></div>
                  <div className="col-span-3 flex flex-row justify-end gap-2">
                    <div className=" w-auto rounded-b-2xl rounded-l-2xl bg-gray-100 p-4 text-gray-800">
                      <p className="break-words">
                        {converstation && converstation.message
                          ? converstation.message
                          : null}
                      </p>
                    </div>

                    <div className="w-8 -mr-10">
                      <img
                        src={converstation.sender.imgUrl}
                        className="h-6 w-6 rounded-full object-cover"
                      />
                    </div>
                  </div>
                  <div></div>
                </div>
              ) : (
                <div
                  key={converstation._id}
                  className="grid grid-cols-4 p-6 pl-14 pr-14 "
                >
                  <div className="col-span-3 flex flex-row">
                    <div className="w-8 -ml-10">
                      <img
                        src={converstation.sender.imgUrl}
                        className="h-6 w-6 rounded-full object-cover"
                      />
                    </div>
                    <div className=" w-auto rounded-b-2xl rounded-r-2xl bg-blue-500 p-4 text-white">
                      <p className="break-words">
                        {converstation && converstation.message
                          ? converstation.message
                          : null}
                      </p>
                    </div>
                  </div>
                  <div></div>
                </div>
              )
            )
          : null}
      </div>
      <div className="w-[60%] bg-white  fixed bottom-0 pr-10 z-20">
        <div className="w-full grid-cols-4 p-4">
          <div className="col-span-3 flex flex-row gap-4  items-center justify-center">
            <input
              className="bg-gray-100 appearance-none border w-[90%] py-4 rounded-full px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="message"
              type="text"
              placeholder="Type Message..."
              value={messages}
              onChange={(e) => setMessage(e.target.value)}
            />
            <div
              onClick={addComments}
              className="p-5 -mt-4 rounded-full  bg-blue-100 cursor-pointer"
            >
              <BiSolidPaperPlane size={25} color="blue" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MessageContainer;
