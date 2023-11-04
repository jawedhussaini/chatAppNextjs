import connectToDB from "@/app/dataBase"
import Converstation from "@/app/model/converstation"
import { NextResponse } from "next/server"

export const dynamic='force-dynamic'

export async function POST(req){
    try{
        connectToDB()
        const data=await req.json()
        const createCon=await Converstation.create(data)
        if(createCon){
            return NextResponse.json({
                success:true,
                message:"converstation Created Successfull"
            })
        }
        else{
            return NextResponse.json({
            success:false,
            message:"can not create converstation"
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