'use client'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'

export default function Home() {
  const [socket,setSocket]=useState(undefined)
  const [indox,setIndox]=useState([])
  const [message,setMesage]=useState('')
  const [room,setroom]=useState('')

 const handeldelsendMEssage=()=>{
  socket.emit("message",message,room)
 }
  const hnadelSendRoom=()=>{
  socket.emit("joinRoom",room)
 }

  useEffect(()=>{
const socket=io('http://localhost:3000')
socket.on("message",(message)=>{ 
  setIndox([...indox,message])})
setSocket(socket)
  },[])
  console.log(indox)
  return (
    <main className="flex min-h-screen flex-col items-center gap-5 p-24">
  <div className='flex flex-col gap-2 border rounded-lg p-10'>
    {
      indox.map((meassage,index)=>(
        <div className='border rounded px-4 py-2' key={index}>{meassage}</div>
      ))
    }
  </div>
  <div className='flex gap-2 items-center justify-center'>
    <input onChange={(e)=>setMesage(e.target.value)} type='text' name='message' className='flex-1 border bg-slate-400 rounded px-2 py-1'/>
    <button onClick={handeldelsendMEssage} className='w-40'>send message</button>
  </div>
   <div className='flex gap-2 items-center justify-center'>
    <input onChange={(e)=>setroom(e.target.value)} type='text' name='message' className='flex-1 border bg-slate-400 rounded px-2 py-1'/>
    <button onClick={hnadelSendRoom} className='w-40'>join room</button>
  </div>
  
  
    </main>
  )
}
