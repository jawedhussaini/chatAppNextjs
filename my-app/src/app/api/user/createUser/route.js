
import connectToDB from "@/app/dataBase"
import User from "@/app/model/user"
import { NextResponse } from "next/server"
import Joi from "joi"
import { hash } from "bcryptjs"

export const dynamic='force-dynamic'

const UserSchema=Joi.object({
    name:Joi.string().required(),
    email:Joi.string().required(),
    password:Joi.string().required(),
    imgUrl:Joi.string().required()
})




export async function POST(req){
    connectToDB()
    const {name,email,password,converstation,imgUrl,isOnline}=await req.json()
    const {error}=UserSchema.validate({name,email,password,imgUrl})

    if(error){
        return NextResponse.json({
            success:false,
            message:error.details[0].message
        })
    }
    try{

        const isUserExist=await User.findOne({email})
        if(isUserExist){
            return NextResponse.json({
            success:false,
            message:"user alredy existttt"
        })
        }
        else{
         const hashPassword=await hash(password,12)
         console.log(hashPassword)
          const createusser=await User.create({
            name,email,password:hashPassword,converstation,imgUrl,isOnline
          })
          if(createusser){
              return NextResponse.json({
            success:true,
            message:"ACCount created successfully"
        })
          }
        }


    }
    catch(error){
        console.log("error while creating new user")
        return NextResponse.json({
            success:false,
            message:"some thing went wrong please try again latter"
        })
    }

}