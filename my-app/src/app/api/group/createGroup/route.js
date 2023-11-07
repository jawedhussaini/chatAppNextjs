import connectToDB from "@/app/dataBase"
import Group from "@/app/model/group"
import { NextResponse } from "next/server"



export const dynamic='force-dynamic'

export async function POST(req){
    try{
        connectToDB()
        const data=await req.json()
        const createGroup=await Group.create(data)
        if(createGroup){
            return NextResponse.json({
                success:true,
                message:"group Created successful"
            })
        }
        else{
               return NextResponse.json({
                success:false,
                message:"can not Create group try again leter"
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