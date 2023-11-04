import connectToDB from "@/app/dataBase"
import Converstation from "@/app/model/converstation"
import { NextResponse } from "next/server"




export const dynamic='force-dynamic'

export async function PUT(req){
    try{
        connectToDB()
        const data=await req.json()
        const {_id,message,users}=data
       

        const updateConverstation=await Converstation.findById(_id)

         const comment=await updateConverstation.message.push(message)
         
         const addComment=await updateConverstation.save()
        const comentData=addComment.message[comment-1]
        
      
        if(addComment){
            return NextResponse.json({
                success:true,
                message:"conment Added successfull",
                data:comentData
            })
        }
        else{
            return NextResponse.json({
            success:false,
            message:"can not add comment"
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