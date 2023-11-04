import connectToDB from "@/app/dataBase"
import Converstation from "@/app/model/converstation"
import { NextResponse } from "next/server"



export const dynamic='force-dynamic'

export async function GET(req){
    try{
        connectToDB()
        const {searchParams}=new URL(req.url)
        const id=searchParams.get('id')
        const converstaion=await Converstation.findById(id).populate('message.sender').populate("users")
      
        if(converstaion){
            return NextResponse.json({
                success:true,
                data:converstaion
            })
        }
        else{
         return NextResponse.json({
        success:false,
        message:"can not find the converstation"
       })
        }

    }
    catch(error){
       console.log(error)
       return NextResponse.json({
        success:false,
        message:"some thing is going wrong please try again leter"
       })
    }
}