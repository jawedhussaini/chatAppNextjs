import connectToDB from "@/app/dataBase"
import Converstation from "@/app/model/converstation"
import { NextResponse } from "next/server"


export const dynamic='force-dynamic'

export async function GET(req){
    try{
        connectToDB()
        const {searchParams}=new URL(req.url)
        const id=searchParams.get('id')
        const converstaions=await Converstation.find({}).populate("users")
        const data=converstaions.filter((items)=>items.users.map((user)=>user.id).includes(id))

        if(data){
            return NextResponse.json({
                success:true,
                data:data
            })
        }
        else{
            return NextResponse.json({
            success:false,
            message:"can not find any converstation"
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