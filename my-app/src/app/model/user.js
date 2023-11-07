import mongoose from "mongoose";


const UserSchema=new mongoose.Schema({
    name:String,
    email:String,
    imgUrl:String,
    isOnline:Boolean,
    password:String,
    converstation:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Converstation'
    }],
    group:[{
         type:mongoose.Schema.Types.ObjectId,
        ref:'Group'
    }]
},{timestamps:true})


const User=mongoose.models.User || mongoose.model("User",UserSchema)

export default User