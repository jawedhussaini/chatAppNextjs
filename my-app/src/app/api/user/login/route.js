import connectToDB from "@/app/dataBase"
import User from "@/app/model/user"
import { compare } from "bcryptjs"
import Joi from "joi"
import { NextResponse } from "next/server"
import jwt  from "jsonwebtoken"



export const dynamic='force-dynamic'

const loginSchema=Joi.object({
    email:Joi.string().required(),
    password:Joi.string().required()

})


export async function POST(req){
    connectToDB()
    const {email,password}=await req.json()
    const {error}=loginSchema.validate({email,password})

    if(error){
        return NextResponse.json({
            success:false,
            message:error.details[0].message
        })
    }
    try{
        const checkUser=await User.findOne({email})

        if(!checkUser){
            return NextResponse.json({
                success:false,
                message:"given email not Exist"
            })

        }
        else{
            const checkpassword=await compare(password,checkUser.password)
            if(!checkpassword){
                return NextResponse.json({
                success:false,
                message:"wrong password"
            })
            }
            else{
                const token=jwt.sign({
                    id:checkUser._id,
                    name:checkUser.name,
                    email:checkUser.email

                }, "default_secret_key",
      { expiresIn: "1d" })

      const finalData={
        token,
        user:{
             id:checkUser._id,
             name:checkUser.name,
             email:checkUser.email,
             imgUrl:checkUser.imgUrl
        }
      }
      return NextResponse.json({
        success:true,
        message:"log in successfull",
        data:finalData

      })
            }
        }

    }
    catch(error){
      console.log(error)
      return NextResponse.json({
        success:false,
        message:"some thing is wrong"
      })
    }
}