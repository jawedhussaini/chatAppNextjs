import mongoose from "mongoose";


const GrpupsSchema=new mongoose.Schema({
    groupName:{
        type:String,
        require:true
    },
    imgUrl:{
        type:String,
        require:true
    },
    creator:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    users:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }],
    message:[{
        sender:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        message:String
        
                }],
},{timestamps:true})

const Group=mongoose.models.Group || mongoose.model("Group",GrpupsSchema)

export default Group