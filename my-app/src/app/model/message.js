import mongoose from "mongoose";


const messageSchema=new mongoose.Schema({
    text:String,
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
      resever:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
})
const Message=mongoose.models.Message || mongoose.model("Message",messageSchema)

export default Message