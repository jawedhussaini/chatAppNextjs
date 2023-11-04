import connectToDB from "@/app/dataBase"
import Converstation from "@/app/model/converstation"
import User from "@/app/model/user"
import { NextResponse } from "next/server"

export const dynamic='force-dynamic'


export async function GET(req){
    try{
        connectToDB()
        let x=[]
        let y=[]
        const users=await User.find({})
        const converstaion=await Converstation.find({}).populate("users")
    
        const aa=converstaion.map(con=>con.users).flat()
      console.log(aa)
        const data=users.map(user=>(aa.map((a)=>{console.log(user._id+"..."+a._id) })))
        const d=aa.map(a=>{let cc=users.map(u=>u._id===a._id)})
       console.log(d)
      

      
      
        
     

        if(users){
            return NextResponse.json({
                success:true,
                data:users
            })
        }
        else{
             return NextResponse.json({
            success:false,
            message:"can not get the data"
        })
        }

    }
    catch(error){
        console.log(error)
        return NextResponse.json({
            success:false,
            message:"some thing is wrong please try again leter"
        })
    }
}